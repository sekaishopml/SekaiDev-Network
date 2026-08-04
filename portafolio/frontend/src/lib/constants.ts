// Centralized configuration for static assets and loader timing.
export const ASSETS = {
  model: "/models/sakura_bonsai.glb",
  dracoPath: "/draco/",
} as const;

export const LOADER = {
  // The loader is a brand accent, not a dependency gate for the sales message.
  minDuration: 700,
  // 3D may fail or be slow; the page must still become usable quickly.
  maxDuration: 3200,
} as const;
