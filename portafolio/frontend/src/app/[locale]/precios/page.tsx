import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import SmoothScroll from "@/components/SmoothScroll";
import StickyCta from "@/components/StickyCta";
import Footer from "@/components/Footer";
import PricingProductView from "@/components/PricingProductView";
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
  const path = "precios";
  const canonical = `${siteUrl}/${locale}/${path}`;
  const title =
    locale === "es"
      ? "Precios | SekaiDev"
      : "Pricing | SekaiDev";
  const description = t.PRICING.productIntro.subline;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_EC" : "en_US",
      url: canonical,
      siteName: SITE.brand,
      title,
      description,
    },
    alternates: {
      canonical,
      languages: {
        es: `${siteUrl}/es/${path}`,
        en: `${siteUrl}/en/${path}`,
        "x-default": `${siteUrl}/es/${path}`,
      },
    },
  };
}

export default async function PreciosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  return (
    <>
      <Navigation />
      <StickyCta />
      <SmoothScroll>
        <main className="relative bg-background">
          <PricingProductView />
          <div className="bg-background">
            <Footer />
          </div>
        </main>
      </SmoothScroll>
    </>
  );
}
