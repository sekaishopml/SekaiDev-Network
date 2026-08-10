import { Inter, Oswald } from "next/font/google";
import LoadingScreen from "@/components/loading/LoadingScreen";
import NoiseOverlay from "@/components/NoiseOverlay";
import CustomCursor from "@/components/CustomCursor";
import { RELOAD_HERO_BOOT_SCRIPT } from "@/lib/reloadHero";

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

/** Shared html/body chrome so locale + non-locale trees stay consistent. */
export function DocumentShell({
  lang,
  children,
  withChrome = false,
}: {
  lang: string;
  children: React.ReactNode;
  /** Marketing site chrome (loader, noise, cursor). Off for demos like lead-flow. */
  withChrome?: boolean;
}) {
  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${inter.variable} ${oswald.variable}`}
    >
      <body className="antialiased font-sans">
        {withChrome ? (
          <>
            <script
              dangerouslySetInnerHTML={{ __html: RELOAD_HERO_BOOT_SCRIPT }}
            />
            <LoadingScreen />
            <NoiseOverlay />
            <CustomCursor />
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
