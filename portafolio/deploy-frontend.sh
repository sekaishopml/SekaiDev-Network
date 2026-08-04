#!/usr/bin/env bash
# Rebuild and restart the SekaiDev frontend, then purge Cloudflare cache.
# Optional: put credentials in /opt/SekaiDevEC/.env (not committed):
#   CF_EMAIL=santiagom2828@gmail.com
#   CF_KEY=...
set -e

cd /opt/SekaiDevEC
[ -f .env ] && source .env

cd frontend

echo "[deploy-frontend] Building..."
npm run build

echo "[deploy-frontend] Restarting sekaidev-frontend..."
systemctl restart sekaidev-frontend

if [ -n "$CF_EMAIL" ] && [ -n "$CF_KEY" ]; then
  echo "[deploy-frontend] Purging Cloudflare cache..."
  ZONE_ID="30c769cdaee71395696110c5bdf9446d"
  curl -s -X POST "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache" \
    -H "X-Auth-Email: ${CF_EMAIL}" \
    -H "X-Auth-Key: ${CF_KEY}" \
    -H "Content-Type: application/json" \
    --data '{"purge_everything":true}' > /dev/null
else
  echo "[deploy-frontend] CF_EMAIL/CF_KEY not set; skipping Cloudflare purge."
fi

echo "[deploy-frontend] Done. Reload with Ctrl+Shift+R."
