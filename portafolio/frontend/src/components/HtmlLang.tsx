"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "@/content/i18n";

/** Keeps <html lang> in sync with /en|/es routes */
export function HtmlLang() {
  const pathname = usePathname() || "/";
  useEffect(() => {
    document.documentElement.lang = getLocaleFromPathname(pathname);
  }, [pathname]);
  return null;
}
