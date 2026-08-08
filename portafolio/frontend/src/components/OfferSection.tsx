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

  const onCapabilityClick = (href: string) => {
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

        {/* Former 06 — capabilities live here so #works deep links still land. */}
        <div id="works" className={styles.capabilities}>
          <header className={styles.capHead} data-reveal>
            <span className={styles.capEyebrow}>{t.WORKS_SECTION.label}</span>
            <h3 className={styles.capTitle}>{t.WORKS_SECTION.headline}</h3>
            <p className={styles.capSubline}>{t.WORKS_SECTION.subline}</p>
          </header>

          <ul className={styles.capGrid}>
            {t.WORKS.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  data-reveal
                  onClick={() => onCapabilityClick(p.href)}
                  className={styles.capItem}
                >
                  <WorkArt
                    slug={p.slug as "crm" | "websites" | "api" | "dashboards"}
                    label={p.kind}
                  />
                  <div className={styles.capMeta}>
                    <span className={styles.capId} aria-hidden="true">
                      {p.id}
                    </span>
                    <span className={styles.capKind}>{p.kind}</span>
                    <span className={styles.capArrow} aria-hidden="true">
                      →
                    </span>
                  </div>
                  <h4 className={styles.capName}>{p.title}</h4>
                  <p className={styles.capTags}>{p.tags}</p>
                  <dl className={styles.capFacts}>
                    <div>
                      <dt>{t.WORKS_SECTION.needLabel}</dt>
                      <dd>{p.challenge}</dd>
                    </div>
                    <div>
                      <dt>{t.WORKS_SECTION.outcomeLabel}</dt>
                      <dd>{p.result}</dd>
                    </div>
                  </dl>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
