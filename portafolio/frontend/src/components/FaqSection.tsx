"use client";

import { useRef } from "react";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useT } from "@/components/LocaleProvider";
import { jumpTo } from "@/lib/navigation";
import styles from "./FaqSection.module.css";

export default function FaqSection() {
  const rootRef = useRef<HTMLElement>(null);
  const t = useT();
  useSectionReveal(rootRef, { preset: "default" });

  const jumpContact = () => jumpTo(t.CTAS.primary.href);

  return (
    <section
      ref={rootRef}
      id="faq"
      className={styles.section}
      aria-labelledby="faq-heading"
    >
      <div className={styles.atmosphere} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.head} data-reveal>
          <span className={styles.eyebrow}>{t.UI.faqLabel}</span>
          <h2 id="faq-heading" className={styles.title}>
            {t.UI.faqHeadline}
          </h2>
          <p className={styles.subline}>{t.UI.faqSubline}</p>

          <div className={styles.headCta}>
            <p className={styles.still}>{t.UI.stillFit}</p>
            <button
              type="button"
              onClick={jumpContact}
              className={styles.cta}
            >
              {t.CTAS.primary.labelUpper}
            </button>
          </div>
        </header>

        <div className={styles.list}>
          {t.FAQ_ITEMS.map((item, i) => (
            <details
              key={item.question}
              data-reveal
              className={styles.item}
            >
              <summary className={styles.summary}>
                <span className={styles.index} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.question}>{item.question}</span>
                <span className={styles.mark} aria-hidden="true">
                  +
                </span>
              </summary>
              <div className={styles.answer}>
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>

        <div className={styles.footCta} data-reveal>
          <p className={styles.still}>{t.UI.stillFit}</p>
          <button type="button" onClick={jumpContact} className={styles.cta}>
            {t.CTAS.primary.labelUpper}
          </button>
        </div>
      </div>
    </section>
  );
}
