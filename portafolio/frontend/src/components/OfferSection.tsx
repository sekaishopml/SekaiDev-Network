"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGsapSafe";
import { useT } from "@/components/LocaleProvider";
import WorkArt from "@/components/WorkArt";
import { getIntent, jumpTo } from "@/lib/navigation";
import { OFFER_SCROLL } from "@/lib/motion/offerScroll";
import { REVEAL } from "@/lib/motion/revealPresets";
import styles from "./OfferSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function OfferSection() {
  const rootRef = useRef<HTMLElement>(null);
  const [intent, setIntent] = useState("");
  const t = useT();

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

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduced = window.matchMedia(OFFER_SCROLL.reducedQuery).matches;

      const headBits = root.querySelectorAll("[data-offer-head]");
      const foot = root.querySelector("[data-offer-foot]");
      if (headBits.length) {
        gsap.from(headBits, {
          opacity: reduced ? 1 : 0,
          y: reduced ? 0 : 22,
          duration: reduced ? 0 : 0.85,
          stagger: 0.08,
          ease: REVEAL.ease,
          scrollTrigger: {
            trigger: root,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });
      }
      if (foot) {
        gsap.from(foot, {
          opacity: reduced ? 1 : 0,
          y: reduced ? 0 : 18,
          duration: reduced ? 0 : 0.75,
          ease: REVEAL.ease,
          scrollTrigger: {
            trigger: foot,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      }

      const rows = Array.from(
        root.querySelectorAll<HTMLElement>("[data-offer-row]")
      );

      rows.forEach((row) => {
        const stage = row.querySelector<HTMLElement>("[data-offer-stage]");
        const panel = row.querySelector<HTMLElement>("[data-offer-panel]");
        if (!stage || !panel) return;

        // Measure natural panel height for a stable scrub.
        const measure = () => {
          const prev = stage.style.height;
          stage.style.height = "auto";
          const h = panel.scrollHeight;
          stage.style.height = prev;
          return Math.max(h, 96);
        };

        if (reduced) {
          gsap.set(stage, { height: "auto", autoAlpha: 1 });
          gsap.set(panel, { clearProps: "transform,opacity,filter" });
          row.classList.add(styles.isOpen);
          return;
        }

        gsap.set(stage, { height: 0, autoAlpha: 0, overflow: "hidden" });
        gsap.set(panel, {
          y: 28,
          scale: 0.97,
          opacity: 0.35,
          filter: "blur(6px)",
          transformOrigin: "50% 0%",
        });

        const tl = gsap.timeline({
          defaults: { ease: OFFER_SCROLL.easePanel },
          scrollTrigger: {
            trigger: row,
            start: OFFER_SCROLL.start,
            end: OFFER_SCROLL.end,
            scrub: OFFER_SCROLL.scrub,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              row.classList.toggle(styles.isOpen, self.progress > 0.45);
            },
          },
        });

        tl.to(
          stage,
          {
            height: () => measure(),
            autoAlpha: 1,
            duration: 1,
          },
          0
        ).to(
          panel,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
          },
          0.08
        );
      });

      const refresh = () => {
        if (root.isConnected) ScrollTrigger.refresh();
      };
      document.fonts?.ready.then(refresh);
      gsap.delayedCall(0.2, refresh);

      return () => {
        rows.forEach((row) => row.classList.remove(styles.isOpen));
      };
    },
    {
      scope: rootRef,
      dependencies: [t.WORKS.length, t.UI.offerHeadline],
    }
  );

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
          <div data-offer-head>
            <span className={styles.offerEyebrow}>{t.UI.offerLabel}</span>
            <h2 id="offer-heading" className={styles.offerTitle}>
              {t.UI.offerHeadline}
              <span className={styles.offerTitleAccent}>
                {t.UI.offerHeadlineAccent}
              </span>
            </h2>
          </div>
          <div className={styles.offerAside} data-offer-head>
            <p className={styles.offerSubline}>{t.UI.offerSubline}</p>
          </div>
        </header>

        <ol id="works" className={styles.offerList}>
          {t.WORKS.map((p, i) => (
            <li
              key={p.id}
              data-offer-row
              className={styles.offerRow}
            >
              <div className={styles.offerMain}>
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
              </div>

              <div data-offer-stage className={styles.offerStage}>
                <div data-offer-panel className={styles.offerPanel}>
                  <WorkArt
                    slug={p.slug as "crm" | "websites" | "api" | "dashboards"}
                    label={p.kind}
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className={styles.offerFoot} data-offer-foot>
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
