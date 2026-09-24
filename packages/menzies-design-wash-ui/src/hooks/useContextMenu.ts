import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from 'react'
import {
  CONTEXT_MENU_LONG_PRESS_MOVE_CANCEL_PX2,
  CONTEXT_MENU_LONG_PRESS_MS,
  placeContextMenuNearCursor,
  type ContextMenuPos,
} from '../lib/contextMenu'

export type UseContextMenuResult = {
  pos: ContextMenuPos | null
  openAt: (clientX: number, clientY: number) => void
  close: () => void
  menuRef: RefObject<HTMLUListElement | null>
}

/**
 * Open / close / outside-dismiss state for a portal context menu.
 * Repositions after paint using the measured menu size.
 */
export function useContextMenu(): UseContextMenuResult {
  const [pos, setPos] = useState<ContextMenuPos | null>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const cursorRef = useRef<ContextMenuPos | null>(null)

  const close = useCallback(() => {
    cursorRef.current = null
    setPos(null)
  }, [])

  const openAt = useCallback((clientX: number, clientY: number) => {
    cursorRef.current = { x: clientX, y: clientY }
    const approxW = 208
    const approxH = 220
    setPos(placeContextMenuNearCursor(clientX, clientY, approxW, approxH))
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
    const next = placeContextMenuNearCursor(cx, cy, rect.width, rect.height)
    if (next.x !== pos.x || next.y !== pos.y) setPos(next)
  }, [pos])

  return { pos, openAt, close, menuRef }
}

export type ContextMenuSurfaceTriggers = {
  onContextMenu: (event: ReactMouseEvent) => void
  onPointerDown: (event: ReactPointerEvent) => void
  onPointerMove: (event: ReactPointerEvent) => void
  onPointerUp: () => void
  onPointerCancel: () => void
  onKeyDown: (event: ReactKeyboardEvent) => void
}

/**
 * Surface handlers: right-click, touch/pen long-press, Shift+F10 / ContextMenu key.
 */
export function useContextMenuSurface(
  openAt: (x: number, y: number) => void,
  close: () => void,
): ContextMenuSurfaceTriggers {
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
        }, CONTEXT_MENU_LONG_PRESS_MS)
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
      if (dx * dx + dy * dy > CONTEXT_MENU_LONG_PRESS_MOVE_CANCEL_PX2) {
        clearLongPress()
      }
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
