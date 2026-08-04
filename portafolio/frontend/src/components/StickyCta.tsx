"use client";

import { useEffect, useState } from "react";
import { CTAS } from "@/content/studio";

/**
 * Desktop side CTA + mobile bottom bar. Appears after Offer;
 * hidden on hero/intro and while contact is in view.
 * Label shifts near pricing vs default contact CTA.
 */
export default function StickyCta() {
  const [visible, setVisible] = useState(false);
  const [hideForContact, setHideForContact] = useState(false);
  const [hideForHero, setHideForHero] = useState(true);
  const [nearPricing, setNearPricing] = useState(false);

  useEffect(() => {
    const offer = document.getElementById("offer");
    if (!offer) {
      const onScroll = () => {
        const y = window.scrollY || document.documentElement.scrollTop;
        setVisible(y > window.innerHeight * 1.2);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(
          entry.isIntersecting || entry.boundingClientRect.top < 0
        );
      },
      { threshold: 0.05 }
    );
    io.observe(offer);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const io = new IntersectionObserver(
      ([entry]) => setHideForContact(entry.isIntersecting),
      { threshold: 0.15 }
    );
    io.observe(contact);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const pricing = document.getElementById("pricing");
    const works = document.getElementById("works");
    if (!pricing && !works) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        setNearPricing(hit);
      },
      { threshold: 0.2 }
    );
    if (pricing) io.observe(pricing);
    if (works) io.observe(works);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const home = document.getElementById("home");
    const syncIntro = () => {
      const phase = document.documentElement.dataset.intro;
      if (phase === "hero" || phase === "animating") {
        setHideForHero(true);
      }
    };
    syncIntro();

    const mo = new MutationObserver(syncIntro);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-intro"],
    });

    let homeIo: IntersectionObserver | undefined;
    if (home) {
      homeIo = new IntersectionObserver(
        ([entry]) => {
          if (entry.intersectionRatio > 0.45) setHideForHero(true);
          else if (document.documentElement.dataset.intro === "done") {
            setHideForHero(false);
          }
        },
        { threshold: [0, 0.45, 0.7, 1] }
      );
      homeIo.observe(home);
    }

    return () => {
      mo.disconnect();
      homeIo?.disconnect();
    };
  }, []);

  const show = visible && !hideForContact && !hideForHero;
  const label = nearPricing ? CTAS.pricing.labelUpper : CTAS.primary.labelUpper;
  const href = nearPricing ? CTAS.pricing.href : CTAS.primary.href;

  const jump = () => {
    window.dispatchEvent(new CustomEvent("sekaidev:jump", { detail: href }));
  };

  return (
    <>
      <button
        type="button"
        onClick={jump}
        aria-label={nearPricing ? CTAS.pricing.label : CTAS.primary.label}
        aria-hidden={!show}
        tabIndex={show ? 0 : -1}
        className={`hidden md:block fixed right-6 bottom-8 z-40 px-5 py-3 bg-accent text-white text-[10px] tracking-widest font-medium shadow-lg transition-[opacity,transform] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          show
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        {label}
      </button>

      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-foreground/15 bg-background/95 backdrop-blur-sm px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 ${
          show ? "translate-y-0" : "translate-y-full pointer-events-none"
        }`}
        aria-hidden={!show}
      >
        <button
          type="button"
          onClick={jump}
          tabIndex={show ? 0 : -1}
          className="w-full min-h-[44px] py-3 bg-accent text-white text-xs tracking-widest font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {label}
        </button>
      </div>
    </>
  );
}
