import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from 'react'
import { GripHorizontal, RotateCcw, X } from '../icons'

export type FloatingPanelRect = {
  x: number
  y: number
  width: number
  height: number
}

type ResizeEdge = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw'

const TITLE_REACH = 48
const DEFAULT_MIN_W = 200
const DEFAULT_MIN_H = 120

/** Only the last-focused panel with closeOnEscape handles Escape. */
let escapeCloseToken: string | null = null

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function isNoDragTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false
  return Boolean(
    target.closest(
      'button, a, input, select, textarea, label, [data-no-drag], [role="button"]',
    ),
  )
}

function clampRect(
  next: FloatingPanelRect,
  bounds: { width: number; height: number },
  minWidth: number,
  minHeight: number,
): FloatingPanelRect {
  const width = Math.min(
    Math.max(minWidth, next.width),
    Math.max(minWidth, bounds.width),
  )
  const height = Math.min(
    Math.max(minHeight, next.height),
    Math.max(minHeight, bounds.height),
  )

  const maxX = Math.max(0, bounds.width - TITLE_REACH)
  const maxY = Math.max(0, bounds.height - TITLE_REACH)

  // Keep enough of the title bar inside the frame to grab / close.
  const xMin = -(width - TITLE_REACH)
  const x = Math.min(Math.max(next.x, xMin), maxX)
  const y = Math.min(Math.max(next.y, 0), maxY)

  return { x, y, width, height }
}

export type FloatingPanelProps = {
  title: string
  children: ReactNode
  open?: boolean
  onClose?: () => void
  onFocus?: () => void
  boundsRef?: RefObject<HTMLElement | null>
  defaultRect?: Partial<FloatingPanelRect>
  minWidth?: number
  minHeight?: number
  draggable?: boolean
  resizable?: boolean
  closeOnEscape?: boolean
  showReset?: boolean
  zIndex?: number
  actions?: ReactNode
  className?: string
  panelClassName?: string
  contentClassName?: string
  style?: CSSProperties
}

export function FloatingPanel({
  title,
  children,
  open = true,
  onClose,
  onFocus,
  boundsRef,
  defaultRect,
  minWidth = DEFAULT_MIN_W,
  minHeight = DEFAULT_MIN_H,
  draggable = true,
  resizable = true,
  closeOnEscape = true,
  showReset = false,
  zIndex = 10,
  actions,
  className = '',
  panelClassName = '',
  contentClassName = '',
  style,
}: FloatingPanelProps) {
  const titleId = useId()
  const panelToken = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  const interaction = useRef<
    | {
        kind: 'drag'
        pointerId: number
        startX: number
        startY: number
        orig: FloatingPanelRect
      }
    | {
        kind: 'resize'
        pointerId: number
        edge: ResizeEdge
        startX: number
        startY: number
        orig: FloatingPanelRect
      }
    | null
  >(null)

  const initial = useCallback((): FloatingPanelRect => {
    return {
      x: defaultRect?.x ?? 24,
      y: defaultRect?.y ?? 24,
      width: defaultRect?.width ?? 288,
      height: defaultRect?.height ?? 200,
    }
  }, [defaultRect?.x, defaultRect?.y, defaultRect?.width, defaultRect?.height])

  const [rect, setRect] = useState<FloatingPanelRect>(initial)
  const [dragging, setDragging] = useState(false)
  const prevOpenRef = useRef(open)
  const rectRef = useRef(rect)
  rectRef.current = rect

  const readBounds = useCallback(() => {
    const el = boundsRef?.current
    if (el) {
      return { width: el.clientWidth, height: el.clientHeight }
    }
    return {
      width: typeof window !== 'undefined' ? window.innerWidth : 800,
      height: typeof window !== 'undefined' ? window.innerHeight : 600,
    }
  }, [boundsRef])

  const applyClamp = useCallback(
    (next: FloatingPanelRect) =>
      clampRect(next, readBounds(), minWidth, minHeight),
    [readBounds, minWidth, minHeight],
  )

  // Re-clamp when the frame resizes or defaults change while open.
  useEffect(() => {
    if (!open) return
    setRect((prev) => applyClamp(prev))

    const el = boundsRef?.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => {
      setRect((prev) => applyClamp(prev))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [open, applyClamp, boundsRef])

  useEffect(() => {
    if (!open || !closeOnEscape || !onClose) return
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      if (escapeCloseToken !== panelToken) return
      e.stopPropagation()
      onCloseRef.current?.()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      if (escapeCloseToken === panelToken) escapeCloseToken = null
    }
  }, [open, closeOnEscape, onClose, panelToken])

  // Claim Escape when the user re-opens a panel (not on first gallery mount).
  useEffect(() => {
    const wasOpen = prevOpenRef.current
    prevOpenRef.current = open
    if (open && !wasOpen && closeOnEscape && onClose) {
      escapeCloseToken = panelToken
    }
  }, [open, closeOnEscape, onClose, panelToken])

  function bringForward() {
    onFocus?.()
    if (closeOnEscape && onClose) escapeCloseToken = panelToken
  }

  function endInteraction(pointerId: number, target: Element) {
    if (!interaction.current || interaction.current.pointerId !== pointerId) {
      return
    }
    interaction.current = null
    setDragging(false)
    try {
      if (target.hasPointerCapture(pointerId)) {
        target.releasePointerCapture(pointerId)
      }
    } catch {
      /* already released */
    }
  }

  function captureOnPanel(pointerId: number) {
    const root = panelRef.current
    if (!root) return
    root.setPointerCapture(pointerId)
  }

  function onTitlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (!draggable || e.button !== 0) return
    if (isNoDragTarget(e.target)) return
    bringForward()
    e.preventDefault()
    captureOnPanel(e.pointerId)
    interaction.current = {
      kind: 'drag',
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      orig: rectRef.current,
    }
    setDragging(true)
  }

  function onResizePointerDown(
    edge: ResizeEdge,
    e: ReactPointerEvent<HTMLDivElement>,
  ) {
    if (!resizable || e.button !== 0) return
    bringForward()
    e.preventDefault()
    e.stopPropagation()
    captureOnPanel(e.pointerId)
    interaction.current = {
      kind: 'resize',
      edge,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      orig: rectRef.current,
    }
    setDragging(true)
  }

  function onPanelPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const active = interaction.current
    if (!active || active.pointerId !== e.pointerId) return

    const dx = e.clientX - active.startX
    const dy = e.clientY - active.startY

    if (active.kind === 'drag') {
      setRect(
        applyClamp({
          ...active.orig,
          x: active.orig.x + dx,
          y: active.orig.y + dy,
        }),
      )
      return
    }

    const { edge, orig } = active
    let x = orig.x
    let y = orig.y
    let width = orig.width
    let height = orig.height

    if (edge.includes('e')) width = orig.width + dx
    if (edge.includes('s')) height = orig.height + dy
    if (edge.includes('w')) {
      width = orig.width - dx
      x = orig.x + dx
    }
    if (edge.includes('n')) {
      height = orig.height - dy
      y = orig.y + dy
    }

    const bounds = readBounds()
    width = Math.min(Math.max(minWidth, width), bounds.width)
    height = Math.min(Math.max(minHeight, height), bounds.height)

    // Re-anchor when min size stops further shrink on n/w edges.
    if (edge.includes('w')) {
      x = orig.x + (orig.width - width)
    }
    if (edge.includes('n')) {
      y = orig.y + (orig.height - height)
    }

    setRect(applyClamp({ x, y, width, height }))
  }

  function onPanelPointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    endInteraction(e.pointerId, e.currentTarget)
  }

  function resetRect() {
    setRect(applyClamp(initial()))
  }

  if (!open) return null

  const motionSafe = !prefersReducedMotion()
  const resizeCursor: Record<ResizeEdge, string> = {
    n: 'cursor-n-resize',
    s: 'cursor-s-resize',
    e: 'cursor-e-resize',
    w: 'cursor-w-resize',
    ne: 'cursor-ne-resize',
    nw: 'cursor-nw-resize',
    se: 'cursor-se-resize',
    sw: 'cursor-sw-resize',
  }

  const edges: ResizeEdge[] = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-labelledby={titleId}
      aria-modal="false"
      tabIndex={-1}
      className={`floating-panel absolute flex flex-col overflow-hidden shadow-lg outline-none ${
        motionSafe
          ? 'transition-[box-shadow] duration-150 ease-out'
          : ''
      } ${className}`}
      style={{
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
        zIndex,
        ...style,
      }}
      onPointerDown={() => bringForward()}
      onPointerMove={onPanelPointerMove}
      onPointerUp={onPanelPointerUp}
      onPointerCancel={onPanelPointerUp}
    >
      <div
        className={`wash-panel paper-grain flex h-full min-h-0 w-full flex-col overflow-hidden ${panelClassName}`}
      >
        <div
          className={`flex shrink-0 items-center gap-1 border-b border-ink-border/70 px-2 py-1.5 select-none ${
            draggable
              ? dragging
                ? 'cursor-grabbing'
                : 'cursor-grab'
              : ''
          }`}
          onPointerDown={onTitlePointerDown}
        >
          {draggable ? (
            <GripHorizontal
              className="size-4 shrink-0 text-ink-muted"
              strokeWidth={2}
              aria-hidden
            />
          ) : null}
          <p
            id={titleId}
            className="min-w-0 flex-1 truncate px-1 text-sm font-semibold"
          >
            {title}
          </p>
          <div className="flex shrink-0 items-center gap-0.5" data-no-drag>
            {actions}
            {showReset ? (
              <div
                className="tooltip tooltip-bottom tooltip-secondary"
                data-tip="Reset position"
              >
                <button
                  type="button"
                  className="btn btn-ghost btn-square btn-secondary btn-xs cursor-pointer"
                  aria-label="Reset position"
                  onClick={resetRect}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <RotateCcw className="size-3.5" strokeWidth={2} />
                </button>
              </div>
            ) : null}
            {onClose ? (
              <div
                className="tooltip tooltip-left tooltip-error"
                data-tip="Close"
              >
                <button
                  type="button"
                  className="btn btn-ghost btn-square btn-error btn-xs cursor-pointer"
                  aria-label="Close"
                  onClick={onClose}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <X className="size-3.5" strokeWidth={2} />
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div
          className={`min-h-0 flex-1 overflow-auto p-3 text-sm ${contentClassName}`}
          data-no-drag
        >
          {children}
        </div>
      </div>

      {resizable
        ? edges.map((edge) => {
            const size = 'h-2.5 w-2.5'
            const pos: Record<ResizeEdge, string> = {
              n: 'left-2 right-2 top-0 h-2',
              s: 'left-2 right-2 bottom-0 h-2',
              e: 'top-2 bottom-2 right-0 w-2',
              w: 'top-2 bottom-2 left-0 w-2',
              ne: `right-0 top-0 ${size}`,
              nw: `left-0 top-0 ${size}`,
              se: `right-0 bottom-0 ${size}`,
              sw: `left-0 bottom-0 ${size}`,
            }
            const isCorner = edge.length === 2
            return (
              <div
                key={edge}
                role="separator"
                aria-orientation={
                  edge === 'n' || edge === 's' ? 'horizontal' : 'vertical'
                }
                aria-label={`Resize ${edge}`}
                data-no-drag=""
                className={`absolute z-20 touch-none bg-transparent ${pos[edge]} ${resizeCursor[edge]} ${
                  isCorner ? 'z-30' : ''
                }`}
                onPointerDown={(e) => onResizePointerDown(edge, e)}
              />
            )
          })
        : null}

      {resizable ? (
        <div
          className="pointer-events-none absolute bottom-0.5 right-0.5 size-3 opacity-50"
          aria-hidden
        >
          <svg viewBox="0 0 12 12" className="size-3 text-ink-muted">
            <path
              d="M4 12 L12 4 M7 12 L12 7 M10 12 L12 10"
              stroke="currentColor"
              strokeWidth="1.25"
              fill="none"
            />
          </svg>
        </div>
      ) : null}
    </div>
  )
}

/** Shared demo frame shell for gallery canvases. */
export const floatingDemoFrameClass =
  'relative h-72 overflow-hidden rounded-box border border-ink-border/60 bg-base-200/30 sm:h-80'
