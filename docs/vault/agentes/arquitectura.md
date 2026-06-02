# Arquitectura del Swarm de Agentes

El swarm de `dcx-sdd-kit` organiza 11 agentes especializados en 5 niveles jerárquicos.
Cada nivel define quién toma decisiones primero y quién las implementa después.

## Jerarquía

```
L1 — Strategy
     └─ [[strategy]]  (product-strategy-analyst)

L2 — UX & Accessibility
     ├─ [[ux-ui]]          (ux-ui-designer)
     └─ [[accessibility]]  (accessibility-specialist)

L3 — Architects         ← definen el blueprint, NO escriben código
     ├─ [[frontend-architect]]
     ├─ [[backend-architect]]
     └─ [[devops-architect]]

L4 — Engineers          ← implementan el blueprint
     ├─ [[frontend-engineer]]
     ├─ [[backend-engineer]]
     └─ [[devops-engineer]]

L5 — QA
     ├─ [[qa]]      (adversarial, unit/integration/e2e)
     └─ [[qa-ux]]   (usabilidad, UI regression, E2E journeys)
```

## Modelo por nivel

| Nivel | Agentes | Modelo |
|-------|---------|--------|
| L1-L3 + Accessibility | strategy, ux-ui, accessibility, *-architect | **opus** |
| L4-L5 | *-engineer, qa, qa-ux | **sonnet** |

## Flujo típico de una feature

```
strategy → ux-ui → accessibility → frontend-architect / backend-architect
                                         ↓
                               frontend-engineer / backend-engineer / devops-engineer
                                         ↓
                                    qa + qa-ux
```

## Memory Protocol (sdd-memory MCP)

Todos los agentes leen y escriben contexto compartido vía `sdd-memory`:

```
mem_context({ role: "nombre-del-agente" })   // leer contexto al iniciar
mem_save({ ... })                             // guardar decisiones durante la tarea
mem_handoff({ from_role, to_role, ... })      // entregar contexto al siguiente agente
```

## Cómo instalar el swarm

```bash
sdd swarm
# Selección interactiva por nivel
# Instala los .agent.md + SKILL.md en .agents/skills/
```

## Skills por agente (resumen)

| Agente | Skills instaladas |
|--------|------------------|
| ux-ui | ui-ux-pro-max |
| accessibility | accessibility-a11y |
| frontend-architect | vercel-react-best-practices, typescript-expert |
| backend-architect | nodejs-best-practices, typescript-expert |
| devops-architect | typescript-expert |
| frontend-engineer | vercel-react-best-practices, vue-best-practices, angular-developer, typescript-expert, ui-ux-pro-max |
| backend-engineer | nodejs-best-practices, typescript-expert |
| devops-engineer | typescript-expert |
| qa-dev | qa-test-planner, typescript-expert |
| qa-ux | qa-test-planner, accessibility-a11y, ui-ux-pro-max |
