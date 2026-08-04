"use client";

import { useLayoutEffect, type DependencyList, type RefObject } from "react";
import gsap from "gsap";

type GsapContextFn = () => void | (() => void);

/**
 * Lightweight useGSAP stand-in: scopes selectors + auto-reverts on cleanup.
 * Prefer this over raw useEffect for ScrollTrigger / tween setup.
 */
export function useGSAP(
  fn: GsapContextFn,
  opts?: {
    scope?: RefObject<Element | null>;
    dependencies?: DependencyList;
  }
) {
  const deps = opts?.dependencies ?? [];
  const scope = opts?.scope;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      fn();
    }, scope?.current ?? undefined);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
