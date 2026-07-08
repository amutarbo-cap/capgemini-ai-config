# Jira On-Premise MCP Server

Servidor MCP (Model Context Protocol) para conectarse a instancias **on-premise de Jira Server** usando **autenticación basada en cookies**.

## 🎯 Características

Este servidor MCP proporciona un conjunto completo de herramientas para interactuar con Jira on-premise:

### 📋 Issues
- `jira_search_issues` - Buscar issues usando JQL
- `jira_get_issue` - Obtener detalles de un issue
- `jira_create_issue` - Crear nuevos issues
- `jira_update_issue` - Actualizar issues existentes
- `jira_delete_issue` - Eliminar issues
- `jira_assign_issue` - Asignar/desasignar issues
- `jira_get_transitions` - Obtener transiciones disponibles
- `jira_transition_issue` - Realizar transiciones de workflow
- `jira_add_comment` - Añadir comentarios
- `jira_get_comments` - Obtener comentarios

### 📁 Projects
- `jira_get_projects` - Listar todos los proyectos
- `jira_get_project` - Obtener detalles de un proyecto
- `jira_get_project_issue_types` - Tipos de issue de un proyecto
- `jira_get_project_versions` - Versiones de un proyecto
- `jira_get_project_components` - Componentes de un proyecto

### 👥 Users
- `jira_get_current_user` - Usuario actual autenticado
- `jira_search_users` - Buscar usuarios
- `jira_get_user` - Obtener detalles de un usuario
- `jira_get_assignable_users` - Usuarios asignables a un proyecto

### 🔧 Metadata
- `jira_get_priorities` - Prioridades disponibles
- `jira_get_statuses` - Estados disponibles
- `jira_get_issue_types` - Tipos de issue disponibles
- `jira_get_fields` - Campos personalizados disponibles

### 🏃 Agile (Boards & Sprints)
- `jira_get_boards` - Listar todos los boards
- `jira_get_board` - Detalles de un board
- `jira_get_board_sprints` - Sprints de un board
- `jira_get_sprint_issues` - Issues de un sprint
- `jira_get_board_backlog` - Backlog de un board
- `jira_get_board_issues` - Issues de un board

### 🔄 Workflows
- `jira_get_workflows` - Información sobre workflows

## 📦 Instalación

```bash
# Clonar o crear el proyecto
cd jira-onprem-mcp

# Instalar dependencias
npm install

# Compilar TypeScript
npm run build
```

## 🔑 Configuración de Autenticación

### Paso 1: Obtener las Cookies de Jira

1. Abre tu navegador y accede a tu instancia de Jira
2. Inicia sesión normalmente
3. Abre las **DevTools** del navegador (F12)
4. Ve a la pestaña **Application** (Chrome) o **Storage** (Firefox)
5. En el panel izquierdo, busca **Cookies** y selecciona tu dominio de Jira
6. Copia los valores de estas cookies:
   - `JSESSIONID`
   - `atlassian.xsrf.token`
   - `seraph.rememberme.cookie` (opcional, pero recomendado)

### Paso 2: Configurar Variables de Entorno

Configura las siguientes variables de entorno (requeridas):

```bash
# URL base de tu instancia de Jira (sin barra final)
export JIRA_BASE_URL="https://jira.your-company.com"

# Cookie JSESSIONID (requerida)
export JIRA_JSESSIONID="tu_jsessionid_aqui"

# Cookie atlassian.xsrf.token (requerida)
export JIRA_XSRF_TOKEN="tu_xsrf_token_aqui"

# Cookie seraph.rememberme.cookie (opcional pero recomendada para mantener la sesión)
export JIRA_REMEMBER_ME_COOKIE="tu_remember_me_cookie_aqui"
```

**Nota**: `JIRA_USER_AGENT` es completamente opcional y puede omitirse (usa un valor por defecto si no se define).

### Paso 3: Configurar en tu Cliente MCP

Este servidor MCP funciona con cualquier cliente que soporte el Model Context Protocol:

#### 🎨 Claude Desktop

Edita el archivo de configuración:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "jira-onprem": {
      "command": "node",
      "args": ["/ruta/absoluta/a/jira-onprem-mcp/dist/index.js"],
      "env": {
        "JIRA_BASE_URL": "https://jira.your-company.com",
        "JIRA_JSESSIONID": "tu_jsessionid_aqui",
        "JIRA_XSRF_TOKEN": "tu_xsrf_token_aqui",
        "JIRA_REMEMBER_ME_COOKIE": "tu_remember_me_cookie_aqui"
      }
    }
  }
}
```

#### 💻 VS Code (con extensiones MCP)

Añade a tu `settings.json`:

```json
{
  "mcp.servers": {
    "jira-onprem": {
      "command": "node",
      "args": ["/ruta/absoluta/a/jira-onprem-mcp/dist/index.js"],
      "env": {
        "JIRA_BASE_URL": "https://jira.your-company.com",
        "JIRA_JSESSIONID": "tu_jsessionid_aqui",
        "JIRA_XSRF_TOKEN": "tu_xsrf_token_aqui",
        "JIRA_REMEMBER_ME_COOKIE": "tu_remember_me_cookie_aqui"
      }
    }
  }
}
```

#### 🔷 Cursor

Similar a VS Code, edita tu configuración en `Settings > MCP Servers` o añade a `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "jira-onprem": {
      "command": "node",
      "args": ["/ruta/absoluta/a/jira-onprem-mcp/dist/index.js"],
      "env": {
        "JIRA_BASE_URL": "https://jira.your-company.com",
        "JIRA_JSESSIONID": "tu_jsessionid_aqui",
        "JIRA_XSRF_TOKEN": "tu_xsrf_token_aqui",
        "JIRA_REMEMBER_ME_COOKIE": "tu_remember_me_cookie_aqui"
      }
    }
  }
}
```

#### 🤖 Otros Clientes MCP

El servidor usa **stdio transport**, compatible con cualquier cliente MCP estándar. Consulta la documentación de tu cliente para añadir servidores MCP personalizados.

**⚠️ Importante**: 
- Usa **rutas absolutas** al archivo `dist/index.js`
- Reemplaza los valores de las cookies con los reales
- Las cookies tienen **tiempo de expiración** y deberán renovarse periódicamente

## 🚀 Uso

### Probar Localmente

```bash
# Asegúrate de tener las variables de entorno configuradas
npm run dev
```

### Ejemplos de Uso

Una vez configurado el servidor MCP en tu cliente (Claude Desktop, VS Code, Cursor, etc.), puedes hacer preguntas como:

**Búsqueda de Issues:**
```
"Muéstrame mis issues abiertos asignados a mí"
"Busca todos los bugs de alta prioridad en el proyecto XYZ"
"¿Cuáles son los issues actualizados hoy?"
```

**Gestión de Issues:**
```
"Crea un nuevo bug en el proyecto ABC con título 'Error en login'"
"Actualiza el issue XYZ-123 cambiando la prioridad a High"
"Añade un comentario al issue ABC-456 diciendo que está en revisión"
"Cambia el estado del issue XYZ-789 a 'In Progress'"
```

**Proyectos y Metadata:**
```
"Lista todos los proyectos disponibles"
"¿Qué tipos de issue hay en el proyecto ABC?"
"Muéstrame las prioridades disponibles"
"¿Quiénes pueden ser asignados al proyecto XYZ?"
```

**Agile y Sprints:**
```
"Lista todos los boards de Scrum"
"¿Qué issues hay en el sprint activo del board 123?"
"Muéstrame el backlog del board ABC"
```

## 📝 Ejemplos de JQL

JQL (Jira Query Language) se usa en `jira_search_issues`:

```jql
# Mis issues abiertos
assignee=currentUser() AND status!=Closed AND status!=Done ORDER BY updated DESC

# Bugs de alta prioridad
type=Bug AND priority=High AND status="Open"

# Issues del sprint activo
sprint in openSprints() AND project=ABC

# Issues creados esta semana
created >= startOfWeek() AND project=XYZ

# Issues con una etiqueta específica
labels="urgent" AND status!="Done"
```

## 🔧 Desarrollo

```bash
# Instalar dependencias
npm install

# Modo desarrollo (compilación + ejecución)
npm run dev

# Solo compilar
npm run build

# Modo watch (recompila automáticamente)
npm run watch

# Ejecutar el servidor compilado
npm start
```

## 📂 Estructura del Proyecto

```
jira-onprem-mcp/
├── src/
│   ├── index.ts          # Servidor MCP principal
│   ├── jira-client.ts    # Cliente HTTP para Jira API
│   └── types.ts          # Tipos TypeScript
├── dist/                 # Código compilado
├── package.json
├── tsconfig.json
└── README.md
```

## 🔒 Seguridad

- **Nunca compartas tus cookies** en repositorios públicos o con terceros
- Las cookies tienen tiempo de expiración limitado
- Considera usar un usuario de servicio dedicado para automatizaciones
- Almacena las variables de entorno de forma segura

## 🐛 Troubleshooting

### Error: "Faltan variables de entorno requeridas"

Asegúrate de que `JIRA_BASE_URL`, `JIRA_JSESSIONID` y `JIRA_XSRF_TOKEN` están configuradas.

### Error de autenticación (401/403)

Las cookies han expirado. Vuelve a obtenerlas desde el navegador.

### Error de conexión

Verifica que:
- La URL de Jira es correcta
- Tienes acceso de red a la instancia de Jira
- Los certificados SSL son válidos (para HTTPS)

### Las herramientas no aparecen en tu cliente

1. Verifica que el archivo de configuración JSON esté bien formado
2. Reinicia tu cliente completamente (Claude Desktop, VS Code, Cursor, etc.)
3. Revisa los logs de tu cliente en la consola
4. Asegúrate de que la ruta al archivo `dist/index.js` es correcta y absoluta

## 📄 Licencia

MIT

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.
