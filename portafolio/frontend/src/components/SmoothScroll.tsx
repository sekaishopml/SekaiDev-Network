"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useMemo, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { introOwnsPageScroll } from "@/lib/heroTransforms";
import { parseJumpHref, setIntent } from "@/lib/navigation";
import {
  clearLocationHash,
  isPageReload,
  snapWindowToTop,
} from "@/lib/reloadHero";
import { getPerfProfile } from "@/lib/perf";
import { scheduleScrollTriggerRefresh } from "@/lib/scrollTriggerBatch";

gsap.registerPlugin(ScrollTrigger);

function subscribeCoarsePointer(onChange: () => void) {
  const mq = window.matchMedia("(pointer: coarse)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function useCoarsePointer() {
  return useSyncExternalStore(
    subscribeCoarsePointer,
    () => window.matchMedia("(pointer: coarse)").matches,
    () => false
  );
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

function LenisBridge({ jumpDuration }: { jumpDuration: number }) {
  const lenis = useLenis();

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      history.scrollRestoration = "manual";
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!lenis) return;

    // Single RAF loop shared with GSAP — avoids double rAF / frame drift
    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    // No ScrollTrigger.scrollerProxy() needed: this Lenis instance is
    // mounted with default `wrapper: window` / `content: document.documentElement`
    // (no custom wrapper/content elements are passed in `options`), which
    // means Lenis drives the *real* `window.scrollTo`/scrollTop under the
    // hood rather than faking scroll via CSS transforms on an inner
    // container. ScrollTrigger's default scroller (`window`) therefore
    // already reads the correct, real scroll position on every frame —
    // scrollerProxy is only required when the scroller's visible position
    // and its actual DOM scroll position diverge (e.g. a transform-based
    // virtual scroller). All we need to bridge is *timing*: keep GSAP's
    // ticker driving Lenis's raf, and tell ScrollTrigger to re-read the
    // (real) scroll position on every Lenis "scroll" event so pinned/scrubbed
    // triggers stay perfectly in sync with the smoothed motion.
    const onScroll = () => ScrollTrigger.update();

    gsap.ticker.add(raf);
    lenis.on("scroll", onScroll);
    /* Coarse / low-end: allow GSAP to drop catch-up under load (less jank). */
    const lite =
      getPerfProfile().tier !== "high" ||
      window.matchMedia("(pointer: coarse)").matches;
    gsap.ticker.lagSmoothing(lite ? 500 : 0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  useEffect(() => {
    if (!lenis || !isPageReload()) return;

    clearLocationHash();
    const snap = () => {
      snapWindowToTop();
      lenis.scrollTo(0, { immediate: true });
      ScrollTrigger.update();
    };

    snap();
    const raf = requestAnimationFrame(snap);
    const t1 = window.setTimeout(snap, 50);
    const t2 = window.setTimeout(() => {
      snap();
      scheduleScrollTriggerRefresh(80);
    }, 200);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [lenis]);

  useEffect(() => {
    if (!lenis) return;

    const onJump = (event: Event) => {
      // Hero owns scroll during intro — avoid double scrollTo with HeroSection
      if (introOwnsPageScroll()) return;

      const rawHref = (event as CustomEvent<string>).detail;
      if (!rawHref) return;
      const { hash, intent } = parseJumpHref(rawHref);
      setIntent(intent);
      if (!hash) return;

      if (hash === "#home") {
        lenis.scrollTo(0, { duration: jumpDuration });
        return;
      }

      const target = document.querySelector(hash);
      if (target) {
        lenis.scrollTo(target as HTMLElement, { duration: jumpDuration });
      }
    };

    window.addEventListener("sekaidev:jump", onJump);
    return () => window.removeEventListener("sekaidev:jump", onJump);
  }, [lenis, jumpDuration]);

  return null;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const coarse = useCoarsePointer();
  const reduced = useReducedMotion();

  const options = useMemo(() => {
    const lite = getPerfProfile().tier === "low";
    if (reduced || lite) {
      // Native-feeling scroll — less main-thread catch-up on weak CPUs
      return {
        autoRaf: false,
        lerp: 1,
        smoothWheel: false,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        syncTouch: false,
      };
    }
    return coarse
      ? {
          // Finger-locked while dragging (syncTouch → lerp 1 on move);
          // after lift, silkier coast — premium, not floaty.
          autoRaf: false,
          lerp: 0.12,
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1,
          syncTouch: true,
          syncTouchLerp: 0.09,
          touchInertiaExponent: 1.48,
        }
      : {
          autoRaf: false,
          lerp: 0.1,
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1,
          syncTouch: false,
        };
  }, [coarse, reduced]);

  const jumpDuration =
    reduced || getPerfProfile().tier === "low" ? 0 : coarse ? 0.75 : 0.85;

  return (
    <ReactLenis root options={options}>
      <LenisBridge jumpDuration={jumpDuration} />
      {children}
    </ReactLenis>
  );
}
