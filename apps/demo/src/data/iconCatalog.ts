import type { IconName } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

export type LucideCatalogEntry = {
  kebab: IconName
  pascal: string
}

export function kebabToPascal(kebab: string): string {
  return kebab
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

/** Build Lucide catalog from Wash `iconNames` (lucide-react 1.28.0 inside Wash). */
export function buildLucideCatalog(iconNames: readonly string[]): LucideCatalogEntry[] {
  return [...iconNames]
    .sort((a, b) => a.localeCompare(b))
    .map((kebab) => ({
      kebab: kebab as IconName,
      pascal: kebabToPascal(kebab),
    }))
}

export const WASH_PKG = '@menzies-mariesta-com/menzies-design-wash-ui'
export const WASH_COMPOSE = 'com.mariesta.menzies.washui'

export function lucideImportSnippets(entry: LucideCatalogEntry): {
  html: string
  jsx: string
  svelte: string
  kotlin: string
} {
  const { kebab, pascal } = entry

  const html = `<!-- Wash UI icons (Lucide 1.28.0 inside ${WASH_PKG}). -->
<!-- Prefer the React/JSX import below in apps. For static HTML, inline the SVG
     from the Wash preview, or render via your framework using Wash icons. -->

<!-- Preferred (JSX / bundler): -->
<!-- import { ${pascal} } from '${WASH_PKG}/icons' -->
<!-- <${pascal} className="size-5" strokeWidth={1.75} aria-hidden="true" /> -->

<!-- Dynamic by kebab name: -->
<!-- import { DynamicIcon } from '${WASH_PKG}/icons' -->
<!-- <DynamicIcon name="${kebab}" className="size-5" strokeWidth={1.75} /> -->`

  const jsx = `import { ${pascal} } from '${WASH_PKG}/icons'

<${pascal} className="size-5" strokeWidth={1.75} aria-hidden="true" />

// Or by kebab name:
// import { DynamicIcon } from '${WASH_PKG}/icons'
// <DynamicIcon name="${kebab}" className="size-5" strokeWidth={1.75} />`

  const svelte = `<script lang="ts">
  // Wash icons ship from ${WASH_PKG}/icons (React adapter today).
  // Prefer that package API; do not install @lucide/svelte as the primary path.
  import { ${pascal} } from '${WASH_PKG}/icons'
</script>

<${pascal} class="size-5" strokeWidth={1.75} aria-hidden="true" />`

  const kotlin = `import ${WASH_COMPOSE}.icons.LucideIcons
import ${WASH_COMPOSE}.icons.WashIcon
import ${WASH_COMPOSE}.icons.lucide.${pascal}

WashIcon(
    imageVector = LucideIcons.${pascal},
    contentDescription = null,
)`

  return { html, jsx, svelte, kotlin }
}
