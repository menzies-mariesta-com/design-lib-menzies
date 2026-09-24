import type { ShowcaseSvelteFile } from '../../../components/showcaseTypes'
import { kitFiles } from '../../../components/kitFiles'
import selectSvelte from './Select.svelte?raw'
import selectPage from './+page.svelte?raw'

/** Full SvelteKit kit for Select (copy both files). */
export const selectSvelteFiles: ShowcaseSvelteFile[] = kitFiles([
  { name: 'Select.svelte', code: selectSvelte },
  { name: '+page.svelte', code: selectPage },
])
