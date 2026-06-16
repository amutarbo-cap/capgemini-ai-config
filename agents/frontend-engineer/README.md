# Frontend Engineer

## Qué hace

Implementa interfaces de usuario en React, Vue y Angular con TypeScript strict. Sigue el blueprint del frontend-architect, respeta los design tokens y escribe componentes con >85% de cobertura de tests. Entrega Storybook stories, accessibility audit y bundle analysis junto con el código.

Opera como **L4 del swarm SDD** — implementa lo que el frontend-architect diseñó y entrega a los agentes QA para validación.

## Cuándo usarlo

- Implementación de nuevos componentes o features UI
- Integración con APIs y gestión de estado
- Optimización de performance frontend (bundle size, Core Web Vitals)
- Implementación de features de tiempo real (WebSockets, SSE)
- Escritura de tests de componentes y E2E

## Cómo configurarlo

Se instala automáticamente al ejecutar `/sdd-swarm` y seleccionar el nivel L4 — Engineers > Frontend Engineer.

Instala los skills: `vercel-react-best-practices`, `vue-best-practices`, `angular-developer`, `typescript-expert`, `ui-ux-pro-max`.

## Ejemplo de uso

**Entrada:** Blueprint de arquitectura + design spec del checkout flow con 4 pantallas

**Salida:**
- `CheckoutFlow/` con 6 componentes TypeScript (interfaces tipadas, strict mode)
- Tests: 47 tests unitarios + 3 E2E con Playwright, 87% coverage
- `CheckoutFlow.stories.tsx` con 12 stories cubriendo todos los estados
- Accessibility: 0 violations en axe-core
- Bundle impact: +12.4KB compressed (dentro de budget)
- Handoff para qa-developer y qa-ux

## Changelog

- v1.0.0 — versión inicial, migrado desde dcx-sdd-kit/docs/agents/frontend-engineer.agent.md
