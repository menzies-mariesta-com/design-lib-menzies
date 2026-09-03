import { useMemo, useState, type ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { ChevronLeft, ChevronRight } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

function Section({
  eyebrow,
  title,
  description,
  children,
  panel = '',
}: {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
  panel?: string
}) {
  return (
    <article className={`wash-panel paper-grain soak-in ${panel}`}>
      <div className="border-b border-ink-border/70 px-5 py-4">
        <p className="label-ink">{eyebrow}</p>
        <h2 className="font-display text-xl font-semibold md:text-2xl">{title}</h2>
        <p className="mt-1 text-sm text-ink-muted">{description}</p>
      </div>
      <div className="p-5">{children}</div>
    </article>
  )
}

const sizes = [
  { name: 'XS', btn: 'btn-xs' },
  { name: 'SM', btn: 'btn-sm' },
  { name: 'MD', btn: 'btn-md' },
  { name: 'LG', btn: 'btn-lg' },
  { name: 'XL', btn: 'btn-xl' },
] as const

const plateItems = [
  'Cerulean wash study',
  'Ochre cliff notes',
  'Rose petal glaze',
  'Fog bank mist',
  'Indigo night sky',
  'Salt bloom trial',
  'Cedar bark texture',
  'Harbor dawn plate',
  'Winter lake edge',
  'Paper tooth check',
  'Ultramarine depth',
  'Warm earth lift',
] as const

const ledgerSeries = [
  { name: 'Harbor dawn', plates: 12, status: 'Active' },
  { name: 'Fog bank', plates: 8, status: 'Draft' },
  { name: 'Ochre cliff', plates: 15, status: 'Active' },
  { name: 'Rose bloom', plates: 6, status: 'Archived' },
  { name: 'Indigo night', plates: 11, status: 'Active' },
  { name: 'Salt bloom', plates: 4, status: 'Draft' },
  { name: 'Cedar bark', plates: 9, status: 'Active' },
  { name: 'Winter lake', plates: 7, status: 'Archived' },
  { name: 'Paper tooth', plates: 3, status: 'Draft' },
  { name: 'Ultramarine', plates: 14, status: 'Active' },
  { name: 'Warm earth', plates: 10, status: 'Active' },
  { name: 'Mist bank', plates: 5, status: 'Draft' },
  { name: 'Coastal glaze', plates: 13, status: 'Active' },
  { name: 'Petal wash', plates: 8, status: 'Archived' },
  { name: 'Studio light', plates: 2, status: 'Draft' },
] as const

function InteractiveList() {
  const pageSize = 4
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(plateItems.length / pageSize)
  const safePage = Math.min(Math.max(1, page), totalPages)
  const slice = plateItems.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  )
  const from = (safePage - 1) * pageSize + 1
  const to = Math.min(safePage * pageSize, plateItems.length)

  return (
    <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-col gap-4">
                      <ul className="divide-y divide-ink-border/60 rounded-box border border-ink-border/70 bg-base-100">
                        {slice.map((item, i) => (
                          <li
                            key={item}
                            className="flex items-center gap-3 px-4 py-3 text-sm"
                          >
                            <span className="label-ink w-6 tabular-nums">
                              {(safePage - 1) * pageSize + i + 1}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-xs text-ink-muted">
                          Showing {from}-{to} of {plateItems.length}
                        </p>
                        <div className="join">
                          <button
                            type="button"
                            className={`btn btn-sm join-item ${
                              safePage <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'
                            }`}
                            disabled={safePage <= 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            aria-label="Previous page"
                          >
                            «
                          </button>
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                            <button
                              key={n}
                              type="button"
                              className={`btn btn-sm join-item cursor-pointer ${
                                n === safePage ? 'btn-active' : ''
                              }`}
                              onClick={() => setPage(n)}
                              aria-current={n === safePage ? 'page' : undefined}
                            >
                              {n}
                            </button>
                          ))}
                          <button
                            type="button"
                            className={`btn btn-sm join-item ${
                              safePage >= totalPages
                                ? 'cursor-not-allowed'
                                : 'cursor-pointer'
                            }`}
                            disabled={safePage >= totalPages}
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            aria-label="Next page"
                          >
                            »
                          </button>
                        </div>
                      </div>
                    </div>
            
              </>
            }
            html={`<div class="flex flex-col gap-4">
        <ul class="divide-y divide-ink-border/60 rounded-box border border-ink-border/70 bg-base-100">
          {slice.map((item, i) => (
            <li
              key=
              class="flex items-center gap-3 px-4 py-3 text-sm"
            >
              <span class="label-ink w-6 tabular-nums">
                {(safePage - 1) * pageSize + i + 1}
              </span>
              <span></span>
            </li>
          ))}
        </ul>
        <div class="flex flex-wrap items-center justify-between gap-3">
          <p class="text-xs text-ink-muted">
            Showing - of 
          </p>
          <div class="join">
            <button
              type="button"
              class=
              disabled
              
              aria-label="Previous page"
            >
              «
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key=
                type="button"
                class=
                
                aria-current={n === safePage ? 'page' : undefined}
              >
                
              </button>
            ))}
            <button
              type="button"
              class=
              disabled
              
              aria-label="Next page"
            >
              »
            </button>
          </div>
        </div>
      </div>`}
            jsx={`<div className="flex flex-col gap-4">
        <ul className="divide-y divide-ink-border/60 rounded-box border border-ink-border/70 bg-base-100">
          {slice.map((item, i) => (
            <li
              key={item}
              className="flex items-center gap-3 px-4 py-3 text-sm"
            >
              <span className="label-ink w-6 tabular-nums">
                {(safePage - 1) * pageSize + i + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-ink-muted">
            Showing {from}-{to} of {plateItems.length}
          </p>
          <div className="join">
            <button
              type="button"
              className={\`btn btn-sm join-item \${
                safePage <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'
              }\`}
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              aria-label="Previous page"
            >
              «
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                className={\`btn btn-sm join-item cursor-pointer \${
                  n === safePage ? 'btn-active' : ''
                }\`}
                onClick={() => setPage(n)}
                aria-current={n === safePage ? 'page' : undefined}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              className={\`btn btn-sm join-item \${
                safePage >= totalPages
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer'
              }\`}
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              aria-label="Next page"
            >
              »
            </button>
          </div>
        </div>
      </div>`}
          />
  )
}

function StudioLedger() {
  const pageSize = 5
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(ledgerSeries.length / pageSize)
  const safePage = Math.min(Math.max(1, page), totalPages)
  const rows = useMemo(
    () =>
      ledgerSeries.slice(
        (safePage - 1) * pageSize,
        safePage * pageSize,
      ),
    [safePage],
  )
  const from = (safePage - 1) * pageSize + 1
  const to = Math.min(safePage * pageSize, ledgerSeries.length)

  return (
    <ShowcaseTabs
            preview={
              <>

              <div className="flex min-h-0 flex-col overflow-hidden rounded-box border border-ink-border/70 bg-base-100">
                      <div className="overflow-x-auto">
                        <table className="table table-zebra table-sm [&_tbody_tr]:hover:bg-primary/40">
                          <thead>
                            <tr>
                              <th scope="col">No</th>
                              <th scope="col">Series</th>
                              <th scope="col">Plates</th>
                              <th scope="col">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((row, i) => (
                              <tr key={row.name}>
                                <td className="tabular-nums">
                                  {(safePage - 1) * pageSize + i + 1}
                                </td>
                                <td>{row.name}</td>
                                <td className="tabular-nums">{row.plates}</td>
                                <td>
                                  <span
                                    className={`badge badge-sm ${
                                      row.status === 'Active'
                                        ? 'badge-success'
                                        : row.status === 'Draft'
                                          ? 'badge-warning'
                                          : 'badge-ghost'
                                    }`}
                                  >
                                    {row.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="border-base-300 flex shrink-0 flex-wrap items-center justify-between gap-2 border-t px-3 py-2">
                        <p className="text-xs text-ink-muted">
                          Showing {from}-{to} of {ledgerSeries.length}
                        </p>
                        <div className="join">
                          <button
                            type="button"
                            className={`btn btn-sm join-item ${
                              safePage <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'
                            }`}
                            disabled={safePage <= 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                          >
                            «
                          </button>
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                            <button
                              key={n}
                              type="button"
                              className={`btn btn-sm join-item cursor-pointer ${
                                n === safePage ? 'btn-active' : ''
                              }`}
                              onClick={() => setPage(n)}
                            >
                              {n}
                            </button>
                          ))}
                          <button
                            type="button"
                            className={`btn btn-sm join-item ${
                              safePage >= totalPages
                                ? 'cursor-not-allowed'
                                : 'cursor-pointer'
                            }`}
                            disabled={safePage >= totalPages}
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                          >
                            »
                          </button>
                        </div>
                      </div>
                    </div>
            
              </>
            }
            html={`<div class="flex min-h-0 flex-col overflow-hidden rounded-box border border-ink-border/70 bg-base-100">
        <div class="overflow-x-auto">
          <table class="table table-zebra table-sm [&_tbody_tr]:hover:bg-primary/40">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Series</th>
                <th scope="col">Plates</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key=>
                  <td class="tabular-nums">
                    {(safePage - 1) * pageSize + i + 1}
                  </td>
                  <td></td>
                  <td class="tabular-nums"></td>
                  <td>
                    <span
                      class=
                    >
                      
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class="border-base-300 flex shrink-0 flex-wrap items-center justify-between gap-2 border-t px-3 py-2">
          <p class="text-xs text-ink-muted">
            Showing - of 
          </p>
          <div class="join">
            <button
              type="button"
              class=
              disabled
              
            >
              «
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key=
                type="button"
                class=
                
              >
                
              </button>
            ))}
            <button
              type="button"
              class=
              disabled
              
            >
              »
            </button>
          </div>
        </div>
      </div>`}
            jsx={`<div className="flex min-h-0 flex-col overflow-hidden rounded-box border border-ink-border/70 bg-base-100">
        <div className="overflow-x-auto">
          <table className="table table-zebra table-sm [&_tbody_tr]:hover:bg-primary/40">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Series</th>
                <th scope="col">Plates</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.name}>
                  <td className="tabular-nums">
                    {(safePage - 1) * pageSize + i + 1}
                  </td>
                  <td>{row.name}</td>
                  <td className="tabular-nums">{row.plates}</td>
                  <td>
                    <span
                      className={\`badge badge-sm \${
                        row.status === 'Active'
                          ? 'badge-success'
                          : row.status === 'Draft'
                            ? 'badge-warning'
                            : 'badge-ghost'
                      }\`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-base-300 flex shrink-0 flex-wrap items-center justify-between gap-2 border-t px-3 py-2">
          <p className="text-xs text-ink-muted">
            Showing {from}-{to} of {ledgerSeries.length}
          </p>
          <div className="join">
            <button
              type="button"
              className={\`btn btn-sm join-item \${
                safePage <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'
              }\`}
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              «
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                className={\`btn btn-sm join-item cursor-pointer \${
                  n === safePage ? 'btn-active' : ''
                }\`}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              className={\`btn btn-sm join-item \${
                safePage >= totalPages
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer'
              }\`}
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              »
            </button>
          </div>
        </div>
      </div>`}
          />
  )
}

function CompactResponsive() {
  const [page, setPage] = useState(2)
  const totalPages = 8

  return (
    <div className="flex flex-col gap-5">
      <ShowcaseTabs
            preview={
              <>

              <div className="join sm:hidden">
                        <button
                          type="button"
                          className={`btn btn-sm join-item ${
                            page <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'
                          }`}
                          disabled={page <= 1}
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          aria-label="Previous page"
                        >
                          «
                        </button>
                        <button type="button" className="btn btn-sm join-item cursor-default">
                          Page {page}
                        </button>
                        <button
                          type="button"
                          className={`btn btn-sm join-item ${
                            page >= totalPages ? 'cursor-not-allowed' : 'cursor-pointer'
                          }`}
                          disabled={page >= totalPages}
                          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                          aria-label="Next page"
                        >
                          »
                        </button>
                      </div>
                      <div className="join hidden flex-wrap sm:flex">
                        <button
                          type="button"
                          className={`btn btn-sm join-item ${
                            page <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'
                          }`}
                          disabled={page <= 1}
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          aria-label="Previous page"
                        >
                          «
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                          <button
                            key={n}
                            type="button"
                            className={`btn btn-sm join-item cursor-pointer ${
                              n === page ? 'btn-active' : ''
                            }`}
                            onClick={() => setPage(n)}
                          >
                            {n}
                          </button>
                        ))}
                        <button
                          type="button"
                          className={`btn btn-sm join-item ${
                            page >= totalPages ? 'cursor-not-allowed' : 'cursor-pointer'
                          }`}
                          disabled={page >= totalPages}
                          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                          aria-label="Next page"
                        >
                          »
                        </button>
                      </div>
            
              </>
            }
            html={`<div class="join sm:hidden">
          <button
            type="button"
            class=
            disabled
            
            aria-label="Previous page"
          >
            «
          </button>
          <button type="button" class="btn btn-sm join-item cursor-default">
            Page 
          </button>
          <button
            type="button"
            class=
            disabled
            
            aria-label="Next page"
          >
            »
          </button>
        </div>
        <div class="join hidden flex-wrap sm:flex">
          <button
            type="button"
            class=
            disabled
            
            aria-label="Previous page"
          >
            «
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key=
              type="button"
              class=
              
            >
              
            </button>
          ))}
          <button
            type="button"
            class=
            disabled
            
            aria-label="Next page"
          >
            »
          </button>
        </div>`}
            jsx={`<div className="join sm:hidden">
          <button
            type="button"
            className={\`btn btn-sm join-item \${
              page <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'
            }\`}
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            aria-label="Previous page"
          >
            «
          </button>
          <button type="button" className="btn btn-sm join-item cursor-default">
            Page {page}
          </button>
          <button
            type="button"
            className={\`btn btn-sm join-item \${
              page >= totalPages ? 'cursor-not-allowed' : 'cursor-pointer'
            }\`}
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            aria-label="Next page"
          >
            »
          </button>
        </div>
        <div className="join hidden flex-wrap sm:flex">
          <button
            type="button"
            className={\`btn btn-sm join-item \${
              page <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'
            }\`}
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            aria-label="Previous page"
          >
            «
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              className={\`btn btn-sm join-item cursor-pointer \${
                n === page ? 'btn-active' : ''
              }\`}
              onClick={() => setPage(n)}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            className={\`btn btn-sm join-item \${
              page >= totalPages ? 'cursor-not-allowed' : 'cursor-pointer'
            }\`}
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            aria-label="Next page"
          >
            »
          </button>
        </div>`}
          />

      <ShowcaseTabs
            preview={
              <>

              <div className="join grid max-w-md grid-cols-2">
                        <button
                          type="button"
                          className={`btn btn-outline join-item ${
                            page <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'
                          }`}
                          disabled={page <= 1}
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                        >
                          Previous page
                        </button>
                        <button
                          type="button"
                          className={`btn btn-outline join-item ${
                            page >= totalPages ? 'cursor-not-allowed' : 'cursor-pointer'
                          }`}
                          disabled={page >= totalPages}
                          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        >
                          Next
                        </button>
                      </div>
            
              </>
            }
            html={`<div class="join grid max-w-md grid-cols-2">
          <button
            type="button"
            class=
            disabled
            
          >
            Previous page
          </button>
          <button
            type="button"
            class=
            disabled
            
          >
            Next
          </button>
        </div>`}
            jsx={`<div className="join grid max-w-md grid-cols-2">
          <button
            type="button"
            className={\`btn btn-outline join-item \${
              page <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'
            }\`}
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous page
          </button>
          <button
            type="button"
            className={\`btn btn-outline join-item \${
              page >= totalPages ? 'cursor-not-allowed' : 'cursor-pointer'
            }\`}
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>`}
          />
    </div>
  )
}

export default function PaginationPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Pagination
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">join</span> pagination via join button groups: numbered pages, prev/next, sizes, and ledger.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Numbered join"
          description="Group page buttons with join and join-item"
        >
          <div className="flex flex-col gap-5">
            <ShowcaseTabs
            preview={
              <>

              <div className="join">
                              <button type="button" className="btn join-item cursor-pointer">
                                1
                              </button>
                              <button
                                type="button"
                                className="btn join-item btn-active cursor-pointer"
                              >
                                2
                              </button>
                              <button type="button" className="btn join-item cursor-pointer">
                                3
                              </button>
                              <button type="button" className="btn join-item cursor-pointer">
                                4
                              </button>
                            </div>
            
              </>
            }
            html={`<div class="join">
                <button type="button" class="btn join-item cursor-pointer">
                  1
                </button>
                <button
                  type="button"
                  class="btn join-item btn-active cursor-pointer"
                >
                  2
                </button>
                <button type="button" class="btn join-item cursor-pointer">
                  3
                </button>
                <button type="button" class="btn join-item cursor-pointer">
                  4
                </button>
              </div>`}
            jsx={`<div className="join">
                <button type="button" className="btn join-item cursor-pointer">
                  1
                </button>
                <button
                  type="button"
                  className="btn join-item btn-active cursor-pointer"
                >
                  2
                </button>
                <button type="button" className="btn join-item cursor-pointer">
                  3
                </button>
                <button type="button" className="btn join-item cursor-pointer">
                  4
                </button>
              </div>`}
          />

            <ShowcaseTabs
            preview={
              <>

              <div className="join">
                              <input
                                className="btn btn-square join-item cursor-pointer"
                                type="radio"
                                name="pag-radio-basic"
                                aria-label="1"
                                defaultChecked
                              />
                              <input
                                className="btn btn-square join-item cursor-pointer"
                                type="radio"
                                name="pag-radio-basic"
                                aria-label="2"
                              />
                              <input
                                className="btn btn-square join-item cursor-pointer"
                                type="radio"
                                name="pag-radio-basic"
                                aria-label="3"
                              />
                              <input
                                className="btn btn-square join-item cursor-pointer"
                                type="radio"
                                name="pag-radio-basic"
                                aria-label="4"
                              />
                            </div>
            
              </>
            }
            html={`<div class="join">
                <input
                  class="btn btn-square join-item cursor-pointer"
                  type="radio"
                  name="pag-radio-basic"
                  aria-label="1"
                  checked />
                <input
                  class="btn btn-square join-item cursor-pointer"
                  type="radio"
                  name="pag-radio-basic"
                  aria-label="2" />
                <input
                  class="btn btn-square join-item cursor-pointer"
                  type="radio"
                  name="pag-radio-basic"
                  aria-label="3" />
                <input
                  class="btn btn-square join-item cursor-pointer"
                  type="radio"
                  name="pag-radio-basic"
                  aria-label="4" />
              </div>`}
            jsx={`<div className="join">
                <input
                  className="btn btn-square join-item cursor-pointer"
                  type="radio"
                  name="pag-radio-basic"
                  aria-label="1"
                  defaultChecked
                />
                <input
                  className="btn btn-square join-item cursor-pointer"
                  type="radio"
                  name="pag-radio-basic"
                  aria-label="2"
                />
                <input
                  className="btn btn-square join-item cursor-pointer"
                  type="radio"
                  name="pag-radio-basic"
                  aria-label="3"
                />
                <input
                  className="btn btn-square join-item cursor-pointer"
                  type="radio"
                  name="pag-radio-basic"
                  aria-label="4"
                />
              </div>`}
          />
          </div>
        </Section>

        <Section
          eyebrow="02 · Prev / next"
          title="Chevrons and labels"
          description="Icon-only controls need matching tooltips, aria-labels"
          panel="wash-panel-ochre"
        >
          <div className="flex flex-col gap-5">
            <ShowcaseTabs
            preview={
              <>

              <div className="join">
                              <button
                                type="button"
                                className="btn join-item tooltip cursor-pointer"
                                data-tip="Previous"
                                aria-label="Previous"
                              >
                                <ChevronLeft className="size-4" strokeWidth={2} />
                              </button>
                              <button
                                type="button"
                                className="btn join-item btn-active cursor-pointer"
                              >
                                2
                              </button>
                              <button
                                type="button"
                                className="btn join-item tooltip cursor-pointer"
                                data-tip="Next"
                                aria-label="Next"
                              >
                                <ChevronRight className="size-4" strokeWidth={2} />
                              </button>
                            </div>
            
              </>
            }
            html={`<div class="join">
                <button
                  type="button"
                  class="btn join-item tooltip cursor-pointer"
                  data-tip="Previous"
                  aria-label="Previous"
                >
                  <!-- ChevronLeft -->
                </button>
                <button
                  type="button"
                  class="btn join-item btn-active cursor-pointer"
                >
                  2
                </button>
                <button
                  type="button"
                  class="btn join-item tooltip cursor-pointer"
                  data-tip="Next"
                  aria-label="Next"
                >
                  <!-- ChevronRight -->
                </button>
              </div>`}
            jsx={`<div className="join">
                <button
                  type="button"
                  className="btn join-item tooltip cursor-pointer"
                  data-tip="Previous"
                  aria-label="Previous"
                >
                  <ChevronLeft className="size-4" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  className="btn join-item btn-active cursor-pointer"
                >
                  2
                </button>
                <button
                  type="button"
                  className="btn join-item tooltip cursor-pointer"
                  data-tip="Next"
                  aria-label="Next"
                >
                  <ChevronRight className="size-4" strokeWidth={2} />
                </button>
              </div>`}
          />

            <ShowcaseTabs
            preview={
              <>

              <div className="join">
                              <button
                                type="button"
                                className="btn join-item cursor-pointer"
                                aria-label="Previous page"
                              >
                                «
                              </button>
                              <button type="button" className="btn join-item cursor-default">
                                Page 22
                              </button>
                              <button
                                type="button"
                                className="btn join-item cursor-pointer"
                                aria-label="Next page"
                              >
                                »
                              </button>
                            </div>
            
              </>
            }
            html={`<div class="join">
                <button
                  type="button"
                  class="btn join-item cursor-pointer"
                  aria-label="Previous page"
                >
                  «
                </button>
                <button type="button" class="btn join-item cursor-default">
                  Page 22
                </button>
                <button
                  type="button"
                  class="btn join-item cursor-pointer"
                  aria-label="Next page"
                >
                  »
                </button>
              </div>`}
            jsx={`<div className="join">
                <button
                  type="button"
                  className="btn join-item cursor-pointer"
                  aria-label="Previous page"
                >
                  «
                </button>
                <button type="button" className="btn join-item cursor-default">
                  Page 22
                </button>
                <button
                  type="button"
                  className="btn join-item cursor-pointer"
                  aria-label="Next page"
                >
                  »
                </button>
              </div>`}
          />

            <ShowcaseTabs
            preview={
              <>

              <div className="join grid max-w-md grid-cols-2">
                              <button
                                type="button"
                                className="btn btn-outline join-item cursor-pointer"
                              >
                                Previous page
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline join-item cursor-pointer"
                              >
                                Next
                              </button>
                            </div>
            
              </>
            }
            html={`<div class="join grid max-w-md grid-cols-2">
                <button
                  type="button"
                  class="btn btn-outline join-item cursor-pointer"
                >
                  Previous page
                </button>
                <button
                  type="button"
                  class="btn btn-outline join-item cursor-pointer"
                >
                  Next
                </button>
              </div>`}
            jsx={`<div className="join grid max-w-md grid-cols-2">
                <button
                  type="button"
                  className="btn btn-outline join-item cursor-pointer"
                >
                  Previous page
                </button>
                <button
                  type="button"
                  className="btn btn-outline join-item cursor-pointer"
                >
                  Next
                </button>
              </div>`}
          />
          </div>
        </Section>

        <Section
          eyebrow="03 · States"
          title="Active and disabled"
          description="btn-active for the current page"
          panel="wash-panel-rose"
        >
          <div className="flex flex-col gap-5">
            <ShowcaseTabs
            preview={
              <>

              <div className="join">
                              <button type="button" className="btn join-item cursor-pointer">
                                1
                              </button>
                              <button
                                type="button"
                                className="btn join-item btn-active cursor-pointer"
                              >
                                2
                              </button>
                              <button type="button" className="btn join-item cursor-pointer">
                                3
                              </button>
                            </div>
            
              </>
            }
            html={`<div class="join">
                <button type="button" class="btn join-item cursor-pointer">
                  1
                </button>
                <button
                  type="button"
                  class="btn join-item btn-active cursor-pointer"
                >
                  2
                </button>
                <button type="button" class="btn join-item cursor-pointer">
                  3
                </button>
              </div>`}
            jsx={`<div className="join">
                <button type="button" className="btn join-item cursor-pointer">
                  1
                </button>
                <button
                  type="button"
                  className="btn join-item btn-active cursor-pointer"
                >
                  2
                </button>
                <button type="button" className="btn join-item cursor-pointer">
                  3
                </button>
              </div>`}
          />

            <ShowcaseTabs
            preview={
              <>

              <div className="join">
                              <button type="button" className="btn join-item cursor-pointer">
                                1
                              </button>
                              <button type="button" className="btn join-item cursor-pointer">
                                2
                              </button>
                              <button
                                type="button"
                                className="btn join-item btn-disabled cursor-not-allowed"
                                disabled
                                aria-hidden="true"
                              >
                                …
                              </button>
                              <button type="button" className="btn join-item cursor-pointer">
                                99
                              </button>
                              <button type="button" className="btn join-item cursor-pointer">
                                100
                              </button>
                            </div>
            
              </>
            }
            html={`<div class="join">
                <button type="button" class="btn join-item cursor-pointer">
                  1
                </button>
                <button type="button" class="btn join-item cursor-pointer">
                  2
                </button>
                <button
                  type="button"
                  class="btn join-item btn-disabled cursor-not-allowed"
                  disabled
                  aria-hidden="true"
                >
                  …
                </button>
                <button type="button" class="btn join-item cursor-pointer">
                  99
                </button>
                <button type="button" class="btn join-item cursor-pointer">
                  100
                </button>
              </div>`}
            jsx={`<div className="join">
                <button type="button" className="btn join-item cursor-pointer">
                  1
                </button>
                <button type="button" className="btn join-item cursor-pointer">
                  2
                </button>
                <button
                  type="button"
                  className="btn join-item btn-disabled cursor-not-allowed"
                  disabled
                  aria-hidden="true"
                >
                  …
                </button>
                <button type="button" className="btn join-item cursor-pointer">
                  99
                </button>
                <button type="button" className="btn join-item cursor-pointer">
                  100
                </button>
              </div>`}
          />

            <ShowcaseTabs
            preview={
              <>

              <div className="join">
                              <button
                                type="button"
                                className="btn join-item cursor-not-allowed"
                                disabled
                                aria-label="Previous page"
                              >
                                «
                              </button>
                              <button
                                type="button"
                                className="btn join-item btn-active cursor-pointer"
                              >
                                1
                              </button>
                              <button type="button" className="btn join-item cursor-pointer">
                                2
                              </button>
                              <button
                                type="button"
                                className="btn join-item cursor-pointer"
                                aria-label="Next page"
                              >
                                »
                              </button>
                            </div>
            
              </>
            }
            html={`<div class="join">
                <button
                  type="button"
                  class="btn join-item cursor-not-allowed"
                  disabled
                  aria-label="Previous page"
                >
                  «
                </button>
                <button
                  type="button"
                  class="btn join-item btn-active cursor-pointer"
                >
                  1
                </button>
                <button type="button" class="btn join-item cursor-pointer">
                  2
                </button>
                <button
                  type="button"
                  class="btn join-item cursor-pointer"
                  aria-label="Next page"
                >
                  »
                </button>
              </div>`}
            jsx={`<div className="join">
                <button
                  type="button"
                  className="btn join-item cursor-not-allowed"
                  disabled
                  aria-label="Previous page"
                >
                  «
                </button>
                <button
                  type="button"
                  className="btn join-item btn-active cursor-pointer"
                >
                  1
                </button>
                <button type="button" className="btn join-item cursor-pointer">
                  2
                </button>
                <button
                  type="button"
                  className="btn join-item cursor-pointer"
                  aria-label="Next page"
                >
                  »
                </button>
              </div>`}
          />
          </div>
        </Section>

        <Section
          eyebrow="04 · Sizes"
          title="Button size variants"
          description="Match btn-xs through btn-xl on every join-item in the group"
        >
          <div className="flex flex-col gap-5">
            {sizes.map((size) => (
              <ShowcaseTabs
            preview={
              <>

              <div className="join">
                                <button
                                  type="button"
                                  className={`btn join-item cursor-pointer ${size.btn}`}
                                >
                                  1
                                </button>
                                <button
                                  type="button"
                                  className={`btn join-item btn-active cursor-pointer ${size.btn}`}
                                >
                                  2
                                </button>
                                <button
                                  type="button"
                                  className={`btn join-item cursor-pointer ${size.btn}`}
                                >
                                  3
                                </button>
                                <button
                                  type="button"
                                  className={`btn join-item cursor-pointer ${size.btn}`}
                                >
                                  4
                                </button>
                              </div>
            
              </>
            }
            html={`<div class="join">
                  <button
                    type="button"
                    class=
                  >
                    1
                  </button>
                  <button
                    type="button"
                    class=
                  >
                    2
                  </button>
                  <button
                    type="button"
                    class=
                  >
                    3
                  </button>
                  <button
                    type="button"
                    class=
                  >
                    4
                  </button>
                </div>`}
            jsx={`<div className="join">
                  <button
                    type="button"
                    className={\`btn join-item cursor-pointer \${size.btn}\`}
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className={\`btn join-item btn-active cursor-pointer \${size.btn}\`}
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className={\`btn join-item cursor-pointer \${size.btn}\`}
                  >
                    3
                  </button>
                  <button
                    type="button"
                    className={\`btn join-item cursor-pointer \${size.btn}\`}
                  >
                    4
                  </button>
                </div>`}
          />
            ))}
          </div>
        </Section>

        <Section
          eyebrow="05 · Interactive"
          title="Live plate list"
          description="Page state drives a short item list"
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <>

              <InteractiveList />
            
              </>
            }
            html={`<!-- InteractiveList -->`}
            jsx={`<InteractiveList />`}
          />
        
        </Section>

        <Section
          eyebrow="06 · Studio ledger"
          title="Series paginator"
          description="CRUD-style join paginator under a zebra table"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <StudioLedger />
            
              </>
            }
            html={`<!-- StudioLedger -->`}
            jsx={`<StudioLedger />`}
          />
        
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Compact on mobile"
          description="Show a short Page N control on small screens"
        >
          <ShowcaseTabs
            preview={
              <>

              <CompactResponsive />
            
              </>
            }
            html={`<!-- CompactResponsive -->`}
            jsx={`<CompactResponsive />`}
          />
        
        </Section>
      </div>
    </>
  )
}
