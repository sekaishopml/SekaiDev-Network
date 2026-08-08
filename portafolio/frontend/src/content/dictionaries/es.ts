import type { StudioDictionary } from "./types";

/**
 * Español latinoamericano (Ecuador).
 * El tono prioriza claridad comercial y criterio técnico sobre traducción literal.
 */
export const es = {
  meta: {
    title: "SekaiDev | Apps, APIs y sitios de marca",
    description:
      "Ingeniería de producto senior desde Ecuador: apps web, APIs, UX/UI y sitios de marca. Un equipo pequeño con el que hablas directo.",
    ogTitle: "SekaiDev | Ingeniería de producto desde Ecuador",
    keywords: [
      "ingeniería de producto",
      "estudio de software",
      "desarrollo de apps web",
      "desarrollo de APIs",
      "diseño UX/UI",
      "experiencias de marca",
      "Ecuador",
      "Latinoamérica",
    ],
  },

  langSwitch: { label: "Idioma", en: "EN", es: "ES" },

  CTAS: {
    primary: {
      label: "Ver si encajamos",
      labelUpper: "VER SI ENCAJAMOS",
      href: "#contact",
    },
    secondary: {
      label: "Ver qué construimos",
      href: "#works",
    },
    pricing: {
      label: "Ver precios",
      labelUpper: "VER PRECIOS",
      href: "#pricing",
    },
    featuredCase: "Conversemos sobre un proyecto similar",
    pricingFoot: "Solicitar una cotización a medida",
    whatsapp: {
      label: "WhatsApp",
      labelUpper: "WHATSAPP",
    },
  },

  STUDIO: {
    brand: "SEKAIDEV",
    email: "hello@sekaidevec.com",
    siteUrl: "https://portafolio.sekaidevec.com",
    icp: "startups y marcas",
    eyebrow: "Estudio full-stack para",
    tagline: "Diseñamos y lanzamos tu producto.",
    subline:
      "Apps web, APIs, UX/UI y sitios de marca. Equipo senior pequeño en Ecuador, con clientes en LatAm y EE. UU.",
    heroCtaPrimary: { label: "Ver si encajamos", href: "#contact" },
    heroCtaSecondary: {
      label: "Ver qué construimos",
      href: "#works",
    },
    available: "Disponible para proyectos",
  },

  TRUST_STRIP: [
    "Respondemos en menos de 24 horas",
    "Alcance por escrito antes de construir",
    "Te lo decimos pronto si no somos el equipo adecuado",
  ],

  FUNNEL_PATHS: [
    {
      id: "product",
      intent: "product",
      label: "Tengo un producto",
      hint: "Apps, APIs o dashboards que necesitan construirse y lanzarse.",
      href: "#offer",
    },
    {
      id: "services",
      intent: "services",
      label: "Quiero generar más oportunidades",
      hint: "Un sitio o sistema que convierte visitas en reservas y leads reales.",
      href: "#pricing",
    },
  ],

  NAV_LINKS: [
    { label: "Qué resolvemos", href: "#offer", mobileOnly: false },
    {
      label: "Para startups",
      href: "#offer",
      mobileOnly: true,
      intent: "product",
    },
    {
      label: "Para empresas de servicios",
      href: "#pricing",
      mobileOnly: true,
      intent: "services",
    },
    { label: "Cómo trabajamos", href: "#process", mobileOnly: false },
    { label: "Precios", href: "#pricing", mobileOnly: false },
    { label: "Contacto", href: "#contact", mobileOnly: false },
    { label: "Preguntas", href: "#faq", mobileOnly: false },
  ],

  NAV_TRUST:
    "Respuesta en menos de 24 h · alcance por escrito · honestos si no encajamos",

  INDUSTRIES: [
    "Startup / producto",
    "Barbería / salón",
    "Restaurante / hospitalidad",
    "Estudio jurídico",
    "Estudio de arquitectura / diseño",
    "Ecommerce",
    "Publicidad / agencia",
    "Otro",
  ],

  LOOK_COPY: {
    look: "MIRA",
    closer: "MÁS DE CERCA.",
    past: "",
    find: "ESTO",
    signal: "ES EL TRABAJO.",
    ship: "APPS · APIS · SITIOS DE MARCA",
    subline: "Ingeniería y diseño senior desde Ecuador.",
  },

  OUTCOMES: [
    {
      title: "Apps y plataformas",
      body:
        "Auth, APIs y funciones en vivo cuando hacen falta. Hecho para que tu equipo pueda seguir cambiando el producto después del lanzamiento.",
    },
    {
      title: "Sitios que venden el trabajo",
      body:
        "Sitios de marca y marketing con estructura clara. Animación solo si ayuda a entender o a actuar.",
    },
    {
      title: "Hablas con quien construye",
      body:
        "Un equipo senior pequeño, sin cadena de handoffs. Arquitectura, diseño y lanzamiento con las mismas personas.",
    },
  ],

  FEATURED_CASE: {
    label: "Caso destacado",
    title: "CyTaxi",
    titleLine2: "Platform",
    role: "Ingeniería de producto full-stack",
    challenge:
      "Una plataforma de movilidad necesitaba despacho en vivo, pagos y seguimiento listos para producción.",
    solution:
      "Lo armamos con APIs en Go, clientes en Next.js, Postgres y mapas, pensado para la operación del día a día.",
    result:
      "Una base de plataforma operativa, con flujos de viaje en tiempo real y espacio para sumar lo que sigue.",
    stack: ["Go", "Next.js", "Postgres", "Maps"],
    deliverables: [
      "Flujos de producto para conductores y pasajeros",
      "Base para despacho y operaciones",
      "API en Go y modelo de datos en Postgres",
      "Integración de mapas y ubicación en vivo",
    ],
    decisions: [
      "Servicios en Go para las APIs centrales de la plataforma",
      "Clientes en Next.js para las interfaces del producto",
      "Postgres como fuente operativa de verdad",
      "Mapas integrados en los flujos de despacho y viaje",
    ],
    handoff:
      "Código listo para producción, documentación de la plataforma y una lista clara de qué construir después.",
    href: null,
    outcomeNote:
      "Resultados detallados y un recorrido del caso disponibles bajo solicitud.",
    labels: {
      challenge: "Reto",
      solution: "Solución",
      delivered: "Entregado",
      decisions: "Decisiones clave",
      result: "Resultado",
      handoff: "Entrega",
      buildNotes: "Notas de construcción",
    },
    stageUi: {
      aria: "Tarjeta de viaje CyTaxi: origen, ruta y ETA",
      product: "CyTaxi",
      live: "En vivo",
      status: "En camino",
      pickup: "Origen",
      dropoff: "Destino",
      pickupPlace: "Centro",
      dropoffPlace: "Aeropuerto",
      eta: "ETA 6 min",
    },
  },

  PROOF: {
    metrics: [
      { value: "24 h", label: "Ventana típica de respuesta" },
      { value: "UTC−5", label: "Ecuador · traslape con EE. UU. Este/Central" },
      { value: "Por escrito", label: "Alcance antes de empezar a construir" },
    ],
    note:
      "Compartimos referencias y recorridos de casos en privado cuando confirmamos que hay encaje.",
  },

  PRICING: {
    sectionLabel: "Precios",
    headline: "Paquetes claros. Cotización por escrito primero.",
    subline:
      "Precios iniciales en USD. Desliza de lado para comparar. El número final lo confirmamos por escrito antes de construir.",
    marketNote:
      "Nos alineamos a tarifas de estudios serios en EE. UU. Abajo están las tarifas cliente desde las que cotizamos.",
    offerBanner:
      "En cada paquete ves precio de lista y tarifa cliente. Launch Standard suele ser la opción para un producto completo.",
    scrollHint: "Desliza para comparar paquetes",
    disclaimer:
      "Estos son precios de entrada con tarifa cliente. Alcance, cronograma y cotización final van por escrito antes de construir. Si el trabajo crece, lo decimos antes de subir el precio.",
    recommended: "Recomendable",
    clientRate: "Tarifa cliente",
    tiers: [
      {
        id: "brand",
        title: "Brand Presence",
        tagline: "Un sitio que explica quién eres y qué hacer después.",
        timeline: "3–5 semanas",
        priceWas: "$19,500",
        priceFrom: "$16,500",
        priceUnit: "USD",
        bestFor:
          "Sitios de marca o marketing con motion a medida, CMS y un camino claro para convertir.",
        includes: [
          "Dirección de arte + wireframes de conversión",
          "Front end a medida en Next.js",
          "Sistema de motion alineado a la marca",
          "Base de SEO / analítica",
          "Lanzamiento staging → producción + entrega",
        ],
        cta: "Definir un sitio de marca",
        intent: "brand",
      },
      {
        id: "launch",
        title: "Launch Standard",
        tagline: "Diseñar, construir y lanzar el producto.",
        timeline: "8–14 semanas",
        priceWas: "$62,000",
        priceFrom: "$48,000",
        priceUnit: "USD",
        offerNote:
          "La opción habitual para un producto real: dirección, build full-stack, lanzamiento y 30 días de soporte después de salir.",
        bestFor:
          "Producto v1, consola operativa o base de plataforma que tu equipo pueda operar día a día.",
        includes: [
          "Dirección de producto y visual",
          "Go / Next.js / Postgres según alcance",
          "Auth, APIs y flujos centrales del producto",
          "Mapas / tiempo real cuando el producto lo pida",
          "Staging → producción + docs + 30 días de soporte post-lanzamiento",
        ],
        cta: "Empezar con Launch",
        intent: "launch",
        featured: true,
      },
      {
        id: "sprint",
        title: "Signal Sprint",
        tagline: "Un hito definido, entregado.",
        timeline: "2–4 semanas",
        priceWas: "$17,500",
        priceFrom: "$14,500",
        priceUnit: "USD",
        bestFor:
          "Destrabar un MVP, revisar UX o arquitectura a tiempo, o lanzar una porción importante.",
        includes: [
          "Llamada de descubrimiento + alcance por escrito",
          "Revisión de UX o arquitectura antes de construir",
          "Un entregable listo para producción",
          "Revisión de código + ruta de despliegue",
          "Actualizaciones async y algunas llamadas puntuales",
        ],
        cta: "Iniciar un sprint",
        intent: "sprint",
      },
      {
        id: "partner",
        title: "Product Partner",
        tagline: "Capacidad senior sobre tu roadmap.",
        timeline: "3+ meses · mensual",
        priceWas: "$22,000",
        priceFrom: "$18,500",
        priceUnit: "USD / mes",
        bestFor:
          "Seguir construyendo después del lanzamiento sin contratar aún un equipo senior completo.",
        includes: [
          "Horas mensuales de ingeniería y diseño senior",
          "Roadmap compartido + reunión semanal",
          "Ciclos estables de entrega",
          "Cuidado de arquitectura y rendimiento",
          "Pausa o escala con 30 días de aviso",
        ],
        cta: "Conversar sobre una alianza",
        intent: "partner",
      },
    ],
  },

  FAQ_ITEMS: [
    {
      question: "¿Qué pasa después de escribirnos?",
      answer:
        "Recibes una respuesta real en menos de 24 horas — no un autoresponder. Pedimos solo lo necesario para ver si encajamos: objetivo, usuarios, plazos y presupuesto. Si tiene sentido, enviamos un alcance escrito antes de construir. Si no, te lo decimos y paramos ahí.",
    },
    {
      question: "¿Cuánto cuesta trabajar con ustedes?",
      answer:
        "Brand Presence y Signal Sprint empiezan desde $14,500–$16,500 USD. Launch Standard — el lanzamiento completo habitual — desde $48,000 (lista $62,000). Product Partner desde $18,500/mes. Si tu presupuesto está por debajo, te lo diremos pronto en vez de forzar un mal encaje.",
    },
    {
      question: "¿Qué modalidad me conviene?",
      answer:
        "Brand Presence: un sitio de marca o marketing serio. Signal Sprint: un hito definido cuando necesitas señal rápido. Launch Standard (recomendable): diseño + desarrollo para un lanzamiento real. Product Partner: capacidad senior en retainer cuando el roadmap no se detiene después del ship.",
    },
    {
      question: "¿Cómo funcionan pagos y contrato?",
      answer:
        "Cotizamos en USD, normalmente por transferencia. Antes de cualquier cobro recibes una cotización escrita con depósito, hitos, fechas y entregables — más qué está dentro y fuera del alcance. Confirmamos por escrito propiedad, rondas de revisión y calendario de pagos. Los cambios de alcance requieren aprobación escrita. Factura bajo pedido.",
    },
    {
      question: "¿Quién es dueño del código y del diseño?",
      answer:
        "Tú. La entrega incluye el código acordado, archivos de diseño, documentación y los accesos para operar y extender lo que lanzamos. Sin repos rehenes. Sin licencias sorpresa.",
    },
    {
      question: "¿Pueden trabajar con equipos en EE. UU. y LatAm?",
      answer:
        "Sí. Estamos en Ecuador (UTC−5 todo el año) con buen solape para las zonas Este y Central de EE. UU. Async por defecto — avances claros por escrito — y llamadas cortas solo cuando una decisión lo pide.",
    },
    {
      question: "¿Cuánto tarda un proyecto?",
      answer:
        "Rangos típicos una vez arrancamos: Brand Presence 3–5 semanas, Signal Sprint 2–4 semanas, Launch Standard 8–14 semanas. Product Partner abre en tres meses. La fecha de inicio depende de la capacidad actual; te damos una ventana honesta en la primera llamada.",
    },
    {
      question: "¿Qué pasa si no encajamos?",
      answer:
        "Preferimos perder un deal a tomar el proyecto equivocado. Alcance, timing o forma de trabajo incorrectos: te lo decimos claro y liberamos a las dos partes.",
    },
    {
      question: "¿Pueden seguir después del lanzamiento?",
      answer:
        "Sí. Podemos dejar un plan corto pos-lanzamiento, o continuar con Product Partner cuando necesites iteración, mantenimiento o capacidad senior sin contratar un equipo completo.",
    },
  ],

  PROCESS: [
    {
      step: "01",
      title: "Alinear",
      body:
        "Objetivos, límites, presupuesto y qué cuenta como éxito, por escrito antes de construir.",
    },
    {
      step: "02",
      title: "Prototipar",
      body:
        "Revisamos UX o arquitectura a tiempo para que no pagues la dirección equivocada.",
    },
    {
      step: "03",
      title: "Construir",
      body:
        "Trabajo de producción con responsables claros y actualizaciones async regulares.",
    },
    {
      step: "04",
      title: "Lanzar",
      body:
        "Lanzamos, entregamos el proyecto y dejamos un plan corto de lo que sigue.",
    },
  ],

  PROCESS_SECTION: {
    label: "03 — MÉTODO",
    headline: "Alcance por escrito.",
    headlineAccent: "Después construimos.",
    subline:
      "Cómo trabajamos con clientes, desde la primera llamada hasta el lanzamiento.",
    boardLabel: "Pasos",
    boardFlow: "Alinear → Prototipar → Construir → Lanzar",
  },

  WORKS_SECTION: {
    label: "Capacidades",
    headline: "Dónde entregamos.",
    subline:
      "Sistemas de producto, sitios de marca, APIs y herramientas de ops. Pide un recorrido privado de proyectos con nombre cuando confirmemos encaje.",
    needLabel: "Necesidad",
    outcomeLabel: "Resultado",
  },

  WORKS: [
    {
      id: "01",
      slug: "crm",
      title: "CRM y sistemas de ops",
      kind: "Producto",
      challenge: "Pipelines, contactos y ops en un solo lugar.",
      result:
        "Modelo de datos, roles y flujos que tu equipo puede usar a diario — sin parches.",
      tags: "Go · Next.js · Postgres",
      href: "#contact",
    },
    {
      id: "02",
      slug: "websites",
      title: "Sitios de marca y producto",
      kind: "Sitio",
      challenge: "Un sitio serio que convierte.",
      result:
        "Jerarquía clara, motion contenido y CTAs que la gente sí puede seguir.",
      tags: "Next.js · Tailwind · GSAP",
      href: "#contact",
    },
    {
      id: "03",
      slug: "api",
      title: "APIs y backends",
      kind: "Sistemas",
      challenge: "Servicios seguros que no te atrapan después.",
      result:
        "Auth, modelos de datos y APIs que puedes extender cuando el producto crece.",
      tags: "Go · FastAPI · PostgreSQL",
      href: "#contact",
    },
    {
      id: "04",
      slug: "dashboards",
      title: "Dashboards",
      kind: "Ops",
      challenge: "Pantallas que el equipo abre todos los días.",
      result:
        "Vistas claras, alertas y flujos simples — hechos para operadores reales.",
      tags: "React · Charts · Realtime",
      href: "#contact",
    },
  ],

  ABOUT: {
    label: "Nosotros",
    headlineLine1: "UN EQUIPO",
    headlineLine2: "SENIOR Y CHICO",
    body1:
      "SekaiDev es un equipo senior pequeño con base en Ecuador. Trabajamos remoto con clientes en Latinoamérica y EE. UU. en productos, APIs, UX/UI y sitios de marca.",
    body2:
      "Hablas directo con quienes construyen: arquitectura, diseño y lanzamiento, desde la primera llamada hasta la entrega.",
    pillars: [
      { label: "PRODUCTO", detail: "Apps web y plataformas" },
      { label: "SISTEMAS", detail: "APIs, datos y backends" },
      { label: "DISEÑO", detail: "UX/UI y sitios de marca" },
    ],
  },

  CONTACT_COPY: {
    sectionLabel: "Contacto",
    headlineLine1: "CUÉNTANOS",
    headlineLine2: "QUÉ ESTÁS CONSTRUYENDO",
    subline:
      "Cuéntanos el objetivo, el cronograma y el rango de presupuesto. Respondemos en menos de 24 horas con los siguientes pasos, o te decimos si no somos el equipo adecuado.",
    trustLine:
      "Respuesta en menos de 24 h · alcance por escrito · honestos si no encajamos",
    fields: {
      name: { label: "Nombre" },
      email: { label: "Email" },
      company: {
        label: "Empresa",
        hint: "Opcional; nos ayuda a prepararnos.",
      },
      industry: {
        label: "Industria",
        hint: "Opcional",
        placeholder: "Selecciona…",
      },
      projectType: {
        label: "Tipo de proyecto",
        placeholder: "Selecciona…",
      },
      timeline: { label: "Cronograma", placeholder: "Selecciona…" },
      budget: {
        label: "Rango de presupuesto",
        placeholder: "Selecciona…",
      },
      message: {
        label: "Mensaje",
        placeholder:
          "¿Qué estás construyendo, para quién y cómo se ve el éxito?",
      },
    },
    optionalDetails: "Cronograma, tipo y contexto (opcional)",
    submit: { idle: "Ver si encajamos", sending: "Enviando…" },
    successTitle: "Recibimos tu consulta",
    successBody:
      "Responderemos en menos de 24 horas con los siguientes pasos, o te diremos con claridad si no encajamos.",
    privacyNote:
      "Sin listas de correo. Tu mensaje llega al equipo que construye.",
    whatsappPrefill:
      "Hola, SekaiDev. Quisiera saber si encajamos para un proyecto.",
  },

  PROJECT_TYPES: [
    "Producto / app web",
    "Sitio de marca / marketing",
    "API / backend",
    "Dashboard / herramienta interna",
    "Otro",
  ],

  TIMELINES: [
    "Lo antes posible — 2–4 semanas (Sprint)",
    "1–2 meses",
    "3+ meses (Partner)",
    "En exploración — sin fecha definida",
  ],

  BUDGETS: [
    "$14.5k–$22k (Sprint / Brand)",
    "$22k–$48k",
    "$48k–$90k (tamaño Launch)",
    "$90k+",
    "Retainer mensual ($18.5k+ / mes)",
    "Aún no estoy seguro",
  ],

  UI: {
    choosePath: "¿Por dónde empezamos?",
    scrollExplore: "Desliza para continuar",
    skipIntro: "Saltar introducción",
    stillFit: "¿Aún encajamos?",
    footerRights: "TODOS LOS DERECHOS RESERVADOS.",
    footerStack: "NEXT.JS · THREE.JS · GO · POSTGRES",
    offerLabel: "01 — OFERTA",
    offerHeadline: "Lo que",
    offerHeadlineAccent: "construimos.",
    offerSubline:
      "Apps, APIs, sitios de marca y herramientas de ops — diseñados y lanzados por el mismo equipo senior.",
    offerPromise:
      "Hablas con quien construye. Alcance por escrito antes de build. Honestos si no encajamos.",
    proofLabel: "03 — MÉTODO",
    proofHeadline: "Alcance por escrito.",
    faqLabel: "05 — PREGUNTAS",
    faqHeadline: "Pregunta antes de comprar.",
    faqSubline:
      "Respuestas claras sobre encaje, dinero, propiedad y plazos — para decidir sin un laberinto comercial.",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    contactErrors: {
      rateLimited:
        "Demasiados intentos. Espera un momento antes de volver a intentar.",
      generic: "Algo salió mal. Inténtalo de nuevo.",
      mailtoBackup:
        "Si el formulario sigue fallando, escríbenos directamente por email.",
    },
  },

  LEAD_FLOW_DEMO: {
    title: "Flujo de leads — vista operativa",
    subtitle:
      "Ejemplo del pipeline después de recibir una consulta. Solo datos de demostración.",
    stages: [
      {
        id: "received",
        label: "Recibido",
        desc: "Formulario, honeypot y límite de solicitudes validados",
      },
      {
        id: "reviewing",
        label: "En revisión",
        desc: "El estudio evalúa el encaje en menos de 24 h",
      },
      {
        id: "replied",
        label: "Respondido",
        desc: "Siguientes pasos o no-fit claro",
      },
      {
        id: "qualified",
        label: "Calificado",
        desc: "Llamada de alineación agendada / cotización enviada",
      },
    ],
    sampleLeads: [
      {
        reference: "SKD-20260803-A7F2",
        name: "Jordan Lee",
        email: "j***@northline.io",
        company: "Northline",
        projectType: "Producto / app web",
        timeline: "1–2 meses",
        budget: "$22k–$45k (tamaño Launch)",
        priority: "high",
        status: "reviewing",
        createdAt: "2026-08-03T16:45:00Z",
        messagePreview:
          "Necesitamos una consola de despacho y una web para pasajeros, similar al alcance de CyTaxi…",
      },
      {
        reference: "SKD-20260802-B3C1",
        name: "Alex Rivera",
        email: "a***@atelier.co",
        company: "Atelier Co",
        projectType: "Sitio de marca / marketing",
        timeline: "Lo antes posible — 2–4 semanas (Sprint)",
        budget: "$7.5k–$12k (tamaño Sprint)",
        priority: "normal",
        status: "received",
        createdAt: "2026-08-02T11:12:00Z",
        messagePreview:
          "Landing de lanzamiento con movimiento para la lista de espera de un producto…",
      },
      {
        reference: "SKD-20260728-C9E0",
        name: "Sam Okonkwo",
        email: "s***@gridops.app",
        company: "GridOps",
        projectType: "Dashboard / herramienta interna",
        timeline: "3+ meses (Partner)",
        budget: "Retainer mensual ($9.5k+ / mes)",
        priority: "high",
        status: "qualified",
        createdAt: "2026-07-28T09:30:00Z",
        messagePreview:
          "Alianza continua de producto para dashboards operativos…",
      },
    ],
  },
} as const satisfies StudioDictionary;
