# Ejemplos de Uso - Jira On-Premise MCP

Este documento contiene ejemplos prácticos de cómo usar el servidor MCP con Claude.

## 🔍 Búsqueda de Issues

### Buscar mis issues abiertos
```
Pregunta a Claude:
"Muéstrame mis issues abiertos que no estén cerrados"

Claude usará:
jira_search_issues con JQL: "assignee=currentUser() AND status!=Closed AND status!=Done"
```

### Buscar bugs de alta prioridad
```
Pregunta:
"¿Cuáles son los bugs de alta prioridad en el proyecto ABC?"

JQL usado:
"project=ABC AND type=Bug AND priority=High"
```

### Issues actualizados recientemente
```
Pregunta:
"Muéstrame los 10 issues más recientes del proyecto XYZ"

JQL usado:
"project=XYZ ORDER BY updated DESC"
```

### Issues del sprint actual
```
Pregunta:
"¿Qué issues hay en el sprint activo?"

JQL usado:
"sprint in openSprints()"
```

## 📝 Crear y Modificar Issues

### Crear un nuevo bug
```
Pregunta:
"Crea un bug en el proyecto ABC con título 'Error en el login' y prioridad alta"

Claude usará:
jira_create_issue con:
{
  "project": "ABC",
  "summary": "Error en el login",
  "issuetype": "Bug",
  "priority": "High",
  "description": "Se ha detectado un error en el proceso de login..."
}
```

### Actualizar un issue
```
Pregunta:
"Actualiza el issue ABC-123 cambiando su prioridad a Critical"

Claude usará:
jira_update_issue con:
{
  "issueKey": "ABC-123",
  "priority": "Critical"
}
```

### Asignar un issue
```
Pregunta:
"Asigna el issue XYZ-456 a juan.perez"

Claude usará:
jira_assign_issue con:
{
  "issueKey": "XYZ-456",
  "assignee": "juan.perez"
}
```

### Añadir un comentario
```
Pregunta:
"Añade un comentario al issue ABC-789 diciendo que está en revisión"

Claude usará:
jira_add_comment con:
{
  "issueKey": "ABC-789",
  "comment": "Este issue está actualmente en revisión por el equipo técnico."
}
```

## 🔄 Transiciones de Workflow

### Ver transiciones disponibles
```
Pregunta:
"¿Qué transiciones están disponibles para el issue ABC-123?"

Claude usará:
jira_get_transitions con issueKey: "ABC-123"

Respuesta ejemplo:
[
  { "id": "11", "name": "Start Progress", "to": { "name": "In Progress" } },
  { "id": "21", "name": "Resolve Issue", "to": { "name": "Resolved" } },
  { "id": "31", "name": "Close Issue", "to": { "name": "Closed" } }
]
```

### Realizar una transición
```
Pregunta:
"Cambia el estado del issue ABC-123 a 'In Progress'"

Claude:
1. Primero obtendrá las transiciones disponibles con jira_get_transitions
2. Encontrará la transición con nombre "Start Progress" (id: "11")
3. Ejecutará jira_transition_issue con:
{
  "issueKey": "ABC-123",
  "transitionId": "11",
  "comment": "Iniciando trabajo en este issue"
}
```

## 📊 Proyectos y Metadata

### Listar proyectos
```
Pregunta:
"¿Qué proyectos están disponibles?"

Claude usará:
jira_get_projects
```

### Ver detalles de un proyecto
```
Pregunta:
"Muéstrame los detalles del proyecto ABC"

Claude usará:
jira_get_project con projectKey: "ABC"
```

### Ver tipos de issue de un proyecto
```
Pregunta:
"¿Qué tipos de issue puedo crear en el proyecto XYZ?"

Claude usará:
jira_get_project_issue_types con projectKey: "XYZ"

Respuesta ejemplo:
[
  { "id": "1", "name": "Bug", "subtask": false },
  { "id": "2", "name": "Task", "subtask": false },
  { "id": "3", "name": "Story", "subtask": false }
]
```

### Ver usuarios asignables
```
Pregunta:
"¿Quiénes pueden ser asignados a issues del proyecto ABC?"

Claude usará:
jira_get_assignable_users con projectKey: "ABC"
```

## 🏃 Agile y Sprints

### Listar boards
```
Pregunta:
"Muéstrame todos los boards de Scrum"

Claude usará:
jira_get_boards con type: "scrum"
```

### Ver sprints de un board
```
Pregunta:
"¿Qué sprints hay en el board 123?"

Claude usará:
jira_get_board_sprints con boardId: 123
```

### Ver sprint activo
```
Pregunta:
"¿Cuál es el sprint activo del board 123?"

Claude usará:
jira_get_board_sprints con:
{
  "boardId": 123,
  "state": "active"
}
```

### Ver issues del sprint
```
Pregunta:
"¿Qué issues hay en el sprint 456?"

Claude usará:
jira_get_sprint_issues con sprintId: 456
```

### Ver backlog
```
Pregunta:
"Muéstrame el backlog del board 123"

Claude usará:
jira_get_board_backlog con boardId: 123
```

## 🔍 Consultas JQL Avanzadas

### Issues por fechas
```
JQL: "created >= startOfWeek() AND project=ABC"
Descripción: Issues creados esta semana

JQL: "updated >= -7d AND assignee=currentUser()"
Descripción: Mis issues actualizados en los últimos 7 días

JQL: "duedate <= now() AND status!=Closed"
Descripción: Issues vencidos que no están cerrados
```

### Issues por etiquetas
```
JQL: "labels='urgent' AND status!='Done'"
Descripción: Issues urgentes no completados

JQL: "labels in ('bug', 'hotfix') AND priority=High"
Descripción: Bugs o hotfixes de alta prioridad
```

### Issues complejos
```
JQL: "project=ABC AND (priority=High OR priority=Critical) AND status in ('Open', 'In Progress')"
Descripción: Issues críticos/altos en curso

JQL: "assignee=currentUser() AND sprint in openSprints() AND status!='Done'"
Descripción: Mis tareas pendientes del sprint activo

JQL: "reporter=currentUser() AND created >= -30d ORDER BY priority DESC"
Descripción: Issues que reporté en el último mes, ordenados por prioridad
```

## 💡 Casos de Uso Completos

### Revisión diaria (Daily Standup)
```
Pregunta a Claude:
"Prepara un resumen para mi daily standup: 
1. ¿Qué issues completé ayer?
2. ¿Qué issues tengo en progreso hoy?
3. ¿Hay algún blocker?"

Claude ejecutará:
1. jira_search_issues: "assignee=currentUser() AND updated >= -1d AND status=Done"
2. jira_search_issues: "assignee=currentUser() AND status='In Progress'"
3. jira_search_issues: "assignee=currentUser() AND labels='blocked'"
```

### Planificación de sprint
```
Pregunta:
"Ayúdame a planificar el sprint:
1. Muestra el backlog del board 123
2. Lista los issues de alta prioridad sin asignar
3. ¿Cuántos story points hay en el backlog?"

Claude ejecutará:
1. jira_get_board_backlog con boardId: 123
2. jira_search_issues: "project=ABC AND priority=High AND assignee is EMPTY"
3. Analizará los datos y calculará story points
```

### Seguimiento de bugs
```
Pregunta:
"Dame un reporte de bugs del proyecto ABC:
1. Bugs abiertos por prioridad
2. Bugs resueltos esta semana
3. Bugs más antiguos sin resolver"

Claude ejecutará:
1. jira_search_issues: "project=ABC AND type=Bug AND status!=Closed"
2. jira_search_issues: "project=ABC AND type=Bug AND resolved >= startOfWeek()"
3. jira_search_issues: "project=ABC AND type=Bug AND status!=Closed ORDER BY created ASC"
```

## 🔧 Troubleshooting con Claude

### Verificar configuración
```
Pregunta:
"¿Puedes verificar mi conexión con Jira?"

Claude intentará:
1. jira_get_current_user (para verificar autenticación)
2. jira_get_projects (para verificar permisos)
```

### Buscar campos personalizados
```
Pregunta:
"¿Qué campos personalizados están disponibles?"

Claude usará:
jira_get_fields
```

### Explorar workflows
```
Pregunta:
"Explícame el workflow del issue ABC-123"

Claude:
1. jira_get_issue para ver el estado actual
2. jira_get_transitions para ver posibles transiciones
3. Explicará el flujo completo
```
