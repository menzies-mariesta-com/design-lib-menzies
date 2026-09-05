#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import {
  composeEntries,
  findEntry,
  searchEntries,
  type ComposeCategory,
} from './data/components.js'
import { docSections, installGuide, kotlinSnippets, searchDocs } from './data/docs.js'
import { composeKotlinRoot, repoRoot, dataMode } from './lib/paths.js'
import {
  findComposable,
  listBrandIcons,
  listComponentNames,
  listLucideIcons,
  listPrimitiveNames,
  readPigments,
} from './lib/source.js'

const server = new McpServer({
  name: 'wash-compose-android',
  version: '1.0.4',
})

function textResult(data: unknown) {
  return {
    content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }],
  }
}

const categoryEnum = z.enum([
  'provider',
  'primitive',
  'component',
  'shell',
  'theme',
  'icon',
  'effect',
])

server.tool(
  'list_components',
  'List Wash Compose (Android / KMP) APIs: providers, primitives, components, shell, theme, icons.',
  {
    category: categoryEnum.optional().describe('Filter by category'),
  },
  async ({ category }) => {
    const list = category
      ? composeEntries.filter((c) => c.category === category)
      : composeEntries
    return textResult({
      platform: 'android',
      packageNamespace: 'com.mariesta.menzies.washui',
      count: list.length,
      sourcePrimitives: listPrimitiveNames(),
      sourceComponents: listComponentNames(),
      components: list.map((c) => ({
        name: c.name,
        category: c.category,
        packageName: c.packageName,
        description: c.description,
        webEquivalent: c.webEquivalent,
      })),
    })
  },
)

server.tool(
  'search_components',
  'Search Wash Compose APIs by name, keyword, or web-equivalent name.',
  {
    query: z.string().describe('Search query'),
    category: categoryEnum.optional(),
  },
  async ({ query, category }) => {
    const results = searchEntries(query, category as ComposeCategory | undefined)
    return textResult({
      platform: 'android',
      query,
      count: results.length,
      results: results.map((c) => ({
        name: c.name,
        category: c.category,
        packageName: c.packageName,
        description: c.description,
        webEquivalent: c.webEquivalent,
      })),
    })
  },
)

server.tool(
  'get_component_docs',
  'Get Kotlin docs, params, example, and optional source signature for a Wash Compose API.',
  {
    name: z
      .string()
      .describe('Composable or API name (e.g. WashButton, Button, WashScaffold)'),
    includeSource: z
      .boolean()
      .optional()
      .describe('Attach parsed @Composable signature from Kotlin source'),
  },
  async ({ name, includeSource }) => {
    const entry = findEntry(name)
    const parsed = findComposable(name)
    if (!entry && !parsed) {
      return textResult({
        error: `API "${name}" not found. Use list_components or search_components.`,
        hint: 'Try WashButton, WashScaffold, WashIcon, LucideIcons, BrandIcons.',
      })
    }
    return textResult({
      platform: 'android',
      ...(entry ?? {}),
      source: includeSource || !entry ? parsed : undefined,
    })
  },
)

server.tool(
  'list_pigment_themes',
  'List WashPigment enum values from Compose source (parity with web watercolorThemes).',
  {},
  async () => {
    const pigments = readPigments()
    return textResult({
      platform: 'android',
      count: pigments.length,
      pigments,
      modes: ['Light', 'Dark'],
      usage: `WashProvider(defaultPigment = WashPigment.mineral) { … }
WashTheme.colors.primary`,
      source: 'packages/menzies-design-wash-compose/.../theme/WashPigment.kt',
      regenerate: 'npm run generate:compose-themes',
    })
  },
)

server.tool(
  'get_theme_tokens',
  'Describe Wash Compose theme access: WashTheme.colors fields, WashMode, WashPigment.',
  {},
  async () =>
    textResult({
      platform: 'android',
      access: {
        colors: 'WashTheme.colors',
        pigment: 'WashTheme.pigment',
        mode: 'WashTheme.mode',
        typography: 'WashTheme.typography',
        state: 'LocalWashTheme.current (setPigment / setMode)',
      },
      colorFields: [
        'base_100',
        'base_200',
        'base_300',
        'base_content',
        'primary',
        'primary_content',
        'secondary',
        'accent',
        'neutral',
        'info',
        'success',
        'warning',
        'error',
        'wash_a',
        'wash_b',
        'wash_c',
        'paper_fiber',
        'radiusBox',
        'radiusField',
      ],
      pigments: readPigments(),
      note: 'Schemes generated from menzies-design-wash-ui/src/styles/themes.css',
    }),
)

server.tool(
  'list_icons',
  'List LucideIcons and BrandIcons available in Wash Compose (from Kotlin source files).',
  {
    kind: z.enum(['lucide', 'brand', 'both']).optional().describe('Default both'),
    query: z.string().optional().describe('Optional name filter'),
  },
  async ({ kind, query }) => {
    const k = kind ?? 'both'
    const q = query?.toLowerCase().trim()
    const filter = (names: string[]) =>
      q ? names.filter((n) => n.toLowerCase().includes(q)) : names
    const lucide = k === 'brand' ? undefined : filter(listLucideIcons())
    const brands = k === 'lucide' ? undefined : filter(listBrandIcons())
    return textResult({
      platform: 'android',
      lucideCount: lucide?.length,
      brandCount: brands?.length,
      lucide,
      brands,
      usage: {
        lucide: `import com.mariesta.menzies.washui.icons.LucideIcons
import com.mariesta.menzies.washui.icons.lucide.Palette
WashIcon(imageVector = LucideIcons.Palette, contentDescription = "Palette")`,
        brand: `import com.mariesta.menzies.washui.icons.BrandIcons
import com.mariesta.menzies.washui.icons.brands.GitHub
WashIcon(imageVector = BrandIcons.GitHub, contentDescription = "GitHub")`,
      },
    })
  },
)

server.tool(
  'get_icon_usage',
  'Get Kotlin usage for a specific Lucide or brand icon in Wash Compose.',
  {
    name: z.string().describe('Icon name (e.g. Palette, GitHub, Search)'),
    kind: z.enum(['lucide', 'brand', 'auto']).optional().describe('Default auto-detect'),
  },
  async ({ name, kind }) => {
    const lucide = listLucideIcons()
    const brands = listBrandIcons()
    const lucideHit = lucide.find((n) => n.toLowerCase() === name.toLowerCase())
    const brandHit = brands.find((n) => n.toLowerCase() === name.toLowerCase())
    const resolvedKind =
      kind && kind !== 'auto'
        ? kind
        : brandHit && !lucideHit
          ? 'brand'
          : lucideHit
            ? 'lucide'
            : brandHit
              ? 'brand'
              : null

    if (!resolvedKind || (resolvedKind === 'lucide' && !lucideHit) || (resolvedKind === 'brand' && !brandHit)) {
      return textResult({
        error: `Icon "${name}" not found in Compose icon set.`,
        suggestions: {
          lucide: lucide.filter((n) => n.toLowerCase().includes(name.toLowerCase())).slice(0, 12),
          brands: brands.filter((n) => n.toLowerCase().includes(name.toLowerCase())).slice(0, 12),
        },
      })
    }

    const iconName = resolvedKind === 'lucide' ? lucideHit! : brandHit!
    const marker = resolvedKind === 'lucide' ? 'LucideIcons' : 'BrandIcons'
    const pkg =
      resolvedKind === 'lucide'
        ? 'com.mariesta.menzies.washui.icons.lucide'
        : 'com.mariesta.menzies.washui.icons.brands'

    return textResult({
      platform: 'android',
      kind: resolvedKind,
      name: iconName,
      import: [
        `import com.mariesta.menzies.washui.icons.${marker}`,
        `import ${pkg}.${iconName}`,
        'import com.mariesta.menzies.washui.icons.WashIcon',
      ],
      example: `WashIcon(
  imageVector = ${marker}.${iconName},
  contentDescription = "${iconName}",
  tint = ${resolvedKind === 'brand' ? 'Color.Unspecified /* keep brand colors */' : 'WashTheme.colors.primary'},
)`,
      note:
        resolvedKind === 'brand'
          ? 'Brand marks keep Simple Icons colors when tint is Unspecified.'
          : 'Lucide strokes tint when a color is supplied.',
    })
  },
)

server.tool(
  'get_usage_snippet',
  'Get Kotlin usage snippets for Wash Compose patterns (provider, button, icon, theme).',
  {
    idOrQuery: z
      .string()
      .optional()
      .describe('Snippet id or search (provider, button, icon, theme)'),
  },
  async ({ idOrQuery }) => {
    const q = idOrQuery?.toLowerCase().trim()
    const entries = Object.entries(kotlinSnippets).filter(([id, s]) => {
      if (!q) return true
      if (id === q) return true
      const hay = [id, s.title, ...s.keywords].join(' ').toLowerCase()
      return q.split(/\s+/).every((t) => hay.includes(t))
    })
    return textResult({
      platform: 'android',
      count: entries.length,
      snippets: entries.map(([id, s]) => ({ id, title: s.title, code: s.code })),
    })
  },
)

server.tool(
  'get_web_equivalent',
  'Map a web Wash UI name to Compose (or reverse). Helps porting between platforms.',
  {
    name: z.string().describe('Web or Compose component name (Button, WashButton, ThemeSwitcher, …)'),
  },
  async ({ name }) => {
    const q = name.toLowerCase().replace(/\s+/g, '')
    const hits = composeEntries.filter((e) => {
      const web = (e.webEquivalent ?? '').toLowerCase().replace(/\s+/g, '')
      const n = e.name.toLowerCase()
      return (
        n === q ||
        n === `wash${q}` ||
        n.replace(/^wash/, '') === q.replace(/^wash/, '') ||
        web === q ||
        web.includes(q) ||
        q.includes(web)
      )
    })
    return textResult({
      query: name,
      count: hits.length,
      mappings: hits.map((e) => ({
        compose: e.name,
        web: e.webEquivalent ?? null,
        packageName: e.packageName,
        description: e.description,
      })),
    })
  },
)

server.tool(
  'get_install_guide',
  'Gradle install, module paths, build commands for Wash Compose (Android).',
  {},
  async () =>
    textResult({
      platform: 'android',
      ...installGuide,
      dataMode: dataMode(),
      repoRoot: repoRoot() || null,
      composeKotlinRoot: composeKotlinRoot(),
      mcp: {
        package: '@menzies-mariesta-com/wash-compose-mcp',
        serverName: 'wash-compose-android',
        npx: 'npx -y @menzies-mariesta-com/wash-compose-mcp@1.0.4',
        monorepoAlternative: 'node packages/wash-compose-mcp/dist/index.js',
        build: 'npm run mcp:compose:build',
      },
    }),
)

server.tool(
  'search_docs',
  'Search Wash Compose documentation sections.',
  {
    query: z.string().describe('Search query'),
  },
  async ({ query }) => {
    const results = searchDocs(query)
    return textResult({
      platform: 'android',
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
  'wash-compose://components/index',
  {
    description: 'Wash Compose API index JSON',
    mimeType: 'application/json',
  },
  async () => ({
    contents: [
      {
        uri: 'wash-compose://components/index',
        mimeType: 'application/json',
        text: JSON.stringify(composeEntries, null, 2),
      },
    ],
  }),
)

server.resource(
  'icons-index',
  'wash-compose://icons/index',
  {
    description: 'Lucide + brand icon names from source',
    mimeType: 'application/json',
  },
  async () => ({
    contents: [
      {
        uri: 'wash-compose://icons/index',
        mimeType: 'application/json',
        text: JSON.stringify(
          { lucide: listLucideIcons(), brands: listBrandIcons() },
          null,
          2,
        ),
      },
    ],
  }),
)

server.resource(
  'install-guide',
  'wash-compose://docs/install',
  {
    description: 'Install guide excerpt',
    mimeType: 'text/plain',
  },
  async () => ({
    contents: [
      {
        uri: 'wash-compose://docs/install',
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
  console.error('wash-compose-mcp (android) failed:', err)
  process.exit(1)
})
