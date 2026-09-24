import type { ReactNode, RefObject } from 'react'
import { createPortal } from 'react-dom'
import {
  CONTEXT_MENU_SHELL_CLASS,
  type ContextMenuPos,
} from '../lib/contextMenu'

export type ContextMenuProps = {
  /** Viewport coordinates for the fixed panel. When null, nothing is rendered. */
  pos: ContextMenuPos | null
  menuRef: RefObject<HTMLUListElement | null>
  'aria-label': string
  className?: string
  children: ReactNode
  /** Portal target. Defaults to `document.body`. */
  container?: Element | DocumentFragment | null
}

/**
 * Portaled daisyUI `menu` fixed near the pointer.
 * Use with `useContextMenu` + `useContextMenuSurface`.
 */
export function ContextMenu({
  pos,
  menuRef,
  className = '',
  'aria-label': ariaLabel,
  children,
  container,
}: ContextMenuProps) {
  if (!pos) return null
  if (typeof document === 'undefined') return null

  const target = container ?? document.body

  return createPortal(
    <ul
      ref={menuRef}
      className={`${CONTEXT_MENU_SHELL_CLASS} ${className}`.trim()}
      style={{ left: pos.x, top: pos.y }}
      role="menu"
      aria-label={ariaLabel}
    >
      {children}
    </ul>,
    target,
  )
}
