import { Tool } from '@modelcontextprotocol/sdk/types.js';

/**
 * Definición de todas las herramientas MCP disponibles
 */
export const tools: Tool[] = [
  // ============================================================================
  // ISSUES
  // ============================================================================
  {
    name: 'jira_search_issues',
    description:
      'Buscar issues en Jira usando JQL (Jira Query Language). Ejemplo: "assignee=currentUser() AND status!=Closed"',
    inputSchema: {
      type: 'object',
      properties: {
        jql: {
          type: 'string',
          description: 'Consulta JQL para buscar issues',
        },
        maxResults: {
          type: 'number',
          description: 'Número máximo de resultados (por defecto: 50)',
        },
        startAt: {
          type: 'number',
          description: 'Índice de inicio para paginación (por defecto: 0)',
        },
        fields: {
          type: 'array',
          items: { type: 'string' },
          description:
            'Lista de campos a incluir (ej: ["key", "summary", "status"]). Por defecto se incluyen todos.',
        },
      },
      required: ['jql'],
    },
  },
  {
    name: 'jira_get_issue',
    description: 'Obtener detalles completos de un issue específico por su key (ej: PROJ-123)',
    inputSchema: {
      type: 'object',
      properties: {
        issueKey: {
          type: 'string',
          description: 'Key del issue (ej: PROJ-123)',
        },
        fields: {
          type: 'array',
          items: { type: 'string' },
          description: 'Lista de campos a incluir. Por defecto se incluyen todos.',
        },
      },
      required: ['issueKey'],
    },
  },
  {
    name: 'jira_create_issue',
    description: 'Crear un nuevo issue en Jira',
    inputSchema: {
      type: 'object',
      properties: {
        project: {
          type: 'string',
          description: 'Key del proyecto (ej: PROJ)',
        },
        summary: {
          type: 'string',
          description: 'Resumen/título del issue',
        },
        description: {
          type: 'string',
          description: 'Descripción detallada del issue',
        },
        issuetype: {
          type: 'string',
          description: 'Tipo de issue (ej: Bug, Task, Story)',
        },
        priority: {
          type: 'string',
          description: 'Prioridad (ej: High, Medium, Low)',
        },
        assignee: {
          type: 'string',
          description: 'Username del usuario asignado',
        },
      },
      required: ['project', 'summary', 'issuetype'],
    },
  },
  {
    name: 'jira_update_issue',
    description: 'Actualizar campos de un issue existente',
    inputSchema: {
      type: 'object',
      properties: {
        issueKey: {
          type: 'string',
          description: 'Key del issue (ej: PROJ-123)',
        },
        summary: {
          type: 'string',
          description: 'Nuevo resumen/título',
        },
        description: {
          type: 'string',
          description: 'Nueva descripción',
        },
        priority: {
          type: 'string',
          description: 'Nueva prioridad',
        },
        assignee: {
          type: 'string',
          description: 'Nuevo asignado (username)',
        },
      },
      required: ['issueKey'],
    },
  },
  {
    name: 'jira_delete_issue',
    description: 'Eliminar un issue',
    inputSchema: {
      type: 'object',
      properties: {
        issueKey: {
          type: 'string',
          description: 'Key del issue a eliminar',
        },
      },
      required: ['issueKey'],
    },
  },
  {
    name: 'jira_assign_issue',
    description: 'Asignar o desasignar un issue a un usuario',
    inputSchema: {
      type: 'object',
      properties: {
        issueKey: {
          type: 'string',
          description: 'Key del issue',
        },
        assignee: {
          type: 'string',
          description: 'Username del usuario. Dejar vacío para desasignar.',
        },
      },
      required: ['issueKey'],
    },
  },
  {
    name: 'jira_get_transitions',
    description: 'Obtener las transiciones disponibles para un issue',
    inputSchema: {
      type: 'object',
      properties: {
        issueKey: {
          type: 'string',
          description: 'Key del issue',
        },
      },
      required: ['issueKey'],
    },
  },
  {
    name: 'jira_transition_issue',
    description: 'Realizar una transición de workflow en un issue (cambiar estado)',
    inputSchema: {
      type: 'object',
      properties: {
        issueKey: {
          type: 'string',
          description: 'Key del issue',
        },
        transitionId: {
          type: 'string',
          description: 'ID de la transición (obtener con jira_get_transitions)',
        },
        comment: {
          type: 'string',
          description: 'Comentario opcional al realizar la transición',
        },
      },
      required: ['issueKey', 'transitionId'],
    },
  },
  {
    name: 'jira_add_comment',
    description: 'Añadir un comentario a un issue',
    inputSchema: {
      type: 'object',
      properties: {
        issueKey: {
          type: 'string',
          description: 'Key del issue',
        },
        comment: {
          type: 'string',
          description: 'Texto del comentario',
        },
      },
      required: ['issueKey', 'comment'],
    },
  },
  {
    name: 'jira_get_comments',
    description: 'Obtener todos los comentarios de un issue',
    inputSchema: {
      type: 'object',
      properties: {
        issueKey: {
          type: 'string',
          description: 'Key del issue',
        },
      },
      required: ['issueKey'],
    },
  },
  {
    name: 'jira_get_epic_issues',
    description:
      'Obtener todas las tareas/issues asociados a una épica específica. Busca tanto por Epic Link como por parent.',
    inputSchema: {
      type: 'object',
      properties: {
        epicKey: {
          type: 'string',
          description: 'Key de la épica (ej: PROJ-123)',
        },
        maxResults: {
          type: 'number',
          description: 'Número máximo de resultados (por defecto: 50)',
        },
        fields: {
          type: 'array',
          items: { type: 'string' },
          description: 'Lista de campos a incluir. Por defecto se incluyen todos.',
        },
      },
      required: ['epicKey'],
    },
  },

  // ============================================================================
  // PROJECTS
  // ============================================================================
  {
    name: 'jira_get_projects',
    description: 'Obtener la lista de todos los proyectos disponibles',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'jira_get_project',
    description: 'Obtener detalles de un proyecto específico',
    inputSchema: {
      type: 'object',
      properties: {
        projectKey: {
          type: 'string',
          description: 'Key del proyecto',
        },
      },
      required: ['projectKey'],
    },
  },
  {
    name: 'jira_get_project_issue_types',
    description: 'Obtener los tipos de issue disponibles en un proyecto',
    inputSchema: {
      type: 'object',
      properties: {
        projectKey: {
          type: 'string',
          description: 'Key del proyecto',
        },
      },
      required: ['projectKey'],
    },
  },
  {
    name: 'jira_get_project_versions',
    description: 'Obtener las versiones de un proyecto',
    inputSchema: {
      type: 'object',
      properties: {
        projectKey: {
          type: 'string',
          description: 'Key del proyecto',
        },
      },
      required: ['projectKey'],
    },
  },
  {
    name: 'jira_get_project_components',
    description: 'Obtener los componentes de un proyecto',
    inputSchema: {
      type: 'object',
      properties: {
        projectKey: {
          type: 'string',
          description: 'Key del proyecto',
        },
      },
      required: ['projectKey'],
    },
  },

  // ============================================================================
  // USERS
  // ============================================================================
  {
    name: 'jira_get_current_user',
    description: 'Obtener información del usuario actual (autenticado)',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'jira_search_users',
    description: 'Buscar usuarios por nombre o username',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Texto de búsqueda',
        },
        maxResults: {
          type: 'number',
          description: 'Número máximo de resultados (por defecto: 50)',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'jira_get_user',
    description: 'Obtener información de un usuario específico',
    inputSchema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          description: 'Username del usuario',
        },
      },
      required: ['username'],
    },
  },
  {
    name: 'jira_get_assignable_users',
    description: 'Obtener usuarios que pueden ser asignados a issues de un proyecto',
    inputSchema: {
      type: 'object',
      properties: {
        projectKey: {
          type: 'string',
          description: 'Key del proyecto',
        },
        maxResults: {
          type: 'number',
          description: 'Número máximo de resultados (por defecto: 50)',
        },
      },
      required: ['projectKey'],
    },
  },

  // ============================================================================
  // METADATA
  // ============================================================================
  {
    name: 'jira_get_priorities',
    description: 'Obtener todas las prioridades disponibles',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'jira_get_statuses',
    description: 'Obtener todos los estados (statuses) disponibles',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'jira_get_issue_types',
    description: 'Obtener todos los tipos de issue disponibles',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'jira_get_fields',
    description: 'Obtener todos los campos disponibles en Jira',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },

  // ============================================================================
  // AGILE (Boards & Sprints)
  // ============================================================================
  {
    name: 'jira_get_boards',
    description: 'Obtener todos los boards de Agile',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['scrum', 'kanban'],
          description: 'Tipo de board (opcional)',
        },
      },
    },
  },
  {
    name: 'jira_get_board',
    description: 'Obtener detalles de un board específico',
    inputSchema: {
      type: 'object',
      properties: {
        boardId: {
          type: 'number',
          description: 'ID del board',
        },
      },
      required: ['boardId'],
    },
  },
  {
    name: 'jira_get_board_sprints',
    description: 'Obtener los sprints de un board',
    inputSchema: {
      type: 'object',
      properties: {
        boardId: {
          type: 'number',
          description: 'ID del board',
        },
        state: {
          type: 'string',
          enum: ['future', 'active', 'closed'],
          description: 'Estado del sprint (opcional)',
        },
      },
      required: ['boardId'],
    },
  },
  {
    name: 'jira_get_sprint_issues',
    description: 'Obtener los issues de un sprint específico',
    inputSchema: {
      type: 'object',
      properties: {
        sprintId: {
          type: 'number',
          description: 'ID del sprint',
        },
        maxResults: {
          type: 'number',
          description: 'Número máximo de resultados (por defecto: 50)',
        },
      },
      required: ['sprintId'],
    },
  },
  {
    name: 'jira_get_board_backlog',
    description: 'Obtener el backlog de un board',
    inputSchema: {
      type: 'object',
      properties: {
        boardId: {
          type: 'number',
          description: 'ID del board',
        },
        maxResults: {
          type: 'number',
          description: 'Número máximo de resultados (por defecto: 50)',
        },
      },
      required: ['boardId'],
    },
  },
  {
    name: 'jira_get_board_issues',
    description: 'Obtener todos los issues de un board',
    inputSchema: {
      type: 'object',
      properties: {
        boardId: {
          type: 'number',
          description: 'ID del board',
        },
        maxResults: {
          type: 'number',
          description: 'Número máximo de resultados (por defecto: 50)',
        },
      },
      required: ['boardId'],
    },
  },

  // ============================================================================
  // WORKFLOWS
  // ============================================================================
  {
    name: 'jira_get_workflows',
    description: 'Obtener información sobre workflows disponibles',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];
