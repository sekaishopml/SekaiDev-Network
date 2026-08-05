/** Hero presentation timing — post-curtain cinematic entrance */

export const HERO_ENTRANCE = {
  /** Breath after curtain — bonsai still owns the frame */
  presentationHold: 0.55,
  /** Hold big centered reveal, then settle (desktop aside / mobile under CTA) */
  bonsaiSettleDelay: 0.55,
  bonsaiSettleDuration: 1.05,
  /** Atmosphere leads copy slightly */
  arcLead: 0.28,
  arcDuration: 1.05,
  arcY: 10,
  /** Radial color bloom (center → out) */
  bloomDuration: 1.15,
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

/**
 * Curtain exit from LoadingController (ms).
 * Intermediate pace (~2.1s): clear pauses without dragging.
 * Dismiss mid-rise so bonsai settle overlaps the lift.
 */
export const LOADER_CURTAIN = {
  /** Fade solid SEKAIDEV / subtitle / spinner */
  uiFade: 400,
  /** Bonsai through letter knockout — readable hold */
  knockoutHold: 720,
  /** Panel rises off */
  rise: 1100,
  /** Opacity fade starts after rise has begun */
  riseFadeDelay: 340,
  /** Fire sekaidev:loader-dismissed this far into the rise (0–1) */
  dismissAtRise: 0.36,
  removeAfter: 160,
} as const;
