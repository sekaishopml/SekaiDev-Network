import type { StudioDictionary } from "./types";

/** English source-of-truth copy. Keep this object structurally aligned with es. */
export const en = {
  meta: {
    title: "SekaiDev | Product engineering & brand experiences",
    description:
      "Product engineering, APIs, UX/UI, and brand sites — one senior team. Craft when it earns the click.",
    ogTitle: "SekaiDev | Product experiences that feel inevitable",
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
      label: "See selected work",
      href: "#works",
    },
    pricing: {
      label: "View investment",
      labelUpper: "VIEW INVESTMENT",
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
      "Product engineering, APIs, UX/UI, and brand sites — one senior team. Craft when it earns the click.",
    heroCtaPrimary: { label: "See if we fit", href: "#contact" },
    heroCtaSecondary: { label: "See selected work", href: "#works" },
    available: "Available for projects",
  },

  TRUST_STRIP: [
    "Reply within 24 hours",
    "Written scope before build",
    "Clear no-fit if we are not right",
  ],

  FUNNEL_PATHS: [
    {
      id: "product",
      intent: "product",
      label: "I have a product",
      hint: "Apps, APIs, dashboards — ship the next milestone.",
      href: "#offer",
    },
    {
      id: "services",
      intent: "services",
      label: "I want more requests",
      hint: "Sites & systems that convert visits into booked demand.",
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
    { label: "Investment", href: "#pricing", mobileOnly: false },
    { label: "Contact", href: "#contact", mobileOnly: false },
    { label: "Selected work", href: "#works", mobileOnly: false },
  ],

  NAV_TRUST: "Reply within 24h · written scope before build · clear no-fit",

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
    past: "PAST THE PITCH.",
    find: "FIND",
    signal: "THE STUDIO.",
    ship: "PRODUCT. API. BRAND.",
    subline: "Senior engineering + design. Motion when it converts.",
  },

  OUTCOMES: [
    {
      title: "Ship the product",
      body:
        "Web apps and platforms with auth, APIs, and realtime — clean architecture, ready for the next iteration.",
    },
    {
      title: "Design that converts",
      body:
        "UX/UI and brand sites with clear hierarchy. Motion only when it earns attention.",
    },
    {
      title: "One senior team",
      body:
        "Design-aware engineers who prototype fast, communicate clearly, and own the launch.",
    },
  ],

  FEATURED_CASE: {
    label: "Featured case",
    title: "CyTaxi",
    titleLine2: "Platform",
    role: "Full-stack product engineering",
    challenge:
      "A ride platform needed production dispatch, payments, and live tracking — not a template MVP.",
    solution:
      "Built end-to-end with Go APIs, Next.js clients, Postgres, and maps — structured for ops scale.",
    result:
      "A shippable ride platform foundation with real-time flows and a stack ready for iteration.",
    stack: ["Go", "Next.js", "Postgres", "Maps"],
    deliverables: [
      "Driver and rider product flows",
      "Dispatch and operations foundation",
      "Go API and Postgres data model",
      "Maps and live-location integration",
    ],
    decisions: [
      "Go services for core platform APIs",
      "Next.js clients for product surfaces",
      "Postgres as the operational system of record",
      "Maps built into dispatch and trip flows",
    ],
    handoff:
      "A production-ready codebase, documented platform foundation, and a clear path for the next product iterations.",
    href: null,
    outcomeNote: "Outcome detail & walkthrough available on request.",
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
      aria: "CyTaxi live trip card — pickup, route, and ETA",
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
      { value: "Full-stack", label: "Product + brand in one studio" },
      { value: "Async-first", label: "Clear updates, focused syncs" },
      { value: "Senior", label: "Small team, high ownership" },
    ],
    note:
      "Named references and case walkthroughs shared privately once we confirm fit.",
  },

  PRICING: {
    sectionLabel: "Investment",
    headline: "Pick the path that ships.",
    subline:
      "Clear USD client rates · discount already applied · written quote before build. Scroll to freeze — the price rail moves, then the page continues.",
    marketNote:
      "Studio floors sit at US boutique mid-market. Active clients get the rates below — locked in the written quote.",
    offerBanner:
      "Client discount on every engagement — compare list vs. your rate. Launch Standard is the best value for a real product.",
    scrollHint: "Scroll — compare offers",
    disclaimer:
      "Client rates shown are starting floors with the studio discount applied. Final scope, timeline, and quote confirmed in writing before build. Complexity can move the number up — never surprise you silently.",
    recommended: "Recommended",
    clientRate: "Client rate",
    tiers: [
      {
        id: "brand",
        title: "Brand Presence",
        tagline: "A site that sells who you are.",
        timeline: "3–5 weeks",
        priceWas: "$19,500",
        priceFrom: "$16,500",
        priceUnit: "USD",
        saveLabel: "Save $3,000",
        bestFor:
          "Premium brand / marketing sites with motion, CMS hooks, and conversion-first structure.",
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
        saveLabel: "Save $14,000",
        offerNote:
          "Best path for most teams — product + brand direction, full-stack build, and 30-day hypercare included at the client rate.",
        bestFor:
          "Product v1, ops console, or platform foundation you can operate and grow.",
        includes: [
          "Product + visual direction",
          "Go / Next.js / Postgres as scoped",
          "Auth, APIs, and core product flows",
          "Maps / realtime when the product needs it",
          "Staging → production + docs + 30-day hypercare",
          "Priority scheduling when you book this path",
        ],
        cta: "Start with Launch",
        intent: "launch",
        featured: true,
      },
      {
        id: "sprint",
        title: "Signal Sprint",
        tagline: "One critical milestone. Shipped.",
        timeline: "2–4 weeks",
        priceWas: "$17,500",
        priceFrom: "$14,500",
        priceUnit: "USD",
        saveLabel: "Save $3,000",
        bestFor:
          "Unblock a stuck MVP, validate UX/architecture, or ship one high-stakes slice.",
        includes: [
          "Paid discovery + written scope",
          "UX or architecture signal before build",
          "One production-grade deliverable",
          "Code review + deployment path",
          "Async updates · focused syncs",
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
        saveLabel: "Save $3,500 / mo",
        bestFor:
          "Keep shipping after launch without hiring a full in-house senior pod yet.",
        includes: [
          "Dedicated senior engineering + design hours",
          "Roadmap ownership + weekly sync",
          "Iterative shipping loops",
          "Architecture + performance care",
          "Pause or scale with 30-day notice",
        ],
        cta: "Talk partnership",
        intent: "partner",
      },
    ],
  },

  FAQ_ITEMS: [
    {
      question: "What happens in discovery?",
      answer:
        "We start with a focused conversation about the goal, users, constraints, timeline, and budget. If there is a fit, we turn that into a written scope before build work begins.",
    },
    {
      question: "What is the minimum budget?",
      answer:
        "With the client discount applied, Brand Presence and Signal Sprint start from $14,500–$16,500 USD. Launch Standard — our recommended path — starts from $48,000 USD (list $62,000). If your need is smaller, we will say so early rather than force a package.",
    },
    {
      question: "How do payments work?",
      answer:
        "Quotes are in USD, typically paid by bank or wire transfer. Before any charge, the written quote lists the deposit, milestone amounts, due dates, and deliverables. Scope changes need written approval. An invoice/factura is available on request.",
    },
    {
      question: "Do we sign a contract?",
      answer:
        "Yes. Scope, timeline, payment schedule, ownership, and revision allowance are confirmed in writing before work starts. You get clarity on what is in and out of the engagement.",
    },
    {
      question: "How many revisions are included?",
      answer:
        "Your proposal states the included review rounds and feedback deadlines. Additional rounds or scope changes are quoted separately.",
    },
    {
      question: "What if we are not a fit?",
      answer:
        "We will say so early. If the scope, timing, or working model is not right for either side, you get a clear no-fit rather than a vague sales loop.",
    },
    {
      question: "Who owns the code and design?",
      answer:
        "You do. The final handoff includes the agreed source code, design files, documentation, and the access needed to run what we build.",
    },
    {
      question: "How do the four engagements differ?",
      answer:
        "Brand Presence is a premium marketing/brand site. Signal Sprint ships one defined milestone. Launch Standard (recommended) is a full design-and-build product launch. Product Partner is ongoing senior capacity on a monthly retainer.",
    },
    {
      question: "Can you work across Ecuador and US time zones?",
      answer:
        "Yes. Ecuador is UTC−5 year-round, with working-hour overlap across US Eastern and Central time. Async updates by default; focused syncs when a decision needs a live call.",
    },
    {
      question: "How soon can we start and how long does a project take?",
      answer:
        "Timing depends on current availability and scope. Brand Presence is typically 3–5 weeks, Signal Sprint 2–4 weeks, Launch Standard 8–14 weeks, and Product Partner starts at three months.",
    },
    {
      question: "Can you stay involved after launch?",
      answer:
        "Yes. We can define a post-launch plan or continue through a Product Partner engagement when ongoing iteration, maintenance, or senior product capacity is needed.",
    },
  ],

  PROCESS: [
    {
      step: "01",
      title: "Align",
      body:
        "Goals, constraints, budget, and success metrics — written before build.",
    },
    {
      step: "02",
      title: "Prototype",
      body:
        "UX / architecture signal early so you do not pay for the wrong direction.",
    },
    {
      step: "03",
      title: "Build",
      body:
        "Production-quality loops with clear owners and async updates.",
    },
    {
      step: "04",
      title: "Launch",
      body:
        "Ship, hand off, and leave a next-step roadmap — not a black box.",
    },
  ],

  PROCESS_SECTION: {
    label: "03 — METHOD",
    headline: "Written first.",
    headlineAccent: "Then we build.",
    subline:
      "How the studio shows up — and the four-step path from alignment to launch.",
    boardLabel: "Run sheet",
    boardFlow: "Align → Prototype → Build → Launch",
  },

  WORKS_SECTION: {
    label: "06 — WHAT WE BUILD",
    headline: "CAPABILITIES",
    subline:
      "Examples of surfaces we ship — product systems, brand sites, APIs, and ops tools. Ask for a private walkthrough of named work when we confirm fit.",
  },

  WORKS: [
    {
      id: "01",
      slug: "crm",
      title: "CRM systems",
      kind: "Capability",
      challenge: "Pipelines, contacts, and ops in one product surface.",
      result: "Clean data model, roles, and workflows teams can run daily.",
      tags: "Go · Next.js · Postgres",
      href: "#contact",
    },
    {
      id: "02",
      slug: "websites",
      title: "Product websites",
      kind: "Capability",
      challenge: "Brand sites that feel premium and convert.",
      result: "Clear hierarchy, motion with intent, CTAs that earn the click.",
      tags: "Next.js · Tailwind · GSAP",
      href: "#contact",
    },
    {
      id: "03",
      slug: "api",
      title: "API & backends",
      kind: "Capability",
      challenge: "Secure APIs without technical debt.",
      result: "Auth, data models, and services startups can extend.",
      tags: "Go · FastAPI · PostgreSQL",
      href: "#contact",
    },
    {
      id: "04",
      slug: "dashboards",
      title: "Dashboards",
      kind: "Capability",
      challenge: "Ops interfaces teams actually use.",
      result: "Clear data views, alerts, and native-feeling workflows.",
      tags: "React · Charts · Realtime",
      href: "#contact",
    },
  ],

  ABOUT: {
    label: "09 — ABOUT",
    headlineLine1: "A SMALL",
    headlineLine2: "SENIOR STUDIO",
    body1:
      "SEKAIDEV is a compact senior studio based in Ecuador, working remotely across Latin America and beyond. We build products, APIs, UX/UI, and brand sites for startups and brands.",
    body2:
      "You work directly with the builders responsible for architecture, design craft, and launch, with clear communication from the first call through handoff.",
    pillars: [
      { label: "PRODUCT", detail: "Web apps & platforms that ship" },
      { label: "SYSTEMS", detail: "APIs, data, and cloud backends" },
      { label: "DESIGN", detail: "UX/UI, brand sites, motion with intent" },
    ],
  },

  CONTACT_COPY: {
    sectionLabel: "Contact",
    headlineLine1: "TELL US",
    headlineLine2: "WHAT YOU'RE BUILDING",
    subline:
      "Goal, timeline, and budget range — we reply within 24 hours with next steps or a clear no-fit.",
    trustLine:
      "Reply within 24h · written scope before build · clear no-fit if we are not right",
    fields: {
      name: { label: "Name" },
      email: { label: "Email" },
      company: { label: "Company", hint: "Optional — helps us prep." },
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
    optionalDetails: "Timeline, type & context — optional",
    submit: { idle: "See if we fit", sending: "Sending…" },
    successTitle: "Inquiry received",
    successBody:
      "We'll reply within 24 hours with next steps — or a clear no-fit.",
    privacyNote: "No mailing lists. Your details go straight to the studio.",
    whatsappPrefill:
      "Hi SekaiDev — I'd like to see if we fit for a project.",
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
    choosePath: "Choose your path",
    scrollExplore: "Scroll to explore",
    skipIntro: "Skip intro",
    stillFit: "Still a fit?",
    footerRights: "ALL RIGHTS RESERVED.",
    footerStack: "NEXT.JS · THREE.JS · GO · POSTGRES",
    offerLabel: "01 — OFFER",
    offerHeadline: "What we",
    offerHeadlineAccent: "deliver.",
    offerSubline:
      "Product engineering, design, and systems — scoped clearly, shipped by one senior team.",
    proofLabel: "03 — METHOD",
    proofHeadline: "Written first.",
    faqLabel: "05 — FAQ",
    faqHeadline: "Clear before we begin.",
    faqSubline: "The practical details, answered plainly.",
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
