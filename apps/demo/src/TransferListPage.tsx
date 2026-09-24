import { useMemo, useState, type ReactNode } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'

type TransferItem = {
  id: string
  label: string
  hint?: string
}

const basicPool: TransferItem[] = [
  { id: 'a1', label: 'Harbor dawn', hint: 'Plate A' },
  { id: 'a2', label: 'Ochre cliff', hint: 'Plate B' },
  { id: 'a3', label: 'Rose bloom', hint: 'Plate C' },
  { id: 'a4', label: 'Mist bank', hint: 'Plate D' },
  { id: 'a5', label: 'Dry brush study', hint: 'Plate E' },
]

const moveAllPool: TransferItem[] = [
  { id: 'm1', label: 'Cerulean wash' },
  { id: 'm2', label: 'Viridian glaze' },
  { id: 'm3', label: 'Raw sienna' },
  { id: 'm4', label: 'Payne gray' },
  { id: 'm5', label: 'Alizarin lake' },
  { id: 'm6', label: 'Naples yellow' },
]

const searchPool: TransferItem[] = [
  { id: 's1', label: 'Ultramarine deep', hint: 'Cool' },
  { id: 's2', label: 'Cobalt turquoise', hint: 'Cool' },
  { id: 's3', label: 'Yellow ochre', hint: 'Earth' },
  { id: 's4', label: 'Burnt umber', hint: 'Earth' },
  { id: 's5', label: 'Quinacridone rose', hint: 'Warm' },
  { id: 's6', label: 'Vermilion light', hint: 'Warm' },
  { id: 's7', label: 'Sap green', hint: 'Cool' },
  { id: 's8', label: 'Indigo night', hint: 'Cool' },
]

const pigmentPool: TransferItem[] = [
  { id: 'p1', label: "Payne's gray", hint: 'Drawer' },
  { id: 'p2', label: 'Raw sienna', hint: 'Drawer' },
  { id: 'p3', label: 'Alizarin crimson', hint: 'Drawer' },
  { id: 'p4', label: 'Ultramarine', hint: 'Drawer' },
  { id: 'p5', label: 'Viridian', hint: 'Drawer' },
  { id: 'p6', label: 'Cadmium yellow', hint: 'Drawer' },
]


const svgSearch =
  '<svg class="size-3.5 text-base-content/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>'
const svgChevronRight =
  '<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>'
const svgChevronLeft =
  '<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>'
const svgChevronsRight =
  '<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>'
const svgChevronsLeft =
  '<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>'

function toJsxMarkup(html: string): string {
  return daisyToJsx(html).replace(/stroke-width=/g, 'strokeWidth=')
}

function transferItemHtml(item: TransferItem, selected = false): string {
  const active = selected ? ' active' : ''
  const hint = item.hint
    ? `\n            <span class="block text-xs font-normal text-ink-muted">${item.hint}</span>`
    : ''
  return `        <li>
          <button type="button" role="option" aria-selected="${selected ? 'true' : 'false'}" class="cursor-pointer${active}">
            <span class="list-col-grow">
              <span class="font-medium">${item.label}</span>${hint}
            </span>
          </button>
        </li>`
}

function transferColumnHtml(opts: {
  title: string
  items: readonly TransferItem[]
  emptyLabel: string
  searchPlaceholder?: string
  disabled?: boolean
}): string {
  const { title, items, emptyLabel, searchPlaceholder, disabled } = opts
  const opacity = disabled ? ' opacity-60' : ''
  const search = searchPlaceholder
    ? `
      <label class="input input-sm m-2 cursor-text border-ink-border bg-base-100">
        ${svgSearch}
        <input type="search" class="cursor-text grow" placeholder="${searchPlaceholder}"${disabled ? ' disabled' : ''} aria-label="${title} filter" />
      </label>`
    : ''
  const body =
    items.length === 0
      ? `        <li class="disabled">
          <span class="justify-center text-ink-muted">${emptyLabel}</span>
        </li>`
      : items.map((i) => transferItemHtml(i)).join('\n')
  return `<div class="flex min-h-64 flex-1 flex-col overflow-hidden rounded-box border border-ink-border bg-base-100/80${opacity}">
      <div class="flex items-center justify-between border-b border-ink-border/70 px-3 py-2">
        <span class="text-sm font-semibold">${title}</span>
        <span class="badge badge-ghost badge-sm tabular-nums">${items.length}</span>
      </div>${search}
      <ul class="menu menu-sm flex-1 overflow-y-auto p-2" role="listbox" aria-label="${title}" aria-multiselectable="true">
${body}
      </ul>
    </div>`
}

function moveBtnHtml(label: string, color: string, icon: string, disabled = false): string {
  const dis = disabled ? ' btn-disabled cursor-not-allowed' : ''
  const disAttr = disabled ? ' disabled' : ''
  return `<div class="tooltip tooltip-right tooltip-${color}" data-tip="${label}">
          <button type="button" class="btn btn-square btn-sm cursor-pointer btn-${color}${dis}" aria-label="${label}"${disAttr}>
            ${icon}
          </button>
        </div>`
}

const lockedItems: TransferItem[] = [
  { id: 'd1', label: 'Locked wash A' },
  { id: 'd2', label: 'Locked wash B' },
]

const basicHtml = `<div class="space-y-3">
  <div class="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
    ${transferColumnHtml({ title: 'Available', items: basicPool, emptyLabel: 'Nothing left to pick' })}
    <div class="join join-horizontal justify-center md:join-vertical md:px-1">
      ${moveBtnHtml('Move to selected', 'primary', svgChevronRight, true)}
      ${moveBtnHtml('Move to available', 'secondary', svgChevronLeft, true)}
    </div>
    ${transferColumnHtml({ title: 'Selected', items: [], emptyLabel: 'Select plates to add' })}
  </div>
</div>`

const moveAllHtml = `<div class="space-y-3">
  <div class="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
    ${transferColumnHtml({ title: 'Pool', items: moveAllPool, emptyLabel: 'Pool is empty' })}
    <div class="flex flex-row justify-center gap-1 md:flex-col md:px-1">
      ${moveBtnHtml('Move all right', 'primary', svgChevronsRight)}
      ${moveBtnHtml('Move selected right', 'accent', svgChevronRight, true)}
      ${moveBtnHtml('Move selected left', 'secondary', svgChevronLeft, true)}
      ${moveBtnHtml('Clear all to pool', 'neutral', svgChevronsLeft, true)}
    </div>
    ${transferColumnHtml({ title: 'Active set', items: [], emptyLabel: 'No washes chosen' })}
  </div>
</div>`

const searchHtml = `<div class="space-y-3">
  <div class="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
    ${transferColumnHtml({ title: 'Catalog', items: searchPool.slice(0, 5), emptyLabel: 'No matches', searchPlaceholder: 'Filter catalog…' })}
    <div class="join join-horizontal justify-center md:join-vertical md:px-1">
      ${moveBtnHtml('Add to tray', 'primary', svgChevronRight, true)}
      ${moveBtnHtml('Return to catalog', 'secondary', svgChevronLeft, true)}
    </div>
    ${transferColumnHtml({ title: 'Tray', items: searchPool.slice(5), emptyLabel: 'Tray is empty', searchPlaceholder: 'Filter tray…' })}
  </div>
</div>`

const studioHtml = `<div class="space-y-3">
  <div class="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
    ${transferColumnHtml({ title: 'Drawer', items: pigmentPool.slice(0, 4), emptyLabel: 'Drawer is empty' })}
    <div class="flex flex-row flex-wrap items-center justify-center gap-2 lg:flex-col lg:px-2">
      ${moveBtnHtml('Move all to palette', 'primary', svgChevronsRight)}
      ${moveBtnHtml('Add pigment', 'accent', svgChevronRight, true)}
      ${moveBtnHtml('Return pigment', 'secondary', svgChevronLeft, true)}
      ${moveBtnHtml('Clear palette', 'neutral', svgChevronsLeft)}
    </div>
    ${transferColumnHtml({ title: 'Palette', items: pigmentPool.slice(4), emptyLabel: 'Palette waiting for pigment' })}
  </div>
</div>`

const statesHtml = `<div class="space-y-6">
  <div class="space-y-3">
    <p class="text-sm font-medium">Disabled controls</p>
    <div class="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
      ${transferColumnHtml({ title: 'Source', items: lockedItems, emptyLabel: 'Empty', disabled: true })}
      <div class="join join-horizontal justify-center md:join-vertical md:px-1">
        ${moveBtnHtml('Move right (disabled)', 'primary', svgChevronRight, true)}
        ${moveBtnHtml('Move left (disabled)', 'secondary', svgChevronLeft, true)}
      </div>
      ${transferColumnHtml({ title: 'Target', items: [], emptyLabel: 'Transfer locked', disabled: true })}
    </div>
  </div>
  <div class="space-y-3">
    <p class="text-sm font-medium">Empty selected side</p>
    <div class="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
      ${transferColumnHtml({ title: 'Available', items: lockedItems, emptyLabel: 'Nothing available' })}
      <div class="join join-horizontal justify-center md:join-vertical md:px-1">
        ${moveBtnHtml('Move to selected', 'primary', svgChevronRight, true)}
        ${moveBtnHtml('Move to available', 'secondary', svgChevronLeft, true)}
      </div>
      ${transferColumnHtml({ title: 'Selected', items: [], emptyLabel: 'No items yet' })}
    </div>
  </div>
</div>`

const responsiveHtml = `<div class="space-y-3">
  <p class="mb-3 text-sm text-ink-muted">Resize the viewport below the <span class="font-mono text-xs">md</span> breakpoint to see the stacked layout. The basic transfer above already uses this pattern.</p>
  <div class="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
    ${transferColumnHtml({ title: 'Available', items: basicPool, emptyLabel: 'Nothing left to pick' })}
    <div class="join join-horizontal justify-center md:join-vertical md:px-1">
      ${moveBtnHtml('Move to selected', 'primary', svgChevronRight, true)}
      ${moveBtnHtml('Move to available', 'secondary', svgChevronLeft, true)}
    </div>
    ${transferColumnHtml({ title: 'Selected', items: [], emptyLabel: 'Select plates to add' })}
  </div>
</div>`


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
    <code className="font-mono text-[0.65rem] text-ink-muted">{value}</code>
  )
}

function MoveButton({
  label,
  color,
  disabled,
  onClick,
  children,
}: {
  label: string
  color: 'primary' | 'secondary' | 'accent' | 'neutral'
  disabled?: boolean
  onClick: () => void
  children: ReactNode
}) {
  const tipColor = `tooltip-${color}`
  const btnColor = `btn-${color}`

  return (
    <div className={`tooltip tooltip-right ${tipColor}`} data-tip={label}>
      <button
        type="button"
        className={`btn btn-square btn-sm cursor-pointer ${btnColor} ${
          disabled ? 'btn-disabled cursor-not-allowed' : ''
        }`}
        aria-label={label}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  )
}

function TransferColumn({
  title,
  count,
  items,
  selectedIds,
  onToggle,
  emptyLabel,
  search,
  onSearchChange,
  searchPlaceholder,
  disabled,
}: {
  title: string
  count: number
  items: TransferItem[]
  selectedIds: Set<string>
  onToggle: (id: string) => void
  emptyLabel: string
  search?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  disabled?: boolean
}) {
  return (
    <div
      className={`flex min-h-64 flex-1 flex-col overflow-hidden rounded-box border border-ink-border bg-base-100/80 ${
        disabled ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-center justify-between border-b border-ink-border/70 px-3 py-2">
        <span className="text-sm font-semibold">{title}</span>
        <span className="badge badge-ghost badge-sm tabular-nums">{count}</span>
      </div>

      {onSearchChange != null && (
        <label className="input input-sm m-2 cursor-text border-ink-border bg-base-100">
          <Search className="size-3.5 text-base-content/60" strokeWidth={2} />
          <input
            type="search"
            className="cursor-text grow"
            placeholder={searchPlaceholder ?? 'Filter…'}
            value={search ?? ''}
            disabled={disabled}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label={`${title} filter`}
          />
        </label>
      )}

      <ul className="menu menu-sm flex-1 overflow-y-auto p-2" role="listbox" aria-label={title} aria-multiselectable="true">
        {items.length === 0 ? (
          <li className="disabled">
            <span className="justify-center text-ink-muted">{emptyLabel}</span>
          </li>
        ) : (
          items.map((item) => {
            const isSelected = selectedIds.has(item.id)
            return (
              <li key={item.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={disabled}
                  className={`cursor-pointer ${isSelected ? 'active' : ''} ${
                    disabled ? 'cursor-not-allowed' : ''
                  }`}
                  onClick={() => onToggle(item.id)}
                >
                  <span className="list-col-grow">
                    <span className="font-medium">{item.label}</span>
                    {item.hint ? (
                      <span className="block text-xs font-normal text-ink-muted">
                        {item.hint}
                      </span>
                    ) : null}
                  </span>
                </button>
              </li>
            )
          })
        )}
      </ul>
    </div>
  )
}

function useTransfer(initialLeft: TransferItem[], initialRight: TransferItem[] = []) {
  const [left, setLeft] = useState(initialLeft)
  const [right, setRight] = useState(initialRight)
  const [leftSel, setLeftSel] = useState<Set<string>>(new Set())
  const [rightSel, setRightSel] = useState<Set<string>>(new Set())

  function toggle(side: 'left' | 'right', id: string) {
    const setter = side === 'left' ? setLeftSel : setRightSel
    setter((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function moveToRight() {
    const moving = left.filter((i) => leftSel.has(i.id))
    if (moving.length === 0) return
    setLeft((prev) => prev.filter((i) => !leftSel.has(i.id)))
    setRight((prev) => [...prev, ...moving])
    setLeftSel(new Set())
  }

  function moveToLeft() {
    const moving = right.filter((i) => rightSel.has(i.id))
    if (moving.length === 0) return
    setRight((prev) => prev.filter((i) => !rightSel.has(i.id)))
    setLeft((prev) => [...prev, ...moving])
    setRightSel(new Set())
  }

  function moveAllRight() {
    if (left.length === 0) return
    setRight((prev) => [...prev, ...left])
    setLeft([])
    setLeftSel(new Set())
  }

  function moveAllLeft() {
    if (right.length === 0) return
    setLeft((prev) => [...prev, ...right])
    setRight([])
    setRightSel(new Set())
  }

  return {
    left,
    right,
    leftSel,
    rightSel,
    toggle,
    moveToRight,
    moveToLeft,
    moveAllRight,
    moveAllLeft,
  }
}

function BasicTransfer() {
  const t = useTransfer(basicPool, [])

  return (
    <div className="space-y-3">
      <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
        <TransferColumn
          title="Available"
          count={t.left.length}
          items={t.left}
          selectedIds={t.leftSel}
          onToggle={(id) => t.toggle('left', id)}
          emptyLabel="Nothing left to pick"
        />

        <div className="join join-horizontal justify-center md:join-vertical md:px-1">
          <MoveButton
            label="Move to selected"
            color="primary"
            disabled={t.leftSel.size === 0}
            onClick={t.moveToRight}
          >
            <ChevronRight className="size-4" strokeWidth={2} />
          </MoveButton>
          <MoveButton
            label="Move to available"
            color="secondary"
            disabled={t.rightSel.size === 0}
            onClick={t.moveToLeft}
          >
            <ChevronLeft className="size-4" strokeWidth={2} />
          </MoveButton>
        </div>

        <TransferColumn
          title="Selected"
          count={t.right.length}
          items={t.right}
          selectedIds={t.rightSel}
          onToggle={(id) => t.toggle('right', id)}
          emptyLabel="Select plates to add"
        />
      </div>
      <ClassLabel value="menu + btn join (composed transfer)" />
    </div>
  )
}

function MoveAllTransfer() {
  const t = useTransfer(moveAllPool, [])

  return (
    <div className="space-y-3">
      <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
        <TransferColumn
          title="Pool"
          count={t.left.length}
          items={t.left}
          selectedIds={t.leftSel}
          onToggle={(id) => t.toggle('left', id)}
          emptyLabel="Pool is empty"
        />

        <div className="flex flex-row justify-center gap-1 md:flex-col md:px-1">
          <MoveButton
            label="Move all right"
            color="primary"
            disabled={t.left.length === 0}
            onClick={t.moveAllRight}
          >
            <ChevronsRight className="size-4" strokeWidth={2} />
          </MoveButton>
          <MoveButton
            label="Move selected right"
            color="accent"
            disabled={t.leftSel.size === 0}
            onClick={t.moveToRight}
          >
            <ChevronRight className="size-4" strokeWidth={2} />
          </MoveButton>
          <MoveButton
            label="Move selected left"
            color="secondary"
            disabled={t.rightSel.size === 0}
            onClick={t.moveToLeft}
          >
            <ChevronLeft className="size-4" strokeWidth={2} />
          </MoveButton>
          <MoveButton
            label="Clear all to pool"
            color="neutral"
            disabled={t.right.length === 0}
            onClick={t.moveAllLeft}
          >
            <ChevronsLeft className="size-4" strokeWidth={2} />
          </MoveButton>
        </div>

        <TransferColumn
          title="Active set"
          count={t.right.length}
          items={t.right}
          selectedIds={t.rightSel}
          onToggle={(id) => t.toggle('right', id)}
          emptyLabel="No washes chosen"
        />
      </div>
      <ClassLabel value="ChevronsLeft / ChevronsRight move-all" />
    </div>
  )
}

function SearchTransfer() {
  const t = useTransfer(searchPool.slice(0, 5), searchPool.slice(5))
  const [leftQuery, setLeftQuery] = useState('')
  const [rightQuery, setRightQuery] = useState('')

  const leftFiltered = useMemo(() => {
    const q = leftQuery.trim().toLowerCase()
    if (!q) return t.left
    return t.left.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        (i.hint?.toLowerCase().includes(q) ?? false),
    )
  }, [t.left, leftQuery])

  const rightFiltered = useMemo(() => {
    const q = rightQuery.trim().toLowerCase()
    if (!q) return t.right
    return t.right.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        (i.hint?.toLowerCase().includes(q) ?? false),
    )
  }, [t.right, rightQuery])

  return (
    <div className="space-y-3">
      <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
        <TransferColumn
          title="Catalog"
          count={leftFiltered.length}
          items={leftFiltered}
          selectedIds={t.leftSel}
          onToggle={(id) => t.toggle('left', id)}
          emptyLabel="No matches"
          search={leftQuery}
          onSearchChange={setLeftQuery}
          searchPlaceholder="Filter catalog…"
        />

        <div className="join join-horizontal justify-center md:join-vertical md:px-1">
          <MoveButton
            label="Add to tray"
            color="primary"
            disabled={t.leftSel.size === 0}
            onClick={t.moveToRight}
          >
            <ChevronRight className="size-4" strokeWidth={2} />
          </MoveButton>
          <MoveButton
            label="Return to catalog"
            color="secondary"
            disabled={t.rightSel.size === 0}
            onClick={t.moveToLeft}
          >
            <ChevronLeft className="size-4" strokeWidth={2} />
          </MoveButton>
        </div>

        <TransferColumn
          title="Tray"
          count={rightFiltered.length}
          items={rightFiltered}
          selectedIds={t.rightSel}
          onToggle={(id) => t.toggle('right', id)}
          emptyLabel="Tray is empty"
          search={rightQuery}
          onSearchChange={setRightQuery}
          searchPlaceholder="Filter tray…"
        />
      </div>
      <ClassLabel value="input + menu filter per side" />
    </div>
  )
}

function StudioPigmentsTransfer() {
  const t = useTransfer(pigmentPool.slice(0, 4), pigmentPool.slice(4))

  return (
    <div className="space-y-3">
      <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
        <TransferColumn
          title="Drawer"
          count={t.left.length}
          items={t.left}
          selectedIds={t.leftSel}
          onToggle={(id) => t.toggle('left', id)}
          emptyLabel="Drawer is empty"
        />

        <div className="flex flex-row flex-wrap items-center justify-center gap-2 lg:flex-col lg:px-2">
          <MoveButton
            label="Move all to palette"
            color="primary"
            disabled={t.left.length === 0}
            onClick={t.moveAllRight}
          >
            <ChevronsRight className="size-4" strokeWidth={2} />
          </MoveButton>
          <MoveButton
            label="Add pigment"
            color="accent"
            disabled={t.leftSel.size === 0}
            onClick={t.moveToRight}
          >
            <ChevronRight className="size-4" strokeWidth={2} />
          </MoveButton>
          <MoveButton
            label="Return pigment"
            color="secondary"
            disabled={t.rightSel.size === 0}
            onClick={t.moveToLeft}
          >
            <ChevronLeft className="size-4" strokeWidth={2} />
          </MoveButton>
          <MoveButton
            label="Clear palette"
            color="neutral"
            disabled={t.right.length === 0}
            onClick={t.moveAllLeft}
          >
            <ChevronsLeft className="size-4" strokeWidth={2} />
          </MoveButton>
        </div>

        <TransferColumn
          title="Palette"
          count={t.right.length}
          items={t.right}
          selectedIds={t.rightSel}
          onToggle={(id) => t.toggle('right', id)}
          emptyLabel="Palette waiting for pigment"
        />
      </div>
      <ClassLabel value="wash-panel studio pigment transfer" />
    </div>
  )
}

function DisabledEmptyTransfer() {
  const emptyRight = useTransfer(
    [
      { id: 'd1', label: 'Locked wash A' },
      { id: 'd2', label: 'Locked wash B' },
    ],
    [],
  )

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-medium">Disabled controls</p>
        <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
          <TransferColumn
            title="Source"
            count={emptyRight.left.length}
            items={emptyRight.left}
            selectedIds={emptyRight.leftSel}
            onToggle={(id) => emptyRight.toggle('left', id)}
            emptyLabel="Empty"
            disabled
          />
          <div className="join join-horizontal justify-center md:join-vertical md:px-1">
            <MoveButton
              label="Move right (disabled)"
              color="primary"
              disabled
              onClick={() => {}}
            >
              <ChevronRight className="size-4" strokeWidth={2} />
            </MoveButton>
            <MoveButton
              label="Move left (disabled)"
              color="secondary"
              disabled
              onClick={() => {}}
            >
              <ChevronLeft className="size-4" strokeWidth={2} />
            </MoveButton>
          </div>
          <TransferColumn
            title="Target"
            count={0}
            items={[]}
            selectedIds={new Set()}
            onToggle={() => {}}
            emptyLabel="Transfer locked"
            disabled
          />
        </div>
        <ClassLabel value="btn-disabled + menu disabled" />
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium">Empty selected side</p>
        <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
          <TransferColumn
            title="Available"
            count={emptyRight.left.length}
            items={emptyRight.left}
            selectedIds={emptyRight.leftSel}
            onToggle={(id) => emptyRight.toggle('left', id)}
            emptyLabel="Nothing available"
          />
          <div className="join join-horizontal justify-center md:join-vertical md:px-1">
            <MoveButton
              label="Move to selected"
              color="primary"
              disabled={emptyRight.leftSel.size === 0}
              onClick={emptyRight.moveToRight}
            >
              <ChevronRight className="size-4" strokeWidth={2} />
            </MoveButton>
            <MoveButton
              label="Move to available"
              color="secondary"
              disabled={emptyRight.rightSel.size === 0}
              onClick={emptyRight.moveToLeft}
            >
              <ChevronLeft className="size-4" strokeWidth={2} />
            </MoveButton>
          </div>
          <TransferColumn
            title="Selected"
            count={emptyRight.right.length}
            items={emptyRight.right}
            selectedIds={emptyRight.rightSel}
            onToggle={(id) => emptyRight.toggle('right', id)}
            emptyLabel="No items yet"
          />
        </div>
        <ClassLabel value="empty list placeholder row" />
      </div>
    </div>
  )
}

export default function TransferListPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Transfer list
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Dual listboxes composed from daisyUI{' '}
          <span className="font-mono text-xs">menu</span>,{' '}
          <span className="font-mono text-xs">btn</span>, and{' '}
          <span className="font-mono text-xs">join</span>.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Available and selected"
          description="Click rows to mark them, then move with the center controls"
        >
          <ShowcaseTabs
            preview={
              <>
                <BasicTransfer />
              </>
            }
            html={basicHtml}
            jsx={toJsxMarkup(basicHtml)}
          />
        </Section>

        <Section
          eyebrow="02 · Move all"
          title="Bulk transfer and clear"
          description="Double chevrons move every item"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <MoveAllTransfer />
              </>
            }
            html={moveAllHtml}
            jsx={toJsxMarkup(moveAllHtml)}
          />
        </Section>

        <Section
          eyebrow="03 · Search"
          title="Filter each side"
          description="Narrow the catalog or tray without losing unselected items"
        >
          <ShowcaseTabs
            preview={
              <>
                <SearchTransfer />
              </>
            }
            html={searchHtml}
            jsx={toJsxMarkup(searchHtml)}
          />
        </Section>

        <Section
          eyebrow="04 · Studio"
          title="Drawer and palette"
          description="Transfer pigments between the studio drawer and the working palette"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <StudioPigmentsTransfer />
              </>
            }
            html={studioHtml}
            jsx={toJsxMarkup(studioHtml)}
          />
        </Section>

        <Section
          eyebrow="05 · States"
          title="Disabled and empty"
          description="Locked transfers and empty-column placeholders stay readable"
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <>
                <DisabledEmptyTransfer />
              </>
            }
            html={statesHtml}
            jsx={toJsxMarkup(statesHtml)}
          />
        </Section>

        <Section
          eyebrow="06 · Responsive"
          title="Stack on small screens"
          description="Columns stack vertically on mobile"
        >
          <ShowcaseTabs
            preview={
              <>
                <p className="mb-3 text-sm text-ink-muted">
                            Resize the viewport below the{' '}
                            <span className="font-mono text-xs">md</span> breakpoint to see the
                            stacked layout. The basic transfer above already uses this pattern.
                          </p>
                          <BasicTransfer />
                          <div className="mt-3">
                            <ClassLabel value="flex-col md:flex-row" />
                          </div>
              </>
            }
            html={responsiveHtml}
            jsx={toJsxMarkup(responsiveHtml)}
          />
        </Section>
      </div>
    </>
  )
}
