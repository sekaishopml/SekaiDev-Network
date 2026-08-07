/** Featured case cinematic scroll — hero-depth, pin + scrub */

export const FEATURED_CINE = {
  /** Desktop pin distance as viewport multiples */
  pinEnd: "+=220%",
  /** Mobile / reduced: no pin, lighter scrub length */
  mobileScrubEnd: "+=90%",
  scrub: 0.85,
  scrubMobile: 0.65,
  /** Title starts oversized then settles */
  titleScaleFrom: 1.42,
  titleYFrom: 56,
  /** Stage expands into frame */
  stageScaleFrom: 0.82,
  stageYFrom: 48,
  /** Chapter crossfade slots on the master timeline (0–1) */
  chapterWindows: [
    { start: 0.42, end: 0.55 },
    { start: 0.55, end: 0.68 },
    { start: 0.68, end: 0.8 },
    { start: 0.8, end: 0.92 },
  ] as const,
  easeHold: "none" as const,
} as const;
