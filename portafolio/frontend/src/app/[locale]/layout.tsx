import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocaleProvider } from "@/components/LocaleProvider";
import { isLocale, SITE, type Locale } from "@/content/config";
import { getDictionary, LOCALES } from "@/content/i18n";

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
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "SekaiDev — software studio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.ogTitle,
      description: t.meta.description,
      images: ["/og.png"],
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

  return <LocaleProvider locale={locale}>{children}</LocaleProvider>;
}
