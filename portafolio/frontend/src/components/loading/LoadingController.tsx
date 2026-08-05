"use client";

import { useEffect } from "react";
import { LOADER_CURTAIN } from "@/lib/motion/heroEntrance";

interface LoadingControllerProps {
  loaded: boolean;
  progress: number;
}

/**
 * Curtain sequence:
 *  Act I  — fade solid brand / subtitle / spinner
 *  Act II — knockout SEKAI/DEV hold (bonsai shows through letters)
 *  Act III — curtain rises; dismiss mid-rise so bonsai settle overlaps
 */
export default function LoadingController({
  loaded,
  progress,
}: LoadingControllerProps) {
  useEffect(() => {
    const counter = document.getElementById("blossom-spinner-counter");
    const fill = document.getElementById("blossom-spinner-fill");

    if (counter) counter.textContent = `${progress}%`;
    if (fill) fill.style.clipPath = `inset(0 ${100 - progress}% 0 0)`;
  }, [progress]);

  useEffect(() => {
    const loader = document.getElementById("sekaidev-loader");
    if (!loader || !loaded) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const slow =
      connection?.saveData ||
      connection?.effectiveType === "2g" ||
      connection?.effectiveType === "slow-2g";

    const ui = [
      document.getElementById("sekaidev-loader-text"),
      document.getElementById("sekaidev-loader-text-desktop"),
      document.getElementById("sekaidev-loader-subtitle"),
      document.getElementById("sekaidev-loader-spinner"),
    ];

    let dismissTimer: ReturnType<typeof setTimeout> | undefined;
    let removeTimer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const dismiss = () => {
      if (cancelled) return;
      document.documentElement.dataset.loader = "done";
      window.dispatchEvent(new CustomEvent("sekaidev:loader-dismissed"));
    };

    if (reduced || slow) {
      ui.forEach((el) => el?.classList.add("opacity-0"));
      loader.classList.add("opacity-0", "pointer-events-none");
      dismissTimer = setTimeout(() => {
        dismiss();
        loader.remove();
      }, 280);
      return () => {
        cancelled = true;
        clearTimeout(dismissTimer);
      };
    }

    // Act I — solid brand fades; knockout letters remain as the aperture
    ui.forEach((el) => {
      if (!el) return;
      el.style.transition = `opacity ${LOADER_CURTAIN.uiFade}ms cubic-bezier(0.33, 0, 0.2, 1)`;
      el.classList.add("opacity-0");
    });

    const riseStart =
      LOADER_CURTAIN.uiFade + LOADER_CURTAIN.knockoutHold;

    // Act II hold → Act III rise
    const riseTimer = setTimeout(() => {
      if (cancelled) return;

      const fadeMs = Math.round(LOADER_CURTAIN.rise * 0.5);
      loader.style.transition = [
        `transform ${LOADER_CURTAIN.rise}ms cubic-bezier(0.33, 1, 0.36, 1)`,
        `opacity ${fadeMs}ms cubic-bezier(0.4, 0, 0.2, 1) ${LOADER_CURTAIN.riseFadeDelay}ms`,
      ].join(", ");
      loader.style.transform = "translate3d(0, -105%, 0)";
      loader.style.opacity = "0";
      loader.classList.add("pointer-events-none");

      // Handoff early: bonsai settle / hero entrance start while curtain lifts
      dismissTimer = setTimeout(() => {
        dismiss();
      }, Math.round(LOADER_CURTAIN.rise * LOADER_CURTAIN.dismissAtRise));

      removeTimer = setTimeout(
        () => loader.remove(),
        LOADER_CURTAIN.rise + LOADER_CURTAIN.removeAfter
      );
    }, riseStart);

    return () => {
      cancelled = true;
      clearTimeout(riseTimer);
      clearTimeout(dismissTimer);
      clearTimeout(removeTimer);
    };
  }, [loaded]);

  return null;
}
