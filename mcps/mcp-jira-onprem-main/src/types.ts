/**
 * Configuración del servidor Jira on-premise
 */
export interface JiraConfig {
  baseUrl: string;
  cookies: {
    JSESSIONID: string;
    'atlassian.xsrf.token': string;
    'seraph.rememberme.cookie'?: string;
  };
  userAgent?: string;
}

/**
 * Issue de Jira
 */
export interface JiraIssue {
  id: string;
  key: string;
  self: string;
  fields: {
    summary: string;
    description?: string;
    status: {
      name: string;
      id: string;
    };
    priority?: {
      name: string;
      id: string;
    };
    assignee?: {
      name: string;
      displayName: string;
      emailAddress?: string;
    };
    reporter?: {
      name: string;
      displayName: string;
    };
    project: {
      key: string;
      name: string;
    };
    created: string;
    updated: string;
    issuetype: {
      name: string;
      id: string;
    };
    [key: string]: any;
  };
}

/**
 * Proyecto de Jira
 */
export interface JiraProject {
  id: string;
  key: string;
  name: string;
  description?: string;
  lead?: {
    name: string;
    displayName: string;
  };
  projectTypeKey?: string;
  avatarUrls?: Record<string, string>;
}

/**
 * Usuario de Jira
 */
export interface JiraUser {
  name: string;
  displayName: string;
  emailAddress?: string;
  active: boolean;
  avatarUrls?: Record<string, string>;
}

/**
 * Board de Agile
 */
export interface JiraBoard {
  id: number;
  name: string;
  type: string;
  self: string;
}

/**
 * Sprint
 */
export interface JiraSprint {
  id: number;
  name: string;
  state: 'future' | 'active' | 'closed';
  startDate?: string;
  endDate?: string;
  completeDate?: string;
  originBoardId?: number;
}

/**
 * Transición de workflow
 */
export interface JiraTransition {
  id: string;
  name: string;
  to: {
    id: string;
    name: string;
  };
}

/**
 * Comentario
 */
export interface JiraComment {
  id: string;
  author: {
    name: string;
    displayName: string;
  };
  body: string;
  created: string;
  updated: string;
}
