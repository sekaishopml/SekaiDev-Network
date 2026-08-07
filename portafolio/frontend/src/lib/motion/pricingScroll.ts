/** ScrollTrigger values for the Investment horizontal rail. */

export const PRICING_SCROLL = {
  reducedMotionQuery: "(prefers-reduced-motion: reduce)",
  /** Soft catch-up so the carousel feels locked to the wheel/touch. */
  scrub: 0.55,
  /**
   * Extra vertical scroll after the track finishes traveling — keeps the
   * section "frozen" a beat so the last card is readable before unpinning.
   */
  endPadScreens: 0.45,
  /** Minimum horizontal travel so pin always has something to scrub. */
  minTravelPx: 560,
} as const;
