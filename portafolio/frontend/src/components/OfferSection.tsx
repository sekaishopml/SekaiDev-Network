"use client";

import { useEffect, useRef, useState } from "react";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useT } from "@/components/LocaleProvider";
import { getIntent, jumpTo } from "@/lib/navigation";
import styles from "./OfferSection.module.css";

export default function OfferSection() {
  const rootRef = useRef<HTMLElement>(null);
  const [intent, setIntent] = useState("");
  const t = useT();
  useSectionReveal(rootRef, { preset: "default" });

  useEffect(() => {
    const syncIntent = () => setIntent(getIntent());
    syncIntent();
    window.addEventListener("sekaidev:jump", syncIntent);
    window.addEventListener("focus", syncIntent);
    return () => {
      window.removeEventListener("sekaidev:jump", syncIntent);
      window.removeEventListener("focus", syncIntent);
    };
  }, []);

  return (
    <section ref={rootRef} id="offer" className={styles.offer} aria-labelledby="offer-heading">
      <div className={styles.offerAtmosphere} aria-hidden="true" />

      <div className={styles.offerInner}>
        <header className={styles.offerHead}>
          <div data-reveal>
            <span className={styles.offerEyebrow}>{t.UI.offerLabel}</span>
            <h2 id="offer-heading" className={styles.offerTitle}>
              {t.UI.offerHeadline}
              <span className={styles.offerTitleAccent}>
                {t.UI.offerHeadlineAccent}
              </span>
            </h2>
          </div>
          <div className={styles.offerAside} data-reveal>
            <p className={styles.offerSubline}>{t.UI.offerSubline}</p>
          </div>
        </header>

        <ol className={styles.offerList}>
          {t.OUTCOMES.map((o, i) => (
            <li key={o.title} data-reveal className={styles.offerRow}>
              <span className={styles.offerIndex} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.offerRowTitle}>{o.title}</h3>
              <p className={styles.offerRowBody}>{o.body}</p>
            </li>
          ))}
        </ol>

        <div className={styles.offerCta} data-reveal>
          <button
            type="button"
            onClick={() => jumpTo(t.CTAS.primary.href)}
            className={styles.offerBtnPrimary}
          >
            {t.CTAS.primary.labelUpper}
          </button>
          {intent === "services" && (
            <button
              type="button"
              onClick={() => jumpTo(t.CTAS.pricing.href, "services")}
              className={styles.offerBtnGhost}
            >
              {t.CTAS.pricing.labelUpper}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
