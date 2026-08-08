/** Offer rail — scroll-unfold of capability stages */

export const OFFER_SCROLL = {
  start: "top 68%",
  end: "top 46%",
  /** Slightly taut scrub — reads premium without lag */
  scrub: 0.55,
  reducedQuery: "(prefers-reduced-motion: reduce)",
} as const;
