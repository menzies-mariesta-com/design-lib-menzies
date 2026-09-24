import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import {
  SearchSelect,
  dropdownPlacementClassName,
  useDropdownPlacement,
  type DropdownPlacement,
} from '#plain'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  behaviourDropdownHtml,
  behaviourDropdownJsx,
  behaviourDropdownSvelteFiles,
} from './snippets/svelte/behaviour-dropdown'

const pigmentOptions = [
  'Ultramarine',
  'Yellow ochre',
  'Alizarin crimson',
  'Viridian',
  'Burnt sienna',
  'Cobalt blue',
  'Cerulean',
  'Quinacridone rose',
] as const

function ClassLabel({ value }: { value: string }) {
  return (
    <code className="font-mono text-[0.65rem] text-ink-muted">{value}</code>
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
    <div className={`flex w-full max-w-sm flex-col gap-2 ${className}`}>
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

function PlacementReadout({ placement }: { placement: DropdownPlacement }) {
  return (
    <p className="font-mono text-xs text-ink-muted">
      Opens:{' '}
      <span className="font-semibold text-ink">
        {placement.top ? 'top' : 'bottom'}
      </span>
      {placement.end ? (
        <>
          {' '}
          · <span className="font-semibold text-ink">end</span>
        </>
      ) : null}{' '}
      · maxH {placement.maxHeight}px
    </p>
  )
}

function EdgeDropdownDemo({
  edge,
  label,
}: {
  edge: 'top' | 'bottom'
  label: string
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const placement = useDropdownPlacement(rootRef, open, {
    panelWidth: 288,
    panelHeight: 280,
  })

  useEffect(() => {
    if (!open) return

    function onPointerDown(event: PointerEvent) {
      const el = rootRef.current
      if (!el) return
      if (event.target instanceof Node && !el.contains(event.target)) {
        setOpen(false)
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <ClassLabel value={label} />
      <PlacementReadout placement={placement} />
      <p className="text-xs text-ink-muted">
        {edge === 'bottom'
          ? 'Little room below, so the menu flips up when open'
          : 'Room below, so the menu stays bottom (default)'}
      </p>
      <div
        ref={rootRef}
        className={dropdownPlacementClassName(
          placement,
          `dropdown-no-hover w-full ${open ? 'dropdown-open' : ''}`,
        )}
      >
        <button
          type="button"
          className="btn btn-primary w-full cursor-pointer justify-between font-normal"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          Open near {edge}
        </button>
        {open ? (
          <ul
            className={`dropdown-content menu z-50 w-full rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)] ${
              placement.top ? 'mb-1' : 'mt-1'
            }`}
            style={
              {
                maxHeight: placement.maxHeight,
                '--wash-dropdown-max-h': `${placement.maxHeight}px`,
              } as CSSProperties
            }
          >
            {pigmentOptions.map((name) => (
              <li key={name}>
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

export default function BehaviourAutoDropdownPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Behaviour gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Space aware dropdown
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Search selects and filter menus measure free space in the viewport,
          then open below by default or flip above when the bottom edge is tight.
          Panel height is capped so the list scrolls instead of overflowing the page.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · See it in one glance"
          title="Bottom when it fits. Top when it does not."
          description="Two triggers in a tall frame: one near the top edge, one near the bottom. Open each and watch the side flip from free space, not from a fixed class."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex min-h-[22rem] w-full flex-col justify-between gap-8 rounded-box border border-dashed border-ink-border/80 bg-base-100 px-3 py-4 sm:px-4">
                  <EdgeDropdownDemo edge="top" label="Near top of frame" />
                  <EdgeDropdownDemo edge="bottom" label="Near bottom of frame" />
                </div>
                <p className="mt-3 text-xs text-ink-muted">
                  Tip: resize the window or scroll the page while open. Placement
                  re-measures on resize and scroll.
                </p>
              </>
            }
          
            html={behaviourDropdownHtml}
            jsx={behaviourDropdownJsx}
            svelteFiles={behaviourDropdownSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Search select"
          title="Shared SearchSelect uses the same rule"
          description="Open this near the page footer (or shrink the window) to force a top flip. When both sides are tight, maxHeight shrinks and the menu scrolls inside. Comboboxes use dropdown-no-hover (see Dropdown on hover)."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-8">
                  <Sample label="SearchSelect (auto placement)">
                    <SearchSelect
                      options={pigmentOptions}
                      label="Wash medium"
                      placeholder="Search mediums…"
                    />
                    <p className="text-xs text-ink-muted">
                      Bottom default; flips top when space below is short
                    </p>
                  </Sample>
                </div>
              </>
            }
          
            html={behaviourDropdownHtml}
            jsx={behaviourDropdownJsx}
            svelteFiles={behaviourDropdownSvelteFiles}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · How it decides"
          title="Viewport free space, then cap height"
          description="Data table date filters use the same helper via useDetailsDropdownPlacement."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="rounded-box border border-ink-border/70 bg-base-200/50 px-4 py-3 text-sm text-ink-muted">
                <ol className="list-decimal space-y-2 pl-5">
                  <li>
                    Measure the trigger with{' '}
                    <span className="font-mono text-xs">getBoundingClientRect()</span>.
                  </li>
                  <li>
                    Free below is viewport bottom minus trigger bottom. Free above
                    is trigger top. Prefer bottom when below meets a minimum height.
                  </li>
                  <li>
                    Flip to{' '}
                    <span className="font-mono text-xs">dropdown-top</span> only
                    when below is too tight and above has more room.
                  </li>
                  <li>
                    Set panel{' '}
                    <span className="font-mono text-xs">maxHeight</span> to the
                    chosen side so the list scrolls inside the viewport.
                  </li>
                </ol>
                <p className="mt-3">
                  Horizontal:{' '}
                  <span className="font-mono text-xs">dropdown-end</span> when
                  the trigger sits near the right edge.
                </p>
              </div>
            }
          
            html={behaviourDropdownHtml}
            jsx={behaviourDropdownJsx}
            svelteFiles={behaviourDropdownSvelteFiles}
          />
        </GallerySection>
      </div>
    </>
  )
}
