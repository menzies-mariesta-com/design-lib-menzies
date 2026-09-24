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
    <thead><tr><th></th><th>Name</th><th>Series</th><th>Plates</th></tr></thead>
    <tbody>
      <tr><th>1</th><td>Cerulean wash</td><td>Coastal</td><td>12</td></tr>
      <tr><th>2</th><td>Ochre glaze</td><td>Warm earth</td><td>8</td></tr>
      <tr><th>3</th><td>Rose bloom</td><td>Florals</td><td>15</td></tr>
    </tbody>
  </table>
</div>`}
            jsx={`<div className="overflow-x-auto">
  <table className="table">
    <thead><tr><th></th><th>Name</th><th>Series</th><th>Plates</th></tr></thead>
    <tbody>
      <tr><th>1</th><td>Cerulean wash</td><td>Coastal</td><td>12</td></tr>
      <tr><th>2</th><td>Ochre glaze</td><td>Warm earth</td><td>8</td></tr>
      <tr><th>3</th><td>Rose bloom</td><td>Florals</td><td>15</td></tr>
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
    <thead><tr><th></th><th>Pigment</th><th>Wash</th><th>Status</th></tr></thead>
    <tbody>
      <tr><th>1</th><td>Payne's gray</td><td>Mist</td><td>Ready</td></tr>
      <tr><th>2</th><td>Raw sienna</td><td>Dry brush</td><td>Drying</td></tr>
      <tr><th>3</th><td>Ultramarine</td><td>Wet-on-wet</td><td>Ready</td></tr>
      <tr><th>4</th><td>Alizarin</td><td>Glaze</td><td>Queued</td></tr>
    </tbody>
  </table>
</div>`}
            jsx={`<div className="overflow-x-auto">
  <table className="table table-zebra">
    <thead><tr><th></th><th>Pigment</th><th>Wash</th><th>Status</th></tr></thead>
    <tbody>
      <tr><th>1</th><td>Payne's gray</td><td>Mist</td><td>Ready</td></tr>
      <tr><th>2</th><td>Raw sienna</td><td>Dry brush</td><td>Drying</td></tr>
      <tr><th>3</th><td>Ultramarine</td><td>Wet-on-wet</td><td>Ready</td></tr>
      <tr><th>4</th><td>Alizarin</td><td>Glaze</td><td>Queued</td></tr>
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
        <th><label><input type="checkbox" class="checkbox checkbox-sm cursor-pointer" aria-label="Select all" /></label></th>
        <th>Name</th><th>Role</th><th>Favorite</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th><label><input type="checkbox" class="checkbox checkbox-sm cursor-pointer" aria-label="Select Mira K." /></label></th>
        <td>
          <div class="flex items-center gap-3">
            <div class="avatar avatar-placeholder"><div class="w-10 rounded-full bg-wash-blue text-sm font-semibold"><span>MK</span></div></div>
            <div>
              <div class="font-bold">Mira K.</div>
              <div class="text-xs text-ink-muted opacity-70">Lead wash</div>
            </div>
          </div>
        </td>
        <td><span class="badge badge-ghost badge-sm">Studio lead</span></td>
        <td><input type="checkbox" class="checkbox checkbox-primary checkbox-sm cursor-pointer" checked aria-label="Mira K. favorite" /></td>
      </tr>
      <tr>
        <th><label><input type="checkbox" class="checkbox checkbox-sm cursor-pointer" aria-label="Select Jon L." /></label></th>
        <td>
          <div class="flex items-center gap-3">
            <div class="avatar avatar-placeholder"><div class="w-10 rounded-full bg-wash-ochre text-sm font-semibold"><span>JL</span></div></div>
            <div>
              <div class="font-bold">Jon L.</div>
              <div class="text-xs text-ink-muted opacity-70">Plate cutter</div>
            </div>
          </div>
        </td>
        <td><span class="badge badge-ghost badge-sm">Prep bench</span></td>
        <td><input type="checkbox" class="checkbox checkbox-primary checkbox-sm cursor-pointer" aria-label="Jon L. favorite" /></td>
      </tr>
      <tr>
        <th><label><input type="checkbox" class="checkbox checkbox-sm cursor-pointer" aria-label="Select Ada R." /></label></th>
        <td>
          <div class="flex items-center gap-3">
            <div class="avatar avatar-placeholder"><div class="w-10 rounded-full bg-wash-rose text-sm font-semibold"><span>AR</span></div></div>
            <div>
              <div class="font-bold">Ada R.</div>
              <div class="text-xs text-ink-muted opacity-70">Pigment tech</div>
            </div>
          </div>
        </td>
        <td><span class="badge badge-ghost badge-sm">Mix desk</span></td>
        <td><input type="checkbox" class="checkbox checkbox-primary checkbox-sm cursor-pointer" checked aria-label="Ada R. favorite" /></td>
      </tr>
    </tbody>
    <tfoot><tr><th></th><th>Name</th><th>Role</th><th>Favorite</th></tr></tfoot>
  </table>
</div>`}
            jsx={`<div className="overflow-x-auto">
  <table className="table">
    <thead>
      <tr>
        <th><label><input type="checkbox" className="checkbox checkbox-sm cursor-pointer" aria-label="Select all" /></label></th>
        <th>Name</th><th>Role</th><th>Favorite</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th><label><input type="checkbox" className="checkbox checkbox-sm cursor-pointer" aria-label="Select Mira K." /></label></th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar avatar-placeholder"><div className="w-10 rounded-full bg-wash-blue text-sm font-semibold"><span>MK</span></div></div>
            <div>
              <div className="font-bold">Mira K.</div>
              <div className="text-xs text-ink-muted opacity-70">Lead wash</div>
            </div>
          </div>
        </td>
        <td><span className="badge badge-ghost badge-sm">Studio lead</span></td>
        <td><input type="checkbox" className="checkbox checkbox-primary checkbox-sm cursor-pointer" defaultChecked aria-label="Mira K. favorite" /></td>
      </tr>
      <tr>
        <th><label><input type="checkbox" className="checkbox checkbox-sm cursor-pointer" aria-label="Select Jon L." /></label></th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar avatar-placeholder"><div className="w-10 rounded-full bg-wash-ochre text-sm font-semibold"><span>JL</span></div></div>
            <div>
              <div className="font-bold">Jon L.</div>
              <div className="text-xs text-ink-muted opacity-70">Plate cutter</div>
            </div>
          </div>
        </td>
        <td><span className="badge badge-ghost badge-sm">Prep bench</span></td>
        <td><input type="checkbox" className="checkbox checkbox-primary checkbox-sm cursor-pointer" aria-label="Jon L. favorite" /></td>
      </tr>
      <tr>
        <th><label><input type="checkbox" className="checkbox checkbox-sm cursor-pointer" aria-label="Select Ada R." /></label></th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar avatar-placeholder"><div className="w-10 rounded-full bg-wash-rose text-sm font-semibold"><span>AR</span></div></div>
            <div>
              <div className="font-bold">Ada R.</div>
              <div className="text-xs text-ink-muted opacity-70">Pigment tech</div>
            </div>
          </div>
        </td>
        <td><span className="badge badge-ghost badge-sm">Mix desk</span></td>
        <td><input type="checkbox" className="checkbox checkbox-primary checkbox-sm cursor-pointer" defaultChecked aria-label="Ada R. favorite" /></td>
      </tr>
    </tbody>
    <tfoot><tr><th></th><th>Name</th><th>Role</th><th>Favorite</th></tr></tfoot>
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
  <div class="overflow-x-auto">
    <table class="table table-xs">
      <thead><tr><th>Size</th><th>Wash</th><th>Qty</th></tr></thead>
      <tbody>
        <tr><td>XS</td><td>Cerulean</td><td>4</td></tr>
        <tr><td>XS</td><td>Ochre</td><td>2</td></tr>
      </tbody>
    </table>
  </div>
  <div class="overflow-x-auto">
    <table class="table table-sm">
      <thead><tr><th>Size</th><th>Wash</th><th>Qty</th></tr></thead>
      <tbody>
        <tr><td>SM</td><td>Cerulean</td><td>4</td></tr>
        <tr><td>SM</td><td>Ochre</td><td>2</td></tr>
      </tbody>
    </table>
  </div>
  <div class="overflow-x-auto">
    <table class="table table-md">
      <thead><tr><th>Size</th><th>Wash</th><th>Qty</th></tr></thead>
      <tbody>
        <tr><td>MD</td><td>Cerulean</td><td>4</td></tr>
        <tr><td>MD</td><td>Ochre</td><td>2</td></tr>
      </tbody>
    </table>
  </div>
  <div class="overflow-x-auto">
    <table class="table table-lg">
      <thead><tr><th>Size</th><th>Wash</th><th>Qty</th></tr></thead>
      <tbody>
        <tr><td>LG</td><td>Cerulean</td><td>4</td></tr>
        <tr><td>LG</td><td>Ochre</td><td>2</td></tr>
      </tbody>
    </table>
  </div>
  <div class="overflow-x-auto">
    <table class="table table-xl">
      <thead><tr><th>Size</th><th>Wash</th><th>Qty</th></tr></thead>
      <tbody>
        <tr><td>XL</td><td>Cerulean</td><td>4</td></tr>
        <tr><td>XL</td><td>Ochre</td><td>2</td></tr>
      </tbody>
    </table>
  </div>
</div>`}
            jsx={`<div className="grid gap-6 lg:grid-cols-2">
  <div className="overflow-x-auto">
    <table className="table table-xs">
      <thead><tr><th>Size</th><th>Wash</th><th>Qty</th></tr></thead>
      <tbody>
        <tr><td>XS</td><td>Cerulean</td><td>4</td></tr>
        <tr><td>XS</td><td>Ochre</td><td>2</td></tr>
      </tbody>
    </table>
  </div>
  <div className="overflow-x-auto">
    <table className="table table-sm">
      <thead><tr><th>Size</th><th>Wash</th><th>Qty</th></tr></thead>
      <tbody>
        <tr><td>SM</td><td>Cerulean</td><td>4</td></tr>
        <tr><td>SM</td><td>Ochre</td><td>2</td></tr>
      </tbody>
    </table>
  </div>
  <div className="overflow-x-auto">
    <table className="table table-md">
      <thead><tr><th>Size</th><th>Wash</th><th>Qty</th></tr></thead>
      <tbody>
        <tr><td>MD</td><td>Cerulean</td><td>4</td></tr>
        <tr><td>MD</td><td>Ochre</td><td>2</td></tr>
      </tbody>
    </table>
  </div>
  <div className="overflow-x-auto">
    <table className="table table-lg">
      <thead><tr><th>Size</th><th>Wash</th><th>Qty</th></tr></thead>
      <tbody>
        <tr><td>LG</td><td>Cerulean</td><td>4</td></tr>
        <tr><td>LG</td><td>Ochre</td><td>2</td></tr>
      </tbody>
    </table>
  </div>
  <div className="overflow-x-auto">
    <table className="table table-xl">
      <thead><tr><th>Size</th><th>Wash</th><th>Qty</th></tr></thead>
      <tbody>
        <tr><td>XL</td><td>Cerulean</td><td>4</td></tr>
        <tr><td>XL</td><td>Ochre</td><td>2</td></tr>
      </tbody>
    </table>
  </div>
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
            html={`<div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
  <table class="table">
    <thead>
      <tr><th>Plate</th><th>Pigment A</th><th>Pigment B</th><th>Pigment C</th><th>Paper</th><th>Brush</th><th>Notes</th><th>Shelf</th></tr>
    </thead>
    <tbody>
      <tr><td>Harbor dawn</td><td>Cerulean</td><td>Payne's gray</td><td>Titanium</td><td>Cold press</td><td>Round 8</td><td>Soft sky band</td><td>A-12</td></tr>
      <tr><td>Cliff warm</td><td>Raw sienna</td><td>Burnt umber</td><td>Yellow ochre</td><td>Hot press</td><td>Flat 1/2"</td><td>Dry edge</td><td>B-03</td></tr>
    </tbody>
  </table>
</div>`}
            jsx={`<div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
  <table className="table">
    <thead>
      <tr><th>Plate</th><th>Pigment A</th><th>Pigment B</th><th>Pigment C</th><th>Paper</th><th>Brush</th><th>Notes</th><th>Shelf</th></tr>
    </thead>
    <tbody>
      <tr><td>Harbor dawn</td><td>Cerulean</td><td>Payne's gray</td><td>Titanium</td><td>Cold press</td><td>Round 8</td><td>Soft sky band</td><td>A-12</td></tr>
      <tr><td>Cliff warm</td><td>Raw sienna</td><td>Burnt umber</td><td>Yellow ochre</td><td>Hot press</td><td>Flat 1/2"</td><td>Dry edge</td><td>B-03</td></tr>
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
    <thead><tr><th>Year</th><th>Series</th><th>Plates</th></tr></thead>
    <tbody>
      <tr><td>2010</td><td>Menzies Design archive 1</td><td>12</td></tr>
      <tr><td>2011</td><td>Menzies Design archive 2</td><td>16</td></tr>
      <tr><td>2012</td><td>Menzies Design archive 3</td><td>20</td></tr>
      <tr><td>2013</td><td>Menzies Design archive 4</td><td>24</td></tr>
      <tr><td>2014</td><td>Menzies Design archive 5</td><td>28</td></tr>
      <tr><td>2015</td><td>Menzies Design archive 6</td><td>32</td></tr>
      <tr><td>2016</td><td>Menzies Design archive 7</td><td>36</td></tr>
      <tr><td>2017</td><td>Menzies Design archive 8</td><td>40</td></tr>
      <tr><td>2018</td><td>Menzies Design archive 9</td><td>44</td></tr>
      <tr><td>2019</td><td>Menzies Design archive 10</td><td>48</td></tr>
      <tr><td>2020</td><td>Menzies Design archive 11</td><td>52</td></tr>
      <tr><td>2021</td><td>Menzies Design archive 12</td><td>56</td></tr>
      <tr><td>2022</td><td>Menzies Design archive 13</td><td>60</td></tr>
      <tr><td>2023</td><td>Menzies Design archive 14</td><td>64</td></tr>
      <tr><td>2024</td><td>Menzies Design archive 15</td><td>68</td></tr>
      <tr><td>2025</td><td>Menzies Design archive 16</td><td>72</td></tr>
      <tr><td>2026</td><td>Menzies Design archive 17</td><td>76</td></tr>
      <tr><td>2027</td><td>Menzies Design archive 18</td><td>80</td></tr>
    </tbody>
    <tfoot><tr><th>Year</th><th>Series</th><th>Plates</th></tr></tfoot>
  </table>
</div>`}
            jsx={`<div className="h-72 overflow-x-auto">
  <table className="table table-pin-rows bg-base-200">
    <thead><tr><th>Year</th><th>Series</th><th>Plates</th></tr></thead>
    <tbody>
      <tr><td>2010</td><td>Menzies Design archive 1</td><td>12</td></tr>
      <tr><td>2011</td><td>Menzies Design archive 2</td><td>16</td></tr>
      <tr><td>2012</td><td>Menzies Design archive 3</td><td>20</td></tr>
      <tr><td>2013</td><td>Menzies Design archive 4</td><td>24</td></tr>
      <tr><td>2014</td><td>Menzies Design archive 5</td><td>28</td></tr>
      <tr><td>2015</td><td>Menzies Design archive 6</td><td>32</td></tr>
      <tr><td>2016</td><td>Menzies Design archive 7</td><td>36</td></tr>
      <tr><td>2017</td><td>Menzies Design archive 8</td><td>40</td></tr>
      <tr><td>2018</td><td>Menzies Design archive 9</td><td>44</td></tr>
      <tr><td>2019</td><td>Menzies Design archive 10</td><td>48</td></tr>
      <tr><td>2020</td><td>Menzies Design archive 11</td><td>52</td></tr>
      <tr><td>2021</td><td>Menzies Design archive 12</td><td>56</td></tr>
      <tr><td>2022</td><td>Menzies Design archive 13</td><td>60</td></tr>
      <tr><td>2023</td><td>Menzies Design archive 14</td><td>64</td></tr>
      <tr><td>2024</td><td>Menzies Design archive 15</td><td>68</td></tr>
      <tr><td>2025</td><td>Menzies Design archive 16</td><td>72</td></tr>
      <tr><td>2026</td><td>Menzies Design archive 17</td><td>76</td></tr>
      <tr><td>2027</td><td>Menzies Design archive 18</td><td>80</td></tr>
    </tbody>
    <tfoot><tr><th>Year</th><th>Series</th><th>Plates</th></tr></tfoot>
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
    <thead><tr><th></th><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td></tr></thead>
    <tbody>
      <tr><th>1</th><td>A1</td><td>B1</td><td>C1</td><td>D1</td><td>E1</td><td>F1</td><td>G1</td><td>H1</td><td>I1</td><td>J1</td><td>K1</td><td>L1</td></tr>
      <tr><th>2</th><td>A2</td><td>B2</td><td>C2</td><td>D2</td><td>E2</td><td>F2</td><td>G2</td><td>H2</td><td>I2</td><td>J2</td><td>K2</td><td>L2</td></tr>
      <tr><th>3</th><td>A3</td><td>B3</td><td>C3</td><td>D3</td><td>E3</td><td>F3</td><td>G3</td><td>H3</td><td>I3</td><td>J3</td><td>K3</td><td>L3</td></tr>
      <tr><th>4</th><td>A4</td><td>B4</td><td>C4</td><td>D4</td><td>E4</td><td>F4</td><td>G4</td><td>H4</td><td>I4</td><td>J4</td><td>K4</td><td>L4</td></tr>
      <tr><th>5</th><td>A5</td><td>B5</td><td>C5</td><td>D5</td><td>E5</td><td>F5</td><td>G5</td><td>H5</td><td>I5</td><td>J5</td><td>K5</td><td>L5</td></tr>
      <tr><th>6</th><td>A6</td><td>B6</td><td>C6</td><td>D6</td><td>E6</td><td>F6</td><td>G6</td><td>H6</td><td>I6</td><td>J6</td><td>K6</td><td>L6</td></tr>
      <tr><th>7</th><td>A7</td><td>B7</td><td>C7</td><td>D7</td><td>E7</td><td>F7</td><td>G7</td><td>H7</td><td>I7</td><td>J7</td><td>K7</td><td>L7</td></tr>
      <tr><th>8</th><td>A8</td><td>B8</td><td>C8</td><td>D8</td><td>E8</td><td>F8</td><td>G8</td><td>H8</td><td>I8</td><td>J8</td><td>K8</td><td>L8</td></tr>
      <tr><th>9</th><td>A9</td><td>B9</td><td>C9</td><td>D9</td><td>E9</td><td>F9</td><td>G9</td><td>H9</td><td>I9</td><td>J9</td><td>K9</td><td>L9</td></tr>
      <tr><th>10</th><td>A10</td><td>B10</td><td>C10</td><td>D10</td><td>E10</td><td>F10</td><td>G10</td><td>H10</td><td>I10</td><td>J10</td><td>K10</td><td>L10</td></tr>
      <tr><th>11</th><td>A11</td><td>B11</td><td>C11</td><td>D11</td><td>E11</td><td>F11</td><td>G11</td><td>H11</td><td>I11</td><td>J11</td><td>K11</td><td>L11</td></tr>
      <tr><th>12</th><td>A12</td><td>B12</td><td>C12</td><td>D12</td><td>E12</td><td>F12</td><td>G12</td><td>H12</td><td>I12</td><td>J12</td><td>K12</td><td>L12</td></tr>
    </tbody>
    <tfoot><tr><th></th><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td></tr></tfoot>
  </table>
</div>`}
            jsx={`<div className="h-72 w-full max-w-md overflow-x-auto">
  <table className="table table-xs table-pin-rows table-pin-cols">
    <thead><tr><th></th><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td></tr></thead>
    <tbody>
      <tr><th>1</th><td>A1</td><td>B1</td><td>C1</td><td>D1</td><td>E1</td><td>F1</td><td>G1</td><td>H1</td><td>I1</td><td>J1</td><td>K1</td><td>L1</td></tr>
      <tr><th>2</th><td>A2</td><td>B2</td><td>C2</td><td>D2</td><td>E2</td><td>F2</td><td>G2</td><td>H2</td><td>I2</td><td>J2</td><td>K2</td><td>L2</td></tr>
      <tr><th>3</th><td>A3</td><td>B3</td><td>C3</td><td>D3</td><td>E3</td><td>F3</td><td>G3</td><td>H3</td><td>I3</td><td>J3</td><td>K3</td><td>L3</td></tr>
      <tr><th>4</th><td>A4</td><td>B4</td><td>C4</td><td>D4</td><td>E4</td><td>F4</td><td>G4</td><td>H4</td><td>I4</td><td>J4</td><td>K4</td><td>L4</td></tr>
      <tr><th>5</th><td>A5</td><td>B5</td><td>C5</td><td>D5</td><td>E5</td><td>F5</td><td>G5</td><td>H5</td><td>I5</td><td>J5</td><td>K5</td><td>L5</td></tr>
      <tr><th>6</th><td>A6</td><td>B6</td><td>C6</td><td>D6</td><td>E6</td><td>F6</td><td>G6</td><td>H6</td><td>I6</td><td>J6</td><td>K6</td><td>L6</td></tr>
      <tr><th>7</th><td>A7</td><td>B7</td><td>C7</td><td>D7</td><td>E7</td><td>F7</td><td>G7</td><td>H7</td><td>I7</td><td>J7</td><td>K7</td><td>L7</td></tr>
      <tr><th>8</th><td>A8</td><td>B8</td><td>C8</td><td>D8</td><td>E8</td><td>F8</td><td>G8</td><td>H8</td><td>I8</td><td>J8</td><td>K8</td><td>L8</td></tr>
      <tr><th>9</th><td>A9</td><td>B9</td><td>C9</td><td>D9</td><td>E9</td><td>F9</td><td>G9</td><td>H9</td><td>I9</td><td>J9</td><td>K9</td><td>L9</td></tr>
      <tr><th>10</th><td>A10</td><td>B10</td><td>C10</td><td>D10</td><td>E10</td><td>F10</td><td>G10</td><td>H10</td><td>I10</td><td>J10</td><td>K10</td><td>L10</td></tr>
      <tr><th>11</th><td>A11</td><td>B11</td><td>C11</td><td>D11</td><td>E11</td><td>F11</td><td>G11</td><td>H11</td><td>I11</td><td>J11</td><td>K11</td><td>L11</td></tr>
      <tr><th>12</th><td>A12</td><td>B12</td><td>C12</td><td>D12</td><td>E12</td><td>F12</td><td>G12</td><td>H12</td><td>I12</td><td>J12</td><td>K12</td><td>L12</td></tr>
    </tbody>
    <tfoot><tr><th></th><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td></tr></tfoot>
  </table>
</div>`}
          />
        </Section>
      </div>
    </>
  )
}
