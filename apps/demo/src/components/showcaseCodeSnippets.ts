/**
 * Shared preview-code helpers for ShowcaseTabs.
 * Gallery pages pass HTML + JSX; Svelte and Kotlin (and import headers) are derived here.
 */

export const WASH_PKG = '@menzies-mariesta-com/menzies-design-wash-ui'
export const WASH_COMPOSE = 'com.mariesta.menzies.washui'

const REACT_COMPONENTS = new Set([
  'Alert',
  'Button',
  'Card',
  'CardBody',
  'CardTitle',
  'Input',
  'WashPanel',
  'WashProvider',
  'Textarea',
  'Select',
  'Checkbox',
  'Toggle',
  'Badge',
  'Avatar',
  'Tooltip',
  'Dialog',
  'Drawer',
  'Tabs',
  'Tab',
  'Accordion',
  'AccordionItem',
])

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

function collectJsxImports(jsx: string): string[] {
  const lines: string[] = [`import '${WASH_PKG}/styles.css'`]

  const reactNames = new Set<string>()
  for (const name of REACT_COMPONENTS) {
    if (new RegExp(`<${name}\\b`).test(jsx)) reactNames.add(name)
  }
  if (reactNames.size > 0) {
    lines.push(
      `import { ${[...reactNames].sort().join(', ')} } from '${WASH_PKG}'`,
    )
  }

  const icons = new Set<string>()
  for (const match of jsx.matchAll(LUCIDE_ICON_TAG)) {
    icons.add(match[1]!)
  }
  // Drop names already treated as React components.
  for (const name of reactNames) icons.delete(name)
  if (icons.size > 0) {
    lines.push(
      `import { ${[...icons].sort().join(', ')} } from '${WASH_PKG}/icons'`,
    )
  }

  const brands = new Set<string>()
  for (const match of jsx.matchAll(WASH_BRAND_ICON_TAG)) {
    brands.add(match[1]!)
  }
  for (const name of reactNames) brands.delete(name)
  for (const name of icons) brands.delete(name)
  if (brands.size > 0) {
    lines.push(
      `import { ${[...brands].sort().join(', ')} } from '${WASH_PKG}/icons/brands'`,
    )
  }

  return lines
}

function withHtmlImports(html: string): string {
  const body = stripLeadingBlank(html)
  if (hasImportHeader(body)) return body
  return `<!-- Styles + core boot (once per page) -->
<link rel="stylesheet" href="/node_modules/${WASH_PKG}/dist/styles.css" />
<script type="module">
  import { initWash } from '${WASH_PKG}/core'
  initWash({ defaultPigment: 'mineral', defaultMode: 'light' })
</script>

${body}`
}

function withJsxImports(jsx: string): string {
  const body = stripLeadingBlank(jsx)
  if (hasImportHeader(body)) return body
  return `${collectJsxImports(body).join('\n')}

${body}`
}

function toSvelteSnippet(html: string): string {
  const body = stripLeadingBlank(html)
  if (hasImportHeader(body) && body.includes('<script')) return body

  // Prefer raw markup (class=) over JSX when generating Svelte.
  const markup = body
    .replace(/^<!-- Styles[\s\S]*?<\/script>\s*/m, '')
    .replace(/^<link\b[^>]*>\s*/gim, '')
    .trim()

  return `<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { initWash, type WashRuntime } from '${WASH_PKG}/core'
  import '${WASH_PKG}/styles.css'

  let wash: WashRuntime | undefined

  onMount(() => {
    wash = initWash({ defaultPigment: 'mineral', defaultMode: 'light' })
  })

  onDestroy(() => {
    wash?.destroy()
  })
</script>

${markup}`
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
      svelte: input.svelte ? stripLeadingBlank(input.svelte) : body,
      kotlin: input.kotlin ? stripLeadingBlank(input.kotlin) : body,
    }
  }

  const html = withHtmlImports(input.html)
  const jsx = withJsxImports(input.jsx)
  const svelte = input.svelte
    ? stripLeadingBlank(input.svelte)
    : toSvelteSnippet(input.html)
  const kotlin = input.kotlin
    ? stripLeadingBlank(input.kotlin)
    : toKotlinSnippet(input.html)

  return { html, jsx, svelte, kotlin }
}
