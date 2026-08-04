"use client";

import { useState, useEffect } from "react";
import { LOADER } from "@/lib/constants";

/**
 * Tracks whether the bonsai 3D model has loaded, enforces
 * a minimum / maximum splash-screen duration, and reports
 * a fake progress percentage (0-100) for the loader UI.
 */
export function useBonsaiLoad() {
  const [bonsaiLoaded, setBonsaiLoaded] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [maxTimeElapsed, setMaxTimeElapsed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [startTime] = useState(() => Date.now());

  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - startTime;

      if (elapsed >= LOADER.minDuration) {
        setMinTimeElapsed(true);
      }

      if (bonsaiLoaded && elapsed >= LOADER.minDuration) {
        setProgress(100);
        clearInterval(interval);
        return;
      }

      if (elapsed >= LOADER.maxDuration) {
        setMaxTimeElapsed(true);
        setProgress(100);
        clearInterval(interval);
        return;
      }

      const pct = Math.min(
        Math.floor((elapsed / LOADER.minDuration) * 95),
        95
      );
      setProgress(pct);
    };

    const interval = setInterval(tick, 60);
    return () => clearInterval(interval);
  }, [bonsaiLoaded, startTime]);

  const loaded = (bonsaiLoaded && minTimeElapsed) || maxTimeElapsed;

  return { loaded, setBonsaiLoaded, progress };
}
