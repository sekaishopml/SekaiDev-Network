package httpapi

import (
	"encoding/json"
	"errors"
	"io"
	"net"
	"net/http"
	"strings"

	"sekaidev/backend/internal/contact"
)

type contactHandler struct {
	service *contact.Service
	limiter *rateLimiter
}

type apiError struct {
	OK    bool   `json:"ok"`
	Error string `json:"error"`
}

func (handler *contactHandler) serveHTTP(response http.ResponseWriter, request *http.Request) {
	ip := clientIP(request)
	if !handler.limiter.allow(ip) {
		writeJSON(response, http.StatusTooManyRequests, apiError{
			OK:    false,
			Error: "Too many requests. Try again later.",
		})
		return
	}

	contactRequest, err := decodeContactRequest(request)
	if err != nil {
		writeJSON(response, http.StatusBadRequest, apiError{OK: false, Error: err.Error()})
		return
	}

	result, err := handler.service.Submit(request.Context(), contactRequest, ip)
	if err != nil {
		var validationError *contact.ValidationError
		if errors.As(err, &validationError) {
			writeJSON(response, http.StatusBadRequest, apiError{
				OK:    false,
				Error: validationError.Message,
			})
			return
		}

		writeJSON(response, http.StatusInternalServerError, apiError{
			OK:    false,
			Error: "Internal error",
		})
		return
	}

	payload := map[string]any{
		"ok":        true,
		"reference": result.Reference,
		"status":    "received",
		"message":   "We received your inquiry and typically reply within 24 hours.",
	}
	if result.Priority != "" {
		payload["priority"] = result.Priority
	}
	writeJSON(response, http.StatusOK, payload)
}

func decodeContactRequest(request *http.Request) (contact.ContactRequest, error) {
	var result contact.ContactRequest
	contentType := request.Header.Get("Content-Type")

	if strings.Contains(contentType, "application/json") || contentType == "" {
		body, err := io.ReadAll(io.LimitReader(request.Body, 1<<20))
		if err != nil {
			return result, errors.New("Invalid request")
		}
		if err := json.Unmarshal(body, &result); err != nil {
			return result, errors.New("Invalid JSON")
		}
		return result, nil
	}

	if err := request.ParseForm(); err != nil {
		return result, errors.New("Invalid form")
	}

	result = contact.ContactRequest{
		Name:        request.FormValue("name"),
		Email:       request.FormValue("email"),
		Company:     request.FormValue("company"),
		Industry:    request.FormValue("industry"),
		ProjectType: firstNonEmpty(request.FormValue("projectType"), request.FormValue("project_type")),
		Timeline:    request.FormValue("timeline"),
		Budget:      request.FormValue("budget"),
		Message:     request.FormValue("message"),
		Website:     request.FormValue("website"),
	}
	return result, nil
}

func clientIP(request *http.Request) string {
	if forwardedFor := request.Header.Get("X-Forwarded-For"); forwardedFor != "" {
		parts := strings.Split(forwardedFor, ",")
		return strings.TrimSpace(parts[0])
	}
	if realIP := request.Header.Get("X-Real-IP"); realIP != "" {
		return strings.TrimSpace(realIP)
	}
	host, _, err := net.SplitHostPort(request.RemoteAddr)
	if err != nil {
		return request.RemoteAddr
	}
	return host
}

func firstNonEmpty(values ...string) string {
	for _, value := range values {
		if strings.TrimSpace(value) != "" {
			return value
		}
	}
	return ""
}

func writeJSON(response http.ResponseWriter, status int, value any) {
	response.Header().Set("Content-Type", "application/json")
	response.WriteHeader(status)
	_ = json.NewEncoder(response).Encode(value)
}
