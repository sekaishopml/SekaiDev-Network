"use client";

import { useT } from "@/components/LocaleProvider";
import { SITE } from "@/content/config";
import { jumpTo } from "@/lib/navigation";

export default function Footer() {
  const t = useT();

  const handleAnchor = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    jumpTo(href);
  };

  return (
    <footer className="px-6 md:px-12 py-8 border-t border-foreground/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs tracking-widest text-muted">
      <span className="font-display text-2xl font-bold text-foreground">
        {SITE.brand}
      </span>
      <nav
        className="flex flex-wrap gap-x-6 gap-y-2"
        aria-label={t.UI.primaryNav}
      >
        <a
          href="#featured"
          onClick={(e) => handleAnchor(e, "#featured")}
          className="hover:text-accent transition-colors"
        >
          {t.UI.footerFeatured}
        </a>
        <a
          href="#about"
          onClick={(e) => handleAnchor(e, "#about")}
          className="hover:text-accent transition-colors"
        >
          {t.UI.footerAbout}
        </a>
      </nav>
      <span>
        © {new Date().getFullYear()} {SITE.brand}. {t.UI.footerRights}
      </span>
      <span>{t.UI.footerStack}</span>
    </footer>
  );
}
