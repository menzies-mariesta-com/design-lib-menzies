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
import { installGuide } from './data/install.js'
import { findSnippets } from './data/snippets.js'
import { repoRoot, washUiSrc, dataMode } from './lib/paths.js'
import {
  listComponentFiles,
  listPrimitiveFiles,
  readComponentSourceSnippet,
  readCuratedBrands,
  readPigmentThemes,
  readThemeCss,
} from './lib/source.js'

const PKG = '@menzies-mariesta-com/menzies-design-wash-ui'

const server = new McpServer({
  name: 'wash-ui-web',
  version: '1.0.2',
})

function textResult(data: unknown) {
  return {
    content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }],
  }
}

const categoryEnum = z.enum([
  'primitive',
  'component',
  'provider',
  'hook',
  'core',
  'theme',
  'chart',
  'email',
  'icon',
  'utility',
])

server.tool(
  'list_components',
  'List Wash UI (web) library exports: React primitives, components, hooks, core, theme, charts, email, and icons.',
  {
    category: categoryEnum.optional().describe('Filter by component category'),
  },
  async ({ category }) => {
    const list = category
      ? components.filter((c) => c.category === category)
      : components
    return textResult({
      platform: 'web',
      package: PKG,
      count: list.length,
      sourcePrimitives: listPrimitiveFiles(),
      sourceComponents: listComponentFiles(),
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
  'Search Wash UI (web) components and APIs by name, keyword, or description.',
  {
    query: z.string().describe('Search query (space-separated tokens)'),
    category: categoryEnum.optional().describe('Optional category filter'),
  },
  async ({ query, category }) => {
    const results = searchComponents(query, category as ComponentCategory | undefined)
    return textResult({
      platform: 'web',
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
  'Get usage docs, props, import path, and example for a Wash UI (web) component or API. Optionally includes source excerpt.',
  {
    name: z.string().describe('Component or API name (e.g. Button, initWash, LineChart)'),
    includeSource: z
      .boolean()
      .optional()
      .describe('If true, attach a best-effort source excerpt from menzies-design-wash-ui'),
  },
  async ({ name, includeSource }) => {
    const entry = findComponent(name)
    if (!entry) {
      const chartCat = chartCategories.find(
        (c) =>
          c.components.some((n) => n.toLowerCase() === name.toLowerCase()) ||
          c.id === name.toLowerCase(),
      )
      if (chartCat) {
        return textResult({
          platform: 'web',
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

    const sourceMap: Record<string, string> = {
      Button: 'primitives/Button.tsx',
      Input: 'primitives/Input.tsx',
      Textarea: 'primitives/Textarea.tsx',
      Checkbox: 'primitives/Checkbox.tsx',
      Toggle: 'primitives/Toggle.tsx',
      Select: 'primitives/Select.tsx',
      Dialog: 'primitives/Dialog.tsx',
      Tooltip: 'primitives/Tooltip.tsx',
      Loading: 'primitives/Loading.tsx',
      Card: 'components/Card.tsx',
      Accordion: 'components/Accordion.tsx',
      Tabs: 'components/Tabs.tsx',
      ThemeSwitcher: 'components/ThemeSwitcher.tsx',
      FloatingPanel: 'components/FloatingPanel.tsx',
      WashProvider: 'WashProvider.tsx',
    }

    const result: Record<string, unknown> = { platform: 'web', ...entry }
    if (includeSource) {
      const rel = sourceMap[entry.name]
      if (rel) {
        result.source = readComponentSourceSnippet(rel)
      }
    }
    return textResult(result)
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
      platform: 'web',
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
  async () =>
    textResult({
      platform: 'web',
      ...themeTokensDoc,
      pigmentsFromSource: readPigmentThemes(),
      sourcePaths: {
        themesTs: 'packages/menzies-design-wash-ui/src/theme/themes.ts',
        themesCss: 'packages/menzies-design-wash-ui/src/styles/themes.css',
      },
    }),
)

server.tool(
  'list_pigment_themes',
  'List all pigment theme ids/labels/swatches from menzies-design-wash-ui source (themes.ts).',
  {},
  async () => {
    const themes = readPigmentThemes()
    return textResult({
      platform: 'web',
      count: themes.length,
      themes,
      usage: {
        applyTheme: `import { applyTheme } from '${PKG}/theme'\napplyTheme('mineral', 'light')`,
        dataTheme: 'Set html[data-theme="mineral"] or html[data-theme="mineral-dark"]',
      },
    })
  },
)

server.tool(
  'get_theme_css',
  'Get the CSS variable block for a pigment from themes.css (source of truth).',
  {
    pigment: z.string().describe('Pigment id (e.g. mineral, cerulean)'),
    mode: z.enum(['light', 'dark']).optional().describe('Paper mode (default light)'),
  },
  async ({ pigment, mode }) => {
    const block = readThemeCss(pigment, mode ?? 'light')
    return textResult({
      platform: 'web',
      pigment,
      mode: mode ?? 'light',
      ...block,
      source: 'packages/menzies-design-wash-ui/src/styles/themes.css',
    })
  },
)

server.tool(
  'get_icon_usage',
  'Get Lucide and brand icon import/usage patterns for Wash UI (web). Brands come from Wash, not direct simple-icons imports.',
  {
    kind: z
      .enum(['lucide', 'brand', 'both'])
      .optional()
      .describe('Which icon family to document (default both)'),
    name: z
      .string()
      .optional()
      .describe('Optional Lucide icon name (PascalCase) or brand slug/export'),
  },
  async ({ kind, name }) => {
    const k = kind ?? 'both'
    const brands = readCuratedBrands()
    const brandHit = name
      ? brands.find(
          (b) =>
            b.slug.toLowerCase() === name.toLowerCase() ||
            b.exportName.toLowerCase() === name.toLowerCase(),
        )
      : undefined

    return textResult({
      platform: 'web',
      pin: 'lucide-react 1.28.0 (inside Wash). Do not add a separate lucide-react dep for icons.',
      lucide:
        k === 'brand'
          ? undefined
          : {
              importPath: `${PKG}/icons`,
              namedExample: `import { ${name && !brandHit ? name : 'Palette'} } from '${PKG}/icons'`,
              dynamicExample: `import { DynamicIcon } from '${PKG}/icons'\n<DynamicIcon name="heart" className="size-5" />`,
              note: 'Full Lucide set is re-exported. Prefer Wash /icons over importing lucide-react in apps.',
            },
      brands:
        k === 'lucide'
          ? undefined
          : {
              curatedImport: `${PKG}/icons/brands`,
              catalogImport: `${PKG}/icons/brands/catalog`,
              curated: brands,
              example: brandHit
                ? `import { ${brandHit.exportName} } from '${PKG}/icons/brands'\n<${brandHit.exportName} size={24} />`
                : `import { GitHub } from '${PKG}/icons/brands'\nimport { BrandIcon } from '${PKG}/icons/brands/catalog'\n<GitHub size={24} />\n<BrandIcon slug="discord" size={24} />`,
              matched: brandHit,
            },
    })
  },
)

server.tool(
  'get_usage_snippet',
  'Get HTML / JSX / Svelte / vanilla usage snippets for common Wash UI patterns.',
  {
    idOrQuery: z
      .string()
      .optional()
      .describe('Snippet id or search query (boot-react, button, icons-lucide, theme, …)'),
    framework: z
      .enum(['html', 'jsx', 'svelte', 'vanilla'])
      .optional()
      .describe('Prefer a single framework variant'),
  },
  async ({ idOrQuery, framework }) => {
    const exact = idOrQuery
      ? findSnippets().find((s) => s.id === idOrQuery.toLowerCase())
      : undefined
    const list = exact ? [exact] : findSnippets(idOrQuery, framework)
    return textResult({
      platform: 'web',
      count: list.length,
      snippets: list.map((s) => ({
        id: s.id,
        title: s.title,
        frameworks: s.frameworks,
        code: framework && s.code[framework] ? { [framework]: s.code[framework] } : s.code,
      })),
    })
  },
)

server.tool(
  'get_install_guide',
  'Get install steps, entrypoint exports, peer dependencies, and npm registry config for Wash UI (web).',
  {},
  async () =>
    textResult({
      platform: 'web',
      ...installGuide,
      dataMode: dataMode(),
      repoRoot: repoRoot() || null,
      washUiSrc: washUiSrc(),
      mcp: {
        package: '@menzies-mariesta-com/wash-ui-mcp',
        serverName: 'wash-ui-web',
        npx: 'npx -y @menzies-mariesta-com/wash-ui-mcp@1.0.2',
        monorepoAlternative: 'node packages/wash-ui-mcp/dist/index.js',
        build: 'npm run mcp:build',
      },
    }),
)

server.tool(
  'search_docs',
  'Search Wash UI (web) documentation sections (install, theming, charts, email, MCP, etc.).',
  {
    query: z.string().describe('Search query'),
  },
  async ({ query }) => {
    const results = searchDocs(query)
    return textResult({
      platform: 'web',
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
    description: 'Full Wash UI (web) component and API index as JSON',
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

server.resource(
  'pigment-themes',
  'wash-ui://themes/index',
  {
    description: 'Pigment themes from themes.ts',
    mimeType: 'application/json',
  },
  async () => ({
    contents: [
      {
        uri: 'wash-ui://themes/index',
        mimeType: 'application/json',
        text: JSON.stringify(readPigmentThemes(), null, 2),
      },
    ],
  }),
)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch((err) => {
  console.error('wash-ui-mcp (web) failed:', err)
  process.exit(1)
})
