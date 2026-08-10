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
  ensureLookTargetRefreshHooks,
  getCachedLookTargets,
  getFallbackLayout,
  getStartRect,
  lerpRect,
  refreshLookTargetCache,
  introSegment,
  resetLookTypography,
  setIntroPhaseFromProgress,
} from "@/lib/heroTransforms";
import { HERO_ENTRANCE } from "@/lib/motion/heroEntrance";
import {
  HERO_LONG_SURFACE_BG,
  HERO_LONG_SURFACE_IMAGE,
  HERO_SURFACE_BG,
  HERO_SURFACE_IMAGE,
} from "@/lib/heroAtmosphere";
import { useT } from "@/components/LocaleProvider";
import { jumpTo } from "@/lib/navigation";
import { useHeroIntro } from "@/hooks/useHeroIntro";

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
function HeroSection({ loaded, onBonsaiLoaded }: HeroSectionProps) {
  const lenis = useLenis();
  const t = useT();
  const heroRef = useRef<HTMLElement>(null);
  const longPanelRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<HTMLDivElement>(null);

  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;
  const [lenisReady, setLenisReady] = useState(!!lenis);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [portalReady, setPortalReady] = useState(false);
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
    const introProgress = String(Math.round(p * 1000));
    if (document.documentElement.dataset.introProgress !== introProgress) {
      document.documentElement.dataset.introProgress = introProgress;
    }

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
    const measured = getCachedLookTargets();
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
    // Fade in with intro, then hand off to #media-long (avoids ghost double bar)
    let longOp = 0;
    if (p >= 0.05 && p < 0.92) {
      longOp = Math.min(1, (p - 0.05) / 0.22);
    } else if (p >= 0.92) {
      longOp = Math.max(0, 1 - (p - 0.92) / 0.08);
    }
    longPanel.style.opacity = String(longOp);
    longPanel.style.visibility = longOp < 0.02 ? "hidden" : "visible";

    // Parent fade during intro scroll — safe during entrance (children are GSAP-owned)
    labels.style.opacity = String(Math.max(0, 1 - p * 4.5));
    labels.style.transform = `translateY(${-p * 28}px)`;
    // Fully inert when hidden — no ghost taps over LOOK / page
    const labelsGone = p > 0.22;
    labels.style.visibility = labelsGone ? "hidden" : "visible";
    labels.style.pointerEvents = labelsGone ? "none" : "";
    if (labelsGone) labels.setAttribute("inert", "");
    else labels.removeAttribute("inert");
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

  const { phaseRef, progressObj, showSkip, skipRef } = useHeroIntro({
    lenisReady,
    applyProgress,
    entranceDoneRef,
  });

  useLayoutEffect(() => {
    if (!portalReady) return;
    applyProgress(progressObj.current.value);
  }, [applyProgress, portalReady, progressObj]);

  // Re-apply current progress on resize so rects stay correct
  useEffect(() => {
    ensureLookTargetRefreshHooks();
    const onResize = () => {
      refreshLookTargetCache();
      applyProgress(progressObj.current.value);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [applyProgress, progressObj]);

  useEffect(() => {
    return () => {
      resetLookTypography();
    };
  }, []);

  // Pin overlay to LOOK targets while on-screen; premium exit into Offer on desktop.
  useEffect(() => {
    type OverlayMode = "on" | "exiting" | "off";
    let mode: OverlayMode = "on";
    let syncing = false;
    let exitTween: gsap.core.Timeline | null = null;
    let trackRaf = 0;

    const root = document.documentElement;
    const overlayEl = () => document.getElementById("intro-overlay-root");
    const canvasEl = () => document.getElementById("bonsai-canvas");

    const preferPremiumExit = () =>
      window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)")
        .matches;

    const killExit = () => {
      exitTween?.kill();
      exitTween = null;
      const overlay = overlayEl();
      const canvas = canvasEl();
      if (overlay) gsap.set(overlay, { clearProps: "opacity,transform,filter" });
      if (canvas) gsap.set(canvas, { clearProps: "opacity,transform,filter" });
    };

    const setMode = (next: OverlayMode) => {
      if (mode === next) return;
      mode = next;
      root.dataset.overlay = next;
      setOverlayVisible(next === "on" || next === "exiting");
    };

    const finishOff = () => {
      killExit();
      setMode("off");
    };

    const showOverlay = () => {
      killExit();
      const overlay = overlayEl();
      const canvas = canvasEl();
      if (overlay) gsap.set(overlay, { opacity: 1, y: 0, filter: "none" });
      if (canvas) gsap.set(canvas, { opacity: 1, y: 0, filter: "none" });
      setMode("on");
    };

    const hideOverlay = () => {
      if (mode === "off" || mode === "exiting") return;

      if (!preferPremiumExit()) {
        finishOff();
        return;
      }

      const overlay = overlayEl();
      const canvas = canvasEl();
      if (!overlay && !canvas) {
        finishOff();
        return;
      }

      killExit();
      setMode("exiting");
      exitTween = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: finishOff,
      });

      if (overlay) {
        exitTween.to(
          overlay,
          {
            opacity: 0,
            y: -28,
            filter: "blur(6px)",
            duration: 0.72,
          },
          0
        );
      }
      if (canvas) {
        exitTween.to(
          canvas,
          {
            opacity: 0,
            y: -18,
            filter: "blur(4px)",
            duration: 0.65,
          },
          0.04
        );
      }
    };

    const bonsaiEl = document.getElementById("bonsai-target");
    const longEl = document.getElementById("media-long");

    let bonsaiVisible = true;
    let longVisible = false;

    const trackTargets = () => {
      if (phaseRef.current !== "look" || mode !== "on") return;
      if (!(bonsaiVisible || longVisible)) return;
      refreshLookTargetCache();
      applyProgress(1);
    };

    const scheduleTrack = () => {
      if (trackRaf) return;
      trackRaf = requestAnimationFrame(() => {
        trackRaf = 0;
        trackTargets();
      });
    };

    const syncLookOverlay = (fromVisibility: boolean) => {
      if (syncing) return;
      syncing = true;
      try {
        const phase = phaseRef.current;
        if (phase !== "look") {
          showOverlay();
          return;
        }

        if (!bonsaiEl) {
          hideOverlay();
          return;
        }

        const visible = bonsaiVisible || longVisible;
        if (visible) {
          if (fromVisibility || mode !== "on") {
            showOverlay();
            refreshLookTargetCache();
            applyProgress(1);
          }
          return;
        }

        hideOverlay();
      } finally {
        syncing = false;
      }
    };

    root.dataset.overlay = "on";
    setOverlayVisible(true);

    const visibilityObserver =
      bonsaiEl &&
      new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.target === bonsaiEl) bonsaiVisible = entry.isIntersecting;
            if (longEl && entry.target === longEl) longVisible = entry.isIntersecting;
          }
          syncLookOverlay(true);
        },
        // Start exit a touch earlier so the fade finishes as Offer arrives
        { root: null, rootMargin: "0px 0px -12% 0px", threshold: [0, 0.08, 0.2] }
      );

    if (visibilityObserver && bonsaiEl) {
      visibilityObserver.observe(bonsaiEl);
      if (longEl) visibilityObserver.observe(longEl);
    }

    const phaseObserver = new MutationObserver(() => syncLookOverlay(false));
    phaseObserver.observe(root, {
      attributes: true,
      attributeFilter: ["data-intro"],
    });

    // Keep fixed overlay glued to LOOK targets while scrolling (cache alone freezes it).
    window.addEventListener("scroll", scheduleTrack, { passive: true });

    syncLookOverlay(true);

    return () => {
      visibilityObserver?.disconnect();
      phaseObserver.disconnect();
      window.removeEventListener("scroll", scheduleTrack);
      if (trackRaf) cancelAnimationFrame(trackRaf);
      killExit();
      delete root.dataset.overlay;
    };
  }, [applyProgress, phaseRef]);

  // Portal bonsai + hero copy to document.body so Lenis transforms never
  // trap "fixed" layers — labels used to stay under the fullscreen canvas.
  const overlayPortal =
    portalReady &&
    createPortal(
      <>
        <BonsaiCanvas visible={overlayVisible} zIndex={12} />
        <div
          id="intro-overlay-root"
          className="fixed inset-0 z-[4] pointer-events-none will-change-[opacity,transform]"
          aria-hidden={!overlayVisible}
          style={{
            opacity: overlayVisible ? 1 : 0,
            visibility: overlayVisible ? "visible" : "hidden",
          }}
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

        <div
          ref={labelsRef}
          id="hero-labels"
          className="fixed inset-0 z-[20] pointer-events-none will-change-transform"
        >
          {/* Soft left veil — desktop only; mobile copy sits on opaque panel */}
          <div
            className="absolute inset-y-0 left-0 hidden md:block w-[52%] max-w-xl pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, rgba(214,214,214,0.88) 0%, rgba(214,214,214,0.55) 55%, rgba(214,214,214,0) 100%)",
            }}
            aria-hidden="true"
          />
          {/*
            Left copy column reserves bottom space so the scroll cue
            never paints over the path cards on desktop.
          */}
          <div className="absolute left-5 right-5 sm:left-6 sm:right-6 md:left-12 md:right-auto top-[max(5.5rem,env(safe-area-inset-top,0px)+4rem)] md:top-[7.5rem] bottom-[max(4.5rem,env(safe-area-inset-bottom)+3.25rem)] md:bottom-24 pointer-events-auto md:w-[min(38rem,46vw)]">
            <div className="h-full md:h-auto md:max-h-full flex flex-col justify-start md:justify-center md:bg-transparent md:p-0 md:backdrop-blur-none rounded-none bg-background/95 px-4 py-4 sm:px-5 sm:py-5 shadow-[0_0_0_1px_rgba(0,0,0,0.04)] md:shadow-none overflow-y-auto md:overflow-visible overscroll-contain">
              <p
                data-hero-reveal
                className="text-[10px] md:text-xs tracking-[0.22em] uppercase text-foreground/60 opacity-0"
              >
                {t.STUDIO.eyebrow} {t.STUDIO.icp}
              </p>

              <p
                data-hero-reveal
                className="mt-2.5 md:mt-4 font-display text-[2.2rem] leading-[0.9] sm:text-5xl md:text-6xl lg:text-[4.75rem] font-bold tracking-tighter md:leading-[0.9] text-foreground opacity-0"
                aria-hidden="true"
              >
                {t.STUDIO.brand}
              </p>

              <h1
                data-hero-reveal
                className="mt-3 md:mt-4 font-display text-xl sm:text-3xl md:text-[2rem] lg:text-[2.35rem] font-medium tracking-tight text-foreground max-w-[20ch] opacity-0"
              >
                {t.STUDIO.tagline}
              </h1>

              <p
                data-hero-reveal
                className="mt-2.5 md:mt-3 text-[13px] sm:text-sm md:text-[0.95rem] text-foreground/70 max-w-md leading-relaxed opacity-0"
              >
                {t.STUDIO.subline}
              </p>

              <div
                data-hero-reveal
                className="mt-4 md:mt-6 flex flex-col items-stretch gap-2.5 md:gap-3 opacity-0 w-full"
              >
                <p className="text-[10px] tracking-[0.18em] uppercase text-foreground/50">
                  {t.UI.choosePath}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3 w-full">
                  {t.FUNNEL_PATHS.map((path) => (
                    <button
                      key={path.id}
                      type="button"
                      onClick={() => jumpTo(path.href, path.intent)}
                      className="text-left min-h-[44px] h-full px-4 py-3 md:px-4 md:py-3.5 border border-foreground/20 bg-background hover:border-accent hover:bg-accent hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <span className="block text-[11px] md:text-xs tracking-widest font-medium uppercase leading-snug">
                        {path.label}
                      </span>
                      <span className="mt-1.5 block text-[11px] leading-snug opacity-70 normal-case tracking-normal font-sans">
                        {path.hint}
                      </span>
                    </button>
                  ))}
                </div>
                <a
                  href={t.STUDIO.heroCtaPrimary.href}
                  onClick={(e) => {
                    e.preventDefault();
                    jumpTo(t.STUDIO.heroCtaPrimary.href);
                  }}
                  className="hidden md:inline-flex min-h-[44px] w-auto items-center justify-center px-5 py-3 bg-accent text-white text-xs tracking-widest uppercase font-medium hover:bg-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {t.STUDIO.heroCtaPrimary.label} →
                </a>
              </div>
            </div>
          </div>

          {/* Desktop: cue sits under the bonsai (right). Mobile: below copy. */}
          <div
            data-hero-reveal
            className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] md:bottom-8 left-5 right-5 sm:left-6 sm:right-6 md:left-auto md:right-12 flex justify-between md:justify-end items-end gap-4 opacity-0 pointer-events-none"
          >
            <p className="md:hidden pointer-events-none rounded-sm bg-background/90 px-2 py-1 text-[10px] tracking-widest uppercase text-foreground/70">
              {t.UI.scrollExplore}
            </p>
            <p className="hidden md:block pointer-events-none text-xs tracking-widest uppercase text-foreground/50 text-right">
              {t.UI.scrollExplore}
            </p>
            {showSkip && (
              <button
                type="button"
                onClick={() => skipRef.current?.()}
                className="pointer-events-auto inline-flex min-h-[44px] min-w-[44px] items-center justify-end rounded-sm bg-background/90 px-2 md:bg-transparent text-[10px] md:text-xs tracking-widest uppercase text-foreground/70 hover:text-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {t.UI.skipIntro}
              </button>
            )}
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
        aria-label="SekaiDev introduction"
      >
        <div
          ref={arcRef}
          className="absolute inset-0 z-0 pointer-events-none opacity-0"
        >
          <RainbowArc />
        </div>
      </section>
    </>
  );
}

export default memo(HeroSection);
