"use client";

import { useEffect, useState } from "react";
import { useT } from "@/components/LocaleProvider";
import { WHATSAPP } from "@/content/config";
import { getIntent, jumpTo } from "@/lib/navigation";

/**
 * Desktop side CTA + mobile bottom bar.
 * Shows once the cinematic intro is done and follows the rest of the scroll.
 * Hidden only while the hero intro owns the screen, and when the contact
 * form itself is in view. Always routes to contact.
 */
export default function StickyCta() {
  const [visible, setVisible] = useState(false);
  const [hideForContact, setHideForContact] = useState(false);
  const [hideForHero, setHideForHero] = useState(true);
  const t = useT();

  useEffect(() => {
    const syncFromIntro = () => {
      const phase = document.documentElement.dataset.intro;
      if (phase === "done") {
        setVisible(true);
        setHideForHero(false);
        return;
      }
      if (phase === "hero" || phase === "animating") {
        setHideForHero(true);
      }
    };

    syncFromIntro();

    const mo = new MutationObserver(syncFromIntro);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-intro"],
    });

    // Jump / skip paths that land past Look before data-intro flips
    const offer = document.getElementById("offer");
    let offerIo: IntersectionObserver | undefined;
    if (offer) {
      offerIo = new IntersectionObserver(
        ([entry]) => {
          const pastOffer =
            entry.isIntersecting || entry.boundingClientRect.top < 0;
          if (pastOffer) {
            setVisible(true);
            setHideForHero(false);
          }
        },
        { threshold: 0.05 }
      );
      offerIo.observe(offer);
    }

    return () => {
      mo.disconnect();
      offerIo?.disconnect();
    };
  }, []);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const io = new IntersectionObserver(
      ([entry]) => setHideForContact(entry.isIntersecting),
      { threshold: 0.35, rootMargin: "0px 0px -20% 0px" }
    );
    io.observe(contact);
    return () => io.disconnect();
  }, []);

  const show = visible && !hideForContact && !hideForHero;
  const label = t.CTAS.primary.labelUpper;
  const href = t.CTAS.primary.href;

  const jump = () => {
    const intent = getIntent();
    jumpTo(href, intent || undefined);
  };

  return (
    <>
      <button
        type="button"
        data-sticky-cta-desktop
        onClick={jump}
        aria-label={t.CTAS.primary.label}
        aria-hidden={!show}
        tabIndex={show ? 0 : -1}
        className={`hidden md:block fixed right-6 bottom-8 z-40 px-5 py-3 bg-accent text-white uppercase font-medium shadow-lg transition-[opacity,transform] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          show
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
        style={{
          fontSize: "var(--type-cta)",
          letterSpacing: "var(--type-cta-tracking)",
          minHeight: "var(--type-cta-min-h)",
        }}
      >
        {label}
      </button>

      <div
        className={`sticky-cta-mobile md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-foreground/15 bg-background/95 backdrop-blur-sm px-4 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 ${
          show ? "translate-y-0" : "translate-y-full pointer-events-none"
        }`}
        aria-hidden={!show}
      >
        <p className="mb-2 text-center text-[9px] tracking-widest uppercase text-foreground/45 truncate">
          {t.NAV_TRUST}
        </p>
        <div className={`grid gap-2 ${WHATSAPP ? "grid-cols-2" : "grid-cols-1"}`}>
          <button
            type="button"
            onClick={jump}
            tabIndex={show ? 0 : -1}
            className="w-full py-3 bg-accent text-white uppercase font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            style={{
              fontSize: "var(--type-cta)",
              letterSpacing: "var(--type-cta-tracking)",
              minHeight: "var(--type-cta-min-h)",
            }}
          >
            {label}
          </button>
          {WHATSAPP && (
            <a
              href={WHATSAPP.prefill(t.CONTACT_COPY.whatsappPrefill)}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={show ? 0 : -1}
              className="inline-flex w-full min-h-[44px] items-center justify-center border border-foreground/25 text-xs tracking-widest font-medium hover:border-accent hover:text-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {t.CTAS.whatsapp.labelUpper}
            </a>
          )}
        </div>
      </div>
    </>
  );
}
