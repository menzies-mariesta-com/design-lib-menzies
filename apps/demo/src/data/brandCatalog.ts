import {
  brandCatalog as washBrandCatalog,
  type BrandCatalogEntry as WashBrandCatalogEntry,
  WASH_BRAND_BY_SLUG,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons/brands/catalog'
import { WASH_COMPOSE, WASH_PKG } from './iconCatalog'

export type BrandCatalogEntry = WashBrandCatalogEntry

/** Compose BrandIcons currently generated in menzies-design-wash-compose. */
const COMPOSE_BRAND_EXPORTS = new Set([
  'Angular',
  'Astro',
  'Daisyui',
  'Eleventy',
  'GitHub',
  'Html5',
  'Lit',
  'Lucide',
  'Nextjs',
  'Nuxt',
  'Preact',
  'Qwik',
  'ReactBrand',
  'Remix',
  'SimpleIcons',
  'Solid',
  'Svelte',
  'Tailwindcss',
  'TypeScript',
  'Vite',
  'Vue',
])

/** Catalog from Wash exports (Simple Icons data stays inside wash-ui). */
export function loadBrandCatalog(): BrandCatalogEntry[] {
  return washBrandCatalog.map((row) => ({
    ...row,
    washExport: row.washExport ?? WASH_BRAND_BY_SLUG[row.slug],
  }))
}

function inlineSvg(entry: Pick<BrandCatalogEntry, 'title' | 'hex' | 'path'>, attrs = ''): string {
  const extra = attrs ? ` ${attrs}` : ''
  return `<svg role="img" viewBox="0 0 24 24" width="24" height="24" fill="#${entry.hex}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"${extra}>
  <title>${entry.title}</title>
  <path d="${entry.path}" />
</svg>`
}

export function brandImportSnippets(entry: BrandCatalogEntry): {
  html: string
  jsx: string
  svelte: string
  kotlin: string
} {
  const { title, washExport, slug } = entry

  const html = washExport
    ? `<!-- Wash brand: import { ${washExport} } from '${WASH_PKG}/icons/brands' -->
<!-- Vanilla HTML can inline the same SVG path Wash ships for this mark. -->

${inlineSvg(entry)}`
    : `<!-- Wash brand by slug: import { BrandIcon } from '${WASH_PKG}/icons/brands/catalog' -->
<!-- <BrandIcon slug="${slug}" size={24} title="${title}" /> -->

${inlineSvg(entry)}`

  const jsx = washExport
    ? `import { ${washExport} } from '${WASH_PKG}/icons/brands'

<${washExport} size={24} title="${title}" />`
    : `import { BrandIcon } from '${WASH_PKG}/icons/brands/catalog'

<BrandIcon slug="${slug}" size={24} title="${title}" />`

  const svelte = washExport
    ? `<script lang="ts">
  // Wash brands: import { ${washExport} } from '${WASH_PKG}/icons/brands'
  // Prefer Wash over @icons-pack/svelte-simple-icons.
  import { ${washExport} } from '${WASH_PKG}/icons/brands'
</script>

<${washExport} size={24} title="${title}" />`
    : `<script lang="ts">
  import { BrandIcon } from '${WASH_PKG}/icons/brands/catalog'
</script>

<BrandIcon slug="${slug}" size={24} title="${title}" />`

  const hasCompose = washExport != null && COMPOSE_BRAND_EXPORTS.has(washExport)
  const kotlin = hasCompose
    ? `import ${WASH_COMPOSE}.icons.BrandIcons
import ${WASH_COMPOSE}.icons.WashIcon
import ${WASH_COMPOSE}.icons.brands.${washExport}

WashIcon(
    imageVector = BrandIcons.${washExport},
    contentDescription = "${title}",
)`
    : `import ${WASH_COMPOSE}.icons.BrandIcons
import ${WASH_COMPOSE}.icons.WashIcon
// Brand "${title}" (${slug}) is not in curated Compose BrandIcons yet.
// On web use: import { BrandIcon } from '${WASH_PKG}/icons/brands/catalog'
// <BrandIcon slug="${slug}" />
// Prefer adding Compose icons/brands over raw Simple Icons.

// WashIcon(imageVector = BrandIcons.…, contentDescription = "${title}")`

  return { html, jsx, svelte, kotlin }
}
