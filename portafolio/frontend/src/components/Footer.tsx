"use client";

import { useT } from "@/components/LocaleProvider";
import { SITE } from "@/content/config";

export default function Footer() {
  const t = useT();

  return (
    <footer className="px-6 md:px-12 py-8 border-t border-foreground/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs tracking-widest text-muted">
      <span className="font-display text-2xl font-bold text-foreground">
        {SITE.brand}
      </span>
      <span>
        © {new Date().getFullYear()} {SITE.brand}. {t.UI.footerRights}
      </span>
      <span>{t.UI.footerStack}</span>
    </footer>
  );
}
