#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { JiraClient } from './jira-client.js';
import type { JiraConfig } from './types.js';
import { tools } from './tools.js';
import { handleToolCall } from './handlers.js';
import * as fs from 'fs';
import * as path from 'path';

const VERSION = '1.0.4-simple';

// Log file para debugging
const LOG_FILE = path.join(process.cwd(), 'mcp-debug.log');

function debugLog(message: string) {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${message}\n`;
  console.error(logLine.trim());
  try {
    fs.appendFileSync(LOG_FILE, logLine);
  } catch (error) {
    // Ignorar errores de escritura
  }
}

/**
 * Configuración desde variables de entorno
 */
function getConfig(): JiraConfig {
  const baseUrl = process.env.JIRA_BASE_URL;
  const jsessionid = process.env.JIRA_JSESSIONID;
  const xsrfToken = process.env.JIRA_XSRF_TOKEN;
  const rememberMe = process.env.JIRA_REMEMBER_ME_COOKIE;
  const userAgent = process.env.JIRA_USER_AGENT;

  if (!baseUrl || !jsessionid || !xsrfToken) {
    throw new Error(
      'Faltan variables de entorno requeridas: JIRA_BASE_URL, JIRA_JSESSIONID, JIRA_XSRF_TOKEN'
    );
  }

  return {
    baseUrl,
    cookies: {
      JSESSIONID: jsessionid,
      'atlassian.xsrf.token': xsrfToken,
      ...(rememberMe && { 'seraph.rememberme.cookie': rememberMe }),
    },
    userAgent,
  };
}

/**
 * Servidor MCP principal
 */
async function main() {
  debugLog(`Iniciando servidor MCP v${VERSION}`);
  debugLog(`Log file: ${LOG_FILE}`);
  
  // Obtener configuración
  const config = getConfig();
  debugLog(`Configuración cargada: ${config.baseUrl}`);
  
  const jiraClient = new JiraClient(config);

  // Crear servidor MCP usando API de bajo nivel (soporta JSON Schema)
  const server = new Server(
    {
      name: 'jira-onprem-mcp',
      version: VERSION,
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Handler para listar herramientas (expone el JSON Schema completo)
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    debugLog(`📋 Listando ${tools.length} herramientas`);
    return {
      tools: tools.map(tool => ({
        name: tool.name,
        description: tool.description,
        inputSchema: tool.inputSchema,
      })),
    };
  });

  // Handler para ejecutar herramientas
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    debugLog(`========================================`);
    debugLog(`⚙️  ${name}`);
    debugLog(`📦 Args: ${JSON.stringify(args, null, 2)}`);

    const tool = tools.find(t => t.name === name);
    if (!tool) {
      debugLog(`❌ Herramienta no encontrada: ${name}`);
      return {
        content: [{ type: 'text', text: `Herramienta no encontrada: ${name}` }],
        isError: true,
      };
    }

    // Validar parámetros requeridos
    const schema = tool.inputSchema;
    if (schema && schema.required && Array.isArray(schema.required)) {
      const missingParams = schema.required.filter(param => !(param in (args || {})));
      if (missingParams.length > 0) {
        debugLog(`❌ Faltan: ${missingParams.join(', ')}`);
        return {
          content: [{
            type: 'text',
            text: `Faltan parámetros: ${missingParams.join(', ')}\n\nEjemplo:\n${JSON.stringify(
              schema.required.reduce((acc: any, param: string) => {
                acc[param] = param === 'issueKey' ? 'PROJ-123' : '<valor>';
                return acc;
              }, {}),
              null,
              2
            )}`
          }],
          isError: true,
        };
      }
    }

    try {
      debugLog(`✅ Ejecutando...`);
      const result = await handleToolCall(name, args || {}, jiraClient);
      debugLog(`✅ Completado`);
      return result;
    } catch (error: any) {
      debugLog(`❌ Error: ${error.message}`);
      return {
        content: [{ type: 'text', text: `Error: ${error.message}` }],
        isError: true,
      };
    }
  });

  // Iniciar servidor
  const transport = new StdioServerTransport();
  await server.connect(transport);

  debugLog(`✅ Servidor listo`);
}

main().catch((error) => {
  debugLog(`💥 Error fatal: ${error.message}`);
  console.error('Error fatal:', error);
  process.exit(1);
});
