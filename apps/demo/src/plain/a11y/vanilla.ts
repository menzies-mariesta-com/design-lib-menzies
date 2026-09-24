const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'

let idCounter = 0

/** Stable unique id for labelling controls (framework-free). */
export function createWashId(prefix = 'wash'): string {
  idCounter += 1
  return `${prefix}-${idCounter}-${Date.now().toString(36)}`
}

function focusableNodes(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.hasAttribute('disabled') && el.tabIndex !== -1,
  )
}

/**
 * Trap focus inside a container while active (dialogs, drawers).
 * Returns a cleanup function.
 */
export function trapFocus(container: HTMLElement): () => void {
  const previouslyFocused = document.activeElement as HTMLElement | null
  const nodes = focusableNodes(container)
  nodes[0]?.focus()

  function onKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Tab') return
    const list = focusableNodes(container)
    if (list.length === 0) {
      event.preventDefault()
      return
    }
    const firstEl = list[0]
    const lastEl = list[list.length - 1]
    if (event.shiftKey && document.activeElement === firstEl) {
      event.preventDefault()
      lastEl.focus()
    } else if (!event.shiftKey && document.activeElement === lastEl) {
      event.preventDefault()
      firstEl.focus()
    }
  }

  container.addEventListener('keydown', onKeyDown)
  return () => {
    container.removeEventListener('keydown', onKeyDown)
    previouslyFocused?.focus?.()
  }
}

export type LiveAnnouncer = {
  announce: (message: string, politeness?: 'polite' | 'assertive') => void
  destroy: () => void
}

/** Announce status text to assistive tech via a live region. */
export function createLiveAnnouncer(): LiveAnnouncer {
  const el = document.createElement('div')
  el.setAttribute('role', 'status')
  el.setAttribute('aria-live', 'polite')
  el.setAttribute('aria-atomic', 'true')
  el.className = 'sr-only'
  el.style.cssText =
    'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0'
  document.body.appendChild(el)

  return {
    announce(message: string, politeness: 'polite' | 'assertive' = 'polite') {
      el.setAttribute('aria-live', politeness)
      el.textContent = ''
      requestAnimationFrame(() => {
        el.textContent = message
      })
    },
    destroy() {
      el.remove()
    },
  }
}
