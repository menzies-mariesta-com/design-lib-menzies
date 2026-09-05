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
  type DropdownPlacement,
  type MeasureDropdownOptions,
} from '../lib/dropdownPlacement'

/**
 * For controlled open state (focus / combobox dropdowns).
 * Re-measures on open and window resize.
 */
export function useDropdownPlacement(
  rootRef: RefObject<HTMLElement | null>,
  open: boolean,
  opts: MeasureDropdownOptions = {},
): DropdownPlacement {
  const [placement, setPlacement] = useState<DropdownPlacement>({
    end: false,
    top: false,
  })

  useLayoutEffect(() => {
    if (!open) return

    function update() {
      const el = rootRef.current
      if (!el) return
      setPlacement(measureDropdownPlacement(el, opts))
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [open, rootRef, opts.panelWidth, opts.panelHeight, opts.pad])

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
    end: defaultEnd,
    top: false,
  })

  const onToggle = useCallback(
    (event: ToggleEvent<HTMLDetailsElement>) => {
      const el = event.currentTarget
      if (!el.open) return
      setPlacement(measureDropdownPlacement(el, opts))
    },
    [opts.panelWidth, opts.panelHeight, opts.pad],
  )

  useLayoutEffect(() => {
    function update() {
      const el = detailsRef.current
      if (!el?.open) return
      setPlacement(measureDropdownPlacement(el, opts))
    }

    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [detailsRef, opts.panelWidth, opts.panelHeight, opts.pad])

  return {
    placement,
    className: dropdownPlacementClassName(placement),
    onToggle,
  }
}
