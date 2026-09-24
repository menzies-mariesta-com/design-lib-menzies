import type { ShowcaseSvelteFile } from '../../../../components/showcaseTypes'
import { kitFiles } from '../../../../components/kitFiles'
import auth from './AuthCard.svelte?raw'
import page from './+page.svelte?raw'

export const authSvelteFiles: ShowcaseSvelteFile[] = kitFiles([
  { name: 'AuthCard.svelte', code: auth },
  { name: '+page.svelte', code: page },
])

export const authHtml = `<div class="card mx-auto w-full max-w-md bg-base-100 shadow-[var(--shadow-paper-md)]">
  <form class="card-body gap-3">
    <h2 class="card-title text-primary font-bold">Sign in</h2>
    <label class="form-control w-full">
      <span class="label"><span class="label-text">Email<span class="text-error align-top text-sm" aria-hidden="true">*</span></span></span>
      <input class="input input-bordered w-full cursor-text" type="email" required />
    </label>
    <label class="form-control w-full">
      <span class="label"><span class="label-text">Password<span class="text-error align-top text-sm" aria-hidden="true">*</span></span></span>
      <input class="input input-bordered w-full cursor-text" type="password" required />
    </label>
    <button type="submit" class="btn btn-primary cursor-pointer">Continue</button>
  </form>
</div>`

export const authJsx = authHtml.replace(/class=/g, 'className=')
