"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import {
  CTAS,
  NAV_LINKS,
  NAV_TRUST,
  SOCIALS,
  STUDIO,
} from "@/content/studio";
import { HERO_ENTRANCE } from "@/lib/motion/heroEntrance";

function setIntent(intent?: string) {
  if (!intent) return;
  try {
    sessionStorage.setItem("sekaidev:intent", intent);
  } catch {
    /* ignore */
  }
}

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  /** Stay quiet during loader + bonsai hold; enter with hero copy */
  const [presented, setPresented] = useState(false);
  const menuId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeMenu = () => setMenuOpen(false);

  const desktopLinks = NAV_LINKS.filter((l) => !l.mobileOnly);
  const mobileLinks = NAV_LINKS;

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const reveal = () => {
      const delay = reduced ? 0 : HERO_ENTRANCE.presentationHold * 1000;
      timer = setTimeout(() => setPresented(true), delay);
    };

    if (document.documentElement.dataset.loader === "done") {
      reveal();
    } else {
      window.addEventListener("sekaidev:loader-dismissed", reveal, {
        once: true,
      });
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("sekaidev:loader-dismissed", reveal);
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    intent?: string
  ) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setIntent(intent);
    closeMenu();
    window.dispatchEvent(new CustomEvent("sekaidev:jump", { detail: href }));
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (menuOpen) {
      if (!dialog.open) dialog.showModal();
      // Next frame so CSS transition can run
      requestAnimationFrame(() => setPanelVisible(true));
    } else {
      setPanelVisible(false);
      if (reduced) {
        if (dialog.open) dialog.close();
      } else {
        const t = window.setTimeout(() => {
          if (dialog.open) dialog.close();
        }, 280);
        return () => clearTimeout(t);
      }
    }

    const prev = document.body.style.overflow;
    if (menuOpen) document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-20 md:h-24 px-6 md:px-12 bg-background/90 backdrop-blur-sm transition-[opacity,transform] duration-[1100ms] ease-out motion-reduce:transition-none ${
          presented
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        <div className="relative flex items-center justify-between h-full gap-4">
          <Link
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="relative z-10 font-display text-2xl md:text-3xl font-bold leading-none tracking-tighter text-foreground whitespace-nowrap shrink-0"
          >
            SEKAI<br />DEV
          </Link>

          {/* True optical center — independent of logo / right rail widths */}
          <nav
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-4 lg:gap-7 text-[10px] lg:text-[11px] tracking-[0.14em] lg:tracking-[0.18em] font-medium whitespace-nowrap"
            aria-label="Primary"
          >
            {desktopLinks.map((l, i) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className="group inline-flex items-baseline gap-1.5 hover:text-accent transition-colors shrink-0"
              >
                <span className="text-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative">
                  {l.label.toUpperCase()}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-[width] duration-300" />
                </span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex relative z-10 flex-col items-end text-right justify-center gap-1 shrink-0 min-w-[11rem]">
            {SOCIALS.length > 0 && (
              <div className="flex gap-6 lg:gap-8 text-[10px] lg:text-xs tracking-widest font-medium mb-1">
                {SOCIALS.map((s, i) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 hover:text-accent transition-colors whitespace-nowrap"
                  >
                    <span className="text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="relative">
                      {s.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-[width] duration-300" />
                    </span>
                  </a>
                ))}
              </div>
            )}
            <span className="text-[10px] lg:text-xs tracking-widest text-muted whitespace-nowrap">
              Available for projects
            </span>
            <a
              href={`mailto:${STUDIO.email}`}
              className="text-[10px] lg:text-xs tracking-widest hover:text-accent transition-colors whitespace-nowrap"
            >
              {STUDIO.email.toUpperCase()}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden relative z-10 min-h-[44px] min-w-[44px] w-11 h-11 flex flex-col justify-center items-center gap-1.5"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls={menuId}
          >
            <span
              className={`block w-6 h-px bg-foreground transition-transform duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-foreground transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-foreground transition-transform duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        onCancel={(e) => {
          e.preventDefault();
          closeMenu();
        }}
        onClose={() => {
          setMenuOpen(false);
          setPanelVisible(false);
        }}
        id={menuId}
        aria-label="Mobile navigation"
        className="mobile-nav fixed inset-0 z-40 m-0 h-[100dvh] max-h-none w-full max-w-none overflow-x-hidden border-0 bg-transparent p-0 md:hidden open:flex"
      >
        <div
          className={`flex h-full w-full flex-col bg-background px-6 pt-24 pb-[max(1.5rem,env(safe-area-inset-bottom))] transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
            panelVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
          }`}
        >
          <nav
            className="flex flex-col gap-5 mt-2 font-display font-bold tracking-tighter"
            aria-label="Mobile"
          >
            {mobileLinks.map((l, i) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={(e) =>
                  handleNavClick(
                    e,
                    l.href,
                    "intent" in l ? (l.intent as string) : undefined
                  )
                }
                className={`text-3xl sm:text-4xl hover:text-accent transition-[opacity,transform,color] duration-300 motion-reduce:transition-none ${
                  panelVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
                style={{
                  transitionDelay: panelVisible
                    ? `${Math.min(i * 40, 200)}ms`
                    : "0ms",
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <p className="mt-8 text-[10px] tracking-widest uppercase text-foreground/55">
            {NAV_TRUST}
          </p>

          <div className="mt-auto flex flex-col gap-3 pt-10">
            <a
              href={CTAS.primary.href}
              onClick={(e) => handleNavClick(e, CTAS.primary.href)}
              className="inline-flex min-h-[44px] items-center justify-center px-6 py-3 bg-accent text-white text-xs tracking-widest"
            >
              {CTAS.primary.labelUpper}
            </a>
            <a
              href={CTAS.pricing.href}
              onClick={(e) => handleNavClick(e, CTAS.pricing.href)}
              className="inline-flex min-h-[44px] items-center justify-center px-6 py-3 border border-foreground/25 text-xs tracking-widest hover:border-accent hover:text-accent transition-colors"
            >
              {CTAS.pricing.labelUpper}
            </a>
            <a
              href={`mailto:${STUDIO.email}`}
              className="mt-2 block text-center text-xs tracking-widest text-muted"
            >
              {STUDIO.email.toUpperCase()}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
