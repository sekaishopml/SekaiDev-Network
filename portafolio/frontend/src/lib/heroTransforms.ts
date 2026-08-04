import gsap from "gsap";

/**
 * Fallback end-state geometry (Casa Angelina reference layout), used only
 * before #bonsai-target / #media-long can be measured (e.g. first paint).
 * Mirrors LookSection's CSS so there is no visible pop once live
 * measurement takes over.
 */
export const LOOK_FRAME_FALLBACK = {
  desktop: {
    // Approx. right column (~34vw) + md:px-12 gutters — live measure overrides
    bonsai: { xVw: 62, yVh: 18, widthVw: 34, heightVh: 20 },
    long: { xVw: 3, yVh: 42, widthVw: 56, heightVh: 14 },
  },
  mobile: {
    // Full content width — compressed under navbar; live measure overrides
    bonsai: { xVw: 4, yVh: 22, widthVw: 92, heightVh: 16 },
    long: { xVw: 4, yVh: 40, widthVw: 92, heightVh: 11 },
  },
} as const;

/** Single scroll gesture drives the whole intro — no scroll distance needed. */
export const TRANSITION_DURATION_IN = 2.1; // hero -> look (deep, cinematic)
export const TRANSITION_DURATION_OUT = 1.4; // look -> hero (snappier return)

export interface HeroRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface IntroLayoutRects {
  bonsai: HeroRect;
  longPanel: HeroRect;
}

function frameToRect(
  frame: { xVw: number; yVh: number; widthVw: number; heightVh: number },
  viewportW: number,
  viewportH: number
): HeroRect {
  return {
    left: (frame.xVw / 100) * viewportW,
    top: (frame.yVh / 100) * viewportH,
    width: (frame.widthVw / 100) * viewportW,
    height: (frame.heightVh / 100) * viewportH,
  };
}

export function getFallbackLayout(
  viewportW: number,
  viewportH: number,
  isMobile: boolean
): IntroLayoutRects {
  const L = isMobile ? LOOK_FRAME_FALLBACK.mobile : LOOK_FRAME_FALLBACK.desktop;
  return {
    bonsai: frameToRect(L.bonsai, viewportW, viewportH),
    longPanel: frameToRect(L.long, viewportW, viewportH),
  };
}

/**
 * Live measurement — always the source of truth once LookSection is in the
 * DOM. Because LookSection overlaps the hero from y=0 (negative margin), the
 * targets already sit at their final on-screen position even before any
 * real scrolling happens, so this is safe to call every frame.
 */
export function measureLookTargets(): IntroLayoutRects | null {
  const bonsaiEl = document.getElementById("bonsai-target");
  const longEl = document.getElementById("media-long");
  if (!bonsaiEl || !longEl) return null;

  const b = bonsaiEl.getBoundingClientRect();
  const l = longEl.getBoundingClientRect();
  if (b.width < 8 || b.height < 8 || l.width < 8 || l.height < 8) return null;

  return {
    bonsai: { left: b.left, top: b.top, width: b.width, height: b.height },
    longPanel: { left: l.left, top: l.top, width: l.width, height: l.height },
  };
}

export function getStartRect(viewportW: number, viewportH: number): HeroRect {
  return { left: 0, top: 0, width: viewportW, height: viewportH };
}

export function lerpRect(a: HeroRect, b: HeroRect, progress: number): HeroRect {
  const p = gsap.utils.clamp(0, 1, progress);
  return {
    left: gsap.utils.interpolate(a.left, b.left, p),
    top: gsap.utils.interpolate(a.top, b.top, p),
    width: gsap.utils.interpolate(a.width, b.width, p),
    height: gsap.utils.interpolate(a.height, b.height, p),
  };
}

export function applyRect(el: HTMLElement, rect: HeroRect, radius = "0px") {
  el.style.left = `${rect.left}px`;
  el.style.top = `${rect.top}px`;
  el.style.width = `${rect.width}px`;
  el.style.height = `${rect.height}px`;
  el.style.borderRadius = radius;
}

export function setIntroPhaseFromProgress(p: number) {
  const phase = p <= 0.02 ? "hero" : p >= 0.97 ? "done" : "animating";
  document.documentElement.dataset.intro = phase;
}

function smoothstep(t: number): number {
  const x = gsap.utils.clamp(0, 1, t);
  return x * x * (3 - 2 * x);
}

/** Progress window [start, end] mapped to 0..1 with smooth easing */
export function introSegment(p: number, start: number, end: number): number {
  if (end <= start) return p >= end ? 1 : 0;
  return smoothstep((p - start) / (end - start));
}

function applyTypographyEl(
  el: HTMLElement | null,
  reveal: number,
  x: number,
  y: number
) {
  if (!el) return;
  el.style.opacity = String(reveal);
  el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
}

/**
 * LOOK typography motion tied 1:1 to intro progress.
 * Sets CSS vars + direct DOM styles so text stays visible even if
 * React/Lenis re-mounts reset custom properties.
 */
export function applyLookTypography(p: number) {
  const root = document.documentElement;
  const clamped = gsap.utils.clamp(0, 1, p);

  root.style.setProperty("--intro-p", String(clamped));
  root.dataset.introProgress = String(Math.round(clamped * 1000));

  const lookReveal = introSegment(clamped, 0.26, 0.54);
  const beyondReveal = introSegment(clamped, 0.34, 0.6);
  const findReveal = introSegment(clamped, 0.48, 0.76);
  const trueReveal = introSegment(clamped, 0.6, 0.9);

  const lookX = (1 - lookReveal) * -18;
  const lookY = (1 - lookReveal) * -48;
  const beyondY = (1 - beyondReveal) * -32;
  const findX = (1 - findReveal) * 22;
  const findY = (1 - findReveal) * 44;
  const trueY = (1 - trueReveal) * 36;

  root.style.setProperty("--look-reveal", String(lookReveal));
  root.style.setProperty("--look-block-y", `${lookY}px`);
  root.style.setProperty("--look-x", `${lookX}px`);

  root.style.setProperty("--beyond-reveal", String(beyondReveal));
  root.style.setProperty("--beyond-y", `${beyondY}px`);

  root.style.setProperty("--find-reveal", String(findReveal));
  root.style.setProperty("--find-y", `${findY}px`);
  root.style.setProperty("--find-x", `${findX}px`);

  root.style.setProperty("--true-reveal", String(trueReveal));
  root.style.setProperty("--true-y", `${trueY}px`);

  applyTypographyEl(
    document.getElementById("look-title"),
    lookReveal,
    lookX,
    lookY
  );
  applyTypographyEl(
    document.getElementById("look-beyond"),
    beyondReveal,
    0,
    beyondY
  );
  applyTypographyEl(
    document.getElementById("look-find"),
    findReveal,
    findX,
    findY
  );
  applyTypographyEl(
    document.getElementById("look-true"),
    trueReveal,
    0,
    trueY
  );
}

export function resetLookTypography() {
  setIntroPhaseFromProgress(0);
  applyLookTypography(0);
  delete document.documentElement.dataset.introProgress;
  document.getElementById("look-title")?.style.removeProperty("opacity");
  document.getElementById("look-title")?.style.removeProperty("transform");
  document.getElementById("look-beyond")?.style.removeProperty("opacity");
  document.getElementById("look-beyond")?.style.removeProperty("transform");
  document.getElementById("look-find")?.style.removeProperty("opacity");
  document.getElementById("look-find")?.style.removeProperty("transform");
  document.getElementById("look-true")?.style.removeProperty("opacity");
  document.getElementById("look-true")?.style.removeProperty("transform");
}
