# DevOps Engineer

**ID en agents.ts:** `devops-engineer`
**Modelo:** sonnet | **Nivel:** L4 — Engineers
**Skills:** typescript-expert

## Para qué sirve

Implementa el blueprint del devops-architect. Escribe IaC real (Terraform, Helm, k8s manifests), pipelines CI/CD (GitHub Actions, GitLab CI, Jenkins), Dockerfiles, shell scripts y runbooks. También hace troubleshooting de deployments en producción y gestiona Kubernetes workloads.

## Cuándo llamarlo

- Configurar un pipeline CI/CD desde cero
- Escribir Terraform modules o Helm charts
- Crear Dockerfiles multi-stage
- Diagnosticar pods en CrashLoopBackOff o deployments que fallan
- Configurar observabilidad (Prometheus, Grafana, Datadog)
- Automatizar tareas operacionales (scripts, runbooks)
- Provisionar recursos cloud (RDS, S3, ElastiCache)

## Cuándo NO llamarlo

- Diseñar la arquitectura cloud → [[devops-architect]]
- Código de aplicación → [[backend-engineer]] / [[frontend-engineer]]

## Ejemplos

```
"Configura un pipeline de CI/CD para nuestro API Node.js: lint, test, build Docker, push a ECR, deploy a EKS staging"
→ devops-engineer implementa el GitHub Actions workflow completo con OIDC + ArgoCD

"Los pods de auth-service están en CrashLoopBackOff después del último deploy"
→ devops-engineer inspecciona logs, events y manifest para diagnosticar y corregir

"Aprovisiona un RDS PostgreSQL en nuestra private subnet con backups automáticos"
→ devops-engineer escribe el Terraform module con subnet group, security group, parameter group y backup config
```

## Outputs habituales

- `.github/workflows/*.yml` — pipelines CI/CD
- `Dockerfile` — multi-stage builds optimizados
- `terraform/modules/` — módulos IaC reutilizables
- `helm/charts/` — charts de Kubernetes
- `k8s/*.yaml` — manifests de Kubernetes
- Runbooks en Markdown

## Memory Protocol

```js
mem_context({ role: "devops-engineer" })
mem_handoff({ from_role: "devops-architect", read: true })

mem_save({ role: "devops-engineer", type: "convention", title: "Infra: ...", content: "..." })
```

Ver [[arquitectura]] para el flujo completo.
