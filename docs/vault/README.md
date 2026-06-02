# DCX Brain — Vault del Equipo

Vault de Obsidian con contexto comprimido del ecosistema DCX AI.
Úsalo con Claude Code para reducir tokens y tener contexto inmediato en cualquier sesión.

## Contenido

- [[ecosistema]] — Instalación, despliegue y arquitectura de los 3 proyectos
- [[capgemini-ai-config]] — Agentes, skills, MCPs y CI/CD
- [[dcx-sdd-kit]] — CLI SDD, comandos, flujo de trabajo
- [[ia-portal]] — Angular + NestJS + PostgreSQL, rutas, convenciones

## Agentes del Swarm

- [[arquitectura]] — Jerarquía L1→L5 y flujo entre agentes
- **L1** [[strategy]]
- **L2** [[ux-ui]] · [[accessibility]]
- **L3** [[frontend-architect]] · [[backend-architect]] · [[devops-architect]]
- **L4** [[frontend-engineer]] · [[backend-engineer]] · [[devops-engineer]]
- **L5** [[qa]] · [[qa-ux]]

## Setup para nuevos miembros

### 1. Clonar el vault

```bash
# El vault está dentro de capgemini-ai-config
git clone https://github.com/amutarbo-cap/capgemini-ai-config.git
```

### 2. Abrir en Obsidian

- Abrir Obsidian → "Abrir otra bóveda" → "Abrir carpeta como bóveda"
- Seleccionar `capgemini-ai-config/docs/vault/`

### 3. Conectar con Claude Code (MCP)

```bash
# Instalar obsidian-mcp globalmente (una vez)
npm install -g obsidian-mcp

# Añadir al Claude Code como MCP de usuario
# Windows:
claude mcp add dcx-brain -s user -- cmd /c obsidian-mcp "RUTA_LOCAL\capgemini-ai-config\docs\vault"

# Mac/Linux:
claude mcp add dcx-brain -s user -- obsidian-mcp "/ruta/local/capgemini-ai-config/docs/vault"
```

### 4. Configurar CLAUDE.md en cada repo

Añade al `CLAUDE.md` de cada proyecto:

```markdown
> Lee el vault antes de empezar:
> - Contexto: `RUTA_LOCAL/capgemini-ai-config/docs/vault/proyectos/<nombre-proyecto>.md`
```

## Nota sobre `sesion-activa.md`

Este archivo es **personal** — no está en el repo. Cada desarrollador crea el suyo localmente:

```bash
# Crea tu sesion-activa.md local (no se commitea)
echo "# Sesión Activa\n\n## Proyecto actual\n\n## Qué estoy construyendo" > sesion-activa.md
```

El `.gitignore` lo excluye automáticamente.
