# SekaiDev Network

Monorepo hub for SekaiDev portfolio conversion work — multi-agent delivery under **Senior**, tracked in Linear, failures in Sentry.

## Live

- Portfolio: https://portafolio.sekaidevec.com
- Linear: https://linear.app/sekaidevs/project/sekaidev-network-1624686419ce
- Sentry org: https://sekaidev-w5.sentry.io

## Structure

```
portafolio/     # Next.js + Go studio site (synced from production server)
docs/           # Strategy & operating model
```

## Operating model

| Role | Owns |
|------|------|
| Senior | Architecture, review, merge gate |
| Engineering | Features, Sentry, performance |
| Design | UX, hamburger, motion, Look/hero |
| Marketing | Copy, verticals, pricing, experiments |

## Guardrails

- No invented metrics / testimonials
- Do not lower Sprint floor to template pricing
- CyTaxi is the only named public case until more are approved

## Env

Copy `portafolio/frontend/.env.example` → `.env.local` and set Sentry DSNs from the Sentry project settings.
