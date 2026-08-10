"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGsapSafe";
import { useT } from "@/components/LocaleProvider";
import { jumpTo } from "@/lib/navigation";
import { PRICING_INTRO } from "@/lib/motion/pricingIntro";
import styles from "./PricingProductIntro.module.css";

const BonsaiProductMark = dynamic(
  () => import("@/components/three/BonsaiProductMark"),
  { ssr: false, loading: () => null }
);

gsap.registerPlugin(ScrollTrigger);

interface PricingProductIntroProps {
  railRef: React.RefObject<HTMLElement | null>;
}

export default function PricingProductIntro({
  railRef,
}: PricingProductIntroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const t = useT();
  const p = t.PRICING;
  const intro = p.productIntro;

  useGSAP(
    () => {
      const root = rootRef.current;
      const stage = stageRef.current;
      const content = contentRef.current;
      if (!root || !stage || !content) return;

      const mm = gsap.matchMedia();

      mm.add(PRICING_INTRO.reducedMotionQuery, () => {
        gsap.set([stage, content], { clearProps: "all" });
        return () => {};
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.fromTo(
          [stage, content],
          { y: 0, opacity: 1 },
          {
            y: () => PRICING_INTRO.bonsaiY,
            opacity: 0,
            ease: PRICING_INTRO.ease,
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: () =>
                `+=${root.offsetHeight * PRICING_INTRO.exitScrollFraction}`,
              scrub: 0.35,
            },
          }
        );

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set([stage, content], { clearProps: "all" });
        };
      });
    },
    { scope: rootRef, dependencies: [intro.headline] }
  );

  const scrollToRail = () => {
    const rail = railRef.current;
    if (rail) {
      rail.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    jumpTo("#pricing-plans", "services");
  };

  const jump = (intent: string) => {
    jumpTo(t.CTAS.primary.href, intent);
  };

  return (
    <header
      ref={rootRef}
      className={styles.intro}
      aria-labelledby="pricing-product-heading"
    >
      <div className={styles.introAtmosphere} aria-hidden="true" />

      <div ref={stageRef} className={styles.bonsaiStage}>
        <div className={styles.bonsaiGlow} aria-hidden="true" />
        <BonsaiProductMark className={styles.bonsaiCanvas} />
      </div>

      <div ref={contentRef} className={styles.content}>
        <p className={styles.eyebrow}>04 — {p.sectionLabel}</p>
        <p className={styles.brand} aria-hidden="true">
          {t.STUDIO.brand}
        </p>
        <h2 id="pricing-product-heading" className={styles.headline}>
          {intro.headline}
        </h2>
        <p className={styles.subline}>{intro.subline}</p>

        <div className={styles.ctaGroup}>
          <button
            type="button"
            className={styles.ctaPrimary}
            onClick={scrollToRail}
          >
            {intro.ctaPrimary}
          </button>
          <button
            type="button"
            className={styles.ctaSecondary}
            onClick={() => jump("launch")}
          >
            {intro.ctaSecondary}
          </button>
        </div>

        <p className={styles.scrollCue}>{intro.scrollCue}</p>
      </div>
    </header>
  );
}
