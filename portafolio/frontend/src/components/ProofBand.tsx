"use client";

import { useRef } from "react";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { PROOF, TRUST_STRIP } from "@/content/studio";

export default function ProofBand() {
  const rootRef = useRef<HTMLElement>(null);
  useSectionReveal(rootRef);

  return (
    <section
      ref={rootRef}
      id="proof"
      className="relative w-full px-6 md:px-12 py-24 md:py-28 bg-background border-b border-foreground/10"
    >
      <div data-reveal className="mb-10 md:mb-14">
        <span className="text-muted text-xs tracking-widest">03 — PROOF</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-4">
          How we show up
        </h2>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8"
        data-reveal
      >
        {PROOF.metrics.map((m) => (
          <div key={m.label} className="border-t border-foreground/20 pt-5">
            <p className="font-display text-2xl md:text-3xl font-bold">
              {m.value}
            </p>
            <p className="mt-2 text-xs tracking-widest text-muted uppercase">
              {m.label}
            </p>
          </div>
        ))}
      </div>

      <ul
        className="mt-12 md:mt-16 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6"
        data-reveal
      >
        {TRUST_STRIP.map((line) => (
          <li
            key={line}
            className="text-[10px] tracking-widest uppercase text-foreground/55 border-l border-accent/50 pl-3"
          >
            {line}
          </li>
        ))}
      </ul>

      <p
        className="mt-8 max-w-xl text-sm text-foreground/60 leading-relaxed"
        data-reveal
      >
        {PROOF.note}
      </p>
    </section>
  );
}
