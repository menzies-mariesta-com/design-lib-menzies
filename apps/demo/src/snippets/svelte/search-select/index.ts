import type { ShowcaseSvelteFile } from '../../../components/showcaseTypes'
import { kitFiles } from '../../../components/kitFiles'
import searchSelectSvelte from './SearchSelect.svelte?raw'
import searchSelectPage from './+page.svelte?raw'

/** Full SvelteKit kit for SearchSelect (copy both files). */
export const searchSelectSvelteFiles: ShowcaseSvelteFile[] = kitFiles([
  { name: 'SearchSelect.svelte', code: searchSelectSvelte },
  { name: '+page.svelte', code: searchSelectPage },
])
