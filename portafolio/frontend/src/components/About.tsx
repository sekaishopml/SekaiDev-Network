"use client";

import { useRef } from "react";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useT } from "@/components/LocaleProvider";

export default function About() {
  const rootRef = useRef<HTMLElement>(null);
  const t = useT();

  useSectionReveal(rootRef);

  return (
    <section
      ref={rootRef}
      id="about"
      className="min-h-[70vh] w-full px-6 md:px-12 pt-28 md:pt-32 pb-16 flex flex-col justify-center bg-background"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
        <div data-reveal>
          <span className="text-muted text-xs tracking-widest">
            {t.ABOUT.label}
          </span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mt-4 leading-tight">
            {t.ABOUT.headlineLine1}
            <br />
            {t.ABOUT.headlineLine2}
          </h2>
        </div>
        <div
          className="text-sm md:text-base lg:text-lg leading-relaxed text-foreground/80"
          data-reveal
        >
          <p className="mb-4">{t.ABOUT.body1}</p>
          <p className="mb-8">{t.ABOUT.body2}</p>
          <ul className="grid gap-4">
            {t.ABOUT.pillars.map((p) => (
              <li
                key={p.label}
                className="flex items-baseline gap-4 border-t border-foreground/15 pt-3"
              >
                <span className="font-display text-sm tracking-widest">
                  {p.label}
                </span>
                <span className="text-muted text-xs md:text-sm">{p.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
