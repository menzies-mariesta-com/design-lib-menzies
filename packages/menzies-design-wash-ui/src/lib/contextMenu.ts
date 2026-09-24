/**
 * Framework-free helpers for pointer-positioned context menus
 * (daisyUI `menu` + fixed viewport placement).
 */

export type ContextMenuPos = { x: number; y: number }

/** Keep the cursor tip clear of the first item. */
export const CONTEXT_MENU_CURSOR_GAP = 4

/** Touch / pen long-press duration before opening. */
export const CONTEXT_MENU_LONG_PRESS_MS = 520

/** Movement (px²) that cancels an in-progress long-press. */
export const CONTEXT_MENU_LONG_PRESS_MOVE_CANCEL_PX2 = 36

/**
 * Shared shell for a viewport-fixed context menu panel.
 * Portal to `document.body` so ancestor transform/filter/overflow cannot retarget `fixed`.
 */
export const CONTEXT_MENU_SHELL_CLASS =
  'menu menu-sm fixed z-[80] w-52 rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]'

/**
 * Place the menu near the cursor in viewport space, flipping left/up when
 * there is not enough room so it stays on-screen without a large offset.
 */
export function placeContextMenuNearCursor(
  clientX: number,
  clientY: number,
  width: number,
  height: number,
  options?: { pad?: number; gap?: number },
): ContextMenuPos {
  const pad = options?.pad ?? 8
  const gap = options?.gap ?? CONTEXT_MENU_CURSOR_GAP
  let x = clientX + gap
  let y = clientY + gap

  if (typeof window === 'undefined') {
    return { x, y }
  }

  if (x + width + pad > window.innerWidth) {
    x = clientX - width - gap
  }
  if (y + height + pad > window.innerHeight) {
    y = clientY - height - gap
  }

  const maxX = Math.max(pad, window.innerWidth - width - pad)
  const maxY = Math.max(pad, window.innerHeight - height - pad)
  return {
    x: Math.min(Math.max(pad, x), maxX),
    y: Math.min(Math.max(pad, y), maxY),
  }
}
