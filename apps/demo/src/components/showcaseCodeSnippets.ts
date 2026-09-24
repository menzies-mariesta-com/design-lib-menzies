/**
 * Shared preview-code helpers for ShowcaseTabs.
 * Gallery pages pass HTML + JSX; Svelte and Kotlin (and import headers) are derived here.
 * Copy tabs expand to daisyUI class markup only (no Wash / #plain component props).
 */

import { expandToDaisyUiMarkup } from './daisyUiPasteMarkup'

export const WASH_PKG = '@menzies-mariesta-com/menzies-design-wash-ui'
export const WASH_COMPOSE = 'com.mariesta.menzies.washui'

const LUCIDE_ICON_NAMES = [
  'Plus',
  'Download',
  'Trash2',
  'Heart',
  'Settings',
  'ArrowRight',
  'Search',
  'Check',
  'Copy',
  'ChevronLeft',
  'ChevronRight',
  'X',
  'Info',
  'CircleCheck',
  'CircleX',
  'TriangleAlert',
  'BookOpen',
  'ExternalLink',
  'Palette',
  'Layers',
  'Menu',
  'Home',
  'User',
  'Bell',
  'Star',
  'Filter',
  'Calendar',
  'Clock',
  'Mail',
  'Phone',
  'MapPin',
  'Eye',
  'EyeOff',
  'Lock',
  'Unlock',
  'LogIn',
  'LogOut',
  'Save',
  'Edit',
  'Pencil',
  'Upload',
  'Image',
  'File',
  'Folder',
  'Link',
  'Share',
  'MoreHorizontal',
  'MoreVertical',
  'ChevronDown',
  'ChevronUp',
  'ArrowLeft',
  'ArrowUp',
  'ArrowDown',
] as const

const LUCIDE_ICON_TAG = new RegExp(
  `<(${LUCIDE_ICON_NAMES.join('|')})\\b`,
  'g',
)

/** Curated Wash brand components from `/icons/brands` (excludes `X`: Lucide close). */
const WASH_BRAND_ICON_NAMES = [
  'Angular',
  'Astro',
  'Daisyui',
  'Discord',
  'Eleventy',
  'GitHub',
  'Google',
  'Html5',
  'Lit',
  'Lucide',
  'Nextjs',
  'Npm',
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
] as const

const WASH_BRAND_ICON_TAG = new RegExp(
  `<(${WASH_BRAND_ICON_NAMES.join('|')})\\b`,
  'g',
)

export type ShowcaseCodeSet = {
  html: string
  jsx: string
  svelte: string
  kotlin: string
}

function hasImportHeader(code: string): boolean {
  const head = code.trimStart().slice(0, 220)
  return (
    /^import\s/m.test(head) ||
    /^<script\b/m.test(head) ||
    /<link\b[^>]*stylesheet/i.test(head) ||
    /^package\s/m.test(head)
  )
}

function stripLeadingBlank(code: string): string {
  return code.replace(/^\s+/, '')
}

/** MCP / JSON config snippets should not get Wash import headers. */
function isConfigSnippet(code: string): boolean {
  const head = code.trimStart()
  return head.startsWith('{') || head.startsWith('[')
}

function collectIconImports(jsx: string): string[] {
  const lines: string[] = []

  const icons = new Set<string>()
  for (const match of jsx.matchAll(LUCIDE_ICON_TAG)) {
    icons.add(match[1]!)
  }
  if (icons.size > 0) {
    lines.push(
      `import { ${[...icons].sort().join(', ')} } from '${WASH_PKG}/icons'`,
    )
  }

  const brands = new Set<string>()
  for (const match of jsx.matchAll(WASH_BRAND_ICON_TAG)) {
    brands.add(match[1]!)
  }
  for (const name of icons) brands.delete(name)
  if (brands.size > 0) {
    lines.push(
      `import { ${[...brands].sort().join(', ')} } from '${WASH_PKG}/icons/brands'`,
    )
  }

  return lines
}

function withHtmlImports(html: string): string {
  const body = expandToDaisyUiMarkup(stripLeadingBlank(html), 'html')
  if (hasImportHeader(body)) return body
  // Styles only. No initWash / component boot in the paste path.
  return `<!-- Wash styles (pigment tokens + calendar/time chrome) -->
<link rel="stylesheet" href="/node_modules/${WASH_PKG}/dist/styles.css" />

${body}`
}

function withJsxImports(jsx: string): string {
  const body = expandToDaisyUiMarkup(stripLeadingBlank(jsx), 'jsx')
  const icons = collectIconImports(body)
  // Keep any remaining hand-authored icon imports already in the body.
  if (hasImportHeader(body) || icons.length === 0) return body
  return `${icons.join('\n')}

${body}`
}

/**
 * Turn HTML markup into a paste-ready Svelte 5 single file.
 * Skips wrapping when the source already has a `<script` block.
 * Does not prepend instructional / framework-marketing comments.
 */
export function wrapDaisyAsSvelte(markup: string): string {
  const body = stripLeadingBlank(markup)
    .replace(/^<!-- Styles[\s\S]*?<\/script>\s*/m, '')
    .replace(/^<!-- Wash styles[\s\S]*?-->\s*/m, '')
    .replace(/^<!--\s*Paste into[\s\S]*?-->\s*/gim, '')
    .replace(/^<!--\s*Empty snippet:[\s\S]*?-->\s*/gim, '')
    .replace(/^<link\b[^>]*>\s*/gim, '')
    .trim()

  if (!body) {
    return ''
  }

  return body.endsWith('\n') ? body : `${body}\n`
}

/**
 * Svelte treats static boolean attrs (`checked`, `open`) as controlled props,
 * which makes daisyUI collapse radios/checkboxes/details read-only. Rewrite
 * those patterns to bind:group / bind:checked / bind:open so paste works.
 */
function adaptCollapseForSvelte(markup: string): { script: string; markup: string } {
  // Only rewrite daisyUI collapse pastes; leave other form controls alone.
  if (!/\bcollapse\b/.test(markup)) return { script: '', markup }

  const decls: string[] = []
  let next = markup

  const radioNames = new Set<string>()
  for (const m of markup.matchAll(/<input\b[^>]*\btype=["']radio["'][^>]*>/gi)) {
    const name = m[0].match(/\bname=["']([^"']+)["']/i)?.[1]
    if (name) radioNames.add(name)
  }

  for (const name of radioNames) {
    const state = name.replace(/[^a-zA-Z0-9_$]/g, '_') || 'acc'
    let index = 0
    next = next.replace(/<input\b[^>]*>/gi, (tag) => {
      if (!/\btype=["']radio["']/i.test(tag)) return tag
      const n = tag.match(/\bname=["']([^"']+)["']/i)?.[1]
      if (n !== name) return tag
      const value = String(index++)
      const wasChecked = /\schecked(?:\s|=|>|$)/i.test(tag)
      if (index === 1) {
        decls.push(`\tlet ${state} = $state('${wasChecked ? '0' : ''}');`)
      } else if (wasChecked && decls.some((d) => d.includes(`let ${state} =`))) {
        const i = decls.findIndex((d) => d.includes(`let ${state} =`))
        decls[i] = `\tlet ${state} = $state('${value}');`
      }
      let out = tag
        .replace(/\schecked(?:=["'][^"']*["'])?/gi, '')
        .replace(/\svalue=["'][^"']*["']/gi, '')
      if (/\s\/?>\s*$/.test(out)) {
        out = out.replace(/\s*\/?>\s*$/, ` value="${value}" bind:group={${state}} />`)
      }
      return out
    })
  }

  let checkboxIndex = 0
  next = next.replace(/<input\b[^>]*\btype=["']checkbox["'][^>]*>/gi, (tag) => {
    const wasChecked = /\schecked(?:\s|=|>|$)/i.test(tag)
    const state = `collapseOpen${checkboxIndex++}`
    decls.push(`\tlet ${state} = $state(${wasChecked ? 'true' : 'false'});`)
    return tag
      .replace(/\schecked(?:=["'][^"']*["'])?/gi, '')
      .replace(/\s*\/?>\s*$/, ` bind:checked={${state}} />`)
  })

  let detailsIndex = 0
  next = next.replace(/<details\b[^>]*>/gi, (tag) => {
    if (!/\sopen(?:\s|=|>|$)/i.test(tag)) return tag
    const state = `detailsOpen${detailsIndex++}`
    decls.push(`\tlet ${state} = $state(true);`)
    return tag.replace(/\sopen(?:=["'][^"']*["'])?/gi, '').replace(/>\s*$/, ` bind:open={${state}}>`)
  })

  if (decls.length === 0) return { script: '', markup: next }

  // Dedupe state decls (radio rewrite may touch the same let twice)
  const seen = new Set<string>()
  const unique = decls.filter((d) => {
    const key = d.match(/let\s+(\w+)/)?.[1] ?? d
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  return {
    script: `<script lang="ts">\n${unique.join('\n')}\n</script>\n\n`,
    markup: next,
  }
}

function toSvelteSnippet(html: string): string {
  const body = stripLeadingBlank(html)
  if (hasImportHeader(body) && body.includes('<script')) {
    return wrapDaisyAsSvelte(expandToDaisyUiMarkup(body, 'html'))
  }

  const markup = expandToDaisyUiMarkup(
    body
      .replace(/^<!-- Styles[\s\S]*?<\/script>\s*/m, '')
      .replace(/^<!-- Wash styles[\s\S]*?-->\s*/m, '')
      .replace(/^<link\b[^>]*>\s*/gim, '')
      .trim(),
    'html',
  )

  const adapted = adaptCollapseForSvelte(markup)
  if (adapted.script) {
    return wrapDaisyAsSvelte(`${adapted.script}${adapted.markup}`)
  }

  return wrapDaisyAsSvelte(adapted.markup)
}

type KotlinMatch = {
  imports: string[]
  body: string
}

function firstAttr(html: string, tag: string, attr: string): string | null {
  const re = new RegExp(
    `<${tag}\\b[^>]*\\b${attr}=["']([^"']*)["']`,
    'i',
  )
  const m = html.match(re)
  return m?.[1] ?? null
}

function firstTextContent(html: string, tag: string): string {
  const m = html.match(new RegExp(`<${tag}\\b[^>]*>([^<]*)</${tag}>`, 'i'))
  const text = m?.[1]?.trim()
  return text && text.length > 0 ? text : 'Wash'
}

function buttonVariantFromClass(className: string): string {
  const order = [
    'primary',
    'secondary',
    'accent',
    'neutral',
    'info',
    'success',
    'warning',
    'error',
    'ghost',
    'link',
    'outline',
  ] as const
  for (const v of order) {
    if (new RegExp(`\\bbtn-${v}\\b`).test(className)) {
      return `WashButtonVariant.${v[0]!.toUpperCase()}${v.slice(1)}`
    }
  }
  return 'WashButtonVariant.Default'
}

function detectKotlin(html: string): KotlinMatch {
  const imports = new Set<string>([
    `import androidx.compose.runtime.Composable`,
    `import ${WASH_COMPOSE}.WashProvider`,
    `import ${WASH_COMPOSE}.theme.WashMode`,
    `import ${WASH_COMPOSE}.theme.WashPigment`,
  ])
  const lines: string[] = []

  // daisyUI calendar chrome in gallery HTML; Compose still maps to WashCalendar.
  if (
    /wash-calendar\b/.test(html) ||
    /CalendarMonth\b/.test(html) ||
    /WashCalendar\b/.test(html)
  ) {
    imports.add(`import ${WASH_COMPOSE}.primitives.WashCalendar`)
    const mode =
      firstAttr(html, 'CalendarMonth', 'mode') ??
      firstAttr(html, 'WashCalendar', 'mode') ??
      'single'
    lines.push(
      `    var value by remember { mutableStateOf("") }`,
      `    WashCalendar(`,
      `        mode = "${mode}",`,
      `        value = value,`,
      `        onChange = { value = it },`,
      `    )`,
    )
    imports.add(`import androidx.compose.runtime.getValue`)
    imports.add(`import androidx.compose.runtime.mutableStateOf`)
    imports.add(`import androidx.compose.runtime.remember`)
    imports.add(`import androidx.compose.runtime.setValue`)
  }

  if (/\bbtn\b/.test(html)) {
    imports.add(`import ${WASH_COMPOSE}.primitives.WashButton`)
    imports.add(`import ${WASH_COMPOSE}.primitives.WashButtonVariant`)
    const className = firstAttr(html, 'button', 'class') ?? ''
    const label = firstTextContent(html, 'button')
    const variant = buttonVariantFromClass(className)
    lines.push(
      `    WashButton(`,
      `        onClick = { },`,
      `        text = "${label.replace(/"/g, '\\"')}",`,
      `        variant = ${variant},`,
      `    )`,
    )
  }

  if (/\bcheckbox\b/.test(html)) {
    imports.add(`import ${WASH_COMPOSE}.primitives.WashCheckbox`)
    lines.push(
      `    WashCheckbox(`,
      `        checked = true,`,
      `        onCheckedChange = { },`,
      `        label = "Wash preference",`,
      `    )`,
    )
  }

  if (/\btoggle\b/.test(html)) {
    imports.add(`import ${WASH_COMPOSE}.primitives.WashToggle`)
    lines.push(
      `    WashToggle(`,
      `        checked = true,`,
      `        onCheckedChange = { },`,
      `        label = "Enabled",`,
      `    )`,
    )
  }

  if (/\binput\b/.test(html) && !/\bcheckbox\b/.test(html) && !/\bradio\b/.test(html)) {
    imports.add(`import ${WASH_COMPOSE}.primitives.WashInput`)
    lines.push(
      `    WashInput(`,
      `        value = "",`,
      `        onValueChange = { },`,
      `        label = "Name",`,
      `        placeholder = "Enter value",`,
      `    )`,
    )
  }

  if (/\btextarea\b/.test(html)) {
    imports.add(`import ${WASH_COMPOSE}.primitives.WashTextarea`)
    lines.push(
      `    WashTextarea(`,
      `        value = "",`,
      `        onValueChange = { },`,
      `        label = "Notes",`,
      `    )`,
    )
  }

  if (/\bselect\b/.test(html)) {
    imports.add(`import ${WASH_COMPOSE}.primitives.WashSelect`)
    imports.add(`import ${WASH_COMPOSE}.primitives.WashSelectOption`)
    lines.push(
      `    WashSelect(`,
      `        value = "mineral",`,
      `        onValueChange = { },`,
      `        options = listOf(`,
      `            WashSelectOption("mineral", "Mineral"),`,
      `            WashSelectOption("cerulean", "Cerulean"),`,
      `        ),`,
      `        label = "Pigment",`,
      `    )`,
    )
  }

  if (/\bmodal\b|\bdialog\b/.test(html)) {
    imports.add(`import ${WASH_COMPOSE}.primitives.WashDialog`)
    imports.add(`import ${WASH_COMPOSE}.primitives.WashButton`)
    imports.add(`import ${WASH_COMPOSE}.primitives.WashButtonVariant`)
    lines.push(
      `    WashDialog(`,
      `        open = true,`,
      `        onClose = { },`,
      `        title = "Wash dialog",`,
      `        actions = {`,
      `            WashButton(onClick = { }, text = "Close", variant = WashButtonVariant.Ghost)`,
      `        },`,
      `    )`,
    )
  }

  if (/\balert\b/.test(html)) {
    imports.add(`import ${WASH_COMPOSE}.primitives.WashPanel`)
    imports.add(`import androidx.compose.material3.Text`)
    lines.push(
      `    WashPanel {`,
      `        Text("Wash alert / status panel")`,
      `    }`,
    )
  }

  if (/\bcard\b/.test(html)) {
    imports.add(`import ${WASH_COMPOSE}.components.WashCard`)
    imports.add(`import ${WASH_COMPOSE}.components.WashCardBody`)
    imports.add(`import ${WASH_COMPOSE}.components.WashCardTitle`)
    imports.add(`import androidx.compose.material3.Text`)
    lines.push(
      `    WashCard {`,
      `        WashCardBody {`,
      `            WashCardTitle(text = "Wash card")`,
      `            Text("Compose card body")`,
      `        }`,
      `    }`,
    )
  }

  if (/\btabs\b|\btab\b/.test(html)) {
    imports.add(`import ${WASH_COMPOSE}.components.WashTabs`)
    imports.add(`import ${WASH_COMPOSE}.components.WashTab`)
    imports.add(`import androidx.compose.material3.Text`)
    lines.push(
      `    WashTabs(defaultValue = "preview") {`,
      `        WashTab(value = "preview") { Text("Preview") }`,
      `        WashTab(value = "code") { Text("Code") }`,
      `    }`,
    )
  }

  if (/\bcollapse\b|\baccordion\b/.test(html)) {
    imports.add(`import ${WASH_COMPOSE}.components.WashAccordion`)
    imports.add(`import ${WASH_COMPOSE}.components.WashAccordionItem`)
    imports.add(`import androidx.compose.material3.Text`)
    lines.push(
      `    WashAccordion {`,
      `        WashAccordionItem(title = "Section") {`,
      `            Text("Accordion body")`,
      `        }`,
      `    }`,
    )
  }

  if (/\bloading\b|\bspinner\b|\bradial-progress\b/.test(html)) {
    imports.add(`import ${WASH_COMPOSE}.primitives.WashLoading`)
    lines.push(`    WashLoading()`)
  }

  if (/\btoast\b|\bsnackbar\b/.test(html)) {
    imports.add(`import ${WASH_COMPOSE}.primitives.WashToastProvider`)
    imports.add(`import ${WASH_COMPOSE}.primitives.rememberWashToastState`)
    imports.add(`import ${WASH_COMPOSE}.primitives.WashToastTone`)
    imports.add(`import ${WASH_COMPOSE}.primitives.WashButton`)
    lines.push(
      `    WashToastProvider {`,
      `        val toast = rememberWashToastState()`,
      `        WashButton(`,
      `            onClick = { toast.push("Saved", WashToastTone.Success) },`,
      `            text = "Show toast",`,
      `        )`,
      `    }`,
    )
  }

  if (/\bdrawer\b/.test(html)) {
    imports.add(`import ${WASH_COMPOSE}.primitives.WashModalDrawer`)
    imports.add(`import androidx.compose.material3.Text`)
    lines.push(
      `    WashModalDrawer(`,
      `        open = true,`,
      `        onDismiss = { },`,
      `        drawerContent = { Text("Drawer content") },`,
      `    ) {`,
      `        Text("Main content")`,
      `    }`,
    )
  }

  if (/\btooltip\b/.test(html)) {
    imports.add(`import ${WASH_COMPOSE}.primitives.WashTooltip`)
    imports.add(`import ${WASH_COMPOSE}.primitives.WashButton`)
    lines.push(
      `    WashTooltip(tip = "Copy code") {`,
      `        WashButton(onClick = { }, text = "Action")`,
      `    }`,
    )
  }

  if (lines.length === 0) {
    imports.add(`import ${WASH_COMPOSE}.primitives.WashPanel`)
    imports.add(`import androidx.compose.material3.Text`)
    lines.push(
      `    WashPanel {`,
      `        Text("Mirror this gallery in menzies-design-wash-compose")`,
      `    }`,
    )
  }

  return {
    imports: [...imports].sort(),
    body: lines.join('\n'),
  }
}

function toKotlinSnippet(html: string): string {
  const body = stripLeadingBlank(html)
  if (hasImportHeader(body) && /^package\s|^import\s/m.test(body)) return body

  const { imports, body: composeBody } = detectKotlin(body)
  return `${imports.join('\n')}

@Composable
fun ShowcaseExample() {
  WashProvider(
      defaultPigment = WashPigment.mineral,
      defaultMode = WashMode.Light,
  ) {
${composeBody}
  }
}`
}

/**
 * Build the four language snippets for a showcase.
 * Optional svelte/kotlin override hand-authored samples; otherwise derived from html.
 */
export function buildShowcaseCode(input: {
  html: string
  jsx: string
  svelte?: string
  kotlin?: string
}): ShowcaseCodeSet {
  if (isConfigSnippet(input.html) && isConfigSnippet(input.jsx)) {
    const body = stripLeadingBlank(input.html)
    return {
      html: body,
      jsx: stripLeadingBlank(input.jsx),
      svelte: input.svelte
        ? wrapDaisyAsSvelte(stripLeadingBlank(input.svelte))
        : wrapDaisyAsSvelte(body),
      kotlin: input.kotlin ? stripLeadingBlank(input.kotlin) : body,
    }
  }

  const html = withHtmlImports(input.html)
  const jsx = withJsxImports(input.jsx)
  const svelte = input.svelte
    ? wrapDaisyAsSvelte(expandToDaisyUiMarkup(stripLeadingBlank(input.svelte), 'html'))
    : toSvelteSnippet(input.html)
  const kotlin = input.kotlin
    ? stripLeadingBlank(input.kotlin)
    : toKotlinSnippet(input.html)

  return { html, jsx, svelte, kotlin }
}
