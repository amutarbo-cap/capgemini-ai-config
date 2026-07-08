import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import type {
  JiraConfig,
  JiraIssue,
  JiraProject,
  JiraUser,
  JiraBoard,
  JiraSprint,
  JiraTransition,
  JiraComment,
} from './types.js';

/**
 * Cliente para interactuar con Jira on-premise usando autenticación por cookies
 */
export class JiraClient {
  private readonly _axiosInstance: AxiosInstance;
  private readonly _baseUrl: string;

  constructor(config: JiraConfig) {
    this._baseUrl = config.baseUrl;

    // Construir el header Cookie
    const cookieHeader = Object.entries(config.cookies)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}=${value}`)
      .join('; ');

    this._axiosInstance = axios.create({
      baseURL: this._baseUrl,
      headers: {
        Cookie: cookieHeader,
        'User-Agent':
          config.userAgent ||
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });
  }

  /**
   * Realiza una petición GET
   */
  private async _get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const config: AxiosRequestConfig = { params };
    const response = await this._axiosInstance.get<T>(endpoint, config);
    return response.data;
  }

  /**
   * Realiza una petición POST
   */
  private async _post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this._axiosInstance.post<T>(endpoint, data);
    return response.data;
  }

  /**
   * Realiza una petición PUT
   */
  private async _put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this._axiosInstance.put<T>(endpoint, data);
    return response.data;
  }

  /**
   * Realiza una petición DELETE
   */
  private async _delete<T>(endpoint: string): Promise<T> {
    const response = await this._axiosInstance.delete<T>(endpoint);
    return response.data;
  }

  // ============================================================================
  // ISSUES
  // ============================================================================

  /**
   * Buscar issues usando JQL
   */
  async searchIssues(
    jql: string,
    options?: {
      maxResults?: number;
      startAt?: number;
      fields?: string[];
    }
  ): Promise<{ issues: JiraIssue[]; total: number }> {
    const params: any = {
      jql: jql.trim(),
      maxResults: options?.maxResults || 50,
      startAt: options?.startAt || 0,
    };

    if (options?.fields && options.fields.length > 0) {
      params.fields = options.fields.join(',');
    }

    const result = await this._get<any>('/rest/api/2/search', params);
    return {
      issues: result.issues || [],
      total: result.total || 0,
    };
  }

  /**
   * Obtener un issue por su key
   */
  async getIssue(issueKey: string, fields?: string[]): Promise<JiraIssue> {
    const params: any = {};
    if (fields && fields.length > 0) {
      params.fields = fields.join(',');
    }
    return this._get<JiraIssue>(`/rest/api/2/issue/${issueKey}`, params);
  }

  /**
   * Crear un nuevo issue
   */
  async createIssue(issueData: {
    project: string;
    summary: string;
    description?: string;
    issuetype: string;
    priority?: string;
    assignee?: string;
    [key: string]: any;
  }): Promise<JiraIssue> {
    const payload = {
      fields: {
        project: { key: issueData.project },
        summary: issueData.summary,
        issuetype: { name: issueData.issuetype },
        ...(issueData.description && { description: issueData.description }),
        ...(issueData.priority && { priority: { name: issueData.priority } }),
        ...(issueData.assignee && { assignee: { name: issueData.assignee } }),
      },
    };
    return this._post<JiraIssue>('/rest/api/2/issue', payload);
  }

  /**
   * Actualizar un issue
   */
  async updateIssue(
    issueKey: string,
    updates: {
      summary?: string;
      description?: string;
      priority?: string;
      assignee?: string;
      [key: string]: any;
    }
  ): Promise<void> {
    const payload: any = { fields: {} };

    if (updates.summary) payload.fields.summary = updates.summary;
    if (updates.description) payload.fields.description = updates.description;
    if (updates.priority) payload.fields.priority = { name: updates.priority };
    if (updates.assignee) payload.fields.assignee = { name: updates.assignee };

    await this._put(`/rest/api/2/issue/${issueKey}`, payload);
  }

  /**
   * Eliminar un issue
   */
  async deleteIssue(issueKey: string): Promise<void> {
    await this._delete(`/rest/api/2/issue/${issueKey}`);
  }

  /**
   * Asignar un issue
   */
  async assignIssue(issueKey: string, assignee: string | null): Promise<void> {
    const payload = assignee ? { name: assignee } : null;
    await this._put(`/rest/api/2/issue/${issueKey}/assignee`, payload);
  }

  /**
   * Obtener transiciones disponibles para un issue
   */
  async getTransitions(issueKey: string): Promise<JiraTransition[]> {
    const result = await this._get<any>(`/rest/api/2/issue/${issueKey}/transitions`);
    return result.transitions || [];
  }

  /**
   * Realizar una transición de workflow
   */
  async transitionIssue(issueKey: string, transitionId: string, comment?: string): Promise<void> {
    const payload: any = {
      transition: { id: transitionId },
    };

    if (comment) {
      payload.update = {
        comment: [{ add: { body: comment } }],
      };
    }

    await this._post(`/rest/api/2/issue/${issueKey}/transitions`, payload);
  }

  /**
   * Añadir comentario a un issue
   */
  async addComment(issueKey: string, comment: string): Promise<JiraComment> {
    const payload = { body: comment };
    return this._post<JiraComment>(`/rest/api/2/issue/${issueKey}/comment`, payload);
  }

  /**
   * Obtener comentarios de un issue
   */
  async getComments(issueKey: string): Promise<JiraComment[]> {
    const result = await this._get<any>(`/rest/api/2/issue/${issueKey}/comment`);
    return result.comments || [];
  }

  // ============================================================================
  // PROJECTS
  // ============================================================================

  /**
   * Obtener todos los proyectos
   */
  async getProjects(): Promise<JiraProject[]> {
    return this._get<JiraProject[]>('/rest/api/2/project');
  }

  /**
   * Obtener un proyecto por su key
   */
  async getProject(projectKey: string): Promise<JiraProject> {
    return this._get<JiraProject>(`/rest/api/2/project/${projectKey}`);
  }

  /**
   * Obtener los issue types de un proyecto
   */
  async getProjectIssueTypes(projectKey: string): Promise<any[]> {
    const project = await this.getProject(projectKey);
    return (project as any).issueTypes || [];
  }

  /**
   * Obtener las versiones de un proyecto
   */
  async getProjectVersions(projectKey: string): Promise<any[]> {
    return this._get<any[]>(`/rest/api/2/project/${projectKey}/versions`);
  }

  /**
   * Obtener los componentes de un proyecto
   */
  async getProjectComponents(projectKey: string): Promise<any[]> {
    return this._get<any[]>(`/rest/api/2/project/${projectKey}/components`);
  }

  // ============================================================================
  // USERS
  // ============================================================================

  /**
   * Obtener el usuario actual
   */
  async getCurrentUser(): Promise<JiraUser> {
    return this._get<JiraUser>('/rest/api/2/myself');
  }

  /**
   * Buscar usuarios
   */
  async searchUsers(query: string, maxResults = 50): Promise<JiraUser[]> {
    return this._get<JiraUser[]>('/rest/api/2/user/search', {
      username: query,
      maxResults,
    });
  }

  /**
   * Obtener un usuario por username
   */
  async getUser(username: string): Promise<JiraUser> {
    return this._get<JiraUser>('/rest/api/2/user', { username });
  }

  /**
   * Obtener usuarios asignables a un proyecto
   */
  async getAssignableUsers(projectKey: string, maxResults = 50): Promise<JiraUser[]> {
    return this._get<JiraUser[]>('/rest/api/2/user/assignable/search', {
      project: projectKey,
      maxResults,
    });
  }

  // ============================================================================
  // METADATA
  // ============================================================================

  /**
   * Obtener prioridades
   */
  async getPriorities(): Promise<any[]> {
    return this._get<any[]>('/rest/api/2/priority');
  }

  /**
   * Obtener estados (statuses)
   */
  async getStatuses(): Promise<any[]> {
    return this._get<any[]>('/rest/api/2/status');
  }

  /**
   * Obtener tipos de issue
   */
  async getIssueTypes(): Promise<any[]> {
    return this._get<any[]>('/rest/api/2/issuetype');
  }

  /**
   * Obtener campos disponibles
   */
  async getFields(): Promise<any[]> {
    return this._get<any[]>('/rest/api/2/field');
  }

  // ============================================================================
  // AGILE (Boards & Sprints)
  // ============================================================================

  /**
   * Obtener todos los boards
   */
  async getBoards(type?: 'scrum' | 'kanban'): Promise<JiraBoard[]> {
    const params: any = {};
    if (type) {
      params.type = type;
    }
    const result = await this._get<any>('/rest/agile/1.0/board', params);
    return result.values || [];
  }

  /**
   * Obtener un board por ID
   */
  async getBoard(boardId: number): Promise<JiraBoard> {
    return this._get<JiraBoard>(`/rest/agile/1.0/board/${boardId}`);
  }

  /**
   * Obtener sprints de un board
   */
  async getBoardSprints(boardId: number, state?: 'future' | 'active' | 'closed'): Promise<JiraSprint[]> {
    const params: any = {};
    if (state) {
      params.state = state;
    }
    const result = await this._get<any>(`/rest/agile/1.0/board/${boardId}/sprint`, params);
    return result.values || [];
  }

  /**
   * Obtener issues de un sprint
   */
  async getSprintIssues(sprintId: number, maxResults = 50): Promise<JiraIssue[]> {
    const result = await this._get<any>(`/rest/agile/1.0/sprint/${sprintId}/issue`, {
      maxResults,
    });
    return result.issues || [];
  }

  /**
   * Obtener el backlog de un board
   */
  async getBoardBacklog(boardId: number, maxResults = 50): Promise<JiraIssue[]> {
    const result = await this._get<any>(`/rest/agile/1.0/board/${boardId}/backlog`, {
      maxResults,
    });
    return result.issues || [];
  }

  /**
   * Obtener issues de un board
   */
  async getBoardIssues(boardId: number, maxResults = 50): Promise<JiraIssue[]> {
    const result = await this._get<any>(`/rest/agile/1.0/board/${boardId}/issue`, {
      maxResults,
    });
    return result.issues || [];
  }

  // ============================================================================
  // WORKFLOWS
  // ============================================================================

  /**
   * Obtener workflows
   */
  async getWorkflows(): Promise<any[]> {
    const result = await this._get<any>('/rest/api/2/workflow');
    return result || [];
  }
}
