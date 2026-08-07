/** Single typed navigation / intent controller for in-page jumps */

export type JumpDetail = {
  href: string;
  intent?: string;
};

const INTENT_KEY = "sekaidev:intent";
const JUMP_EVENT = "sekaidev:jump";

/** Strip query from hash targets so querySelector stays valid */
export function parseJumpHref(raw: string): { hash: string; intent?: string } {
  const trimmed = (raw || "").trim();
  if (!trimmed) return { hash: "" };

  // "#contact?intent=sprint" or "/es#contact?intent=sprint"
  const hashIdx = trimmed.indexOf("#");
  const withHash = hashIdx >= 0 ? trimmed.slice(hashIdx) : trimmed;
  const qIdx = withHash.indexOf("?");
  if (qIdx < 0) return { hash: withHash.startsWith("#") ? withHash : `#${withHash}` };

  const hash = withHash.slice(0, qIdx);
  const params = new URLSearchParams(withHash.slice(qIdx + 1));
  const intent = params.get("intent") || undefined;
  return { hash: hash || "#", intent };
}

export function setIntent(intent?: string) {
  if (!intent) return;
  try {
    sessionStorage.setItem(INTENT_KEY, intent);
  } catch {
    /* ignore */
  }
}

export function getIntent(): string {
  try {
    return sessionStorage.getItem(INTENT_KEY) || "";
  } catch {
    return "";
  }
}

export function clearIntent() {
  try {
    sessionStorage.removeItem(INTENT_KEY);
  } catch {
    /* ignore */
  }
}

/** Dispatch a jump. Prefer this over ad-hoc CustomEvents. */
export function jumpTo(href: string, intent?: string) {
  const parsed = parseJumpHref(href);
  if (intent || parsed.intent) setIntent(intent || parsed.intent);
  window.dispatchEvent(
    new CustomEvent(JUMP_EVENT, {
      detail: parsed.hash,
    })
  );
}

export { JUMP_EVENT, INTENT_KEY };
