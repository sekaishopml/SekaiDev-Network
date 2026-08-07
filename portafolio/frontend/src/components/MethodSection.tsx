"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGsapSafe";
import { useT } from "@/components/LocaleProvider";
import styles from "./MethodSection.module.css";

gsap.registerPlugin(ScrollTrigger);

/** Compact merge of former 03 Proof + 04 Process — no pin, dense editorial. */
export default function MethodSection() {
  const rootRef = useRef<HTMLElement>(null);
  const t = useT();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const bits = root.querySelectorAll<HTMLElement>(
        `[data-method-reveal]`
      );
      gsap.set(bits, { y: 16, autoAlpha: 0 });
      gsap.to(bits, {
        y: 0,
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: "top 82%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    },
    { scope: rootRef, dependencies: [t.PROCESS_SECTION.headline] }
  );

  return (
    <section
      ref={rootRef}
      id="process"
      className={styles.section}
      aria-labelledby="method-heading"
    >
      <div className={styles.inner}>
        <div className={styles.rule} aria-hidden="true" />
        <div className={styles.grid}>
          <header className={styles.head} data-method-reveal>
            <span className={styles.eyebrow}>{t.UI.proofLabel}</span>
            <h2 id="method-heading" className={styles.title}>
              {t.PROCESS_SECTION.headline}
            </h2>
            <p className={styles.subline}>{t.PROCESS_SECTION.subline}</p>
            <ul className={styles.signals}>
              {t.PROOF.metrics.map((m) => (
                <li key={m.label} className={styles.signal}>
                  <span className={styles.signalValue}>{m.value}</span>
                  <span className={styles.signalLabel}>{m.label}</span>
                </li>
              ))}
            </ul>
          </header>

          <ol className={styles.steps} data-method-reveal>
            {t.PROCESS.map((step) => (
              <li key={step.step} className={styles.step}>
                <span className={styles.stepNum}>{step.step}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.foot} data-method-reveal>
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
