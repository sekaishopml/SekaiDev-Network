package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

// Open creates a PostgreSQL connection pool. The first schema query verifies
// connectivity, matching the previous startup behavior.
func Open(ctx context.Context, databaseURL string) (*pgxpool.Pool, error) {
	return pgxpool.New(ctx, databaseURL)
}

// EnsureSchema creates and upgrades the contacts table at service startup.
func EnsureSchema(ctx context.Context, pool *pgxpool.Pool) error {
	_, err := pool.Exec(ctx, `
		CREATE TABLE IF NOT EXISTS contacts (
			id SERIAL PRIMARY KEY,
			name TEXT NOT NULL,
			email TEXT NOT NULL,
			message TEXT NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);
		ALTER TABLE contacts ADD COLUMN IF NOT EXISTS company TEXT DEFAULT '';
		ALTER TABLE contacts ADD COLUMN IF NOT EXISTS industry TEXT DEFAULT '';
		ALTER TABLE contacts ADD COLUMN IF NOT EXISTS project_type TEXT DEFAULT '';
		ALTER TABLE contacts ADD COLUMN IF NOT EXISTS timeline TEXT DEFAULT '';
		ALTER TABLE contacts ADD COLUMN IF NOT EXISTS budget TEXT DEFAULT '';
		ALTER TABLE contacts ADD COLUMN IF NOT EXISTS reference TEXT DEFAULT '';
		ALTER TABLE contacts ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'received';
		ALTER TABLE contacts ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'normal';
	`)
	return err
}
