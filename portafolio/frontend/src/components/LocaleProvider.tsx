"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type { Locale } from "@/content/config";
import type { StudioDictionary } from "@/content/dictionaries/types";
import { getDictionary } from "@/content/i18n";

type LocaleContextValue = {
  locale: Locale;
  t: StudioDictionary;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const value = useMemo(
    () => ({ locale, t: getDictionary(locale) }),
    [locale]
  );
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}

/** Dictionary shorthand */
export function useT() {
  return useLocale().t;
}
