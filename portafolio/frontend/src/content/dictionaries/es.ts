import type { StudioDictionary } from "./types";

/**
 * Español latinoamericano (Ecuador).
 * Tono: claro, humano, sin jerga de agencia. Como se lo explicarías a un amigo.
 */
export const es = {
  meta: {
    title: "SekaiDev | Apps, webs y sistemas a medida",
    description:
      "Diseñamos y construimos apps, webs y sistemas desde Ecuador. Equipo pequeño: hablas directo con quien programa.",
    ogTitle: "SekaiDev | Apps, webs y sistemas desde Ecuador",
    keywords: [
      "desarrollo de software Ecuador",
      "apps web a medida",
      "sitios web para empresas",
      "desarrollo Next.js Ecuador",
      "estudio de software Quito",
      "UX UI Ecuador",
      "Ecuador",
      "Latinoamérica",
    ],
  },

  langSwitch: { label: "Idioma", en: "EN", es: "ES" },

  CTAS: {
    primary: {
      label: "Hablemos de tu proyecto",
      labelUpper: "HABLEMOS DE TU PROYECTO",
      href: "#contact",
    },
    secondary: {
      label: "Ver qué hacemos",
      href: "#works",
    },
    pricing: {
      label: "Ver precios",
      labelUpper: "VER PRECIOS",
      href: "#pricing",
    },
    featuredCase: "Quiero algo parecido",
    pricingFoot: "Pedir una cotización",
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
    eyebrow: "Estudio de software para",
    tagline: "Diseñamos tu producto y lo dejamos listo para usar.",
    subline:
      "Apps, webs y sistemas a medida. Somos un equipo pequeño en Ecuador; también trabajamos con clientes en LatAm y EE. UU.",
    heroCtaPrimary: { label: "Hablemos de tu proyecto", href: "#contact" },
    heroCtaSecondary: {
      label: "Ver qué hacemos",
      href: "#works",
    },
    available: "Disponibles para proyectos nuevos",
  },

  TRUST_STRIP: [
    "Te respondemos en menos de 24 horas",
    "Primero te mandamos el plan por escrito",
    "Si no somos el equipo correcto, te lo decimos",
  ],

  FUNNEL_PATHS: [
    {
      id: "product",
      intent: "product",
      label: "Tengo una idea o un producto",
      hint: "Una app, un panel o un sistema que hay que construir y sacar a la calle.",
      href: "#offer",
    },
    {
      id: "services",
      intent: "services",
      label: "Quiero más clientes",
      hint: "Una web o sistema que convierta visitas en mensajes, reservas o ventas.",
      href: "#pricing",
    },
  ],

  NAV_LINKS: [
    { label: "Qué hacemos", href: "#offer", mobileOnly: false },
    {
      label: "Para startups",
      href: "#offer",
      mobileOnly: true,
      intent: "product",
    },
    {
      label: "Para negocios",
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
    "Respuesta en menos de 24 h · plan por escrito · sinceros si no encajamos",

  INDUSTRIES: [
    "Startup / producto",
    "Barbería / salón",
    "Restaurante / hospitalidad",
    "Estudio jurídico",
    "Arquitectura / diseño",
    "Tienda online",
    "Publicidad / agencia",
    "Otro",
  ],

  LOOK_COPY: {
    look: "MIRA",
    closer: "MÁS DE CERCA.",
    past: "",
    find: "ESTO",
    signal: "ES EL TRABAJO.",
    ship: "APPS · SISTEMAS · WEBS DE MARCA",
    subline: "Diseño y desarrollo desde Ecuador.",
  },

  OUTCOMES: [
    {
      title: "Apps y plataformas",
      body:
        "Login, paneles y todo lo que tu equipo usa a diario. Lo dejamos listo para que puedan seguir mejorándolo después.",
    },
    {
      title: "Webs que venden tu trabajo",
      body:
        "Sitios claros: quién eres, qué ofreces y qué hacer después. Animación solo si ayuda a entender.",
    },
    {
      title: "Hablas con quien construye",
      body:
        "Sin intermediarios. Las mismas personas diseñan, programan y te acompañan hasta el lanzamiento.",
    },
  ],

  FEATURED_CASE: {
    label: "Proyecto de ejemplo",
    title: "CyTaxi",
    titleLine2: "Platform",
    role: "Producto, sistemas y pantalla de operaciones",
    challenge:
      "Necesitaban una app de movilidad lista para trabajar: pedidos, pagos y seguimiento que el equipo de operaciones pudiera usar todos los días.",
    solution:
      "Armamos la app y el sistema detrás con Go y Postgres, siguiendo cómo ocurre un viaje de verdad — el mismo enfoque que usamos en otras plataformas.",
    result:
      "Una base que podían operar y seguir creciendo. Lo mostramos para dejar claro: entregamos productos completos, no solo presentaciones.",
    stack: ["Go", "Next.js", "Postgres", "Maps"],
    deliverables: [
      "Flujos para conductores y pasajeros",
      "Panel para el equipo de operaciones",
      "API en Go y base de datos en Postgres",
      "Ubicación en vivo donde el producto lo pedía",
    ],
    decisions: [
      "Go para las APIs principales",
      "Next.js para las pantallas",
      "Postgres como fuente de verdad",
      "Mapas solo donde el viaje los necesitaba",
    ],
    handoff:
      "Código listo para producción, documentación y una lista corta de qué construir después.",
    href: null,
    outcomeNote:
      "Más ejemplos con nombre y recorrido los compartimos en privado cuando veamos que hay encaje.",
    labels: {
      challenge: "El reto",
      solution: "Qué hicimos",
      delivered: "Qué entregamos",
      decisions: "Decisiones clave",
      result: "Resultado",
      handoff: "Entrega",
      buildNotes: "Notas del build",
    },
    stageUi: {
      aria: "Tarjeta de viaje de ejemplo del build CyTaxi",
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
      { value: "24 h", label: "Tiempo típico de respuesta" },
      { value: "UTC−5", label: "Ecuador · buen horario con EE. UU. Este/Central" },
      { value: "Por escrito", label: "Plan claro antes de empezar a construir" },
    ],
    note:
      "Si hacemos match, te compartimos referencias y recorridos de proyectos en privado.",
  },

  PRICING: {
    sectionLabel: "Precios",
    headline: "Precios claros. Primero la cotización por escrito.",
    subline:
      "Montos iniciales en dólares para Ecuador y LatAm. Desliza para comparar. El número final te lo confirmamos por escrito antes de construir.",
    marketNote:
      "Por encima de una web plantilla. Por debajo de tarifas de agencia en EE. UU.",
    offerBanner:
      "En cada paquete ves el precio de lista y el precio para ti. Launch Standard suele ser la opción para un producto completo.",
    scrollHint: "Desliza para comparar paquetes",
    disclaimer:
      "Estos son precios de entrada. Alcance, fechas y cotización final van por escrito. Si el trabajo crece, te avisamos antes de subir el precio.",
    recommended: "Recomendable",
    clientRate: "Tu precio",
    tiers: [
      {
        id: "brand",
        title: "Brand Presence",
        tagline: "Una web que explica quién eres y qué hacer después.",
        timeline: "3–5 semanas",
        priceWas: "$6,200",
        priceFrom: "$4,500",
        priceUnit: "USD",
        bestFor:
          "Web de marca o marketing hecha a medida, con un camino claro para que te escriban o compren — no una plantilla.",
        includes: [
          "Diseño y estructura pensados para convertir",
          "Sitio a medida en Next.js",
          "Animación alineada a tu marca",
          "Base de SEO y analítica",
          "Pruebas, salida al aire y entrega",
        ],
        cta: "Quiero una web de marca",
        intent: "brand",
      },
      {
        id: "launch",
        title: "Launch Standard",
        tagline: "Diseñar, construir y lanzar el producto.",
        timeline: "8–14 semanas",
        priceWas: "$24,500",
        priceFrom: "$18,500",
        priceUnit: "USD",
        offerNote:
          "Lo más habitual: diseño, desarrollo completo, lanzamiento y 30 días de soporte.",
        bestFor:
          "Tu primera versión del producto, un panel de operaciones o la base de una plataforma que tu equipo pueda usar día a día.",
        includes: [
          "Dirección de producto y diseño",
          "Stack según el proyecto (Go, Next.js, Postgres…)",
          "Login, APIs y flujos principales",
          "Integraciones o tiempo real si hace falta",
          "Salida al aire, documentación y 30 días de soporte",
        ],
        cta: "Empezar con Launch",
        intent: "launch",
        featured: true,
      },
      {
        id: "sprint",
        title: "Signal Sprint",
        tagline: "Un avance concreto, entregado.",
        timeline: "2–4 semanas",
        priceWas: "$8,900",
        priceFrom: "$6,800",
        priceUnit: "USD",
        bestFor:
          "Cuando necesitas destrabar un MVP, revisar diseño o arquitectura, o sacar una pieza importante rápido.",
        includes: [
          "Llamada inicial + plan por escrito",
          "Revisión de UX o arquitectura antes de construir",
          "Un entregable listo para usar",
          "Revisión de código y cómo publicarlo",
          "Actualizaciones por mensaje y algunas llamadas cortas",
        ],
        cta: "Pedir un sprint",
        intent: "sprint",
      },
      {
        id: "partner",
        title: "Product Partner",
        tagline: "Seguir construyendo mes a mes.",
        timeline: "3+ meses · mensual",
        priceWas: "$5,200",
        priceFrom: "$3,800",
        priceUnit: "USD / mes",
        bestFor:
          "Cuando ya lanzaste y quieres seguir mejorando sin contratar aún un equipo completo.",
        includes: [
          "Horas mensuales de desarrollo y diseño",
          "Plan compartido + reunión semanal",
          "Entregas con ritmo estable",
          "Cuidado de velocidad y arquitectura",
          "Puedes pausar o subir con 30 días de aviso",
        ],
        cta: "Hablar de una alianza",
        intent: "partner",
      },
    ],
  },

  FAQ_ITEMS: [
    {
      question: "¿Qué pasa después de escribirnos?",
      answer:
        "Te respondemos de verdad en menos de 24 horas — no un robot. Pedimos lo justo para entender si podemos ayudarte: objetivo, usuarios, plazos y presupuesto. Si tiene sentido, te mandamos el plan por escrito. Si no, te lo decimos y listo.",
    },
    {
      question: "¿Cuánto cuesta trabajar con ustedes?",
      answer:
        "Web de marca desde $4,500 USD. Sprint desde $6,800. Producto completo (Launch Standard) desde $18,500 (lista $24,500). Alianza mensual desde $3,800/mes. Si tu presupuesto está más abajo, te lo decimos pronto.",
    },
    {
      question: "¿Qué paquete me conviene?",
      answer:
        "Brand Presence: una web de marca o marketing. Signal Sprint: un avance concreto cuando necesitas algo afuera rápido. Launch Standard (recomendable): diseño + desarrollo para lanzar un producto completo. Product Partner: horas mensuales si quieres seguir después del lanzamiento.",
    },
    {
      question: "¿Cómo funcionan pagos y contrato?",
      answer:
        "Cotizamos en dólares, normalmente por transferencia. Antes de cobrar te mandamos una cotización escrita con anticipo, hitos, fechas y qué incluye (y qué no). Los cambios de alcance se aprueban por escrito. Factura bajo pedido.",
    },
    {
      question: "¿De quién es el código y el diseño?",
      answer:
        "Tuyos. Te entregamos el código, los archivos de diseño, la documentación y los accesos. Sin repos retenidos ni licencias escondidas.",
    },
    {
      question: "¿Pueden trabajar con equipos en EE. UU. y LatAm?",
      answer:
        "Sí. Estamos en Ecuador (UTC−5 todo el año), con buen horario para la costa Este y Central de EE. UU. Trabajamos sobre todo por mensaje con avances claros, y hacemos llamadas cortas solo cuando hay que decidir algo.",
    },
    {
      question: "¿Cuánto tarda un proyecto?",
      answer:
        "Web de marca: 3–5 semanas. Sprint: 2–4 semanas. Producto completo: 8–14 semanas. La alianza mensual abre en tres meses. La fecha de inicio depende de la agenda; en la primera llamada te damos una ventana real.",
    },
    {
      question: "¿Qué pasa si no encajamos?",
      answer:
        "Preferimos perder un proyecto a tomar el equivocado. Si el alcance, el tiempo o la forma de trabajar no dan, te lo decimos claro y cada uno sigue su camino.",
    },
    {
      question: "¿Pueden seguir después del lanzamiento?",
      answer:
        "Sí. Podemos dejarte un plan corto de lo que sigue, o continuar con Product Partner si quieres mejoras constantes sin armar aún un equipo interno.",
    },
  ],

  PROCESS: [
    {
      step: "01",
      title: "Entender",
      body:
        "Objetivos, límites, presupuesto y cómo se ve el éxito — por escrito, antes de construir.",
    },
    {
      step: "02",
      title: "Diseñar",
      body:
        "Revisamos pantallas o arquitectura a tiempo, para no pagar la dirección equivocada.",
    },
    {
      step: "03",
      title: "Construir",
      body:
        "Trabajo real, con responsables claros y avances que puedes ver seguido.",
    },
    {
      step: "04",
      title: "Lanzar",
      body:
        "Salimos al aire, te entregamos todo y dejamos un plan corto de lo que viene.",
    },
  ],

  PROCESS_SECTION: {
    label: "02 — MÉTODO",
    headline: "Primero el plan por escrito.",
    headlineAccent: "Después construimos.",
    subline:
      "De la primera llamada al lanzamiento — las mismas personas, con el plan claro desde el inicio.",
    boardLabel: "Pasos",
    boardFlow: "Entender → Diseñar → Construir → Lanzar",
  },

  WORKS_SECTION: {
    label: "Capacidades",
    headline: "En qué te podemos ayudar.",
    subline:
      "Apps, webs de marca, sistemas y herramientas internas. Ejemplos con nombre los vemos juntos cuando haya encaje.",
    needLabel: "Necesidad",
    outcomeLabel: "Resultado",
  },

  WORKS: [
    {
      id: "01",
      slug: "crm",
      title: "CRM y operaciones",
      kind: "Producto",
      challenge: "Clientes, pedidos y el día a día del equipo en un solo lugar.",
      result: "Datos, roles y flujos que tu gente sí puede usar.",
      tags: "Go · Next.js · Postgres",
      href: "#contact",
    },
    {
      id: "02",
      slug: "websites",
      title: "Webs de marca y producto",
      kind: "Sitio",
      challenge: "Una web seria que invite a escribir o comprar.",
      result: "Estructura clara, movimiento justo y botones que se entienden.",
      tags: "Next.js · Tailwind · GSAP",
      href: "#contact",
    },
    {
      id: "03",
      slug: "api",
      title: "APIs y backends",
      kind: "Sistemas",
      challenge: "El motor detrás de la app: estable y listo para crecer.",
      result: "Login, datos y APIs que acompañan al producto.",
      tags: "Go · FastAPI · PostgreSQL",
      href: "#contact",
    },
    {
      id: "04",
      slug: "dashboards",
      title: "Paneles y herramientas internas",
      kind: "Tools",
      challenge: "Pantallas que el equipo usa todos los días.",
      result: "Tablas, números y flujos — claros, rápidos, sin adornos.",
      tags: "React · Charts · Postgres",
      href: "#contact",
    },
  ],

  ABOUT: {
    label: "Nosotros",
    headlineLine1: "UN EQUIPO",
    headlineLine2: "QUE CONSTRUYE",
    body1:
      "SekaiDev es un equipo pequeño en Ecuador. Trabajamos remoto con clientes en LatAm y EE. UU. en apps, webs y sistemas — lo que pida el proyecto, no un solo nicho.",
    body2:
      "Desde el primer mensaje hablas con quienes escriben el código y dan forma a las pantallas.",
    pillars: [
      { label: "PRODUCTO", detail: "Apps y plataformas" },
      { label: "SISTEMAS", detail: "APIs, datos y backends" },
      { label: "DISEÑO", detail: "UX/UI y webs de marca" },
    ],
  },

  CONTACT_COPY: {
    sectionLabel: "Contacto",
    headlineLine1: "CUÉNTANOS",
    headlineLine2: "QUÉ QUIERES CONSTRUIR",
    subline:
      "Objetivo, plazos y rango de presupuesto. Te respondemos en menos de 24 horas con los siguientes pasos — o te decimos si no somos el equipo adecuado.",
    trustLine:
      "Respuesta en menos de 24 h · plan por escrito · sinceros si no encajamos",
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
        placeholder: "Elige una…",
      },
      projectType: {
        label: "Tipo de proyecto",
        placeholder: "Elige una…",
      },
      timeline: { label: "Plazo", placeholder: "Elige uno…" },
      budget: {
        label: "Rango de presupuesto",
        placeholder: "Elige uno…",
      },
      message: {
        label: "Mensaje",
        placeholder:
          "¿Qué quieres construir, para quién, y cómo sabrás que salió bien?",
      },
    },
    optionalDetails: "Plazo, tipo y contexto (opcional)",
    submit: { idle: "Enviar mensaje", sending: "Enviando…" },
    successTitle: "Recibimos tu mensaje",
    successBody:
      "Te respondemos en menos de 24 horas con los siguientes pasos, o te decimos con claridad si no encajamos.",
    privacyNote:
      "Sin listas de correo. Tu mensaje llega al equipo que construye.",
    whatsappPrefill:
      "Hola SekaiDev, quiero hablar de un proyecto.",
  },

  PROJECT_TYPES: [
    "Producto / app web",
    "Web de marca / marketing",
    "API / backend",
    "Panel / herramienta interna",
    "Otro",
  ],

  TIMELINES: [
    "Lo antes posible — 2–4 semanas (Sprint)",
    "1–2 meses",
    "3+ meses (Partner)",
    "Aún estoy explorando — sin fecha fija",
  ],

  BUDGETS: [
    "$4.5k–$8k (Brand / Sprint)",
    "$8k–$18.5k",
    "$18.5k–$35k (tamaño Launch)",
    "$35k+",
    "Mensual ($3.8k+ / mes)",
    "Aún no estoy seguro",
  ],

  UI: {
    choosePath: "¿Por dónde empezamos?",
    scrollExplore: "Desliza para continuar",
    skipIntro: "Saltar introducción",
    stillFit: "¿Seguimos hablando?",
    footerRights: "TODOS LOS DERECHOS RESERVADOS.",
    footerStack: "NEXT.JS · THREE.JS · GO · POSTGRES",
    offerLabel: "01 — OFERTA",
    offerHeadline: "Lo que",
    offerHeadlineAccent: "construimos.",
    offerSubline:
      "Apps, webs de marca, sistemas y herramientas internas — de punta a punta, con el mismo equipo pequeño.",
    offerPromise:
      "Hablas con quien construye. Plan por escrito antes de empezar. Sinceros si no encajamos.",
    proofLabel: "02 — MÉTODO",
    proofHeadline: "Primero el plan por escrito.",
    faqLabel: "05 — PREGUNTAS",
    faqHeadline: "Preguntas frecuentes.",
    faqSubline:
      "Encaje, plata, dueño del código y plazos — respondido antes de que gastes tiempo en una llamada.",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    contactErrors: {
      rateLimited:
        "Demasiados intentos. Espera un momento e inténtalo de nuevo.",
      generic: "Algo salió mal. Inténtalo de nuevo.",
      mailtoBackup:
        "Si el formulario sigue fallando, escríbenos directo por email.",
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
        desc: "Formulario recibido y validado",
      },
      {
        id: "reviewing",
        label: "En revisión",
        desc: "Revisamos si podemos ayudar en menos de 24 h",
      },
      {
        id: "replied",
        label: "Respondido",
        desc: "Siguientes pasos o respuesta clara de no-fit",
      },
      {
        id: "qualified",
        label: "Calificado",
        desc: "Llamada agendada / cotización enviada",
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
          "Necesitamos un panel de operaciones y una web para el equipo de campo…",
      },
      {
        reference: "SKD-20260802-B3C1",
        name: "Alex Rivera",
        email: "a***@atelier.co",
        company: "Atelier Co",
        projectType: "Web de marca / marketing",
        timeline: "Lo antes posible — 2–4 semanas (Sprint)",
        budget: "$7.5k–$12k (tamaño Sprint)",
        priority: "normal",
        status: "received",
        createdAt: "2026-08-02T11:12:00Z",
        messagePreview:
          "Landing de lanzamiento con movimiento para la lista de espera…",
      },
      {
        reference: "SKD-20260728-C9E0",
        name: "Sam Okonkwo",
        email: "s***@gridops.app",
        company: "GridOps",
        projectType: "Panel / herramienta interna",
        timeline: "3+ meses (Partner)",
        budget: "Mensual ($9.5k+ / mes)",
        priority: "high",
        status: "qualified",
        createdAt: "2026-07-28T09:30:00Z",
        messagePreview:
          "Alianza continua para paneles operativos…",
      },
    ],
  },
} as const satisfies StudioDictionary;
