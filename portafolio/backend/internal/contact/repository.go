package contact

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

// Repository stores accepted contact inquiries.
type Repository interface {
	Insert(context.Context, ContactRequest, string, string) error
}

// PGXRepository stores contact inquiries in PostgreSQL.
type PGXRepository struct {
	pool *pgxpool.Pool
}

func NewPGXRepository(pool *pgxpool.Pool) *PGXRepository {
	return &PGXRepository{pool: pool}
}

func (r *PGXRepository) Insert(ctx context.Context, request ContactRequest, reference, priority string) error {
	_, err := r.pool.Exec(ctx, `
		INSERT INTO contacts (name, email, message, company, industry, project_type, timeline, budget, reference, status, priority)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'received', $10)`,
		request.Name,
		request.Email,
		request.Message,
		request.Company,
		request.Industry,
		request.ProjectType,
		request.Timeline,
		request.Budget,
		reference,
		priority,
	)
	return err
}
