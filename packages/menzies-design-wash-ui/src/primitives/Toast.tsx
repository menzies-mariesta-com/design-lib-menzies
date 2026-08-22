import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useLiveAnnouncer } from '../a11y'

export type ToastTone = 'success' | 'error' | 'warning' | 'info'

export type ToastItem = {
  id: string
  message: string
  tone?: ToastTone
}

type ToastContextValue = {
  push: (message: string, tone?: ToastTone) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const toneAlert: Record<ToastTone, string> = {
  success: 'alert-success',
  error: 'alert-error',
  warning: 'alert-warning',
  info: 'alert-info',
}

/**
 * Host for bottom-end toasts. Wrap the app (or page) and call `useToast().push()`.
 */
export function ToastProvider({
  children,
  durationMs = 3200,
}: {
  children: ReactNode
  durationMs?: number
}) {
  const { announce } = useLiveAnnouncer()
  const [items, setItems] = useState<ToastItem[]>([])

  const api = useMemo<ToastContextValue>(
    () => ({
      push(message, tone = 'success') {
        const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
        setItems((prev) => [...prev, { id, message, tone }])
        announce(message, tone === 'error' ? 'assertive' : 'polite')
        window.setTimeout(() => {
          setItems((prev) => prev.filter((t) => t.id !== id))
        }, durationMs)
      },
    }),
    [announce, durationMs],
  )

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="toast toast-bottom toast-end z-[100]">
        {items.map((item) => (
          <div
            key={item.id}
            role="status"
            className={`alert shadow-lg ${toneAlert[item.tone ?? 'success']}`}
          >
            <span>{item.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return ctx
}
