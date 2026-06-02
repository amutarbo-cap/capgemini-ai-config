# Frontend Developer (Engineer)

**ID en agents.ts:** `frontend-engineer`
**Modelo:** sonnet | **Nivel:** L4 — Engineers
**Skills:** vercel-react-best-practices, vue-best-practices, angular-developer, typescript-expert, ui-ux-pro-max

## Para qué sirve

Implementa el blueprint definido por frontend-architect. Senior developer especializado en React, Vue y Angular con TypeScript. Foco en componentes reutilizables, rendimiento, accesibilidad-first, state management y arquitecturas component-driven. El agente con más skills del swarm — cubre el ecosistema frontend completo.

## Cuándo llamarlo

- Implementar componentes UI, vistas, layouts
- Integrar APIs con el frontend
- State management (Zustand, Pinia, NgRx, Signals)
- Features en tiempo real (WebSockets, SSE)
- Optimización de rendimiento a nivel de componente
- Refactor de código frontend existente
- Tests unitarios e integración de componentes

## Cuándo NO llamarlo

- Decisiones arquitectónicas → [[frontend-architect]]
- Diseño UX → [[ux-ui]]
- Tests E2E de usuario → [[qa-ux]]

## Ejemplos

```
"Implementa el componente DataTable con paginación, sorting y filtros"
→ frontend-engineer construye el componente con TypeScript strict + tests

"Necesito integrar el dashboard con el WebSocket de métricas en tiempo real"
→ frontend-engineer implementa la conexión WS + actualización reactiva del estado

"El componente de listado re-renderiza demasiado bajo carga"
→ frontend-engineer optimiza con memo, virtualización o lazy loading

"Tenemos Angular 21 — implementa el módulo de auth con guards y signals"
→ frontend-engineer aplica skill angular-developer con standalone components + signals
```

## Skills disponibles

| Skill | Cuándo se activa |
|-------|-----------------|
| angular-developer | Proyectos Angular 21+ |
| vercel-react-best-practices | Proyectos React/Next.js |
| vue-best-practices | Proyectos Vue |
| typescript-expert | Tipado avanzado, generics, utilidades |
| ui-ux-pro-max | Decisiones de diseño en implementación |

## Memory Protocol

```js
mem_context({ role: "frontend-engineer" })
mem_handoff({ from_role: "frontend-architect", read: true })
mem_handoff({ from_role: "ux-ui", read: true })
mem_handoff({ from_role: "accessibility", read: true })

mem_save({ role: "frontend-engineer", type: "convention", title: "Component: ...", content: "..." })

mem_handoff({ from_role: "frontend-engineer", to_role: "qa", decisions: [...] })
mem_handoff({ from_role: "frontend-engineer", to_role: "qa-ux", decisions: [...] })
```

Ver [[arquitectura]] para el flujo completo.
