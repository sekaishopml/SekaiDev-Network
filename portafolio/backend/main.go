package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"sekaidev/backend/internal/config"
	"sekaidev/backend/internal/contact"
	"sekaidev/backend/internal/db"
	"sekaidev/backend/internal/httpapi"
	"sekaidev/backend/internal/notify"
)

const (
	readHeaderTimeout = 5 * time.Second
	readTimeout       = 15 * time.Second
	writeTimeout      = 15 * time.Second
	idleTimeout       = 60 * time.Second
	shutdownTimeout   = 15 * time.Second
)

func main() {
	if err := run(); err != nil {
		log.Fatalf("backend error: %v", err)
	}
}

func run() error {
	cfg := config.Load()
	logger := log.Default()

	pool, err := db.Open(context.Background(), cfg.DatabaseURL)
	if err != nil {
		return fmt.Errorf("unable to connect to database: %w", err)
	}
	defer pool.Close()

	if err := db.EnsureSchema(context.Background(), pool); err != nil {
		return fmt.Errorf("schema error: %w", err)
	}

	repository := contact.NewPGXRepository(pool)
	notifier := notify.New(cfg, logger)
	contactService := contact.NewService(repository, notifier, logger)

	server := &http.Server{
		Addr:              ":" + cfg.Port,
		Handler:           httpapi.NewRouter(contactService),
		ReadHeaderTimeout: readHeaderTimeout,
		ReadTimeout:       readTimeout,
		WriteTimeout:      writeTimeout,
		IdleTimeout:       idleTimeout,
	}

	signalContext, stopSignals := signal.NotifyContext(
		context.Background(),
		os.Interrupt,
		syscall.SIGTERM,
	)
	defer stopSignals()

	serverErrors := make(chan error, 1)
	go func() {
		logger.Printf("backend listening on %s", server.Addr)
		serverErrors <- server.ListenAndServe()
	}()

	select {
	case err := <-serverErrors:
		if !errors.Is(err, http.ErrServerClosed) {
			return fmt.Errorf("server error: %w", err)
		}
		return nil
	case <-signalContext.Done():
		logger.Printf("shutdown signal received")
	}

	shutdownContext, cancelShutdown := context.WithTimeout(context.Background(), shutdownTimeout)
	defer cancelShutdown()

	if err := server.Shutdown(shutdownContext); err != nil {
		_ = server.Close()
		return fmt.Errorf("graceful shutdown: %w", err)
	}

	if err := <-serverErrors; !errors.Is(err, http.ErrServerClosed) {
		return fmt.Errorf("server error: %w", err)
	}

	logger.Printf("backend stopped")
	return nil
}
