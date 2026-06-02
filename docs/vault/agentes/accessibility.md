# Accessibility Specialist

**ID en agents.ts:** `accessibility`
**Modelo:** opus | **Nivel:** L2 — UX & Accessibility
**Skills:** accessibility-a11y

## Para qué sirve

Auditoría WCAG 2.1/2.2, ARIA, navegación por teclado, compatibilidad con lectores de pantalla y diseño inclusivo. Opera tanto sobre diseño (wireframes) como sobre código (HTML, CSS, JS, Angular templates). Genera informes con issues priorizados y snippets de corrección accionables.

## Cuándo llamarlo

- Auditar una feature antes de release
- Retroalimentar componentes existentes para cumplir WCAG
- Establecer estándares de accesibilidad para el design system
- Revisar contraste, ARIA, foco, semántica HTML
- Validar compatibilidad con NVDA, JAWS, VoiceOver, TalkBack

## Cuándo NO llamarlo

- Necesitas el diseño general del UI → [[ux-ui]]
- Solo necesitas implementar la corrección → [[frontend-engineer]]

## Ejemplos

```
"Tenemos un componente select custom que no funciona con lectores de pantalla"
→ accessibility audita contra WCAG 2.1 y provee fixes ARIA + teclado

"¿El contraste de nuestros botones cumple AA?"
→ accessibility valida ratios (4.5:1 texto normal, 3:1 UI components)

"Queremos establecer un baseline de accesibilidad para todo el design system"
→ accessibility define las guías y checklists de regresión
```

## Output esperado (`.claude/doc/{feature}/accessibility-audit.md`)

- Resumen de issues por severidad (Critical / Major / Minor)
- Tabla: Componente | WCAG SC | Severidad | Descripción | Fix
- Code examples antes/después
- Regression checklist para PRs

## Severidades

| Nivel | Significado |
|-------|-------------|
| Critical | Bloqueante — usuario no puede completar la tarea |
| Major | Barrera significativa |
| Minor | Mejora de UX |

## Memory Protocol

```js
mem_context({ role: "accessibility" })
mem_handoff({ role: "accessibility", read: true })  // leer handoff de ux-ui

mem_save({ role: "accessibility", type: "bug", title: "A11Y: ...", content: "..." })

mem_handoff({
  from_role: "accessibility",
  to_role: "frontend-engineer",
  decisions: ["WCAG 2.1 AA como baseline"],
  constraints: ["No usar ARIA cuando HTML nativo es suficiente"]
})
```

Ver [[arquitectura]] para el flujo completo.
