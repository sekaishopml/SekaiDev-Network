"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGsapSafe";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { PROCESS } from "@/content/studio";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  useSectionReveal(rootRef);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const pin = pinRef.current;
      if (reduced || !pin || window.innerWidth < 1024) return;

      const steps = pin.querySelectorAll("[data-step]");
      if (steps.length < 2) return;

      gsap.set(steps, { opacity: 0.28 });
      gsap.set(steps[0], { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top+=80",
          end: "+=140%",
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
        },
      });

      steps.forEach((step, i) => {
        if (i === 0) return;
        tl.to(steps[i - 1], { opacity: 0.28, duration: 0.4 }, i * 0.5);
        tl.to(step, { opacity: 1, duration: 0.4 }, i * 0.5);
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="process"
      className="relative w-full px-6 md:px-12 py-20 md:py-24 bg-background"
    >
      <div data-reveal>
        <span className="text-muted text-xs tracking-widest">06 — PROCESS</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-4">
          Align → Launch
        </h2>
      </div>

      <div ref={pinRef} className="mt-12 md:mt-16">
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {PROCESS.map((p) => (
            <li key={p.step} data-reveal data-step className="relative">
              <span className="font-display text-4xl md:text-5xl text-foreground/15 font-bold">
                {p.step}
              </span>
              <h3 className="font-display text-xl font-bold mt-2">{p.title}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
