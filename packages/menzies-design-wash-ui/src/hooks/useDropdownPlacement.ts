import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  type RefObject,
  type ToggleEvent,
} from 'react'
import {
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
}

/**
 * For `<details class="dropdown">`: measure when opening; optional hover open.
 * Returns className + onToggle to merge with outside-close handlers.
 */
export function useDetailsDropdownPlacement(
  detailsRef: RefObject<HTMLDetailsElement | null>,
  opts: UseDetailsDropdownPlacementOptions = {},
  defaultEnd = false,
) {
  const { hover = true, ...measureOpts } = opts
  const [placement, setPlacement] = useState<DropdownPlacement>({
    ...DEFAULT_PLACEMENT,
    end: defaultEnd,
  })

  const onToggle = useCallback(
    (event: ToggleEvent<HTMLDetailsElement>) => {
      const el = event.currentTarget
      if (!el.open) return
      setPlacement(measureDropdownPlacement(el, measureOpts))
    },
    [
      measureOpts.panelWidth,
      measureOpts.panelHeight,
      measureOpts.pad,
      measureOpts.minBottom,
    ],
  )

  useLayoutEffect(() => {
    function update() {
      const el = detailsRef.current
      if (!el?.open) return
      const next = measureDropdownPlacement(el, measureOpts)
      setPlacement((prev) => (sameDropdownPlacement(prev, next) ? prev : next))
    }

    return listenWhileOpen(update)
  }, [
    detailsRef,
    measureOpts.panelWidth,
    measureOpts.panelHeight,
    measureOpts.pad,
    measureOpts.minBottom,
  ])

  useEffect(() => {
    if (!hover) return
    const host = detailsRef.current
    if (host == null) return

    const mq =
      typeof window.matchMedia === 'function'
        ? window.matchMedia(HOVER_MEDIA)
        : null

    const onEnter = () => {
      if (mq && !mq.matches) return
      if (!host.open) host.open = true
    }

    const onLeave = () => {
      if (mq && !mq.matches) return
      if (host.open) host.open = false
    }

    host.addEventListener('pointerenter', onEnter)
    host.addEventListener('pointerleave', onLeave)
    return () => {
      host.removeEventListener('pointerenter', onEnter)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [detailsRef, hover])

  return {
    placement,
    className: dropdownPlacementClassName(placement),
    onToggle,
  }
}
