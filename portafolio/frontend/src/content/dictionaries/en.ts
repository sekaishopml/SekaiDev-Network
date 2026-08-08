import type { StudioDictionary } from "./types";

/** English source-of-truth copy. Keep this object structurally aligned with es. */
export const en = {
  meta: {
    title: "SekaiDev | Apps, APIs & brand sites",
    description:
      "Senior product engineering from Ecuador: web apps, APIs, UX/UI, and brand sites. One small team you work with directly.",
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
      "Web apps, APIs, UX/UI, and brand sites. Small senior team based in Ecuador, working with clients across LatAm and the US.",
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
    subline: "Senior engineering and design from Ecuador.",
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
        "A small senior team — not a handoff chain. We own architecture, design, and the launch together.",
    },
  ],

  FEATURED_CASE: {
    label: "Featured case",
    title: "CyTaxi",
    titleLine2: "Platform",
    role: "Full-stack product engineering",
    challenge:
      "A ride platform needed live dispatch, payments, and tracking that could run in production.",
    solution:
      "We built it with Go APIs, Next.js clients, Postgres, and maps, shaped for day-to-day ops.",
    result:
      "A working platform base with real-time trip flows and room to add the next features.",
    stack: ["Go", "Next.js", "Postgres", "Maps"],
    deliverables: [
      "Driver and rider product flows",
      "Dispatch and operations base",
      "Go API and Postgres data model",
      "Maps and live-location integration",
    ],
    decisions: [
      "Go for the core platform APIs",
      "Next.js for the product interfaces",
      "Postgres as the system of record",
      "Maps inside dispatch and trip flows",
    ],
    handoff:
      "Production codebase, docs for the platform, and a clear list of what to build next.",
    href: null,
    outcomeNote: "Detailed results and a walkthrough available on request.",
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
      aria: "CyTaxi live trip card: pickup, route, and ETA",
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
      "USD starting prices. Scroll sideways to compare. We confirm the final number in writing before any build.",
    marketNote:
      "We price in line with serious US studio work. The numbers below are the client rates we quote from.",
    offerBanner:
      "List price vs. client rate is shown on each package. Launch Standard is the usual pick for a full product.",
    scrollHint: "Scroll to compare packages",
    disclaimer:
      "These are starting prices with our client rate applied. Scope, timeline, and final quote come in writing before build. If the work grows, we say so before the price moves.",
    recommended: "Recommended",
    clientRate: "Client rate",
    tiers: [
      {
        id: "brand",
        title: "Brand Presence",
        tagline: "A site that explains who you are and what to do next.",
        timeline: "3–5 weeks",
        priceWas: "$19,500",
        priceFrom: "$16,500",
        priceUnit: "USD",
        bestFor:
          "Brand or marketing sites with custom motion, CMS hooks, and a clear path to convert.",
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
        priceWas: "$62,000",
        priceFrom: "$48,000",
        priceUnit: "USD",
        offerNote:
          "Usual choice for a real product: direction, full-stack build, launch, and 30 days of post-launch support.",
        bestFor:
          "Product v1, ops console, or platform base your team can run day to day.",
        includes: [
          "Product + visual direction",
          "Go / Next.js / Postgres as scoped",
          "Auth, APIs, and core product flows",
          "Maps / realtime when the product needs it",
          "Staging → production + docs + 30 days post-launch support",
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
        priceWas: "$17,500",
        priceFrom: "$14,500",
        priceUnit: "USD",
        bestFor:
          "Unblock a stuck MVP, check UX or architecture early, or ship one important slice.",
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
        tagline: "Senior capacity on your roadmap.",
        timeline: "3+ months · monthly",
        priceWas: "$22,000",
        priceFrom: "$18,500",
        priceUnit: "USD / mo",
        bestFor:
          "Keep building after launch without hiring a full senior team yet.",
        includes: [
          "Senior engineering and design hours each month",
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
        "Brand Presence and Signal Sprint start from $14,500–$16,500 USD. Launch Standard — the usual full product launch — starts from $48,000 (list $62,000). Product Partner is from $18,500/month. If your budget is below that floor, we will tell you early instead of stretching a bad fit.",
    },
    {
      question: "Which engagement should I pick?",
      answer:
        "Brand Presence: a serious marketing or brand site. Signal Sprint: one defined milestone when you need signal fast. Launch Standard (recommended): design + build for a real product launch. Product Partner: senior capacity on retainer when the roadmap does not pause after ship.",
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
        "Yes. We can leave a short post-launch plan, or continue through Product Partner when you need iteration, maintenance, or senior product capacity without hiring a full team.",
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
    label: "03 — METHOD",
    headline: "Scope on paper.",
    headlineAccent: "Then we build.",
    subline:
      "How we work with clients, from the first call through launch.",
    boardLabel: "Steps",
    boardFlow: "Align → Prototype → Build → Launch",
  },

  WORKS_SECTION: {
    label: "Capabilities",
    headline: "Where we ship.",
    subline:
      "Product systems, brand sites, APIs, and ops tools. Ask for a private walkthrough of named work once we confirm fit.",
    needLabel: "Need",
    outcomeLabel: "Outcome",
  },

  WORKS: [
    {
      id: "01",
      slug: "crm",
      title: "CRM systems",
      kind: "Capability",
      challenge: "Pipelines, contacts, and ops in one place.",
      result: "A clean data model, roles, and workflows teams can run daily.",
      tags: "Go · Next.js · Postgres",
      href: "#contact",
    },
    {
      id: "02",
      slug: "websites",
      title: "Product websites",
      kind: "Capability",
      challenge: "Brand sites that look serious and convert.",
      result: "Clear hierarchy, restrained motion, and CTAs people can follow.",
      tags: "Next.js · Tailwind · GSAP",
      href: "#contact",
    },
    {
      id: "03",
      slug: "api",
      title: "API & backends",
      kind: "Capability",
      challenge: "Secure APIs that do not trap you later.",
      result: "Auth, data models, and services you can extend.",
      tags: "Go · FastAPI · PostgreSQL",
      href: "#contact",
    },
    {
      id: "04",
      slug: "dashboards",
      title: "Dashboards",
      kind: "Capability",
      challenge: "Ops screens teams will actually open every day.",
      result: "Clear data views, alerts, and simple workflows.",
      tags: "React · Charts · Realtime",
      href: "#contact",
    },
  ],

  ABOUT: {
    label: "About",
    headlineLine1: "A SMALL",
    headlineLine2: "SENIOR TEAM",
    body1:
      "SekaiDev is a small senior team based in Ecuador. We work remotely with clients across Latin America and the US on products, APIs, UX/UI, and brand sites.",
    body2:
      "You talk directly with the people building the work — architecture, design, and launch — from the first call through handoff.",
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
    "$14.5k–$22k (Sprint / Brand)",
    "$22k–$48k",
    "$48k–$90k (Launch-sized)",
    "$90k+",
    "Monthly retainer ($18.5k+ / mo)",
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
      "Product engineering, design, and systems from one senior team — written scope first, then the work.",
    proofLabel: "03 — METHOD",
    proofHeadline: "Scope on paper.",
    faqLabel: "05 — FAQ",
    faqHeadline: "Ask before you buy.",
    faqSubline:
      "Clear answers on fit, money, ownership, and timelines — so you can decide without a sales maze.",
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
          "Need a dispatch console + rider web — similar to CyTaxi scope…",
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
