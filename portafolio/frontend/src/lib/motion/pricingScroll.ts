/** ScrollTrigger values for the pricing horizontal rail. */

export const PRICING_SCROLL = {
  reducedMotionQuery: "(prefers-reduced-motion: reduce)",
  desktopQuery: "(min-width: 900px)",
  /** Mobile scrub — soft catch-up with Lenis. */
  scrub: 0.45,
  /**
   * Desktop: near 1:1 with the wheel. Higher scrub + Lenis felt laggy.
   * `true` = tied to native scroll position (no catch-up tween).
   */
  scrubDesktop: true as const,
  /** Extra vertical scroll after the track finishes (mobile). */
  endPadScreens: 0.45,
  /** Desktop release after the rail — keep intentional, not endless. */
  endPadScreensDesktop: 0.35,
  /** Floor when overflow is tiny (mobile optical padding edge cases). */
  minTravelPx: 480,
  /** Desktop floor when overflow is tiny. */
  minTravelPxDesktop: 560,
  /** Mild stretch so 4 tiers still feel like a pass — not a long slog. */
  travelMultiplierDesktop: 1.12,
  travelMultiplierMobile: 1.08,
  /** Clamp total pin distance in viewport screens (desktop). */
  targetScreensDesktopMin: 1.05,
  targetScreensDesktopMax: 1.35,
} as const;
