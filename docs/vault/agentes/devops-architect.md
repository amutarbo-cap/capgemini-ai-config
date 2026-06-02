# DevOps Architect

**ID en agents.ts:** `devops-architect`
**Modelo:** opus | **Nivel:** L3 — Architects
**Skills:** typescript-expert

## Para qué sirve

Define el blueprint de infraestructura y operaciones. NO escribe Terraform ni Helm charts — establece la arquitectura cloud, CI/CD strategy, container orchestration, observabilidad, seguridad y cost optimization que los devops engineers implementarán. Diseña también disaster recovery y SRE practices.

## Cuándo llamarlo

- Migrar una aplicación a contenedores / cloud-native
- Diseñar cluster topology (EKS, GKE, AKS)
- Definir estrategia multi-environment
- Problemas de observabilidad — diseñar el stack (metrics, logs, traces, alerting)
- Optimización de costes cloud (FinOps)
- Establecer guardrails de seguridad y compliance

## Cuándo NO llamarlo

- Implementar IaC (Terraform, Helm, k8s manifests) → [[devops-engineer]]
- Código de aplicación → [[backend-architect]] / [[frontend-architect]]

## Ejemplos

```
"Queremos mover nuestro monolito Node.js a Kubernetes en AWS"
→ devops-architect diseña containerization strategy, EKS cluster topology, phased migration plan

"Los alerts nos llegan tarde — los clientes reportan antes que nosotros"
→ devops-architect diseña observability stack con SLO-based error budgets

"El bill de AWS subió un 40% el trimestre pasado"
→ devops-architect hace auditoría FinOps y rediseña infraestructura para eficiencia de costes
```

## Output esperado

- Architecture Decision Records (ADRs) de infraestructura
- Diagrama de cloud topology
- Diseño del observability stack
- Security guardrails y compliance requirements
- FinOps strategy
- Blueprint para devops-engineer

## Memory Protocol

```js
mem_context({ role: "devops-architect" })

mem_save({ role: "devops-architect", type: "convention", title: "Infra: ...", content: "..." })

mem_handoff({
  from_role: "devops-architect",
  to_role: "devops-engineer",
  decisions: ["EKS en us-east-1", "ArgoCD para GitOps", "Datadog para observabilidad"],
  constraints: ["RTO < 1h", "RPO < 15min", "Budget máximo $X/mes"]
})
```

Ver [[arquitectura]] para el flujo completo.
