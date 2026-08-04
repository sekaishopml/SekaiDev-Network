"use client";

import { useRef } from "react";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { WORKS } from "@/content/studio";
import WorkArt from "@/components/WorkArt";

export default function Works() {
  const rootRef = useRef<HTMLElement>(null);

  useSectionReveal(rootRef);

  const onCardClick = (href: string) => {
    if (href.startsWith("#")) {
      window.dispatchEvent(new CustomEvent("sekaidev:jump", { detail: href }));
      return;
    }
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      ref={rootRef}
      id="works"
      className="min-h-screen w-full px-6 md:px-12 pt-28 md:pt-32 pb-28 md:pb-12 flex flex-col justify-center bg-background"
    >
      <div className="mb-6 md:mb-8" data-reveal>
        <span className="text-muted text-xs tracking-widest">
          07 — WHAT WE BUILD
        </span>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mt-4">
          CAPABILITIES
        </h2>
        <p className="mt-3 max-w-xl text-sm md:text-base text-foreground/70">
          Examples of surfaces we ship — product systems, brand sites, APIs, and
          ops tools. Ask for a private walkthrough of named work when we confirm
          fit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {WORKS.map((p) => (
          <button
            key={p.id}
            type="button"
            data-reveal
            onClick={() => onCardClick(p.href)}
            className="group relative text-left border border-foreground/20 p-4 md:p-6 overflow-visible hover:border-accent hover:bg-foreground/[0.03] transition-[border-color,background-color] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <WorkArt slug={p.slug} label="CAPABILITY" />
            <div className="flex justify-between items-start gap-3">
              <div className="flex items-center gap-3">
                <span className="text-muted text-[10px] md:text-xs tracking-widest">
                  {p.id}
                </span>
                <span className="text-[11px] tracking-widest uppercase px-2.5 py-1 border border-foreground/25 text-muted">
                  {p.kind}
                </span>
              </div>
              <span className="w-11 h-11 md:w-8 md:h-8 rounded-full border border-foreground/30 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-colors shrink-0">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden
                >
                  <path d="M1 13L13 1M13 1H4M13 1v9" />
                </svg>
              </span>
            </div>
            <h3 className="font-display text-lg md:text-xl lg:text-2xl font-bold mt-4 md:mt-6">
              {p.title}
            </h3>
            <p className="text-muted text-[10px] md:text-xs tracking-widest mt-2">
              {p.tags}
            </p>
            <dl className="mt-4 space-y-2 text-sm text-foreground/70 leading-relaxed">
              <div>
                <dt className="text-[10px] tracking-widest text-muted uppercase">
                  Challenge
                </dt>
                <dd className="mt-0.5">{p.challenge}</dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-widest text-muted uppercase">
                  Result
                </dt>
                <dd className="mt-0.5">{p.result}</dd>
              </div>
            </dl>
          </button>
        ))}
      </div>
    </section>
  );
}
