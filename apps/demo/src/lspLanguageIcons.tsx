import type { ComponentType, SVGProps } from 'react'
import type { LanguageId } from '#plain/editors'
import { FileText } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import {
  Html5,
  Svelte,
  TypeScript,
  Vue,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons/brands'
import { BrandIcon } from '@menzies-mariesta-com/menzies-design-wash-ui/icons/brands/catalog'

type NavIcon = ComponentType<{ className?: string; strokeWidth?: number }>

/** Simple Icons slug → Wash BrandIcon, sized like Lucide nav glyphs via className. */
function brand(slug: string): NavIcon {
  function BrandNavIcon(props: SVGProps<SVGSVGElement>) {
    return <BrandIcon slug={slug} {...props} />
  }
  BrandNavIcon.displayName = `BrandNavIcon(${slug})`
  return BrandNavIcon
}

/** Sidebar icons for each CodeEditor language pack (LSP drawer children). */
export const lspLanguageIcons: Record<LanguageId, NavIcon> = {
  typescript: TypeScript,
  javascript: brand('javascript'),
  json: brand('json'),
  css: brand('css'),
  html: Html5,
  markdown: brand('markdown'),
  plaintext: FileText,
  yaml: brand('yaml'),
  toml: brand('toml'),
  xml: brand('xml'),
  sql: brand('mysql'),
  graphql: brand('graphql'),
  shell: brand('gnubash'),
  python: brand('python'),
  go: brand('go'),
  rust: brand('rust'),
  java: brand('openjdk'),
  c: brand('c'),
  cpp: brand('cplusplus'),
  kotlin: brand('kotlin'),
  svelte: Svelte,
  vue: Vue,
}
