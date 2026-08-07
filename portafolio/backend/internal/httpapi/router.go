package httpapi

import (
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	"sekaidev/backend/internal/contact"
)

// NewRouter wires all public API routes and middleware.
func NewRouter(contactService *contact.Service) http.Handler {
	router := chi.NewRouter()
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)
	router.Use(corsMiddleware)
	router.Use(middleware.RealIP)

	router.Get("/api/health", func(response http.ResponseWriter, _ *http.Request) {
		writeJSON(response, http.StatusOK, map[string]any{
			"ok":     true,
			"status": "ok",
		})
	})

	handler := &contactHandler{
		service: contactService,
		limiter: newRateLimiter(10*time.Minute, 5, maxTrackedIPs),
	}
	router.Post("/api/contact", handler.serveHTTP)

	return router
}
