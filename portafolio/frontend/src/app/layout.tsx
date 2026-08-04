import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/loading/LoadingScreen";
import NoiseOverlay from "@/components/NoiseOverlay";
import CustomCursor from "@/components/CustomCursor";
import { STUDIO } from "@/content/studio";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const siteUrl = STUDIO.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SekaiDev | Product engineering & brand experiences",
    template: "%s | SekaiDev",
  },
  description: STUDIO.subline,
  keywords: [
    "software studio",
    "product engineering",
    "Next.js",
    "Go",
    "web development",
    "SekaiDev",
    "brand experiences",
  ],
  authors: [{ name: "SekaiDev" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "SekaiDev",
    title: "SekaiDev | Product experiences that feel inevitable",
    description: STUDIO.subline,
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
    title: "SekaiDev | Product experiences that feel inevitable",
    description: STUDIO.subline,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="antialiased font-sans">
        <LoadingScreen />
        <NoiseOverlay />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
