import gsap from "gsap";

/**
 * GSAP hide/show for fixed chrome while the pricing pin owns the
 * mobile viewport. Keeps nav + sticky CTA out of the way without a
 * hard CSS cut.
 */

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
          yPercent: -108,
          autoAlpha: 0,
          duration: 0.52,
          ease: "power3.in",
        },
        0
      );
    }
    if (cta) {
      chromeTl.to(
        cta,
        {
          yPercent: 120,
          autoAlpha: 0,
          duration: 0.45,
          ease: "power3.in",
        },
        0.06
      );
    }
    chromeTl.set(nodes, { pointerEvents: "none" }, 0.18);
    return;
  }

  delete document.documentElement.dataset.pricingPin;
  chromeTl.set(nodes, { pointerEvents: "auto" }, 0);

  if (nav) {
    chromeTl.fromTo(
      nav,
      { yPercent: -108, autoAlpha: 0 },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.62,
        ease: "power3.out",
      },
      0
    );
  }
  if (cta) {
    chromeTl.fromTo(
      cta,
      { yPercent: 120, autoAlpha: 0 },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.55,
        ease: "power3.out",
      },
      0.1
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
