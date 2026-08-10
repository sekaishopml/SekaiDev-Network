import { headers } from "next/headers";
import { DocumentShell } from "@/components/DocumentShell";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/content/config";

export default async function LeadFlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const raw = h.get("x-lead-flow-locale");
  const lang: Locale = raw && isLocale(raw) ? raw : DEFAULT_LOCALE;

  return <DocumentShell lang={lang}>{children}</DocumentShell>;
}
