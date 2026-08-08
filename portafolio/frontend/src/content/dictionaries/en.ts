import type { StudioDictionary } from "./types";

/** English source-of-truth copy. Keep this object structurally aligned with es. */
export const en = {
    meta: {
    title: "SekaiDev | Custom apps, sites & systems",
    description:
      "We design and build apps, websites, and systems from Ecuador. Small team — you talk to the people who code.",
    ogTitle: "SekaiDev | Apps, sites & systems from Ecuador",
    keywords: [
      "software studio Ecuador",
      "custom web apps",
      "business websites Ecuador",
      "Next.js development Ecuador",
      "UX UI Ecuador",
      "product studio LatAm",
      "Ecuador",
      "Latin America",
    ],
  },

  langSwitch: { label: "Language", en: "EN", es: "ES" },

  CTAS: {
    primary: {
      label: "Let's talk about your project",
      labelUpper: "LET'S TALK ABOUT YOUR PROJECT",
      href: "#contact",
    },
    secondary: {
      label: "See what we do",
      href: "#works",
    },
    pricing: {
      label: "See pricing",
      labelUpper: "SEE PRICING",
      href: "#pricing",
    },
    featuredCase: "I want something like this",
    pricingFoot: "Request a quote",
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
    eyebrow: "Software studio for",
    tagline: "We design your product and leave it ready to use.",
    subline:
      "Custom apps, websites, and systems. Small team in Ecuador — also working with clients across LatAm and the US.",
    heroCtaPrimary: {
      label: "Let's talk about your project",
      href: "#contact",
    },
    heroCtaSecondary: { label: "See what we do", href: "#works" },
    available: "Open for new projects",
  },

  TRUST_STRIP: [
    "We reply within 24 hours",
    "You get a written plan before we build",
    "If we are not the right team, we say so",
  ],

  FUNNEL_PATHS: [
    {
      id: "product",
      intent: "product",
      label: "I have an idea or a product",
      hint: "An app, panel, or system that needs to get built and launched.",
      href: "#offer",
    },
    {
      id: "services",
      intent: "services",
      label: "I want more customers",
      hint: "A site or system that turns visits into messages, bookings, or sales.",
      href: "#pricing",
    },
  ],

  NAV_LINKS: [
    { label: "What we do", href: "#offer", mobileOnly: false },
    {
      label: "For startups",
      href: "#offer",
      mobileOnly: true,
      intent: "product",
    },
    {
      label: "For businesses",
      href: "#pricing",
      mobileOnly: true,
      intent: "services",
    },
    { label: "How we work", href: "#process", mobileOnly: false },
    { label: "Pricing", href: "#pricing", mobileOnly: false },
    { label: "Contact", href: "#contact", mobileOnly: false },
    { label: "FAQ", href: "#faq", mobileOnly: false },
  ],

  NAV_TRUST:
    "Reply within 24h · written plan first · honest if we are not a fit",

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
      title: "Apps and platforms",
      body:
        "Login, panels, and the tools your team uses every day. Built so you can keep improving after launch.",
    },
    {
      title: "Sites that sell your work",
      body:
        "Clear sites: who you are, what you offer, and what to do next. Animation only when it helps people understand.",
    },
    {
      title: "You talk to who builds it",
      body:
        "No middlemen. The same people design, code, and stay with you through launch.",
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
    headline: "Clear prices. Written quote first.",
    subline:
      "Starting amounts in USD for Ecuador and LatAm. Scroll to compare. Final number confirmed in writing before we build.",
    marketNote:
      "Above a template website. Below US agency list rates.",
    offerBanner:
      "Each package shows list price and your price. Launch Standard is usually the pick for a full product.",
    scrollHint: "Scroll to compare packages",
    disclaimer:
      "These are starting prices. Scope, dates, and final quote come in writing. If the work grows, we tell you before the price moves.",
    recommended: "Recommended",
    clientRate: "Your price",
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
          "A custom brand or marketing site with a clear path to get contacted or buy — not a template.",
        includes: [
          "Design and structure built to convert",
          "Custom Next.js site",
          "Motion that matches your brand",
          "SEO and analytics baseline",
          "Testing, go-live, and handoff",
        ],
        cta: "I want a brand site",
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
          "The usual pick: design, full build, launch, and 30 days of support.",
        bestFor:
          "Your first product version, an ops panel, or a platform base your team can run every day.",
        includes: [
          "Product and design direction",
          "Stack that fits the project (Go, Next.js, Postgres…)",
          "Login, APIs, and core flows",
          "Integrations or realtime when needed",
          "Go-live, docs, and 30 days of support",
        ],
        cta: "Start with Launch",
        intent: "launch",
        featured: true,
      },
      {
        id: "sprint",
        title: "Signal Sprint",
        tagline: "One concrete milestone, delivered.",
        timeline: "2–4 weeks",
        priceWas: "$8,900",
        priceFrom: "$6,800",
        priceUnit: "USD",
        bestFor:
          "When you need to unblock an MVP, check design or architecture, or ship one important piece fast.",
        includes: [
          "Kickoff call + written plan",
          "UX or architecture review before build",
          "One deliverable ready to use",
          "Code review and how to publish it",
          "Updates by message and a few short calls",
        ],
        cta: "Request a sprint",
        intent: "sprint",
      },
      {
        id: "partner",
        title: "Product Partner",
        tagline: "Keep building month to month.",
        timeline: "3+ months · monthly",
        priceWas: "$5,200",
        priceFrom: "$3,800",
        priceUnit: "USD / mo",
        bestFor:
          "After launch, when you want to keep improving without hiring a full team yet.",
        includes: [
          "Monthly engineering and design hours",
          "Shared plan + weekly meeting",
          "Steady delivery rhythm",
          "Speed and architecture care",
          "Pause or scale with 30 days notice",
        ],
        cta: "Talk about a partnership",
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
      title: "Understand",
      body:
        "Goals, limits, budget, and what success looks like — written before we build.",
    },
    {
      step: "02",
      title: "Design",
      body:
        "We check screens or architecture early so you do not pay for the wrong direction.",
    },
    {
      step: "03",
      title: "Build",
      body:
        "Real work, clear owners, and progress you can see often.",
    },
    {
      step: "04",
      title: "Launch",
      body:
        "We go live, hand everything over, and leave a short plan for what comes next.",
    },
  ],

  PROCESS_SECTION: {
    label: "02 — METHOD",
    headline: "Written plan first.",
    headlineAccent: "Then we build.",
    subline:
      "From the first call to launch — same people, clear plan from day one.",
    boardLabel: "Steps",
    boardFlow: "Understand → Design → Build → Launch",
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
    submit: { idle: "Send message", sending: "Sending…" },
    successTitle: "Got your message",
    successBody:
      "We reply within 24 hours with next steps, or tell you clearly if we are not a fit.",
    privacyNote: "No mailing lists. Your note goes to the team that builds.",
    whatsappPrefill: "Hi SekaiDev, I want to talk about a project.",
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
    stillFit: "Still talking?",
    footerRights: "ALL RIGHTS RESERVED.",
    footerStack: "NEXT.JS · THREE.JS · GO · POSTGRES",
    offerLabel: "01 — OFFER",
    offerHeadline: "What we",
    offerHeadlineAccent: "build.",
    offerSubline:
      "Apps, brand sites, systems, and internal tools — end to end with the same small team.",
    offerPromise:
      "You talk to who builds. Written plan before we start. Honest if we are not a fit.",
    proofLabel: "02 — METHOD",
    proofHeadline: "Written plan first.",
    faqLabel: "05 — FAQ",
    faqHeadline: "Common questions.",
    faqSubline:
      "Fit, money, who owns the code, and timelines — answered before you spend time on a call.",
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
