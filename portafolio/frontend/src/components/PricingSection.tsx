"use client";

import { useRef } from "react";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { CTAS, PRICING } from "@/content/studio";

export default function PricingSection() {
  const rootRef = useRef<HTMLElement>(null);
  useSectionReveal(rootRef, { preset: "cards" });

  const jump = (intent: string) => {
    const href = `${CTAS.primary.href}?intent=${intent}`;
    window.dispatchEvent(new CustomEvent("sekaidev:jump", { detail: href }));
    // Persist intent for Contact form after Lenis jump
    try {
      sessionStorage.setItem("sekaidev:intent", intent);
    } catch {
      /* ignore */
    }
  };

  return (
    <section
      ref={rootRef}
      id="pricing"
      className="relative w-full px-6 md:px-12 pt-24 md:pt-32 pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pb-32 bg-foreground text-background"
    >
      <div className="max-w-3xl" data-reveal>
        <span className="text-background/50 text-xs tracking-widest uppercase">
          05 — {PRICING.sectionLabel}
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 leading-tight">
          {PRICING.headline}
        </h2>
        <p className="mt-4 text-sm md:text-base text-background/70 max-w-xl leading-relaxed">
          {PRICING.subline}
        </p>
      </div>

      <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-0 border-t border-background/20">
        {PRICING.tiers.map((tier) => (
          <article
            key={tier.id}
            data-reveal
            className={`relative flex flex-col border-b lg:border-b-0 lg:border-r border-background/20 last:lg:border-r-0 py-8 lg:py-10 lg:px-8 first:lg:pl-0 last:lg:pr-0 ${
              "featured" in tier && tier.featured
                ? "bg-background/[0.04]"
                : ""
            }`}
          >
            {"featured" in tier && tier.featured && (
              <span className="absolute top-8 right-0 lg:right-8 text-[9px] tracking-[0.2em] uppercase text-accent">
                Recommended
              </span>
            )}
            <p className="text-[10px] tracking-[0.2em] uppercase text-background/45">
              {tier.timeline}
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold mt-3 tracking-tight">
              {tier.title}
            </h3>
            <p className="mt-2 text-sm text-background/65">{tier.tagline}</p>
            <p className="mt-5 font-display text-lg tracking-wide text-accent">
              {tier.priceFrom}
            </p>
            <p className="mt-3 text-xs text-background/55 leading-relaxed max-w-xs">
              {tier.bestFor}
            </p>
            <ul className="mt-6 space-y-2.5 flex-1">
              {tier.includes.map((line) => (
                <li
                  key={line}
                  className="text-xs text-background/75 leading-snug pl-3 border-l border-background/25"
                >
                  {line}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => jump(tier.intent)}
              className="mt-8 self-start inline-flex min-h-[44px] items-center text-[10px] md:text-xs tracking-widest uppercase border border-background/35 px-5 py-2.5 hover:bg-background hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {tier.cta}
            </button>
          </article>
        ))}
      </div>

      <div
        className="mt-10 md:mt-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        data-reveal
      >
        <p className="text-[10px] md:text-xs tracking-widest uppercase text-background/45 max-w-lg leading-relaxed">
          {PRICING.disclaimer}
        </p>
        <button
          type="button"
          onClick={() => jump("launch")}
          className="inline-flex min-h-[44px] items-center text-[10px] md:text-xs tracking-widest uppercase text-background/70 hover:text-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {CTAS.pricingFoot} →
        </button>
      </div>
    </section>
  );
}
