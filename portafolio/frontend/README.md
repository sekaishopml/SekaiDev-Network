# Portafolio frontend

Next.js frontend for the SekaiDev portfolio.

## Scripts

- `npm run dev` - start the local app on port 3000.
- `npm run lint` - run Next.js lint checks.
- `npm run typecheck` - run TypeScript with `--noEmit`.
- `npm test` - run the Vitest suite once.
- `npm run test:watch` - run Vitest in watch mode.
- `npm run smoke:contact-schema` - load and smoke-test the contact schema.
- `npm run build` - create a production Next.js build.
- `npm run start` - serve the production build on port 3000.

## Environment

Copy `.env.example` to `.env.local` for local development and fill in values as
needed:

- `NEXT_PUBLIC_SENTRY_DSN`
- `SENTRY_DSN`
- `NEXT_PUBLIC_SENTRY_ENVIRONMENT`
- `SENTRY_ENVIRONMENT`
- `SENTRY_AUTH_TOKEN`
- `NEXT_PUBLIC_WHATSAPP`
- `BACKEND_URL`

`BACKEND_URL` is required in production for the contact API. `NEXT_PUBLIC_WHATSAPP`
is optional; leave it empty to hide WhatsApp UI.

## Deploy note

The server deploy flow is managed outside this package by
`/opt/SekaiDevEC/deploy-frontend.sh`. That script installs dependencies, runs
verification, builds, restarts `sekaidev-frontend`, checks
`http://localhost:3000/es`, and purges Cloudflare when credentials are present.

