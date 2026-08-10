"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { LOADER_CURTAIN } from "@/lib/motion/heroEntrance";
import BlossomSpinner from "./BlossomSpinner";

/** Locale home only — `/es`, `/en`. Subpages self-dismiss the curtain. */
function isLocaleHome(pathname: string | null) {
  if (!pathname) return false;
  return /^\/(en|es)\/?$/.test(pathname);
}

function runCurtainDismiss(loader: HTMLElement) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

  const dismiss = () => {
    document.documentElement.dataset.loader = "done";
    window.dispatchEvent(new CustomEvent("sekaidev:loader-dismissed"));
  };

  if (reduced || slow) {
    ui.forEach((el) => el?.classList.add("opacity-0"));
    loader.classList.add("opacity-0", "pointer-events-none");
    const t = window.setTimeout(() => {
      dismiss();
      loader.remove();
    }, 280);
    return () => clearTimeout(t);
  }

  ui.forEach((el) => {
    if (!el) return;
    el.style.transition = `opacity ${LOADER_CURTAIN.uiFade}ms cubic-bezier(0.33, 0, 0.2, 1)`;
    el.classList.add("opacity-0");
  });

  const riseStart = LOADER_CURTAIN.uiFade + Math.min(LOADER_CURTAIN.knockoutHold, 420);
  let dismissTimer: ReturnType<typeof setTimeout> | undefined;
  let removeTimer: ReturnType<typeof setTimeout> | undefined;

  const riseTimer = window.setTimeout(() => {
    const fadeMs = Math.round(LOADER_CURTAIN.rise * 0.5);
    loader.style.transition = [
      `transform ${LOADER_CURTAIN.rise}ms cubic-bezier(0.33, 1, 0.36, 1)`,
      `opacity ${fadeMs}ms cubic-bezier(0.4, 0, 0.2, 1) ${LOADER_CURTAIN.riseFadeDelay}ms`,
    ].join(", ");
    loader.style.transform = "translate3d(0, -105%, 0)";
    loader.style.opacity = "0";
    loader.classList.add("pointer-events-none");

    dismissTimer = setTimeout(() => {
      dismiss();
    }, Math.round(LOADER_CURTAIN.rise * LOADER_CURTAIN.dismissAtRise));

    removeTimer = setTimeout(
      () => loader.remove(),
      LOADER_CURTAIN.rise + LOADER_CURTAIN.removeAfter
    );
  }, riseStart);

  return () => {
    clearTimeout(riseTimer);
    clearTimeout(dismissTimer);
    clearTimeout(removeTimer);
  };
}

/**
 * Loader curtain — SEKAIDEV as a single word (knockout aperture).
 * Home waits for LoadingController (bonsai). Subpages self-dismiss.
 */
export default function LoadingScreen() {
  const pathname = usePathname();

  useEffect(() => {
    if (document.documentElement.dataset.loader === "done") {
      document.getElementById("sekaidev-loader")?.remove();
      return;
    }

    if (isLocaleHome(pathname)) return;

    const loader = document.getElementById("sekaidev-loader");
    if (!loader) return;

    /* Brief progress so the splash still feels intentional on /precios. */
    const counter = document.getElementById("blossom-spinner-counter");
    const fill = document.getElementById("blossom-spinner-fill");
    const start = Date.now();
    const minMs = 650;

    const tick = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.floor((elapsed / minMs) * 100));
      if (counter) counter.textContent = `${pct}%`;
      if (fill) fill.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    }, 50);

    let stopCurtain: (() => void) | undefined;
    const arm = window.setTimeout(() => {
      clearInterval(tick);
      if (counter) counter.textContent = "100%";
      if (fill) fill.style.clipPath = "inset(0 0% 0 0)";
      stopCurtain = runCurtainDismiss(loader);
    }, minMs);

    return () => {
      clearInterval(tick);
      clearTimeout(arm);
      stopCurtain?.();
    };
  }, [pathname]);

  return (
    <div
      id="sekaidev-loader"
      className="fixed inset-0 z-[100] overflow-hidden will-change-transform"
      style={{
        transform: "translate3d(0, 0, 0) scaleY(1)",
        transformOrigin: "50% 0%",
        opacity: 1,
        backfaceVisibility: "hidden",
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        aria-hidden="true"
      >
        <defs>
          <mask
            id="sekaidev-loader-mask"
            x="0"
            y="0"
            width="100"
            height="100"
            maskUnits="userSpaceOnUse"
            mask-type="luminance"
          >
            <rect width="100" height="100" fill="white" />

            <text
              x="50"
              y="48"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
              fontSize="10"
              fontWeight="700"
              className="md:hidden"
              style={{ fontFamily: "var(--font-oswald), sans-serif" }}
            >
              SEKAIDEV
            </text>

            <text
              x="50"
              y="48"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
              fontSize="15"
              fontWeight="700"
              className="hidden md:inline"
              style={{ fontFamily: "var(--font-oswald), sans-serif" }}
            >
              SEKAIDEV
            </text>
          </mask>
        </defs>
        <rect
          width="100"
          height="100"
          fill="white"
          mask="url(#sekaidev-loader-mask)"
        />

        <text
          id="sekaidev-loader-text"
          x="50"
          y="48"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="black"
          fontSize="10"
          fontWeight="700"
          className="md:hidden transition-opacity"
          style={{ fontFamily: "var(--font-oswald), sans-serif" }}
        >
          SEKAIDEV
        </text>
        <text
          id="sekaidev-loader-text-desktop"
          x="50"
          y="48"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="black"
          fontSize="15"
          fontWeight="700"
          className="hidden md:inline transition-opacity"
          style={{ fontFamily: "var(--font-oswald), sans-serif" }}
        >
          SEKAIDEV
        </text>
      </svg>

      <span
        id="sekaidev-loader-subtitle"
        className="absolute top-[60%] left-0 right-0 z-10 text-center font-sans text-[10px] tracking-[0.3em] uppercase text-black/60 transition-opacity"
      >
        Loading experience
      </span>

      <div
        id="sekaidev-loader-spinner"
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20 flex flex-col items-center gap-3 transition-opacity"
      >
        <BlossomSpinner />
      </div>
    </div>
  );
}
