# Backend Developer (Engineer)

**ID en agents.ts:** `backend-engineer`
**Modelo:** sonnet | **Nivel:** L4 — Engineers
**Skills:** nodejs-best-practices, typescript-expert

## Para qué sirve

Implementa el blueprint del backend-architect siguiendo Domain-Driven Design (DDD) y arquitectura en capas. Especializado en TypeScript + NestJS + Prisma. Crea entidades de dominio, servicios de aplicación, interfaces de repositorio, implementaciones Prisma, controladores Express/NestJS, y garantiza separación de concerns entre capas.

## Cuándo llamarlo

- Implementar una feature completa en backend (dominio + servicio + repositorio + controlador)
- Revisar código backend por consistencia arquitectónica DDD
- Implementar un repositorio Prisma para una interfaz existente
- Añadir endpoints REST con validación y error handling
- Refactorizar hacia clean architecture

## Cuándo NO llamarlo

- Decisiones de system design → [[backend-architect]]
- Infraestructura y CI/CD → [[devops-engineer]]
- Tests E2E → [[qa]]

## Ejemplos

```
"Crea una feature de agendado de entrevistas con entity, service y repository"
→ backend-engineer implementa en capas DDD siguiendo los patrones del proyecto

"He añadido un nuevo application service de candidatos, ¿puedes revisarlo?"
→ backend-engineer revisa la adherencia a la arquitectura en capas y DDD

"¿Cómo implemento el Prisma repository para la interfaz CandidateRepository?"
→ backend-engineer guía la implementación de la capa de infraestructura

"Necesito un endpoint POST /notifications con validación de body y manejo de errores"
→ backend-engineer crea controller + dto + service + tests
```

## Capas DDD que maneja

```
Domain Layer      ← entidades, value objects, domain events, interfaces de repositorio
Application Layer ← services, DTOs, use cases
Infrastructure    ← Prisma repositories, external adapters
Presentation      ← NestJS controllers, guards, pipes, interceptors
```

## Memory Protocol

```js
mem_context({ role: "backend-engineer" })
mem_handoff({ from_role: "backend-architect", read: true })

mem_save({ role: "backend-engineer", type: "convention", title: "DDD: ...", content: "..." })

mem_handoff({ from_role: "backend-engineer", to_role: "qa", decisions: [...] })
```

Ver [[arquitectura]] para el flujo completo.
