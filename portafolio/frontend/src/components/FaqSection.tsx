"use client";

import { useRef } from "react";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useT } from "@/components/LocaleProvider";
import { jumpTo } from "@/lib/navigation";

export default function FaqSection() {
  const rootRef = useRef<HTMLElement>(null);
  const t = useT();
  useSectionReveal(rootRef);

  const jumpContact = () => jumpTo(t.CTAS.primary.href);

  return (
    <section
      ref={rootRef}
      id="faq"
      className="relative w-full px-6 md:px-12 py-20 md:py-28 pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pb-28 bg-background"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-2xl" data-reveal>
        <span className="text-muted text-xs tracking-widest uppercase">
          {t.UI.faqLabel}
        </span>
        <h2
          id="faq-heading"
          className="font-display text-3xl md:text-5xl font-bold mt-4 leading-tight"
        >
          {t.UI.faqHeadline}
        </h2>
        <p className="mt-4 text-sm md:text-base text-foreground/70 leading-relaxed">
          {t.UI.faqSubline}
        </p>
      </div>

      <div className="mt-12 md:mt-16 max-w-4xl border-t border-foreground/20">
        {t.FAQ_ITEMS.map((item) => (
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

      <div className="mt-10 md:mt-12" data-reveal>
        <p className="text-[10px] tracking-widest uppercase text-foreground/50 mb-3">
          {t.UI.stillFit}
        </p>
        <button
          type="button"
          onClick={jumpContact}
          className="inline-flex min-h-[44px] items-center px-6 py-3 bg-accent text-white text-xs tracking-widest font-medium hover:bg-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {t.CTAS.primary.labelUpper}
        </button>
      </div>
    </section>
  );
}
