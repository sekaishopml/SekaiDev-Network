import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/contactSchema";

/**
 * Proxies to Go backend when BACKEND_URL is set.
 * Production must set BACKEND_URL — never fake success after a backend failure.
 * Demo fallback only when BACKEND_URL is unset (local UI work without Go).
 */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const contactRateLimits = new Map<string, RateLimitBucket>();

function clientIp(req: NextRequest) {
  const cfIp = req.headers.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp;

  const forwardedFor = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || "unknown";
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const bucket = contactRateLimits.get(ip);

  if (!bucket || bucket.resetAt <= now) {
    contactRateLimits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return null;
  }

  if (bucket.count >= RATE_LIMIT_MAX) {
    return {
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return null;
}

function demoReference() {
  const n = Date.now().toString(16).slice(-4).toUpperCase();
  const d = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `SKD-${d}-${n}`;
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  const limited = checkRateLimit(ip);
  if (limited) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many contact requests. Please try again in a few minutes.",
        retryAfterSeconds: limited.retryAfterSeconds,
      },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSeconds) },
      }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const website =
    body && typeof body === "object" && "website" in body
      ? (body as { website?: unknown }).website
      : "";

  if (String(website || "").trim()) {
    // Honeypot: return fake success so bots do not learn which field failed.
    return NextResponse.json({
      ok: true,
      reference: demoReference(),
      status: "received",
      message: "We received your inquiry and typically reply within 24 hours.",
    });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: parsed.error.issues[0]?.message || "Invalid contact form",
      },
      { status: 400 }
    );
  }

  const payload = {
    ...parsed.data,
    website: "",
  };
  const {
    name,
    email,
    company,
    industry,
    projectType,
    timeline,
    budget,
    locale,
    intent,
    message,
  } = payload;

  const backend = process.env.BACKEND_URL?.trim();
  if (backend) {
    try {
      const upstream = await fetch(`${backend.replace(/\/$/, "")}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Forwarded-For": ip,
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(12_000),
      });
      const data = await upstream.json().catch(() => ({}));
      if (!upstream.ok) {
        return NextResponse.json(
          {
            ok: false,
            error:
              (data as { error?: string }).error ||
              "Could not deliver inquiry. Email hello@sekaidevec.com.",
          },
          { status: upstream.status >= 400 ? upstream.status : 502 }
        );
      }
      return NextResponse.json(data, { status: upstream.status });
    } catch (err) {
      console.error("[contact] backend proxy failed", err);
      return NextResponse.json(
        {
          ok: false,
          error:
            "Studio inbox unreachable right now. Email hello@sekaidevec.com or try again.",
        },
        { status: 503 }
      );
    }
  }

  // Local/dev only — no BACKEND_URL
  if (process.env.NODE_ENV === "production") {
    console.error("[contact] BACKEND_URL missing in production");
    return NextResponse.json(
      {
        ok: false,
        error:
          "Lead delivery is misconfigured. Email hello@sekaidevec.com directly.",
      },
      { status: 503 }
    );
  }

  const reference = demoReference();
  console.info("[contact:demo]", {
    name,
    email,
    company,
    industry,
    projectType,
    timeline,
    budget,
    locale,
    intent,
    reference,
    message: message.slice(0, 200),
    at: new Date().toISOString(),
  });

  return NextResponse.json({
    ok: true,
    reference,
    status: "received",
    message: "We received your inquiry and typically reply within 24 hours.",
  });
}
