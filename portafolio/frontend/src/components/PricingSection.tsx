"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGsapSafe";
import { useT } from "@/components/LocaleProvider";
import { jumpTo } from "@/lib/navigation";
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

  useGSAP(
    () => {
      const root = rootRef.current;
      const pin = pinRef.current;
      const track = trackRef.current;
      const progress = progressRef.current;
      if (!root || !pin || !track) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: PRICING_SCROLL.desktopQuery,
          mobile: PRICING_SCROLL.mobileQuery,
          reduceMotion: PRICING_SCROLL.reducedMotionQuery,
        },
        (context) => {
          const conditions = context.conditions as {
            desktop: boolean;
            mobile: boolean;
            reduceMotion: boolean;
          };

          if (conditions.reduceMotion || conditions.mobile) {
            gsap.set(track, { clearProps: "transform" });
            if (progress) gsap.set(progress, { scaleX: 1 });
            return;
          }

          if (!conditions.desktop) return;

          const getTravel = () => {
            const overflow = track.scrollWidth - pin.clientWidth;
            return Math.max(overflow, 0);
          };

          gsap.set(track, { x: 0 });
          if (progress) gsap.set(progress, { scaleX: 0 });

          gsap.to(track, {
            x: () => -getTravel(),
            ease: "none",
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: () =>
                `+=${Math.round(getTravel() * (1 + PRICING_SCROLL.endPad))}`,
              pin: true,
              pinSpacing: true,
              scrub: PRICING_SCROLL.scrub,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (progress) {
                  gsap.set(progress, { scaleX: self.progress });
                }
              },
            },
          });
        }
      );

      document.fonts?.ready.then(() => {
        if (root.isConnected) ScrollTrigger.refresh();
      });
      gsap.delayedCall(0.08, () => ScrollTrigger.refresh());

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    {
      scope: rootRef,
      dependencies: [p.headline, p.tiers.length, t.CTAS.pricingFoot],
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
          <span className={styles.eyebrow}>05 — {p.sectionLabel}</span>
          <h2 id="pricing-heading" className={styles.title}>
            {p.headline}
          </h2>
          <p className={styles.subline}>{p.subline}</p>
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
            {p.tiers.map((tier) => {
              const featured = Boolean(tier.featured);
              return (
                <article
                  key={tier.id}
                  className={`${styles.card} ${featured ? styles.cardFeatured : ""}`}
                  data-tier={tier.id}
                  data-featured={featured || undefined}
                >
                  {featured ? (
                    <span className={styles.badge}>{p.recommended}</span>
                  ) : null}
                  <p className={styles.timeline}>{tier.timeline}</p>
                  <h3 className={styles.name}>{tier.title}</h3>
                  <p className={styles.tagline}>{tier.tagline}</p>
                  <div className={styles.priceRow}>
                    <span className={styles.price}>{tier.priceFrom}</span>
                    {tier.priceUnit ? (
                      <span className={styles.priceUnit}>{tier.priceUnit}</span>
                    ) : null}
                  </div>
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
