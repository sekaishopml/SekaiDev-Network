"use client";

import {
  useRef,
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
  memo,
  Suspense,
} from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { View } from "@react-three/drei";
import {
  BonsaiCanvas,
  BonsaiScene,
  type TrackMetrics,
} from "@/components/three/Scene3D";
import RainbowArc from "./RainbowArc";
import {
  applyRect,
  getFallbackLayout,
  getStartRect,
  lerpRect,
  measureLookTargets,
  introSegment,
  resetLookTypography,
  setIntroPhaseFromProgress,
  TRANSITION_DURATION_IN,
  TRANSITION_DURATION_OUT,
} from "@/lib/heroTransforms";
import { HERO_ENTRANCE } from "@/lib/motion/heroEntrance";
import {
  HERO_LONG_SURFACE_BG,
  HERO_LONG_SURFACE_IMAGE,
  HERO_SURFACE_BG,
  HERO_SURFACE_IMAGE,
} from "@/lib/heroAtmosphere";
import { FUNNEL_PATHS, STUDIO } from "@/content/studio";

interface HeroSectionProps {
  loaded?: boolean;
  onBonsaiLoaded?: () => void;
}

/**
 * Finite state machine for the intro:
 *   hero    -> wheel/touch/key down -> forward  -> look
 *   look (at scrollY≈0) -> wheel/touch/key up -> reverse -> hero
 *
 * Only ONE thing ever drives the transform: a single GSAP tween on a plain
 * progress object (0..1). Real page scroll is locked (Lenis stopped +
 * overflow hidden) while phase !== "look", so there is never a race
 * between "scroll position" and "animation progress" — that mismatch was
 * the root cause of the previous buggy behaviour.
 */
type Phase = "hero" | "forward" | "look" | "reverse";

function HeroSection({ loaded, onBonsaiLoaded }: HeroSectionProps) {
  const lenis = useLenis();
  const heroRef = useRef<HTMLElement>(null);
  const longPanelRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<HTMLDivElement>(null);

  const phaseRef = useRef<Phase>("hero");
  const progressObj = useRef({ value: 0 });
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const scrollMachineInit = useRef(false);
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;
  const [lenisReady, setLenisReady] = useState(!!lenis);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [portalReady, setPortalReady] = useState(false);
  const [showSkip, setShowSkip] = useState(true);
  const skipRef = useRef<(() => void) | null>(null);
  /** Blocks intro scroll + applyProgress arc ownership until entrance ends */
  const entranceDoneRef = useRef(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  /**
   * Presentation: short bonsai beat → radial color bloom →
   * soft copy rise (never animate the 3D).
   */
  useLayoutEffect(() => {
    const labels = labelsRef.current;
    const arc = arcRef.current;
    if (!labels || !portalReady) return;

    const copy = gsap.utils.toArray<HTMLElement>(
      labels.querySelectorAll("[data-hero-reveal]")
    );
    if (!copy.length) return;

    const bloom = arc?.querySelector<HTMLElement>("[data-hero-bloom]") ?? null;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.set(copy, { opacity: 0, y: HERO_ENTRANCE.copyY });
    if (arc) gsap.set(arc, { opacity: 0, y: HERO_ENTRANCE.arcY });
    if (bloom) {
      gsap.set(bloom, {
        opacity: HERO_ENTRANCE.bloomOpacityFrom,
        "--bloom-r": HERO_ENTRANCE.bloomClipStart,
      });
    }

    if (reduced) {
      gsap.set(copy, { opacity: 1, y: 0, clearProps: "transform" });
      if (arc) gsap.set(arc, { opacity: 1, y: 0, clearProps: "transform" });
      if (bloom) {
        gsap.set(bloom, {
          opacity: 1,
          "--bloom-r": HERO_ENTRANCE.bloomClipEnd,
          clearProps: "clipPath",
        });
      }
      entranceDoneRef.current = true;
      return;
    }

    if (!loaded) return;

    let started = false;
    let tl: gsap.core.Timeline | null = null;

    const startEntrance = () => {
      if (started) return;
      started = true;

      tl = gsap.timeline({
        defaults: { force3D: true },
        onComplete: () => {
          entranceDoneRef.current = true;
        },
      });
      tl.addLabel("reveal", HERO_ENTRANCE.presentationHold);

      // Color blooms from center outward (clip radius, not opacity-only)
      if (bloom) {
        tl.to(
          bloom,
          {
            "--bloom-r": HERO_ENTRANCE.bloomClipEnd,
            opacity: HERO_ENTRANCE.bloomOpacityTo,
            duration: HERO_ENTRANCE.bloomDuration,
            ease: HERO_ENTRANCE.easeBloom,
          },
          `reveal-=${HERO_ENTRANCE.arcLead}`
        );
      }

      if (arc) {
        tl.fromTo(
          arc,
          { opacity: 0, y: HERO_ENTRANCE.arcY },
          {
            opacity: 1,
            y: 0,
            duration: HERO_ENTRANCE.arcDuration,
            ease: HERO_ENTRANCE.easeArc,
          },
          `reveal-=${HERO_ENTRANCE.arcLead}`
        );
      }

      tl.fromTo(
        copy,
        { opacity: 0, y: HERO_ENTRANCE.copyY },
        {
          opacity: 1,
          y: 0,
          duration: HERO_ENTRANCE.copyDuration,
          stagger: {
            each: HERO_ENTRANCE.copyStagger,
            from: HERO_ENTRANCE.copyStaggerFrom,
          },
          ease: HERO_ENTRANCE.easeCopy,
        },
        "reveal"
      );
    };

    const loaderGone =
      document.documentElement.dataset.loader === "done";

    if (loaderGone) {
      startEntrance();
    } else {
      window.addEventListener("sekaidev:loader-dismissed", startEntrance, {
        once: true,
      });
    }

    return () => {
      window.removeEventListener("sekaidev:loader-dismissed", startEntrance);
      tl?.kill();
    };
  }, [loaded, portalReady]);

  useEffect(() => {
    if (lenis && !lenisReady) setLenisReady(true);
  }, [lenis, lenisReady]);

  const trackMetricsRef = useRef<TrackMetrics>({
    width: typeof window !== "undefined" ? window.innerWidth : 1,
    height: typeof window !== "undefined" ? window.innerHeight : 1,
    ratioW: 1,
    ratioH: 1,
    innerScale: 1,
  });

  const applyProgress = useCallback((progress: number) => {
    const p = gsap.utils.clamp(0, 1, progress);

    // Typography — inline so it always runs in the same tick as overlay transforms
    setIntroPhaseFromProgress(p);
    document.documentElement.dataset.introProgress = String(Math.round(p * 1000));

    const lookReveal = introSegment(p, 0.26, 0.54);
    const beyondReveal = introSegment(p, 0.34, 0.6);
    const findReveal = introSegment(p, 0.48, 0.76);
    const trueReveal = introSegment(p, 0.6, 0.9);

    const lookX = (1 - lookReveal) * -18;
    const lookY = (1 - lookReveal) * -48;
    const beyondY = (1 - beyondReveal) * -32;
    const findX = (1 - findReveal) * 22;
    const findY = (1 - findReveal) * 44;
    const trueY = (1 - trueReveal) * 36;

    const root = document.documentElement;
    root.style.setProperty("--look-reveal", String(lookReveal));
    root.style.setProperty("--look-block-y", `${lookY}px`);
    root.style.setProperty("--look-x", `${lookX}px`);
    root.style.setProperty("--beyond-reveal", String(beyondReveal));
    root.style.setProperty("--beyond-y", `${beyondY}px`);
    root.style.setProperty("--find-reveal", String(findReveal));
    root.style.setProperty("--find-y", `${findY}px`);
    root.style.setProperty("--find-x", `${findX}px`);
    root.style.setProperty("--true-reveal", String(trueReveal));
    root.style.setProperty("--true-y", `${trueY}px`);

    const longPanel = longPanelRef.current;
    const cover = coverRef.current;
    const labels = labelsRef.current;
    const arc = arcRef.current;
    if (!longPanel || !cover || !labels || !arc) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const isMobile = w < 768;

    const start = getStartRect(w, h);
    const measured = measureLookTargets();
    const end = measured ?? getFallbackLayout(w, h, isMobile);

    // At the end state, snap to live measured targets (no lerp residual).
    // During the tween, interpolate from fullscreen → target.
    const atEnd = p >= 0.995;
    const bonsaiRect = atEnd ? end.bonsai : lerpRect(start, end.bonsai, p);

    // Soft hero strip grows into the LOOK bar (same atmosphere family)
    const longStart = {
      left: 0,
      top: h * 0.42,
      width: Math.max(2, w * 0.02),
      height: h * 0.16,
    };
    const longRect = atEnd
      ? end.longPanel
      : lerpRect(longStart, end.longPanel, p);

    const radius = p > 0.05 ? "2px" : "0px";
    applyRect(cover, bonsaiRect, radius);
    applyRect(longPanel, longRect, radius);

    // Bake hero surface into the shrinking frame — never flat black
    cover.style.backgroundImage = HERO_SURFACE_IMAGE;
    cover.style.backgroundColor = HERO_SURFACE_BG;
    longPanel.style.backgroundImage = HERO_LONG_SURFACE_IMAGE;
    longPanel.style.backgroundColor = HERO_LONG_SURFACE_BG;
    longPanel.style.opacity = String(
      p < 0.05 ? 0 : Math.min(1, (p - 0.05) / 0.22)
    );

    // Parent fade during intro scroll — safe during entrance (children are GSAP-owned)
    labels.style.opacity = String(Math.max(0, 1 - p * 4.5));
    labels.style.transform = `translateY(${-p * 28}px)`;
    // Do not stomp RainbowArc while the entrance timeline owns it
    if (p > 0.001 || entranceDoneRef.current) {
      arc.style.opacity = String(Math.max(0, 1 - p * 1.2));
    }

    // Hero (p=0): innerScale 1. End state keeps nearly full scale so the
    // bonsai reads large inside the rectangle (coverBoost does the rest).
    trackMetricsRef.current = {
      width: bonsaiRect.width,
      height: bonsaiRect.height,
      ratioW: bonsaiRect.width / w,
      ratioH: bonsaiRect.height / h,
      innerScale: p < 0.001 ? 1 : 1 - p * 0.06,
    };
  }, []);

  useLayoutEffect(() => {
    if (!portalReady) return;
    applyProgress(progressObj.current.value);
  }, [applyProgress, portalReady]);

  // Re-apply current progress on resize so rects stay correct
  useEffect(() => {
    const onResize = () => applyProgress(progressObj.current.value);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [applyProgress]);

  // Core state machine — single owner of scroll lock + progress tween
  useEffect(() => {
    if (!lenisReady) return;
    const lenis = lenisRef.current;
    if (!lenis) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lock = () => {
      lenis.stop();
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    };
    const unlock = () => {
      lenis.start();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };

    const killTween = () => {
      tweenRef.current?.kill();
      tweenRef.current = null;
    };

    // Only lock once on first mount — never reset phase when lenis re-renders
    if (!scrollMachineInit.current) {
      scrollMachineInit.current = true;
      phaseRef.current = "hero";
      if (reducedMotion) {
        // Static hierarchy + free scroll — skip cinematic lock
        progressObj.current.value = 1;
        applyProgress(1);
        phaseRef.current = "look";
        unlock();
        setShowSkip(false);
      } else {
        lock();
      }
    }

    // Defensive net: whatever the source (anchor jump, extension, restore
    // scroll position, etc.), never let real scroll drift away from 0 while
    // the intro hasn't reached "look" — keeps overlay and scroll in sync.
    const onNativeScroll = () => {
      if (phaseRef.current !== "look" && window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener("scroll", onNativeScroll, { passive: true });

    const runForward = () => {
      if (phaseRef.current !== "hero") return;
      // Hold the composition until the hero entrance finishes
      if (!entranceDoneRef.current) return;
      phaseRef.current = "forward";
      killTween();

      if (reducedMotion) {
        progressObj.current.value = 1;
        applyProgress(1);
        phaseRef.current = "look";
        unlock();
        return;
      }

      tweenRef.current = gsap.to(progressObj.current, {
        value: 1,
        duration: TRANSITION_DURATION_IN,
        ease: "power2.inOut",
        onUpdate: () => applyProgress(progressObj.current.value),
        onComplete: () => {
          progressObj.current.value = 1;
          phaseRef.current = "look";
          setShowSkip(false);
          // Unlock first so scrollbar/layout settle, then snap to measured targets
          unlock();
          requestAnimationFrame(() => {
            applyProgress(1);
            requestAnimationFrame(() => applyProgress(1));
          });
        },
      });
    };

    const runReverse = () => {
      if (phaseRef.current !== "look") return;
      phaseRef.current = "reverse";
      lock();
      killTween();

      if (reducedMotion) {
        progressObj.current.value = 0;
        applyProgress(0);
        phaseRef.current = "hero";
        return;
      }

      tweenRef.current = gsap.to(progressObj.current, {
        value: 0,
        duration: TRANSITION_DURATION_OUT,
        ease: "power2.out",
        onUpdate: () => applyProgress(progressObj.current.value),
        onComplete: () => {
          progressObj.current.value = 0;
          applyProgress(0);
          phaseRef.current = "hero";
        },
      });
    };

    const AT_TOP = 4;

    const onWheel = (e: WheelEvent) => {
      const phase = phaseRef.current;

      // Never let extra input corrupt an in-flight transition
      if (phase === "forward" || phase === "reverse") {
        e.preventDefault();
        return;
      }

      if (phase === "hero") {
        if (e.deltaY > 4) {
          e.preventDefault();
          if (entranceDoneRef.current) runForward();
        }
        return;
      }

      // phase === "look" — only intercept when genuinely at the very top
      if (lenis.scroll > AT_TOP) return;
      if (e.deltaY < -4) {
        e.preventDefault();
        runReverse();
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const phase = phaseRef.current;
      if (phase === "forward" || phase === "reverse" || phase === "hero") {
        e.preventDefault();
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      const phase = phaseRef.current;
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 28) return;

      if (phase === "hero" && deltaY > 0) runForward();
      else if (phase === "look" && lenis.scroll <= AT_TOP && deltaY < 0)
        runReverse();
    };

    const skipToLook = () => {
      const phase = phaseRef.current;
      if (phase === "look") return;
      entranceDoneRef.current = true;
      killTween();
      progressObj.current.value = 1;
      applyProgress(1);
      phaseRef.current = "look";
      unlock();
      setShowSkip(false);
      requestAnimationFrame(() => applyProgress(1));
    };
    skipRef.current = skipToLook;

    const onKeyDown = (e: KeyboardEvent) => {
      const phase = phaseRef.current;
      if (
        (phase === "hero" || phase === "forward") &&
        (e.key === "Escape" || e.key === "Enter")
      ) {
        e.preventDefault();
        skipToLook();
        return;
      }
      if (phase === "hero" && (e.key === "ArrowDown" || e.key === "PageDown")) {
        e.preventDefault();
        runForward();
      } else if (
        phase === "look" &&
        lenis.scroll <= AT_TOP &&
        (e.key === "ArrowUp" || e.key === "PageUp")
      ) {
        e.preventDefault();
        runReverse();
      }
    };

    // Nav links jumping past the hero must not get stuck behind the lock —
    // play the intro first, then hand off to a normal smooth scroll.
    const onJumpRequest = (e: Event) => {
      const target = (e as CustomEvent<string>).detail;
      if (!target) return;

      if (target === "#home") {
        if (phaseRef.current === "look" && lenis.scroll <= AT_TOP) {
          runReverse();
        } else if (phaseRef.current === "look") {
          lenis.scrollTo(0, { duration: 1 });
        }
        return;
      }

      const scrollToTarget = () => {
        const el = document.querySelector(target);
        if (el) lenis.scrollTo(el as HTMLElement, { duration: 1.2 });
      };

      if (phaseRef.current === "look") {
        scrollToTarget();
        return;
      }
      if (phaseRef.current !== "hero") return;
      killTween();
      phaseRef.current = "forward";
      tweenRef.current = gsap.to(progressObj.current, {
        value: 1,
        duration: TRANSITION_DURATION_IN,
        ease: "power2.inOut",
        onUpdate: () => applyProgress(progressObj.current.value),
        onComplete: () => {
          progressObj.current.value = 1;
          phaseRef.current = "look";
          unlock();
          requestAnimationFrame(() => {
            applyProgress(1);
            requestAnimationFrame(scrollToTarget);
          });
        },
      });
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("sekaidev:jump", onJumpRequest);

    applyProgress(progressObj.current.value);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("sekaidev:jump", onJumpRequest);
      window.removeEventListener("scroll", onNativeScroll);
    };
  }, [applyProgress, lenisReady]);

  useEffect(() => {
    return () => {
      tweenRef.current?.kill();
      resetLookTypography();
    };
  }, []);

  // In "look" phase: pin the fixed overlay to the live LOOK targets while they
  // intersect the viewport; fade the 3D out once the user scrolls past LOOK.
  useEffect(() => {
    if (!lenis) return;

    const syncLookOverlay = () => {
      if (phaseRef.current !== "look") return;

      const target = document.getElementById("bonsai-target");
      const longTarget = document.getElementById("media-long");
      if (!target) return;

      const r = target.getBoundingClientRect();
      const longR = longTarget?.getBoundingClientRect();
      const pad = 120;
      const bonsaiVisible = r.bottom > -pad && r.top < window.innerHeight + pad;
      const longVisible = longR
        ? longR.bottom > -pad && longR.top < window.innerHeight + pad
        : false;
      const visible = bonsaiVisible || longVisible;

      if (visible) {
        applyProgress(1);
      }
      setOverlayVisible(visible);
    };

    lenis.on("scroll", syncLookOverlay);
    window.addEventListener("resize", syncLookOverlay);
    return () => {
      lenis.off("scroll", syncLookOverlay);
      window.removeEventListener("resize", syncLookOverlay);
    };
  }, [lenis, applyProgress]);

  // Portal to document.body so Lenis transforms never trap these "fixed"
  // layers — that was hiding the bonsai under LookSection after unlock.
  const overlayPortal =
    portalReady &&
    createPortal(
      <>
        <BonsaiCanvas visible={overlayVisible} zIndex={12} />
        <div
          id="intro-overlay-root"
          className="fixed inset-0 z-[4] pointer-events-none transition-opacity duration-300"
          style={{ opacity: overlayVisible ? 1 : 0 }}
        >
          <div
            ref={longPanelRef}
            id="intro-long-panel"
            className="fixed z-[6] opacity-0 will-change-[left,top,width,height,opacity]"
            aria-hidden="true"
          />
          <div
            ref={coverRef}
            id="intro-bonsai-frame"
            className="fixed z-[3] overflow-hidden will-change-[left,top,width,height]"
            style={{
              backgroundColor: HERO_SURFACE_BG,
              backgroundImage: HERO_SURFACE_IMAGE,
            }}
          >
            <View
              className="absolute inset-0 pointer-events-none"
              visible={overlayVisible}
            >
              <Suspense fallback={null}>
                <BonsaiScene
                  onLoaded={onBonsaiLoaded}
                  trackRef={trackMetricsRef}
                />
              </Suspense>
            </View>
          </div>
        </div>
      </>,
      document.body
    );

  return (
    <>
      {overlayPortal}

      <section
        ref={heroRef}
        id="home"
        className="relative min-h-[100svh] h-[100svh] md:h-screen w-full overflow-hidden bg-background"
      >
        <div
          ref={arcRef}
          className="absolute inset-0 z-0 pointer-events-none opacity-0"
        >
          <RainbowArc />
        </div>

        <div
          ref={labelsRef}
          id="hero-labels"
          className="absolute inset-0 z-30 pointer-events-none will-change-transform"
        >
          {/* Soft scrim so copy stays readable over blossoms on short phones */}
          <div
            className="absolute inset-x-0 top-0 h-[62%] md:hidden pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(214,214,214,0.92) 0%, rgba(214,214,214,0.72) 55%, rgba(214,214,214,0) 100%)",
            }}
            aria-hidden="true"
          />

          <div className="absolute left-5 right-5 sm:left-6 sm:right-6 md:left-12 md:right-12 top-[max(5.75rem,env(safe-area-inset-top,0px)+4.25rem)] md:top-[8.5rem] pointer-events-auto max-w-xl">
            <p
              data-hero-reveal
              className="text-[10px] md:text-xs tracking-[0.22em] uppercase text-foreground/60 opacity-0"
            >
              {STUDIO.eyebrow} {STUDIO.icp}
            </p>

            <p
              data-hero-reveal
              className="mt-3 md:mt-5 font-display text-[2.35rem] leading-[0.9] sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter md:leading-[0.88] text-foreground opacity-0"
              aria-hidden="true"
            >
              {STUDIO.brand}
            </p>

            <h1
              data-hero-reveal
              className="mt-3.5 md:mt-6 font-display text-xl sm:text-3xl md:text-4xl font-medium tracking-tight text-foreground max-w-[18ch] opacity-0"
            >
              {STUDIO.tagline}
            </h1>

            <p
              data-hero-reveal
              className="mt-3 md:mt-4 text-[13px] sm:text-sm md:text-base text-foreground/70 max-w-md leading-relaxed opacity-0"
            >
              {STUDIO.subline}
            </p>

            <div
              data-hero-reveal
              className="mt-5 md:mt-8 flex flex-col items-stretch sm:items-start gap-3 opacity-0 max-w-md"
            >
              <p className="text-[10px] tracking-[0.18em] uppercase text-foreground/50">
                Choose your path
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                {FUNNEL_PATHS.map((path) => (
                  <button
                    key={path.id}
                    type="button"
                    onClick={() => {
                      try {
                        sessionStorage.setItem("sekaidev:intent", path.intent);
                      } catch {
                        /* ignore */
                      }
                      window.dispatchEvent(
                        new CustomEvent("sekaidev:jump", { detail: path.href })
                      );
                    }}
                    className="flex-1 text-left min-h-[44px] px-5 py-3.5 border border-foreground/20 bg-background/40 hover:border-accent hover:bg-accent hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <span className="block text-xs tracking-widest font-medium uppercase">
                      {path.label}
                    </span>
                    <span className="mt-1 block text-[11px] leading-snug opacity-70 normal-case tracking-normal font-sans">
                      {path.hint}
                    </span>
                  </button>
                ))}
              </div>
              <a
                href={STUDIO.heroCtaPrimary.href}
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(
                    new CustomEvent("sekaidev:jump", {
                      detail: STUDIO.heroCtaPrimary.href,
                    })
                  );
                }}
                className="inline-flex min-h-[44px] items-center text-xs tracking-widest uppercase text-foreground/70 hover:text-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {STUDIO.heroCtaPrimary.label} →
              </a>
            </div>
          </div>

          <div
            data-hero-reveal
            className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] md:bottom-8 left-5 right-5 sm:left-6 sm:right-6 md:left-12 md:right-12 flex justify-between items-end gap-4 opacity-0"
          >
            <p className="text-[10px] md:text-xs tracking-widest uppercase text-foreground/55">
              Scroll to explore
            </p>
            {showSkip && (
              <button
                type="button"
                onClick={() => skipRef.current?.()}
                className="pointer-events-auto text-[10px] md:text-xs tracking-widest uppercase text-foreground/70 hover:text-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Skip intro
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(HeroSection);
