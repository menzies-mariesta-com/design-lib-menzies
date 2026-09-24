import type { ShowcaseSvelteFile } from '../../../components/showcaseTypes'
import { kitFiles } from '../../../components/kitFiles'
import washDialogSvelte from './WashDialog.svelte?raw'
import dialogPage from './+page.svelte?raw'

export const dialogSvelteFiles: ShowcaseSvelteFile[] = kitFiles([
  { name: 'WashDialog.svelte', code: washDialogSvelte },
  { name: '+page.svelte', code: dialogPage },
])

export const dialogConfirmHtml = `<div class="flex flex-wrap items-center gap-4">
  <button type="button" class="btn btn-error cursor-pointer">Delete plate</button>
</div>
<dialog class="modal" open>
  <div class="modal-box">
    <h3 class="card-title text-error font-bold">Delete plate</h3>
    <p class="py-2 text-sm text-base-content/70">This cannot be undone. The plate and its wash history will be removed.</p>
    <div class="py-2">
      <p class="text-sm">Plate <span class="font-mono text-xs">coastal-fog-12</span> is linked to 3 review comments.</p>
    </div>
    <div class="modal-action">
      <button type="button" class="btn cursor-pointer">Cancel</button>
      <button type="button" class="btn btn-error cursor-pointer">Delete</button>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button type="submit" class="cursor-pointer">close</button>
  </form>
</dialog>`

export const dialogConfirmJsx = dialogConfirmHtml.replace(/class=/g, 'className=')

export const dialogFormHtml = `<div class="flex flex-wrap items-center gap-4">
  <button type="button" class="btn btn-secondary cursor-pointer">Rename plate</button>
</div>
<dialog class="modal" open>
  <div class="modal-box">
    <h3 class="card-title text-secondary font-bold">Rename plate</h3>
    <p class="py-2 text-sm text-base-content/70">Update the studio label shown in the plate library.</p>
    <div class="py-2">
      <fieldset class="fieldset mt-2">
        <label class="label" for="dialog-plate-name">
          <span class="label-text">Plate name<span class="text-error align-top text-sm leading-none" aria-hidden="true">*</span></span>
        </label>
        <input id="dialog-plate-name" name="name" type="text" class="input w-full cursor-text" value="Coastal fog plate" required />
      </fieldset>
    </div>
    <div class="modal-action">
      <button type="button" class="btn btn-ghost cursor-pointer">Cancel</button>
      <button type="button" class="btn btn-secondary cursor-pointer">Save changes</button>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button type="submit" class="cursor-pointer">close</button>
  </form>
</dialog>`

export const dialogFormJsx = dialogFormHtml
  .replace(/class=/g, 'className=')
  .replace(/\bfor=/g, 'htmlFor=')
  .replace(' value="Coastal fog plate"', ' defaultValue="Coastal fog plate"')

export const dialogInfoHtml = `<div class="flex flex-wrap items-center gap-4">
  <button type="button" class="btn btn-primary cursor-pointer">Show notice</button>
</div>
<dialog class="modal" open>
  <div class="modal-box">
    <h3 class="card-title text-primary font-bold">Wash export ready</h3>
    <p class="py-2 text-sm text-base-content/70">Your pigment pack finished rendering.</p>
    <div class="py-2">
      <p class="text-sm">Download starts from the studio desk Downloads folder.</p>
    </div>
    <div class="modal-action">
      <button type="button" class="btn btn-primary cursor-pointer">OK</button>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button type="submit" class="cursor-pointer">close</button>
  </form>
</dialog>`

export const dialogInfoJsx = dialogInfoHtml.replace(/class=/g, 'className=')

/** Default paste for expandToDaisyUiMarkup / single-section consumers. */
export const dialogHtml = dialogConfirmHtml
export const dialogJsx = dialogConfirmJsx
