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
      const progressRail = root.querySelector<HTMLElement>(
        `.${styles.progressRail}`
      );
      const progressFill = root.querySelector<HTMLElement>(
        `.${styles.progressFill}`
      );
      const detailBlocks = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll(`.${styles.detailBlock}`)
      );
      const listItems = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll(`.${styles.listItem}`)
      );
      const after = root.querySelector<HTMLElement>(`.${styles.after}`);
      const detailGrid = root.querySelector<HTMLElement>(
        `.${styles.detailGrid}`
      );
      const cta = root.querySelector<HTMLElement>(`.${styles.ctaWrap}`);

      const drawPathFromZero = () => {
        if (!path) return 0;
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        return length;
      };

      // Reveal helpers use an explicit gsap.set (hidden state) + gsap.to
      // (scrollTrigger-driven reveal) instead of gsap.from(). gsap.from()
      // defaults immediateRender:true, which renders the "from" values the
      // instant the tween is created — decoupled from ScrollTrigger's own
      // progress math. If a refresh (matchMedia switch, font load, layout
      // shift) recomputes the trigger's start position after that render,
      // above-the-fold content can be left stuck invisible. gsap.to()
      // never immediate-renders, so visibility is always driven by the
      // ScrollTrigger's current, correctly-refreshed progress.
      const revealDetails = (start: string) => {
        if (after && detailBlocks.length) {
          gsap.set(detailBlocks, { y: 28, autoAlpha: 0 });
          gsap.to(detailBlocks, {
            y: 0,
            autoAlpha: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: after,
              start,
              toggleActions: "play none none none",
              once: true,
            },
          });
        }

        if (detailGrid && listItems.length) {
          gsap.set(listItems, { y: 12, autoAlpha: 0 });
          gsap.to(listItems, {
            y: 0,
            autoAlpha: 1,
            duration: 0.45,
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: detailGrid,
              start: "top 82%",
              toggleActions: "play none none none",
              once: true,
            },
          });
        }

        if (cta) {
          gsap.set(cta, { y: 18, autoAlpha: 0 });
          gsap.to(cta, {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cta,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
          });
        }
      };

      const mm = gsap.matchMedia();

      mm.add(
        {
          // desktopQuery / mobileQuery are exact complements (De Morgan's
          // law over min-width+min-height), so every viewport — including
          // short landscape phones/tablets and short desktop windows —
          // lands in exactly one branch below.
          desktop: FEATURED_CINE.desktopQuery,
          mobile: FEATURED_CINE.mobileQuery,
          reduceMotion: FEATURED_CINE.reducedMotionQuery,
        },
        (context) => {
          const conditions = context.conditions as {
            desktop: boolean;
            mobile: boolean;
            reduceMotion: boolean;
          };

          if (conditions.reduceMotion) {
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
              { clearProps: "all" }
            );
            gsap.set(panels, {
              position: "relative",
              autoAlpha: 1,
              x: 0,
              y: 0,
            });
            gsap.set(nodes, { autoAlpha: 1, scale: 1 });
            if (path) {
              gsap.set(path, {
                strokeDasharray: "none",
                strokeDashoffset: 0,
              });
            }
            if (progressRail) gsap.set(progressRail, { display: "none" });
            return;
          }

          if (conditions.mobile) {
            gsap.set([title, eyebrow, role, stack, stage, panels], {
              clearProps: "all",
            });
            gsap.set(nodes, { autoAlpha: 0, scale: 0.55 });

            const mobileIntro = [eyebrow, title, role, stack].filter(
              (element): element is HTMLElement => Boolean(element)
            );
            if (mobileIntro.length) {
              gsap.set(mobileIntro, { y: 18, autoAlpha: 0 });
              gsap.to(mobileIntro, {
                y: 0,
                autoAlpha: 1,
                duration: FEATURED_CINE.mobileRevealDuration,
                stagger: 0.07,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: pin,
                  start: "top 86%",
                  toggleActions: "play none none none",
                  once: true,
                },
              });
            }

            if (stage) {
              gsap.set(stage, {
                y: 24,
                autoAlpha: 0,
                scale: FEATURED_CINE.mobileStageScaleFrom,
              });
              gsap.to(stage, {
                y: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 0.65,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: stage,
                  start: "top 84%",
                  toggleActions: "play none none none",
                  once: true,
                },
              });
            }

            const pathLength = drawPathFromZero();
            if (path && pathLength) {
              gsap.to(path, {
                strokeDashoffset: 0,
                duration: FEATURED_CINE.mobilePathDuration,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: stage ?? path,
                  start: "top 82%",
                  toggleActions: "play none none none",
                  once: true,
                },
              });
            }
            if (nodes.length) {
              gsap.to(nodes, {
                autoAlpha: 1,
                scale: 1,
                duration: 0.32,
                stagger: 0.08,
                ease: "back.out(1.4)",
                scrollTrigger: {
                  trigger: stage ?? nodes[0],
                  start: "top 80%",
                  toggleActions: "play none none none",
                  once: true,
                },
              });
            }

            // Each story beat is its own chapter: a slightly deeper
            // (scale) + higher (y) start than the intro gives the stack a
            // subtle sense of depth as the reader moves through it, without
            // ever pinning or scrubbing the content itself.
            panels.forEach((panel) => {
              gsap.set(panel, {
                y: FEATURED_CINE.mobilePanelYFrom,
                autoAlpha: 0,
                scale: FEATURED_CINE.mobilePanelScaleFrom,
              });
              gsap.to(panel, {
                y: 0,
                autoAlpha: 1,
                scale: 1,
                duration: FEATURED_CINE.mobileRevealDuration,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: panel,
                  start: "top 88%",
                  toggleActions: "play none none none",
                  once: true,
                },
              });
            });

            // Atmosphere-only depth: a short, local parallax/opacity drift
            // on the decorative (aria-hidden) orbs + veil, scoped to the
            // intro→stage→story block via `pin` as the trigger. This is a
            // normal scrub tied to natural document scroll — it does not
            // pin anything and does not stretch across the whole page —
            // so it reads as ambient depth rather than a cinema scrub.
            // Orbs (small blurred circles) get translated; the veil (a
            // full-bleed inset:0 gradient) only fades, since translating a
            // full-size overlay by a percentage of its own height would
            // expose gaps at its edges.
            if (orbs.length) {
              const range = FEATURED_CINE.mobileAtmosphereRange;
              orbs.forEach((orb, index) => {
                gsap.fromTo(
                  orb,
                  { yPercent: 0 },
                  {
                    yPercent: index % 2 === 0 ? -range : range,
                    ease: "none",
                    scrollTrigger: {
                      trigger: pin,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: FEATURED_CINE.mobileAtmosphereScrub,
                      invalidateOnRefresh: true,
                    },
                  }
                );
              });
            }
            if (veil) {
              gsap.fromTo(
                veil,
                { opacity: 0.16 },
                {
                  opacity: 0.3,
                  ease: "none",
                  scrollTrigger: {
                    trigger: pin,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: FEATURED_CINE.mobileAtmosphereScrub,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }

            revealDetails("top 84%");
            return;
          }

          if (!conditions.desktop) {
            // desktopQuery / mobileQuery are exact complements, so this
            // branch should be unreachable. Bail out defensively instead
            // of guessing a pin distance for an unrecognized viewport.
            return;
          }

          const pinEnd = () =>
            `+=${Math.round(window.innerHeight * FEATURED_CINE.pinScreens)}`;

          gsap.set(title, {
            scale: FEATURED_CINE.titleScaleFrom,
            y: FEATURED_CINE.titleYFrom,
            autoAlpha: 0,
            transformOrigin: "left center",
          });
          gsap.set([eyebrow, role, stack], { autoAlpha: 0, y: 24 });
          gsap.set(stage, {
            scale: FEATURED_CINE.stageScaleFrom,
            y: FEATURED_CINE.stageYFrom,
            autoAlpha: 0.35,
          });
          gsap.set(stageGlow, { opacity: 0, scale: 0.84 });
          gsap.set(panels, { autoAlpha: 0, y: 28 });
          gsap.set(watermark, { opacity: 0.02, scale: 1.06 });
          gsap.set(veil, { opacity: 0.32, xPercent: -6 });
          gsap.set(scanline, { opacity: 0, y: 0 });
          gsap.set(nodes, { autoAlpha: 0, scale: 0.4 });

          const pathLength = drawPathFromZero();
          const tl = gsap.timeline({
            defaults: { ease: FEATURED_CINE.easeHold },
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: pinEnd,
              pin: true,
              pinSpacing: true,
              scrub: FEATURED_CINE.scrub,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.to(
            title,
            {
              scale: 1,
              y: 0,
              autoAlpha: 1,
              duration: 0.2,
              ease: "power2.out",
            },
            0
          )
            .to(
              eyebrow,
              { autoAlpha: 1, y: 0, duration: 0.14, ease: "power2.out" },
              0.04
            )
            .to(
              watermark,
              { opacity: 0.07, scale: 1, duration: 0.28, ease: "power1.out" },
              0
            )
            .to(veil, { opacity: 0.14, xPercent: 0, duration: 0.3 }, 0)
            .to(
              stage,
              {
                scale: 1,
                y: 0,
                autoAlpha: 1,
                duration: 0.25,
                ease: "power2.out",
              },
              0.12
            )
            .to(stageGlow, { opacity: 1, scale: 1, duration: 0.2 }, 0.16)
            .to(
              nodes,
              {
                autoAlpha: 1,
                scale: 1,
                stagger: 0.04,
                duration: 0.12,
                ease: "back.out(1.5)",
              },
              0.31
            )
            .to(
              [role, stack],
              { autoAlpha: 1, y: 0, stagger: 0.04, duration: 0.12 },
              0.27
            );

          if (path && pathLength) {
            tl.to(path, { strokeDashoffset: 0, duration: 0.28 }, 0.19);
          }
          if (scanline) {
            tl.fromTo(
              scanline,
              { opacity: 0, y: 0 },
              { opacity: 0.8, y: 180, duration: 0.2, ease: "none" },
              0.21
            ).to(scanline, { opacity: 0, duration: 0.08 }, 0.41);
          }

          FEATURED_CINE.chapterWindows.forEach((window, index) => {
            const panel = panels[index];
            if (!panel) return;
            const duration = window.end - window.start;
            tl.set(panel, { visibility: "visible" }, window.start)
              .to(
                panel,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: duration * 0.34,
                  ease: "power2.out",
                },
                window.start
              );

            if (index < panels.length - 1) {
              tl.to(
                panel,
                {
                  autoAlpha: 0,
                  y: -16,
                  duration: duration * 0.28,
                  ease: "power1.in",
                },
                window.end - duration * 0.28
              );
            }
          });

          tl.to(
            title,
            { scale: 0.97, duration: 0.1, ease: "power1.inOut" },
            0.9
          ).to(watermark, { opacity: 0.04, yPercent: 5, duration: 0.12 }, 0.88);

          if (progressFill) {
            gsap.fromTo(
              progressFill,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: pin,
                  start: "top top",
                  end: pinEnd,
                  scrub: 0.45,
                  invalidateOnRefresh: true,
                },
              }
            );
          }

          orbs.forEach((orb, index) => {
            gsap.fromTo(
              orb,
              { y: index % 2 === 0 ? -40 : 32, x: index === 1 ? 24 : -16 },
              {
                y: index % 2 === 0 ? 70 : -55,
                x: index === 1 ? -32 : 28,
                ease: "none",
                scrollTrigger: {
                  trigger: root,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              }
            );
          });

          revealDetails("top 78%");
        }
      );

      // Font metrics affect both the pin distance and mobile stacked-panel starts.
      document.fonts?.ready.then(() => {
        if (root.isConnected) ScrollTrigger.refresh();
      });
      gsap.delayedCall(0.05, () => ScrollTrigger.refresh());
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
