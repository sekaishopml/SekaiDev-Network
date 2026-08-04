import { NextRequest, NextResponse } from "next/server";

/**
 * Prefer forwarding to Go backend when BACKEND_URL is set (local parity).
 * Otherwise validate + return a demo reference so the confirmation UX works in isolation.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Body = {
  name?: string;
  email?: string;
  company?: string;
  industry?: string;
  projectType?: string;
  timeline?: string;
  budget?: string;
  message?: string;
  website?: string;
};

function demoReference() {
  const n = Date.now().toString(16).slice(-4).toUpperCase();
  const d = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `SKD-${d}-${n}`;
}

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (String(body.website || "").trim()) {
    return NextResponse.json({
      ok: true,
      reference: demoReference(),
      status: "received",
      message: "We received your inquiry and typically reply within 24 hours.",
    });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();
  const company = String(body.company || "").trim();
  const industry = String(body.industry || "").trim();
  const projectType = String(body.projectType || "").trim();
  const timeline = String(body.timeline || "").trim();
  const budget = String(body.budget || "").trim();

  if (name.length < 2 || name.length > 120) {
    return NextResponse.json({ ok: false, error: "Invalid name" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }
  if (message.length < 10 || message.length > 4000) {
    return NextResponse.json({ ok: false, error: "Invalid message" }, { status: 400 });
  }
  if (
    company.length > 160 ||
    industry.length > 80 ||
    projectType.length > 80 ||
    timeline.length > 80 ||
    budget.length > 80
  ) {
    return NextResponse.json({ ok: false, error: "Invalid fields" }, { status: 400 });
  }

  const backend = process.env.BACKEND_URL;
  if (backend) {
    try {
      const upstream = await fetch(`${backend.replace(/\/$/, "")}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Forwarded-For":
            req.headers.get("x-forwarded-for") ||
            req.headers.get("x-real-ip") ||
            "127.0.0.1",
        },
        body: JSON.stringify(body),
      });
      const data = await upstream.json().catch(() => ({}));
      return NextResponse.json(data, { status: upstream.status });
    } catch (err) {
      console.error("[contact] backend proxy failed", err);
    }
  }

  const reference = demoReference();
  console.info("[contact]", {
    name,
    email,
    company,
    industry,
    projectType,
    timeline,
    budget,
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
