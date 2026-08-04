"use client";

import { memo, type MouseEvent } from "react";
import styles from "./LookSection.module.css";
import LookDesignStage from "@/components/LookDesignStage";
import { CTAS, LOOK_COPY } from "@/content/studio";

/**
 * LOOK composition — craft opener → hire payoff.
 * Typography motion via --look-* CSS vars from HeroSection intro progress.
 * #bonsai-target / #media-long remain measurable geometry targets.
 */
function LookSection() {
  const jumpContact = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.dispatchEvent(
      new CustomEvent("sekaidev:jump", { detail: CTAS.primary.href })
    );
  };

  return (
    <section className={styles.lookSection} id="look" aria-label="Look closer">
      <div className={styles.lookStage}>
        <div className={styles.lookTopBlock}>
          <h2 id="look-title" className={styles.ghostText}>
            {LOOK_COPY.look}
          </h2>
          <p
            id="look-beyond"
            className={`${styles.subLabel} ${styles.lookBeyond}`}
          >
            {LOOK_COPY.closer} {LOOK_COPY.past}
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
          <LookDesignStage />
        </div>

        <h2 id="look-find" className={`${styles.ghostText} ${styles.findBlock}`}>
          {LOOK_COPY.find}
        </h2>

        <div className={styles.lookClose}>
          <h3 id="look-true" className={`${styles.headline} ${styles.trueBlock}`}>
            {LOOK_COPY.signal}
            <span className={styles.shipLine}>{LOOK_COPY.ship}</span>
            <span className={styles.closeSub}>{LOOK_COPY.subline}</span>
          </h3>

          <a
            href={CTAS.primary.href}
            onClick={jumpContact}
            className={styles.lookCta}
          >
            {CTAS.primary.labelUpper}
          </a>
        </div>
      </div>
    </section>
  );
}

export default memo(LookSection);
