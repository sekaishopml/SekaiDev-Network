"use client";

import { type MutableRefObject, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { parseJumpHref } from "@/lib/navigation";
import {
  refreshLookTargetCache,
  TRANSITION_DURATION_IN,
  TRANSITION_DURATION_OUT,
} from "@/lib/heroTransforms";
import { INTRO_SEEN_KEY } from "@/lib/reloadHero";

export type HeroIntroPhase = "hero" | "forward" | "look" | "reverse";

export function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_SEEN_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function hasSeenIntro(): boolean {
  try {
    return sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

interface UseHeroIntroOptions {
  lenisReady: boolean;
  applyProgress: (progress: number) => void;
  entranceDoneRef: MutableRefObject<boolean>;
}

export function useHeroIntro({
  lenisReady,
  applyProgress,
  entranceDoneRef,
}: UseHeroIntroOptions) {
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  const phaseRef = useRef<HeroIntroPhase>("hero");
  const progressObj = useRef({ value: 0 });
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const scrollMachineInit = useRef(false);
  const [showSkip, setShowSkip] = useState(true);
  const skipRef = useRef<(() => void) | null>(null);

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
      // Menu owns the stop while open — don't fight it
      if (document.documentElement.dataset.menuOpen === "true") {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        return;
      }
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
      const seenIntro = hasSeenIntro();

      if (reducedMotion || seenIntro) {
        // Returning visit / reduced motion — skip cinematic lock
        refreshLookTargetCache();
        progressObj.current.value = 1;
        applyProgress(1);
        phaseRef.current = "look";
        unlock();
        setShowSkip(false);
      } else {
        refreshLookTargetCache();
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
      refreshLookTargetCache();

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
          markIntroSeen();
          setShowSkip(false);
          refreshLookTargetCache();
          // Unlock so the user can scroll the page — and swipe back up to reverse
          unlock();
          try {
            lenis.resize();
          } catch {
            /* ignore */
          }
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
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    // Mobile needs a firmer swipe to reverse intro (avoids accidental pulls)
    const reverseTouchThreshold = isCoarse ? 48 : 28;

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
      // Mobile nav needs its own scroll while open
      if (document.documentElement.dataset.menuOpen === "true") return;
      const phase = phaseRef.current;
      // Only hijack while cinematic lock is active — never in "look"
      if (phase === "forward" || phase === "reverse" || phase === "hero") {
        e.preventDefault();
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      const phase = phaseRef.current;
      const deltaY = touchStartY - e.changedTouches[0].clientY;

      if (phase === "hero" && deltaY > 28) {
        runForward();
        return;
      }

      // At top of LOOK: swipe down (finger moves down → deltaY negative) → reverse to hero
      if (
        phase === "look" &&
        lenis.scroll <= AT_TOP &&
        deltaY < -reverseTouchThreshold
      ) {
        runReverse();
      }
    };

    const skipToLook = () => {
      const phase = phaseRef.current;
      if (phase === "look") return;
      entranceDoneRef.current = true;
      killTween();
      progressObj.current.value = 1;
      refreshLookTargetCache();
      applyProgress(1);
      phaseRef.current = "look";
      markIntroSeen();
      unlock();
      setShowSkip(false);
      requestAnimationFrame(() => applyProgress(1));
    };
    skipRef.current = skipToLook;

    const onKeyDown = (e: KeyboardEvent) => {
      // Mobile nav dialog owns Escape while open
      if (document.documentElement.dataset.menuOpen === "true") return;

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
      const raw = (e as CustomEvent<string>).detail;
      if (!raw) return;
      const { hash: target } = parseJumpHref(raw);
      if (!target) return;

      if (target === "#home") {
        if (phaseRef.current === "look" && lenis.scroll <= AT_TOP) {
          runReverse();
        } else if (phaseRef.current === "look") {
          lenis.scrollTo(0, { duration: isCoarse ? 0.7 : 1 });
        }
        return;
      }

      const scrollToTarget = () => {
        const el = document.querySelector(target);
        if (el) {
          lenis.scrollTo(el as HTMLElement, {
            duration: isCoarse ? 0.75 : 1.1,
          });
        }
      };

      if (phaseRef.current === "look") {
        scrollToTarget();
        return;
      }
      if (phaseRef.current !== "hero") return;
      killTween();
      phaseRef.current = "forward";
      refreshLookTargetCache();
      tweenRef.current = gsap.to(progressObj.current, {
        value: 1,
        duration: TRANSITION_DURATION_IN,
        ease: "power2.inOut",
        onUpdate: () => applyProgress(progressObj.current.value),
        onComplete: () => {
          progressObj.current.value = 1;
          phaseRef.current = "look";
          markIntroSeen();
          refreshLookTargetCache();
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
    // Non-passive only while intro can lock — removed in look via phase check,
    // but still registered for the cinematic phases.
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
      killTween();
      if (phaseRef.current !== "look") {
        // Avoid leaving Lenis stopped after remount / HMR
        if (document.documentElement.dataset.menuOpen !== "true") {
          lenis.start();
        }
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }
    };
  }, [applyProgress, lenisReady, entranceDoneRef]);

  return {
    phaseRef,
    progressObj,
    tweenRef,
    showSkip,
    skipRef,
  };
}
