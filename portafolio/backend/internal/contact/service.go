package contact

import (
	"context"
	"fmt"
	"log"
	"regexp"
	"strings"
	"time"
)

var emailRE = regexp.MustCompile(`^[^\s@]+@[^\s@]+\.[^\s@]+$`)

// ContactRequest is the accepted JSON and form payload for a contact inquiry.
type ContactRequest struct {
	Name        string `json:"name"`
	Email       string `json:"email"`
	Company     string `json:"company"`
	Industry    string `json:"industry"`
	ProjectType string `json:"projectType"`
	Timeline    string `json:"timeline"`
	Budget      string `json:"budget"`
	Message     string `json:"message"`
	Website     string `json:"website"` // honeypot
	Locale      string `json:"locale"`
}

type Result struct {
	Reference string
	Priority  string
}

// ValidationError is safe to return to API callers.
type ValidationError struct {
	Message string
}

func (e *ValidationError) Error() string {
	return e.Message
}

// Notifier delivers an accepted inquiry to configured human notification
// channels.
type Notifier interface {
	Notify(ContactRequest, string, string, string)
}

type Service struct {
	repository Repository
	notifier   Notifier
	logger     *log.Logger
}

func NewService(repository Repository, notifier Notifier, logger *log.Logger) *Service {
	return &Service{
		repository: repository,
		notifier:   notifier,
		logger:     logger,
	}
}

// Submit validates, persists, and asynchronously notifies for an inquiry.
func (s *Service) Submit(ctx context.Context, request ContactRequest, ip string) (Result, error) {
	normalize(&request)

	reference := newLeadReference()
	if request.Website != "" {
		return Result{Reference: reference}, nil
	}

	if err := validate(request); err != nil {
		return Result{}, err
	}

	priority := leadPriority(request.Timeline, request.Budget)
	if err := s.repository.Insert(ctx, request, reference, priority); err != nil {
		s.logger.Printf("contact insert error: %v", err)
		return Result{}, err
	}

	go s.notifier.Notify(request, ip, reference, priority)

	return Result{Reference: reference, Priority: priority}, nil
}

func normalize(request *ContactRequest) {
	request.Name = strings.TrimSpace(request.Name)
	request.Email = strings.TrimSpace(strings.ToLower(request.Email))
	request.Company = strings.TrimSpace(request.Company)
	request.Industry = strings.TrimSpace(request.Industry)
	request.ProjectType = strings.TrimSpace(request.ProjectType)
	request.Timeline = strings.TrimSpace(request.Timeline)
	request.Budget = strings.TrimSpace(request.Budget)
	request.Message = strings.TrimSpace(request.Message)
	request.Website = strings.TrimSpace(request.Website)
	request.Locale = strings.TrimSpace(request.Locale)
	if len(request.Locale) > 8 {
		request.Locale = request.Locale[:8]
	}
}

func validate(request ContactRequest) error {
	if len(request.Name) < 2 || len(request.Name) > 120 {
		return &ValidationError{Message: "Invalid name"}
	}
	if !emailRE.MatchString(request.Email) || len(request.Email) > 200 {
		return &ValidationError{Message: "Invalid email"}
	}
	if len(request.Company) > 160 {
		return &ValidationError{Message: "Invalid company"}
	}
	if len(request.Industry) > 80 ||
		len(request.ProjectType) > 80 ||
		len(request.Timeline) > 80 ||
		len(request.Budget) > 80 {
		return &ValidationError{Message: "Invalid fields"}
	}
	if len(request.Message) < 10 || len(request.Message) > 4000 {
		return &ValidationError{Message: "Invalid message"}
	}
	return nil
}

func newLeadReference() string {
	now := time.Now().UTC()
	suffix := fmt.Sprintf("%X", now.UnixNano()%0xFFFF)
	return fmt.Sprintf("SKD-%s-%s", now.Format("20060102"), suffix)
}

func leadPriority(timeline, budget string) string {
	timeline = strings.ToLower(timeline)
	budget = strings.ToLower(budget)
	if strings.Contains(timeline, "asap") &&
		(strings.Contains(budget, "45k") ||
			strings.Contains(budget, "40k") ||
			strings.Contains(budget, "retainer")) {
		return "high"
	}
	if strings.Contains(budget, "45k") ||
		strings.Contains(budget, "retainer") ||
		strings.Contains(budget, "partner") {
		return "high"
	}
	if strings.Contains(timeline, "exploring") || strings.Contains(budget, "not sure") {
		return "low"
	}
	return "normal"
}
