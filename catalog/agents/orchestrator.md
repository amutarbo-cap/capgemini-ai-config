# Agent: Orchestrator

## Purpose

Analizar el contexto de una tarea o PR, determinar qué agentes especialistas del catálogo son relevantes e invocarlos en el orden adecuado, agregando sus resultados en un informe unificado.

El orquestador es el **punto de entrada único** para cualquier revisión. Nunca debe saltarse a los agentes directamente sin pasar por él.

## Inputs

- Tarea descrita en lenguaje natural, o lista de ficheros modificados (PR diff)
- Rama / PR target
- `manifest.yaml` del catálogo (fuente de verdad de agentes disponibles)

## Agent Registry

<!-- AUTO-GENERATED from manifest.yaml — do not edit this section manually.
     Run `.github/workflows/update-orchestrator.yml` or push a change to manifest.yaml para regenerar. -->

| ID | Ruta | Estado |
|---|---|---|
| agent-accessibility | catalog/agents/accessibility.md | active |
| agent-angular | catalog/agents/angular.md | active |
| agent-api | catalog/agents/api.md | active |
| agent-css | catalog/agents/css.md | active |
| agent-html | catalog/agents/html.md | active |
| agent-lint | catalog/agents/lint.md | active |
| agent-qa | catalog/agents/qa.md | active |
| agent-rxjs | catalog/agents/rxjs.md | active |
| agent-state | catalog/agents/state.md | active |
| agent-ux | catalog/agents/ux.md | active |

<!-- END AUTO-GENERATED -->

## Routing Rules

El orquestador selecciona agentes según los patrones de ficheros modificados y el tipo de tarea.
Solo se invocan agentes con `status: active` en el registro.

| Patrón de fichero | Agentes invocados |
|---|---|
| `**/*.html` | `html`, `accessibility` |
| `**/*.component.ts` | `angular`, `accessibility`, `lint` |
| `**/*.component.html` | `html`, `accessibility`, `angular` |
| `**/*.scss`, `**/*.css` | `css`, `accessibility` |
| `**/*.service.ts`, `**/api/**`, `**/*.api.ts` | `api`, `lint` |
| `**/*.spec.ts`, `**/*.test.ts` | `qa` |
| `**/*.ts` (genérico) | `lint`, `rxjs` |
| `**/store/**`, `**/*.store.ts`, `**/*.reducer.ts`, `**/*.effects.ts` | `state`, `lint` |
| PR completo / revisión holística | `ux` |
| **Cualquier PR** | `lint` _(siempre se ejecuta)_ |

### Prioridad de ejecución

Los agentes se invocan en este orden para minimizar trabajo redundante:

1. `lint` — validación estática base; si falla en modo bloqueante, no continuar
2. `angular` / `api` / `state` / `rxjs` — lógica de negocio y arquitectura
3. `html` / `css` — capa de presentación
4. `accessibility` — **obligatorio** en cualquier componente visual (estándar WCAG 2.1 AA)
5. `qa` — cobertura de tests
6. `ux` — revisión holística al final del ciclo

## Process

1. **Analizar contexto**: leer los ficheros modificados (PR diff) o la descripción de la tarea.
2. **Seleccionar agentes**: aplicar las routing rules y filtrar por `status: active` del Agent Registry.
3. **Invocar agentes en orden**: respetar la prioridad definida; si un agente bloqueante falla, detener la cadena e informar.
4. **Agregar resultados**: consolidar hallazgos, eliminar duplicados y ordenar por severidad global (`critical > serious > moderate > minor`).
5. **Generar informe unificado**: estructurar con resumen ejecutivo + sección por agente.

## Outputs

- **Resumen ejecutivo**: estado global `✅ PASS / ⚠️ WARNINGS / ❌ BLOCKED` con conteo de hallazgos por severidad.
- **Sección por agente**: hallazgos, recomendaciones y snippets de corrección.
- **Blockers**: lista de acciones requeridas antes de merge (severidad `critical` / `serious`).
- **Mejoras**: lista de recomendaciones no bloqueantes (`moderate` / `minor`).

## Definition of Done

- Todos los agentes relevantes para los ficheros modificados han sido invocados.
- No existen hallazgos de severidad `critical` o `serious` sin resolver.
- El agente `accessibility` ha sido invocado en todo PR que modifique ficheros `.html`, `.component.ts` o `.scss`/`.css`.
- El informe agregado ha sido generado y entregado (comentario en PR o artefacto de CI).
- El Agent Registry está sincronizado con `manifest.yaml` (verificado por `update-orchestrator.yml`).
