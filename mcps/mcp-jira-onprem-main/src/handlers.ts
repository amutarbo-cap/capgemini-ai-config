import { JiraClient } from './jira-client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

/**
 * Helper para limpiar strings de espacios en blanco
 */
function trimString(value: unknown): string {
  if (typeof value === 'string') {
    return value.trim();
  }
  return value as string;
}

/**
 * Helper para validar parámetros obligatorios
 */
function validateRequiredParams(name: string, args: Record<string, unknown>, requiredParams: string[]): void {
  const missing = requiredParams.filter(param => !args[param]);
  if (missing.length > 0) {
    throw new Error(
      `La herramienta '${name}' requiere los siguientes parámetros: ${missing.join(', ')}`
    );
  }
}

/**
 * Manejadores para todas las herramientas MCP de Jira
 */
export async function handleToolCall(
  name: string,
  args: Record<string, unknown>,
  jiraClient: JiraClient
): Promise<CallToolResult> {
  try {
    // ============================================================================
    // ISSUES
    // ============================================================================
    if (name === 'jira_search_issues') {
      validateRequiredParams(name, args, ['jql']);
      const result = await jiraClient.searchIssues(trimString(args.jql), {
        maxResults: args.maxResults as number | undefined,
        startAt: args.startAt as number | undefined,
        fields: args.fields as string[] | undefined,
      });
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === 'jira_get_issue') {
      validateRequiredParams(name, args, ['issueKey']);
      const result = await jiraClient.getIssue(
        trimString(args.issueKey),
        args.fields as string[] | undefined
      );
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === 'jira_create_issue') {
      validateRequiredParams(name, args, ['project', 'summary', 'issuetype']);
      const result = await jiraClient.createIssue(args as any);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === 'jira_update_issue') {
      validateRequiredParams(name, args, ['issueKey']);
      await jiraClient.updateIssue(trimString(args.issueKey), args as any);
      return {
        content: [{ type: 'text', text: `Issue ${args.issueKey} actualizado correctamente` }],
      };
    }

    if (name === 'jira_delete_issue') {
      validateRequiredParams(name, args, ['issueKey']);
      await jiraClient.deleteIssue(trimString(args.issueKey));
      return {
        content: [{ type: 'text', text: `Issue ${args.issueKey} eliminado correctamente` }],
      };
    }

    if (name === 'jira_assign_issue') {
      validateRequiredParams(name, args, ['issueKey']);
      await jiraClient.assignIssue(trimString(args.issueKey), args.assignee ? trimString(args.assignee) : null);
      return {
        content: [
          {
            type: 'text',
            text: args.assignee
              ? `Issue ${args.issueKey} asignado a ${args.assignee}`
              : `Issue ${args.issueKey} desasignado`,
          },
        ],
      };
    }

    if (name === 'jira_get_transitions') {
      validateRequiredParams(name, args, ['issueKey']);
      const result = await jiraClient.getTransitions(trimString(args.issueKey));
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === 'jira_transition_issue') {
      validateRequiredParams(name, args, ['issueKey', 'transitionId']);
      await jiraClient.transitionIssue(
        trimString(args.issueKey),
        trimString(args.transitionId),
        args.comment ? trimString(args.comment) : undefined
      );
      return {
        content: [{ type: 'text', text: `Transición aplicada al issue ${args.issueKey}` }],
      };
    }

    if (name === 'jira_add_comment') {
      validateRequiredParams(name, args, ['issueKey', 'comment']);
      const result = await jiraClient.addComment(trimString(args.issueKey), trimString(args.comment));
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === 'jira_get_comments') {
      validateRequiredParams(name, args, ['issueKey']);
      const result = await jiraClient.getComments(trimString(args.issueKey));
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === 'jira_get_epic_issues') {
      validateRequiredParams(name, args, ['epicKey']);
      const epicKey = trimString(args.epicKey);
      // El valor del JQL debe estar entre comillas dobles
      const jql = `"Epic Link" = "${epicKey}" OR parent = "${epicKey}"`;
      const result = await jiraClient.searchIssues(jql, {
        maxResults: args.maxResults as number | undefined,
        startAt: 0,
        fields: args.fields as string[] | undefined,
      });
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    // ============================================================================
    // PROJECTS
    // ============================================================================
    if (name === 'jira_get_projects') {
      const result = await jiraClient.getProjects();
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === 'jira_get_project') {
      validateRequiredParams(name, args, ['projectKey']);
      const result = await jiraClient.getProject(trimString(args.projectKey));
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === 'jira_get_project_issue_types') {
      validateRequiredParams(name, args, ['projectKey']);
      const result = await jiraClient.getProjectIssueTypes(trimString(args.projectKey));
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === 'jira_get_project_versions') {
      validateRequiredParams(name, args, ['projectKey']);
      const result = await jiraClient.getProjectVersions(trimString(args.projectKey));
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === 'jira_get_project_components') {
      validateRequiredParams(name, args, ['projectKey']);
      const result = await jiraClient.getProjectComponents(trimString(args.projectKey));
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    // ============================================================================
    // USERS
    // ============================================================================
    if (name === 'jira_get_current_user') {
      const result = await jiraClient.getCurrentUser();
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === 'jira_search_users') {
      validateRequiredParams(name, args, ['query']);
      const result = await jiraClient.searchUsers(
        trimString(args.query),
        args.maxResults as number | undefined
      );
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === 'jira_get_user') {
      validateRequiredParams(name, args, ['username']);
      const result = await jiraClient.getUser(trimString(args.username));
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === 'jira_get_assignable_users') {
      validateRequiredParams(name, args, ['projectKey']);
      const result = await jiraClient.getAssignableUsers(
        trimString(args.projectKey),
        args.maxResults as number | undefined
      );
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    // ============================================================================
    // METADATA
    // ============================================================================
    if (name === 'jira_get_priorities') {
      const result = await jiraClient.getPriorities();
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === 'jira_get_statuses') {
      const result = await jiraClient.getStatuses();
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === 'jira_get_issue_types') {
      const result = await jiraClient.getIssueTypes();
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === 'jira_get_fields') {
      const result = await jiraClient.getFields();
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    // ============================================================================
    // AGILE
    // ============================================================================
    if (name === 'jira_get_boards') {
      const result = await jiraClient.getBoards(args.type as 'scrum' | 'kanban' | undefined);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === 'jira_get_board') {
      validateRequiredParams(name, args, ['boardId']);
      const result = await jiraClient.getBoard(args.boardId as number);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === 'jira_get_board_sprints') {
      validateRequiredParams(name, args, ['boardId']);
      const result = await jiraClient.getBoardSprints(
        args.boardId as number,
        args.state as 'future' | 'active' | 'closed' | undefined
      );
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === 'jira_get_sprint_issues') {
      validateRequiredParams(name, args, ['sprintId']);
      const result = await jiraClient.getSprintIssues(
        args.sprintId as number,
        args.maxResults as number | undefined
      );
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === 'jira_get_board_backlog') {
      validateRequiredParams(name, args, ['boardId']);
      const result = await jiraClient.getBoardBacklog(
        args.boardId as number,
        args.maxResults as number | undefined
      );
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === 'jira_get_board_issues') {
      validateRequiredParams(name, args, ['boardId']);
      const result = await jiraClient.getBoardIssues(
        args.boardId as number,
        args.maxResults as number | undefined
      );
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    // ============================================================================
    // WORKFLOWS
    // ============================================================================
    if (name === 'jira_get_workflows') {
      const result = await jiraClient.getWorkflows();
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    throw new Error(`Herramienta desconocida: ${name}`);
  } catch (error: any) {
    return {
      content: [{ type: 'text', text: `Error: ${error.message}` }],
      isError: true,
    };
  }
}
