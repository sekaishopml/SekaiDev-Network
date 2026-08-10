import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentShell } from "@/components/DocumentShell";
import { LocaleProvider } from "@/components/LocaleProvider";
import { isLocale, SITE, type Locale } from "@/content/config";
import { getDictionary, LOCALES } from "@/content/i18n";
import { faqPageJsonLd, organizationJsonLd } from "@/lib/jsonLd";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const siteUrl = SITE.siteUrl;
  const canonical = `${siteUrl}/${locale}`;

  return {
    title: {
      default: t.meta.title,
      template: "%s | SekaiDev",
    },
    description: t.meta.description,
    keywords: [...t.meta.keywords],
    authors: [{ name: SITE.brand }],
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_EC" : "en_US",
      url: canonical,
      siteName: SITE.brand,
      title: t.meta.ogTitle,
      description: t.meta.description,
      // File-based `[locale]/opengraph-image.tsx` supplies the image.
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.ogTitle,
      description: t.meta.description,
    },
    alternates: {
      canonical,
      languages: {
        en: `${siteUrl}/en`,
        es: `${siteUrl}/es`,
        "x-default": `${siteUrl}/en`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);

  const orgLd = organizationJsonLd(locale);
  const faqLd = faqPageJsonLd(t);

  return (
    <DocumentShell lang={locale} withChrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <LocaleProvider locale={locale}>{children}</LocaleProvider>
    </DocumentShell>
  );
}
