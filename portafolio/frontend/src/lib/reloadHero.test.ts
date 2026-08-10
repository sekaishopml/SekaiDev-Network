import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import {
  INTRO_SEEN_KEY,
  clearIntroSeen,
  clearLocationHash,
  isPageReload,
} from "./reloadHero";

describe("reloadHero", () => {
  beforeEach(() => {
    sessionStorage.clear();
    window.history.replaceState(null, "", "/es");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    sessionStorage.clear();
  });

  it("clears intro-seen flag", () => {
    sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    clearIntroSeen();
    expect(sessionStorage.getItem(INTRO_SEEN_KEY)).toBeNull();
  });

  it("strips location hash without leaving the path", () => {
    window.history.replaceState(null, "", "/es#pricing");
    clearLocationHash();
    expect(window.location.pathname).toBe("/es");
    expect(window.location.hash).toBe("");
  });

  it("detects reload from PerformanceNavigationTiming", () => {
    vi.stubGlobal("performance", {
      getEntriesByType: () => [{ type: "reload" }],
    });
    expect(isPageReload()).toBe(true);

    vi.stubGlobal("performance", {
      getEntriesByType: () => [{ type: "navigate" }],
    });
    expect(isPageReload()).toBe(false);
  });
});
