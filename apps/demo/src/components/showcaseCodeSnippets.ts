/**
 * Shared preview-code helpers for ShowcaseTabs.
 * Gallery pages pass HTML + JSX; Svelte (and import headers) are derived here.
 * Copy tabs expand to daisyUI class markup only (no Wash / #plain component props).
 */

import { expandToDaisyUiMarkup } from './daisyUiPasteMarkup'

export const WASH_PKG = '@menzies-mariesta-com/menzies-design-wash-ui'
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

/**
 * Build the HTML / JSX / Svelte snippets for a showcase.
 * Optional svelte override for hand-authored samples; otherwise derived from html.
 */
export function buildShowcaseCode(input: {
  html: string
  jsx: string
  svelte?: string
}): ShowcaseCodeSet {
  if (isConfigSnippet(input.html) && isConfigSnippet(input.jsx)) {
    const body = stripLeadingBlank(input.html)
    return {
      html: body,
      jsx: stripLeadingBlank(input.jsx),
      svelte: input.svelte
        ? wrapDaisyAsSvelte(stripLeadingBlank(input.svelte))
        : wrapDaisyAsSvelte(body),
    }
  }

  const html = withHtmlImports(input.html)
  const jsx = withJsxImports(input.jsx)
  const svelte = input.svelte
    ? wrapDaisyAsSvelte(expandToDaisyUiMarkup(stripLeadingBlank(input.svelte), 'html'))
    : toSvelteSnippet(input.html)

  return { html, jsx, svelte }
}
