import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from 'react'
import { createPortal } from 'react-dom'
import {
  ChevronRight,
  ClipboardCopy,
  Copy,
  Eraser,
  Lock,
  Paintbrush,
  Pencil,
  Scissors,
  Trash2,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

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

function ClassLabel({ value }: { value: string }) {
  return (
    <code className="font-mono text-[0.65rem] text-ink-muted">{value}</code>
  )
}

const menuShell =
  'menu menu-sm fixed z-[80] w-52 rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]'

/** Keep the cursor tip clear of the first item. */
const CURSOR_GAP = 4

type MenuPos = { x: number; y: number }

/**
 * Place the menu near the cursor in viewport space, flipping left/up when
 * there is not enough room so it stays on-screen without a large offset.
 */
function placeMenuNearCursor(
  clientX: number,
  clientY: number,
  width: number,
  height: number,
): MenuPos {
  const pad = 8
  let x = clientX + CURSOR_GAP
  let y = clientY + CURSOR_GAP

  if (x + width + pad > window.innerWidth) {
    x = clientX - width - CURSOR_GAP
  }
  if (y + height + pad > window.innerHeight) {
    y = clientY - height - CURSOR_GAP
  }

  const maxX = Math.max(pad, window.innerWidth - width - pad)
  const maxY = Math.max(pad, window.innerHeight - height - pad)
  return {
    x: Math.min(Math.max(pad, x), maxX),
    y: Math.min(Math.max(pad, y), maxY),
  }
}

function useContextMenu() {
  const [pos, setPos] = useState<MenuPos | null>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const cursorRef = useRef<MenuPos | null>(null)

  const close = useCallback(() => {
    cursorRef.current = null
    setPos(null)
  }, [])

  const openAt = useCallback((clientX: number, clientY: number) => {
    cursorRef.current = { x: clientX, y: clientY }
    const approxW = 208
    const approxH = 220
    setPos(placeMenuNearCursor(clientX, clientY, approxW, approxH))
  }, [])

  useEffect(() => {
    if (!pos) return

    function onPointerDown(event: PointerEvent) {
      const el = menuRef.current
      if (!el) return
      if (event.target instanceof Node && !el.contains(event.target)) {
        close()
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') close()
    }

    function onScroll() {
      close()
    }

    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('scroll', onScroll, true)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('scroll', onScroll, true)
    }
  }, [pos, close])

  useEffect(() => {
    if (!pos || !menuRef.current || !cursorRef.current) return
    const rect = menuRef.current.getBoundingClientRect()
    const { x: cx, y: cy } = cursorRef.current
    const next = placeMenuNearCursor(cx, cy, rect.width, rect.height)
    if (next.x !== pos.x || next.y !== pos.y) setPos(next)
  }, [pos])

  return { pos, openAt, close, menuRef }
}

function ContextMenuOverlay({
  pos,
  menuRef,
  className = '',
  'aria-label': ariaLabel,
  children,
}: {
  pos: MenuPos
  menuRef: RefObject<HTMLUListElement | null>
  className?: string
  'aria-label': string
  children: ReactNode
}) {
  // Portal to body so ancestor transform/filter/overflow (soak-in, wash-panel)
  // cannot retarget position:fixed away from the viewport.
  return createPortal(
    <ul
      ref={menuRef}
      className={`${menuShell} ${className}`.trim()}
      style={{ left: pos.x, top: pos.y }}
      role="menu"
      aria-label={ariaLabel}
    >
      {children}
    </ul>,
    document.body,
  )
}

const LONG_PRESS_MS = 520

function useSurfaceTriggers(
  openAt: (x: number, y: number) => void,
  close: () => void,
) {
  const longPressTimer = useRef<number | null>(null)
  const longPressOrigin = useRef<{ x: number; y: number } | null>(null)

  const clearLongPress = useCallback(() => {
    if (longPressTimer.current != null) {
      window.clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
    longPressOrigin.current = null
  }, [])

  useEffect(() => () => clearLongPress(), [clearLongPress])

  const onContextMenu = useCallback(
    (event: ReactMouseEvent) => {
      event.preventDefault()
      clearLongPress()
      openAt(event.clientX, event.clientY)
    },
    [clearLongPress, openAt],
  )

  const onPointerDown = useCallback(
    (event: ReactPointerEvent) => {
      if (event.button === 2) return
      if (event.pointerType === 'touch' || event.pointerType === 'pen') {
        clearLongPress()
        longPressOrigin.current = { x: event.clientX, y: event.clientY }
        longPressTimer.current = window.setTimeout(() => {
          const origin = longPressOrigin.current
          if (origin) openAt(origin.x, origin.y)
          clearLongPress()
        }, LONG_PRESS_MS)
      }
    },
    [clearLongPress, openAt],
  )

  const onPointerMove = useCallback(
    (event: ReactPointerEvent) => {
      const origin = longPressOrigin.current
      if (!origin) return
      const dx = event.clientX - origin.x
      const dy = event.clientY - origin.y
      if (dx * dx + dy * dy > 36) clearLongPress()
    },
    [clearLongPress],
  )

  const onPointerUp = useCallback(() => {
    clearLongPress()
  }, [clearLongPress])

  const onPointerCancel = useCallback(() => {
    clearLongPress()
  }, [clearLongPress])

  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent) => {
      if (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) {
        event.preventDefault()
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
        openAt(rect.left + rect.width / 2, rect.top + rect.height / 2)
      }
      if (event.key === 'Escape') close()
    },
    [close, openAt],
  )

  return {
    onContextMenu,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onKeyDown,
  }
}

function BasicContextDemo() {
  const { pos, openAt, close, menuRef } = useContextMenu()
  const triggers = useSurfaceTriggers(openAt, close)
  const [lastAction, setLastAction] = useState('None yet')

  function pick(label: string) {
    setLastAction(label)
    close()
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        role="application"
        tabIndex={0}
        className="flex min-h-36 cursor-context-menu flex-col items-center justify-center rounded-box border border-dashed border-ink-border/70 bg-base-200/30 px-4 py-8 text-center outline-none focus-visible:dry-brush"
        aria-label="Right-click or long-press for basic context menu"
        {...triggers}
      >
        <p className="text-sm font-medium">Right-click this surface</p>
        <p className="mt-1 text-xs text-ink-muted">
          Touch: long-press. Keyboard: Shift+F10 when focused.
        </p>
      </div>
      <p className="text-sm text-ink-muted">
        Last action: <span className="font-medium text-base-content">{lastAction}</span>
      </p>
      {pos ? (
        <ContextMenuOverlay
          pos={pos}
          menuRef={menuRef}
          aria-label="Basic context menu"
        >
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className="cursor-pointer"
              onClick={() => pick('Open')}
            >
              Open
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className="cursor-pointer"
              onClick={() => pick('Rename')}
            >
              Rename
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className="cursor-pointer"
              onClick={() => pick('Inspect wash')}
            >
              Inspect wash
            </button>
          </li>
        </ContextMenuOverlay>
      ) : null}
      <ClassLabel value="menu + fixed pointer position (composed)" />
    </div>
  )
}

function IconsShortcutsDemo() {
  const { pos, openAt, close, menuRef } = useContextMenu()
  const triggers = useSurfaceTriggers(openAt, close)
  const [lastAction, setLastAction] = useState('None yet')

  function pick(label: string) {
    setLastAction(label)
    close()
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        role="application"
        tabIndex={0}
        className="flex min-h-36 cursor-context-menu flex-col items-center justify-center rounded-box border border-dashed border-ink-border/70 bg-wash-blue/20 px-4 py-8 text-center outline-none focus-visible:dry-brush"
        aria-label="Right-click for icons and shortcuts context menu"
        {...triggers}
      >
        <Paintbrush className="mb-2 size-5 text-base-content/70" strokeWidth={2} />
        <p className="text-sm font-medium">Brush plate</p>
        <p className="mt-1 text-xs text-ink-muted">Icons and kbd hints in the menu</p>
      </div>
      <p className="text-sm text-ink-muted">
        Last action: <span className="font-medium text-base-content">{lastAction}</span>
      </p>
      {pos ? (
        <ContextMenuOverlay
          pos={pos}
          menuRef={menuRef}
          aria-label="Icons and shortcuts context menu"
        >
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className="cursor-pointer"
              onClick={() => pick('Cut')}
            >
              <Scissors className="size-4" strokeWidth={2} />
              Cut
              <kbd className="kbd kbd-xs ms-auto">⌘X</kbd>
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className="cursor-pointer"
              onClick={() => pick('Copy')}
            >
              <Copy className="size-4" strokeWidth={2} />
              Copy
              <kbd className="kbd kbd-xs ms-auto">⌘C</kbd>
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className="cursor-pointer"
              onClick={() => pick('Paste')}
            >
              <ClipboardCopy className="size-4" strokeWidth={2} />
              Paste
              <kbd className="kbd kbd-xs ms-auto">⌘V</kbd>
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className="cursor-pointer"
              onClick={() => pick('Edit label')}
            >
              <Pencil className="size-4" strokeWidth={2} />
              Edit label
              <kbd className="kbd kbd-xs ms-auto">E</kbd>
            </button>
          </li>
        </ContextMenuOverlay>
      ) : null}
      <ClassLabel value="menu + Lucide + kbd" />
    </div>
  )
}

function NestedDestructiveDemo() {
  const { pos, openAt, close, menuRef } = useContextMenu()
  const triggers = useSurfaceTriggers(openAt, close)
  const [lastAction, setLastAction] = useState('None yet')
  const [nestedOpen, setNestedOpen] = useState(false)

  function pick(label: string) {
    setLastAction(label)
    setNestedOpen(false)
    close()
  }

  useEffect(() => {
    if (!pos) setNestedOpen(false)
  }, [pos])

  return (
    <div className="flex flex-col gap-3">
      <div
        role="application"
        tabIndex={0}
        className="flex min-h-36 cursor-context-menu flex-col items-center justify-center rounded-box border border-dashed border-ink-border/70 bg-wash-rose/15 px-4 py-8 text-center outline-none focus-visible:dry-brush"
        aria-label="Right-click for nested and destructive context menu"
        {...triggers}
      >
        <p className="text-sm font-medium">Layer stack target</p>
        <p className="mt-1 text-xs text-ink-muted">Nested Export, plus Delete in error color</p>
      </div>
      <p className="text-sm text-ink-muted">
        Last action: <span className="font-medium text-base-content">{lastAction}</span>
      </p>
      {pos ? (
        <ContextMenuOverlay
          pos={pos}
          menuRef={menuRef}
          className="w-56"
          aria-label="Nested context menu"
        >
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className="cursor-pointer"
              onClick={() => pick('Duplicate')}
            >
              <Copy className="size-4" strokeWidth={2} />
              Duplicate
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className={`cursor-pointer ${nestedOpen ? 'menu-active' : ''}`}
              aria-haspopup="true"
              aria-expanded={nestedOpen}
              onClick={(e) => {
                e.stopPropagation()
                setNestedOpen((v) => !v)
              }}
            >
              Export
              <ChevronRight className="ms-auto size-4 opacity-70" strokeWidth={2} />
            </button>
            {nestedOpen ? (
              <ul className="menu menu-sm ms-2 mt-1 w-full rounded-box border border-ink-border/50 bg-base-100 p-1">
                <li role="none">
                  <button
                    type="button"
                    role="menuitem"
                    className="cursor-pointer"
                    onClick={() => pick('Export PNG')}
                  >
                    PNG plate
                  </button>
                </li>
                <li role="none">
                  <button
                    type="button"
                    role="menuitem"
                    className="cursor-pointer"
                    onClick={() => pick('Export SVG')}
                  >
                    SVG outline
                  </button>
                </li>
              </ul>
            ) : null}
          </li>
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className="cursor-pointer text-error"
              onClick={() => pick('Delete')}
            >
              <Trash2 className="size-4" strokeWidth={2} />
              Delete
            </button>
          </li>
        </ContextMenuOverlay>
      ) : null}
      <ClassLabel value="menu nested + text-error delete" />
    </div>
  )
}

function StudioWashDemo() {
  const { pos, openAt, close, menuRef } = useContextMenu()
  const triggers = useSurfaceTriggers(openAt, close)
  const [locked, setLocked] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  function pick(label: string) {
    if (label === 'Lock layer') setLocked(true)
    if (label === 'Unlock layer') setLocked(false)
    setToast(label)
    close()
    window.setTimeout(() => setToast(null), 2200)
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        role="application"
        tabIndex={0}
        className="wash-panel wash-panel-blue relative flex min-h-44 cursor-context-menu flex-col justify-between overflow-hidden p-5 outline-none focus-visible:dry-brush"
        aria-label="Right-click wash plate for studio actions"
        {...triggers}
      >
        <div>
          <p className="label-ink">Wash plate</p>
          <h3 className="font-display mt-1 text-xl font-semibold">Cerulean field</h3>
          <p className="mt-1 text-sm text-ink-muted">
            Right-click or long-press for Duplicate, Lock, Delete wash.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {locked ? (
            <span className="badge badge-sm gap-1 border-ink-border bg-base-100/80">
              <Lock className="size-3" strokeWidth={2} />
              Locked
            </span>
          ) : (
            <span className="badge badge-sm border-ink-border bg-base-100/60">Editable</span>
          )}
        </div>
      </div>
      {toast ? (
        <p className="text-sm text-ink-muted" role="status">
          Studio: <span className="font-medium text-base-content">{toast}</span>
        </p>
      ) : (
        <p className="text-sm text-ink-muted">No studio action yet.</p>
      )}
      {pos ? (
        <ContextMenuOverlay
          pos={pos}
          menuRef={menuRef}
          aria-label="Studio wash context menu"
        >
          <li className="menu-title px-2 py-1">
            <span>Wash actions</span>
          </li>
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className="cursor-pointer"
              onClick={() => pick('Duplicate')}
            >
              <Copy className="size-4" strokeWidth={2} />
              Duplicate
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className="cursor-pointer"
              onClick={() => pick(locked ? 'Unlock layer' : 'Lock layer')}
            >
              <Lock className="size-4" strokeWidth={2} />
              {locked ? 'Unlock layer' : 'Lock layer'}
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className="cursor-pointer text-error"
              onClick={() => pick('Delete wash')}
            >
              <Eraser className="size-4" strokeWidth={2} />
              Delete wash
            </button>
          </li>
        </ContextMenuOverlay>
      ) : null}
      <ClassLabel value="wash-panel + menu context (composed)" />
    </div>
  )
}

export default function ContextMenuPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Context menu
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI has no dedicated context-menu class. These demos compose{' '}
          <span className="font-mono text-xs">menu</span> panels at the pointer
          for right-click and long-press. Distinct from click Dropdown and Menu
          galleries.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Pointer-positioned menu"
          description="Right-click opens a menu near the pointer. Closes on outside click, Escape, or scroll."
        >
          <BasicContextDemo />
        </Section>

        <Section
          eyebrow="02 · Icons and shortcuts"
          title="Lucide plus kbd hints"
          description="Same trigger pattern with icons and keyboard shortcut hints."
          panel="wash-panel-blue"
        >
          <IconsShortcutsDemo />
        </Section>

        <Section
          eyebrow="03 · Nested and destructive"
          title="Export submenu and Delete"
          description="Nested Export items, plus a destructive Delete row in error color."
          panel="wash-panel-rose"
        >
          <NestedDestructiveDemo />
        </Section>

        <Section
          eyebrow="04 · Studio"
          title="Wash plate actions"
          description="Duplicate, Lock layer, and Delete wash on a watercolor plate surface."
          panel="wash-panel-blue"
        >
          <StudioWashDemo />
        </Section>

        <Section
          eyebrow="05 · Keyboard and Escape"
          title="Close and open notes"
          description="Escape always dismisses an open context menu. Focus a target and press Shift+F10 (or ContextMenu) to open near the surface."
        >
          <ul className="list-inside list-disc space-y-2 text-sm text-ink-muted">
            <li>
              <span className="font-medium text-base-content">Escape</span> closes
              the open menu and clears nested state.
            </li>
            <li>
              <span className="font-medium text-base-content">Outside click</span>{' '}
              (pointerdown outside the menu) closes it.
            </li>
            <li>
              <span className="font-medium text-base-content">Shift+F10</span> or
              the ContextMenu key opens when the surface is focused.
            </li>
            <li>
              Listeners for dismiss are attached only while open and removed on
              unmount.
            </li>
          </ul>
          <div className="mt-3">
            <ClassLabel value="keydown Escape + pointerdown outside" />
          </div>
        </Section>

        <Section
          eyebrow="06 · Responsive"
          title="Touch long-press fallback"
          description="On touch and pen, hold about half a second to open. Move cancels. Desktop still uses right-click; secondary-button contextmenu remains the primary path."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-box border border-ink-border/60 bg-base-200/30 p-4">
              <p className="label-ink">Desktop</p>
              <p className="mt-2 text-sm text-ink-muted">
                Right-click or Shift+F10 on a focused target.
              </p>
            </div>
            <div className="rounded-box border border-ink-border/60 bg-base-200/30 p-4">
              <p className="label-ink">Touch</p>
              <p className="mt-2 text-sm text-ink-muted">
                Long-press the surface. Drag cancels before the menu opens.
              </p>
            </div>
          </div>
          <div className="mt-3">
            <ClassLabel value="pointerType touch|pen long-press" />
          </div>
        </Section>
      </div>
    </>
  )
}
