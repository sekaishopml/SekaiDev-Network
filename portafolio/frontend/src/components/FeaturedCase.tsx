"use client";

import { useRef } from "react";
import { useT } from "@/components/LocaleProvider";
import { jumpTo } from "@/lib/navigation";
import { useFeaturedCaseTimeline } from "@/hooks/useFeaturedCaseTimeline";
import FeaturedCaseStage from "@/components/FeaturedCaseStage";
import styles from "./FeaturedCase.module.css";

export default function FeaturedCase() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const t = useT();
  const c = t.FEATURED_CASE;
  const ui = c.stageUi;

  const storyBeats = [
    {
      label: c.labels.challenge,
      text: c.challenge,
    },
    {
      label: c.labels.solution,
      text: c.solution,
    },
    {
      label: c.labels.result,
      text: c.result,
      note: c.outcomeNote,
    },
    {
      label: c.labels.handoff,
      text: c.handoff,
    },
  ];

  useFeaturedCaseTimeline(rootRef, pinRef, [
    c.title,
    c.challenge,
    ui.eta,
    t.CTAS.featuredCase,
  ]);

  return (
    <section
      ref={rootRef}
      id="featured"
      className={styles.case}
      aria-labelledby="featured-heading"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <div className={`${styles.orb} ${styles.orbA}`} />
        <div className={`${styles.orb} ${styles.orbB}`} />
        <div className={`${styles.orb} ${styles.orbC}`} />
        <div className={styles.veil} />
        <div className={styles.grain} />
      </div>

      <div className={styles.progressRail} aria-hidden="true">
        <div className={styles.progressFill} />
      </div>

      <div ref={pinRef} className={styles.pinWrap}>
        <div className={styles.cine}>
          <span className={styles.watermark} aria-hidden="true">
            03
          </span>

          <div className={styles.cineGrid}>
            <div className={styles.copyCol}>
              <span className={styles.eyebrow}>03 — {c.label}</span>
              <h2 id="featured-heading" className={styles.title}>
                {c.title}
                {c.titleLine2 ? (
                  <span className={styles.titleLine2}>{c.titleLine2}</span>
                ) : null}
              </h2>
              <p className={styles.role}>{c.role}</p>
              <ul className={styles.stack}>
                {c.stack.map((s) => (
                  <li key={s} className={styles.stackItem}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <FeaturedCaseStage ui={ui} />

            <div className={styles.storyDock}>
              {storyBeats.map((beat, i) => (
                <article
                  key={beat.label}
                  className={styles.storyPanel}
                  data-story-index={i}
                >
                  <p className={styles.storyLabel}>{beat.label}</p>
                  <p className={styles.storyText}>{beat.text}</p>
                  {"note" in beat && beat.note ? (
                    <p className={styles.storyNote}>{beat.note}</p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.after}>
        <p className={styles.afterHead}>{c.labels.buildNotes}</p>
        {!c.href ? (
          <p className={styles.afterClarity}>{c.outcomeNote}</p>
        ) : null}
        <div className={styles.detailGrid}>
          <div className={styles.detailBlock}>
            <p className={styles.detailLabel}>{c.labels.delivered}</p>
            <ul className={styles.list}>
              {c.deliverables.map((item) => (
                <li key={item} className={styles.listItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.detailBlock}>
            <p className={styles.detailLabel}>{c.labels.decisions}</p>
            <ul className={styles.list}>
              {c.decisions.map((item) => (
                <li key={item} className={styles.listItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.ctaWrap}>
          <button
            type="button"
            className={styles.cta}
            onClick={() => jumpTo(t.CTAS.primary.href, "launch")}
          >
            {t.CTAS.featuredCase}
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
