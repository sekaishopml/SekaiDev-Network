"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGsapSafe";
import { useT } from "@/components/LocaleProvider";
import { jumpTo } from "@/lib/navigation";
import { getPerfProfile } from "@/lib/perf";
import BonsaiProductMark from "@/components/three/BonsaiProductMark";
import styles from "./PricingProductIntro.module.css";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  plansHref?: string;
};

export default function PricingProductIntro({
  plansHref = "#pricing-plans",
}: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const t = useT();
  const p = t.PRICING;
  const intro = p.productIntro;

  useGSAP(
    () => {
      const root = rootRef.current;
      const stage = stageRef.current;
      if (!root || !stage) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const tier = getPerfProfile().tier;
      const mark = stage.querySelector<HTMLElement>(`.${styles.mark}`);
      const copy = stage.querySelectorAll<HTMLElement>(`[data-intro-copy]`);
      const cue = stage.querySelector<HTMLElement>(`.${styles.scrollCue}`);

      gsap.set([mark, ...copy, cue].filter(Boolean), {
        autoAlpha: 0,
        y: 18,
      });
      /* Keep enter motion subtle so the mark stays near the navbar. */
      if (mark) gsap.set(mark, { scale: 0.96, y: 10 });

      // Play on mount — do not gate on ScrollTrigger. Remounting /precios after
      // the home hero left the mark stuck at autoAlpha:0 when ST did not re-fire.
      const enter = gsap.timeline();
      enter
        .to(mark, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "power2.out",
        })
        .to(
          copy,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.45"
        )
        .to(
          cue,
          { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.2"
        );

      const exitVars: gsap.TweenVars = {
        y: tier === "low" ? -16 : -36,
        autoAlpha: 0.15,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: root,
          start: "center top",
          end: "bottom top",
          scrub: tier === "high" ? true : tier === "mid" ? 0.45 : 0.6,
        },
      };
      if (tier === "high") {
        exitVars.scale = 0.98;
      }

      gsap.to(stage, exitVars);
    },
    {
      scope: rootRef,
      dependencies: [intro.headlineBefore, intro.headlineAccent, intro.cta],
    }
  );

  return (
    <header
      ref={rootRef}
      className={styles.intro}
      aria-labelledby="pricing-product-heading"
    >
      <div className={styles.atmosphere} aria-hidden="true" />
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.mark}>
          <BonsaiProductMark className={styles.markCanvas} />
        </div>

        <h2
          id="pricing-product-heading"
          className={styles.headline}
          data-intro-copy
        >
          {intro.headlineBefore}{" "}
          <span className={styles.headlineAccent}>{intro.headlineAccent}</span>
          {intro.headlineAfter ? ` ${intro.headlineAfter}` : null}
        </h2>
        <p className={styles.subline} data-intro-copy>
          {intro.subline}
        </p>

        <div className={styles.ctaRow} data-intro-copy>
          <button
            type="button"
            className={styles.cta}
            onClick={() => jumpTo(plansHref)}
          >
            {intro.cta}
          </button>
          <p className={styles.trust}>{p.ctaTrust}</p>
        </div>

        <p className={styles.scrollCue} aria-hidden="true">
          {intro.scrollCue}
        </p>
      </div>
    </header>
  );
}
