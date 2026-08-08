/** Offer rail — scroll-unfold of capability stages */

export const OFFER_SCROLL = {
  /** Row enters — stage begins to open */
  start: "top 72%",
  /** Fully open by here */
  end: "top 38%",
  scrub: 0.85,
  easePanel: "none" as const,
  reducedQuery: "(prefers-reduced-motion: reduce)",
} as const;
