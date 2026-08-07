/** @deprecated Prefer useT()/useLocale() in client components. */
export { WHATSAPP, SOCIALS, SITE } from "./config";

import { en } from "./dictionaries/en";

export const CTAS = en.CTAS;
export const STUDIO = en.STUDIO;
export const TRUST_STRIP = en.TRUST_STRIP;
export const FUNNEL_PATHS = en.FUNNEL_PATHS;
export const NAV_LINKS = en.NAV_LINKS;
export const NAV_TRUST = en.NAV_TRUST;
export const INDUSTRIES = en.INDUSTRIES;
export const LOOK_COPY = en.LOOK_COPY;
export const OUTCOMES = en.OUTCOMES;
export const FEATURED_CASE = en.FEATURED_CASE;
export const PROOF = en.PROOF;
export const PRICING = en.PRICING;
export const FAQ_ITEMS = en.FAQ_ITEMS;
export const PROCESS = en.PROCESS;
export const PROCESS_SECTION = en.PROCESS_SECTION;
export const WORKS_SECTION = en.WORKS_SECTION;
export const WORKS = en.WORKS;
export const ABOUT = en.ABOUT;
export const CONTACT_COPY = en.CONTACT_COPY;
export const PROJECT_TYPES = en.PROJECT_TYPES;
export const TIMELINES = en.TIMELINES;
export const BUDGETS = en.BUDGETS;
export const UI = en.UI;
export const LEAD_FLOW_DEMO = en.LEAD_FLOW_DEMO;

/** @deprecated Use PRICING.tiers. */
export const ENGAGEMENT = en.PRICING.tiers.map((tier) => ({
  title: tier.title,
  body: `${tier.tagline} · ${tier.timeline} · ${tier.priceFrom}`,
}));
