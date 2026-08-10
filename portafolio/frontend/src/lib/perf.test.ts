import { describe, expect, it, vi, afterEach } from "vitest";
import { getPerfProfile } from "./perf";

describe("getPerfProfile", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    // force recompute next call
    getPerfProfile(true);
  });

  it("returns high tier on capable desktop defaults", () => {
    vi.stubGlobal("window", {
      matchMedia: () => ({ matches: false }),
    });
    vi.stubGlobal("navigator", {
      hardwareConcurrency: 8,
      deviceMemory: 8,
    });
    const p = getPerfProfile(true);
    expect(p.tier).toBe("high");
    expect(p.maxDpr).toBeGreaterThanOrEqual(1.5);
  });

  it("returns low tier when saveData + few cores", () => {
    vi.stubGlobal("window", {
      matchMedia: (q: string) => ({
        matches: q.includes("coarse") || q.includes("899"),
      }),
    });
    vi.stubGlobal("navigator", {
      hardwareConcurrency: 2,
      deviceMemory: 2,
      connection: { saveData: true },
    });
    const p = getPerfProfile(true);
    expect(p.tier).toBe("low");
    expect(p.maxDpr).toBe(1);
    expect(p.grainFrameSkip).toBeGreaterThanOrEqual(4);
  });
});
