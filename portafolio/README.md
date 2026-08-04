# SekaiDev Portfolio

Next.js 14 (App Router) + Tailwind CSS frontend, Go + Chi + pgx backend, PostgreSQL 16.

## Quick structure

```
frontend/
  src/app/              # Next.js App Router pages & layout
  src/components/       # React components
    loading/            # Splash screen logic
    three/              # React Three Fiber / bonsai scene
  src/hooks/            # Reusable state hooks
  src/lib/              # Constants, utilities, bonsai.config.ts
  public/models/        # sakura_bonsai.glb
  public/draco/         # Self-hosted Draco decoder files
backend/
  main.go               # Go HTTP server
  main                  # Compiled binary
nginx/
  portafolio.sekaidevec.com.conf
systemd/
  sekaidev-frontend.service
  sekaidev-backend.service
```

## Splash screen (telón)

- The static markup is rendered server-side in `src/app/layout.tsx` (`#sekaidev-loader`).
- `src/hooks/useBonsaiLoad.ts` enforces a minimum duration and a safety maximum.
- `src/components/loading/LoadingController.tsx` hides the loader once `loaded` is true.
- `src/components/three/Scene3D.tsx` notifies `useBonsaiLoad` when the GLB + Draco decoder are ready.

## 3D bonsai

- Model: `public/models/sakura_bonsai.glb` (Draco-compressed).
- Decoder: self-hosted `public/draco/` (loaded by `useGLTF(model, dracoPath)`).
- Scene component: `src/components/three/Scene3D.tsx`.
- Tweak position, rotation, scale, camera and lights in `src/lib/bonsai.config.ts`.

## Deployment workflow

1. Edit files in `/home/ubuntu/repos/SekaiDev_EC`.
2. Copy changed files to `/opt/SekaiDevEC` on the server with `scp`.
3. Run `npm run build` in `/opt/SekaiDevEC/frontend`.
4. Restart `sekaidev-frontend` and `sekaidev-backend` (`systemctl restart ...`).
5. Purge Cloudflare cache if assets changed.

## Services

- `sekaidev-frontend`: Next.js production (`next start -p 3000`)
- `sekaidev-backend`: Go API on `:8000`
- nginx: reverse proxy `/:3000` and `/api:8000`; serves `/_next/static/`, `/models/` and `/draco/` directly.
