# Guía de Inicio Rápido - Jira On-Premise MCP

## ✅ Paso 1: Verificar la Instalación

El proyecto ya está configurado y compilado. Verifica que tienes los siguientes archivos:

```bash
cd /path/to/jira-onprem-mcp
ls -la dist/  # Debe mostrar index.js, jira-client.js, etc.
```

## 🔑 Paso 2: Obtener las Cookies de Autenticación

### 2.1 Acceder a Jira
1. Abre tu navegador (Chrome, Firefox, Safari)
2. Navega a: `https://jira.your-company.com`
3. Inicia sesión con tus credenciales

### 2.2 Abrir DevTools
- **Chrome/Edge**: Presiona `F12` o `Cmd+Option+I` (Mac)
- **Firefox**: Presiona `F12` o `Cmd+Option+I` (Mac)
- **Safari**: Menú Develop → Show Web Inspector

### 2.3 Extraer las Cookies
1. En DevTools, ve a la pestaña **Application** (Chrome/Edge) o **Storage** (Firefox)
2. En el panel izquierdo, expande **Cookies**
3. Selecciona tu dominio: `https://jira.your-company.com`
4. Copia los valores de estas cookies (clic derecho → Copy):
   - `JSESSIONID` ← **REQUERIDA**
   - `atlassian.xsrf.token` ← **REQUERIDA**
   - `seraph.rememberme.cookie` ← Opcional pero recomendada

**Ejemplo de lo que verás:**
```
JSESSIONID: ABC123DEF456GHI789JKL012MNO345PQR
atlassian.xsrf.token: XYZ1-ABC2-DEF3-GHI4_0123456789abcdef0123456789abcdef01234567_lin
seraph.rememberme.cookie: 12345%3Aabcdef0123456789abcdef0123456789abcdef01
```

## ⚙️ Paso 3: Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
cd /path/to/jira-onprem-mcp
cp .env.example .env
nano .env  # o usa tu editor favorito
```

Edita el archivo `.env` con tus valores reales:

```bash
# Reemplaza con TUS valores
JIRA_BASE_URL=https://jira.your-company.com
JIRA_JSESSIONID=PEGA_AQUI_TU_JSESSIONID
JIRA_XSRF_TOKEN=PEGA_AQUI_TU_XSRF_TOKEN
JIRA_REMEMBER_ME_COOKIE=PEGA_AQUI_TU_REMEMBER_ME_COOKIE
```

**⚠️ Importante**: NO compartas este archivo .env con nadie. Ya está en `.gitignore`.

## 🧪 Paso 4: Probar la Conexión

Ejecuta el script de prueba para verificar que todo funciona:

```bash
# Cargar las variables de entorno
export $(cat .env | xargs)

# Ejecutar las pruebas
npm test
```

**Salida esperada:**
```
🔍 Probando conexión con Jira on-premise...

✅ Variables de entorno encontradas
📍 URL: https://jira.your-company.com

📋 Test 1: Obteniendo usuario actual...
✅ Usuario: John Doe (jdoe)
📧 Email: john.doe@company.com

📋 Test 2: Listando proyectos...
✅ Encontrados 15 proyectos
Primeros 5 proyectos:
   - ABC: Project ABC
   - XYZ: Project XYZ
   ...

📋 Test 3: Buscando issues asignados a ti...
✅ Encontrados 23 issues (mostrando 5)
   - ABC-123: Fix login bug
     Estado: In Progress | Prioridad: High
   ...

🎉 ¡Todas las pruebas completadas exitosamente!
```

### Si hay errores:

**Error: Faltan variables de entorno**
→ Revisa que el archivo `.env` esté bien configurado

**Error 401/403**
→ Las cookies han expirado, vuelve al Paso 2

**Error de conexión**
→ Verifica que tienes acceso a tu instancia de Jira

## 🎨 Paso 5: Configurar en Claude Desktop

### 5.1 Localizar el Archivo de Configuración

**macOS:**
```bash
code ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**Windows:**
```
notepad %APPDATA%\Claude\claude_desktop_config.json
```

### 5.2 Añadir el Servidor MCP

Si el archivo está vacío, usa esta estructura:

```json
{
  "mcpServers": {
    "jira-onprem": {
      "command": "node",
      "args": ["/path/to/jira-onprem-mcp/dist/index.js"],
      "env": {
        "JIRA_BASE_URL": "https://jira.your-company.com",
        "JIRA_JSESSIONID": "PEGA_AQUI_TU_JSESSIONID",
        "JIRA_XSRF_TOKEN": "PEGA_AQUI_TU_XSRF_TOKEN",
        "JIRA_REMEMBER_ME_COOKIE": "PEGA_AQUI_TU_REMEMBER_ME_COOKIE"
      }
    }
  }
}
```

Si ya tienes otros servidores MCP, añade solo la sección `jira-onprem`:

```json
{
  "mcpServers": {
    "otro-servidor-existente": {
      ...
    },
    "jira-onprem": {
      "command": "node",
      "args": ["/path/to/jira-onprem-mcp/dist/index.js"],
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

**⚠️ Importante**: 
- Usa la **ruta absoluta** al archivo `dist/index.js`
- Reemplaza los valores de las cookies con los reales
- Asegúrate de que el JSON esté bien formateado (sin comas extras)

### 5.3 Reiniciar Claude Desktop

1. Cierra Claude Desktop **completamente** (Cmd+Q en Mac, Alt+F4 en Windows)
2. Vuelve a abrir Claude Desktop
3. El servidor MCP debería iniciarse automáticamente

### 5.4 Verificar que Funciona

En Claude Desktop, haz una pregunta como:

```
"¿Puedes conectarte a mi Jira y mostrarme mis issues abiertos?"
```

Claude debería:
1. Usar la herramienta `jira_search_issues`
2. Ejecutar una consulta JQL
3. Mostrarte tus issues

## 🚀 Ejemplos de Uso

### Búsquedas Básicas
```
"Muéstrame mis issues abiertos"
"¿Cuáles son los bugs de alta prioridad del proyecto ABC?"
"Lista los issues actualizados hoy"
```

### Crear y Modificar
```
"Crea un bug en el proyecto XYZ con título 'Error en login'"
"Actualiza el issue ABC-123 cambiando la prioridad a Critical"
"Añade un comentario al issue XYZ-456 diciendo que está en revisión"
```

### Agile
```
"Lista todos los boards de Scrum"
"¿Qué issues hay en el sprint activo del board 123?"
"Muéstrame el backlog del board ABC"
```

Ver más ejemplos en [EXAMPLES.md](EXAMPLES.md)

## 🔄 Actualizar las Cookies (Cuando Expiren)

Las cookies de Jira expiran después de cierto tiempo. Cuando dejes de poder acceder:

1. **Volver al Paso 2** para obtener nuevas cookies
2. **Actualizar el archivo de configuración** de Claude Desktop con las nuevas cookies
3. **Reiniciar Claude Desktop**

**Tip**: Marca un recordatorio para actualizar las cookies cada semana.

## 📝 Troubleshooting

### Las herramientas no aparecen en Claude

1. Verifica que el JSON esté bien formateado (usa https://jsonlint.com)
2. Asegúrate de usar la ruta absoluta correcta
3. Reinicia Claude Desktop completamente
4. Revisa los logs en la consola de Claude

### Error: "Cannot find module"

La ruta al archivo `dist/index.js` no es correcta. Verifica:

```bash
# Debe mostrar el archivo
ls -la /path/to/jira-onprem-mcp/dist/index.js
```

### Las cookies expiran muy rápido

Considera:
- Usar la cookie `seraph.rememberme.cookie` (mantiene la sesión más tiempo)
- Crear un usuario de servicio dedicado para automatizaciones
- Contactar con tu administrador de Jira para ajustar tiempos de sesión

## 🛠️ Comandos Útiles

```bash
# Compilar el proyecto
npm run build

# Compilar en modo watch (auto-recompila al cambiar código)
npm run watch

# Ejecutar tests de conexión
npm test

# Ver versión instalada
npm list

# Limpiar y reinstalar
rm -rf node_modules dist
npm install
```

## 🔐 Seguridad

- ✅ Nunca compartas tus cookies
- ✅ No subas el archivo `.env` a repositorios públicos
- ✅ Actualiza las cookies regularmente
- ✅ Considera usar un usuario de servicio para automatizaciones
- ✅ Revisa los permisos de acceso en Jira

## 📚 Más Recursos

- [README.md](README.md) - Documentación completa
- [EXAMPLES.md](EXAMPLES.md) - Ejemplos detallados de uso
- [claude_desktop_config.example.json](claude_desktop_config.example.json) - Plantilla de configuración

## 🎉 ¡Listo!

Ahora puedes usar Claude para:
- Buscar y gestionar issues
- Crear y actualizar tickets
- Ver información de proyectos
- Gestionar sprints y boards
- Y mucho más...

**¡Disfruta de tu nuevo asistente de Jira! 🚀**
