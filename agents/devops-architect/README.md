# DevOps Architect

## Qué hace

Diseña arquitecturas de infraestructura cloud-native aplicando el AWS/GCP/Azure Well-Architected Framework. Define topologías de Kubernetes, estrategias CI/CD, stack de observabilidad, IAM y FinOps. **No escribe Terraform ni Helm directamente** — produce blueprints que el devops-engineer implementará.

Opera como **L3 del swarm SDD** — trabaja en paralelo con el backend-architect para definir la plataforma sobre la que corren los servicios.

## Cuándo usarlo

- Diseño de arquitectura cloud para nuevos proyectos
- Migración de monolito a Kubernetes o cloud-native
- Definición de SLO/SLA targets y error budget policy
- Diseño de estrategia de observabilidad (métricas, logs, traces, alertas)
- Optimización de costes cloud (FinOps)

## Cómo configurarlo

Se instala automáticamente al ejecutar `/sdd-swarm` y seleccionar el nivel L3 — Architects > DevOps Architect.

```bash
dcxsdd swarm
# Seleccionar: L3 > DevOps Architect
```

## Ejemplo de uso

**Entrada:** "Queremos mover nuestro monolito Node.js a Kubernetes en AWS. ¿Por dónde empezamos?"

**Salida:**
- EKS cluster topology: 3 node pools (system, general, spot)
- Network: VPC con subnets public/private/data, Transit Gateway
- CI/CD: GitHub Actions + ArgoCD (GitOps) + image promotion pipeline
- Observability: Prometheus + Grafana + Loki + Tempo con SLOs por servicio
- Security: IRSA + External Secrets Operator + Trivy en CI
- Cost estimate: ~$2,400/mes con rightsizing recomendado
- Phased migration plan: strangler fig en 3 fases
- Handoff para devops-engineer

## Changelog

- v1.0.0 — versión inicial, migrado desde dcx-sdd-kit/docs/agents/devops-architect.agent.md
