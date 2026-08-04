"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { LOOK_DESIGN } from "@/lib/motion/lookDesign";
import styles from "./LookDesignStage.module.css";

/**
 * Highly visible cursor-design loop inside `#media-long`:
 * mouse draws artboard → places UI → dimensions → clicks CTA.
 * Outer #media-long geometry stays the intro scroll target.
 */
export default function LookDesignStage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const q = <T extends HTMLElement>(sel: string) =>
      root.querySelector<T>(sel);

    const artboard = q("[data-artboard]");
    const handles = root.querySelectorAll<HTMLElement>("[data-handle]");
    const dimX = q("[data-dim-x]");
    const dimY = q("[data-dim-y]");
    const header = q("[data-header]");
    const panel = q("[data-panel]");
    const card = q("[data-card]");
    const btn = q("[data-btn]");
    const cursor = q("[data-cursor]");
    const pulse = q("[data-pulse]");
    if (!artboard || !header || !panel || !card || !btn || !cursor) return;

    const showFinal = () => {
      gsap.set(
        [artboard, header, panel, card, btn, ...Array.from(handles)].filter(
          Boolean
        ),
        { opacity: 1, scale: 1, scaleX: 1, scaleY: 1, x: 0, y: 0 }
      );
      if (dimX) gsap.set(dimX, { opacity: 0.85, scaleX: 1 });
      if (dimY) gsap.set(dimY, { opacity: 0.85, scaleY: 1 });
      gsap.set(cursor, { opacity: 0 });
      if (pulse) gsap.set(pulse, { opacity: 0 });
    };

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      showFinal();
      return;
    }

    /** Cursor targets as % of stage — avoids broken rects on scaleX:0 nodes */
    const pct = (px: number, py: number) => ({
      x: () => root.clientWidth * px,
      y: () => root.clientHeight * py,
    });

    gsap.set(artboard, { opacity: 0, scale: 0.78 });
    gsap.set(handles, { opacity: 0, scale: 0 });
    gsap.set([dimX, dimY].filter(Boolean), {
      opacity: 0,
      scaleX: 0,
      scaleY: 0,
    });
    gsap.set(header, { opacity: 0, scaleX: 0 });
    gsap.set(panel, { opacity: 0, scaleY: 0 });
    gsap.set(card, { opacity: 0, x: 18 });
    gsap.set(btn, { opacity: 0, scale: 0.6 });
    gsap.set(cursor, { opacity: 0, x: 10, y: 12 });
    if (pulse) gsap.set(pulse, { opacity: 0, scale: 0.4 });

    let tl: gsap.core.Timeline | null = null;
    let observer: MutationObserver | null = null;

    const build = () => {
      if (tl) return;

      tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.4,
        defaults: { force3D: true },
      });

      tl.to(cursor, { opacity: 1, duration: LOOK_DESIGN.cursorIn }, 0);

      tl.to(cursor, {
        ...pct(0.45, 0.4),
        duration: LOOK_DESIGN.move,
        ease: LOOK_DESIGN.easeMove,
      }, 0.12);

      tl.to(
        artboard,
        {
          opacity: 1,
          scale: 1,
          duration: LOOK_DESIGN.drawOutline,
          ease: LOOK_DESIGN.easePlace,
        },
        0.28
      );

      tl.to(cursor, {
        ...pct(0.18, 0.28),
        duration: LOOK_DESIGN.move * 0.9,
        ease: LOOK_DESIGN.easeMove,
      }, "+=0.08");
      tl.to(
        header,
        {
          opacity: 1,
          scaleX: 1,
          duration: LOOK_DESIGN.place,
          ease: LOOK_DESIGN.easePlace,
        },
        "<0.12"
      );

      tl.to(cursor, {
        ...pct(0.2, 0.55),
        duration: LOOK_DESIGN.move * 0.9,
        ease: LOOK_DESIGN.easeMove,
      }, "+=0.06");
      tl.to(
        panel,
        {
          opacity: 1,
          scaleY: 1,
          duration: LOOK_DESIGN.place,
          ease: LOOK_DESIGN.easePlace,
        },
        "<0.12"
      );

      tl.to(cursor, {
        ...pct(0.62, 0.52),
        duration: LOOK_DESIGN.move * 0.9,
        ease: LOOK_DESIGN.easeMove,
      }, "+=0.06");
      tl.to(
        card,
        {
          opacity: 1,
          x: 0,
          duration: LOOK_DESIGN.place,
          ease: LOOK_DESIGN.easePlace,
        },
        "<0.12"
      );

      tl.to(
        handles,
        {
          opacity: 1,
          scale: 1,
          duration: 0.28,
          stagger: 0.05,
          ease: LOOK_DESIGN.easePop,
        },
        "+=0.1"
      );
      if (dimX) {
        tl.to(
          dimX,
          {
            opacity: 0.9,
            scaleX: 1,
            duration: LOOK_DESIGN.dimension,
            ease: LOOK_DESIGN.easePlace,
          },
          "<"
        );
      }
      if (dimY) {
        tl.to(
          dimY,
          {
            opacity: 0.9,
            scaleY: 1,
            duration: LOOK_DESIGN.dimension,
            ease: LOOK_DESIGN.easePlace,
          },
          "<0.05"
        );
      }
      tl.to(
        artboard,
        {
          scale: 1.025,
          duration: 0.32,
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut",
        },
        "<"
      );

      tl.to(cursor, {
        ...pct(0.78, 0.72),
        duration: LOOK_DESIGN.move,
        ease: LOOK_DESIGN.easeMove,
      }, "+=0.1");
      tl.to(
        btn,
        {
          opacity: 1,
          scale: 1,
          duration: LOOK_DESIGN.place,
          ease: LOOK_DESIGN.easePop,
        },
        "<0.08"
      );

      if (pulse) {
        tl.set(pulse, {
          x: () => root.clientWidth * 0.78,
          y: () => root.clientHeight * 0.72,
          opacity: 0.95,
          scale: 0.3,
        });
        tl.to(
          pulse,
          {
            opacity: 0,
            scale: 1.7,
            duration: LOOK_DESIGN.click,
            ease: "power2.out",
          },
          "<0.1"
        );
      }
      tl.to(btn, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 }, "<");

      tl.to({}, { duration: LOOK_DESIGN.hold });
      tl.to(
        [
          artboard,
          header,
          panel,
          card,
          btn,
          ...Array.from(handles),
          dimX,
          dimY,
          cursor,
        ].filter(Boolean),
        {
          opacity: 0,
          duration: LOOK_DESIGN.fadeOut,
          ease: "sine.in",
        }
      );

      tl.set(artboard, { scale: 0.78 });
      tl.set(header, { scaleX: 0 });
      tl.set(panel, { scaleY: 0 });
      tl.set(card, { x: 18 });
      tl.set(btn, { scale: 0.6 });
      tl.set(handles, { scale: 0 });
      if (dimX) tl.set(dimX, { scaleX: 0 });
      if (dimY) tl.set(dimY, { scaleY: 0 });
      tl.set(cursor, { x: 10, y: 12 });
    };

    if (document.documentElement.dataset.intro === "done") {
      requestAnimationFrame(() => build());
    } else {
      observer = new MutationObserver(() => {
        if (document.documentElement.dataset.intro === "done") {
          requestAnimationFrame(() => build());
          observer?.disconnect();
          observer = null;
        }
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-intro"],
      });
    }

    return () => {
      observer?.disconnect();
      tl?.kill();
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.stage} data-look-design>
      <div className={styles.artboard} data-artboard>
        <span className={`${styles.handle} ${styles.handleTL}`} data-handle />
        <span className={`${styles.handle} ${styles.handleTR}`} data-handle />
        <span className={`${styles.handle} ${styles.handleBL}`} data-handle />
        <span className={`${styles.handle} ${styles.handleBR}`} data-handle />
        <span className={styles.dimX} data-dim-x />
        <span className={styles.dimY} data-dim-y />
        <div className={styles.header} data-header />
        <div className={styles.panel} data-panel />
        <div className={styles.card} data-card>
          <span className={styles.cardLine} />
          <span className={styles.cardLine} />
          <span className={styles.cardLine} />
          <span className={styles.btn} data-btn />
        </div>
      </div>
      <p className={styles.caption}>UI · API · BRAND</p>
      <div className={styles.clickPulse} data-pulse />
      <div className={styles.cursor} data-cursor aria-hidden="true">
        <svg viewBox="0 0 16 20" fill="none">
          <path
            d="M1.5 1.2L14.2 9.1L8.4 10.4L11.2 18.2L8.6 19.2L5.7 11.1L1.5 14.6V1.2Z"
            fill="#1a1418"
            stroke="#fff"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
