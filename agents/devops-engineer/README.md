# DevOps Engineer

## Qué hace

Implementa infraestructura cloud-native production-ready siguiendo el blueprint del devops-architect. Escribe Dockerfiles multi-stage, manifests Kubernetes, charts Helm, módulos Terraform y pipelines CI/CD. Diagnostica incidentes live con `kubectl` y documenta runbooks para cada alerta.

Opera como **L4 del swarm SDD** — traduce los blueprints del devops-architect en configuración real que pasa por CI antes de llegar a producción.

## Cuándo usarlo

- Implementación de pipelines CI/CD nuevos o refactoring de existentes
- Escritura de Dockerfiles y configuración de imágenes
- Creación de manifests Kubernetes y charts Helm
- Provisioning de infraestructura con Terraform
- Diagnóstico de incidentes Kubernetes (CrashLoopBackOff, OOMKilled, etc.)
- Configuración de observabilidad (Prometheus, Grafana, Loki, OpenTelemetry)

## Cómo configurarlo

Se instala automáticamente al ejecutar `/sdd-swarm` y seleccionar el nivel L4 — Engineers > DevOps Engineer.

## Ejemplo de uso

**Entrada:** "Configura el pipeline CI/CD para nuestra API Node.js: lint, test, Docker, push a ECR, deploy a EKS staging"

**Salida:**
- `.github/workflows/ci.yml` con OIDC auth, matrix build, concurrency control
- `Dockerfile` multi-stage (builder → distroless), non-root, HEALTHCHECK
- `k8s/deployment.yaml` con resources, probes, PDB, SecurityContext
- `terraform/modules/ecr/` con lifecycle policy y scan-on-push
- Rollback procedure documentado en runbook
- Handoff para qa-developer (smoke tests en staging)

## Changelog

- v1.0.0 — versión inicial, migrado desde dcx-sdd-kit/docs/agents/devops-engineer.agent.md
