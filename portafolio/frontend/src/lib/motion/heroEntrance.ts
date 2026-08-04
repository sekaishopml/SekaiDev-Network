/** Hero presentation timing — post-curtain cinematic entrance */

export const HERO_ENTRANCE = {
  /** Brief bonsai beat after curtain — keep snappy */
  presentationHold: 0.45,
  /** Mobile: hold centered flower, then drop (seconds) */
  bonsaiSettleDelay: 0.5,
  bonsaiSettleDuration: 0.85,
  /** Atmosphere leads copy slightly */
  arcLead: 0.28,
  arcDuration: 1.05,
  arcY: 10,
  /** Radial color bloom (center → out) */
  bloomDuration: 1.2,
  bloomClipStart: "6%",
  bloomClipEnd: "140%",
  bloomOrigin: "50% 38%",
  bloomOpacityFrom: 0.4,
  bloomOpacityTo: 1,
  /** Soft copy cascade */
  copyDuration: 0.9,
  copyStagger: 0.05,
  copyY: 18,
  copyStaggerFrom: 1,
  easeCopy: "power2.out" as const,
  easeArc: "sine.out" as const,
  easeBloom: "power2.out" as const,
} as const;

/** Curtain exit from LoadingController (ms) — keep short */
export const LOADER_CURTAIN = {
  uiFade: 220,
  knockoutHold: 280,
  rise: 620,
  removeAfter: 80,
  /** Total ~1.1s from loaded → dismissed */
} as const;
