"use client";

import { useEffect, useRef } from "react";
import { getPerfProfile } from "@/lib/perf";

/**
 * CRT-style TV grain — animated, hero-only.
 * Pauses on reduced motion, hidden tab, or when intro leaves "hero".
 * Frame rate / DPR follow runtime perf tier (mobile / old PCs).
 */
export default function HeroTvGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const perf = getPerfProfile();
    const patternSize = perf.grainPatternSize;
    const patternAlpha = 22;
    const frameSkip = perf.grainFrameSkip;

    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;
    const patternCtx = patternCanvas.getContext("2d");
    if (!patternCtx) return;

    const imageData = patternCtx.createImageData(patternSize, patternSize);
    const data = imageData.data;
    const pixelCount = patternSize * patternSize * 4;

    let raf = 0;
    let frame = 0;
    let running = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, perf.maxDpr);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
    };

    const paintStatic = () => {
      for (let i = 0; i < pixelCount; i += 4) {
        const v = (Math.random() * 255) | 0;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = patternAlpha;
      }
      patternCtx.putImageData(imageData, 0, 0);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pattern = ctx.createPattern(patternCanvas, "repeat");
      if (!pattern) return;
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const tick = () => {
      if (!running) return;
      frame += 1;
      if (frame % frameSkip === 0) paintStatic();
      raf = requestAnimationFrame(tick);
    };

    const shouldRun = () =>
      !reduced.matches &&
      !document.hidden &&
      document.documentElement.dataset.intro === "hero";

    const sync = () => {
      const on = shouldRun();
      canvas.dataset.active = on ? "true" : "false";
      if (on && !running) {
        running = true;
        resize();
        paintStatic();
        raf = requestAnimationFrame(tick);
      } else if (!on && running) {
        running = false;
        cancelAnimationFrame(raf);
        if (reduced.matches) {
          resize();
          paintStatic();
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    };

    resize();
    sync();

    const phaseObserver = new MutationObserver(sync);
    phaseObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-intro"],
    });

    const onVisibility = () => sync();
    const onReduce = () => sync();
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        if (running || reduced.matches) paintStatic();
      }, 120);
    };

    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onReduce);
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      if (resizeTimer) clearTimeout(resizeTimer);
      phaseObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onReduce);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="hero-tv-grain"
      className="hero-tv-grain"
      aria-hidden="true"
    />
  );
}
