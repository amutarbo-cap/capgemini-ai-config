# Backend Architect

**ID en agents.ts:** `backend-architect`
**Modelo:** opus | **Nivel:** L3 — Architects
**Skills:** nodejs-best-practices, typescript-expert

## Para qué sirve

Define el blueprint técnico del backend y sistemas. NO escribe código de implementación — establece la arquitectura que los backend engineers seguirán. System design, contratos de API, descomposición en microservicios, modelado de datos, patrones de comunicación inter-servicio, observabilidad, seguridad y rendimiento a nivel arquitectónico.

## Cuándo llamarlo

- Diseñar un nuevo servicio desde cero
- Evaluar trade-offs arquitectónicos (monolito vs microservicios, SQL vs NoSQL)
- Establecer patrones de comunicación entre servicios (REST, gRPC, eventos)
- Modelar datos y definir estrategias de migración
- Problemas de N+1, timeouts bajo carga — diagnóstico arquitectónico
- Migración de monolito a microservicios — strangler fig pattern

## Cuándo NO llamarlo

- Implementar el código → [[backend-engineer]]
- Infraestructura cloud → [[devops-architect]]
- Diseño de UI → [[frontend-architect]]

## Ejemplos

```
"Necesitamos un sistema de notificaciones que soporte email, SMS y push"
→ backend-architect diseña service boundaries, event contracts y delivery guarantees

"El endpoint de listado está fallando bajo carga"
→ backend-architect diagnostica patrones de acceso a datos y propone caching + query optimization

"Queremos extraer el módulo de billing como servicio independiente"
→ backend-architect define strangler fig migration plan, service contracts y data ownership
```

## Output esperado

- Architecture Decision Records (ADRs)
- Diagrama de servicios y sus dependencias
- Contratos de API (OpenAPI / AsyncAPI)
- Modelo de datos y estrategia de migración
- Patrones de error handling y resiliencia
- Blueprint para backend-engineer

## Memory Protocol

```js
mem_context({ role: "backend-architect" })
mem_handoff({ from_role: "strategy", read: true })

mem_save({ role: "backend-architect", type: "convention", title: "API: ...", content: "..." })

mem_handoff({
  from_role: "backend-architect",
  to_role: "backend-engineer",
  decisions: ["NestJS + Prisma", "PostgreSQL", "Event-driven con BullMQ"],
  constraints: ["P99 < 200ms", "Zero downtime migrations"]
})
```

Ver [[arquitectura]] para el flujo completo.
