"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGsapSafe";
import { useT } from "@/components/LocaleProvider";
import { jumpTo } from "@/lib/navigation";
import { FEATURED_CINE } from "@/lib/motion/featuredCase";
import styles from "./FeaturedCase.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedCase() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const t = useT();
  const c = t.FEATURED_CASE;

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

  useGSAP(
    () => {
      const root = rootRef.current;
      const pin = pinRef.current;
      if (!root || !pin) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const desktop = window.matchMedia("(min-width: 960px)").matches;

      const orbs = root.querySelectorAll<HTMLElement>(`.${styles.orb}`);
      const veil = root.querySelector<HTMLElement>(`.${styles.veil}`);
      const watermark = root.querySelector<HTMLElement>(`.${styles.watermark}`);
      const title = root.querySelector<HTMLElement>(`.${styles.title}`);
      const eyebrow = root.querySelector<HTMLElement>(`.${styles.eyebrow}`);
      const role = root.querySelector<HTMLElement>(`.${styles.role}`);
      const stack = root.querySelector<HTMLElement>(`.${styles.stack}`);
      const stage = root.querySelector<HTMLElement>(`.${styles.stage}`);
      const stageGlow = root.querySelector<HTMLElement>(`.${styles.stageGlow}`);
      const path = root.querySelector<SVGPathElement>(`.${styles.routePath}`);
      const nodes = gsap.utils.toArray<SVGCircleElement>(
        root.querySelectorAll(`.${styles.routeNode}`)
      );
      const panels = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll(`.${styles.storyPanel}`)
      );
      const scanline = root.querySelector<HTMLElement>(`.${styles.scanline}`);
      const progressFill = root.querySelector<HTMLElement>(
        `.${styles.progressFill}`
      );
      const detailBlocks = root.querySelectorAll<HTMLElement>(
        `.${styles.detailBlock}`
      );
      const listItems = root.querySelectorAll<HTMLElement>(`.${styles.listItem}`);
      const cta = root.querySelector<HTMLElement>(`.${styles.ctaWrap}`);

      // —— Reduced motion: static readable state ——
      if (reduced) {
        gsap.set(
          [
            orbs,
            veil,
            watermark,
            title,
            eyebrow,
            role,
            stack,
            stage,
            stageGlow,
            panels,
            detailBlocks,
            listItems,
            cta,
          ],
          { clearProps: "all", opacity: 1, y: 0, x: 0, scale: 1, filter: "none" }
        );
        gsap.set(panels, { visibility: "visible", position: "relative" });
        if (path) {
          path.style.strokeDasharray = "none";
          path.style.strokeDashoffset = "0";
        }
        gsap.set(nodes, { opacity: 1, scale: 1 });
        if (progressFill) gsap.set(progressFill, { height: "100%" });
        if (stage) gsap.set(stage, { clipPath: "inset(0% 0% 0% 0%)" });
        return;
      }

      // Initial cinematic pose
      gsap.set(title, {
        scale: FEATURED_CINE.titleScaleFrom,
        y: FEATURED_CINE.titleYFrom,
        opacity: 0,
        filter: "blur(8px)",
        transformOrigin: "left center",
      });
      gsap.set([eyebrow, role, stack], { opacity: 0, y: 28 });
      gsap.set(stage, {
        scale: FEATURED_CINE.stageScaleFrom,
        y: FEATURED_CINE.stageYFrom,
        opacity: 0.35,
        clipPath: "inset(14% 10% 14% 10%)",
      });
      gsap.set(stageGlow, { opacity: 0, scale: 0.8 });
      gsap.set(panels, { opacity: 0, y: 28, visibility: "hidden" });
      gsap.set(watermark, { opacity: 0.02, scale: 1.08 });
      gsap.set(veil, { opacity: 0.35, xPercent: -8 });
      gsap.set(scanline, { opacity: 0, y: 0 });
      gsap.set(nodes, { opacity: 0, scale: 0.35 });

      let pathLen = 0;
      if (path) {
        pathLen = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: pathLen,
          strokeDashoffset: pathLen,
        });
      }

      const tl = gsap.timeline({
        defaults: { ease: FEATURED_CINE.easeHold },
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: desktop ? FEATURED_CINE.pinEnd : FEATURED_CINE.mobileScrubEnd,
          pin: desktop,
          scrub: desktop ? FEATURED_CINE.scrub : FEATURED_CINE.scrubMobile,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 0 → 0.22 — title bloom (hero-like settle)
      tl.to(
        title,
        {
          scale: 1,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.22,
          ease: "power2.out",
        },
        0
      );
      tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.14, ease: "power2.out" }, 0.04);
      tl.to(
        watermark,
        { opacity: 0.07, scale: 1, duration: 0.28, ease: "power1.out" },
        0
      );
      tl.to(veil, { opacity: 0.15, xPercent: 0, duration: 0.3 }, 0);

      // 0.12 → 0.38 — stage expands + route draws
      tl.to(
        stage,
        {
          scale: 1,
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.26,
          ease: "power2.out",
        },
        0.12
      );
      tl.to(stageGlow, { opacity: 1, scale: 1, duration: 0.22 }, 0.16);
      if (path) {
        tl.to(path, { strokeDashoffset: 0, duration: 0.28 }, 0.2);
      }
      tl.to(
        nodes,
        { opacity: 1, scale: 1, stagger: 0.04, duration: 0.12, ease: "back.out(1.6)" },
        0.32
      );
      if (scanline) {
        tl.fromTo(
          scanline,
          { opacity: 0, y: 0 },
          { opacity: 0.85, y: 180, duration: 0.22, ease: "none" },
          0.22
        );
        tl.to(scanline, { opacity: 0, duration: 0.08 }, 0.42);
      }

      tl.to([role, stack], { opacity: 1, y: 0, stagger: 0.04, duration: 0.12 }, 0.28);

      // 0.42 → 0.92 — story chapters crossfade (pinned narrative)
      FEATURED_CINE.chapterWindows.forEach((win, i) => {
        const panel = panels[i];
        if (!panel) return;
        const dur = win.end - win.start;
        tl.set(panel, { visibility: "visible" }, win.start);
        tl.fromTo(
          panel,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: dur * 0.35, ease: "power2.out" },
          win.start
        );
        // Hold then exit (except last — soft fade)
        if (i < panels.length - 1) {
          tl.to(
            panel,
            { opacity: 0, y: -20, duration: dur * 0.3, ease: "power1.in" },
            win.end - dur * 0.3
          );
          tl.set(panel, { visibility: "hidden" }, win.end);
        } else {
          tl.to(panel, { opacity: 0.92, duration: dur * 0.2 }, win.end - dur * 0.2);
        }
      });

      // Final settle — title slightly compresses, stage holds
      tl.to(
        title,
        { scale: 0.96, duration: 0.1, ease: "power1.inOut" },
        0.9
      );
      tl.to(watermark, { opacity: 0.04, yPercent: 6, duration: 0.12 }, 0.88);

      // Progress rail tied to same pin trigger
      if (progressFill) {
        gsap.fromTo(
          progressFill,
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: desktop ? FEATURED_CINE.pinEnd : FEATURED_CINE.mobileScrubEnd,
              scrub: 0.5,
            },
          }
        );
      }

      // Ambient orbs across whole section
      orbs.forEach((orb, i) => {
        gsap.fromTo(
          orb,
          { y: i % 2 === 0 ? -50 : 40, x: i === 1 ? 30 : -20 },
          {
            y: i % 2 === 0 ? 90 : -70,
            x: i === 1 ? -40 : 35,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });

      // After-pin detail cascade
      gsap.from(detailBlocks, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.after}`,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(listItems, {
        y: 16,
        opacity: 0,
        duration: 0.55,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.detailGrid}`,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      if (cta) {
        gsap.from(cta, {
          y: 24,
          opacity: 0,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cta,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: rootRef, dependencies: [c.title, c.challenge, t.CTAS.featuredCase] }
  );

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
            02
          </span>

          <div className={styles.cineGrid}>
            <div className={styles.copyCol}>
              <span className={styles.eyebrow}>02 — {c.label}</span>
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

              <div className={styles.storyDock} aria-live="polite">
                {storyBeats.map((beat, i) => (
                  <div
                    key={beat.label}
                    className={styles.storyPanel}
                    data-story-index={i}
                  >
                    <p className={styles.storyLabel}>{beat.label}</p>
                    <p className={styles.storyText}>{beat.text}</p>
                    {"note" in beat && beat.note ? (
                      <p className={styles.storyNote}>{beat.note}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.stageCol}>
              <div
                className={styles.stage}
                role="img"
                aria-label="Abstract route-system visual for the CyTaxi case"
              >
                <div className={styles.stageGlow} aria-hidden="true" />
                <div className={styles.stageFrame} aria-hidden="true" />
                <div className={styles.scanline} aria-hidden="true" />
                <span className={styles.stageLabel}>CYTAXI / ROUTE SYSTEM</span>
                <svg
                  className={styles.routeSvg}
                  viewBox="0 0 500 180"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    className={styles.routePathGhost}
                    d="M-10 142C74 18 126 164 215 73S355 25 510 100"
                  />
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
          </div>
        </div>
      </div>

      <div className={styles.after}>
        <p className={styles.afterHead}>{c.labels.buildNotes}</p>
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
