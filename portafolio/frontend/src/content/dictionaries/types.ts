/** Localized studio dictionary — identical keys for en/es */

export type StudioDictionary = {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    keywords: string[];
  };
  langSwitch: { label: string; en: string; es: string };
  CTAS: {
    primary: { label: string; labelUpper: string; href: string };
    secondary: { label: string; href: string };
    pricing: { label: string; labelUpper: string; href: string };
    featuredCase: string;
    pricingFoot: string;
    whatsapp: { label: string; labelUpper: string };
  };
  STUDIO: {
    brand: string;
    email: string;
    siteUrl: string;
    icp: string;
    eyebrow: string;
    tagline: string;
    subline: string;
    heroCtaPrimary: { label: string; href: string };
    heroCtaSecondary: { label: string; href: string };
    available: string;
  };
  TRUST_STRIP: readonly string[];
  FUNNEL_PATHS: readonly {
    id: string;
    intent: string;
    label: string;
    hint: string;
    href: string;
  }[];
  NAV_LINKS: readonly {
    label: string;
    href: string;
    mobileOnly: boolean;
    intent?: string;
  }[];
  NAV_TRUST: string;
  INDUSTRIES: readonly string[];
  LOOK_COPY: {
    look: string;
    closer: string;
    past: string;
    find: string;
    signal: string;
    ship: string;
    subline: string;
  };
  OUTCOMES: readonly { title: string; body: string }[];
  FEATURED_CASE: {
    label: string;
    title: string;
    titleLine2?: string;
    role: string;
    challenge: string;
    solution: string;
    result: string;
    stack: readonly string[];
    deliverables: readonly string[];
    decisions: readonly string[];
    handoff: string;
    href: string | null;
    outcomeNote: string;
    labels: {
      challenge: string;
      solution: string;
      delivered: string;
      decisions: string;
      result: string;
      handoff: string;
      buildNotes: string;
    };
    /** Decorative product chrome for the dispatch/map stage (not real metrics). */
    stageUi: {
      aria: string;
      product: string;
      live: string;
      status: string;
      pickup: string;
      dropoff: string;
      pickupPlace: string;
      dropoffPlace: string;
      eta: string;
    };
  };
  PROOF: {
    metrics: readonly { value: string; label: string }[];
    note: string;
  };
  PRICING: {
    sectionLabel: string;
    headline: string;
    subline: string;
    marketNote: string;
    scrollHint: string;
    disclaimer: string;
    recommended: string;
    tiers: readonly {
      id: string;
      title: string;
      tagline: string;
      timeline: string;
      priceFrom: string;
      priceUnit?: string;
      bestFor: string;
      includes: readonly string[];
      cta: string;
      intent: string;
      featured?: boolean;
    }[];
  };
  FAQ_ITEMS: readonly { question: string; answer: string }[];
  PROCESS: readonly { step: string; title: string; body: string }[];
  PROCESS_SECTION: { label: string; headline: string; subline: string };
  WORKS_SECTION: { label: string; headline: string; subline: string };
  WORKS: readonly {
    id: string;
    slug: string;
    title: string;
    kind: string;
    challenge: string;
    result: string;
    tags: string;
    href: string;
  }[];
  ABOUT: {
    label: string;
    headlineLine1: string;
    headlineLine2: string;
    body1: string;
    body2: string;
    pillars: readonly { label: string; detail: string }[];
  };
  CONTACT_COPY: {
    sectionLabel: string;
    headlineLine1: string;
    headlineLine2: string;
    subline: string;
    trustLine: string;
    fields: {
      name: { label: string };
      email: { label: string };
      company: { label: string; hint: string };
      industry: { label: string; hint: string; placeholder: string };
      projectType: { label: string; placeholder: string };
      timeline: { label: string; placeholder: string };
      budget: { label: string; placeholder: string };
      message: { label: string; placeholder: string };
    };
    optionalDetails: string;
    submit: { idle: string; sending: string };
    successTitle: string;
    successBody: string;
    privacyNote: string;
    whatsappPrefill: string;
  };
  PROJECT_TYPES: readonly string[];
  TIMELINES: readonly string[];
  BUDGETS: readonly string[];
  UI: {
    choosePath: string;
    scrollExplore: string;
    skipIntro: string;
    stillFit: string;
    footerRights: string;
    footerStack: string;
    offerLabel: string;
    offerHeadline: string;
    offerHeadlineAccent: string;
    offerSubline: string;
    proofLabel: string;
    proofHeadline: string;
    faqLabel: string;
    faqHeadline: string;
    faqSubline: string;
    openMenu: string;
    closeMenu: string;
    contactErrors: {
      rateLimited: string;
      generic: string;
      mailtoBackup: string;
    };
  };
  LEAD_FLOW_DEMO: {
    title: string;
    subtitle: string;
    stages: readonly { id: string; label: string; desc: string }[];
    sampleLeads: readonly {
      reference: string;
      name: string;
      email: string;
      company: string;
      projectType: string;
      timeline: string;
      budget: string;
      priority: string;
      status: string;
      createdAt: string;
      messagePreview: string;
    }[];
  };
};
