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
        "Web apps and platforms — auth, APIs, realtime — clean architecture, documented for future iteration.",
    },
    {
      title: "Design that converts",
      body:
        "UX/UI and brand sites with clear hierarchy. Motion and 3D as craft, not the whole offer.",
    },
    {
      title: "One senior team",
      body:
        "Design-aware engineers who prototype fast, communicate clearly, and own launch.",
    },
  ],

  FEATURED_CASE: {
    label: "Featured case",
    title: "CyTaxi Platform",
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
    headline: "Clear ways to work together.",
    subline:
      "USD · starting ranges · written quote before build. Three engagement shapes, scoped after a short discovery call.",
    disclaimer:
      "Final scope, timeline, and quote confirmed in writing before any build starts.",
    recommended: "Recommended",
    tiers: [
      {
        id: "sprint",
        title: "Signal Sprint",
        tagline: "One milestone. Shipped.",
        timeline: "2–4 weeks",
        priceFrom: "From $7,500 USD",
        bestFor: "Validate UX, ship a feature slice, or unblock a stuck MVP.",
        includes: [
          "Discovery call + written scope",
          "UX / architecture signal before build",
          "One defined deliverable",
          "Production-quality code + handoff",
          "Async updates · 1–2 syncs",
        ],
        cta: "Start a sprint",
        intent: "sprint",
      },
      {
        id: "launch",
        title: "Launch Standard",
        tagline: "Design, build, and ship.",
        timeline: "6–10 weeks",
        priceFrom: "From $22,000 USD",
        bestFor:
          "Brand site, product v1, or platform foundation you can operate.",
        includes: [
          "Product + visual direction",
          "Full-stack build as scoped",
          "Staging → production launch",
          "Analytics / auth hooks where needed",
          "Docs + post-launch plan",
        ],
        cta: "Scope a launch",
        intent: "launch",
        featured: true,
      },
      {
        id: "partner",
        title: "Product Partner",
        tagline: "Senior capacity on your roadmap.",
        timeline: "3+ months · monthly",
        priceFrom: "From $9,500 USD / mo",
        bestFor: "Steady velocity without hiring in-house yet.",
        includes: [
          "Dedicated senior engineering time",
          "Roadmap + weekly sync",
          "Iterative shipping loops",
          "Architecture ownership",
          "Pause / scale with 30-day notice",
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
        "Signal Sprint starts from $7,500 USD for one defined milestone. If your need is smaller than that, we will say so early and point you toward a better-fit path rather than force a package.",
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
      question:
        "How do Signal Sprint, Launch Standard, and Product Partner differ?",
      answer:
        "Signal Sprint is for one defined milestone. Launch Standard covers a larger design-and-build release. Product Partner is ongoing senior capacity for teams with a continuing roadmap.",
    },
    {
      question: "Can you work across Ecuador and US time zones?",
      answer:
        "Yes. Ecuador is UTC−5 year-round, with working-hour overlap across US Eastern and Central time. Async updates by default; focused syncs when a decision needs a live call.",
    },
    {
      question: "How soon can we start and how long does a project take?",
      answer:
        "Timing depends on current availability and scope. A Signal Sprint is typically 2–4 weeks, Launch Standard 6–10 weeks, and Product Partner starts at three months.",
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
    label: "04 — PROCESS",
    headline: "Align → Launch",
    subline: "Four steps. Written scope first. No black-box builds.",
  },

  WORKS_SECTION: {
    label: "07 — WHAT WE BUILD",
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
    "$7.5k–$12k (Sprint-sized)",
    "$12k–$22k",
    "$22k–$45k (Launch-sized)",
    "$45k+",
    "Monthly retainer ($9.5k+ / mo)",
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
    offerHeadline: "What we deliver",
    proofLabel: "03 — PROOF",
    proofHeadline: "How we show up",
    faqLabel: "06 — FAQ",
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
