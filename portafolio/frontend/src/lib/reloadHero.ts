/** Hard-reload should always land on the cinematic hero at y=0. */

export const INTRO_SEEN_KEY = "sekaidev:intro-seen";

export function isPageReload(): boolean {
  if (typeof performance === "undefined") return false;
  const nav = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming | undefined;
  return nav?.type === "reload";
}

/** Clear section hash so the browser cannot jump after paint. */
export function clearLocationHash(): void {
  if (typeof window === "undefined") return;
  if (!window.location.hash) return;
  const next = window.location.pathname + window.location.search;
  window.history.replaceState(null, "", next);
}

export function clearIntroSeen(): void {
  try {
    sessionStorage.removeItem(INTRO_SEEN_KEY);
  } catch {
    /* ignore */
  }
}

export function snapWindowToTop(): void {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/**
 * Early head/body script — runs before React/Lenis hydrate so F5 cannot
 * restore mid-page scroll or skip the hero via intro-seen.
 */
export const RELOAD_HERO_BOOT_SCRIPT = `(function(){try{history.scrollRestoration="manual";var n=performance.getEntriesByType("navigation")[0];if(!n||n.type!=="reload")return;try{sessionStorage.removeItem("${INTRO_SEEN_KEY}")}catch(e){}if(location.hash)history.replaceState(null,"",location.pathname+location.search);window.scrollTo(0,0)}catch(e){}})();`;
