import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { clearIntent, getIntent, parseJumpHref, setIntent } from "./navigation";

describe("parseJumpHref", () => {
  it("parses hash targets and intent query params", () => {
    expect(parseJumpHref("#contact?intent=sprint")).toEqual({
      hash: "#contact",
      intent: "sprint",
    });
    expect(parseJumpHref("/es#pricing")).toEqual({ hash: "#pricing" });
    expect(parseJumpHref("contact")).toEqual({ hash: "#contact" });
    expect(parseJumpHref("")).toEqual({ hash: "" });
  });
});

describe("intent storage", () => {
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
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sets, gets, and clears intent", () => {
    expect(getIntent()).toBe("");

    setIntent("product");
    expect(getIntent()).toBe("product");

    clearIntent();
    expect(getIntent()).toBe("");
  });

  it("ignores empty intent values", () => {
    setIntent("");

    expect(getIntent()).toBe("");
  });
});
