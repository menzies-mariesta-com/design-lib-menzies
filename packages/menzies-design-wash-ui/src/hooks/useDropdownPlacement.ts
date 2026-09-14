import {
  useCallback,
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

/**
 * For `<details class="dropdown">`: measure when opening.
 * Returns className + onToggle to merge with outside-close handlers.
 */
export function useDetailsDropdownPlacement(
  detailsRef: RefObject<HTMLDetailsElement | null>,
  opts: MeasureDropdownOptions = {},
  defaultEnd = false,
) {
  const [placement, setPlacement] = useState<DropdownPlacement>({
    ...DEFAULT_PLACEMENT,
    end: defaultEnd,
  })

  const onToggle = useCallback(
    (event: ToggleEvent<HTMLDetailsElement>) => {
      const el = event.currentTarget
      if (!el.open) return
      setPlacement(measureDropdownPlacement(el, opts))
    },
    [opts.panelWidth, opts.panelHeight, opts.pad, opts.minBottom],
  )

  useLayoutEffect(() => {
    function update() {
      const el = detailsRef.current
      if (!el?.open) return
      const next = measureDropdownPlacement(el, opts)
      setPlacement((prev) => (sameDropdownPlacement(prev, next) ? prev : next))
    }

    return listenWhileOpen(update)
  }, [detailsRef, opts.panelWidth, opts.panelHeight, opts.pad, opts.minBottom])

  return {
    placement,
    className: dropdownPlacementClassName(placement),
    onToggle,
  }
}
