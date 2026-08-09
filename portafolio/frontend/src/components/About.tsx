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
      className="w-full flex flex-col justify-center bg-background"
      style={{
        paddingTop: "var(--section-pad-y)",
        paddingBottom: "var(--section-pad-y-bottom)",
        paddingLeft: "var(--gutter-x)",
        paddingRight: "var(--gutter-x)",
        minHeight: "min(70svh, 40rem)",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
        <div data-reveal>
          <span
            className="text-muted uppercase block"
            style={{
              fontSize: "var(--type-eyebrow)",
              letterSpacing: "var(--type-eyebrow-tracking)",
            }}
          >
            {t.ABOUT.label}
          </span>
          <h2
            className="font-display font-bold uppercase"
            style={{
              marginTop: "var(--stack-eyebrow)",
              fontSize: "var(--type-title)",
              lineHeight: "var(--type-title-lh)",
              letterSpacing: "var(--type-title-tracking)",
            }}
          >
            {t.ABOUT.headlineLine1}
            <br />
            {t.ABOUT.headlineLine2}
          </h2>
        </div>
        <div
          className="text-foreground/80"
          style={{
            fontSize: "var(--type-body)",
            lineHeight: "var(--type-body-lh)",
          }}
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
