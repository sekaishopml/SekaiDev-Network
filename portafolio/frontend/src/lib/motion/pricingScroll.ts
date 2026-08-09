/** ScrollTrigger values for the Investment horizontal rail. */

export const PRICING_SCROLL = {
  reducedMotionQuery: "(prefers-reduced-motion: reduce)",
  /** Soft catch-up so the carousel feels locked to the wheel/touch. */
  scrub: 0.55,
  /** Snappier scrub on desktop — less lag against Lenis. */
  scrubDesktop: 0.35,
  /**
   * Extra vertical scroll after the track finishes traveling — keeps the
   * section "frozen" a beat so the last card is readable before unpinning.
   */
  endPadScreens: 0.45,
  /** Shorter hold on desktop so the pin does not overstay. */
  endPadScreensDesktop: 0.18,
  /** Minimum horizontal travel so pin always has something to scrub (mobile). */
  minTravelPx: 560,
  /** Desktop only enforces a floor when overflow is nearly zero. */
  minTravelPxDesktop: 120,
  desktopQuery: "(min-width: 900px)",
} as const;
