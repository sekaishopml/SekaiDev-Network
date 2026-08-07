package config

import "os"

const (
	defaultPort        = "8000"
	defaultDatabaseURL = "postgres://sekai:sekai@localhost:5432/sekaidev"
	defaultContactLog  = "/var/log/sekaidev/contacts.log"
	defaultContactTo   = "hello@sekaidevec.com"
	defaultContactFrom = "SekaiDev <onboarding@resend.dev>"
)

// Config contains the backend's environment-based runtime configuration.
type Config struct {
	Port             string
	DatabaseURL      string
	ContactLogFile   string
	TelegramBotToken string
	TelegramChatID   string
	ResendAPIKey     string
	ContactTo        string
	ContactFrom      string
}

// Load reads configuration from the environment while preserving the
// service's existing defaults.
func Load() Config {
	return Config{
		Port:             envOr("PORT", defaultPort),
		DatabaseURL:      envOr("DATABASE_URL", defaultDatabaseURL),
		ContactLogFile:   envOr("CONTACT_LOG_FILE", defaultContactLog),
		TelegramBotToken: os.Getenv("TELEGRAM_BOT_TOKEN"),
		TelegramChatID:   os.Getenv("TELEGRAM_CHAT_ID"),
		ResendAPIKey:     os.Getenv("RESEND_API_KEY"),
		ContactTo:        envOr("CONTACT_TO", defaultContactTo),
		ContactFrom:      envOr("CONTACT_FROM", defaultContactFrom),
	}
}

func envOr(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}
