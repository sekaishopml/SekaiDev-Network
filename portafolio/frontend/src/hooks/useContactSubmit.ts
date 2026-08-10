"use client";

import { FormEvent, useRef, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { SITE } from "@/content/config";
import { clearIntent, getIntent } from "@/lib/navigation";

export type ContactStatus = "idle" | "sending" | "ok" | "error" | "rate_limited";

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

export function useContactSubmit(intent: string) {
  const sendingRef = useRef(false);
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [reference, setReference] = useState("");
  const { locale, t } = useLocale();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sendingRef.current) return;
    sendingRef.current = true;
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const currentIntent = (getIntent() || intent).trim();
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
      locale: locale || "",
      intent: currentIntent,
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
        setErrorMsg(t.UI.contactErrors.rateLimited);
        return;
      }

      if (!res.ok || body.ok === false) {
        throw new Error(t.UI.contactErrors.generic);
      }

      setReference(body.reference || "");
      setStatus("ok");
      form.reset();
      clearIntent();
      trackInquiry(body.reference);
    } catch (err) {
      const ml = t.CONTACT_COPY.mailtoLabels;
      const subject = encodeURIComponent(
        t.CONTACT_COPY.mailtoSubject.replace("{name}", payload.name)
      );
      const body = encodeURIComponent(
        [
          payload.message,
          "",
          `${ml.company}: ${payload.company || "—"}`,
          `${ml.industry}: ${payload.industry || "—"}`,
          `${ml.type}: ${payload.projectType || "—"}`,
          `${ml.timeline}: ${payload.timeline || "—"}`,
          `${ml.budget}: ${payload.budget || "—"}`,
          "",
          `— ${payload.name} <${payload.email}>`,
        ].join("\n")
      );
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      setStatus("error");
      setErrorMsg(
        `${err instanceof Error ? err.message : t.UI.contactErrors.generic} ${
          t.UI.contactErrors.mailtoBackup
        }`
      );
    } finally {
      sendingRef.current = false;
    }
  };

  return { status, errorMsg, reference, onSubmit };
}
