"use client";

import { useRef } from "react";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { SERVICES } from "@/content/studio";

export default function Services() {
  const rootRef = useRef<HTMLElement>(null);
  useSectionReveal(rootRef);

  return (
    <section
      ref={rootRef}
      id="services"
      className="relative w-full px-6 md:px-12 py-20 md:py-28 bg-background"
    >
      <div data-reveal>
        <span className="text-muted text-xs tracking-widest">05 — SERVICES</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-4">
          How we help
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {SERVICES.map((s, i) => (
          <article
            key={s.title}
            data-reveal
            className="border-t border-foreground/20 pt-5 group"
          >
            <span className="text-[10px] tracking-widest text-muted">
              0{i + 1}
            </span>
            <h3 className="font-display text-xl font-bold mt-2 group-hover:text-accent transition-colors">
              {s.title}
            </h3>
            <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
              {s.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
