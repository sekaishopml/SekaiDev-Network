import type { StudioDictionary } from "./types";

/**
 * Español latinoamericano (Ecuador).
 * El tono prioriza claridad comercial y criterio técnico sobre traducción literal.
 */
export const es = {
  meta: {
    title: "SekaiDev | Ingeniería de producto y experiencias de marca",
    description:
      "Ingeniería de producto, APIs, UX/UI y sitios de marca en un solo equipo senior. Diseño con intención, cuando realmente impulsa el clic.",
    ogTitle: "SekaiDev | Experiencias de producto que se sienten inevitables",
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
      label: "Ver proyectos seleccionados",
      href: "#works",
    },
    pricing: {
      label: "Ver inversión",
      labelUpper: "VER INVERSIÓN",
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
      "Ingeniería de producto, APIs, UX/UI y sitios de marca en un solo equipo senior. Diseño con intención, cuando realmente impulsa el clic.",
    heroCtaPrimary: { label: "Ver si encajamos", href: "#contact" },
    heroCtaSecondary: {
      label: "Ver proyectos seleccionados",
      href: "#works",
    },
    available: "Disponible para proyectos",
  },

  TRUST_STRIP: [
    "Respondemos en menos de 24 horas",
    "Alcance por escrito antes de construir",
    "Te decimos con claridad si no somos el equipo adecuado",
  ],

  FUNNEL_PATHS: [
    {
      id: "product",
      intent: "product",
      label: "Tengo un producto",
      hint: "Apps, APIs y dashboards para lanzar tu próximo hito.",
      href: "#offer",
    },
    {
      id: "services",
      intent: "services",
      label: "Quiero generar más oportunidades",
      hint: "Sitios y sistemas que convierten visitas en demanda real.",
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
    { label: "Inversión", href: "#pricing", mobileOnly: false },
    { label: "Contacto", href: "#contact", mobileOnly: false },
    {
      label: "Proyectos seleccionados",
      href: "#works",
      mobileOnly: false,
    },
  ],

  NAV_TRUST:
    "Respuesta en menos de 24 h · alcance por escrito · no-fit claro",

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
    past: "MÁS ALLÁ DEL PITCH.",
    find: "ENCUENTRA",
    signal: "EL ESTUDIO.",
    ship: "PRODUCTO. API. MARCA.",
    subline:
      "Ingeniería y diseño senior. Movimiento solo cuando convierte.",
  },

  OUTCOMES: [
    {
      title: "Lanza el producto",
      body:
        "Apps y plataformas con auth, APIs y tiempo real — arquitectura limpia, lista para la siguiente iteración.",
    },
    {
      title: "Diseño que convierte",
      body:
        "UX/UI y sitios de marca con jerarquía clara. Movimiento solo cuando gana atención.",
    },
    {
      title: "Un solo equipo senior",
      body:
        "Ingenieros con criterio de diseño: prototipan rápido, comunican claro y se hacen cargo del lanzamiento.",
    },
  ],

  FEATURED_CASE: {
    label: "Caso destacado",
    title: "CyTaxi",
    titleLine2: "Platform",
    role: "Ingeniería de producto full-stack",
    challenge:
      "Una plataforma de movilidad necesitaba despacho operativo, pagos y seguimiento en vivo; no otro MVP armado con una plantilla.",
    solution:
      "Construimos la solución de punta a punta con APIs en Go, clientes en Next.js, Postgres y mapas, preparada para escalar la operación.",
    result:
      "Una base lista para lanzar una plataforma de movilidad, con flujos en tiempo real y un stack preparado para evolucionar.",
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
      "Un código base listo para producción, una plataforma documentada y una ruta clara para las siguientes iteraciones del producto.",
    href: null,
    outcomeNote:
      "Los resultados detallados y el recorrido del caso están disponibles bajo solicitud.",
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
      aria: "Tarjeta de viaje CyTaxi — origen, ruta y ETA",
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
      { value: "Full-stack", label: "Producto y marca en un solo estudio" },
      {
        value: "Async primero",
        label: "Actualizaciones claras, reuniones puntuales",
      },
      { value: "Senior", label: "Equipo pequeño, responsabilidad real" },
    ],
    note:
      "Compartimos referencias verificables y recorridos de casos en privado una vez que confirmamos el encaje.",
  },

  PRICING: {
    sectionLabel: "Inversión",
    headline: "Formas claras de trabajar juntos.",
    subline:
      "USD · rangos iniciales · cotización escrita antes de construir. Tres modalidades, definidas después de una breve llamada de descubrimiento.",
    disclaimer:
      "Confirmamos por escrito el alcance, el cronograma y la cotización final antes de iniciar cualquier desarrollo.",
    recommended: "Recomendado",
    tiers: [
      {
        id: "sprint",
        title: "Signal Sprint",
        tagline: "Un hito. Listo para lanzar.",
        timeline: "2–4 semanas",
        priceFrom: "Desde $7,500 USD",
        bestFor:
          "Validar UX, lanzar una parte funcional o destrabar un MVP estancado.",
        includes: [
          "Llamada de descubrimiento + alcance por escrito",
          "Validación temprana de UX / arquitectura",
          "Un entregable definido",
          "Código con calidad de producción + entrega",
          "Actualizaciones async · 1–2 reuniones",
        ],
        cta: "Iniciar un sprint",
        intent: "sprint",
      },
      {
        id: "launch",
        title: "Launch Standard",
        tagline: "Diseñar, construir y lanzar.",
        timeline: "6–10 semanas",
        priceFrom: "Desde $22,000 USD",
        bestFor:
          "Un sitio de marca, un producto v1 o una base de plataforma que tu equipo pueda operar.",
        includes: [
          "Dirección de producto y visual",
          "Desarrollo full-stack según el alcance",
          "Lanzamiento de staging a producción",
          "Analítica / autenticación cuando aplique",
          "Documentación + plan pos-lanzamiento",
        ],
        cta: "Definir un lanzamiento",
        intent: "launch",
        featured: true,
      },
      {
        id: "partner",
        title: "Product Partner",
        tagline: "Capacidad senior para avanzar tu roadmap.",
        timeline: "3+ meses · mensual",
        priceFrom: "Desde $9,500 USD / mes",
        bestFor:
          "Mantener velocidad constante sin contratar aún un equipo interno.",
        includes: [
          "Tiempo dedicado de ingeniería senior",
          "Roadmap + reunión semanal",
          "Ciclos continuos de entrega",
          "Responsabilidad sobre la arquitectura",
          "Pausa / escala con 30 días de aviso",
        ],
        cta: "Conversar sobre una alianza",
        intent: "partner",
      },
    ],
  },

  FAQ_ITEMS: [
    {
      question: "¿Qué sucede durante el descubrimiento?",
      answer:
        "Empezamos con una conversación enfocada en el objetivo, los usuarios, las restricciones, el cronograma y el presupuesto. Si encajamos, convertimos esa información en un alcance escrito antes de comenzar a construir.",
    },
    {
      question: "¿Cuál es el presupuesto mínimo?",
      answer:
        "Signal Sprint empieza desde $7,500 USD para un hito definido. Si tu necesidad es menor, te lo diremos desde el inicio y recomendaremos una alternativa más adecuada en vez de forzar un paquete.",
    },
    {
      question: "¿Cómo funcionan los pagos?",
      answer:
        "Cotizamos y cobramos en USD, normalmente mediante transferencia. Antes de cualquier cobro recibes una cotización escrita con el depósito inicial, los pagos por hitos, las fechas de vencimiento y cada entregable. Todo cambio de alcance requiere aprobación escrita antes de modificar el precio. Emitimos factura bajo pedido.",
    },
    {
      question: "¿Firmamos un contrato?",
      answer:
        "Sí. Antes de empezar confirmamos por escrito el alcance, el cronograma, el calendario de pagos, la propiedad intelectual y las revisiones incluidas. Sabrás con precisión qué está dentro y fuera del proyecto.",
    },
    {
      question: "¿Cuántas revisiones están incluidas?",
      answer:
        "La propuesta especifica las rondas de revisión incluidas y los plazos para enviar feedback. Las rondas adicionales o los cambios de alcance se cotizan por separado.",
    },
    {
      question: "¿Qué pasa si no encajamos?",
      answer:
        "Te lo diremos pronto y con claridad. Si el alcance, los tiempos o la forma de trabajo no funcionan para alguna de las partes, recibirás un no-fit directo, no un proceso comercial interminable.",
    },
    {
      question: "¿Quién es dueño del código y del diseño?",
      answer:
        "Tú. La entrega final incluye el código fuente, los archivos de diseño, la documentación y los accesos acordados para operar lo que construimos.",
    },
    {
      question:
        "¿En qué se diferencian Signal Sprint, Launch Standard y Product Partner?",
      answer:
        "Signal Sprint resuelve un hito definido. Launch Standard cubre un lanzamiento más amplio de diseño y desarrollo. Product Partner aporta capacidad senior continua a equipos con un roadmap activo.",
    },
    {
      question: "¿Pueden trabajar entre Ecuador y las zonas horarias de EE. UU.?",
      answer:
        "Sí. Ecuador opera en UTC−5 todo el año y comparte horas laborales con las zonas Este y Central de EE. UU. Trabajamos async por defecto y coordinamos reuniones puntuales cuando una decisión requiere conversación en vivo.",
    },
    {
      question: "¿Trabajan de forma remota?",
      answer:
        "Sí. SEKAIDEV opera de forma remota con comunicación escrita, avances visibles y responsables claros. Programamos reuniones enfocadas solo cuando ayudan a destrabar decisiones.",
    },
    {
      question: "¿Cuándo pueden empezar y cuánto tarda un proyecto?",
      answer:
        "Depende de la disponibilidad y del alcance. Signal Sprint suele tomar 2–4 semanas, Launch Standard 6–10 semanas y Product Partner comienza con un compromiso de tres meses.",
    },
    {
      question: "¿Pueden seguir involucrados después del lanzamiento?",
      answer:
        "Sí. Podemos definir un plan pos-lanzamiento o continuar mediante Product Partner cuando necesites iteración, mantenimiento o capacidad senior de producto.",
    },
  ],

  PROCESS: [
    {
      step: "01",
      title: "Alinear",
      body:
        "Objetivos, restricciones, presupuesto y métricas de éxito por escrito antes de construir.",
    },
    {
      step: "02",
      title: "Prototipar",
      body:
        "Validamos temprano la UX y la arquitectura para que no inviertas en la dirección equivocada.",
    },
    {
      step: "03",
      title: "Construir",
      body:
        "Ciclos con calidad de producción, responsables claros y actualizaciones async.",
    },
    {
      step: "04",
      title: "Lanzar",
      body:
        "Lanzamos, entregamos y dejamos una ruta de próximos pasos; nunca una caja negra.",
    },
  ],

  PROCESS_SECTION: {
    label: "04 — PROCESO",
    headline: "Alinear → Lanzar",
    subline:
      "Cuatro pasos. Alcance por escrito primero. Nada de desarrollos en caja negra.",
  },

  WORKS_SECTION: {
    label: "07 — LO QUE CONSTRUIMOS",
    headline: "CAPACIDADES",
    subline:
      "Ejemplos de lo que lanzamos: sistemas de producto, sitios de marca, APIs y herramientas operativas. Cuando confirmemos el encaje, solicita un recorrido privado de proyectos identificables.",
  },

  WORKS: [
    {
      id: "01",
      slug: "crm",
      title: "Sistemas CRM",
      kind: "Capacidad",
      challenge:
        "Pipelines, contactos y operaciones en una sola interfaz de producto.",
      result:
        "Un modelo de datos limpio, roles y flujos que el equipo puede operar a diario.",
      tags: "Go · Next.js · Postgres",
      href: "#contact",
    },
    {
      id: "02",
      slug: "websites",
      title: "Sitios web de producto",
      kind: "Capacidad",
      challenge: "Sitios de marca que se sienten premium y convierten.",
      result:
        "Jerarquía clara, movimiento con intención y CTAs que merecen el clic.",
      tags: "Next.js · Tailwind · GSAP",
      href: "#contact",
    },
    {
      id: "03",
      slug: "api",
      title: "APIs y backends",
      kind: "Capacidad",
      challenge: "APIs seguras sin acumular deuda técnica.",
      result:
        "Autenticación, modelos de datos y servicios que una startup puede extender.",
      tags: "Go · FastAPI · PostgreSQL",
      href: "#contact",
    },
    {
      id: "04",
      slug: "dashboards",
      title: "Dashboards",
      kind: "Capacidad",
      challenge: "Interfaces operativas que los equipos realmente usan.",
      result:
        "Vistas de datos claras, alertas y flujos que se sienten nativos.",
      tags: "React · Charts · Realtime",
      href: "#contact",
    },
  ],

  ABOUT: {
    label: "09 — NOSOTROS",
    headlineLine1: "UN ESTUDIO",
    headlineLine2: "SENIOR Y COMPACTO",
    body1:
      "SEKAIDEV es un estudio senior y compacto con base en Ecuador que trabaja de forma remota en Latinoamérica y otros mercados. Construimos productos, APIs, UX/UI y sitios de marca para startups y marcas.",
    body2:
      "Trabajas directamente con quienes se hacen cargo de la arquitectura, el diseño y el lanzamiento, con comunicación clara desde la primera llamada hasta la entrega.",
    pillars: [
      { label: "PRODUCTO", detail: "Apps web y plataformas listas para lanzar" },
      { label: "SISTEMAS", detail: "APIs, datos y backends en la nube" },
      {
        label: "DISEÑO",
        detail: "UX/UI, sitios de marca y movimiento con intención",
      },
    ],
  },

  CONTACT_COPY: {
    sectionLabel: "Contacto",
    headlineLine1: "CUÉNTANOS",
    headlineLine2: "QUÉ ESTÁS CONSTRUYENDO",
    subline:
      "Objetivo, cronograma y rango de presupuesto. Respondemos en menos de 24 horas con los siguientes pasos o un no-fit claro.",
    trustLine:
      "Respuesta en menos de 24 h · alcance por escrito · no-fit claro si no somos el equipo adecuado",
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
    optionalDetails: "Cronograma, tipo y contexto — opcional",
    submit: { idle: "Ver si encajamos", sending: "Enviando…" },
    successTitle: "Recibimos tu consulta",
    successBody:
      "Responderemos en menos de 24 horas con los siguientes pasos o un no-fit claro.",
    privacyNote:
      "Sin listas de correo. Tus datos llegan directamente al estudio.",
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
    "$7.5k–$12k (tamaño Sprint)",
    "$12k–$22k",
    "$22k–$45k (tamaño Launch)",
    "$45k+",
    "Retainer mensual ($9.5k+ / mes)",
    "Aún no estoy seguro",
  ],

  UI: {
    choosePath: "Elige tu camino",
    scrollExplore: "Desliza para explorar",
    skipIntro: "Saltar introducción",
    stillFit: "¿Aún encajamos?",
    footerRights: "TODOS LOS DERECHOS RESERVADOS.",
    footerStack: "NEXT.JS · THREE.JS · GO · POSTGRES",
    offerLabel: "01 — OFERTA",
    offerHeadline: "Lo que",
    offerHeadlineAccent: "entregamos.",
    offerSubline:
      "Ingeniería de producto, diseño y sistemas — con alcance claro, de un solo equipo senior.",
    proofLabel: "03 — RESPALDO",
    proofHeadline: "Así trabajamos",
    faqLabel: "06 — PREGUNTAS FRECUENTES",
    faqHeadline: "Claridad antes de empezar.",
    faqSubline: "Los detalles prácticos, respondidos sin rodeos.",
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
