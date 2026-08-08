"use client";

import { useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGsapSafe";
import { useT } from "@/components/LocaleProvider";
import { jumpTo } from "@/lib/navigation";
import { FEATURED_CINE } from "@/lib/motion/featuredCase";
import styles from "./FeaturedCase.module.css";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const ROUTE_D =
  "M36 118C88 42 138 132 198 72S300 34 384 90";

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
      const nodes = gsap.utils.toArray<SVGGElement>(
        root.querySelectorAll(`.${styles.routeStop}`)
      );
      const car = root.querySelector<SVGGElement>(`.${styles.routeCar}`);
      const liveDot = root.querySelector<HTMLElement>(`.${styles.liveDot}`);
      const hudBits = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll(`.${styles.hudBit}`)
      );
      const panels = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll(`.${styles.storyPanel}`)
      );
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

      const prepTripVisual = () => {
        gsap.set(nodes, { autoAlpha: 0, scale: 0.55 });
        if (car) gsap.set(car, { autoAlpha: 0, scale: 0.7 });
        if (hudBits.length) gsap.set(hudBits, { autoAlpha: 0, y: 6 });
        if (liveDot) gsap.set(liveDot, { scale: 0.6, opacity: 0.35 });
        return drawPathFromZero();
      };

      const playTripVisual = (
        opts: { duration: number; stagger: number },
        position?: number | string
      ) => {
        const pathLength = path ? path.getTotalLength() : 0;
        const tl = gsap.timeline();
        if (path && pathLength) {
          tl.to(
            path,
            {
              strokeDashoffset: 0,
              duration: opts.duration,
              ease: "power2.out",
            },
            0
          );
        }
        if (nodes.length) {
          tl.to(
            nodes,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.28,
              stagger: opts.stagger,
              ease: "back.out(1.4)",
            },
            opts.duration * 0.15
          );
        }
        if (car && path) {
          tl.to(
            car,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.22,
              ease: "power2.out",
            },
            opts.duration * 0.2
          ).to(
            car,
            {
              duration: opts.duration * 0.85,
              ease: "power1.inOut",
              motionPath: {
                path,
                align: path,
                alignOrigin: [0.5, 0.5],
                autoRotate: 90,
                start: 0.08,
                end: 0.72,
              },
            },
            opts.duration * 0.22
          );
        }
        if (hudBits.length) {
          tl.to(
            hudBits,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.32,
              stagger: 0.05,
              ease: "power2.out",
            },
            opts.duration * 0.35
          );
        }
        if (liveDot) {
          tl.to(
            liveDot,
            { scale: 1, opacity: 1, duration: 0.25, ease: "power2.out" },
            opts.duration * 0.3
          );
          tl.to(
            liveDot,
            {
              scale: 1.35,
              opacity: 0.55,
              duration: 0.7,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            },
            opts.duration * 0.55
          );
        }
        return { tl, position };
      };

      // Reveal helpers use an explicit gsap.set (hidden state) + gsap.to
      // (scrollTrigger-driven reveal) instead of gsap.from().
      const revealDetails = (start: string) => {
        if (after && detailBlocks.length) {
          gsap.set(detailBlocks, { y: 22, autoAlpha: 0 });
          gsap.to(detailBlocks, {
            y: 0,
            autoAlpha: 1,
            duration: 0.55,
            stagger: 0.08,
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
          gsap.set(listItems, { y: 10, autoAlpha: 0 });
          gsap.to(listItems, {
            y: 0,
            autoAlpha: 1,
            duration: 0.4,
            stagger: 0.035,
            ease: "power2.out",
            scrollTrigger: {
              trigger: detailGrid,
              start: "top 84%",
              toggleActions: "play none none none",
              once: true,
            },
          });
        }

        if (cta) {
          gsap.set(cta, { y: 14, autoAlpha: 0 });
          gsap.to(cta, {
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cta,
              start: "top 92%",
              toggleActions: "play none none none",
              once: true,
            },
          });
        }
      };

      const mm = gsap.matchMedia();

      mm.add(
        {
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
                hudBits,
                car,
                nodes,
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
            gsap.set(hudBits, { autoAlpha: 1, y: 0 });
            if (path) {
              gsap.set(path, {
                strokeDasharray: "none",
                strokeDashoffset: 0,
              });
            }
            if (car && path) {
              gsap.set(car, {
                autoAlpha: 1,
                scale: 1,
                motionPath: {
                  path,
                  align: path,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: 90,
                  start: 0.48,
                  end: 0.48,
                },
              });
            } else if (car) {
              gsap.set(car, { autoAlpha: 1, scale: 1 });
            }
            if (progressRail) gsap.set(progressRail, { display: "none" });
            return;
          }

          if (conditions.mobile) {
            gsap.set([title, eyebrow, role, stack, stage, panels], {
              clearProps: "all",
            });
            prepTripVisual();

            const mobileIntro = [eyebrow, title, role, stack].filter(
              (element): element is HTMLElement => Boolean(element)
            );
            if (mobileIntro.length) {
              gsap.set(mobileIntro, { y: 14, autoAlpha: 0 });
              gsap.to(mobileIntro, {
                y: 0,
                autoAlpha: 1,
                duration: FEATURED_CINE.mobileRevealDuration,
                stagger: 0.06,
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
                y: 18,
                autoAlpha: 0,
                scale: FEATURED_CINE.mobileStageScaleFrom,
              });
              gsap.to(stage, {
                y: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 0.55,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: stage,
                  start: "top 84%",
                  toggleActions: "play none none none",
                  once: true,
                  onEnter: () => {
                    playTripVisual({
                      duration: FEATURED_CINE.mobilePathDuration,
                      stagger: 0.07,
                    });
                  },
                },
              });
            }

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

          if (!conditions.desktop) return;

          const pinEnd = () =>
            `+=${Math.round(window.innerHeight * FEATURED_CINE.pinScreens)}`;

          gsap.set(title, {
            scale: FEATURED_CINE.titleScaleFrom,
            y: FEATURED_CINE.titleYFrom,
            autoAlpha: 0,
            transformOrigin: "left center",
          });
          gsap.set([eyebrow, role, stack], { autoAlpha: 0, y: 18 });
          gsap.set(stage, {
            scale: FEATURED_CINE.stageScaleFrom,
            y: FEATURED_CINE.stageYFrom,
            autoAlpha: 0.35,
          });
          gsap.set(stageGlow, { opacity: 0, scale: 0.9 });
          gsap.set(panels, { autoAlpha: 0, y: 20 });
          gsap.set(watermark, { opacity: 0.02, scale: 1.04 });
          gsap.set(veil, { opacity: 0.32, xPercent: -6 });
          prepTripVisual();

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
              duration: 0.18,
              ease: "power2.out",
            },
            0
          )
            .to(
              eyebrow,
              { autoAlpha: 1, y: 0, duration: 0.12, ease: "power2.out" },
              0.03
            )
            .to(
              watermark,
              { opacity: 0.06, scale: 1, duration: 0.24, ease: "power1.out" },
              0
            )
            .to(veil, { opacity: 0.14, xPercent: 0, duration: 0.26 }, 0)
            .to(
              stage,
              {
                scale: 1,
                y: 0,
                autoAlpha: 1,
                duration: 0.22,
                ease: "power2.out",
              },
              0.1
            )
            .to(stageGlow, { opacity: 1, scale: 1, duration: 0.16 }, 0.14)
            .to(
              [role, stack],
              { autoAlpha: 1, y: 0, stagger: 0.03, duration: 0.11 },
              0.22
            );

          if (path) {
            tl.to(path, { strokeDashoffset: 0, duration: 0.24 }, 0.16);
          }
          if (nodes.length) {
            tl.to(
              nodes,
              {
                autoAlpha: 1,
                scale: 1,
                stagger: 0.035,
                duration: 0.1,
                ease: "back.out(1.5)",
              },
              0.26
            );
          }
          if (car && path) {
            tl.to(car, { autoAlpha: 1, scale: 1, duration: 0.1 }, 0.28).to(
              car,
              {
                duration: 0.28,
                ease: "none",
                motionPath: {
                  path,
                  align: path,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: 90,
                  start: 0.08,
                  end: 0.72,
                },
              },
              0.3
            );
          }
          if (hudBits.length) {
            tl.to(
              hudBits,
              {
                autoAlpha: 1,
                y: 0,
                stagger: 0.03,
                duration: 0.1,
                ease: "power2.out",
              },
              0.34
            );
          }
          if (liveDot) {
            tl.to(liveDot, { scale: 1, opacity: 1, duration: 0.08 }, 0.32);
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
                  y: -12,
                  duration: duration * 0.28,
                  ease: "power1.in",
                },
                window.end - duration * 0.28
              );
            }
          });

          tl.to(
            title,
            { scale: 0.98, duration: 0.08, ease: "power1.inOut" },
            0.9
          ).to(watermark, { opacity: 0.035, yPercent: 4, duration: 0.1 }, 0.88);

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
                  scrub: 0.4,
                  invalidateOnRefresh: true,
                },
              }
            );
          }

          orbs.forEach((orb, index) => {
            gsap.fromTo(
              orb,
              { y: index % 2 === 0 ? -28 : 22, x: index === 1 ? 16 : -12 },
              {
                y: index % 2 === 0 ? 48 : -36,
                x: index === 1 ? -22 : 18,
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

          revealDetails("top 80%");
        }
      );

      document.fonts?.ready.then(() => {
        if (root.isConnected) ScrollTrigger.refresh();
      });
      gsap.delayedCall(0.05, () => ScrollTrigger.refresh());
    },
    {
      scope: rootRef,
      dependencies: [c.title, c.challenge, ui.eta, t.CTAS.featuredCase],
    }
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

            <div className={styles.stageCol}>
              <div
                className={styles.stage}
                role="img"
                aria-label={ui.aria}
              >
                <div className={styles.stageGlow} aria-hidden="true" />

                <div className={styles.stageChrome} aria-hidden="true">
                  <span className={`${styles.hudBit} ${styles.stageProduct}`}>
                    {ui.product}
                  </span>
                  <span className={`${styles.hudBit} ${styles.liveBadge}`}>
                    <span className={styles.liveDot} />
                    {ui.live}
                  </span>
                </div>

                <div className={styles.mapPane} aria-hidden="true">
                  <svg
                    className={styles.routeSvg}
                    viewBox="0 0 420 160"
                    fill="none"
                  >
                    <g className={styles.mapGrid} opacity="0.45">
                      <path d="M0 40H420M0 80H420M0 120H420" />
                      <path d="M70 0V160M140 0V160M210 0V160M280 0V160M350 0V160" />
                    </g>
                    <path
                      className={styles.blockGhost}
                      d="M52 28h48v34H52zM168 18h56v28h-56zM292 44h64v36h-64zM98 96h70v38H98zM248 102h78v30h-78z"
                    />
                    <path className={styles.routePathGhost} d={ROUTE_D} />
                    <path className={styles.routePath} d={ROUTE_D} />

                    <g className={styles.routeStop} transform="translate(36 118)">
                      <circle r="11" className={styles.stopHalo} />
                      <circle r="5.5" className={styles.stopCore} />
                      <text y="-14" textAnchor="middle" className={styles.stopLetter}>
                        A
                      </text>
                    </g>
                    <g className={styles.routeStop} transform="translate(384 90)">
                      <circle r="11" className={styles.stopHalo} />
                      <circle r="5.5" className={styles.stopCoreB} />
                      <text y="-14" textAnchor="middle" className={styles.stopLetter}>
                        B
                      </text>
                    </g>

                    <g className={styles.routeCar}>
                      <rect
                        x="-9"
                        y="-5"
                        width="18"
                        height="10"
                        rx="3"
                        className={styles.carBody}
                      />
                      <rect
                        x="-5"
                        y="-3.2"
                        width="7"
                        height="6.4"
                        rx="1.2"
                        className={styles.carCab}
                      />
                    </g>
                  </svg>
                </div>

                <div className={styles.tripHud} aria-hidden="true">
                  <div className={`${styles.hudBit} ${styles.tripStops}`}>
                    <p>
                      <span>A</span>
                      {ui.pickup} · {ui.pickupPlace}
                    </p>
                    <p>
                      <span>B</span>
                      {ui.dropoff} · {ui.dropoffPlace}
                    </p>
                  </div>
                  <div className={`${styles.hudBit} ${styles.tripMeta}`}>
                    <span>{ui.status}</span>
                    <strong>{ui.eta}</strong>
                  </div>
                </div>
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
