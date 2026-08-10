"use client";

import { useEffect, useRef } from "react";
import { getPerfProfile } from "@/lib/perf";

export default function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const perf = getPerfProfile();
    if (perf.tier === "low") {
      canvas.style.display = "none";
      return;
    }

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const perf = getPerfProfile();
    const patternSize = perf.tier === "low" ? 128 : 200;
    const patternAlpha = perf.tier === "low" ? 12 : 14;

    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;
    const patternCtx = patternCanvas.getContext("2d");
    if (!patternCtx) return;

    const imageData = patternCtx.createImageData(patternSize, patternSize);
    const data = imageData.data;
    const pixelCount = patternSize * patternSize * 4;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, perf.maxDpr);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      for (let i = 0; i < pixelCount; i += 4) {
        const v = 255 * Math.random();
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = patternAlpha;
      }
      patternCtx.putImageData(imageData, 0, 0);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = ctx.createPattern(patternCanvas, "repeat") as CanvasPattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    draw();
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(draw, 140);
    };
    window.addEventListener("resize", onResize);
    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="noise-overlay z-40" aria-hidden="true" />;
}
