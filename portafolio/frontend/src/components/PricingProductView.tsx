"use client";

import { useLocale, useT } from "@/components/LocaleProvider";
import { setIntent } from "@/lib/navigation";
import { PricingFeatureGlyph } from "./PricingFeatureIcons";
import PricingProductIntro from "./PricingProductIntro";
import styles from "./PricingProductView.module.css";

export default function PricingProductView() {
  const t = useT();
  const { locale } = useLocale();
  const p = t.PRICING;
  const page = p.productPage;
  const tiers = p.tiers;
  const faqs = t.FAQ_ITEMS.slice(1, 7);

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
          <p className={styles.plansEyebrow}>{p.offerBanner}</p>
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
                <div className={styles.cardLead}>
                  <div className={styles.cardTop}>
                    <div className={styles.cardTitles}>
                      <h3 className={styles.name}>{tier.title}</h3>
                      {featured ? (
                        <span className={styles.badge}>{p.recommended}</span>
                      ) : null}
                    </div>
                    <p className={styles.tagline}>{tier.tagline}</p>
                    <p className={styles.timeline}>{tier.timeline}</p>
                  </div>

                  <div className={styles.priceBlock}>
                    <span className={styles.rateLabel}>{p.clientRate}</span>
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
                    <p className={styles.outcome}>{tier.outcome}</p>
                  </div>
                </div>

                <button
                  type="button"
                  className={`${styles.cta} ${featured ? styles.ctaFeatured : ""}`}
                  onClick={() => jump(tier.intent)}
                >
                  {tier.cta}
                </button>

                <div className={styles.cardRest}>
                  <div className={styles.ideal}>
                    <p className={styles.sectionLabel}>{page.idealForLabel}</p>
                    <p className={styles.bestFor}>{tier.bestFor}</p>
                  </div>

                  <div className={styles.includesBlock}>
                    <p className={styles.sectionLabel}>{page.includesLabel}</p>
                    <ul className={styles.features}>
                      {tier.features.map((feature) => (
                        <li key={feature.title} className={styles.feature}>
                          <span
                            className={styles.featureIcon}
                            aria-hidden="true"
                          >
                            <PricingFeatureGlyph
                              name={feature.icon}
                              className={styles.featureSvg}
                            />
                          </span>
                          <div className={styles.featureCopy}>
                            <p className={styles.featureTitle}>
                              {feature.title}
                            </p>
                            <p className={styles.featureDetail}>
                              {feature.detail}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {tier.offerNote ? (
                    <p className={styles.offerNote}>{tier.offerNote}</p>
                  ) : null}

                  <p className={styles.cardTrust}>{p.ctaTrust}</p>
                </div>
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

      <section className={styles.faq} aria-labelledby="pricing-faq-heading">
        <header className={styles.faqHead}>
          <h2 id="pricing-faq-heading" className={styles.faqTitle}>
            {page.faqTitle}
          </h2>
          <p className={styles.faqLead}>{page.faqLead}</p>
        </header>
        <div className={styles.faqList}>
          {faqs.map((item) => (
            <details key={item.question} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>{item.question}</summary>
              <p className={styles.faqAnswer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
