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
  /** Desktop release after the rail finishes — enough to feel deliberate. */
  endPadScreensDesktop: 0.2,
  /** Floor when overflow is tiny (mobile optical padding edge cases). */
  minTravelPx: 480,
  /** Desktop floor so short overflow still scrub-maps to the wheel. */
  minTravelPxDesktop: 240,
} as const;
