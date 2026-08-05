"use client";

import { useRef } from "react";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { CTAS, OUTCOMES, STUDIO } from "@/content/studio";

export default function OfferSection() {
  const rootRef = useRef<HTMLElement>(null);
  useSectionReveal(rootRef);

  const jump = (href: string) => {
    window.dispatchEvent(new CustomEvent("sekaidev:jump", { detail: href }));
  };

  return (
    <section
      ref={rootRef}
      id="offer"
      className="relative w-full px-6 md:px-12 pt-24 md:pt-32 pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-24 bg-background border-t border-foreground/10"
    >
      <div className="max-w-3xl" data-reveal>
        <span className="text-muted text-xs tracking-widest">01 — OFFER</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 leading-tight">
          What we deliver
        </h2>
        <p className="mt-4 text-sm md:text-base text-foreground/75 max-w-xl">
          {STUDIO.subline}
        </p>
      </div>

      <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {OUTCOMES.map((o, i) => (
          <article key={o.title} data-reveal className="group">
            <span className="text-[10px] tracking-widest text-muted">
              0{i + 1}
            </span>
            <h3 className="font-display text-xl md:text-2xl font-bold mt-3 group-hover:text-accent transition-colors">
              {o.title}
            </h3>
            <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
              {o.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-12" data-reveal>
        <button
          type="button"
          onClick={() => jump(CTAS.primary.href)}
          className="inline-flex min-h-[44px] items-center px-8 py-3 bg-accent text-white text-xs tracking-widest font-medium hover:bg-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {CTAS.primary.labelUpper}
        </button>
      </div>
    </section>
  );
}
