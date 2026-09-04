import themesCss from '../../../../packages/menzies-design-wash-ui/src/styles/themes.css?raw'
import { WASH_COMPOSE, WASH_PKG } from '../components/showcaseCodeSnippets'
import type { WatercolorThemeId } from '../themes'

function extractBalancedBlock(source: string, openBraceIndex: number): string {
  let depth = 0
  for (let i = openBraceIndex; i < source.length; i++) {
    const ch = source[i]
    if (ch === '{') depth += 1
    else if (ch === '}') {
      depth -= 1
      if (depth === 0) return source.slice(openBraceIndex, i + 1)
    }
  }
  return ''
}

function extractPluginTheme(css: string, name: string): string {
  const nameRe = new RegExp(`name:\\s*"${name}"`)
  const nameMatch = nameRe.exec(css)
  if (!nameMatch) return ''

  const pluginStart = css.lastIndexOf('@plugin', nameMatch.index)
  if (pluginStart < 0) return ''

  const brace = css.indexOf('{', pluginStart)
  if (brace < 0) return ''

  const block = extractBalancedBlock(css, brace)
  if (!block) return ''
  return `@plugin "daisyui/theme" ${block}`
}

function extractDataTheme(css: string, name: string): string {
  const needle = `[data-theme="${name}"]`
  const idx = css.indexOf(needle)
  if (idx < 0) return ''

  const brace = css.indexOf('{', idx)
  if (brace < 0) return ''

  const block = extractBalancedBlock(css, brace)
  if (!block) return ''
  return `${needle} ${block}`
}

/** Full daisyUI theme + Wash token source for one pigment (light and dark). */
export function getPigmentThemeCss(id: WatercolorThemeId): string {
  const parts = [
    extractPluginTheme(themesCss, id),
    extractDataTheme(themesCss, id),
    extractPluginTheme(themesCss, `${id}-dark`),
    extractDataTheme(themesCss, `${id}-dark`),
  ].filter(Boolean)

  return parts.join('\n\n')
}

export function getPigmentThemeHtmlUsage(id: WatercolorThemeId): string {
  return `<!-- Import Wash styles once (includes all pigment themes) -->
<link rel="stylesheet" href="/node_modules/${WASH_PKG}/dist/styles.css" />
<script type="module">
  import { initWash } from '${WASH_PKG}/core'
  initWash({ defaultPigment: '${id}', defaultMode: 'light' })
</script>

<!-- Or set data-theme directly: "${id}" | "${id}-dark" -->
<html data-theme="${id}">`
}

export function getPigmentThemeJsxUsage(id: WatercolorThemeId): string {
  return `import { WashProvider } from '${WASH_PKG}'
import { applyTheme } from '${WASH_PKG}/theme'
import '${WASH_PKG}/styles.css'

// Provider boot
<WashProvider defaultPigment="${id}" defaultMode="light">
  <App />
</WashProvider>

// Or switch at runtime
applyTheme('${id}', 'light')
// applyTheme('${id}', 'dark') → data-theme="${id}-dark"`
}

export function getPigmentThemeSvelteUsage(id: WatercolorThemeId): string {
  return `<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { initWash, type WashRuntime } from '${WASH_PKG}/core'
  import '${WASH_PKG}/styles.css'

  let wash: WashRuntime | undefined

  onMount(() => {
    wash = initWash({ defaultPigment: '${id}', defaultMode: 'light' })
  })

  onDestroy(() => wash?.destroy())
</script>`
}

export function getPigmentThemeKotlinUsage(id: WatercolorThemeId): string {
  return `import ${WASH_COMPOSE}.theme.WashMode
import ${WASH_COMPOSE}.theme.WashPigment
import ${WASH_COMPOSE}.theme.WashTheme

@Composable
fun App() {
    WashTheme(
        pigment = WashPigment.${id},
        mode = WashMode.Light,
    ) {
        // ...
    }
}`
}
