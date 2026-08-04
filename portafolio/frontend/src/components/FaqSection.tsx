"use client";

import { useRef } from "react";
import { FAQ_ITEMS } from "@/content/studio";
import { useSectionReveal } from "@/hooks/useSectionReveal";

export default function FaqSection() {
  const rootRef = useRef<HTMLElement>(null);
  useSectionReveal(rootRef);

  return (
    <section
      ref={rootRef}
      id="faq"
      className="relative w-full px-6 md:px-12 py-20 md:py-28 bg-background"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-2xl" data-reveal>
        <span className="text-muted text-xs tracking-widest uppercase">FAQ</span>
        <h2
          id="faq-heading"
          className="font-display text-3xl md:text-5xl font-bold mt-4 leading-tight"
        >
          Clear before we begin.
        </h2>
        <p className="mt-4 text-sm md:text-base text-foreground/70 leading-relaxed">
          The practical details, answered plainly.
        </p>
      </div>

      <div className="mt-12 md:mt-16 max-w-4xl border-t border-foreground/20">
        {FAQ_ITEMS.map((item) => (
          <details
            key={item.question}
            data-reveal
            className="group border-b border-foreground/20"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-display text-lg md:text-xl font-bold transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                className="shrink-0 font-sans text-xl font-normal text-muted transition-transform duration-200 group-open:rotate-45"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p className="max-w-2xl pb-6 pr-10 text-sm leading-relaxed text-foreground/70">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
