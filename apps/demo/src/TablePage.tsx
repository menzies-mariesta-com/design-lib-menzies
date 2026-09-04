import { type ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'

const sizes = [
  { name: 'XS', className: 'table-xs' },
  { name: 'SM', className: 'table-sm' },
  { name: 'MD', className: 'table-md' },
  { name: 'LG', className: 'table-lg' },
  { name: 'XL', className: 'table-xl' },
] as const

const defaultRows = [
  { name: 'Cerulean wash', series: 'Coastal', plates: 12 },
  { name: 'Ochre glaze', series: 'Warm earth', plates: 8 },
  { name: 'Rose bloom', series: 'Florals', plates: 15 },
] as const

const zebraRows = [
  { no: 1, pigment: "Payne's gray", wash: 'Mist', status: 'Ready' },
  { no: 2, pigment: 'Raw sienna', wash: 'Dry brush', status: 'Drying' },
  { no: 3, pigment: 'Ultramarine', wash: 'Wet-on-wet', status: 'Ready' },
  { no: 4, pigment: 'Alizarin', wash: 'Glaze', status: 'Queued' },
] as const

const richRows = [
  {
    name: 'Mira K.',
    role: 'Lead wash',
    job: 'Studio lead',
    favorite: true,
    color: 'bg-wash-blue',
    initials: 'MK',
  },
  {
    name: 'Jon L.',
    role: 'Plate cutter',
    job: 'Prep bench',
    favorite: false,
    color: 'bg-wash-ochre',
    initials: 'JL',
  },
  {
    name: 'Ada R.',
    role: 'Pigment tech',
    job: 'Mix desk',
    favorite: true,
    color: 'bg-wash-rose',
    initials: 'AR',
  },
] as const

const pinColHeaders = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
] as const

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
    <article className={`wash-panel wash-panel-flush paper-grain soak-in ${panel}`}>
      <div className="border-b border-ink-border/70 px-5 py-4">
        <p className="label-ink">{eyebrow}</p>
        <h2 className="font-display text-xl font-semibold md:text-2xl">{title}</h2>
        <p className="mt-1 text-sm text-ink-muted">{description}</p>
      </div>
      <div className="p-5">{children}</div>
    </article>
  )
}

function ClassLabel({ value }: { value: string }) {
  return (
    <code className="font-mono text-[0.65rem] text-ink-muted">
      {value || 'table'}
    </code>
  )
}

function Sample({
  label,
  children,
  className = '',
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

export default function TablePage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Tables
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">table</span> modifiers, sizes, and pin helpers.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Default"
          title="Base table"
          description="Simple thead and tbody with the default surface"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="table">
                            <div className="overflow-x-auto">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Series</th>
                                    <th>Plates</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {defaultRows.map((row, i) => (
                                    <tr key={row.name}>
                                      <th>{i + 1}</th>
                                      <td>{row.name}</td>
                                      <td>{row.series}</td>
                                      <td>{row.plates}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </Sample>
              </>
            }
            html={`<div class="overflow-x-auto">
              <table class="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Series</th>
                    <th>Plates</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- repeat for each item -->
                </tbody>
              </table>
            </div>`}
            jsx={`<div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Series</th>
                    <th>Plates</th>
                  </tr>
                </thead>
                <tbody>
                  {defaultRows.map((row, i) => (
                    <tr key={row.name}>
                      <th>{i + 1}</th>
                      <td>{row.name}</td>
                      <td>{row.series}</td>
                      <td>{row.plates}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>`}
          />
        </Section>

        <Section
          eyebrow="02 · Zebra"
          title="Striped rows"
          description="Alternate row pigment with table-zebra"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="table table-zebra">
                            <div className="overflow-x-auto">
                              <table className="table table-zebra">
                                <thead>
                                  <tr>
                                    <th></th>
                                    <th>Pigment</th>
                                    <th>Wash</th>
                                    <th>Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {zebraRows.map((row) => (
                                    <tr key={row.no}>
                                      <th>{row.no}</th>
                                      <td>{row.pigment}</td>
                                      <td>{row.wash}</td>
                                      <td>{row.status}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </Sample>
              </>
            }
            html={`<div class="overflow-x-auto">
              <table class="table table-zebra">
                <thead>
                  <tr>
                    <th></th>
                    <th>Pigment</th>
                    <th>Wash</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- repeat for each item -->
                </tbody>
              </table>
            </div>`}
            jsx={`<div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th></th>
                    <th>Pigment</th>
                    <th>Wash</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {zebraRows.map((row) => (
                    <tr key={row.no}>
                      <th>{row.no}</th>
                      <td>{row.pigment}</td>
                      <td>{row.wash}</td>
                      <td>{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>`}
          />
        </Section>

        <Section
          eyebrow="03 · Rich cells"
          title="Checkboxes, avatars, badges"
          description="Natural cell content: select, portrait, and role badge"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="table + checkbox + avatar + badge">
                            <div className="overflow-x-auto">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>
                                      <label>
                                        <input
                                          type="checkbox"
                                          className="checkbox checkbox-sm cursor-pointer"
                                          aria-label="Select all"
                                        />
                                      </label>
                                    </th>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Favorite</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {richRows.map((row) => (
                                    <tr key={row.name}>
                                      <th>
                                        <label>
                                          <input
                                            type="checkbox"
                                            className="checkbox checkbox-sm cursor-pointer"
                                            aria-label={`Select ${row.name}`}
                                          />
                                        </label>
                                      </th>
                                      <td>
                                        <div className="flex items-center gap-3">
                                          <div className="avatar avatar-placeholder">
                                            <div
                                              className={`w-10 rounded-full ${row.color} text-sm font-semibold`}
                                            >
                                              <span>{row.initials}</span>
                                            </div>
                                          </div>
                                          <div>
                                            <div className="font-bold">{row.name}</div>
                                            <div className="text-xs text-ink-muted opacity-70">
                                              {row.role}
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <span className="badge badge-ghost badge-sm">
                                          {row.job}
                                        </span>
                                      </td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          className="checkbox checkbox-primary checkbox-sm cursor-pointer"
                                          defaultChecked={row.favorite}
                                          aria-label={`${row.name} favorite`}
                                        />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot>
                                  <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Favorite</th>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </Sample>
              </>
            }
            html={`<div class="overflow-x-auto">
              <table class="table">
                <thead>
                  <tr>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          class="checkbox checkbox-sm cursor-pointer"
                          aria-label="Select all"
                        />
                      </label>
                    </th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Favorite</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- repeat for each item -->
                </tbody>
                <tfoot>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Favorite</th>
                  </tr>
                </tfoot>
              </table>
            </div>`}
            jsx={`<div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm cursor-pointer"
                          aria-label="Select all"
                        />
                      </label>
                    </th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Favorite</th>
                  </tr>
                </thead>
                <tbody>
                  {richRows.map((row) => (
                    <tr key={row.name}>
                      <th>
                        <label>
                          <input
                            type="checkbox"
                            className="checkbox checkbox-sm cursor-pointer"
                            aria-label={\`Select \${row.name}\`}
                          />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar avatar-placeholder">
                            <div
                              className={\`w-10 rounded-full \${row.color} text-sm font-semibold\`}
                            >
                              <span>{row.initials}</span>
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{row.name}</div>
                            <div className="text-xs text-ink-muted opacity-70">
                              {row.role}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-ghost badge-sm">
                          {row.job}
                        </span>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary checkbox-sm cursor-pointer"
                          defaultChecked={row.favorite}
                          aria-label={\`\${row.name} favorite\`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Favorite</th>
                  </tr>
                </tfoot>
              </table>
            </div>`}
          />
        </Section>

        <Section
          eyebrow="04 · Sizes"
          title="xs through xl"
          description="Density steps from compact ledgers to airy proofs"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 lg:grid-cols-2">
                            {sizes.map((s) => (
                              <Sample key={s.name} label={`table ${s.className}`}>
                                <div className="overflow-x-auto">
                                  <table className={`table ${s.className}`}>
                                    <thead>
                                      <tr>
                                        <th>Size</th>
                                        <th>Wash</th>
                                        <th>Qty</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>{s.name}</td>
                                        <td>Cerulean</td>
                                        <td>4</td>
                                      </tr>
                                      <tr>
                                        <td>{s.name}</td>
                                        <td>Ochre</td>
                                        <td>2</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={`<div class="grid gap-6 lg:grid-cols-2">
            <!-- repeat for each item -->
          </div>`}
            jsx={`<div className="grid gap-6 lg:grid-cols-2">
            {sizes.map((s) => (
              
                <div className="overflow-x-auto">
                  <table className={\`table \${s.className}\`}>
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>Wash</th>
                        <th>Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{s.name}</td>
                        <td>Cerulean</td>
                        <td>4</td>
                      </tr>
                      <tr>
                        <td>{s.name}</td>
                        <td>Ochre</td>
                        <td>2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              
            ))}
          </div>`}
          />
        </Section>

        <Section
          eyebrow="05 · Overflow"
          title="Horizontal scroll wrapper"
          description="overflow-x-auto keeps wide columns reachable on small screens"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="overflow-x-auto > table">
                            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Plate</th>
                                    <th>Pigment A</th>
                                    <th>Pigment B</th>
                                    <th>Pigment C</th>
                                    <th>Paper</th>
                                    <th>Brush</th>
                                    <th>Notes</th>
                                    <th>Shelf</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Harbor dawn</td>
                                    <td>Cerulean</td>
                                    <td>Payne&apos;s gray</td>
                                    <td>Titanium</td>
                                    <td>Cold press</td>
                                    <td>Round 8</td>
                                    <td>Soft sky band</td>
                                    <td>A-12</td>
                                  </tr>
                                  <tr>
                                    <td>Cliff warm</td>
                                    <td>Raw sienna</td>
                                    <td>Burnt umber</td>
                                    <td>Yellow ochre</td>
                                    <td>Hot press</td>
                                    <td>Flat 1/2&quot;</td>
                                    <td>Dry edge</td>
                                    <td>B-03</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </Sample>
              </>
            }
            html={`table">
            <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
              <table class="table">
                <thead>
                  <tr>
                    <th>Plate</th>
                    <th>Pigment A</th>
                    <th>Pigment B</th>
                    <th>Pigment C</th>
                    <th>Paper</th>
                    <th>Brush</th>
                    <th>Notes</th>
                    <th>Shelf</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Harbor dawn</td>
                    <td>Cerulean</td>
                    <td>Payne&apos;s gray</td>
                    <td>Titanium</td>
                    <td>Cold press</td>
                    <td>Round 8</td>
                    <td>Soft sky band</td>
                    <td>A-12</td>
                  </tr>
                  <tr>
                    <td>Cliff warm</td>
                    <td>Raw sienna</td>
                    <td>Burnt umber</td>
                    <td>Yellow ochre</td>
                    <td>Hot press</td>
                    <td>Flat 1/2&quot;</td>
                    <td>Dry edge</td>
                    <td>B-03</td>
                  </tr>
                </tbody>
              </table>
            </div>`}
            jsx={`table">
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
              <table className="table">
                <thead>
                  <tr>
                    <th>Plate</th>
                    <th>Pigment A</th>
                    <th>Pigment B</th>
                    <th>Pigment C</th>
                    <th>Paper</th>
                    <th>Brush</th>
                    <th>Notes</th>
                    <th>Shelf</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Harbor dawn</td>
                    <td>Cerulean</td>
                    <td>Payne&apos;s gray</td>
                    <td>Titanium</td>
                    <td>Cold press</td>
                    <td>Round 8</td>
                    <td>Soft sky band</td>
                    <td>A-12</td>
                  </tr>
                  <tr>
                    <td>Cliff warm</td>
                    <td>Raw sienna</td>
                    <td>Burnt umber</td>
                    <td>Yellow ochre</td>
                    <td>Hot press</td>
                    <td>Flat 1/2&quot;</td>
                    <td>Dry edge</td>
                    <td>B-03</td>
                  </tr>
                </tbody>
              </table>
            </div>`}
          />
        </Section>

        <Section
          eyebrow="06 · Pin rows"
          title="Sticky header and footer"
          description="table-pin-rows keeps thead and tfoot visible while body scrolls"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="table table-pin-rows (h-72 overflow)">
                            <div className="h-72 overflow-x-auto">
                              <table className="table table-pin-rows bg-base-200">
                                <thead>
                                  <tr>
                                    <th>Year</th>
                                    <th>Series</th>
                                    <th>Plates</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Array.from({ length: 18 }, (_, i) => (
                                    <tr key={i}>
                                      <td>{2010 + i}</td>
                                      <td>Menzies Design archive {i + 1}</td>
                                      <td>{(i + 3) * 4}</td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot>
                                  <tr>
                                    <th>Year</th>
                                    <th>Series</th>
                                    <th>Plates</th>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </Sample>
              </>
            }
            html={`<div class="h-72 overflow-x-auto">
              <table class="table table-pin-rows bg-base-200">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Series</th>
                    <th>Plates</th>
                  </tr>
                </thead>
                <tbody>
                  , (_, i) => (
                    <tr key=>
                      <td></td>
                      <td>Menzies Design archive </td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Year</th>
                    <th>Series</th>
                    <th>Plates</th>
                  </tr>
                </tfoot>
              </table>
            </div>`}
            jsx={`<div className="h-72 overflow-x-auto">
              <table className="table table-pin-rows bg-base-200">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Series</th>
                    <th>Plates</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 18 }, (_, i) => (
                    <tr key={i}>
                      <td>{2010 + i}</td>
                      <td>Menzies Design archive {i + 1}</td>
                      <td>{(i + 3) * 4}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Year</th>
                    <th>Series</th>
                    <th>Plates</th>
                  </tr>
                </tfoot>
              </table>
            </div>`}
          />
        </Section>

        <Section
          eyebrow="07 · Pin cols"
          title="Pinned corners and columns"
          description="Combine pin-rows and pin-cols in a bounded scroll pane"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="table table-xs table-pin-rows table-pin-cols">
                            <div className="h-72 w-full max-w-md overflow-x-auto">
                              <table className="table table-xs table-pin-rows table-pin-cols">
                                <thead>
                                  <tr>
                                    <th></th>
                                    {pinColHeaders.map((h) => (
                                      <td key={h}>{h}</td>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {Array.from({ length: 12 }, (_, r) => (
                                    <tr key={r}>
                                      <th>{r + 1}</th>
                                      {pinColHeaders.map((h) => (
                                        <td key={h}>
                                          {h}
                                          {r + 1}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot>
                                  <tr>
                                    <th></th>
                                    {pinColHeaders.map((h) => (
                                      <td key={h}>{h}</td>
                                    ))}
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </Sample>
              </>
            }
            html={`<div class="h-72 w-full max-w-md overflow-x-auto">
              <table class="table table-xs table-pin-rows table-pin-cols">
                <thead>
                  <tr>
                    <th></th>
                    <!-- repeat for each item -->
                  </tr>
                </thead>
                <tbody>
                  , (_, r) => (
                    <tr key=>
                      <th></th>
                      <!-- repeat for each item -->
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th></th>
                    <!-- repeat for each item -->
                  </tr>
                </tfoot>
              </table>
            </div>`}
            jsx={`<div className="h-72 w-full max-w-md overflow-x-auto">
              <table className="table table-xs table-pin-rows table-pin-cols">
                <thead>
                  <tr>
                    <th></th>
                    {pinColHeaders.map((h) => (
                      <td key={h}>{h}</td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 12 }, (_, r) => (
                    <tr key={r}>
                      <th>{r + 1}</th>
                      {pinColHeaders.map((h) => (
                        <td key={h}>
                          {h}
                          {r + 1}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th></th>
                    {pinColHeaders.map((h) => (
                      <td key={h}>{h}</td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>`}
          />
        </Section>
      </div>
    </>
  )
}
