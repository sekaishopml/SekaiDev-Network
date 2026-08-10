"use client";

import { type RefObject } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGsapSafe";
import { FEATURED_CINE } from "@/lib/motion/featuredCase";
import styles from "@/components/FeaturedCase.module.css";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export function useFeaturedCaseTimeline(
  rootRef: RefObject<HTMLElement | null>,
  pinRef: RefObject<HTMLDivElement | null>,
  deps: unknown[]
) {
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
      dependencies: deps,
    }
  );
}
