"use client";

import { useEffect, useRef, useState } from "react";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useT } from "@/components/LocaleProvider";
import WorkArt from "@/components/WorkArt";
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

  const openItem = (href: string) => {
    if (href.startsWith("#")) {
      jumpTo(href);
      return;
    }
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      ref={rootRef}
      id="offer"
      className={styles.offer}
      aria-labelledby="offer-heading"
    >
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

        {/* Single rail: offer = capabilities. #works kept for deep links. */}
        <ol id="works" className={styles.offerList}>
          {t.WORKS.map((p, i) => (
            <li key={p.id} data-reveal>
              <button
                type="button"
                className={styles.offerRow}
                onClick={() => openItem(p.href)}
              >
                <span className={styles.offerIndex} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className={styles.offerCopy}>
                  <h3 className={styles.offerRowTitle}>{p.title}</h3>
                  <p className={styles.offerTags}>{p.tags}</p>
                </div>

                <p className={styles.offerRowBody}>
                  <span className={styles.offerNeed}>{p.challenge}</span>
                  {p.result}
                </p>

                <div className={styles.offerArt} aria-hidden="true">
                  <WorkArt
                    slug={p.slug as "crm" | "websites" | "api" | "dashboards"}
                    compact
                  />
                </div>

                <span className={styles.offerArrow} aria-hidden="true">
                  →
                </span>
              </button>
            </li>
          ))}
        </ol>

        <div className={styles.offerFoot} data-reveal>
          <p className={styles.offerPromise}>{t.UI.offerPromise}</p>
          <div className={styles.offerCta}>
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
      </div>
    </section>
  );
}
