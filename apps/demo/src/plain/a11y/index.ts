import { useEffect, useId, useRef, type RefObject } from 'react'
import {
  createLiveAnnouncer,
  trapFocus,
} from './vanilla'

export { createLiveAnnouncer, createWashId, trapFocus, type LiveAnnouncer } from './vanilla'

/** Stable unique id for labelling controls. */
export function useWashId(prefix = 'wash'): string {
  const id = useId()
  return `${prefix}-${id.replace(/:/g, '')}`
}

/** Trap focus inside a container while active (dialogs, drawers). */
export function useFocusTrap(
  active: boolean,
  containerRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!active) return
    const root = containerRef.current
    if (!root) return
    return trapFocus(root)
  }, [active, containerRef])
}

/** Announce status text to assistive tech via an assertive/polite live region. */
export function useLiveAnnouncer() {
  const announcerRef = useRef<ReturnType<typeof createLiveAnnouncer> | null>(null)

  useEffect(() => {
    const announcer = createLiveAnnouncer()
    announcerRef.current = announcer
    return () => {
      announcer.destroy()
      announcerRef.current = null
    }
  }, [])

  return {
    announce(message: string, politeness: 'polite' | 'assertive' = 'polite') {
      announcerRef.current?.announce(message, politeness)
    },
  }
}
