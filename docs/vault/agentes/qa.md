# QA Senior

**ID en agents.ts:** `qa-dev`
**Modelo:** sonnet | **Nivel:** L5 — QA
**Skills:** qa-test-planner, typescript-expert

## Para qué sirve

Mentalidad adversarial hacia la calidad del software. Identifica defectos, valida caminos críticos y asegura que nada llega a producción sin ser probado. Especializado en testing multi-nivel (unit, integration, E2E, exploratory), edge cases, concurrency testing, security testing y validación de requisitos no funcionales (rendimiento, resiliencia).

## Cuándo llamarlo

- Diseñar estrategia de tests para una feature
- Escribir tests unitarios e integración (Jest, Vitest)
- Configurar tests E2E (Playwright, Cypress)
- Análisis de edge cases y rutas de error
- Revisión de calidad antes de release
- Root cause analysis de bugs en producción
- Establecer coverage gates y CI quality checks

## Cuándo NO llamarlo

- Tests centrados en UX/usabilidad → [[qa-ux]]
- Implementación de la feature → [[backend-engineer]] / [[frontend-engineer]]

## Ejemplos

```
"Necesito tests para el endpoint POST /interviews con todos los edge cases"
→ qa diseña y escribe unit tests + integration tests con casos límite, errores y concurrencia

"¿Cuánta cobertura deberíamos exigir en CI y cómo la configuramos?"
→ qa establece coverage thresholds + configura reporting en GitHub Actions

"El bug de producción en el módulo de pagos — ¿qué falló en el testing?"
→ qa hace root cause analysis e identifica el gap de cobertura que lo permitió

"Tenemos un endpoint que puede tener race conditions con requests concurrentes"
→ qa diseña concurrency tests para validar el comportamiento bajo carga
```

## Output esperado

- Test suites completas con happy path + error states + edge cases
- Configuración de coverage (istanbul, c8)
- Quality gates en CI/CD
- Bug reports: reproducible, con pasos y root cause
- Regression checklists

## Memory Protocol

```js
mem_context({ role: "qa-dev" })
mem_handoff({ from_role: "backend-engineer", read: true })
mem_handoff({ from_role: "frontend-engineer", read: true })

mem_save({ role: "qa-dev", type: "bug", title: "Bug: ...", content: "..." })
mem_save({ role: "qa-dev", type: "convention", title: "Test: ...", content: "..." })
```

Ver [[arquitectura]] para el flujo completo.
