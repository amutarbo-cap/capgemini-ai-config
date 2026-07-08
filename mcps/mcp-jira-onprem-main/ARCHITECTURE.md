# Arquitectura del Proyecto

## 📁 Estructura del Código

```
jira-onprem-mcp/
├── src/
│   ├── index.ts              # Servidor MCP principal
│   ├── jira-client.ts        # Cliente HTTP para Jira API
│   ├── types.ts              # Definiciones de tipos TypeScript
│   └── test-connection.ts    # Script de prueba de conexión
├── dist/                     # Código JavaScript compilado
├── node_modules/             # Dependencias
├── package.json              # Configuración del proyecto
├── tsconfig.json             # Configuración TypeScript
├── .env.example              # Plantilla de variables de entorno
├── .gitignore               # Archivos ignorados por Git
├── README.md                 # Documentación principal
├── QUICKSTART.md             # Guía de inicio rápido
├── EXAMPLES.md               # Ejemplos de uso
└── config.example.json  # Plantilla de config para Claude
```

## 🏗️ Componentes Principales

### 1. Servidor MCP (`src/index.ts`)

**Responsabilidades:**
- Inicializar el servidor MCP usando el SDK de Anthropic
- Registrar todas las herramientas disponibles
- Manejar las peticiones de ejecución de herramientas
- Gestionar errores y respuestas

**Flujo de ejecución:**
```
1. Leer variables de entorno (JIRA_BASE_URL, cookies, etc.)
2. Crear instancia de JiraClient con la configuración
3. Inicializar servidor MCP
4. Registrar handlers:
   - ListToolsRequestSchema: devuelve lista de herramientas
   - CallToolRequestSchema: ejecuta una herramienta específica
5. Conectar con transporte stdio
6. Escuchar peticiones de Claude Desktop
```

**Categorías de herramientas:**
- **Issues**: 10 herramientas (search, get, create, update, delete, etc.)
- **Projects**: 5 herramientas (list, get, issue types, versions, components)
- **Users**: 4 herramientas (current user, search, get, assignable users)
- **Metadata**: 4 herramientas (priorities, statuses, issue types, fields)
- **Agile**: 6 herramientas (boards, sprints, backlog, issues)
- **Workflows**: 1 herramienta (get workflows)

**Total**: 30 herramientas

### 2. Cliente Jira (`src/jira-client.ts`)

**Responsabilidades:**
- Encapsular toda la lógica de comunicación con Jira API REST
- Gestionar autenticación por cookies
- Realizar peticiones HTTP (GET, POST, PUT, DELETE)
- Transformar respuestas al formato esperado

**Arquitectura:**
```typescript
class JiraClient {
  private readonly _axiosInstance: AxiosInstance;
  private readonly _baseUrl: string;

  constructor(config: JiraConfig) {
    // Configurar axios con cookies en headers
  }

  // Métodos privados de bajo nivel
  private async _get<T>(endpoint: string, params?: any): Promise<T>
  private async _post<T>(endpoint: string, data?: any): Promise<T>
  private async _put<T>(endpoint: string, data?: any): Promise<T>
  private async _delete<T>(endpoint: string): Promise<T>

  // Métodos públicos de alto nivel
  async searchIssues(...): Promise<...>
  async getIssue(...): Promise<...>
  async createIssue(...): Promise<...>
  // ... 25+ métodos más
}
```

**Características clave:**
- Usa axios para peticiones HTTP
- Headers automáticos (Cookie, User-Agent, Content-Type)
- Timeout de 30 segundos por defecto
- Manejo de errores integrado
- Soporte completo para Jira REST API v2 y Agile API v1

### 3. Tipos TypeScript (`src/types.ts`)

**Interfaces principales:**

```typescript
JiraConfig        // Configuración del cliente
JiraIssue         // Estructura de un issue
JiraProject       // Estructura de un proyecto
JiraUser          // Estructura de un usuario
JiraBoard         // Board de Agile
JiraSprint        // Sprint de Agile
JiraTransition    // Transición de workflow
JiraComment       // Comentario en un issue
```

**Beneficios:**
- Type safety en todo el código
- Autocompletado en IDE
- Documentación implícita
- Detección de errores en tiempo de compilación

## 🔄 Flujo de una Petición

### Ejemplo: "Muéstrame mis issues abiertos"

```
┌─────────────────┐
│  Claude Desktop │
└────────┬────────┘
         │ 1. Usuario hace pregunta
         ↓
┌─────────────────┐
│   Claude AI     │  2. Claude decide usar herramienta
└────────┬────────┘     jira_search_issues
         │
         ↓
┌─────────────────┐
│  MCP Server     │  3. CallToolRequest recibido
│   (index.ts)    │     args: { jql: "assignee=currentUser()..." }
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  JiraClient     │  4. jiraClient.searchIssues(jql, options)
│ (jira-client.ts)│
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Jira Server    │  5. GET /rest/api/2/search
│  (on-premise)   │     Headers: Cookie, User-Agent, etc.
└────────┬────────┘
         │
         ↓ 6. Response JSON
┌─────────────────┐
│  JiraClient     │  7. Parse y retorna datos
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  MCP Server     │  8. Formatea respuesta MCP
└────────┬────────┘     { content: [{ type: "text", text: "..." }] }
         │
         ↓
┌─────────────────┐
│  Claude AI      │  9. Claude procesa y presenta al usuario
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Claude Desktop │  10. Usuario ve resultado
└─────────────────┘
```

## 🔐 Gestión de Autenticación

### Autenticación por Cookies

```typescript
// En JiraClient constructor
const cookieHeader = Object.entries(config.cookies)
  .filter(([_, value]) => value)
  .map(([key, value]) => `${key}=${value}`)
  .join('; ');

this._axiosInstance = axios.create({
  headers: {
    Cookie: cookieHeader,  // ← Autenticación
    'User-Agent': '...',
    'Content-Type': 'application/json',
  },
});
```

### Cookies utilizadas:
1. **JSESSIONID**: Sesión activa del usuario
2. **atlassian.xsrf.token**: Protección CSRF
3. **seraph.rememberme.cookie**: Sesión persistente (opcional)

### Ventajas de este enfoque:
- ✅ No requiere API tokens (que pueden no estar disponibles on-premise)
- ✅ No requiere OAuth flows complejos
- ✅ Usa las mismas credenciales del navegador
- ✅ Simple de configurar

### Desventajas:
- ❌ Las cookies expiran (requiere renovación)
- ❌ Menos seguro que tokens dedicados
- ❌ Si alguien obtiene las cookies, puede suplantar al usuario

## 🛠️ APIs de Jira Utilizadas

### Jira REST API v2
- Base: `/rest/api/2/`
- Endpoints principales:
  - `/search` - Búsqueda JQL
  - `/issue/{key}` - CRUD de issues
  - `/project` - Proyectos
  - `/user` - Usuarios
  - `/priority` - Prioridades
  - `/status` - Estados
  - `/issuetype` - Tipos de issue
  - `/field` - Campos personalizados

### Jira Agile API v1
- Base: `/rest/agile/1.0/`
- Endpoints principales:
  - `/board` - Boards de Scrum/Kanban
  - `/sprint` - Sprints
  - `/board/{id}/sprint` - Sprints de un board
  - `/board/{id}/backlog` - Backlog

## 📊 Manejo de Errores

### En JiraClient:
```typescript
try {
  const response = await this._axiosInstance.get(endpoint);
  return response.data;
} catch (error) {
  // Axios lanza error automáticamente para status 4xx/5xx
  throw error; // Propaga al MCP Server
}
```

### En MCP Server:
```typescript
try {
  const result = await jiraClient.someMethod(...);
  return {
    content: [{ type: 'text', text: JSON.stringify(result) }],
  };
} catch (error: any) {
  return {
    content: [{ type: 'text', text: `Error: ${error.message}` }],
    isError: true, // ← Claude sabe que hubo error
  };
}
```

### Tipos de errores comunes:
- **401/403**: Cookies expiradas o permisos insuficientes
- **404**: Issue/proyecto no encontrado
- **400**: JQL inválido o datos incorrectos
- **500**: Error interno de Jira
- **ECONNREFUSED**: Jira no accesible

## 🔧 Configuración TypeScript

### tsconfig.json clave:
```json
{
  "target": "ES2022",           // JavaScript moderno
  "module": "Node16",            // Módulos ES6 para Node.js
  "moduleResolution": "Node16",  // Resolución de módulos Node.js
  "strict": true,                // Máximo type checking
  "esModuleInterop": true        // Interop con CommonJS
}
```

### Por qué ES Modules:
- ✅ Standard de JavaScript moderno
- ✅ Mejor tree-shaking
- ✅ Imports/exports más claros
- ✅ Mejor soporte en Node.js 18+

## 📦 Dependencias

### Producción:
- `@modelcontextprotocol/sdk`: SDK oficial de MCP
- `axios`: Cliente HTTP robusto

### Desarrollo:
- `typescript`: Compilador TypeScript
- `@types/node`: Tipos de Node.js

### Por qué tan pocas dependencias:
- Proyecto enfocado y simple
- Menos superficie de ataque de seguridad
- Instalación más rápida
- Menos problemas de compatibilidad

## 🚀 Optimizaciones Futuras Posibles

### 1. Cache de Datos
```typescript
// Cache de proyectos (cambian poco)
private _projectsCache?: JiraProject[];
private _projectsCacheExpiry?: number;

async getProjects(): Promise<JiraProject[]> {
  if (this._projectsCache && Date.now() < this._projectsCacheExpiry!) {
    return this._projectsCache;
  }
  
  this._projectsCache = await this._get('/rest/api/2/project');
  this._projectsCacheExpiry = Date.now() + 3600000; // 1 hora
  return this._projectsCache;
}
```

### 2. Renovación Automática de Cookies
```typescript
// Detectar 401 y notificar al usuario
if (error.response?.status === 401) {
  return {
    content: [{
      type: 'text',
      text: 'Las cookies han expirado. Por favor, actualízalas.'
    }],
    isError: true,
  };
}
```

### 3. Paginación Automática
```typescript
// Para búsquedas grandes, paginar automáticamente
async searchAllIssues(jql: string): Promise<JiraIssue[]> {
  let allIssues: JiraIssue[] = [];
  let startAt = 0;
  const maxResults = 100;
  
  while (true) {
    const result = await this.searchIssues(jql, { startAt, maxResults });
    allIssues = allIssues.concat(result.issues);
    
    if (allIssues.length >= result.total) break;
    startAt += maxResults;
  }
  
  return allIssues;
}
```

### 4. Rate Limiting
```typescript
// Evitar sobrecargar Jira
private _requestQueue: Promise<any>[] = [];
private _maxConcurrentRequests = 5;

private async _queueRequest<T>(fn: () => Promise<T>): Promise<T> {
  while (this._requestQueue.length >= this._maxConcurrentRequests) {
    await Promise.race(this._requestQueue);
  }
  
  const promise = fn();
  this._requestQueue.push(promise);
  promise.finally(() => {
    this._requestQueue = this._requestQueue.filter(p => p !== promise);
  });
  
  return promise;
}
```

## 🔍 Debug y Logging

Para debug, puedes añadir logging en desarrollo:

```typescript
// En jira-client.ts
private async _get<T>(endpoint: string, params?: any): Promise<T> {
  if (process.env.DEBUG === 'true') {
    console.error(`[GET] ${this._baseUrl}${endpoint}`, params);
  }
  
  const response = await this._axiosInstance.get<T>(endpoint, { params });
  
  if (process.env.DEBUG === 'true') {
    console.error(`[RESPONSE] Status: ${response.status}`);
  }
  
  return response.data;
}
```

Ejecutar con debug:
```bash
DEBUG=true npm test
```
