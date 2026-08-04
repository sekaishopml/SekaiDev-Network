/** Shared Casa Angelina–style scroll reveal tokens — one language for all sections */

export const REVEAL = {
  y: 28,
  duration: 0.8,
  stagger: 0.1,
  ease: "power2.out" as const,
  start: "top 72%",
  toggleActions: "play none none reverse" as const,
} as const;

export type RevealPreset = "default" | "headline" | "cards";

export const REVEAL_PRESETS: Record<
  RevealPreset,
  { y: number; duration: number; stagger: number; start: string }
> = {
  default: {
    y: REVEAL.y,
    duration: REVEAL.duration,
    stagger: REVEAL.stagger,
    start: REVEAL.start,
  },
  headline: { y: 20, duration: 0.9, stagger: 0.06, start: "top 78%" },
  cards: { y: 32, duration: 0.8, stagger: 0.08, start: "top 72%" },
};
