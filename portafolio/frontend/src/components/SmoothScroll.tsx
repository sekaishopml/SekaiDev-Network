"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LenisBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Single RAF loop shared with GSAP — avoids double rAF / frame drift
    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    const onScroll = () => ScrollTrigger.update();

    gsap.ticker.add(raf);
    lenis.on("scroll", onScroll);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  useEffect(() => {
    if (!lenis) return;

    const onJump = (event: Event) => {
      const selector = (event as CustomEvent<string>).detail;
      if (!selector) return;

      // Support "#contact?intent=sprint" style deep-links from Pricing
      const [hash, query] = selector.split("?");
      if (query) {
        const intent = new URLSearchParams(query).get("intent");
        if (intent) {
          try {
            sessionStorage.setItem("sekaidev:intent", intent);
          } catch {
            /* ignore */
          }
        }
      }

      if (hash === "#home") {
        lenis.scrollTo(0, { duration: 0.85 });
        return;
      }

      const target = document.querySelector(hash);
      if (target) lenis.scrollTo(target as HTMLElement, { duration: 0.85 });
    };

    window.addEventListener("sekaidev:jump", onJump);
    return () => window.removeEventListener("sekaidev:jump", onJump);
  }, [lenis]);

  return null;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        syncTouch: true,
      }}
    >
      <LenisBridge />
      {children}
    </ReactLenis>
  );
}
