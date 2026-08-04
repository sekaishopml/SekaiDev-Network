"use client";

import { useRef } from "react";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { CTAS, FEATURED_CASE } from "@/content/studio";

export default function FeaturedCase() {
  const rootRef = useRef<HTMLElement>(null);
  const c = FEATURED_CASE;

  useSectionReveal(rootRef);

  return (
    <section
      ref={rootRef}
      id="featured"
      className="relative w-full px-6 md:px-12 py-20 md:py-28 bg-foreground text-background"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-5" data-reveal>
          <div
            className="case-art mb-8 h-44 md:h-56"
            role="img"
            aria-label="Abstract route-system visual for the CyTaxi case"
          >
            <span className="case-art__label">CYTAXI / ROUTE SYSTEM</span>
            <svg
              className="case-art__route"
              viewBox="0 0 500 180"
              fill="none"
              aria-hidden="true"
            >
              <path d="M-10 142C74 18 126 164 215 73S355 25 510 100" />
              <circle cx="126" cy="112" r="5" />
              <circle cx="310" cy="58" r="5" />
              <circle cx="442" cy="82" r="5" />
            </svg>
            <span className="case-art__meta">GO · NEXT · POSTGRES</span>
          </div>
          <span className="text-background/55 text-xs tracking-widest uppercase">
            02 — {c.label}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 leading-tight">
            {c.title}
          </h2>
          <p className="mt-3 text-xs tracking-widest text-background/60 uppercase">
            {c.role}
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {c.stack.map((s) => (
              <li
                key={s}
                className="text-[10px] tracking-widest uppercase border border-background/30 px-3 py-1"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7 space-y-8" data-reveal>
          <div>
            <h3 className="text-[10px] tracking-widest text-background/50 uppercase">
              Challenge
            </h3>
            <p className="mt-2 text-sm md:text-base text-background/85 leading-relaxed">
              {c.challenge}
            </p>
          </div>
          <div>
            <h3 className="text-[10px] tracking-widest text-background/50 uppercase">
              Solution
            </h3>
            <p className="mt-2 text-sm md:text-base text-background/85 leading-relaxed">
              {c.solution}
            </p>
          </div>
          <div>
            <h3 className="text-[10px] tracking-widest text-background/50 uppercase">
              Result
            </h3>
            <p className="mt-2 text-sm md:text-base text-background/85 leading-relaxed">
              {c.result}
            </p>
            <p className="mt-4 text-xs tracking-widest text-background/50">
              {c.outcomeNote}
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("sekaidev:jump", { detail: "#contact" })
              )
            }
            className="mt-2 inline-flex items-center gap-2 text-xs tracking-widest uppercase border-b border-background/40 pb-1 hover:border-background hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-background"
          >
            {CTAS.featuredCase}
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
