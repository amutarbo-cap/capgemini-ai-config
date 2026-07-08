#!/usr/bin/env node
// CLI helper para interactuar con Jira directamente

import { JiraClient } from './jira-client.js';
import type { JiraConfig } from './types.js';

const args = process.argv.slice(2);
const command = args[0];

if (!process.env.JIRA_BASE_URL || !process.env.JIRA_JSESSIONID || !process.env.JIRA_XSRF_TOKEN) {
  console.error('❌ Faltan variables de entorno necesarias');
  console.error('   Exporta: JIRA_BASE_URL, JIRA_JSESSIONID, JIRA_XSRF_TOKEN');
  process.exit(1);
}

const config: JiraConfig = {
  baseUrl: process.env.JIRA_BASE_URL,
  cookies: {
    JSESSIONID: process.env.JIRA_JSESSIONID,
    'atlassian.xsrf.token': process.env.JIRA_XSRF_TOKEN,
    'seraph.rememberme.cookie': process.env.JIRA_REMEMBER_ME_COOKIE
  }
};

const client = new JiraClient(config);

async function main() {
  try {
    switch (command) {
      case 'get-issue': {
        const issueKey = args[1];
        if (!issueKey) {
          console.error('Uso: jira-cli get-issue <ISSUE_KEY>');
          process.exit(1);
        }
        const issue = await client.getIssue(issueKey);
        console.log(JSON.stringify(issue, null, 2));
        break;
      }

      case 'search': {
        const jql = args[1];
        if (!jql) {
          console.error('Uso: jira-cli search "<JQL>"');
          process.exit(1);
        }
        const result = await client.searchIssues(jql, { maxResults: 50 });
        console.log(JSON.stringify(result, null, 2));
        break;
      }

      case 'get-epic-issues': {
        const epicKey = args[1];
        if (!epicKey) {
          console.error('Uso: jira-cli get-epic-issues <EPIC_KEY>');
          process.exit(1);
        }
        const jql = `"Epic Link" = "${epicKey}" OR parent = "${epicKey}"`;
        const result = await client.searchIssues(jql, { maxResults: 50 });
        console.log(JSON.stringify(result, null, 2));
        break;
      }

      case 'get-comments': {
        const issueKey = args[1];
        if (!issueKey) {
          console.error('Uso: jira-cli get-comments <ISSUE_KEY>');
          process.exit(1);
        }
        const comments = await client.getComments(issueKey);
        console.log(JSON.stringify(comments, null, 2));
        break;
      }

      case 'get-transitions': {
        const issueKey = args[1];
        if (!issueKey) {
          console.error('Uso: jira-cli get-transitions <ISSUE_KEY>');
          process.exit(1);
        }
        const transitions = await client.getTransitions(issueKey);
        console.log(JSON.stringify(transitions, null, 2));
        break;
      }

      case 'get-projects': {
        const projects = await client.getProjects();
        console.log(JSON.stringify(projects, null, 2));
        break;
      }

      case 'get-user': {
        const user = await client.getCurrentUser();
        console.log(JSON.stringify(user, null, 2));
        break;
      }

      default:
        console.log('Uso: jira-cli <comando> [argumentos]');
        console.log('');
        console.log('Comandos disponibles:');
        console.log('  get-issue <KEY>           Obtener detalles de un issue');
        console.log('  search "<JQL>"            Buscar issues con JQL');
        console.log('  get-epic-issues <KEY>     Obtener tareas de una épica');
        console.log('  get-comments <KEY>        Obtener comentarios de un issue');
        console.log('  get-transitions <KEY>     Obtener transiciones disponibles');
        console.log('  get-projects              Listar todos los proyectos');
        console.log('  get-user                  Obtener usuario actual');
        console.log('');
        console.log('Ejemplos:');
        console.log('  jira-cli get-issue PROJ-123');
        console.log('  jira-cli search "project = PROJ"');
        console.log('  jira-cli get-epic-issues PROJ-456');
        process.exit(1);
    }
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Response:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

main();
