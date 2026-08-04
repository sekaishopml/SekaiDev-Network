package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net"
	"net/http"
	"net/url"
	"os"
	"regexp"
	"strings"
	"sync"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/jackc/pgx/v5/pgxpool"
)

var db *pgxpool.Pool

var emailRe = regexp.MustCompile(`^[^\s@]+@[^\s@]+\.[^\s@]+$`)

var allowedOrigins = map[string]bool{
	"https://portafolio.sekaidevec.com": true,
	"http://portafolio.sekaidevec.com":  true,
	"http://localhost:3000":             true,
	"http://127.0.0.1:3000":             true,
}

type ContactRequest struct {
	Name        string `json:"name"`
	Email       string `json:"email"`
	Company     string `json:"company"`
	ProjectType string `json:"projectType"`
	Timeline    string `json:"timeline"`
	Budget      string `json:"budget"`
	Message     string `json:"message"`
	Website     string `json:"website"` // honeypot
}

type apiError struct {
	OK    bool   `json:"ok"`
	Error string `json:"error"`
}

type rateLimiter struct {
	mu     sync.Mutex
	hits   map[string][]time.Time
	window time.Duration
	max    int
}

func newRateLimiter(window time.Duration, max int) *rateLimiter {
	return &rateLimiter{
		hits:   make(map[string][]time.Time),
		window: window,
		max:    max,
	}
}

func (rl *rateLimiter) allow(ip string) bool {
	rl.mu.Lock()
	defer rl.mu.Unlock()
	now := time.Now()
	cutoff := now.Add(-rl.window)
	kept := rl.hits[ip][:0]
	for _, t := range rl.hits[ip] {
		if t.After(cutoff) {
			kept = append(kept, t)
		}
	}
	if len(kept) >= rl.max {
		rl.hits[ip] = kept
		return false
	}
	rl.hits[ip] = append(kept, now)
	return true
}

var limiter = newRateLimiter(10*time.Minute, 5)

func main() {
	port := envOr("PORT", "8000")
	databaseURL := envOr("DATABASE_URL", "postgres://sekai:sekai@localhost:5432/sekaidev")

	var err error
	db, err = pgxpool.New(context.Background(), databaseURL)
	if err != nil {
		log.Fatalf("unable to connect to database: %v", err)
	}
	defer db.Close()

	if err := ensureSchema(); err != nil {
		log.Fatalf("schema error: %v", err)
	}

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(corsMiddleware)
	r.Use(middleware.RealIP)

	r.Get("/api/health", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, http.StatusOK, map[string]any{"ok": true, "status": "ok"})
	})

	r.Post("/api/contact", handleContact)

	addr := fmt.Sprintf(":%s", port)
	log.Printf("backend listening on %s", addr)
	if err := http.ListenAndServe(addr, r); err != nil {
		log.Fatalf("server error: %v", err)
	}
}

func ensureSchema() error {
	_, err := db.Exec(context.Background(), `
		CREATE TABLE IF NOT EXISTS contacts (
			id SERIAL PRIMARY KEY,
			name TEXT NOT NULL,
			email TEXT NOT NULL,
			message TEXT NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);
		ALTER TABLE contacts ADD COLUMN IF NOT EXISTS company TEXT DEFAULT '';
		ALTER TABLE contacts ADD COLUMN IF NOT EXISTS project_type TEXT DEFAULT '';
		ALTER TABLE contacts ADD COLUMN IF NOT EXISTS timeline TEXT DEFAULT '';
		ALTER TABLE contacts ADD COLUMN IF NOT EXISTS budget TEXT DEFAULT '';
		ALTER TABLE contacts ADD COLUMN IF NOT EXISTS reference TEXT DEFAULT '';
		ALTER TABLE contacts ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'received';
		ALTER TABLE contacts ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'normal';
	`)
	return err
}

func newLeadReference() string {
	// SKD-YYYYMMDD-XXXX — short, human-readable, unique enough for a boutique studio
	n := time.Now().UTC()
	suffix := fmt.Sprintf("%X", n.UnixNano()%0xFFFF)
	return fmt.Sprintf("SKD-%s-%s", n.Format("20060102"), suffix)
}

func leadPriority(timeline, budget string) string {
	t := strings.ToLower(timeline)
	b := strings.ToLower(budget)
	if strings.Contains(t, "asap") && (strings.Contains(b, "45k") || strings.Contains(b, "40k") || strings.Contains(b, "retainer")) {
		return "high"
	}
	if strings.Contains(b, "45k") || strings.Contains(b, "retainer") || strings.Contains(b, "partner") {
		return "high"
	}
	if strings.Contains(t, "exploring") || strings.Contains(b, "not sure") {
		return "low"
	}
	return "normal"
}

func handleContact(w http.ResponseWriter, r *http.Request) {
	ip := clientIP(r)
	if !limiter.allow(ip) {
		writeJSON(w, http.StatusTooManyRequests, apiError{OK: false, Error: "Too many requests. Try again later."})
		return
	}

	var req ContactRequest
	ct := r.Header.Get("Content-Type")
	if strings.Contains(ct, "application/json") || ct == "" {
		body, err := io.ReadAll(io.LimitReader(r.Body, 1<<20))
		if err != nil {
			writeJSON(w, http.StatusBadRequest, apiError{OK: false, Error: "Invalid request"})
			return
		}
		if err := json.Unmarshal(body, &req); err != nil {
			writeJSON(w, http.StatusBadRequest, apiError{OK: false, Error: "Invalid JSON"})
			return
		}
	} else {
		if err := r.ParseForm(); err != nil {
			writeJSON(w, http.StatusBadRequest, apiError{OK: false, Error: "Invalid form"})
			return
		}
		req = ContactRequest{
			Name:        r.FormValue("name"),
			Email:       r.FormValue("email"),
			Company:     r.FormValue("company"),
			ProjectType: firstNonEmpty(r.FormValue("projectType"), r.FormValue("project_type")),
			Timeline:    r.FormValue("timeline"),
			Budget:      r.FormValue("budget"),
			Message:     r.FormValue("message"),
			Website:     r.FormValue("website"),
		}
	}

	req.Name = strings.TrimSpace(req.Name)
	req.Email = strings.TrimSpace(strings.ToLower(req.Email))
	req.Company = strings.TrimSpace(req.Company)
	req.ProjectType = strings.TrimSpace(req.ProjectType)
	req.Timeline = strings.TrimSpace(req.Timeline)
	req.Budget = strings.TrimSpace(req.Budget)
	req.Message = strings.TrimSpace(req.Message)
	req.Website = strings.TrimSpace(req.Website)

	// Honeypot: bots fill hidden field — pretend success
	if req.Website != "" {
		writeJSON(w, http.StatusOK, map[string]any{
			"ok":        true,
			"reference": newLeadReference(),
			"status":    "received",
			"message":   "We received your inquiry and typically reply within 24 hours.",
		})
		return
	}

	if len(req.Name) < 2 || len(req.Name) > 120 {
		writeJSON(w, http.StatusBadRequest, apiError{OK: false, Error: "Invalid name"})
		return
	}
	if !emailRe.MatchString(req.Email) || len(req.Email) > 200 {
		writeJSON(w, http.StatusBadRequest, apiError{OK: false, Error: "Invalid email"})
		return
	}
	if len(req.Company) > 160 {
		writeJSON(w, http.StatusBadRequest, apiError{OK: false, Error: "Invalid company"})
		return
	}
	if len(req.ProjectType) > 80 || len(req.Timeline) > 80 || len(req.Budget) > 80 {
		writeJSON(w, http.StatusBadRequest, apiError{OK: false, Error: "Invalid fields"})
		return
	}
	if len(req.Message) < 10 || len(req.Message) > 4000 {
		writeJSON(w, http.StatusBadRequest, apiError{OK: false, Error: "Invalid message"})
		return
	}

	ref := newLeadReference()
	priority := leadPriority(req.Timeline, req.Budget)

	_, err := db.Exec(context.Background(), `
		INSERT INTO contacts (name, email, message, company, project_type, timeline, budget, reference, status, priority)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'received', $9)`,
		req.Name, req.Email, req.Message, req.Company, req.ProjectType, req.Timeline, req.Budget, ref, priority,
	)
	if err != nil {
		log.Printf("contact insert error: %v", err)
		writeJSON(w, http.StatusInternalServerError, apiError{OK: false, Error: "Internal error"})
		return
	}

	go notifyHuman(req, ip, ref, priority)

	writeJSON(w, http.StatusOK, map[string]any{
		"ok":        true,
		"reference": ref,
		"status":    "received",
		"priority":  priority,
		"message":   "We received your inquiry and typically reply within 24 hours.",
	})
}

func notifyHuman(req ContactRequest, ip, reference, priority string) {
	text := fmt.Sprintf(
		"New SekaiDev inquiry\nRef: %s\nPriority: %s\nName: %s\nEmail: %s\nCompany: %s\nType: %s\nTimeline: %s\nBudget: %s\nIP: %s\n\n%s",
		reference, priority, req.Name, req.Email, emptyDash(req.Company), emptyDash(req.ProjectType),
		emptyDash(req.Timeline), emptyDash(req.Budget), ip, req.Message,
	)

	log.Printf("[contact] %s %s <%s> company=%q type=%q", reference, req.Name, req.Email, req.Company, req.ProjectType)

	if path := os.Getenv("CONTACT_LOG_FILE"); path != "" {
		f, err := os.OpenFile(path, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
		if err == nil {
			fmt.Fprintf(f, "\n--- %s ---\n%s\n", time.Now().UTC().Format(time.RFC3339), text)
			_ = f.Close()
		}
	} else {
		_ = os.MkdirAll("/var/log/sekaidev", 0755)
		f, err := os.OpenFile("/var/log/sekaidev/contacts.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
		if err == nil {
			fmt.Fprintf(f, "\n--- %s ---\n%s\n", time.Now().UTC().Format(time.RFC3339), text)
			_ = f.Close()
		}
	}

	if token := os.Getenv("TELEGRAM_BOT_TOKEN"); token != "" {
		chat := os.Getenv("TELEGRAM_CHAT_ID")
		if chat != "" {
			if err := sendTelegram(token, chat, text); err != nil {
				log.Printf("telegram notify error: %v", err)
			}
		}
	}

	if key := os.Getenv("RESEND_API_KEY"); key != "" {
		to := envOr("CONTACT_TO", "hello@sekaidevec.com")
		from := envOr("CONTACT_FROM", "SekaiDev <onboarding@resend.dev>")
		if err := sendResend(key, from, to, "New project inquiry — "+req.Name, text); err != nil {
			log.Printf("resend notify error: %v", err)
		}
	}
}

func sendTelegram(token, chatID, text string) error {
	endpoint := fmt.Sprintf("https://api.telegram.org/bot%s/sendMessage", token)
	form := url.Values{}
	form.Set("chat_id", chatID)
	form.Set("text", text)
	ctx, cancel := context.WithTimeout(context.Background(), 8*time.Second)
	defer cancel()
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, endpoint, strings.NewReader(form.Encode()))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()
	if res.StatusCode >= 300 {
		b, _ := io.ReadAll(io.LimitReader(res.Body, 512))
		return fmt.Errorf("telegram status %d: %s", res.StatusCode, string(b))
	}
	return nil
}

func sendResend(apiKey, from, to, subject, text string) error {
	payload := map[string]any{
		"from":    from,
		"to":      []string{to},
		"subject": subject,
		"text":    text,
	}
	body, _ := json.Marshal(payload)
	ctx, cancel := context.WithTimeout(context.Background(), 8*time.Second)
	defer cancel()
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, "https://api.resend.com/emails", bytes.NewReader(body))
	if err != nil {
		return err
	}
	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()
	if res.StatusCode >= 300 {
		b, _ := io.ReadAll(io.LimitReader(res.Body, 512))
		return fmt.Errorf("resend status %d: %s", res.StatusCode, string(b))
	}
	return nil
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		if allowedOrigins[origin] {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Vary", "Origin")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		}
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func clientIP(r *http.Request) string {
	if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
		parts := strings.Split(xff, ",")
		return strings.TrimSpace(parts[0])
	}
	if xri := r.Header.Get("X-Real-IP"); xri != "" {
		return strings.TrimSpace(xri)
	}
	host, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return r.RemoteAddr
	}
	return host
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

func envOr(k, def string) string {
	if v := os.Getenv(k); v != "" {
		return v
	}
	return def
}

func emptyDash(s string) string {
	if s == "" {
		return "—"
	}
	return s
}

func firstNonEmpty(vals ...string) string {
	for _, v := range vals {
		if strings.TrimSpace(v) != "" {
			return v
		}
	}
	return ""
}
