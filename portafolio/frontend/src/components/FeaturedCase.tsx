"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGsapSafe";
import { useT } from "@/components/LocaleProvider";
import { jumpTo } from "@/lib/navigation";
import styles from "./FeaturedCase.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedCase() {
  const rootRef = useRef<HTMLElement>(null);
  const t = useT();
  const c = t.FEATURED_CASE;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const orbs = root.querySelectorAll<HTMLElement>(`.${styles.orb}`);
      const watermark = root.querySelector<HTMLElement>(`.${styles.watermark}`);
      const path = root.querySelector<SVGPathElement>(`.${styles.routePath}`);
      const nodes = root.querySelectorAll<SVGCircleElement>(`.${styles.routeNode}`);
      const chapters = root.querySelectorAll<HTMLElement>(`.${styles.chapter}`);
      const progressFill = root.querySelector<HTMLElement>(`.${styles.progressFill}`);
      const titleLines = root.querySelectorAll<HTMLElement>("[data-case-title]");
      const stage = root.querySelector<HTMLElement>(`.${styles.stage}`);
      const introBits = root.querySelectorAll<HTMLElement>("[data-case-intro]");

      if (reduced) {
        gsap.set([orbs, watermark, chapters, titleLines, introBits, stage], {
          clearProps: "all",
          opacity: 1,
          y: 0,
          scale: 1,
        });
        if (path) {
          path.style.strokeDasharray = "none";
          path.style.strokeDashoffset = "0";
        }
        gsap.set(nodes, { opacity: 1, scale: 1 });
        if (progressFill) progressFill.style.height = "100%";
        return;
      }

      // Atmosphere: orbs drift opposite to scroll (parallax scrub)
      orbs.forEach((orb, i) => {
        gsap.fromTo(
          orb,
          { y: i % 2 === 0 ? -40 : 30, opacity: 0.55 },
          {
            y: i % 2 === 0 ? 80 : -60,
            opacity: 0.9,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1,
            },
          }
        );
      });

      if (watermark) {
        gsap.fromTo(
          watermark,
          { yPercent: -8, opacity: 0.03 },
          {
            yPercent: 18,
            opacity: 0.07,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      }

      // Vertical progress rail
      if (progressFill) {
        gsap.fromTo(
          progressFill,
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 60%",
              end: "bottom 20%",
              scrub: 0.6,
            },
          }
        );
      }

      // Title entrance
      gsap.from(titleLines, {
        y: 48,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(introBits, {
        y: 24,
        opacity: 0,
        duration: 0.85,
        stagger: 0.07,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: "top 68%",
          toggleActions: "play none none reverse",
        },
      });

      if (stage) {
        gsap.from(stage, {
          y: 36,
          opacity: 0,
          scale: 0.985,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stage,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Unique: route path draws with scrub as the stage enters
      if (path) {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: stage || root,
            start: "top 75%",
            end: "top 28%",
            scrub: 0.85,
          },
        });

        gsap.to(nodes, {
          opacity: 1,
          scale: 1,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stage || root,
            start: "top 55%",
            end: "top 30%",
            scrub: 0.7,
          },
        });
        gsap.set(nodes, { scale: 0.4 });
      }

      // Chapters: stagger in + slight x drift (editorial)
      chapters.forEach((chapter, i) => {
        gsap.from(chapter, {
          y: 40,
          x: i % 2 === 0 ? -18 : 18,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: chapter,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: rootRef, dependencies: [c.title, t.CTAS.featuredCase] }
  );

  const chapters = [
    {
      index: "01",
      label: c.labels.challenge,
      text: c.challenge,
    },
    {
      index: "02",
      label: c.labels.solution,
      text: c.solution,
    },
    {
      index: "03",
      label: c.labels.result,
      text: c.result,
      note: c.outcomeNote,
    },
    {
      index: "04",
      label: c.labels.handoff,
      text: c.handoff,
    },
  ];

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
        <div className={styles.grain} />
      </div>

      <div className={styles.progressRail} aria-hidden="true">
        <div className={styles.progressFill} />
      </div>

      <span className={styles.watermark} aria-hidden="true">
        02
      </span>

      <div className={styles.inner}>
        <div className={styles.hero}>
          <div>
            <span className={styles.eyebrow} data-case-intro>
              02 — {c.label}
            </span>
            <h2 id="featured-heading" className={styles.title}>
              <span data-case-title>{c.title}</span>
              {c.titleLine2 ? (
                <span className={styles.titleLine2} data-case-title>
                  {c.titleLine2}
                </span>
              ) : null}
            </h2>
            <p className={styles.role} data-case-intro>
              {c.role}
            </p>
            <ul className={styles.stack} data-case-intro>
              {c.stack.map((s) => (
                <li key={s} className={styles.stackItem}>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div
            className={styles.stage}
            role="img"
            aria-label="Abstract route-system visual for the CyTaxi case"
          >
            <div className={styles.stageFrame} aria-hidden="true" />
            <span className={styles.stageLabel}>CYTAXI / ROUTE SYSTEM</span>
            <svg
              className={styles.routeSvg}
              viewBox="0 0 500 180"
              fill="none"
              aria-hidden="true"
            >
              <path
                className={styles.routePath}
                d="M-10 142C74 18 126 164 215 73S355 25 510 100"
              />
              <circle className={styles.routeNode} cx="126" cy="112" r="5" />
              <circle className={styles.routeNode} cx="310" cy="58" r="5" />
              <circle className={styles.routeNode} cx="442" cy="82" r="5" />
            </svg>
            <span className={styles.stageMeta}>GO · NEXT · POSTGRES</span>
          </div>
        </div>

        <div className={styles.chapters}>
          {chapters.map((ch) => (
            <article key={ch.index} className={styles.chapter}>
              <span className={styles.chapterIndex} aria-hidden="true">
                {ch.index}
              </span>
              <div className={styles.chapterBody}>
                <p className={styles.chapterLabel}>{ch.label}</p>
                <p className={styles.chapterText}>{ch.text}</p>
                {"note" in ch && ch.note ? (
                  <p className={styles.note}>{ch.note}</p>
                ) : null}
              </div>
            </article>
          ))}

          <article className={styles.chapter}>
            <span className={styles.chapterIndex} aria-hidden="true">
              05
            </span>
            <div className={styles.chapterBody}>
              <div className={styles.split}>
                <div>
                  <p className={styles.chapterLabel}>{c.labels.delivered}</p>
                  <ul className={styles.list}>
                    {c.deliverables.map((item) => (
                      <li key={item} className={styles.listItem}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className={styles.chapterLabel}>{c.labels.decisions}</p>
                  <ul className={styles.list}>
                    {c.decisions.map((item) => (
                      <li key={item} className={styles.listItem}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className={styles.ctaWrap}>
          <button
            type="button"
            className={styles.cta}
            onClick={() => jumpTo(t.CTAS.primary.href)}
          >
            {t.CTAS.featuredCase}
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
