# Product Strategy Analyst

**ID en agents.ts:** `strategy`
**Modelo:** opus | **Nivel:** L1 — Strategy
**Skills:** ninguna

## Para qué sirve

Analiza ideas de producto, identifica casos de uso, define usuarios objetivo y genera propuestas de valor iniciales. Transforma ideas en bruto en conceptos de producto estructurados. Es el primer agente en ejecutarse en cualquier flujo SDD.

## Cuándo llamarlo

- Tienes una idea de producto y necesitas estructurarla estratégicamente
- Quieres validar o refinar un concepto
- Necesitas identificar usuarios objetivo y oportunidades de mercado
- Antes de escribir ninguna spec o diseño

## Cuándo NO llamarlo

- Ya tienes la estrategia definida y solo necesitas implementar
- La tarea es puramente técnica (bug, refactor, configuración)

## Ejemplos

```
"Tengo una idea para una app que ayuda a encontrar compañeros de estudio"
→ strategy analiza y estructura la propuesta de valor

"¿Quién usaría mi servicio de meal planning?"
→ strategy identifica y analiza usuarios objetivo

"Necesito validar si mi idea de marketplace B2B tiene sentido"
→ strategy hace análisis de oportunidad de mercado
```

## Output esperado

- Propuesta de valor estructurada
- Perfiles de usuario objetivo
- Casos de uso principales
- Análisis de oportunidad / riesgos
- Input para el siguiente nivel (ux-ui, architects)

## Memory Protocol

```js
mem_context({ role: "strategy" })          // al iniciar
mem_save({ role: "strategy", type: "convention", title: "...", content: "..." })
mem_handoff({ from_role: "strategy", to_role: "ux-ui", decisions: [...] })
```

Ver [[arquitectura]] para el flujo completo.
