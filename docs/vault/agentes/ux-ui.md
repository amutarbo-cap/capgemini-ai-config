# UX/UI Designer

**ID en agents.ts:** `ux-ui`
**Modelo:** opus | **Nivel:** L2 — UX & Accessibility
**Skills:** ui-ux-pro-max

## Para qué sirve

Puente entre necesidades de usuario y ejecución visual. Produce blueprints de diseño que los frontend engineers pueden implementar directamente. Trabaja sobre la estrategia de L1 para convertirla en flujos, estructuras y patrones de interacción.

## Cuándo llamarlo

- Diseñar un onboarding, checkout, o cualquier flujo de usuario
- Definir arquitectura de información y jerarquía de componentes UI
- Establecer patrones de interacción y estados de pantalla
- Evaluar consistencia visual y usabilidad
- Traducir requisitos de producto en specs de interacción

## Cuándo NO llamarlo

- Necesitas accesibilidad WCAG específica → [[accessibility]]
- Necesitas implementar el UI → [[frontend-engineer]]
- La decisión es puramente técnica de arquitectura → [[frontend-architect]]

## Ejemplos

```
"Tenemos que hacer el onboarding de usuarios nuevos en un SaaS. ¿Cómo debería ser la experiencia?"
→ ux-ui mapea el journey, define screen states y patrones de interacción

"Necesito rediseñar el dashboard para mostrar métricas en tiempo real"
→ ux-ui define la jerarquía de información y los componentes necesarios

"Hay 4 equipos construyendo partes del UI y se ve inconsistente"
→ ux-ui establece el sistema de diseño y las guías de consistencia visual
```

## Output esperado

- User journey maps
- Estructura de pantallas y estados (happy path + error states)
- Especificación de componentes UI necesarios
- Patrones de interacción y feedback visual
- Handoff al frontend-engineer con specs implementables

## Memory Protocol

```js
mem_context({ role: "ux-ui" })
// leer handoff de strategy si existe
mem_handoff({ from_role: "strategy", read: true })

// guardar decisiones de diseño
mem_save({ role: "ux-ui", type: "convention", title: "Design: ...", content: "..." })

// entregar al siguiente
mem_handoff({ from_role: "ux-ui", to_role: "frontend-engineer", decisions: [...] })
mem_handoff({ from_role: "ux-ui", to_role: "accessibility", decisions: [...] })
```

Ver [[arquitectura]] para el flujo completo.
