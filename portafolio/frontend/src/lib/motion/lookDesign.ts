/** Timing for LookDesignStage — cursor designing a mini web layout */

export const LOOK_DESIGN = {
  cursorIn: 0.25,
  move: 0.5,
  drawOutline: 0.65,
  place: 0.4,
  dimension: 0.5,
  click: 0.3,
  /** Keep composed UI on screen long enough to read */
  hold: 2.4,
  fadeOut: 0.4,
  easeMove: "power2.inOut" as const,
  easePlace: "power2.out" as const,
  easePop: "back.out(1.6)" as const,
  accent: "#5c1a33",
} as const;
