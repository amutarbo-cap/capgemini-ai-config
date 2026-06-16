# accesibilidad

Agente revisor de cumplimiento WCAG 2.1 para interfaces frontend.

## Cambios respecto al original

El YAML original en el repo central carecía de los campos `hierarchy` y `skills`,
y no tenía `prompt.md`. Este directorio contiene la versión completa lista para subir.

### Añadido en `accesibilidad.yaml`

```yaml
hierarchy:
  level: 2
  role: ux-accessibility

skills:
  - accessibility-a11y
```

- `hierarchy` — necesario para que el transform script lo asigne al nivel 2 (UX & Accessibility)
  junto a `ux-ui-designer` en el swarm
- `skills` — skill de accesibilidad que se instala automáticamente con el agente

### Añadido `prompt.md`

System prompt completo del agente. Sin este archivo el transform script lo omite
con un warning y el agente no aparece en el catálogo del kit.

## Cómo subir al repo central

Copiar los tres archivos a `agents/accesibilidad/` en `capgemini-ai-config` y hacer push.
El próximo release del kit lo incluirá automáticamente en `docs/agents-catalog.json`.
