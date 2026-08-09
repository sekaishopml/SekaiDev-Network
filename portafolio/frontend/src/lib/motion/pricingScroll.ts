/** ScrollTrigger values for the pricing horizontal rail. */

export const PRICING_SCROLL = {
  reducedMotionQuery: "(prefers-reduced-motion: reduce)",
  desktopQuery: "(min-width: 900px)",
  /** Mobile scrub — soft catch-up with Lenis. */
  scrub: 0.62,
  /** Desktop scrub — deliberate lock to the wheel. */
  scrubDesktop: 0.34,
  /** Extra vertical scroll after the track finishes (mobile). */
  endPadScreens: 0.55,
  /** Desktop release — intentional “wow” after the last card. */
  endPadScreensDesktop: 0.48,
  /** Floor when overflow is tiny (mobile optical padding edge cases). */
  minTravelPx: 520,
  /** Desktop floor so short overflow still maps to ~0.8× viewport. */
  minTravelPxDesktop: 720,
  /** Stretch measured overflow so 4 tiers never feel like one swipe. */
  travelMultiplierDesktop: 1.28,
  travelMultiplierMobile: 1.12,
  /** Clamp total pin distance in viewport screens (desktop). */
  targetScreensDesktopMin: 1.3,
  targetScreensDesktopMax: 1.65,
} as const;
