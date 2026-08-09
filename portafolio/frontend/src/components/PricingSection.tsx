"use client";

import { useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGsapSafe";
import { useT } from "@/components/LocaleProvider";
import { jumpTo } from "@/lib/navigation";
import {
  resetPricingChrome,
  setPricingChromeHidden,
} from "@/lib/motion/pricingChrome";
import { PRICING_SCROLL } from "@/lib/motion/pricingScroll";
import styles from "./PricingSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function PricingSection() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const t = useT();
  const p = t.PRICING;

  // Recommended first so PC and phone open on Launch Standard.
  const tiers = useMemo(
    () => [...p.tiers].sort((a, b) => Number(b.featured) - Number(a.featured)),
    [p.tiers]
  );

  useGSAP(
    () => {
      const root = rootRef.current;
      const pin = pinRef.current;
      const track = trackRef.current;
      const progress = progressRef.current;
      if (!root || !pin || !track) return;

      const mm = gsap.matchMedia();

      mm.add(PRICING_SCROLL.reducedMotionQuery, () => {
        gsap.set(track, { clearProps: "transform" });
        if (progress) gsap.set(progress, { scaleX: 1 });
        root.classList.add(styles.reduced);
        root.classList.remove(styles.rail);
        resetPricingChrome();
        return () => root.classList.remove(styles.reduced);
      });

      mm.add(`(prefers-reduced-motion: no-preference)`, () => {
        root.classList.remove(styles.reduced);
        root.classList.add(styles.rail);

        const desktopMq = window.matchMedia(PRICING_SCROLL.desktopQuery);

        const getTravel = () => {
          const rail = pin.querySelector<HTMLElement>(`.${styles.viewport}`);
          const viewW = rail?.clientWidth || pin.clientWidth;
          const overflow = Math.max(0, track.scrollWidth - viewW);
          const floor = desktopMq.matches
            ? PRICING_SCROLL.minTravelPxDesktop
            : PRICING_SCROLL.minTravelPx;
          return overflow < 32 ? Math.max(overflow, floor) : overflow;
        };

        const getEndPad = () =>
          Math.round(
            window.innerHeight *
              (desktopMq.matches
                ? PRICING_SCROLL.endPadScreensDesktop
                : PRICING_SCROLL.endPadScreens)
          );

        const getScrub = () =>
          desktopMq.matches
            ? PRICING_SCROLL.scrubDesktop
            : PRICING_SCROLL.scrub;

        gsap.set(track, { x: 0, force3D: true });
        if (progress) gsap.set(progress, { scaleX: 0 });

        /* Same chrome as mobile: hide nav/CTA while the pin owns the viewport. */
        const syncChrome = (active: boolean) => {
          setPricingChromeHidden(Boolean(active));
        };

        const tween = gsap.to(track, {
          x: () => -getTravel(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${getTravel() + getEndPad()}`,
            pin: true,
            pinSpacing: true,
            scrub: getScrub(),
            anticipatePin: 0,
            invalidateOnRefresh: true,
            onToggle: (self) => syncChrome(self.isActive),
            onUpdate: (self) => {
              if (!progress) return;
              const travel = getTravel();
              const pad = getEndPad();
              const total = travel + pad;
              const cardProgress =
                total > 0
                  ? Math.min(1, (self.progress * total) / Math.max(travel, 1))
                  : self.progress;
              gsap.set(progress, { scaleX: cardProgress });
            },
          },
        });

        syncChrome(Boolean(tween.scrollTrigger?.isActive));

        return () => {
          resetPricingChrome();
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(track, { clearProps: "transform" });
          root.classList.remove(styles.rail);
        };
      });

      const refresh = () => {
        if (root.isConnected) ScrollTrigger.refresh();
      };
      document.fonts?.ready.then(refresh);
      gsap.delayedCall(0.1, refresh);
      gsap.delayedCall(0.45, refresh);

      window.addEventListener("resize", refresh);
      return () => window.removeEventListener("resize", refresh);
    },
    {
      scope: rootRef,
      dependencies: [p.headline, tiers.length, t.CTAS.pricingFoot],
    }
  );

  const jump = (intent: string) => {
    jumpTo(t.CTAS.primary.href, intent);
  };

  return (
    <section
      ref={rootRef}
      id="pricing"
      className={styles.section}
      aria-labelledby="pricing-heading"
    >
      <div className={styles.atmosphere} aria-hidden="true" />

      <div ref={pinRef} className={styles.pin}>
        <header className={styles.head}>
          <span className={styles.eyebrow}>04 — {p.sectionLabel}</span>
          <h2 id="pricing-heading" className={styles.title}>
            {p.headline}
          </h2>
          <p className={styles.subline}>{p.subline}</p>
          <p className={styles.offerBanner}>{p.offerBanner}</p>
          <p className={styles.marketNote}>{p.marketNote}</p>
        </header>

        <div className={styles.railMeta} aria-hidden="true">
          <span className={styles.hint}>{p.scrollHint}</span>
          <div className={styles.progressTrack}>
            <span ref={progressRef} className={styles.progressFill} />
          </div>
        </div>

        <div className={styles.viewport}>
          <div ref={trackRef} className={styles.track}>
            {tiers.map((tier) => {
              const featured = Boolean(tier.featured);
              return (
                <article
                  key={tier.id}
                  className={`${styles.card} ${featured ? styles.cardFeatured : ""}`}
                  data-tier={tier.id}
                  data-featured={featured || undefined}
                >
                  <div className={styles.cardTop}>
                    <p className={styles.timeline}>{tier.timeline}</p>
                    {featured ? (
                      <span className={styles.badge}>{p.recommended}</span>
                    ) : null}
                  </div>

                  <h3 className={styles.name}>{tier.title}</h3>
                  <p className={styles.tagline}>{tier.tagline}</p>

                  <div className={styles.priceBlock}>
                    <div className={styles.priceMeta}>
                      <span className={styles.rateLabel}>{p.clientRate}</span>
                    </div>
                    <div className={styles.priceRow}>
                      {tier.priceWas ? (
                        <span className={styles.priceWas}>{tier.priceWas}</span>
                      ) : null}
                      <span className={styles.price}>{tier.priceFrom}</span>
                      {tier.priceUnit ? (
                        <span className={styles.priceUnit}>{tier.priceUnit}</span>
                      ) : null}
                    </div>
                  </div>

                  {tier.offerNote ? (
                    <p className={styles.offerNote}>{tier.offerNote}</p>
                  ) : null}

                  <p className={styles.bestFor}>{tier.bestFor}</p>

                  <ul className={styles.includes}>
                    {tier.includes.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className={`${styles.cta} ${featured ? styles.ctaFeatured : ""}`}
                    onClick={() => jump(tier.intent)}
                  >
                    {tier.cta}
                    <span aria-hidden>→</span>
                  </button>
                </article>
              );
            })}
          </div>
        </div>

        <div className={styles.foot}>
          <p className={styles.disclaimer}>{p.disclaimer}</p>
          <button
            type="button"
            className={styles.footCta}
            onClick={() => jump("launch")}
          >
            {t.CTAS.pricingFoot} →
          </button>
        </div>
      </div>
    </section>
  );
}
