import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import {
  clearRipples,
  prefersReducedMotion,
  spawnRipple,
  type RippleOrigin,
} from '../lib/ripple'

export type { RippleOrigin }

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => prefersReducedMotion())

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/**
 * Imperative ripple for a host element. Marks the host with
 * `data-ripple-managed` so the global attach does not double-spawn.
 * Prefer the class + global attach for ordinary buttons.
 */
export function useRipple(origin: RippleOrigin = 'pointer') {
  const hostRef = useRef<HTMLElement | null>(null)
  const reduced = usePrefersReducedMotion()

  const clear = useCallback(() => {
    if (hostRef.current) clearRipples(hostRef.current)
  }, [])

  useEffect(() => () => clear(), [clear])

  const setHostRef = useCallback((node: HTMLElement | null) => {
    if (hostRef.current && hostRef.current !== node) {
      hostRef.current.removeAttribute('data-ripple-managed')
      clearRipples(hostRef.current)
    }
    hostRef.current = node
    if (node) node.setAttribute('data-ripple-managed', '')
  }, [])

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      const host = hostRef.current
      if (!host || reduced) return
      spawnRipple(host, {
        origin,
        clientX: event.clientX,
        clientY: event.clientY,
      })
    },
    [origin, reduced],
  )

  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLElement>) => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      const host = hostRef.current
      if (!host || reduced) return
      spawnRipple(host, { origin: 'center' })
    },
    [reduced],
  )

  return { setHostRef, onPointerDown, onKeyDown, clearRipples: clear, reduced }
}
