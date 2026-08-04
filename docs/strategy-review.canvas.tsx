import {
  Callout,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  useHostTheme,
} from "cursor/canvas";

export default function SekaiDevStrategyReview() {
  const theme = useHostTheme();
  const muted = theme.text.secondary;

  return (
    <Stack gap={24} style={{ padding: 24, maxWidth: 960 }}>
      <Stack gap={8}>
        <H1>SekaiDev — Review Gerente · Senior · Marketing</H1>
        <Text tone="secondary">
          Auditoría de precios, originalidad, UX y oportunidades por vertical.
          Fixes ya en producción: flor móvil más contenida, LOOK bajo el navbar y
          sección comprimida.
        </Text>
        <Row gap={8} style={{ flexWrap: "wrap" }}>
          <Pill tone="info">Originalidad 7/10</Pill>
          <Pill>Pricing claro</Pill>
          <Pill tone="warning">Prueba pública débil</Pill>
          <Pill tone="warning">ICP genérico</Pill>
        </Row>
      </Stack>

      <Callout tone="warning" title="Veredicto conjunto">
        La oferta premium está clara y es competitiva para startups/brands con
        presupuesto US. Para barberías, restaurantes y servicios locales el
        lenguaje “product engineering” no engancha: hace falta dual-funnel +
        paquetes verticales, sin inventar métricas ni bajar el precio base.
      </Callout>

      <Grid columns={3} gap={12}>
        <Stat value="$7.5k+" label="Sprint · filtro de calidad" />
        <Stat value="1 caso" label="CyTaxi público" tone="warning" />
        <Stat value="6 verticales" label="Paquetes a productizar" />
      </Grid>

      <Divider />

      <H2>1. Precios (Gerente)</H2>
      <Stack gap={10}>
        <Text>
          Estructura Sprint / Launch / Partner es clara. No bajar precio: reducir
          incertidumbre con alcance cerrado y rutas por industria.
        </Text>
        <Table
          headers={["Acción", "Prioridad", "Detalle"]}
          rows={[
            [
              "Ficha CyTaxi verificable",
              "P0",
              "Problema, entregables, stack — sin métricas inventadas",
            ],
            [
              "Landings por vertical",
              "P0",
              "Dolor + alcance + plazo + precio desde + CTA",
            ],
            [
              "CTA contextual",
              "P0",
              "“Cotizar reservas” vs “Send your brief” genérico",
            ],
            [
              "Campo industria en form",
              "P0",
              "Calificar y atribuir demanda",
            ],
            [
              "Qué cabe / no cabe por tier",
              "P1",
              "Launch hoy mezcla brand site y platform",
            ],
            [
              "Diagnóstico pagado",
              "P1",
              "Para prospectos bajo el mínimo de build",
            ],
          ]}
        />
      </Stack>

      <H2>2. Paquetes verticales sugeridos</H2>
      <Table
        headers={["Vertical", "Oferta", "Banda USD"]}
        rows={[
          ["Barbería", "Chairflow Booking", "$3k–$8k"],
          ["Restaurante", "Service Flow", "$5k–$15k"],
          ["Abogado", "Matter Intake", "$6k–$18k"],
          ["Arquitecto", "Project Showcase", "$5k–$14k"],
          ["Ecommerce", "Conversion Commerce", "$10k–$30k+"],
          ["Ads / agencia", "Client Ops Desk", "$12k–$35k+"],
          ["Startup", "Sprint / Launch / Partner (actual)", "$7.5k+"],
        ]}
      />

      <Divider />

      <H2>3. Marketing & CRO</H2>
      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>Posicionamiento</CardHeader>
          <CardBody>
            <Stack gap={8}>
              <Text weight="semibold">Dual-funnel</Text>
              <Text tone="secondary">
                A) Producto digital / startups — plataformas, APIs, ops.
              </Text>
              <Text tone="secondary">
                B) Negocios de servicios — más reservas, consultas y leads
                calificados.
              </Text>
              <Text tone="secondary" size="small">
                Mantener marca madre; no diluir con un hero genérico.
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Hooks por vertical</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text size="small">
                Barbería — Instagram → reservas y menos huecos.
              </Text>
              <Text size="small">
                Restaurante — Reservas/pedidos + marca con apetito.
              </Text>
              <Text size="small">
                Abogado — Autoridad + consultas → casos calificados.
              </Text>
              <Text size="small">
                Arquitecto — Portfolio que vende antes de la reunión.
              </Text>
              <Text size="small">
                Ecommerce — Menos fricción discover → pagar.
              </Text>
              <Text size="small">
                Ads — Capa tech senior para lo que creativos ya imaginaron.
              </Text>
              <Text size="small">
                Startup — Flujo crítico → producto operable, un equipo.
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <H3>Pricing presentation</H3>
      <Stack gap={6}>
        <Text tone="secondary">
          Anclar alcance/plazo antes del número. Ejemplos de entregable por tier.
          Garantía operativa (alcance escrito, hitos, aceptación) — nunca de
          leads. Pago: anticipo + hitos; USD + opción local si es legal.
        </Text>
      </Stack>

      <Divider />

      <H2>4. Senior — UX & producto</H2>
      <Stack gap={10}>
        <H3>Hamburguesa (Navigation.tsx)</H3>
        <Table
          headers={["Hoy", "Propuesta"]}
          rows={[
            ["OFFER / INVESTMENT / WORK", "Qué resolvemos / Cómo / Inversión"],
            ["Un CTA: Send your brief", "Brief + Ver inversión (+ WhatsApp opcional)"],
            ["Sin transición de panel", "Entrada/salida + stagger (reduced-motion)"],
            ["Sin confianza", "Línea: Respuesta 24h · alcance claro o no-fit"],
            [
              "Labels genéricos",
              "Para startups · Para negocios de servicios",
            ],
          ]}
        />

        <H3>Secciones nuevas que enganchan</H3>
        <Table
          headers={["Sección", "Por qué", "Prioridad"]}
          rows={[
            [
              "Choose your build / Industria",
              "El visitante se reconoce en 3 segundos",
              "P0",
            ],
            [
              "FAQ de decisión",
              "Objeciones: fit, código, Sprint vs Launch",
              "P1",
            ],
            [
              "Pre-calificador 3 pasos",
              "Prellena Contact (tipo / plazo / rango)",
              "P1",
            ],
            [
              "Works con filtros + dialogs",
              "Profundidad antes del form; hoy todo salta a #contact",
              "P1",
            ],
            [
              "Micro-demo CyTaxi",
              "Prueba real, no arte abstracto",
              "P2",
            ],
            [
              "WhatsApp CTA",
              "Solo si hay canal y medición confirmados",
              "P2",
            ],
          ]}
        />
      </Stack>

      <Divider />

      <H2>5. Backlog 30 días</H2>
      <Table
        headers={["#", "Experimento / ticket", "Owner lens"]}
        rows={[
          [
            "1",
            "Hero bifurcado: “Tengo un producto” / “Quiero más solicitudes”",
            "Marketing",
          ],
          [
            "2",
            "Rehacer menú móvil (IA + CTA + transición)",
            "Senior",
          ],
          [
            "3",
            "1 landing vertical piloto (p.ej. reservas / barbería)",
            "Gerente + Marketing",
          ],
          [
            "4",
            "FAQ + form con industria + CTA “Ver si encajamos”",
            "Senior + Marketing",
          ],
          [
            "5",
            "Works filtros/dialogs + ficha CyTaxi ampliada",
            "Senior",
          ],
          [
            "6",
            "Test WhatsApp vs form en servicios locales",
            "Marketing",
          ],
        ]}
      />

      <H2>6. KPIs a medir</H2>
      <Row gap={12} style={{ flexWrap: "wrap" }}>
        <Text tone="secondary">Visita → CTA</Text>
        <Text style={{ color: muted }}>·</Text>
        <Text tone="secondary">CTA → form start</Text>
        <Text style={{ color: muted }}>·</Text>
        <Text tone="secondary">Submit → call</Text>
        <Text style={{ color: muted }}>·</Text>
        <Text tone="secondary">Leads / vertical</Text>
        <Text style={{ color: muted }}>·</Text>
        <Text tone="secondary">% under-min</Text>
        <Text style={{ color: muted }}>·</Text>
        <Text tone="secondary">Time to first reply</Text>
      </Row>

      <Callout tone="info" title="Qué no hacer">
        No inventar logos, métricas ni testimonios. No bajar el Sprint a “precio
        de plantilla”. No calculadora ROI sin datos. No WhatsApp sin proceso
        comercial detrás.
      </Callout>

      <Text size="small" tone="secondary">
        Fuentes: agentes Gerente, Senior Frontend y Marketing/CRO ·{" "}
        portafolio.sekaidevec.com · studio.ts
      </Text>
    </Stack>
  );
}
