"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { CTAS, SOCIALS, STUDIO } from "@/content/studio";
import { HERO_ENTRANCE } from "@/lib/motion/heroEntrance";

const links = [
  { label: "HOME", href: "#home" },
  { label: "OFFER", href: "#offer" },
  { label: "INVESTMENT", href: "#pricing" },
  { label: "WORK", href: "#works" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  /** Stay quiet during loader + bonsai hold; enter with hero copy */
  const [presented, setPresented] = useState(false);
  const menuId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeMenu = () => setMenuOpen(false);

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
    href: string
  ) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    closeMenu();
    window.dispatchEvent(new CustomEvent("sekaidev:jump", { detail: href }));
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (menuOpen && !dialog.open) dialog.showModal();
    if (!menuOpen && dialog.open) dialog.close();

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
        <div className="flex items-center justify-between h-full md:grid md:grid-cols-3 gap-4">
          <Link
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="font-display text-2xl md:text-3xl font-bold leading-none tracking-tighter text-foreground whitespace-nowrap"
          >
            SEKAI<br />DEV
          </Link>

          <nav
            className="hidden md:flex justify-center gap-6 lg:gap-10 text-[10px] lg:text-xs tracking-widest font-medium"
            aria-label="Primary"
          >
            {links.map((l, i) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className="group flex items-center gap-2 hover:text-accent transition-colors"
              >
                <span className="text-muted">0{i + 1}</span>
                <span className="relative">
                  {l.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-[width] duration-300" />
                </span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex flex-col items-end text-right justify-center gap-1">
            {SOCIALS.length > 0 && (
              <div className="flex gap-6 lg:gap-8 text-[10px] lg:text-xs tracking-widest font-medium mb-1">
                {SOCIALS.map((s, i) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 hover:text-accent transition-colors"
                  >
                    <span className="text-muted">0{i + 1}</span>
                    <span className="relative">
                      {s.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-[width] duration-300" />
                    </span>
                  </a>
                ))}
              </div>
            )}
            <span className="text-[10px] lg:text-xs tracking-widest text-muted">
              Available for projects
            </span>
            <a
              href={`mailto:${STUDIO.email}`}
              className="text-[10px] lg:text-xs tracking-widest hover:text-accent transition-colors"
            >
              {STUDIO.email.toUpperCase()}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden relative min-h-[44px] min-w-[44px] w-11 h-11 flex flex-col justify-center items-center gap-1.5"
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
        onClose={closeMenu}
          id={menuId}
          aria-label="Mobile navigation"
          className="mobile-nav fixed inset-0 z-40 m-0 h-[100dvh] max-h-none w-full max-w-none overflow-x-hidden border-0 bg-background px-6 pt-24 md:hidden"
        >
          <button
            type="button"
            onClick={closeMenu}
            className="absolute right-4 top-4 inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-xs tracking-widest text-muted hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            CLOSE
          </button>
          <nav className="flex flex-col gap-8 mt-8 text-4xl font-display font-bold tracking-tighter">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className="hover:text-accent transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          {SOCIALS.length > 0 && (
            <div className="mt-12 flex flex-col gap-4 text-xs tracking-widest text-muted">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="hover:text-accent transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
          <a
            href={CTAS.primary.href}
            onClick={(e) => handleNavClick(e, CTAS.primary.href)}
            className="mt-12 inline-flex px-6 py-3 bg-accent text-white text-xs tracking-widest"
          >
            {CTAS.primary.labelUpper}
          </a>
          <a
            href={`mailto:${STUDIO.email}`}
            className="mt-4 block text-xs tracking-widest text-muted"
          >
            {STUDIO.email.toUpperCase()}
          </a>
      </dialog>
    </>
  );
}
