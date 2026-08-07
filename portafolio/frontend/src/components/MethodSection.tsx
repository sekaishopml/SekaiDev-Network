"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGsapSafe";
import { useT } from "@/components/LocaleProvider";
import styles from "./MethodSection.module.css";

gsap.registerPlugin(ScrollTrigger);

/** Compact Method band (former proof + process) — run-sheet composition. */
export default function MethodSection() {
  const rootRef = useRef<HTMLElement>(null);
  const t = useT();
  const s = t.PROCESS_SECTION;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const spineFill = root.querySelector<HTMLElement>(`.${styles.spineFill}`);
      const signals = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll(`.${styles.signal}`)
      );
      const steps = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll(`.${styles.step}`)
      );
      const headBits = root.querySelectorAll<HTMLElement>(
        `[data-method-head]`
      );
      const foot = root.querySelector<HTMLElement>(`.${styles.foot}`);

      if (reduced) {
        if (spineFill) gsap.set(spineFill, { scaleY: 1 });
        return;
      }

      gsap.set(headBits, { y: 18, autoAlpha: 0 });
      gsap.set(signals, { x: -14, autoAlpha: 0 });
      gsap.set(steps, { y: 20, autoAlpha: 0 });
      if (foot) gsap.set(foot, { y: 12, autoAlpha: 0 });
      if (spineFill) gsap.set(spineFill, { scaleY: 0 });

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      intro
        .to(headBits, {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.07,
          ease: "power2.out",
        })
        .to(
          signals,
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.45,
            stagger: 0.08,
            ease: "power2.out",
          },
          0.12
        )
        .to(
          steps,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
            stagger: 0.09,
            ease: "power2.out",
          },
          0.18
        )
        .to(
          foot,
          { y: 0, autoAlpha: 1, duration: 0.45, ease: "power2.out" },
          0.4
        );

      if (spineFill) {
        gsap.to(spineFill, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.querySelector(`.${styles.board}`),
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.55,
          },
        });
      }
    },
    { scope: rootRef, dependencies: [s.headline, s.headlineAccent] }
  );

  return (
    <section
      ref={rootRef}
      id="process"
      className={styles.section}
      aria-labelledby="method-heading"
    >
      <div className={styles.atmosphere} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.inner}>
        <aside className={styles.rail}>
          <span className={styles.watermark} aria-hidden="true">
            03
          </span>
          <span className={styles.eyebrow} data-method-head>
            {t.UI.proofLabel}
          </span>
          <h2 id="method-heading" className={styles.title} data-method-head>
            {s.headline}
            {s.headlineAccent ? (
              <span className={styles.titleAccent}>{s.headlineAccent}</span>
            ) : null}
          </h2>
          <p className={styles.subline} data-method-head>
            {s.subline}
          </p>
          <ul className={styles.signals}>
            {t.PROOF.metrics.map((m) => (
              <li key={m.label} className={styles.signal}>
                <span className={styles.signalValue}>{m.value}</span>
                <span className={styles.signalLabel}>{m.label}</span>
              </li>
            ))}
          </ul>
        </aside>

        <div className={styles.board}>
          <div className={styles.spine} aria-hidden="true">
            <span className={styles.spineFill} />
          </div>
          <div className={styles.boardHead} data-method-head>
            <span className={styles.boardLabel}>{s.boardLabel}</span>
            <span className={styles.boardFlow}>{s.boardFlow}</span>
          </div>
          <ol className={styles.steps}>
            {t.PROCESS.map((step) => (
              <li key={step.step} className={styles.step}>
                <span className={styles.stepNum} aria-hidden="true">
                  {step.step}
                </span>
                <div className={styles.stepCopy}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepBody}>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.foot}>
          <ul className={styles.trust}>
            {t.TRUST_STRIP.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className={styles.note}>{t.PROOF.note}</p>
        </div>
      </div>
    </section>
  );
}
