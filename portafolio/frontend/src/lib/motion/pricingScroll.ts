/** ScrollTrigger values for the Investment horizontal rail (section 05). */

const DESKTOP_MIN_WIDTH = 768;
const DESKTOP_MIN_HEIGHT = 640;

export const PRICING_SCROLL = {
  /** Pin + scrub horizontal — needs room to breathe. */
  desktopQuery: `(min-width: ${DESKTOP_MIN_WIDTH}px) and (min-height: ${DESKTOP_MIN_HEIGHT}px)`,
  /** Native snap rail on phones / short viewports. */
  mobileQuery: `(max-width: ${DESKTOP_MIN_WIDTH - 1}px), (max-height: ${DESKTOP_MIN_HEIGHT - 1}px)`,
  reducedMotionQuery: "(prefers-reduced-motion: reduce)",
  scrub: 0.85,
  /** Extra scroll distance as a fraction of the horizontal travel. */
  endPad: 0.08,
} as const;
