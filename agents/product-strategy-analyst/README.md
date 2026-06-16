# Product Strategy Analyst

## Qué hace

Transforma ideas de producto en conceptos estratégicos estructurados. Analiza el mercado, define personas de usuario, mapea casos de uso y construye propuestas de valor usando frameworks como Jobs-to-be-Done, Blue Ocean Strategy y Value Proposition Canvas.

Opera como **L1 del swarm SDD** — es el primer agente en activarse en cualquier flujo de desarrollo y produce el handoff estratégico que guía a los architects.

## Cuándo usarlo

- Inicio de un nuevo producto o feature con requisitos ambiguos
- Validación de hipótesis de negocio antes de invertir en desarrollo
- Análisis de oportunidad de mercado o segmentación de usuarios
- Definición de MVP y priorización de funcionalidades
- Preparación del contexto estratégico para el swarm SDD (`/sdd-propose`)

## Cómo configurarlo

Este agente se instala automáticamente al ejecutar `/sdd-swarm` y seleccionar el nivel L1 — Strategy.

Para instalación manual en Claude Code:

```bash
# Añadir al swarm del proyecto
dcxsdd swarm
# Seleccionar: L1 > Product Strategy Analyst
```

El agente usa el MCP `sdd-memory` para persistir decisiones entre sesiones. Asegúrate de que esté configurado:

```json
{
  "mcpServers": {
    "sdd-memory": {
      "command": "npx",
      "args": ["-y", "@dmuleroa/sdd-memory"]
    }
  }
}
```

## Ejemplo de uso

**Entrada:** "Tenemos una idea para una app que ayuda a equipos de desarrollo a hacer onboarding más rápido con IA"

**Salida:**
- Análisis SWOT del mercado de developer tools
- 5 casos de uso priorizados por impacto/esfuerzo
- 3 personas (Tech Lead, Junior Developer, Engineering Manager)
- Propuesta de valor: "Reduce el tiempo de onboarding de 4 semanas a 1 semana"
- Hipótesis MVP a validar en 2 semanas
- Handoff para frontend-architect y backend-architect

## Changelog

- v1.0.0 — versión inicial, migrado desde dcx-sdd-kit/docs/agents/strategy.agent.md
