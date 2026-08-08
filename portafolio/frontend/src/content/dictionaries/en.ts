import type { StudioDictionary } from "./types";

/** English source-of-truth copy. Keep this object structurally aligned with es. */
export const en = {
    meta: {
    title: "SekaiDev | Apps, APIs & brand sites",
    description:
      "Product engineering from Ecuador: web apps, APIs, UX/UI, and brand sites. A small team you work with directly.",
    ogTitle: "SekaiDev | Product engineering from Ecuador",
    keywords: [
      "product engineering",
      "software studio",
      "web app development",
      "API development",
      "UX/UI design",
      "brand experiences",
      "Ecuador",
      "Latin America",
    ],
  },

  langSwitch: { label: "Language", en: "EN", es: "ES" },

  CTAS: {
    primary: {
      label: "See if we fit",
      labelUpper: "SEE IF WE FIT",
      href: "#contact",
    },
    secondary: {
      label: "See what we build",
      href: "#works",
    },
    pricing: {
      label: "See pricing",
      labelUpper: "SEE PRICING",
      href: "#pricing",
    },
    featuredCase: "Discuss a similar build",
    pricingFoot: "Request a scoped quote",
    whatsapp: {
      label: "WhatsApp",
      labelUpper: "WHATSAPP",
    },
  },

  STUDIO: {
    brand: "SEKAIDEV",
    email: "hello@sekaidevec.com",
    siteUrl: "https://portafolio.sekaidevec.com",
    icp: "startups & brands",
    eyebrow: "Full-stack studio for",
    tagline: "We design and ship the product.",
    subline:
      "Web apps, APIs, UX/UI, and brand sites. Small team in Ecuador, working with clients across LatAm and the US.",
    heroCtaPrimary: { label: "See if we fit", href: "#contact" },
    heroCtaSecondary: { label: "See what we build", href: "#works" },
    available: "Available for projects",
  },

  TRUST_STRIP: [
    "Reply within 24 hours",
    "Written scope before build",
    "We say so early if we are not the right team",
  ],

  FUNNEL_PATHS: [
    {
      id: "product",
      intent: "product",
      label: "I have a product",
      hint: "Apps, APIs, or dashboards that need to get built and launched.",
      href: "#offer",
    },
    {
      id: "services",
      intent: "services",
      label: "I want more requests",
      hint: "A site or system that turns visits into real bookings and leads.",
      href: "#pricing",
    },
  ],

  NAV_LINKS: [
    { label: "What we solve", href: "#offer", mobileOnly: false },
    {
      label: "For startups",
      href: "#offer",
      mobileOnly: true,
      intent: "product",
    },
    {
      label: "For service businesses",
      href: "#pricing",
      mobileOnly: true,
      intent: "services",
    },
    { label: "How we work", href: "#process", mobileOnly: false },
    { label: "Pricing", href: "#pricing", mobileOnly: false },
    { label: "Contact", href: "#contact", mobileOnly: false },
    { label: "FAQ", href: "#faq", mobileOnly: false },
  ],

  NAV_TRUST: "Reply within 24h · written scope before build · honest if we are not a fit",

  INDUSTRIES: [
    "Startup / product",
    "Barbershop / salon",
    "Restaurant / hospitality",
    "Law firm",
    "Architecture / design studio",
    "Ecommerce",
    "Ads / agency",
    "Other",
  ],

  LOOK_COPY: {
    look: "LOOK",
    closer: "CLOSER.",
    past: "",
    find: "THIS",
    signal: "IS THE WORK.",
    ship: "APPS · APIS · BRAND SITES",
    subline: "Product engineering and design from Ecuador.",
  },

  OUTCOMES: [
    {
      title: "Web apps and platforms",
      body:
        "Auth, APIs, and live features when you need them. Built so your team can keep changing the product after launch.",
    },
    {
      title: "Sites that sell the work",
      body:
        "Brand and marketing sites with clear structure. Animation only if it helps someone understand or take action.",
    },
    {
      title: "You talk to the builders",
      body:
        "A small team — not a handoff chain. Architecture, design, and launch with the same people.",
    },
  ],

  FEATURED_CASE: {
    label: "Example project",
    title: "CyTaxi",
    titleLine2: "Platform",
    role: "One build among many — product, APIs, and ops UI",
    challenge:
      "A client needed a production ride product: dispatch, payments, and tracking that ops could run daily.",
    solution:
      "We built the product surface and the Go/Postgres backend around real trip flows — same approach we use on other platforms.",
    result:
      "A live base they could operate and extend. The point of showing it: we ship full products, not slide decks.",
    stack: ["Go", "Next.js", "Postgres", "Maps"],
    deliverables: [
      "Driver and rider product flows",
      "Ops / dispatch console",
      "Go API and Postgres data model",
      "Realtime location where the product needed it",
    ],
    decisions: [
      "Go for the core APIs",
      "Next.js for the product UI",
      "Postgres as the system of record",
      "Maps only where the trip flow required them",
    ],
    handoff:
      "Production codebase, platform docs, and a short list of what to build next.",
    href: null,
    outcomeNote: "More named work and walkthroughs available after we confirm fit.",
    labels: {
      challenge: "Challenge",
      solution: "Solution",
      delivered: "Delivered",
      decisions: "Key decisions",
      result: "Result",
      handoff: "Handoff",
      buildNotes: "Build notes",
    },
    stageUi: {
      aria: "Example trip card from the CyTaxi build",
      product: "CyTaxi",
      live: "Live",
      status: "En route",
      pickup: "Pickup",
      dropoff: "Dropoff",
      pickupPlace: "Downtown",
      dropoffPlace: "Airport",
      eta: "ETA 6 min",
    },
  },

  PROOF: {
    metrics: [
      { value: "24h", label: "Typical reply window" },
      { value: "UTC−5", label: "Ecuador · overlap with US East/Central" },
      { value: "Written", label: "Scope before any build starts" },
    ],
    note:
      "We share named references and case walkthroughs privately after we confirm fit.",
  },

  PRICING: {
    sectionLabel: "Pricing",
    headline: "Clear packages. Written quote first.",
    subline:
      "Starting prices in USD for Ecuador and LatAm. Scroll to compare. Final number confirmed in writing before we build.",
    marketNote:
      "Benchmarked against serious product studios in Ecuador — above template websites, below US agency list rates.",
    offerBanner:
      "Each card shows list price and client rate. Launch Standard is the usual pick for a full product.",
    scrollHint: "Scroll to compare packages",
    disclaimer:
      "Starting prices with our client rate. Scope, timeline, and final quote come in writing before build. If the work grows, we say so before the price moves.",
    recommended: "Recommended",
    clientRate: "Client rate",
    tiers: [
      {
        id: "brand",
        title: "Brand Presence",
        tagline: "A site that explains who you are and what to do next.",
        timeline: "3–5 weeks",
        priceWas: "$6,200",
        priceFrom: "$4,500",
        priceUnit: "USD",
        bestFor:
          "Brand or marketing sites with custom motion and a clear path to convert — not a template.",
        includes: [
          "Art direction + conversion wireframes",
          "Custom Next.js front end",
          "Motion system tuned to the brand",
          "SEO / analytics baseline",
          "Staging → production launch + handoff",
        ],
        cta: "Scope a brand site",
        intent: "brand",
      },
      {
        id: "launch",
        title: "Launch Standard",
        tagline: "Design, build, and launch the product.",
        timeline: "8–14 weeks",
        priceWas: "$24,500",
        priceFrom: "$18,500",
        priceUnit: "USD",
        offerNote:
          "Usual pick: direction, full-stack, launch, and 30 days of support.",
        bestFor:
          "Product v1, ops console, or platform base your team can run day to day.",
        includes: [
          "Product + visual direction",
          "Go / Next.js / Postgres as scoped",
          "Auth, APIs, and core product flows",
          "Realtime / integrations when needed",
          "Staging → production + docs + 30 days support",
        ],
        cta: "Start with Launch",
        intent: "launch",
        featured: true,
      },
      {
        id: "sprint",
        title: "Signal Sprint",
        tagline: "One defined milestone, delivered.",
        timeline: "2–4 weeks",
        priceWas: "$8,900",
        priceFrom: "$6,800",
        priceUnit: "USD",
        bestFor:
          "Unblock an MVP, check UX or architecture early, or ship one important slice.",
        includes: [
          "Discovery call + written scope",
          "UX or architecture review before build",
          "One production-ready deliverable",
          "Code review + deployment path",
          "Async updates and a few focused calls",
        ],
        cta: "Start a sprint",
        intent: "sprint",
      },
      {
        id: "partner",
        title: "Product Partner",
        tagline: "Keep building on a monthly cadence.",
        timeline: "3+ months · monthly",
        priceWas: "$5,200",
        priceFrom: "$3,800",
        priceUnit: "USD / mo",
        bestFor:
          "Keep shipping after launch without hiring a full team yet.",
        includes: [
          "Engineering and design hours each month",
          "Shared roadmap + weekly sync",
          "Steady delivery cycles",
          "Architecture and performance care",
          "Pause or scale with 30-day notice",
        ],
        cta: "Talk partnership",
        intent: "partner",
      },
    ],
  },

  FAQ_ITEMS: [
    {
      question: "What happens after I reach out?",
      answer:
        "You get a real reply within 24 hours — not a form autoresponder. We ask only what we need to judge fit: goal, users, timeline, and budget. If it makes sense, we send a written scope before any build starts. If it does not, we say so and stop there.",
    },
    {
      question: "What does it cost to work with you?",
      answer:
        "Brand Presence starts from $4,500 USD, Signal Sprint from $6,800, Launch Standard (usual full product) from $18,500 (list $24,500). Product Partner is from $3,800/month. If your budget is below that floor, we will say so early.",
    },
    {
      question: "Which engagement should I pick?",
      answer:
        "Brand Presence: a marketing or brand site. Signal Sprint: one defined milestone when you need something out fast. Launch Standard (recommended): design + build for a full product launch. Product Partner: monthly hours when you want to keep building after launch.",
    },
    {
      question: "How do payments and contracts work?",
      answer:
        "Quotes are in USD, usually by bank or wire. Before any charge you get a written quote with deposit, milestones, dates, and deliverables — plus what is in and out of scope. We confirm ownership, revision rounds, and the payment schedule in writing. Scope changes need written approval. Invoice/factura on request.",
    },
    {
      question: "Who owns the code and design?",
      answer:
        "You do. Handoff includes the agreed source, design files, docs, and the access required to run and extend what we shipped. No hostage repos. No surprise license traps.",
    },
    {
      question: "Can you work with US and LatAm teams?",
      answer:
        "Yes. We are based in Ecuador (UTC−5 year-round) with solid overlap for US Eastern and Central. Async by default — clear written updates — and short live calls when a decision actually needs one.",
    },
    {
      question: "How long does a project take?",
      answer:
        "Typical ranges once we start: Brand Presence 3–5 weeks, Signal Sprint 2–4 weeks, Launch Standard 8–14 weeks. Product Partner opens at three months. Start date depends on current capacity; we will give you a honest window on the first call.",
    },
    {
      question: "What if we are not a fit?",
      answer:
        "We would rather lose a deal than take the wrong one. Wrong scope, wrong timing, or wrong working style — we say it plainly and free both sides to move on.",
    },
    {
      question: "Can you stay on after launch?",
      answer:
        "Yes. We can leave a short post-launch plan, or continue on Product Partner if you want ongoing iteration without hiring a full team yet.",
    },
  ],

  PROCESS: [
    {
      step: "01",
      title: "Align",
      body:
        "Goals, limits, budget, and what success looks like — written before we build.",
    },
    {
      step: "02",
      title: "Prototype",
      body:
        "We check UX or architecture early so you do not pay for the wrong direction.",
    },
    {
      step: "03",
      title: "Build",
      body:
        "Production work with clear owners and regular async updates.",
    },
    {
      step: "04",
      title: "Launch",
      body:
        "We ship, hand over the project, and leave a short plan for what comes next.",
    },
  ],

  PROCESS_SECTION: {
    label: "02 — METHOD",
    headline: "Scope on paper.",
    headlineAccent: "Then we build.",
    subline: "From the first call to launch — same people, written scope first.",
    boardLabel: "Steps",
    boardFlow: "Align → Prototype → Build → Launch",
  },

  WORKS_SECTION: {
    label: "Capabilities",
    headline: "What this covers.",
    subline:
      "Product systems, brand sites, APIs, and internal tools. Named walkthroughs after we confirm fit.",
    needLabel: "Need",
    outcomeLabel: "Outcome",
  },

  WORKS: [
    {
      id: "01",
      slug: "crm",
      title: "CRM & ops systems",
      kind: "Product",
      challenge: "Pipelines, contacts, and day-to-day ops in one place.",
      result: "A data model, roles, and workflows your team can actually run.",
      tags: "Go · Next.js · Postgres",
      href: "#contact",
    },
    {
      id: "02",
      slug: "websites",
      title: "Brand & product sites",
      kind: "Site",
      challenge: "A site that looks serious and gets people to act.",
      result: "Clear structure, light motion, and CTAs that make sense.",
      tags: "Next.js · Tailwind · GSAP",
      href: "#contact",
    },
    {
      id: "03",
      slug: "api",
      title: "APIs & backends",
      kind: "Systems",
      challenge: "Services you can trust and extend later.",
      result: "Auth, data models, and APIs that grow with the product.",
      tags: "Go · FastAPI · PostgreSQL",
      href: "#contact",
    },
    {
      id: "04",
      slug: "dashboards",
      title: "Internal tools & dashboards",
      kind: "Tools",
      challenge: "Admin screens and ops views teams use every day.",
      result: "Tables, KPIs, and workflows — clear, fast, no fluff.",
      tags: "React · Charts · Postgres",
      href: "#contact",
    },
  ],

  ABOUT: {
    label: "About",
    headlineLine1: "A SMALL",
    headlineLine2: "TEAM THAT BUILDS",
    body1:
      "SekaiDev is a small team in Ecuador. We work remotely with clients in LatAm and the US on web apps, APIs, UX/UI, and brand sites — whatever the project needs, not one niche product.",
    body2:
      "You talk to the people writing the code and shaping the UI, from the first call through handoff.",
    pillars: [
      { label: "PRODUCT", detail: "Web apps and platforms" },
      { label: "SYSTEMS", detail: "APIs, data, and backends" },
      { label: "DESIGN", detail: "UX/UI and brand sites" },
    ],
  },

  CONTACT_COPY: {
    sectionLabel: "Contact",
    headlineLine1: "TELL US",
    headlineLine2: "WHAT YOU'RE BUILDING",
    subline:
      "Tell us the goal, timeline, and budget range. We reply within 24 hours with next steps, or we say we are not the right team.",
    trustLine:
      "Reply within 24h · written scope before build · honest if we are not a fit",
    fields: {
      name: { label: "Name" },
      email: { label: "Email" },
      company: { label: "Company", hint: "Optional, helps us prepare." },
      industry: {
        label: "Industry",
        hint: "Optional",
        placeholder: "Select…",
      },
      projectType: { label: "Project type", placeholder: "Select…" },
      timeline: { label: "Timeline", placeholder: "Select…" },
      budget: { label: "Budget range", placeholder: "Select…" },
      message: {
        label: "Message",
        placeholder:
          "What are you building, for whom, and what does success look like?",
      },
    },
    optionalDetails: "Timeline, type, and context (optional)",
    submit: { idle: "See if we fit", sending: "Sending…" },
    successTitle: "Inquiry received",
    successBody:
      "We will reply within 24 hours with next steps, or tell you plainly if we are not a fit.",
    privacyNote: "No mailing lists. Your note goes to the team that builds the work.",
    whatsappPrefill:
      "Hi SekaiDev, I want to check if we are a fit for a project.",
  },

  PROJECT_TYPES: [
    "Product / web app",
    "Brand / marketing site",
    "API / backend",
    "Dashboard / internal tool",
    "Other",
  ],

  TIMELINES: [
    "ASAP — 2–4 weeks (Sprint)",
    "1–2 months",
    "3+ months (Partner)",
    "Exploring — no fixed date",
  ],

  BUDGETS: [
    "$4.5k–$8k (Brand / Sprint)",
    "$8k–$18.5k",
    "$18.5k–$35k (Launch-sized)",
    "$35k+",
    "Monthly retainer ($3.8k+ / mo)",
    "Not sure yet",
  ],

  UI: {
    choosePath: "Where should we start?",
    scrollExplore: "Scroll to continue",
    skipIntro: "Skip intro",
    stillFit: "Still a fit?",
    footerRights: "ALL RIGHTS RESERVED.",
    footerStack: "NEXT.JS · THREE.JS · GO · POSTGRES",
    offerLabel: "01 — OFFER",
    offerHeadline: "What we",
    offerHeadlineAccent: "build.",
    offerSubline:
      "Apps, APIs, brand sites, and internal tools — built by the same small team end to end.",
    offerPromise:
      "You talk to the builders. Written scope before build. Honest if we are not a fit.",
    proofLabel: "02 — METHOD",
    proofHeadline: "Scope on paper.",
    faqLabel: "05 — FAQ",
    faqHeadline: "Common questions.",
    faqSubline:
      "Fit, money, ownership, and timelines — answered before you spend time on a call.",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    contactErrors: {
      rateLimited: "Too many attempts. Please wait a moment and try again.",
      generic: "Something went wrong. Please try again.",
      mailtoBackup: "If the form keeps failing, email us directly.",
    },
  },

  LEAD_FLOW_DEMO: {
    title: "Lead flow — ops view",
    subtitle: "Example pipeline after an inquiry lands. Demo data only.",
    stages: [
      {
        id: "received",
        label: "Received",
        desc: "Form + honeypot + rate limit cleared",
      },
      {
        id: "reviewing",
        label: "Reviewing",
        desc: "Studio scopes fit within 24h",
      },
      {
        id: "replied",
        label: "Replied",
        desc: "Next steps or clear no-fit",
      },
      {
        id: "qualified",
        label: "Qualified",
        desc: "Align call booked / quote sent",
      },
    ],
    sampleLeads: [
      {
        reference: "SKD-20260803-A7F2",
        name: "Jordan Lee",
        email: "j***@northline.io",
        company: "Northline",
        projectType: "Product / web app",
        timeline: "1–2 months",
        budget: "$22k–$45k (Launch-sized)",
        priority: "high",
        status: "reviewing",
        createdAt: "2026-08-03T16:45:00Z",
        messagePreview:
          "Need an ops console and customer web app for our field team…",
      },
      {
        reference: "SKD-20260802-B3C1",
        name: "Alex Rivera",
        email: "a***@atelier.co",
        company: "Atelier Co",
        projectType: "Brand / marketing site",
        timeline: "ASAP — 2–4 weeks (Sprint)",
        budget: "$7.5k–$12k (Sprint-sized)",
        priority: "normal",
        status: "received",
        createdAt: "2026-08-02T11:12:00Z",
        messagePreview:
          "Launch landing with motion for a product waitlist…",
      },
      {
        reference: "SKD-20260728-C9E0",
        name: "Sam Okonkwo",
        email: "s***@gridops.app",
        company: "GridOps",
        projectType: "Dashboard / internal tool",
        timeline: "3+ months (Partner)",
        budget: "Monthly retainer ($9.5k+ / mo)",
        priority: "high",
        status: "qualified",
        createdAt: "2026-07-28T09:30:00Z",
        messagePreview:
          "Ongoing product partnership for ops dashboards…",
      },
    ],
  },
} as const satisfies StudioDictionary;
