/**
 * Shared hero surface — the soft gray + radial wash that should shrink
 * with the bonsai on intro scroll (never flat black / #121014).
 */
export const HERO_SURFACE_BG = "#d6d6d6";

export const HERO_SURFACE_IMAGE = [
  "radial-gradient(ellipse 70% 55% at 50% 38%, rgba(232,150,175,0.52), transparent 62%)",
  "radial-gradient(ellipse 55% 45% at 32% 48%, rgba(160,190,230,0.30), transparent 58%)",
  "radial-gradient(ellipse 50% 40% at 68% 42%, rgba(240,200,150,0.26), transparent 55%)",
  "radial-gradient(ellipse 90% 70% at 50% 40%, rgba(255,255,255,0.06), transparent 70%)",
  "linear-gradient(180deg, #d6d6d6 0%, #d0d0d0 100%)",
].join(",");

/** Slightly deeper wash for the long LOOK bar (still soft, not black) */
export const HERO_LONG_SURFACE_IMAGE = [
  "radial-gradient(ellipse 80% 90% at 50% 50%, rgba(232,150,175,0.38), transparent 65%)",
  "radial-gradient(ellipse 60% 70% at 30% 40%, rgba(160,190,230,0.22), transparent 60%)",
  "linear-gradient(180deg, #cfcfcf 0%, #c8c8c8 100%)",
].join(",");

export const HERO_LONG_SURFACE_BG = "#cfcfcf";
