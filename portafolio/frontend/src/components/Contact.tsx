"use client";

import { FormEvent, ReactNode, useEffect, useId, useState } from "react";
import { useRef } from "react";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import {
  BUDGETS,
  CONTACT_COPY,
  CTAS,
  INDUSTRIES,
  PROJECT_TYPES,
  STUDIO,
  TIMELINES,
  TRUST_STRIP,
  WHATSAPP,
} from "@/content/studio";

interface ContactProps {
  footer?: ReactNode;
}

type Status = "idle" | "sending" | "ok" | "error" | "rate_limited";

function trackInquiry(reference?: string) {
  try {
    const w = window as Window & {
      gtag?: (...args: unknown[]) => void;
      plausible?: (
        event: string,
        opts?: { props?: Record<string, string> }
      ) => void;
    };
    w.plausible?.("inquiry_submitted", {
      props: reference ? { reference } : undefined,
    });
    w.gtag?.("event", "inquiry_submitted", { reference });
  } catch {
    /* analytics optional */
  }
}

export default function Contact({ footer }: ContactProps) {
  const rootRef = useRef<HTMLElement>(null);
  const sendingRef = useRef(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [reference, setReference] = useState("");
  const [intent, setIntent] = useState("");
  const [industryDefault, setIndustryDefault] = useState("");
  const uid = useId();
  useSectionReveal(rootRef);

  useEffect(() => {
    const applyIntent = (raw: string) => {
      const nextIntent = raw || "";
      setIntent(nextIntent);
      // Prefill only for clear product path — never invent a vertical
      if (nextIntent === "product") {
        setIndustryDefault("Startup / product");
      } else {
        setIndustryDefault("");
      }
    };

    const readIntent = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const fromUrl = params.get("intent") || "";
        const fromSession = sessionStorage.getItem("sekaidev:intent") || "";
        applyIntent(fromUrl || fromSession);
      } catch {
        /* ignore */
      }
    };

    readIntent();

    const onJump = (e: Event) => {
      const target = (e as CustomEvent<string>).detail || "";
      if (target.startsWith("#contact")) readIntent();
    };
    window.addEventListener("sekaidev:jump", onJump);
    window.addEventListener("focus", readIntent);
    return () => {
      window.removeEventListener("sekaidev:jump", onJump);
      window.removeEventListener("focus", readIntent);
    };
  }, []);

  const defaultProjectType = (() => {
    if (intent === "sprint" || intent === "services")
      return "Brand / marketing site";
    if (intent === "launch" || intent === "product" || intent === "partner")
      return "Product / web app";
    return "";
  })();

  const defaultBudget = (() => {
    if (intent === "sprint") return "$7.5k–$12k (Sprint-sized)";
    if (intent === "launch") return "$22k–$45k (Launch-sized)";
    if (intent === "partner") return "Monthly retainer ($9.5k+ / mo)";
    if (intent === "services") return "$7.5k–$12k (Sprint-sized)";
    if (intent === "product") return "$22k–$45k (Launch-sized)";
    return "";
  })();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sendingRef.current) return;
    sendingRef.current = true;
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      company: String(data.get("company") || "").trim(),
      industry: String(data.get("industry") || "").trim(),
      projectType: String(data.get("projectType") || "").trim(),
      timeline: String(data.get("timeline") || "").trim(),
      budget: String(data.get("budget") || "").trim(),
      message: String(data.get("message") || "").trim(),
      website: String(data.get("website") || "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await res.json().catch(() => ({}));

      if (res.status === 429) {
        setStatus("rate_limited");
        setErrorMsg(
          body.error ||
            "Too many attempts — try again in a few minutes or email us."
        );
        return;
      }

      if (!res.ok || body.ok === false) {
        throw new Error(body.error || "Failed to send");
      }

      setReference(body.reference || "");
      setStatus("ok");
      form.reset();
      try {
        sessionStorage.removeItem("sekaidev:intent");
      } catch {
        /* ignore */
      }
      trackInquiry(body.reference);
    } catch (err) {
      const subject = encodeURIComponent(
        `Project inquiry from ${payload.name}`
      );
      const body = encodeURIComponent(
        [
          payload.message,
          "",
          `Company: ${payload.company || "—"}`,
          `Industry: ${payload.industry || "—"}`,
          `Type: ${payload.projectType || "—"}`,
          `Timeline: ${payload.timeline || "—"}`,
          `Budget: ${payload.budget || "—"}`,
          "",
          `— ${payload.name} <${payload.email}>`,
        ].join("\n")
      );
      window.location.href = `mailto:${STUDIO.email}?subject=${subject}&body=${body}`;
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? `${err.message}. Opening your email client as a backup.`
          : "Opening your email client as a backup."
      );
    } finally {
      sendingRef.current = false;
    }
  };

  const field =
    "bg-transparent border-b border-foreground/30 py-2 focus:outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/40 transition-colors w-full";

  return (
    <section
      ref={rootRef}
      id="contact"
      className="relative min-h-screen w-full px-6 md:px-12 pt-28 md:pt-32 pb-28 md:pb-20 flex flex-col justify-between bg-background"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        <div data-reveal>
          <span className="text-muted text-xs tracking-widest">
            07 — {CONTACT_COPY.sectionLabel.toUpperCase()}
          </span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mt-4 leading-tight">
            {CONTACT_COPY.headlineLine1}
            <br />
            {CONTACT_COPY.headlineLine2}
          </h2>
          <p className="mt-4 md:mt-6 text-sm md:text-base text-foreground/80 max-w-md">
            {CONTACT_COPY.subline}
          </p>

          <ul className="mt-6 flex flex-col gap-2 max-w-sm">
            {TRUST_STRIP.map((line) => (
              <li
                key={line}
                className="text-[10px] tracking-widest uppercase text-foreground/55 border-l border-accent/60 pl-3"
              >
                {line}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-5">
            <a
              href={`mailto:${STUDIO.email}`}
              className="inline-block text-xs tracking-widest hover:text-accent transition-colors underline-offset-4 hover:underline"
            >
              {STUDIO.email.toUpperCase()}
            </a>
            {WHATSAPP && (
              <a
                href={WHATSAPP.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs tracking-widest hover:text-accent transition-colors underline-offset-4 hover:underline"
              >
                {CTAS.whatsapp.labelUpper}
              </a>
            )}
          </div>
          <p className="mt-4 text-[10px] tracking-widest text-muted uppercase max-w-xs">
            {CONTACT_COPY.privacyNote}
          </p>
        </div>

        {status === "ok" ? (
          <div
            data-reveal
            className="border border-foreground/15 p-6 md:p-8 self-start"
            role="status"
          >
            <p className="text-[10px] tracking-widest text-accent uppercase">
              {CONTACT_COPY.successTitle}
            </p>
            <p className="mt-4 font-display text-2xl md:text-3xl font-bold leading-tight">
              {CONTACT_COPY.successBody}
            </p>
            {reference && (
              <p className="mt-6 text-xs tracking-widest text-foreground/70">
                Reference{" "}
                <span className="text-foreground font-medium">{reference}</span>
              </p>
            )}
            <p className="mt-4 text-sm text-foreground/60 leading-relaxed">
              Keep this reference if you follow up. We typically reply within
              24 hours.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`mailto:${STUDIO.email}`}
                className="inline-block text-[10px] tracking-widest uppercase text-foreground/70 hover:text-accent transition-colors"
              >
                Email {STUDIO.email} →
              </a>
              {WHATSAPP && (
                <a
                  href={WHATSAPP.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[10px] tracking-widest uppercase text-foreground/70 hover:text-accent transition-colors"
                >
                  Continue on WhatsApp →
                </a>
              )}
            </div>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-3 md:gap-4"
            data-reveal
          >
            <div className="hidden" aria-hidden="true">
              <label htmlFor={`${uid}-website`}>Website</label>
              <input
                id={`${uid}-website`}
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                defaultValue=""
              />
            </div>

            <label
              htmlFor={`${uid}-name`}
              className="text-[10px] md:text-xs tracking-widest text-muted"
            >
              {CONTACT_COPY.fields.name.label.toUpperCase()}
            </label>
            <input
              id={`${uid}-name`}
              type="text"
              name="name"
              required
              minLength={2}
              maxLength={120}
              autoComplete="name"
              className={field}
            />

            <label
              htmlFor={`${uid}-email`}
              className="text-[10px] md:text-xs tracking-widest text-muted mt-1"
            >
              {CONTACT_COPY.fields.email.label.toUpperCase()}
            </label>
            <input
              id={`${uid}-email`}
              type="email"
              name="email"
              required
              maxLength={200}
              autoComplete="email"
              className={field}
            />

            <label
              htmlFor={`${uid}-message`}
              className="text-[10px] md:text-xs tracking-widest text-muted mt-1"
            >
              {CONTACT_COPY.fields.message.label.toUpperCase()}
            </label>
            <textarea
              id={`${uid}-message`}
              name="message"
              required
              minLength={10}
              maxLength={4000}
              rows={3}
              placeholder={CONTACT_COPY.fields.message.placeholder}
              className={`${field} resize-none`}
            />

            <label
              htmlFor={`${uid}-budget`}
              className="text-[10px] md:text-xs tracking-widest text-muted mt-1"
            >
              {CONTACT_COPY.fields.budget.label.toUpperCase()}
            </label>
            <select
              id={`${uid}-budget`}
              name="budget"
              required
              defaultValue={defaultBudget}
              key={`budget-${intent}`}
              className={`${field} appearance-none`}
            >
              <option value="" disabled>
                {CONTACT_COPY.fields.budget.placeholder}
              </option>
              {BUDGETS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <details className="mt-1 group">
              <summary className="cursor-pointer list-none text-[10px] tracking-widest uppercase text-foreground/50 hover:text-accent transition-colors [&::-webkit-details-marker]:hidden">
                <span className="border-b border-foreground/20 group-open:border-accent/40 pb-0.5">
                  Timeline, type &amp; context — optional
                </span>
              </summary>
              <div className="mt-3 flex flex-col gap-3 md:gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor={`${uid}-timeline`}
                      className="text-[10px] md:text-xs tracking-widest text-muted"
                    >
                      {CONTACT_COPY.fields.timeline.label.toUpperCase()}
                    </label>
                    <select
                      id={`${uid}-timeline`}
                      name="timeline"
                      defaultValue=""
                      className={`${field} appearance-none`}
                    >
                      <option value="">
                        {CONTACT_COPY.fields.timeline.placeholder}
                      </option>
                      {TIMELINES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor={`${uid}-type`}
                      className="text-[10px] md:text-xs tracking-widest text-muted"
                    >
                      {CONTACT_COPY.fields.projectType.label.toUpperCase()}
                    </label>
                    <select
                      id={`${uid}-type`}
                      name="projectType"
                      defaultValue={defaultProjectType}
                      key={`type-${intent}`}
                      className={`${field} appearance-none`}
                    >
                      <option value="">
                        {CONTACT_COPY.fields.projectType.placeholder}
                      </option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <label
                  htmlFor={`${uid}-company`}
                  className="text-[10px] md:text-xs tracking-widest text-muted"
                >
                  {CONTACT_COPY.fields.company.label.toUpperCase()}
                </label>
                <input
                  id={`${uid}-company`}
                  type="text"
                  name="company"
                  maxLength={160}
                  autoComplete="organization"
                  className={field}
                />

                <label
                  htmlFor={`${uid}-industry`}
                  className="text-[10px] md:text-xs tracking-widest text-muted"
                >
                  {CONTACT_COPY.fields.industry.label.toUpperCase()}
                </label>
                <select
                  id={`${uid}-industry`}
                  name="industry"
                  defaultValue={industryDefault}
                  key={`industry-${intent}-${industryDefault}`}
                  className={`${field} appearance-none`}
                >
                  <option value="">
                    {CONTACT_COPY.fields.industry.placeholder}
                  </option>
                  {INDUSTRIES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </details>

            <p className="mt-1 text-[10px] tracking-widest uppercase text-foreground/45 leading-relaxed">
              {CONTACT_COPY.trustLine}
            </p>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-1 self-start w-full md:w-auto px-8 py-3 bg-accent text-white border border-accent text-[10px] md:text-xs tracking-widest font-medium hover:bg-foreground hover:border-foreground transition-colors disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {status === "sending"
                ? CONTACT_COPY.submit.sending.toUpperCase()
                : CONTACT_COPY.submit.idle.toUpperCase()}
            </button>
            {(status === "error" || status === "rate_limited") && errorMsg && (
              <p
                className="text-xs tracking-widest text-foreground/70 mt-2"
                role="alert"
              >
                {errorMsg}
              </p>
            )}
          </form>
        )}
      </div>

      {footer && <div className="mt-auto">{footer}</div>}
    </section>
  );
}
