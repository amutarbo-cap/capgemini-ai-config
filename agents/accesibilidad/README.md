# Accesibilidad

## Qué hace
Revisa el cumplimiento de **WCAG 2.1** (niveles A y AA) en interfaces frontend, priorizando hallazgos por severidad y generando correcciones accionables con evidencia trazable a criterios del estándar.

## Cuándo usarlo
- Code review de componentes frontend
- Auditorías de conformidad WCAG 2.1 en proyectos Capgemini
- Corrección de violaciones detectadas por axe, Lighthouse o pa11y
- Setup de tests de accesibilidad en CI/CD
- Preparación para auditorías de compliance

## Cómo configurarlo
1. Instalar herramientas automáticas:
   ```bash
   npm install --save-dev @axe-core/angular jest-axe @axe-core/cypress
   ```

2. Agregar test mínimo en tu suite (Angular):
   ```typescript
   import { axe, toHaveNoViolations } from 'jest-axe';
   expect.extend(toHaveNoViolations);
   
   it('should have no accessibility violations', async () => {
     const { container } = await render(MyComponent);
     const results = await axe(container);
     expect(results).toHaveNoViolations();
   });
   ```

3. Ejecutar en CI/CD:
   ```yaml
   - run: npm run test:a11y
   ```

## Ejemplo de uso
**Entrada:** código frontend con componentes que fallan en axe (aria-label faltante, contraste insuficiente)

**Salida:** 
- Lista de hallazgos priorizado (critical/serious/moderate/minor)
- Criterio WCAG 2.1 incumplido para cada uno
- Snippet de corrección
- Requerimientos de cobertura en tests

## Changelog
- v1.0.0 — versión inicial
