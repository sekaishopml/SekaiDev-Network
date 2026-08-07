package notify

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"time"

	"sekaidev/backend/internal/config"
	"sekaidev/backend/internal/contact"
)

type Notifier struct {
	config config.Config
	logger *log.Logger
	client *http.Client
}

func New(cfg config.Config, logger *log.Logger) *Notifier {
	return &Notifier{
		config: cfg,
		logger: logger,
		client: http.DefaultClient,
	}
}

func (n *Notifier) Notify(request contact.ContactRequest, ip, reference, priority string) {
	text := formatMessage(request, ip, reference, priority)

	n.logger.Printf(
		"[contact] %s %s <%s> company=%q industry=%q type=%q",
		reference,
		request.Name,
		request.Email,
		request.Company,
		request.Industry,
		request.ProjectType,
	)

	if err := appendToFile(n.config.ContactLogFile, text); err != nil {
		n.logger.Printf("[contact] %s file notify error: %v", reference, err)
	}

	if n.config.TelegramBotToken != "" && n.config.TelegramChatID != "" {
		if err := n.sendTelegram(n.config.TelegramBotToken, n.config.TelegramChatID, text); err != nil {
			n.logger.Printf("[contact] %s telegram notify error: %v", reference, err)
		}
	}

	if n.config.ResendAPIKey != "" {
		subject := "New project inquiry — " + request.Name
		if err := n.sendResend(
			n.config.ResendAPIKey,
			n.config.ContactFrom,
			n.config.ContactTo,
			subject,
			text,
		); err != nil {
			n.logger.Printf("[contact] %s resend notify error: %v", reference, err)
		}
	}
}

func formatMessage(request contact.ContactRequest, ip, reference, priority string) string {
	return fmt.Sprintf(
		"New SekaiDev inquiry\nRef: %s\nPriority: %s\nLocale: %s\nName: %s\nEmail: %s\nCompany: %s\nIndustry: %s\nType: %s\nTimeline: %s\nBudget: %s\nIP: %s\n\n%s",
		reference,
		priority,
		emptyDash(request.Locale),
		request.Name,
		request.Email,
		emptyDash(request.Company),
		emptyDash(request.Industry),
		emptyDash(request.ProjectType),
		emptyDash(request.Timeline),
		emptyDash(request.Budget),
		ip,
		request.Message,
	)
}

func appendToFile(path, text string) error {
	if path == "" {
		return fmt.Errorf("contact log path is empty")
	}

	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		return err
	}

	file, err := os.OpenFile(path, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0o644)
	if err != nil {
		return err
	}

	_, writeErr := fmt.Fprintf(file, "\n--- %s ---\n%s\n", time.Now().UTC().Format(time.RFC3339), text)
	closeErr := file.Close()
	if writeErr != nil {
		return writeErr
	}
	return closeErr
}

func (n *Notifier) sendTelegram(token, chatID, text string) error {
	endpoint := fmt.Sprintf("https://api.telegram.org/bot%s/sendMessage", token)
	form := url.Values{}
	form.Set("chat_id", chatID)
	form.Set("text", text)

	ctx, cancel := context.WithTimeout(context.Background(), 8*time.Second)
	defer cancel()

	request, err := http.NewRequestWithContext(
		ctx,
		http.MethodPost,
		endpoint,
		strings.NewReader(form.Encode()),
	)
	if err != nil {
		return err
	}
	request.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	response, err := n.client.Do(request)
	if err != nil {
		return err
	}
	defer response.Body.Close()

	if response.StatusCode >= http.StatusMultipleChoices {
		body, _ := io.ReadAll(io.LimitReader(response.Body, 512))
		return fmt.Errorf("telegram status %d: %s", response.StatusCode, string(body))
	}
	return nil
}

func (n *Notifier) sendResend(apiKey, from, to, subject, text string) error {
	payload := map[string]any{
		"from":    from,
		"to":      []string{to},
		"subject": subject,
		"text":    text,
	}
	body, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	ctx, cancel := context.WithTimeout(context.Background(), 8*time.Second)
	defer cancel()

	request, err := http.NewRequestWithContext(
		ctx,
		http.MethodPost,
		"https://api.resend.com/emails",
		bytes.NewReader(body),
	)
	if err != nil {
		return err
	}
	request.Header.Set("Authorization", "Bearer "+apiKey)
	request.Header.Set("Content-Type", "application/json")

	response, err := n.client.Do(request)
	if err != nil {
		return err
	}
	defer response.Body.Close()

	if response.StatusCode >= http.StatusMultipleChoices {
		responseBody, _ := io.ReadAll(io.LimitReader(response.Body, 512))
		return fmt.Errorf("resend status %d: %s", response.StatusCode, string(responseBody))
	}
	return nil
}

func emptyDash(value string) string {
	if value == "" {
		return "—"
	}
	return value
}
