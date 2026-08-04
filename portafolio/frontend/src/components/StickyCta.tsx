"use client";

import { useEffect, useState } from "react";
import { CTAS } from "@/content/studio";

/**
 * Desktop side CTA + mobile bottom bar. Appears after Offer;
 * hidden on hero/intro and while contact is in view.
 */
export default function StickyCta() {
  const [visible, setVisible] = useState(false);
  const [hideForContact, setHideForContact] = useState(false);
  const [hideForHero, setHideForHero] = useState(true);

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
        // Bidirectional: hide again when scrolling back above Offer
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
    const home = document.getElementById("home");
    const syncIntro = () => {
      const phase = document.documentElement.dataset.intro;
      // Only force-hide during cinematic intro; home IO owns the rest
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
          // Keep sticky off while hero still owns most of the viewport
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

  const jump = () => {
    window.dispatchEvent(
      new CustomEvent("sekaidev:jump", { detail: CTAS.primary.href })
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={jump}
        aria-label={CTAS.primary.label}
        aria-hidden={!show}
        tabIndex={show ? 0 : -1}
        className={`hidden md:block fixed right-6 bottom-8 z-40 px-5 py-3 bg-accent text-white text-[10px] tracking-widest font-medium shadow-lg transition-[opacity,transform] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          show
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        {CTAS.primary.labelUpper}
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
          {CTAS.primary.labelUpper}
        </button>
      </div>
    </>
  );
}
