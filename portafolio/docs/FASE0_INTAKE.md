# Fase 0 — Intake de negocio (SekaiDev Studio)

Checklist para llegar a score marketing ~100. Sin estos assets el techo es ~70 marketing / ~85 técnico-UX.

| # | Asset | Estado | Notas / default en código |
|---|--------|--------|---------------------------|
| 1 | Inbox vivo `hello@sekaidevec.com` | **Pendiente confirmar** | Mailto + API usan este dominio. Configura Resend (`RESEND_API_KEY`) o Telegram (`TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`) en `/opt/SekaiDevEC/backend/.env`. |
| 2 | Instagram / LinkedIn / GitHub reales | **Ocultos** | Socials rotos retirados del nav hasta URLs reales. |
| 3 | CyTaxi: URL viva o screenshot + outcome | **Parcial** | Featured case cualitativo; sin link externo muerto. Añade screenshot en `frontend/public/cases/cytaxi.*`. |
| 4 | ≥2 proyectos (problema · rol · stack · resultado · imagen) | **Parcial** | CyTaxi featured + capabilities etiquetadas honestamente. |
| 5 | ≥2 testimonios (nombre, cargo, frase, outcome) | **Placeholders honestos** | Proof band marca “Reference available on request” hasta testimonios reales. |
| 6 | Calendly / Cal.com | **Opcional** | No cableado; CTA principal = form `#contact`. |

## Cómo desbloquear alertas humanas (&lt;30s)

1. Crea `/opt/SekaiDevEC/backend/.env` (ver `.env.example`).
2. Opción A — Telegram bot: token + chat id.
3. Opción B — Resend: API key + `CONTACT_TO=hello@sekaidevec.com`.
4. `systemctl restart sekaidev-backend.service`
5. Envía un inquiry de prueba desde el form.

## Defaults de producto (fijados en plan)

- **ICP:** startups y marcas — product engineering + brand experiences
- **Email canónico:** `hello@sekaidevec.com`
- **LOOK:** craft opener 3–5s, luego offer/proof inmediato
