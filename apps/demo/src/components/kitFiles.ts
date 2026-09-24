import type { ShowcaseCodeLang, ShowcaseSvelteFile } from './showcaseTypes'

export type KitFileInput = {
  name: string
  code: string
  lang?: ShowcaseCodeLang
}

function langFromFileName(name: string): ShowcaseCodeLang {
  if (name.endsWith('.svelte')) return 'svelte'
  if (name.endsWith('.css')) return 'css'
  if (name.endsWith('.html') || name.endsWith('.htm')) return 'html'
  return 'tsx'
}

/**
 * Build a multi-file SvelteKit (or mixed) paste kit for ShowcaseTabs `svelteFiles`.
 * Pass Vite `?raw` imports as `code`.
 */
export function kitFiles(files: KitFileInput[]): ShowcaseSvelteFile[] {
  return files.map((file) => ({
    name: file.name,
    code: file.code.replace(/^\uFEFF/, ''),
    lang: file.lang ?? langFromFileName(file.name),
  }))
}
