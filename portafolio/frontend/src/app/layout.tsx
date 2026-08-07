import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/loading/LoadingScreen";
import NoiseOverlay from "@/components/NoiseOverlay";
import CustomCursor from "@/components/CustomCursor";
import { SITE } from "@/content/config";
import { HtmlLang } from "@/components/HtmlLang";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  authors: [{ name: SITE.brand }],
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${oswald.variable}`}>
      <body className="antialiased font-sans">
        <HtmlLang />
        <LoadingScreen />
        <NoiseOverlay />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
