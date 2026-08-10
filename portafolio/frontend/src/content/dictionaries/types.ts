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
    pricing: { label: string; labelUpper: string; href: string };
    featuredCase: string;
    offerFoot: string;
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
    /** Section index shown in nav (01–06); omit for unnumbered mobile funnel links. */
    index?: number;
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
      tabApp: string;
      tabCrm: string;
      tabMap: string;
      crmTitle: string;
      crmTrip: string;
      crmDriver: string;
      crmQueue: string;
      gps: string;
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
    offerBanner: string;
    scrollHint: string;
    disclaimer: string;
    recommended: string;
    clientRate: string;
    /** Micro-trust under the featured CTA. */
    ctaTrust: string;
    /** Compact label on the pinned rail stage (not a second h2). */
    railHeadline: string;
    /** Gemini-style product intro above the plans rail. */
    productIntro: {
      eyebrow: string;
      headlineBefore: string;
      headlineAccent: string;
      headlineAfter: string;
      subline: string;
      cta: string;
      scrollCue: string;
    };
    tiers: readonly {
      id: string;
      title: string;
      tagline: string;
      timeline: string;
      /** Struck list / studio floor before client rate. */
      priceWas?: string;
      priceFrom: string;
      priceUnit?: string;
      saveLabel?: string;
      /** Short outcome line above the price — desire before features. */
      outcome: string;
      offerNote?: string;
      bestFor: string;
      includes: readonly string[];
      cta: string;
      intent: string;
      featured?: boolean;
    }[];
  };
  FAQ_ITEMS: readonly { question: string; answer: string }[];
  PROCESS: readonly { step: string; title: string; body: string }[];
  PROCESS_SECTION: {
    label: string;
    headline: string;
    headlineAccent?: string;
    subline: string;
    boardLabel: string;
    boardFlow: string;
  };
  WORKS_SECTION: {
    label: string;
    headline: string;
    subline: string;
    needLabel: string;
    outcomeLabel: string;
  };
  WORKS: readonly {
    id: string;
    slug: string;
    title: string;
    kind: string;
    challenge: string;
    result: string;
    tags: string;
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
    successReferenceLabel: string;
    successFollowup: string;
    mailtoSubject: string;
    mailtoLabels: {
      company: string;
      industry: string;
      type: string;
      timeline: string;
      budget: string;
    };
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
    footerAbout: string;
    footerFeatured: string;
    offerLabel: string;
    offerHeadline: string;
    offerHeadlineAccent: string;
    offerSubline: string;
    offerPromise: string;
    faqLabel: string;
    faqHeadline: string;
    faqSubline: string;
    openMenu: string;
    closeMenu: string;
    primaryNav: string;
    mobileNav: string;
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
    chrome: {
      back: string;
      eyebrow: string;
      apiBlurb: string;
      inboxTitle: string;
      inboxSub: string;
      colReference: string;
      colLead: string;
      colScope: string;
      colPriority: string;
      colStatus: string;
      apiTitle: string;
      contactLabel: string;
      metaTitle: string;
      metaDescription: string;
    };
  };
};
