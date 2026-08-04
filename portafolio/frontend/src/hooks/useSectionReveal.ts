"use client";

import { type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGsapSafe";
import {
  REVEAL,
  REVEAL_PRESETS,
  type RevealPreset,
} from "@/lib/motion/revealPresets";

gsap.registerPlugin(ScrollTrigger);

/**
 * Canonical scroll reveal for mid-page sections.
 * Matches Look/Hero restraint: opacity + short vertical drift.
 */
export function useSectionReveal(
  rootRef: RefObject<HTMLElement | null>,
  opts?: { selector?: string; preset?: RevealPreset }
) {
  const selector = opts?.selector ?? "[data-reveal]";
  const preset = REVEAL_PRESETS[opts?.preset ?? "default"];

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const root = rootRef.current;
      if (reduced || !root) return;

      const targets = root.querySelectorAll(selector);
      if (!targets.length) return;

      gsap.from(targets, {
        opacity: 0,
        y: preset.y,
        duration: preset.duration,
        stagger: preset.stagger,
        ease: REVEAL.ease,
        scrollTrigger: {
          trigger: root,
          start: preset.start,
          toggleActions: REVEAL.toggleActions,
        },
      });
    },
    { scope: rootRef, dependencies: [selector, opts?.preset] }
  );
}
