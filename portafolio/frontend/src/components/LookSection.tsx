"use client";

import { memo, type MouseEvent } from "react";
import styles from "./LookSection.module.css";
import LookDesignStage from "@/components/LookDesignStage";
import { useT } from "@/components/LocaleProvider";
import { jumpTo } from "@/lib/navigation";

/**
 * LOOK composition — craft opener → hire payoff.
 * Typography motion via --look-* CSS vars from HeroSection intro progress.
 * #bonsai-target / #media-long remain measurable geometry targets.
 */
function LookSection() {
  const t = useT();

  const jumpContact = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    jumpTo(t.CTAS.primary.href);
  };

  return (
    <section
      className={styles.lookSection}
      id="look"
      aria-labelledby="look-title"
    >
      <div className={styles.atmosphere} aria-hidden="true" />
      <div className={styles.lookStage}>
        <div className={styles.lookTopBlock}>
          <h2 id="look-title" className={styles.ghostText}>
            {t.LOOK_COPY.look}
          </h2>
          <p
            id="look-beyond"
            className={`${styles.subLabel} ${styles.lookBeyond}`}
          >
            {t.LOOK_COPY.closer}
            {t.LOOK_COPY.past ? ` ${t.LOOK_COPY.past}` : null}
          </p>
        </div>

        <div
          id="bonsai-target"
          className={styles.mediaBonsai}
          aria-hidden="true"
        />

        <div
          id="media-long"
          className={styles.mediaLong}
          aria-hidden="true"
        >
          <span className={styles.frameTick} aria-hidden="true" />
          <LookDesignStage />
        </div>

        <div className={styles.findBlock}>
          <h2 id="look-find" className={styles.ghostText}>
            {t.LOOK_COPY.find}
          </h2>
        </div>

        <div className={styles.lookClose}>
          <h3 id="look-true" className={`${styles.headline} ${styles.trueBlock}`}>
            {t.LOOK_COPY.signal}
            <span className={styles.shipLine}>{t.LOOK_COPY.ship}</span>
            <span className={styles.closeSub}>{t.LOOK_COPY.subline}</span>
          </h3>

          <a
            href={t.CTAS.primary.href}
            onClick={jumpContact}
            className={styles.lookCta}
          >
            {t.CTAS.primary.labelUpper}
          </a>
        </div>
      </div>
    </section>
  );
}

export default memo(LookSection);
