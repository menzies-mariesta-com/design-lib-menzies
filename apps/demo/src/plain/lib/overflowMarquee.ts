import { prefersReducedMotion } from './ripple'

export type AttachOverflowMarqueeOptions = {
  /** Root to observe. Defaults to document. */
  root?: ParentNode
  /** Extra selectors to include (comma-separated or array). */
  selector?: string | string[]
}

const DEFAULT_SELECTOR =
  '.truncate, [class*="line-clamp-"], [data-overflow-marquee]'

const SKIP_SELECTOR = [
  'input',
  'textarea',
  'select',
  '[contenteditable="true"]',
  '.wash-rte-surface',
  '.wash-code-input',
  '.wash-code-highlight',
  '.no-overflow-marquee',
  '.overflow-marquee-portal',
  '.overflow-marquee-track',
  '.overflow-marquee-chunk',
].join(', ')

let attached = false
let activePortal: HTMLDivElement | null = null
let activeHost: HTMLElement | null = null

function resolveSelector(extra?: string | string[]): string {
  if (!extra) return DEFAULT_SELECTOR
  const parts = Array.isArray(extra) ? extra : [extra]
  return [DEFAULT_SELECTOR, ...parts].join(', ')
}

function shouldSkip(el: Element): boolean {
  if (el.closest(SKIP_SELECTOR)) return true
  if (el.closest('.overflow-marquee-host')) return true
  return false
}

export function isTextOverflowing(el: HTMLElement): boolean {
  return el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1
}

function findOverflowHost(target: EventTarget | null, selector: string): HTMLElement | null {
  if (!(target instanceof Element)) return null
  if (shouldSkip(target)) return null
  const host = target.closest(selector)
  if (!(host instanceof HTMLElement)) return null
  if (shouldSkip(host)) return null
  return host
}

function durationForText(text: string, overflowPx: number): string {
  const base = Math.max(8, Math.min(28, text.length * 0.12 + overflowPx * 0.02))
  return `${base.toFixed(1)}s`
}

function clearPortal(): void {
  if (activePortal) {
    activePortal.remove()
    activePortal = null
  }
  if (activeHost) {
    activeHost.removeAttribute('data-marquee-active')
    activeHost.removeAttribute('data-marquee-static')
    activeHost = null
  }
}

function placePortal(host: HTMLElement): void {
  clearPortal()
  if (!isTextOverflowing(host)) {
    host.removeAttribute('data-overflow')
    return
  }

  host.setAttribute('data-overflow', 'true')
  const text = (host.textContent ?? '').replace(/\s+/g, ' ').trim()
  if (!text) return

  const rect = host.getBoundingClientRect()
  if (rect.width < 4 || rect.height < 4) return

  activeHost = host
  host.setAttribute('data-marquee-active', 'true')

  if (prefersReducedMotion()) {
    host.setAttribute('data-marquee-static', 'true')
    host.setAttribute('title', text)
    return
  }

  const portal = document.createElement('div')
  portal.className = 'overflow-marquee-portal'
  portal.setAttribute('aria-hidden', 'true')
  const cs = getComputedStyle(host)
  portal.style.left = `${Math.round(rect.left)}px`
  portal.style.top = `${Math.round(rect.top)}px`
  portal.style.width = `${Math.round(rect.width)}px`
  portal.style.height = `${Math.round(rect.height)}px`
  portal.style.display = 'flex'
  portal.style.alignItems = 'center'
  portal.style.paddingLeft = cs.paddingLeft
  portal.style.paddingRight = cs.paddingRight
  portal.style.fontFamily = cs.fontFamily
  portal.style.fontSize = cs.fontSize
  portal.style.fontWeight = cs.fontWeight
  portal.style.lineHeight = cs.lineHeight
  portal.style.letterSpacing = cs.letterSpacing
  portal.style.color = cs.color

  const overflowPx = Math.max(0, host.scrollWidth - host.clientWidth)
  portal.style.setProperty('--overflow-marquee-duration', durationForText(text, overflowPx))

  const track = document.createElement('div')
  track.className = 'overflow-marquee-track'
  const a = document.createElement('span')
  a.className = 'overflow-marquee-chunk'
  a.textContent = text
  const b = document.createElement('span')
  b.className = 'overflow-marquee-chunk'
  b.textContent = text
  b.setAttribute('aria-hidden', 'true')
  track.append(a, b)
  portal.append(track)
  document.body.append(portal)
  activePortal = portal
}

function refreshOverflowFlags(root: ParentNode, selector: string): void {
  root.querySelectorAll(selector).forEach((node) => {
    if (!(node instanceof HTMLElement)) return
    if (shouldSkip(node)) return
    if (isTextOverflowing(node)) {
      node.setAttribute('data-overflow', 'true')
      node.classList.add('overflow-marquee')
    } else {
      node.removeAttribute('data-overflow')
    }
  })
}

/**
 * Document-level overflow hover marquee for truncated / line-clamped text.
 * Uses a floating portal so React-managed nodes are not rewritten.
 */
export function attachOverflowMarquee(
  options: AttachOverflowMarqueeOptions = {},
): (() => void) | undefined {
  if (typeof document === 'undefined') return undefined
  if (attached && !options.root) return undefined

  const root = options.root ?? document
  const selector = resolveSelector(options.selector)
  const scopeEl =
    root instanceof Document ? root.documentElement : (root as Element)

  const onEnter = (event: Event) => {
    const host = findOverflowHost(event.target, selector)
    if (!host) return
    if (activeHost === host && (activePortal || host.getAttribute('data-marquee-static') === 'true')) {
      return
    }
    placePortal(host)
  }

  const onLeave = (event: Event) => {
    if (!activeHost) return
    const related =
      'relatedTarget' in event ? (event as PointerEvent | FocusEvent).relatedTarget : null
    if (related instanceof Node) {
      if (activeHost.contains(related)) return
      if (activePortal?.contains(related)) return
      const nextHost = findOverflowHost(related, selector)
      if (nextHost === activeHost) return
    }
    clearPortal()
  }

  const onScrollOrResize = () => {
    if (activeHost) placePortal(activeHost)
    else refreshOverflowFlags(root, selector)
  }

  refreshOverflowFlags(root, selector)

  const ro = new ResizeObserver(() => {
    refreshOverflowFlags(root, selector)
    if (activeHost) placePortal(activeHost)
  })
  if (scopeEl instanceof Element) ro.observe(scopeEl)
  else ro.observe(document.documentElement)

  // pointerover/out bubble; pointerenter does not (so document capture would miss targets)
  root.addEventListener('pointerover', onEnter, true)
  root.addEventListener('focusin', onEnter, true)
  root.addEventListener('pointerout', onLeave, true)
  root.addEventListener('focusout', onLeave, true)
  window.addEventListener('scroll', onScrollOrResize, true)
  window.addEventListener('resize', onScrollOrResize)

  if (!options.root) attached = true

  return () => {
    root.removeEventListener('pointerover', onEnter, true)
    root.removeEventListener('focusin', onEnter, true)
    root.removeEventListener('pointerout', onLeave, true)
    root.removeEventListener('focusout', onLeave, true)
    window.removeEventListener('scroll', onScrollOrResize, true)
    window.removeEventListener('resize', onScrollOrResize)
    ro.disconnect()
    clearPortal()
    if (!options.root) attached = false
  }
}
