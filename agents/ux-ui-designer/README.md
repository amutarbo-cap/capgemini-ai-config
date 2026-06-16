# UX/UI Designer

## Qué hace

Traduce requisitos de producto y research de usuarios en especificaciones de diseño implementables. Mapea user journeys, estructura la arquitectura de información, define estados de interacción y establece contratos de design tokens. Opera con WCAG 2.1 AA como baseline.

Opera como **L2 del swarm SDD** — recibe el handoff estratégico del product-strategy-analyst y produce el blueprint de diseño para el frontend-architect.

## Cuándo usarlo

- Diseño de nuevos flujos o pantallas antes de la implementación
- Definición de estados de interacción (hover, focus, error, loading, empty)
- Mapeo de user journeys con happy path y error paths
- Revisión de consistencia visual y UX entre features
- Preparación del diseño spec para `/sdd-enrich`

## Cómo configurarlo

Este agente se instala automáticamente al ejecutar `/sdd-swarm` y seleccionar el nivel L2 — UX & Accessibility.

Requiere el skill `ui-ux-pro-max` que se instala junto con el agente. También usa `sdd-memory` para persistir decisiones de diseño:

```json
{
  "mcpServers": {
    "sdd-memory": {
      "command": "npx",
      "args": ["-y", "@dmuleroa/sdd-memory"]
    }
  }
}
```

## Ejemplo de uso

**Entrada:** "Diseña el flujo de onboarding para usuarios nuevos de nuestra plataforma SaaS"

**Salida:**
- User journey: 6 pasos desde registro hasta primer uso con decisiones y error paths
- Screen specs: Dashboard vacío, modal de bienvenida, wizard de configuración (3 pasos)
- Interaction states table: 8 componentes × 6 estados cada uno
- Design tokens: referencia a tokens existentes + 2 nuevos propuestos
- Open questions: ¿Qué pasa si el usuario cierra el wizard? ¿Skip permitido?
- Handoff para frontend-architect

## Changelog

- v1.0.0 — versión inicial, migrado desde dcx-sdd-kit/docs/agents/ux-ui.agent.md
