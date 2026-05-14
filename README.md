# capgemini-ai-config

Repositorio central para distribuir configuraciones de IA reutilizables entre proyectos:

- Agentes
- Skills
- SDDs (system design docs)
- MCPs

La idea es mantener una sola fuente de verdad y permitir que otros repos sincronicen cambios usando GitHub Actions.

## Estructura

```text
.github/
  actions/
    sync-ai-config/
      action.yml
  workflows/
    validate-catalog.yml
catalog/
  agents/
  skills/
  sdd/
  mcps/
manifest.yaml
templates/
  consumer-sync.yml
```

## Uso desde repos consumidores

1. Copia el workflow de ejemplo `templates/consumer-sync.yml` al repo consumidor en `.github/workflows/sync-ai-config.yml`.
2. Ajusta:
   - `paths`: qué carpetas del catálogo quieres traer.
   - `target_root`: destino dentro del repo consumidor.
   - `ref`: rama, tag o commit del repo central (`main`, `v1`, etc).
3. Ejecuta manualmente el workflow o prográmalo con `schedule`.

## Recomendación de versionado

- Usa tags semánticos para releases estables: `v1.0.0`, `v1.1.0`.
- En repos consumidores, fija `ref` a un tag para reproducibilidad.
- Usa `main` solo para probar cambios.

## Seguridad y permisos

El workflow consumidor usa `contents: write` para poder commitear cambios en su propio repo.
Si este repo central es privado, añade un secret en el repo consumidor:

- `AI_CONFIG_SOURCE_TOKEN`: PAT con lectura al repo `capgemini-ai-config`.

## Convenciones sugeridas

- Cada configuración debe tener owner y versión en `manifest.yaml`.
- Evitar lógica específica de un proyecto dentro del catálogo central.
- Mantener ejemplos y plantillas como referencia, no como código acoplado.
