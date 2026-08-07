"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { useLocale } from "@/components/LocaleProvider";
import { SITE, SOCIALS, WHATSAPP, type Locale } from "@/content/config";
import { jumpTo } from "@/lib/navigation";
import { HERO_ENTRANCE } from "@/lib/motion/heroEntrance";

/** Intro still owns Lenis lock — don't resume scroll under the menu. */
function introOwnsScrollLock() {
  const phase = document.documentElement.dataset.intro;
  return phase === "hero" || phase === "animating";
}

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  /** Stay quiet during loader + bonsai hold; enter with hero copy */
  const [presented, setPresented] = useState(false);
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const menuId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();
  const closeMenu = () => setMenuOpen(false);

  const desktopLinks = t.NAV_LINKS.filter((l) => !l.mobileOnly);
  const mobileLinks = t.NAV_LINKS;

  const localeHref = (target: Locale) => {
    const localizedPath = /^\/(en|es)(?=\/|$)/.test(pathname)
      ? pathname.replace(/^\/(en|es)(?=\/|$)/, `/${target}`)
      : `/${target}${pathname === "/" ? "" : pathname}`;
    return `${localizedPath}${currentHash}`;
  };

  useEffect(() => {
    const syncHash = () => setCurrentHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

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
    closeMenu();
    jumpTo(href, intent);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (menuOpen) {
      document.documentElement.dataset.menuOpen = "true";
      if (!dialog.open) dialog.showModal();
      lenis?.stop();
      requestAnimationFrame(() => {
        setPanelVisible(true);
        closeBtnRef.current?.focus({ preventScroll: true });
      });
      return;
    }

    // Closing: fade panel first; Lenis + data-menu-open resume in onClose
    setPanelVisible(false);
    if (reduced) {
      if (dialog.open) dialog.close();
      return;
    }
    if (dialog.open) {
      const t = window.setTimeout(() => {
        if (dialog.open) dialog.close();
      }, 280);
      return () => clearTimeout(t);
    }
  }, [menuOpen, lenis]);

  useEffect(() => {
    return () => {
      delete document.documentElement.dataset.menuOpen;
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top,0px)] h-[calc(5rem+env(safe-area-inset-top,0px))] md:h-[calc(6rem+env(safe-area-inset-top,0px))] px-6 md:px-12 bg-background/90 backdrop-blur-sm transition-[opacity,transform] duration-[1100ms] ease-out motion-reduce:transition-none ${
          presented
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        <div className="relative flex items-center justify-between h-20 md:h-24 gap-4">
          <Link
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="relative z-10 font-display text-2xl md:text-3xl font-bold leading-none tracking-tighter text-foreground whitespace-nowrap shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            SEKAI<br />DEV
          </Link>

          {/* True optical center — independent of logo / right rail widths */}
          <nav
            className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-5 xl:gap-7 text-[10px] xl:text-[11px] tracking-[0.14em] xl:tracking-[0.18em] font-medium whitespace-nowrap"
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

          <div className="hidden lg:flex relative z-10 flex-col items-end text-right justify-center gap-1 shrink-0 min-w-[11rem]">
            <div
              className="flex items-center gap-2 text-[10px] tracking-widest mb-1"
              aria-label={t.langSwitch.label}
            >
              {(["en", "es"] as const).map((lang, index) => (
                <span key={lang} className="contents">
                  {index > 0 && <span aria-hidden>|</span>}
                  <Link
                    href={localeHref(lang)}
                    aria-current={locale === lang ? "page" : undefined}
                    className={
                      locale === lang
                        ? "font-bold text-foreground"
                        : "text-muted hover:text-accent transition-colors"
                    }
                  >
                    {t.langSwitch[lang]}
                  </Link>
                </span>
              ))}
            </div>
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
              {t.STUDIO.available}
            </span>
            <a
              href={`mailto:${SITE.email}`}
              className="text-[10px] lg:text-xs tracking-widest hover:text-accent transition-colors whitespace-nowrap"
            >
              {SITE.email.toUpperCase()}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="lg:hidden relative z-10 min-h-[44px] min-w-[44px] w-11 h-11 flex flex-col justify-center items-center gap-[5px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label={t.UI.openMenu}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-haspopup="dialog"
          >
            <span className="block w-6 h-px bg-foreground" />
            <span className="block w-6 h-px bg-foreground" />
            <span className="block w-6 h-px bg-foreground" />
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
          delete document.documentElement.dataset.menuOpen;
          if (!introOwnsScrollLock()) {
            lenis?.start();
          }
        }}
        onClick={(e) => {
          // Backdrop / dialog chrome click closes (panel stops propagation)
          if (e.target === dialogRef.current) closeMenu();
        }}
        id={menuId}
        aria-label="Mobile navigation"
        className="mobile-nav fixed inset-0 z-[60] m-0 h-[100dvh] max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 md:hidden open:flex"
      >
        <div
          className={`relative flex h-full w-full flex-col bg-background transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
            panelVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex shrink-0 items-center justify-between gap-4 px-6 pt-[env(safe-area-inset-top,0px)] min-h-[calc(5rem+env(safe-area-inset-top,0px))]">
            <Link
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="font-display text-2xl font-bold leading-none tracking-tighter focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              SEKAI<br />DEV
            </Link>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={closeMenu}
              className="relative min-h-[44px] min-w-[44px] w-11 h-11 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label={t.UI.closeMenu}
            >
              <span className="absolute block w-6 h-px bg-foreground rotate-45" />
              <span className="absolute block w-6 h-px bg-foreground -rotate-45" />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <nav
              className="flex flex-col gap-1 mt-2 font-display font-bold tracking-tighter"
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
                  className={`py-2.5 text-3xl sm:text-4xl hover:text-accent transition-[opacity,transform,color] duration-300 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
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
                  <span className="mr-3 text-sm font-medium tracking-widest text-muted tabular-nums align-middle">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {l.label}
                </Link>
              ))}
            </nav>

            <p className="mt-6 text-[10px] tracking-widest uppercase text-foreground/55">
              {t.NAV_TRUST}
            </p>

            <div className="mt-auto flex flex-col gap-3 pt-10">
              <div
                className="flex justify-center items-center gap-3 text-xs tracking-widest"
                aria-label={t.langSwitch.label}
              >
                {(["en", "es"] as const).map((lang, index) => (
                  <span key={lang} className="contents">
                    {index > 0 && <span aria-hidden>|</span>}
                    <Link
                      href={localeHref(lang)}
                      onClick={closeMenu}
                      aria-current={locale === lang ? "page" : undefined}
                      className={
                        locale === lang
                          ? "font-bold text-foreground"
                          : "text-muted hover:text-accent transition-colors"
                      }
                    >
                      {t.langSwitch[lang]}
                    </Link>
                  </span>
                ))}
              </div>
              <a
                href={t.CTAS.primary.href}
                onClick={(e) => handleNavClick(e, t.CTAS.primary.href)}
                className="inline-flex min-h-[44px] items-center justify-center px-6 py-3 bg-accent text-white text-xs tracking-widest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {t.CTAS.primary.labelUpper}
              </a>
              {WHATSAPP ? (
                <a
                  href={WHATSAPP.prefill(t.CONTACT_COPY.whatsappPrefill)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="inline-flex min-h-[44px] items-center justify-center px-6 py-3 border border-foreground/25 text-xs tracking-widest hover:border-accent hover:text-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {t.CTAS.whatsapp.labelUpper}
                </a>
              ) : (
                <a
                  href={t.CTAS.pricing.href}
                  onClick={(e) => handleNavClick(e, t.CTAS.pricing.href)}
                  className="inline-flex min-h-[44px] items-center justify-center px-6 py-3 border border-foreground/25 text-xs tracking-widest hover:border-accent hover:text-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {t.CTAS.pricing.labelUpper}
                </a>
              )}
              {SOCIALS.length > 0 && (
                <div className="mt-2 flex justify-center gap-6 text-[10px] tracking-widest text-muted">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              )}
              <a
                href={`mailto:${SITE.email}`}
                className="mt-1 block text-center text-xs tracking-widest text-muted hover:text-accent transition-colors"
              >
                {SITE.email.toUpperCase()}
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
