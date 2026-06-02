# QA UX Tester

**ID en agents.ts:** `qa-ux`
**Modelo:** sonnet | **Nivel:** L5 — QA
**Skills:** qa-test-planner, accessibility-a11y, ui-ux-pro-max

## Para qué sirve

Puente entre metodología QA y estándares UX. Asegura que lo que se lanza coincide con la intención de diseño y proporciona una experiencia fluida. Especializado en planes de testing de usabilidad, casos de test de regresión UI, validación de journeys E2E de usuario, consistencia visual y compatibilidad cross-browser / cross-device.

## Cuándo llamarlo

- Escribir E2E tests a partir de user journeys (Playwright, Cypress)
- Revisar la UI implementada contra las specs de diseño
- Identificar defectos de usabilidad antes del release
- Testing cross-browser y cross-device
- Validar accesibilidad desde perspectiva de testing (distinto al audit de [[accessibility]])
- Establecer estándares de UI testing para el equipo

## Cuándo NO llamarlo

- Tests unitarios y de integración de código → [[qa]]
- Auditoría de accesibilidad WCAG → [[accessibility]]
- Decisiones de diseño → [[ux-ui]]

## Ejemplos

```
"El checkout flow está implementado y necesita QA antes del release"
→ qa-ux crea plan de tests UX: happy path, error states, fidelidad al diseño

"Necesitamos verificar que el dashboard funciona en Chrome, Firefox, Safari y móvil"
→ qa-ux diseña matrix de compatibilidad y casos de test por browser/device

"El formulario de registro se ve diferente en algunos navegadores"
→ qa-ux identifica los defectos de regresión visual y los documenta con pasos de reproducción

"Crea los tests E2E para el onboarding de usuario nuevo"
→ qa-ux traduce el user journey en scripts Playwright con assertions de UX
```

## Output esperado

- Plan de tests UX (happy path + error states + edge cases visuales)
- Scripts E2E (Playwright / Cypress) organizados por user journey
- Matrix de compatibilidad cross-browser/device
- Bug reports de usabilidad con capturas y pasos de reproducción
- Checklists de regresión visual para PRs

## Memory Protocol

```js
mem_context({ role: "qa-ux" })
mem_handoff({ from_role: "frontend-engineer", read: true })
mem_handoff({ from_role: "ux-ui", read: true })
mem_handoff({ from_role: "accessibility", read: true })

mem_save({ role: "qa-ux", type: "bug", title: "UX Bug: ...", content: "..." })
```

Ver [[arquitectura]] para el flujo completo.
