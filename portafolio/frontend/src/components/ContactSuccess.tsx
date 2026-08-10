"use client";

import { useLocale } from "@/components/LocaleProvider";
import { SITE, WHATSAPP } from "@/content/config";

interface ContactSuccessProps {
  reference: string;
}

export default function ContactSuccess({ reference }: ContactSuccessProps) {
  const { t } = useLocale();

  return (
    <div
      data-reveal
      className="border border-foreground/15 p-6 md:p-8 self-start"
      role="status"
    >
      <p className="text-[10px] tracking-widest text-accent uppercase">
        {t.CONTACT_COPY.successTitle}
      </p>
      <p className="mt-4 font-display text-2xl md:text-3xl font-bold leading-tight">
        {t.CONTACT_COPY.successBody}
      </p>
      {reference && (
        <p className="mt-6 text-xs tracking-widest text-foreground/70">
          {t.CONTACT_COPY.successReferenceLabel}{" "}
          <span className="text-foreground font-medium">{reference}</span>
        </p>
      )}
      <p className="mt-4 text-sm text-foreground/60 leading-relaxed">
        {t.CONTACT_COPY.successFollowup}
      </p>
      <div className="mt-6 flex flex-col gap-3">
        <a
          href={`mailto:${SITE.email}`}
          className="inline-block text-[10px] tracking-widest uppercase text-foreground/70 hover:text-accent transition-colors"
        >
          {SITE.email} →
        </a>
        {WHATSAPP && (
          <a
            href={WHATSAPP.prefill(t.CONTACT_COPY.whatsappPrefill)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[10px] tracking-widest uppercase text-foreground/70 hover:text-accent transition-colors"
          >
            {t.CTAS.whatsapp.label} →
          </a>
        )}
      </div>
    </div>
  );
}
