import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  INTRO_SEEN_KEY,
  clearIntroSeen,
  clearLocationHash,
  isPageReload,
} from "./reloadHero";

describe("reloadHero", () => {
  let store: Map<string, string>;

  beforeEach(() => {
    store = new Map<string, string>();
    vi.stubGlobal("sessionStorage", {
      getItem: vi.fn((key: string) => store.get(key) ?? null),
      setItem: vi.fn((key: string, value: string) => {
        store.set(key, value);
      }),
      removeItem: vi.fn((key: string) => {
        store.delete(key);
      }),
      clear: vi.fn(() => {
        store.clear();
      }),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("clears intro-seen flag", () => {
    sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    clearIntroSeen();
    expect(sessionStorage.getItem(INTRO_SEEN_KEY)).toBeNull();
  });

  it("strips location hash without leaving the path", () => {
    const replaceState = vi.fn();
    vi.stubGlobal("window", {
      location: { hash: "#pricing", pathname: "/es", search: "" },
      history: { replaceState },
    });
    clearLocationHash();
    expect(replaceState).toHaveBeenCalledWith(null, "", "/es");
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
