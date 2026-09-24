import type { ShowcaseSvelteFile } from '../../../components/showcaseTypes'
import { kitFiles } from '../../../components/kitFiles'
import dataTableSvelte from './DataTableShell.svelte?raw'
import dataTablePage from './+page.svelte?raw'

export const dataTableSvelteFiles: ShowcaseSvelteFile[] = kitFiles([
  { name: 'DataTableShell.svelte', code: dataTableSvelte },
  { name: '+page.svelte', code: dataTablePage },
])

/** Full CRUD ledger chrome matching DataTablePage preview (3 sample rows). */
export const dataTableHtml = `<div class="wash-table-chrome border-base-300 rounded-box flex h-[360px] min-h-0 flex-col overflow-hidden border bg-base-100 shadow-sm transition-[box-shadow,transform,background-color,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md focus-within:-translate-y-0.5 focus-within:border-primary/40 focus-within:bg-primary/5 focus-within:shadow-md">
  <div class="flex shrink-0 items-start justify-between gap-3 border-b border-base-300 px-3 py-2.5">
    <div class="min-w-0 flex-1">
      <h2 class="text-base font-bold leading-tight">Studio plates</h2>
      <p class="mt-0.5 text-xs text-ink-muted">Plate ledger for wash studio work</p>
    </div>
    <div class="flex shrink-0 flex-wrap items-center justify-end gap-0.5">
      <div class="dropdown dropdown-end dropdown-bottom dropdown-no-hover wash-dropdown-contained">
        <div class="tooltip tooltip-secondary" data-tip="Export">
          <div tabindex="0" role="button" class="btn btn-ghost btn-square btn-sm btn-secondary cursor-pointer" aria-label="Export" aria-haspopup="menu">↓</div>
        </div>
        <ul tabindex="-1" role="menu" class="dropdown-content menu z-50 mt-1 w-40 rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]">
          <li role="none"><button type="button" role="menuitem" class="cursor-pointer">Excel</button></li>
          <li role="none"><button type="button" role="menuitem" class="cursor-pointer">CSV</button></li>
          <li role="none"><button type="button" role="menuitem" class="cursor-pointer">ODS</button></li>
        </ul>
      </div>
      <div class="tooltip tooltip-secondary" data-tip="Refresh">
        <button type="button" class="btn btn-ghost btn-square btn-sm btn-secondary cursor-pointer" aria-label="Refresh">↻</button>
      </div>
      <div class="tooltip tooltip-primary" data-tip="Add">
        <button type="button" class="btn btn-ghost btn-square btn-sm btn-primary cursor-pointer" aria-label="Add">+</button>
      </div>
    </div>
  </div>
  <div class="min-h-0 flex-1 overflow-auto">
    <table class="table table-zebra w-full">
      <thead class="bg-base-100 sticky top-0 z-10">
        <tr>
          <th>Actions</th>
          <th>No</th>
          <th>Name</th>
          <th>Tags</th>
          <th>Status</th>
          <th>Created</th>
          <th>Updated</th>
          <th>Series</th>
          <th>Washes</th>
        </tr>
        <tr class="font-normal">
          <th aria-hidden="true"></th>
          <th aria-hidden="true"></th>
          <th><input type="text" class="input input-xs input-bordered w-full max-w-[10rem] cursor-text" placeholder="Filter…" aria-label="Filter by name" /></th>
          <th><input type="text" class="input input-xs input-bordered w-full max-w-[8rem] cursor-text" placeholder="Filter…" aria-label="Filter by tags" /></th>
          <th>
            <select class="select select-xs select-bordered w-full max-w-[7rem] cursor-pointer" aria-label="Filter by status">
              <option value="">All</option>
              <option>Draft</option>
              <option>In wash</option>
              <option>Review</option>
              <option>Archived</option>
            </select>
          </th>
          <th>
            <button type="button" class="btn btn-ghost btn-xs h-7 min-h-7 w-full max-w-[9.5rem] cursor-pointer justify-start border border-base-300 px-2 font-normal">Any dates</button>
          </th>
          <th>
            <button type="button" class="btn btn-ghost btn-xs h-7 min-h-7 w-full max-w-[9.5rem] cursor-pointer justify-start border border-base-300 px-2 font-normal">Any dates</button>
          </th>
          <th aria-hidden="true"></th>
          <th aria-hidden="true"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="flex items-center gap-0.5">
              <div class="tooltip tooltip-primary tooltip-right" data-tip="View"><button type="button" class="btn btn-ghost btn-square btn-xs btn-primary cursor-pointer" aria-label="View">View</button></div>
              <div class="tooltip tooltip-secondary tooltip-right" data-tip="Edit"><button type="button" class="btn btn-ghost btn-square btn-xs btn-secondary cursor-pointer" aria-label="Edit">Edit</button></div>
              <div class="tooltip tooltip-error tooltip-right" data-tip="Delete"><button type="button" class="btn btn-ghost btn-square btn-xs btn-error cursor-pointer" aria-label="Delete">Delete</button></div>
            </div>
          </td>
          <td>1</td>
          <td class="font-medium">Coastal fog plate</td>
          <td><span class="badge badge-ghost badge-sm">coastal</span> <span class="badge badge-ghost badge-sm">mist</span></td>
          <td><span class="badge badge-soft badge-primary">Review</span></td>
          <td class="whitespace-nowrap text-sm text-ink-muted">Aug 4, 10:18</td>
          <td class="whitespace-nowrap text-sm text-ink-muted">Aug 21, 09:14</td>
          <td>Atlantic Studies</td>
          <td>7</td>
        </tr>
        <tr>
          <td>
            <div class="flex items-center gap-0.5">
              <div class="tooltip tooltip-primary tooltip-right" data-tip="View"><button type="button" class="btn btn-ghost btn-square btn-xs btn-primary cursor-pointer" aria-label="View">View</button></div>
              <div class="tooltip tooltip-secondary tooltip-right" data-tip="Edit"><button type="button" class="btn btn-ghost btn-square btn-xs btn-secondary cursor-pointer" aria-label="Edit">Edit</button></div>
              <div class="tooltip tooltip-error tooltip-right" data-tip="Delete"><button type="button" class="btn btn-ghost btn-square btn-xs btn-error cursor-pointer" aria-label="Delete">Delete</button></div>
            </div>
          </td>
          <td>2</td>
          <td class="font-medium">Ochre cliff margin</td>
          <td><span class="badge badge-ghost badge-sm">mineral</span> <span class="badge badge-ghost badge-sm">earth</span></td>
          <td><span class="badge badge-soft badge-warning">In wash</span></td>
          <td class="whitespace-nowrap text-sm text-ink-muted">Aug 2, 14:05</td>
          <td class="whitespace-nowrap text-sm text-ink-muted">Aug 20, 16:42</td>
          <td>Mineral Notes</td>
          <td>4</td>
        </tr>
        <tr>
          <td>
            <div class="flex items-center gap-0.5">
              <div class="tooltip tooltip-primary tooltip-right" data-tip="View"><button type="button" class="btn btn-ghost btn-square btn-xs btn-primary cursor-pointer" aria-label="View">View</button></div>
              <div class="tooltip tooltip-secondary tooltip-right" data-tip="Edit"><button type="button" class="btn btn-ghost btn-square btn-xs btn-secondary cursor-pointer" aria-label="Edit">Edit</button></div>
              <div class="tooltip tooltip-error tooltip-right" data-tip="Delete"><button type="button" class="btn btn-ghost btn-square btn-xs btn-error cursor-pointer" aria-label="Delete">Delete</button></div>
            </div>
          </td>
          <td>3</td>
          <td class="font-medium">Rose field bloom</td>
          <td><span class="badge badge-ghost badge-sm">botanical</span> <span class="badge badge-ghost badge-sm">rose</span></td>
          <td><span class="badge badge-soft badge-primary">Review</span></td>
          <td class="whitespace-nowrap text-sm text-ink-muted">Jul 28, 11:40</td>
          <td class="whitespace-nowrap text-sm text-ink-muted">Aug 19, 11:05</td>
          <td>Botanical Index</td>
          <td>9</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-t border-base-300 px-3 py-2 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
    <label class="flex min-w-0 items-center gap-1.5 justify-self-start text-xs text-ink-muted">
      <span>Per page</span>
      <select class="select select-sm select-bordered cursor-pointer" aria-label="Rows per page">
        <option selected>auto</option>
        <option>5</option>
        <option>10</option>
        <option>25</option>
        <option>50</option>
      </select>
    </label>
    <p class="hidden justify-self-center text-center font-mono text-xs text-ink-muted sm:block">Showing 1-5 of 12</p>
    <div class="join col-start-2 justify-self-end sm:col-start-3">
      <button type="button" class="btn btn-sm join-item btn-active cursor-pointer">1</button>
      <button type="button" class="btn btn-sm join-item cursor-pointer">2</button>
    </div>
  </div>
  <div class="flex justify-center gap-3 border-t border-base-300 px-3 pb-2 pt-3">
    <span class="inline-flex items-center gap-1.5 text-xs text-ink-muted"><span class="size-2.5 rounded-sm bg-base-300" aria-hidden="true"></span>Tags</span>
    <span class="inline-flex items-center gap-1.5 text-xs text-ink-muted"><span class="size-2.5 rounded-sm bg-primary" aria-hidden="true"></span>Status</span>
  </div>
</div>`

export const dataTableJsx = dataTableHtml
  .replace(/class=/g, 'className=')
  .replace(
    '<select className="select select-sm select-bordered cursor-pointer" aria-label="Rows per page">\n          <option selected>auto</option>',
    '<select className="select select-sm select-bordered cursor-pointer" aria-label="Rows per page" defaultValue="auto">\n          <option>auto</option>',
  )

export const dataTableEmptyHtml = dataTableHtml
  .replace(
    /<tbody>[\s\S]*?<\/tbody>/,
    `<tbody>
        <tr>
          <td colspan="9" class="py-10 text-center text-sm text-ink-muted">No plates match these filters.</td>
        </tr>
      </tbody>`,
  )
  .replace('h-[360px]', 'h-[280px]')
  .replace('Showing 1-5 of 12', 'Showing 0-0 of 0')

export const dataTableEmptyJsx = dataTableEmptyHtml
  .replace(/class=/g, 'className=')
  .replace(
    '<select className="select select-sm select-bordered cursor-pointer" aria-label="Rows per page">\n          <option selected>auto</option>',
    '<select className="select select-sm select-bordered cursor-pointer" aria-label="Rows per page" defaultValue="auto">\n          <option>auto</option>',
  )

export const dataTableMiniHtml = `<div class="overflow-x-auto">
  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>Updated</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="font-medium">Coastal fog plate</td>
        <td><span class="badge badge-soft badge-primary">Review</span></td>
        <td class="whitespace-nowrap text-sm text-ink-muted">Aug 21, 09:14</td>
      </tr>
      <tr>
        <td class="font-medium">Ochre cliff margin</td>
        <td><span class="badge badge-soft badge-warning">In wash</span></td>
        <td class="whitespace-nowrap text-sm text-ink-muted">Aug 20, 16:42</td>
      </tr>
      <tr>
        <td class="font-medium">Rose field bloom</td>
        <td><span class="badge badge-soft badge-primary">Review</span></td>
        <td class="whitespace-nowrap text-sm text-ink-muted">Aug 19, 11:05</td>
      </tr>
    </tbody>
  </table>
</div>`

export const dataTableMiniJsx = dataTableMiniHtml.replace(/class=/g, 'className=')

export const dataTableMiniBorderedHtml = `<div class="wash-table-chrome overflow-x-auto rounded-box border border-base-content/10 bg-base-100 shadow-sm transition-[box-shadow,transform,background-color,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md">
  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>Updated</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="font-medium">Coastal fog plate</td>
        <td><span class="badge badge-soft badge-primary">Review</span></td>
        <td class="whitespace-nowrap text-sm text-ink-muted">Aug 21, 09:14</td>
      </tr>
      <tr>
        <td class="font-medium">Ochre cliff margin</td>
        <td><span class="badge badge-soft badge-warning">In wash</span></td>
        <td class="whitespace-nowrap text-sm text-ink-muted">Aug 20, 16:42</td>
      </tr>
      <tr>
        <td class="font-medium">Rose field bloom</td>
        <td><span class="badge badge-soft badge-primary">Review</span></td>
        <td class="whitespace-nowrap text-sm text-ink-muted">Aug 19, 11:05</td>
      </tr>
    </tbody>
  </table>
</div>`

export const dataTableMiniBorderedJsx = dataTableMiniBorderedHtml.replace(/class=/g, 'className=')

export const dataTableMiniZebraHtml = `<div class="overflow-x-auto">
  <table class="table table-sm table-zebra">
    <thead>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>Updated</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="font-medium">Coastal fog plate</td>
        <td><span class="badge badge-soft badge-primary">Review</span></td>
        <td class="whitespace-nowrap text-sm text-ink-muted">Aug 21, 09:14</td>
      </tr>
      <tr>
        <td class="font-medium">Ochre cliff margin</td>
        <td><span class="badge badge-soft badge-warning">In wash</span></td>
        <td class="whitespace-nowrap text-sm text-ink-muted">Aug 20, 16:42</td>
      </tr>
      <tr>
        <td class="font-medium">Rose field bloom</td>
        <td><span class="badge badge-soft badge-primary">Review</span></td>
        <td class="whitespace-nowrap text-sm text-ink-muted">Aug 19, 11:05</td>
      </tr>
    </tbody>
  </table>
</div>`

export const dataTableMiniZebraJsx = dataTableMiniZebraHtml.replace(/class=/g, 'className=')

export const dataTableLegendsHtml = `<div class="rounded-box overflow-hidden border border-base-300 bg-base-100">
  <div class="flex justify-center gap-3 px-3 pb-2 pt-3">
    <span class="inline-flex items-center gap-1.5 text-xs text-ink-muted"><span class="size-2.5 rounded-sm bg-base-300" aria-hidden="true"></span>Tags</span>
    <span class="inline-flex items-center gap-1.5 text-xs text-ink-muted"><span class="size-2.5 rounded-sm bg-primary" aria-hidden="true"></span>Status</span>
  </div>
  <p class="px-3 py-3 text-sm text-ink-muted">In this template, Tags and Status are marked. Other columns stay off the legends row.</p>
</div>`

export const dataTableLegendsJsx = dataTableLegendsHtml.replace(/class=/g, 'className=')

export const dataTableResponsiveHtml = dataTableHtml.replace('h-[360px]', 'h-[300px] max-w-full')
export const dataTableResponsiveJsx = dataTableResponsiveHtml
  .replace(/class=/g, 'className=')
  .replace(
    '<select className="select select-sm select-bordered cursor-pointer" aria-label="Rows per page">\n          <option selected>auto</option>',
    '<select className="select select-sm select-bordered cursor-pointer" aria-label="Rows per page" defaultValue="auto">\n          <option>auto</option>',
  )
