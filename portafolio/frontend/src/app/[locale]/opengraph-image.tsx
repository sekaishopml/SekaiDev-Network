import { ImageResponse } from "next/og";
import { isLocale, type Locale } from "@/content/config";
import { getDictionary } from "@/content/i18n";

export const alt = "SekaiDev — software studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const t = getDictionary(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#d6d6d6",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 18,
            background: "#5c1a33",
          }}
        />
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "#111111",
          }}
        >
          SEKAIDEV
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 34,
            color: "#333333",
            maxWidth: 820,
            lineHeight: 1.25,
          }}
        >
          {t.STUDIO.tagline}
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 20,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#5c1a33",
          }}
        >
          {t.meta.ogTitle}
        </div>
      </div>
    ),
    { ...size }
  );
}
