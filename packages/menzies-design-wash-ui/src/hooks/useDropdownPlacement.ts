import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  type CSSProperties,
  type RefObject,
  type ToggleEvent,
} from 'react'
import {
  dropdownPanelStyle,
  dropdownPlacementClassName,
  measureDropdownPlacement,
  sameDropdownPlacement,
  type DropdownPlacement,
  type MeasureDropdownOptions,
} from '../lib/dropdownPlacement'

const DEFAULT_PLACEMENT: DropdownPlacement = {
  end: false,
  top: false,
  maxHeight: 320,
}

const HOVER_MEDIA = '(hover: hover) and (pointer: fine)'

/** Grace period before hover-close so the pointer can reach the panel. */
export const DROPDOWN_HOVER_CLOSE_DELAY_MS = 200

function listenWhileOpen(update: () => void) {
  window.addEventListener('resize', update)
  // Capture scroll from nested overflow panes (table body, showcase frames).
  window.addEventListener('scroll', update, true)
  return () => {
    window.removeEventListener('resize', update)
    window.removeEventListener('scroll', update, true)
  }
}

/**
 * For controlled open state (focus / combobox dropdowns).
 * Re-measures on open, window resize, and scroll while open.
 */
export function useDropdownPlacement(
  rootRef: RefObject<HTMLElement | null>,
  open: boolean,
  opts: MeasureDropdownOptions = {},
): DropdownPlacement {
  const [placement, setPlacement] = useState<DropdownPlacement>(DEFAULT_PLACEMENT)

  useLayoutEffect(() => {
    if (!open) return

    function update() {
      const el = rootRef.current
      if (!el) return
      const next = measureDropdownPlacement(el, opts)
      setPlacement((prev) => (sameDropdownPlacement(prev, next) ? prev : next))
    }

    update()
    return listenWhileOpen(update)
  }, [open, rootRef, opts.panelWidth, opts.panelHeight, opts.pad, opts.minBottom])

  return placement
}

export type UseDetailsDropdownPlacementOptions = MeasureDropdownOptions & {
  /**
   * Open on pointer enter / close on leave when the device supports hover.
   * Default true for menu-style details dropdowns. Touch keeps click/tap.
   */
  hover?: boolean
  /**
   * ms to wait after pointer leave before closing (hover mode only).
   * Cancelled if the pointer re-enters the details host (trigger or panel).
   * Default {@link DROPDOWN_HOVER_CLOSE_DELAY_MS}.
   */
  hoverCloseDelayMs?: number
}

/**
 * For `<details class="dropdown">`: measure when opening; optional hover open
 * with close delay; outside click + Escape close.
 * Returns className + onToggle to merge onto the details element.
 * Also returns `panelStyle` (max-height) for the absolute dropdown-content.
 */
export function useDetailsDropdownPlacement(
  detailsRef: RefObject<HTMLDetailsElement | null>,
  opts: UseDetailsDropdownPlacementOptions = {},
  defaultEnd = false,
) {
  const {
    hover = true,
    hoverCloseDelayMs = DROPDOWN_HOVER_CLOSE_DELAY_MS,
    ...measureOpts
  } = opts
  const [placement, setPlacement] = useState<DropdownPlacement>({
    ...DEFAULT_PLACEMENT,
    end: defaultEnd,
  })
  const [panelStyle, setPanelStyle] = useState<CSSProperties>(() =>
    dropdownPanelStyle(DEFAULT_PLACEMENT) as CSSProperties,
  )

  const applyPlacement = useCallback(
    (el: HTMLDetailsElement) => {
      const next = measureDropdownPlacement(el, measureOpts)
      setPlacement((prev) => (sameDropdownPlacement(prev, next) ? prev : next))
      setPanelStyle(dropdownPanelStyle(next) as CSSProperties)
    },
    [
      measureOpts.panelWidth,
      measureOpts.panelHeight,
      measureOpts.pad,
      measureOpts.minBottom,
    ],
  )

  const onToggle = useCallback(
    (event: ToggleEvent<HTMLDetailsElement>) => {
      const el = event.currentTarget
      if (!el.open) return
      applyPlacement(el)
    },
    [applyPlacement],
  )

  useLayoutEffect(() => {
    function update() {
      const el = detailsRef.current
      if (!el?.open) return
      applyPlacement(el)
    }

    return listenWhileOpen(update)
  }, [detailsRef, applyPlacement])

  useEffect(() => {
    if (!hover) return
    const host = detailsRef.current
    if (host == null) return

    const mq =
      typeof window.matchMedia === 'function'
        ? window.matchMedia(HOVER_MEDIA)
        : null

    let closeTimer: ReturnType<typeof setTimeout> | null = null

    const clearCloseTimer = () => {
      if (closeTimer != null) {
        clearTimeout(closeTimer)
        closeTimer = null
      }
    }

    const onEnter = () => {
      if (mq && !mq.matches) return
      clearCloseTimer()
      if (!host.open) host.open = true
    }

    const onLeave = () => {
      if (mq && !mq.matches) return
      clearCloseTimer()
      const delay = Math.max(0, hoverCloseDelayMs)
      closeTimer = setTimeout(() => {
        closeTimer = null
        if (host.open) host.open = false
      }, delay)
    }

    host.addEventListener('pointerenter', onEnter)
    host.addEventListener('pointerleave', onLeave)
    return () => {
      clearCloseTimer()
      host.removeEventListener('pointerenter', onEnter)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [detailsRef, hover, hoverCloseDelayMs])

  // Outside click + Escape (daisyui-dropdown-close)
  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const el = detailsRef.current
      if (!el?.open) return
      if (event.target instanceof Node && !el.contains(event.target)) {
        el.open = false
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && detailsRef.current?.open) {
        detailsRef.current.open = false
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [detailsRef])

  return {
    placement,
    className: dropdownPlacementClassName(placement),
    onToggle,
    /** Inline style for `.dropdown-content` (absolute max-height). */
    panelStyle,
  }
}
