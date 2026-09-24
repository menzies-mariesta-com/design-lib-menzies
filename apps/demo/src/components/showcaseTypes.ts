/** Shared showcase code-tab types (no Shiki dependency). */

export type ShowcaseCodeLang = 'html' | 'css' | 'tsx' | 'svelte' | 'kotlin'

/** Multi-file SvelteKit kit entry shown as CodeEditor titlebar tabs under Showcase Svelte. */
export type ShowcaseSvelteFile = {
  name: string
  code: string
  lang: ShowcaseCodeLang
}
