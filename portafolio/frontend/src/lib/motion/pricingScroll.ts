/** ScrollTrigger values for the pricing horizontal rail. */

export const PRICING_SCROLL = {
  reducedMotionQuery: "(prefers-reduced-motion: reduce)",
  desktopQuery: "(min-width: 900px)",
  /** Mobile scrub — soft catch-up with Lenis. */
  scrub: 0.55,
  /** Desktop scrub — tighter lock to the wheel. */
  scrubDesktop: 0.28,
  /** Extra vertical scroll after the track finishes (mobile). */
  endPadScreens: 0.35,
  /** Short release on desktop so the pin does not feel stuck. */
  endPadScreensDesktop: 0.12,
  /** Floor when overflow is tiny (mobile optical padding edge cases). */
  minTravelPx: 480,
  minTravelPxDesktop: 80,
} as const;
