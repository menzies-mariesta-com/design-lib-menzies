import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'
import {
  Copy,
  Eye,
  Layers,
  Lock,
  Maximize2,
  Minimize2,
  MoreHorizontal,
  Palette,
  Pin,
  Settings2,
  X,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import {
  FloatingPanel,
  floatingDemoFrameClass,
} from './FloatingPanel'

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
        <h2 className="font-display text-xl font-semibold md:text-2xl">
          {title}
        </h2>
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

function DemoCanvas({ children }: { children: ReactNode }) {
  return (
    <div className="pointer-events-none absolute inset-0 p-4 sm:p-6">
      <div className="h-full rounded-box border border-dashed border-ink-border/50 bg-base-100/40 p-4">
        <p className="label-ink">Canvas</p>
        <p className="mt-2 max-w-xs text-sm text-ink-muted">{children}</p>
      </div>
    </div>
  )
}

function BasicFloatingDemo() {
  const frameRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(true)
  const [placed, setPlaced] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const width = 260
    const place = () =>
      setPlaced({
        x: Math.max(12, frame.clientWidth - width - 16),
        y: 16,
      })
    place()
    const ro = new ResizeObserver(place)
    ro.observe(frame)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={frameRef} className={floatingDemoFrameClass}>
      <DemoCanvas>
        Sketch area behind a wash panel. Toggle the panel, or press Esc when it
        is open.
      </DemoCanvas>

      {open && placed ? (
        <FloatingPanel
          title="Notes"
          boundsRef={frameRef}
          defaultRect={{ x: placed.x, y: placed.y, width: 260, height: 168 }}
          draggable={false}
          resizable={false}
          onClose={() => setOpen(false)}
        >
          <p className="text-ink-muted">
            Absolute within the frame. Soft wash edge, no modal lock.
          </p>
          <p className="mt-2 text-xs text-ink-muted">
            Esc closes this panel. Drag and resize are off for the basic demo.
          </p>
        </FloatingPanel>
      ) : null}

      {!open ? (
        <button
          type="button"
          className="btn btn-sm absolute right-3 top-3 z-10 cursor-pointer sm:right-5 sm:top-5"
          onClick={() => setOpen(true)}
        >
          Show panel
        </button>
      ) : null}
    </div>
  )
}

function DraggableResizableDemo() {
  const frameRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(true)
  const [live, setLive] = useState({ x: 24, y: 24, w: 300, h: 220 })

  return (
    <div ref={frameRef} className={floatingDemoFrameClass}>
      <DemoCanvas>
        Drag the title bar. Resize from edges or the bottom-right corner.
        Position and size stay clamped so the title bar remains reachable.
      </DemoCanvas>

      {open ? (
        <FloatingPanel
          title="Studio float"
          boundsRef={frameRef}
          defaultRect={{ x: 24, y: 24, width: 300, height: 220 }}
          minWidth={220}
          minHeight={140}
          showReset
          onClose={() => setOpen(false)}
          zIndex={20}
        >
          <p className="text-ink-muted">
            Title bar uses{' '}
            <span className="font-mono text-xs">cursor-grab</span> /{' '}
            <span className="font-mono text-xs">cursor-grabbing</span>. Content
            and action buttons do not start a drag.
          </p>
          <p className="mt-2 text-xs text-ink-muted">
            Reset restores the default rect. Esc closes.
          </p>
          <LiveRectProbe frameRef={frameRef} onChange={setLive} />
          <p className="mt-2 font-mono text-xs text-ink-muted">
            x:{Math.round(live.x)} y:{Math.round(live.y)} w:
            {Math.round(live.w)} h:{Math.round(live.h)}
          </p>
        </FloatingPanel>
      ) : (
        <button
          type="button"
          className="btn btn-sm absolute left-3 top-3 z-10 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Show panel
        </button>
      )}
    </div>
  )
}

/** Reads the floating panel box from the frame for the live HUD. */
function LiveRectProbe({
  frameRef,
  onChange,
}: {
  frameRef: RefObject<HTMLDivElement | null>
  onChange: (v: { x: number; y: number; w: number; h: number }) => void
}) {
  useEffect(() => {
    const node = frameRef.current
    if (!node) return
    const frameEl: HTMLDivElement = node

    function sample() {
      const panel = frameEl.querySelector(
        '.floating-panel',
      ) as HTMLElement | null
      if (!panel) return
      onChange({
        x: panel.offsetLeft,
        y: panel.offsetTop,
        w: panel.offsetWidth,
        h: panel.offsetHeight,
      })
    }

    sample()
    const ro = new ResizeObserver(sample)
    ro.observe(frameEl)
    frameEl.addEventListener('pointermove', sample)
    frameEl.addEventListener('pointerup', sample)
    return () => {
      ro.disconnect()
      frameEl.removeEventListener('pointermove', sample)
      frameEl.removeEventListener('pointerup', sample)
    }
  }, [frameRef, onChange])

  return null
}

function ActionsFloatingDemo() {
  const frameRef = useRef<HTMLDivElement>(null)
  const [pinned, setPinned] = useState(true)
  const [visible, setVisible] = useState(true)
  const [open, setOpen] = useState(true)

  return (
    <div ref={frameRef} className={floatingDemoFrameClass}>
      <DemoCanvas>
        Inspector chrome with icon actions. Tooltips match button color. Drag
        still works from the title; buttons use no-drag.
      </DemoCanvas>

      {open ? (
        <FloatingPanel
          title="Wash tools"
          boundsRef={frameRef}
          defaultRect={{ x: 16, y: 16, width: 280, height: 200 }}
          showReset
          onClose={() => setOpen(false)}
          actions={
            <>
              <div
                className={`tooltip tooltip-bottom ${
                  pinned ? 'tooltip-primary' : 'tooltip-secondary'
                }`}
                data-tip={pinned ? 'Unpin' : 'Pin'}
              >
                <button
                  type="button"
                  className={`btn btn-ghost btn-square btn-xs cursor-pointer ${
                    pinned ? 'btn-primary' : 'btn-secondary'
                  }`}
                  aria-label={pinned ? 'Unpin' : 'Pin'}
                  aria-pressed={pinned}
                  onClick={() => setPinned((v) => !v)}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <Pin className="size-3.5" strokeWidth={2} />
                </button>
              </div>
              <div
                className={`tooltip tooltip-bottom ${
                  visible ? 'tooltip-primary' : ''
                }`}
                data-tip={visible ? 'Hide' : 'Show'}
              >
                <button
                  type="button"
                  className={`btn btn-ghost btn-square btn-xs cursor-pointer ${
                    visible ? 'btn-primary' : ''
                  }`}
                  aria-label={visible ? 'Hide' : 'Show'}
                  aria-pressed={visible}
                  onClick={() => setVisible((v) => !v)}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <Eye className="size-3.5" strokeWidth={2} />
                </button>
              </div>
              <div
                className="tooltip tooltip-bottom tooltip-secondary"
                data-tip="More"
              >
                <button
                  type="button"
                  className="btn btn-ghost btn-square btn-secondary btn-xs cursor-pointer"
                  aria-label="More"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="size-3.5" strokeWidth={2} />
                </button>
              </div>
            </>
          }
        >
          <ul className="space-y-1.5 text-ink-muted">
            <li className="flex items-center justify-between gap-2">
              <span>Pinned</span>
              <span className="font-mono text-xs">{pinned ? 'yes' : 'no'}</span>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span>Preview</span>
              <span className="font-mono text-xs">
                {visible ? 'on' : 'off'}
              </span>
            </li>
          </ul>
        </FloatingPanel>
      ) : (
        <button
          type="button"
          className="btn btn-sm absolute left-3 top-3 z-10 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Show panel
        </button>
      )}
    </div>
  )
}

function AnchoredPopoverDemo() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className={`${floatingDemoFrameClass} flex items-center justify-center`}>
      <div ref={rootRef} className="relative">
        <button
          type="button"
          className="btn btn-primary cursor-pointer gap-2"
          aria-expanded={open}
          aria-haspopup="dialog"
          onClick={() => setOpen((v) => !v)}
        >
          <Palette className="size-4" strokeWidth={2} />
          Pigment tip
        </button>

        {open ? (
          <div
            className="absolute left-1/2 top-full z-20 mt-2 w-[min(calc(100vw-3rem),16rem)] -translate-x-1/2 sm:left-full sm:top-0 sm:mt-0 sm:ml-3 sm:translate-x-0"
            role="dialog"
            aria-label="Pigment tip"
          >
            <div className="wash-panel wash-panel-ochre paper-grain shadow-lg">
              <div className="flex items-center justify-between border-b border-ink-border/70 px-3 py-2">
                <p className="text-sm font-semibold">Cadmium note</p>
                <div
                  className="tooltip tooltip-left tooltip-error"
                  data-tip="Close"
                >
                  <button
                    type="button"
                    className="btn btn-ghost btn-square btn-error btn-xs cursor-pointer"
                    aria-label="Close"
                    onClick={() => setOpen(false)}
                  >
                    <X className="size-3.5" strokeWidth={2} />
                  </button>
                </div>
              </div>
              <p className="p-3 text-sm text-ink-muted">
                Anchored beside the trigger on larger screens; stacks under the
                button on narrow frames. Esc or outside click dismisses. Not a
                full floating window.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function StudioInspectorDemo() {
  const frameRef = useRef<HTMLDivElement>(null)
  const [opacity, setOpacity] = useState(72)
  const [blend, setBlend] = useState('multiply')
  const [locked, setLocked] = useState(false)
  const [open, setOpen] = useState(true)

  return (
    <div ref={frameRef} className={`${floatingDemoFrameClass} sm:h-96`}>
      <DemoCanvas>
        Studio canvas with a pigment inspector. Same floating primitive:
        drag, resize, focus, Esc.
      </DemoCanvas>

      {open ? (
        <FloatingPanel
          title="Layer properties"
          boundsRef={frameRef}
          defaultRect={{ x: 40, y: 48, width: 280, height: 300 }}
          minWidth={240}
          minHeight={220}
          showReset
          panelClassName="wash-panel-rose"
          onClose={() => setOpen(false)}
          actions={
            <>
              <div
                className="tooltip tooltip-bottom tooltip-secondary"
                data-tip="Settings"
              >
                <button
                  type="button"
                  className="btn btn-ghost btn-square btn-secondary btn-xs cursor-pointer"
                  aria-label="Settings"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <Settings2 className="size-3.5" strokeWidth={2} />
                </button>
              </div>
              <div
                className={`tooltip tooltip-bottom ${
                  locked ? 'tooltip-warning' : 'tooltip-secondary'
                }`}
                data-tip={locked ? 'Unlock' : 'Lock'}
              >
                <button
                  type="button"
                  className={`btn btn-ghost btn-square btn-xs cursor-pointer ${
                    locked ? 'btn-warning' : 'btn-secondary'
                  }`}
                  aria-label={locked ? 'Unlock' : 'Lock'}
                  aria-pressed={locked}
                  onClick={() => setLocked((v) => !v)}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <Lock className="size-3.5" strokeWidth={2} />
                </button>
              </div>
            </>
          }
        >
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-ink-muted">
              <Layers className="size-4 shrink-0" strokeWidth={2} aria-hidden />
              <span className="text-xs">Menzies Design layer sheet</span>
            </div>

            <label className="form-control w-full">
              <span className="label-text mb-1 text-xs">Name</span>
              <input
                className="input input-sm input-bordered w-full cursor-text"
                defaultValue="Wash · ultramarine"
                disabled={locked}
              />
            </label>

            <label className="form-control w-full">
              <div className="mb-1 flex items-center justify-between">
                <span className="label-text text-xs">Opacity</span>
                <span className="font-mono text-xs text-ink-muted">
                  {opacity}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={opacity}
                disabled={locked}
                className={`range range-xs range-primary ${
                  locked ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                aria-label="Opacity"
                onChange={(e) => setOpacity(Number(e.target.value))}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-1 text-xs">Blend</span>
              <select
                className="select select-sm select-bordered w-full cursor-pointer"
                value={blend}
                disabled={locked}
                onChange={(e) => setBlend(e.target.value)}
              >
                <option value="normal">Normal</option>
                <option value="multiply">Multiply</option>
                <option value="screen">Screen</option>
                <option value="overlay">Overlay</option>
              </select>
            </label>

            <div className="flex items-center gap-2">
              <span
                className="size-8 rounded-box border border-ink-border bg-wash-blue"
                style={{ opacity: opacity / 100 }}
                aria-hidden
              />
              <p className="text-xs text-ink-muted">
                Live glaze preview for the active wash layer.
              </p>
            </div>
          </div>
        </FloatingPanel>
      ) : (
        <button
          type="button"
          className="btn btn-sm absolute bottom-3 right-3 z-10 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Open inspector
        </button>
      )}
    </div>
  )
}

type StackId = 'notes' | 'layers' | 'copy'

function StackingDemo() {
  const frameRef = useRef<HTMLDivElement>(null)
  const [zOrder, setZOrder] = useState<StackId[]>(['notes', 'copy', 'layers'])
  const [open, setOpen] = useState<Record<StackId, boolean>>({
    notes: true,
    layers: true,
    copy: true,
  })

  const raise = useCallback((id: StackId) => {
    setZOrder((prev) => [...prev.filter((x) => x !== id), id])
  }, [])

  const zOf = (id: StackId) => 10 + zOrder.indexOf(id)
  const topId = [...zOrder].reverse().find((id) => open[id]) ?? null

  const reopenAll = () =>
    setOpen({ notes: true, layers: true, copy: true })

  return (
    <div ref={frameRef} className={floatingDemoFrameClass}>
      <DemoCanvas>
        Each panel is draggable and resizable. Click to raise. Esc closes the
        focused panel.
      </DemoCanvas>

      {!open.notes && !open.layers && !open.copy ? (
        <button
          type="button"
          className="btn btn-sm absolute left-3 top-3 z-40 cursor-pointer"
          onClick={reopenAll}
        >
          Restore panels
        </button>
      ) : null}

      {open.notes ? (
        <FloatingPanel
          title="Notes"
          boundsRef={frameRef}
          defaultRect={{ x: 12, y: 12, width: 200, height: 140 }}
          minWidth={160}
          minHeight={100}
          zIndex={zOf('notes')}
          closeOnEscape={topId === 'notes'}
          onFocus={() => raise('notes')}
          onClose={() => setOpen((p) => ({ ...p, notes: false }))}
        >
          <p className="text-xs text-ink-muted">z-{zOf('notes')}</p>
        </FloatingPanel>
      ) : null}

      {open.layers ? (
        <FloatingPanel
          title="Layers"
          boundsRef={frameRef}
          defaultRect={{ x: 64, y: 48, width: 220, height: 150 }}
          minWidth={160}
          minHeight={100}
          zIndex={zOf('layers')}
          closeOnEscape={topId === 'layers'}
          panelClassName="wash-panel-ochre"
          onFocus={() => raise('layers')}
          onClose={() => setOpen((p) => ({ ...p, layers: false }))}
        >
          <p className="text-xs text-ink-muted">z-{zOf('layers')}</p>
        </FloatingPanel>
      ) : null}

      {open.copy ? (
        <FloatingPanel
          title="Reference"
          boundsRef={frameRef}
          defaultRect={{ x: 120, y: 96, width: 200, height: 140 }}
          minWidth={160}
          minHeight={100}
          zIndex={zOf('copy')}
          closeOnEscape={topId === 'copy'}
          panelClassName="wash-panel-rose"
          onFocus={() => raise('copy')}
          onClose={() => setOpen((p) => ({ ...p, copy: false }))}
          actions={
            <Copy
              className="mr-1 size-3.5 text-ink-muted"
              strokeWidth={2}
              aria-hidden
            />
          }
        >
          <p className="text-xs text-ink-muted">z-{zOf('copy')}</p>
        </FloatingPanel>
      ) : null}
    </div>
  )
}

function ResponsiveFloatingDemo() {
  const frameRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [docked, setDocked] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const sync = () => setDocked(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return (
    <div ref={frameRef} className={`${floatingDemoFrameClass} sm:h-96`}>
      <DemoCanvas>
        On small screens the panel docks full width at the bottom. From sm up
        it becomes a real floating window (drag + resize).
      </DemoCanvas>

      {docked ? (
        <div
          className={`absolute z-10 ${
            expanded
              ? 'inset-x-2 bottom-2'
              : 'inset-x-2 bottom-2'
          }`}
        >
          <div className="wash-panel paper-grain shadow-lg">
            <div className="flex items-center gap-1 border-b border-ink-border/70 px-2 py-1.5">
              <p className="min-w-0 flex-1 truncate px-1 text-sm font-semibold">
                Responsive panel
              </p>
              <div
                className="tooltip tooltip-left tooltip-secondary"
                data-tip={expanded ? 'Collapse' : 'Expand'}
              >
                <button
                  type="button"
                  className="btn btn-ghost btn-square btn-secondary btn-xs cursor-pointer"
                  aria-label={expanded ? 'Collapse' : 'Expand'}
                  onClick={() => setExpanded((v) => !v)}
                >
                  {expanded ? (
                    <Minimize2 className="size-3.5" strokeWidth={2} />
                  ) : (
                    <Maximize2 className="size-3.5" strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>
            <div className="p-3 text-sm text-ink-muted">
              <p>
                Mobile: bottom dock. Expand reveals more inspector fields.
              </p>
              {expanded ? (
                <ul className="mt-3 space-y-1 text-xs">
                  <li>Paper size: A3 cold press</li>
                  <li>Brush: round 8</li>
                  <li>Palette: limited primaries</li>
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <FloatingPanel
          title="Responsive panel"
          boundsRef={frameRef}
          defaultRect={{ x: 200, y: 80, width: expanded ? 300 : 240, height: expanded ? 220 : 160 }}
          minWidth={200}
          minHeight={120}
          showReset
          actions={
            <div
              className="tooltip tooltip-bottom tooltip-secondary"
              data-tip={expanded ? 'Collapse' : 'Expand'}
            >
              <button
                type="button"
                className="btn btn-ghost btn-square btn-secondary btn-xs cursor-pointer"
                aria-label={expanded ? 'Collapse' : 'Expand'}
                onClick={() => setExpanded((v) => !v)}
                onPointerDown={(e) => e.stopPropagation()}
              >
                {expanded ? (
                  <Minimize2 className="size-3.5" strokeWidth={2} />
                ) : (
                  <Maximize2 className="size-3.5" strokeWidth={2} />
                )}
              </button>
            </div>
          }
        >
          <p className="text-ink-muted">
            Desktop: corner float with drag and resize. Expand reveals extra
            fields.
          </p>
          {expanded ? (
            <ul className="mt-3 space-y-1 text-xs text-ink-muted">
              <li>Paper size: A3 cold press</li>
              <li>Brush: round 8</li>
              <li>Palette: limited primaries</li>
            </ul>
          ) : null}
        </FloatingPanel>
      )}
    </div>
  )
}

export default function FloatingPanelPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Floating panel
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Menzies Design wash-panel windows that float over the desk: open and
          close, title-bar drag, edge resize, stacking focus, anchored tips, a
          studio inspector, and responsive docking.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Fixed float over canvas"
          description="Wash-panel inside a demo frame. Esc dismisses when open. Drag and resize stay off for this plate."
        >
          <BasicFloatingDemo />
          <div className="mt-3">
            <ClassLabel value="FloatingPanel · draggable={false} · Escape dismiss" />
          </div>
        </Section>

        <Section
          eyebrow="02 · Draggable + resizable"
          title="Title-bar drag and edge resize"
          description="Grab the header to move. Resize from edges or corners. Pointer capture keeps interaction smooth; rect clamps so the title stays reachable."
          panel="wash-panel-ochre"
        >
          <DraggableResizableDemo />
          <div className="mt-3">
            <ClassLabel value="cursor-grab / resize handles / setPointerCapture / clamp" />
          </div>
        </Section>

        <Section
          eyebrow="03 · With actions"
          title="Header icon buttons"
          description="Pin, visibility, and overflow actions with matching daisyUI tooltips. Buttons are no-drag; the title bar still moves the window."
        >
          <ActionsFloatingDemo />
          <div className="mt-3">
            <ClassLabel value="tooltip + btn-ghost btn-square + data-no-drag" />
          </div>
        </Section>

        <Section
          eyebrow="04 · Anchored"
          title="Popover beside trigger"
          description="Opens next to a control. Outside click and Esc close. Lighter than a full floating window."
          panel="wash-panel-rose"
        >
          <AnchoredPopoverDemo />
          <div className="mt-3">
            <ClassLabel value="relative trigger + absolute panel + outside dismiss" />
          </div>
        </Section>

        <Section
          eyebrow="05 · Studio"
          title="Pigment inspector"
          description="Layer name, opacity, blend, and lock on the same FloatingPanel primitive used across Menzies Design."
        >
          <StudioInspectorDemo />
          <div className="mt-3">
            <ClassLabel value="FloatingPanel + wash-panel-rose + range + select + lock" />
          </div>
        </Section>

        <Section
          eyebrow="06 · Stacking"
          title="Raise on focus"
          description="Overlapping panels, each draggable and resizable. Click to bring forward. Esc closes the topmost open window."
          panel="wash-panel-ochre"
        >
          <StackingDemo />
          <div className="mt-3">
            <ClassLabel value="z-index stack + onFocus raise + Esc topmost" />
          </div>
        </Section>

        <Section
          eyebrow="07 · Responsive"
          title="Dock on small, float on large"
          description="Full-width bottom dock on mobile; real floating window from sm up."
        >
          <ResponsiveFloatingDemo />
          <div className="mt-3">
            <ClassLabel value="matchMedia dock → FloatingPanel from sm" />
          </div>
        </Section>
      </div>
    </>
  )
}
