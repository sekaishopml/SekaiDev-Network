import gsap from "gsap";

/**
 * GSAP hide/show for fixed chrome while the pricing pin owns the
 * viewport (mobile and desktop).
 *
 * Important: never use fromTo(... { yPercent: -100, autoAlpha: 0 }) for
 * the reveal path. ScrollTrigger pin can flicker isActive for a frame on
 * enter; that from-state would snap the nav off-screen instantly.
 * Always tween from the current computed values, and debounce the
 * desired state so brief toggles don't reverse the motion.
 */

const CHROME = {
  hideDuration: 1.35,
  showDuration: 1.4,
  ctaLag: 0.1,
  easeHide: "power2.inOut" as const,
  easeShow: "power2.out" as const,
  /** Hide promptly once the pin reads active. */
  hideSettleMs: 40,
  /**
   * Pin/Lenis can drop isActive for a few frames on enter — keep chrome
   * hidden until inactive stays true long enough.
   */
  showSettleMs: 220,
};

let chromeTl: gsap.core.Timeline | null = null;
let hidden = false;
let desired = false;
let settleTimer: ReturnType<typeof setTimeout> | null = null;

function targets() {
  const nav = document.querySelector<HTMLElement>("[data-site-nav]");
  const ctaMobile = document.querySelector<HTMLElement>(".sticky-cta-mobile");
  const ctaDesktop = document.querySelector<HTMLElement>(
    "[data-sticky-cta-desktop]"
  );
  return { nav, ctaMobile, ctaDesktop };
}

function applyChrome(hide: boolean) {
  if (hide === hidden) return;
  hidden = hide;

  const { nav, ctaMobile, ctaDesktop } = targets();
  const ctas = [ctaMobile, ctaDesktop].filter(Boolean) as HTMLElement[];
  const nodes = [nav, ...ctas].filter(Boolean) as HTMLElement[];
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
    if (ctas.length) {
      chromeTl.to(
        ctas,
        {
          yPercent: 110,
          autoAlpha: 0,
          duration: CHROME.hideDuration * 0.92,
          ease: CHROME.easeHide,
        },
        CHROME.ctaLag
      );
    }
    chromeTl.set(nodes, { pointerEvents: "none" }, CHROME.hideDuration * 0.55);
    return;
  }

  delete document.documentElement.dataset.pricingPin;
  chromeTl.set(nodes, { pointerEvents: "auto" }, 0);

  // Tween from CURRENT values — never snap to a forced "from" off-screen.
  if (nav) {
    chromeTl.to(
      nav,
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: CHROME.showDuration,
        ease: CHROME.easeShow,
      },
      0
    );
  }
  if (ctas.length) {
    chromeTl.to(
      ctas,
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

export function setPricingChromeHidden(hide: boolean) {
  desired = hide;
  if (settleTimer) clearTimeout(settleTimer);

  const delay = hide ? CHROME.hideSettleMs : CHROME.showSettleMs;
  settleTimer = setTimeout(() => {
    settleTimer = null;
    applyChrome(desired);
  }, delay);
}

export function resetPricingChrome() {
  desired = false;
  hidden = false;
  if (settleTimer) {
    clearTimeout(settleTimer);
    settleTimer = null;
  }
  chromeTl?.kill();
  chromeTl = null;
  delete document.documentElement.dataset.pricingPin;
  delete document.documentElement.dataset.pricingChrome;
  const { nav, ctaMobile, ctaDesktop } = targets();
  gsap.set([nav, ctaMobile, ctaDesktop].filter(Boolean), {
    clearProps: "transform,opacity,visibility,pointerEvents",
  });
}
