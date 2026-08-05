# SekaiDev-Network

A tiny developer-network starter app built with **Node.js + TypeScript + Express**.
It serves a small REST API and a static single-page frontend that lists and adds
"dev nodes" (members of the network). State is kept in-memory so the app runs with
zero external dependencies.

## Requirements

- Node.js >= 20 (developed on Node 22)
- npm

## Getting started

```bash
npm ci        # install dependencies (use `npm install` on first run without a lockfile)
npm run dev   # start the dev server with live reload at http://localhost:3000
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (tsx watch) on port 3000 |
| `npm run build` | Type-check and compile TypeScript to `dist/` |
| `npm start` | Run the compiled server from `dist/` |
| `npm run typecheck` | Type-check without emitting |
| `npm run lint` | Run ESLint |
| `npm test` | Run the Vitest test suite |

## API

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Liveness probe (`{ status, uptime, timestamp }`) |
| `GET` | `/api/nodes` | List all dev nodes |
| `POST` | `/api/nodes` | Add a dev node (`{ name, role? }`) |

The frontend is served from `public/` at `/`.

## Project layout

```
src/         TypeScript source (Express app + server entry)
public/      Static frontend (HTML/CSS/JS)
test/        Vitest + supertest API tests
```
