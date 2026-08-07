/** Motion values shared by the responsive Featured Case timelines. */

/**
 * The pin+scrub cinema needs real vertical room to breathe (it holds the
 * viewport for `pinScreens` extra screens). Below either threshold — narrow
 * width (phones/small tablets) OR short height (landscape phones, split-
 * screen browsers, short laptop windows) — we fall back to the stacked,
 * non-pinned editorial layout instead. Keep these two query strings exact
 * complements of each other (De Morgan's law) so every viewport lands in
 * exactly one branch, never both/neither.
 */
const DESKTOP_MIN_WIDTH = 960;
const DESKTOP_MIN_HEIGHT = 700;

export const FEATURED_CINE = {
  desktopQuery: `(min-width: ${DESKTOP_MIN_WIDTH}px) and (min-height: ${DESKTOP_MIN_HEIGHT}px)`,
  mobileQuery: `(max-width: ${DESKTOP_MIN_WIDTH - 1}px), (max-height: ${DESKTOP_MIN_HEIGHT - 1}px)`,
  reducedMotionQuery: "(prefers-reduced-motion: reduce)",
  /** Desktop-only scroll distance, measured again on every refresh. */
  pinScreens: 1.85,
  scrub: 0.75,
  /** Keep the desktop bloom inside its column at every supported width. */
  titleScaleFrom: 1.16,
  titleYFrom: 42,
  stageScaleFrom: 0.9,
  stageYFrom: 34,
  /** Mobile is reveal-on-enter only; it never receives a scrub timeline. */
  mobileRevealDuration: 0.52,
  mobilePathDuration: 0.85,
  mobileStageScaleFrom: 0.95,
  mobilePanelYFrom: 22,
  mobilePanelScaleFrom: 0.985,
  /**
   * Decorative-only atmosphere drift for mobile. Scoped to the intro→stage→
   * story block (the pin wrapper) so it reads as a short, local depth cue —
   * never a page-length or pinned scrub of real content.
   */
  mobileAtmosphereScrub: 0.6,
  mobileAtmosphereRange: 22,
  /** Chapter crossfade slots on the master timeline (0–1) */
  chapterWindows: [
    { start: 0.42, end: 0.55 },
    { start: 0.55, end: 0.68 },
    { start: 0.68, end: 0.8 },
    { start: 0.8, end: 0.92 },
  ] as const,
  easeHold: "none" as const,
} as const;
