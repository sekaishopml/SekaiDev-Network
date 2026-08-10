"use client";

import { type RefObject, useEffect } from "react";

/**
 * Pause CSS animations/transitions on a subtree while off-screen.
 * Does not change timing when visible — only stops idle GPU work.
 */
export function usePauseOffscreen(
  ref: RefObject<Element | null>,
  rootMargin = "80px"
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.removeAttribute("data-anim-paused");
        else el.setAttribute("data-anim-paused", "true");
      },
      { root: null, rootMargin, threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
}
