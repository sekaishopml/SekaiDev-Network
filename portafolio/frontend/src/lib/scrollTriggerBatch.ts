import { ScrollTrigger } from "gsap/ScrollTrigger";

let pending = false;
let timer: ReturnType<typeof setTimeout> | null = null;

/**
 * Coalesce ScrollTrigger.refresh() across sections (fonts.ready, resize, mount).
 * Avoids serial full recalcs when Pricing + Featured + Offer all fire at once.
 */
export function scheduleScrollTriggerRefresh(delayMs = 120): void {
  if (typeof window === "undefined") return;
  pending = true;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    timer = null;
    if (!pending) return;
    pending = false;
    ScrollTrigger.refresh();
  }, delayMs);
}
