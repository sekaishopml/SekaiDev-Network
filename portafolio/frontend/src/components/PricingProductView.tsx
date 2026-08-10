"use client";

import { useLocale, useT } from "@/components/LocaleProvider";
import { setIntent } from "@/lib/navigation";
import PricingProductIntro from "./PricingProductIntro";
import styles from "./PricingProductView.module.css";

export default function PricingProductView() {
  const t = useT();
  const { locale } = useLocale();
  const p = t.PRICING;
  const tiers = p.tiers;

  const jump = (intent: string) => {
    const hash = t.CTAS.primary.href.startsWith("#")
      ? t.CTAS.primary.href
      : "#contact";
    setIntent(intent);
    window.location.assign(`/${locale}${hash}`);
  };

  return (
    <div className={styles.page}>
      <PricingProductIntro />

      <section
        id="pricing-plans"
        className={styles.plans}
        aria-labelledby="pricing-plans-heading"
      >
        <header className={styles.plansHead}>
          <h2 id="pricing-plans-heading" className={styles.plansTitle}>
            {p.railHeadline}
          </h2>
          <p className={styles.plansSub}>{p.marketNote}</p>
        </header>

        <div className={styles.grid}>
          {tiers.map((tier) => {
            const featured = Boolean(tier.featured);
            return (
              <article
                key={tier.id}
                className={`${styles.card} ${featured ? styles.cardFeatured : ""}`}
                data-featured={featured || undefined}
              >
                <div className={styles.cardHead}>
                  <div className={styles.cardTitles}>
                    <h3 className={styles.name}>{tier.title}</h3>
                    {featured ? (
                      <span className={styles.badge}>{p.recommended}</span>
                    ) : null}
                  </div>
                  <p className={styles.tagline}>{tier.tagline}</p>
                </div>

                <div className={styles.priceBlock}>
                  {tier.priceWas ? (
                    <span className={styles.priceWas}>{tier.priceWas}</span>
                  ) : null}
                  <div className={styles.priceRow}>
                    <span className={styles.price}>{tier.priceFrom}</span>
                    {tier.priceUnit ? (
                      <span className={styles.priceUnit}>
                        {tier.priceUnit}
                      </span>
                    ) : null}
                  </div>
                  <p className={styles.timeline}>{tier.timeline}</p>
                </div>

                <p className={styles.outcome}>{tier.outcome}</p>

                <button
                  type="button"
                  className={`${styles.cta} ${featured ? styles.ctaFeatured : ""}`}
                  onClick={() => jump(tier.intent)}
                >
                  {tier.cta}
                </button>

                <ul className={styles.includes}>
                  {tier.includes.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>

                {tier.offerNote ? (
                  <p className={styles.offerNote}>{tier.offerNote}</p>
                ) : null}
              </article>
            );
          })}
        </div>

        <p className={styles.disclaimer}>{p.disclaimer}</p>
        <div className={styles.foot}>
          <button
            type="button"
            className={styles.footCta}
            onClick={() => jump("launch")}
          >
            {t.CTAS.pricingFoot}
          </button>
        </div>
      </section>
    </div>
  );
}
