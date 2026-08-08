import gsap from "gsap";

/**
 * GSAP hide/show for fixed chrome while the pricing pin owns the
 * mobile viewport. Timed to match site chrome (nav entrance ~1100ms,
 * hero copy ~0.9s power2.out) — slower lift, not a snappy cut.
 */

/** Aligned with Navigation `duration-[1100ms]` / HERO_ENTRANCE.copyDuration. */
const CHROME = {
  hideDuration: 1.05,
  showDuration: 1.12,
  ctaLag: 0.08,
  easeHide: "power2.inOut" as const,
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
      chromeTl.to(
        nav,
        {
          yPercent: -100,
          autoAlpha: 0,
          duration: CHROME.hideDuration,
          ease: CHROME.easeHide,
        },
        0
      );
    }
    if (cta) {
      chromeTl.to(
        cta,
        {
          yPercent: 110,
          autoAlpha: 0,
          duration: CHROME.hideDuration * 0.92,
          ease: CHROME.easeHide,
        },
        CHROME.ctaLag
      );
    }
    // Keep hit-testing until the fade is mostly done.
    chromeTl.set(nodes, { pointerEvents: "none" }, CHROME.hideDuration * 0.55);
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
        duration: CHROME.showDuration * 0.92,
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
