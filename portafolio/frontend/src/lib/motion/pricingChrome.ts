import gsap from "gsap";

/**
 * GSAP hide/show for fixed chrome while the pricing pin owns the
 * mobile viewport. Paced like site cinema (hero bloom ~1.15s,
 * arc/bonsai settle ~1.05s, nav entrance 1100ms) — a slow lift,
 * not a snappy cut.
 */

/** Softer / longer than nav CSS so the pin handoff feels deliberate. */
const CHROME = {
  hideDuration: 1.55,
  showDuration: 1.65,
  ctaLag: 0.12,
  /** Opacity leads the travel so the exit reads as a fade-lift. */
  fadeLead: 0.18,
  easeHide: "sine.inOut" as const,
  easeShow: "power2.out" as const,
};

let chromeTl: gsap.core.Timeline | null = null;
let hidden = false;

function targets() {
  const nav = document.querySelector<HTMLElement>("[data-site-nav]");
  const cta = document.querySelector<HTMLElement>(".sticky-cta-mobile");
  return { nav, cta };
}

export function setPricingChromeHidden(hide: boolean) {
  if (hide === hidden) return;
  hidden = hide;

  const { nav, cta } = targets();
  const nodes = [nav, cta].filter(Boolean) as HTMLElement[];
  chromeTl?.kill();

  // Suspend CSS transitions so GSAP owns the motion cleanly.
  document.documentElement.dataset.pricingChrome = "1";

  chromeTl = gsap.timeline({
    defaults: { overwrite: "auto", force3D: true },
    onComplete: () => {
      if (!hidden) delete document.documentElement.dataset.pricingChrome;
    },
  });

  if (hide) {
    document.documentElement.dataset.pricingPin = "true";

    if (nav) {
      // Fade starts first; travel fills the rest of the window.
      chromeTl.to(
        nav,
        {
          autoAlpha: 0,
          duration: CHROME.hideDuration * 0.72,
          ease: "sine.out",
        },
        0
      );
      chromeTl.to(
        nav,
        {
          yPercent: -100,
          duration: CHROME.hideDuration,
          ease: CHROME.easeHide,
        },
        CHROME.fadeLead
      );
    }
    if (cta) {
      chromeTl.to(
        cta,
        {
          autoAlpha: 0,
          duration: CHROME.hideDuration * 0.68,
          ease: "sine.out",
        },
        CHROME.ctaLag
      );
      chromeTl.to(
        cta,
        {
          yPercent: 110,
          duration: CHROME.hideDuration * 0.95,
          ease: CHROME.easeHide,
        },
        CHROME.ctaLag + CHROME.fadeLead
      );
    }
    // Keep hit-testing until the fade is mostly done.
    chromeTl.set(nodes, { pointerEvents: "none" }, CHROME.hideDuration * 0.65);
    return;
  }

  delete document.documentElement.dataset.pricingPin;
  chromeTl.set(nodes, { pointerEvents: "auto" }, 0);

  if (nav) {
    chromeTl.fromTo(
      nav,
      { yPercent: -100, autoAlpha: 0 },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: CHROME.showDuration,
        ease: CHROME.easeShow,
      },
      0
    );
  }
  if (cta) {
    chromeTl.fromTo(
      cta,
      { yPercent: 110, autoAlpha: 0 },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: CHROME.showDuration * 0.95,
        ease: CHROME.easeShow,
      },
      CHROME.ctaLag
    );
  }
}

export function resetPricingChrome() {
  hidden = false;
  chromeTl?.kill();
  chromeTl = null;
  delete document.documentElement.dataset.pricingPin;
  delete document.documentElement.dataset.pricingChrome;
  const { nav, cta } = targets();
  gsap.set([nav, cta].filter(Boolean), {
    clearProps: "transform,opacity,visibility,pointerEvents",
  });
}
