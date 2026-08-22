#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import {
  components,
  findComponent,
  searchComponents,
  type ComponentCategory,
} from './data/components.js'
import { chartCategories, chartUtilities, CHART_IMPORT } from './data/charts.js'
import { docSections, searchDocs } from './data/docs.js'
import { themeTokensDoc } from './data/theme.js'
import { brushApiDoc } from './data/brush.js'
import { installGuide } from './data/install.js'

const server = new McpServer({
  name: 'wash-ui',
  version: '0.1.0',
})

function textResult(data: unknown) {
  return {
    content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }],
  }
}

server.tool(
  'list_components',
  'List Wash UI library exports: React primitives, components, hooks, core, theme, brush, charts, email, and icons.',
  {
    category: z
      .enum([
        'primitive',
        'component',
        'provider',
        'hook',
        'core',
        'theme',
        'brush',
        'chart',
        'email',
        'icon',
        'utility',
      ])
      .optional()
      .describe('Filter by component category'),
  },
  async ({ category }) => {
    const list = category
      ? components.filter((c) => c.category === category)
      : components
    return textResult({
      count: list.length,
      components: list.map((c) => ({
        name: c.name,
        category: c.category,
        importPath: c.importPath,
        description: c.description,
        demoPage: c.demoPage,
      })),
    })
  },
)

server.tool(
  'search_components',
  'Search Wash UI components and APIs by name, keyword, or description.',
  {
    query: z.string().describe('Search query (space-separated tokens)'),
    category: z
      .enum([
        'primitive',
        'component',
        'provider',
        'hook',
        'core',
        'theme',
        'brush',
        'chart',
        'email',
        'icon',
        'utility',
      ])
      .optional()
      .describe('Optional category filter'),
  },
  async ({ query, category }) => {
    const results = searchComponents(query, category as ComponentCategory | undefined)
    return textResult({
      query,
      count: results.length,
      results: results.map((c) => ({
        name: c.name,
        category: c.category,
        importPath: c.importPath,
        description: c.description,
        demoPage: c.demoPage,
      })),
    })
  },
)

server.tool(
  'get_component_docs',
  'Get usage docs, props, import path, and example for a Wash UI component or API.',
  {
    name: z.string().describe('Component or API name (e.g. Button, initWash, LineChart)'),
  },
  async ({ name }) => {
    const entry = findComponent(name)
    if (!entry) {
      const chartCat = chartCategories.find(
        (c) =>
          c.components.some((n) => n.toLowerCase() === name.toLowerCase()) ||
          c.id === name.toLowerCase(),
      )
      if (chartCat) {
        return textResult({
          name,
          category: 'chart',
          importPath: CHART_IMPORT,
          description: chartCat.description,
          relatedComponents: chartCat.components,
          demoPage: chartCat.demoPage,
          example: `import { ${chartCat.components[0]} } from '${CHART_IMPORT}'`,
        })
      }
      return textResult({
        error: `Component "${name}" not found. Use list_components or search_components.`,
      })
    }
    return textResult(entry)
  },
)

server.tool(
  'list_chart_types',
  'List Wash UI chart categories, components per category, and theme utilities.',
  {
    category: z
      .string()
      .optional()
      .describe('Optional chart category id (e.g. line, pie, heatmap)'),
  },
  async ({ category }) => {
    const cats = category
      ? chartCategories.filter((c) => c.id === category.toLowerCase())
      : chartCategories
    return textResult({
      importPath: CHART_IMPORT,
      categoryCount: cats.length,
      categories: cats,
      utilities: chartUtilities,
      note: 'Charts read Wash CSS tokens and update when pigment or mode changes.',
    })
  },
)

server.tool(
  'get_theme_tokens',
  'Get Wash UI theming documentation: CSS variables, utility classes, and theme API.',
  {},
  async () => textResult(themeTokensDoc),
)

server.tool(
  'get_brush_api',
  'Get Wash UI brush system documentation: presets, CSS variables, and brush API.',
  {},
  async () => textResult(brushApiDoc),
)

server.tool(
  'get_install_guide',
  'Get install steps, entrypoint exports, peer dependencies, and npm registry config.',
  {},
  async () => textResult(installGuide),
)

server.tool(
  'search_docs',
  'Search Wash UI documentation sections (install, theming, brush, charts, email, MCP, etc.).',
  {
    query: z.string().describe('Search query'),
  },
  async ({ query }) => {
    const results = searchDocs(query)
    return textResult({
      query,
      count: results.length,
      sections: results.map((s) => ({
        id: s.id,
        title: s.title,
        content: s.content,
        keywords: s.keywords,
      })),
    })
  },
)

server.resource(
  'component-index',
  'wash-ui://components/index',
  {
    description: 'Full Wash UI component and API index as JSON',
    mimeType: 'application/json',
  },
  async () => ({
    contents: [
      {
        uri: 'wash-ui://components/index',
        mimeType: 'application/json',
        text: JSON.stringify(components, null, 2),
      },
    ],
  }),
)

server.resource(
  'readme-install',
  'wash-ui://docs/install',
  {
    description: 'Wash UI install guide excerpt',
    mimeType: 'text/plain',
  },
  async () => ({
    contents: [
      {
        uri: 'wash-ui://docs/install',
        mimeType: 'text/plain',
        text: docSections.find((s) => s.id === 'install')?.content ?? '',
      },
    ],
  }),
)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch((err) => {
  console.error('wash-ui-mcp failed:', err)
  process.exit(1)
})
