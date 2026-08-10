import Link from "next/link";
import type { Metadata } from "next";
import { SITE, isLocale, type Locale } from "@/content/config";
import { getDictionary } from "@/content/i18n";

const statusStyle: Record<string, string> = {
  received: "border-foreground/30 text-foreground/70",
  reviewing: "border-accent text-accent",
  replied: "border-foreground/50 text-foreground",
  qualified: "border-accent bg-accent/10 text-accent",
};

function localeFromSearch(
  searchParams: Record<string, string | string[] | undefined>
): Locale {
  const raw = searchParams.lang;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value && isLocale(value) ? value : "en";
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const params = await searchParams;
  const locale = localeFromSearch(params);
  const chrome = getDictionary(locale).LEAD_FLOW_DEMO.chrome;
  return {
    title: chrome.metaTitle,
    description: chrome.metaDescription,
    robots: { index: false, follow: false },
  };
}

export default async function LeadFlowPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const locale = localeFromSearch(params);
  const dict = getDictionary(locale);
  const demo = dict.LEAD_FLOW_DEMO;
  const chrome = demo.chrome;
  const homeHref = `/${locale}`;

  return (
    <main className="min-h-screen bg-background text-foreground px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <Link
          href={homeHref}
          className="text-[10px] tracking-widest uppercase text-muted hover:text-accent transition-colors"
        >
          {chrome.back}
        </Link>

        <header className="mt-8 max-w-2xl">
          <p className="text-[10px] tracking-[0.22em] uppercase text-muted">
            {chrome.eyebrow}
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold mt-4 leading-tight">
            {demo.title}
          </h1>
          <p className="mt-4 text-sm md:text-base text-foreground/70 leading-relaxed">
            {demo.subtitle} {chrome.apiBlurb}
          </p>
        </header>

        <section className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {demo.stages.map((s, i) => (
            <div
              key={s.id}
              className="border border-foreground/15 p-5 flex flex-col gap-2"
            >
              <span className="text-[10px] tracking-widest text-muted">
                0{i + 1}
              </span>
              <h2 className="font-display text-xl font-bold">{s.label}</h2>
              <p className="text-xs text-foreground/60 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold">{chrome.inboxTitle}</h2>
          <p className="mt-2 text-sm text-foreground/60">{chrome.inboxSub}</p>

          <div className="mt-8 overflow-x-auto border border-foreground/15">
            <table className="w-full text-left text-sm min-w-[720px]">
              <thead className="bg-foreground/[0.03] text-[10px] tracking-widest uppercase text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">{chrome.colReference}</th>
                  <th className="px-4 py-3 font-medium">{chrome.colLead}</th>
                  <th className="px-4 py-3 font-medium">{chrome.colScope}</th>
                  <th className="px-4 py-3 font-medium">{chrome.colPriority}</th>
                  <th className="px-4 py-3 font-medium">{chrome.colStatus}</th>
                </tr>
              </thead>
              <tbody>
                {demo.sampleLeads.map((lead) => (
                  <tr
                    key={lead.reference}
                    className="border-t border-foreground/10 align-top"
                  >
                    <td className="px-4 py-4 font-mono text-xs">
                      {lead.reference}
                      <p className="mt-1 text-[10px] text-muted tracking-normal">
                        {new Date(lead.createdAt).toLocaleString(
                          locale === "es" ? "es-EC" : "en-US"
                        )}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-xs text-foreground/60">{lead.email}</p>
                      <p className="text-xs text-foreground/50">{lead.company}</p>
                    </td>
                    <td className="px-4 py-4 max-w-xs">
                      <p className="text-xs">{lead.projectType}</p>
                      <p className="text-xs text-foreground/55 mt-1">
                        {lead.timeline}
                      </p>
                      <p className="text-xs text-foreground/55">{lead.budget}</p>
                      <p className="text-xs text-foreground/45 mt-2 leading-relaxed">
                        {lead.messagePreview}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-[10px] tracking-widest uppercase">
                        {lead.priority}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block text-[10px] tracking-widest uppercase border px-2 py-1 ${
                          statusStyle[lead.status] || statusStyle.received
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16 max-w-xl border-t border-foreground/15 pt-10">
          <h2 className="font-display text-xl font-bold">{chrome.apiTitle}</h2>
          <pre className="mt-4 text-[11px] leading-relaxed bg-foreground/[0.04] p-4 overflow-x-auto text-foreground/80">
{`POST /api/contact
→ { ok, reference, status: "received", message }

Pipeline:
  honeypot → rate limit → Postgres → Telegram/Resend alert
  → confirmation UI with reference`}
          </pre>
          <p className="mt-6 text-xs text-muted">
            {chrome.contactLabel}{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="hover:text-accent transition-colors"
            >
              {SITE.email}
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
