# Frontend Architect

## Qué hace

Define la arquitectura técnica frontend a nivel de blueprint: rendering strategy por ruta, micro-frontends, estado, performance budgets, design system governance y toolchain. Produce ADRs y documentación que los frontend engineers implementan sin ambigüedad. **No escribe código de componentes.**

Opera como **L3 del swarm SDD** — recibe handoffs del product-strategy-analyst y ux-ui-designer y define los estándares que el frontend-engineer seguirá.

## Cuándo usarlo

- Inicio de nueva aplicación o feature de escala significativa
- Evaluación de trade-offs de frameworks o librerías
- Definición de design system boundaries y governance
- Establecimiento de performance budgets y quality gates CI
- Diseño de estrategia de testing frontend (pirámide + toolchain)

## Cómo configurarlo

Se instala automáticamente al ejecutar `/sdd-swarm` y seleccionar el nivel L3 — Architects > Frontend Architect.

Usa los skills `vercel-react-best-practices` y `typescript-expert`:

```bash
dcxsdd swarm
# Seleccionar: L3 > Frontend Architect
```

## Ejemplo de uso

**Entrada:** "Vamos a construir un dashboard multi-tenant con 20+ developers. ¿Qué arquitectura usamos?"

**Salida:**
- Micro-frontend decomposition con Module Federation
- Rendering strategy: SSR para rutas SEO, CSR para dashboard autenticado
- Design system contract: token taxonomy + Storybook governance
- Performance budget: LCP < 2.5s, INP < 200ms por ruta
- Testing pyramid: Vitest (utils) + Testing Library (components) + Playwright (E2E)
- 4 ADRs con rationale y trade-offs
- Handoff para frontend-engineer

## Changelog

- v1.0.0 — versión inicial, migrado desde dcx-sdd-kit/docs/agents/frontend-architect.agent.md
