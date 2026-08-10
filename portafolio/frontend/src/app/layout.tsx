import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/content/config";

/**
 * Root layout is a passthrough so `[locale]/layout` (and other trees like
 * lead-flow) can own `<html lang>` for correct SSR per route.
 */
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
  return children;
}
