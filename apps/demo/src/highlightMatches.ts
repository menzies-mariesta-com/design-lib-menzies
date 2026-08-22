const MARK_ATTR = 'data-search-hit'
const MARK_CLASS = 'search-hit'

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Unwrap previous search marks and normalize text nodes. */
export function clearSearchHighlights(root: ParentNode = document): void {
  const marks = root.querySelectorAll(`mark[${MARK_ATTR}]`)
  marks.forEach((mark) => {
    const parent = mark.parentNode
    if (!parent) return
    while (mark.firstChild) {
      parent.insertBefore(mark.firstChild, mark)
    }
    parent.removeChild(mark)
    parent.normalize()
  })
}

function acceptTextNode(node: Node): number {
  const parent = node.parentElement
  if (!parent) return NodeFilter.FILTER_REJECT

  const tag = parent.tagName
  if (
    tag === 'SCRIPT' ||
    tag === 'STYLE' ||
    tag === 'NOSCRIPT' ||
    tag === 'TEXTAREA' ||
    tag === 'INPUT' ||
    tag === 'SELECT' ||
    tag === 'OPTION' ||
    tag === 'KBD' ||
    tag === 'CODE'
  ) {
    return NodeFilter.FILTER_REJECT
  }

  if (parent.closest(`[${MARK_ATTR}]`)) return NodeFilter.FILTER_REJECT
  if (parent.isContentEditable) return NodeFilter.FILTER_REJECT

  const text = node.textContent ?? ''
  if (!text.trim()) return NodeFilter.FILTER_REJECT

  return NodeFilter.FILTER_ACCEPT
}

/**
 * Wrap case-insensitive matches of `query` inside `root` with mark.search-hit.
 * Scrolls the first match into view. Returns match count.
 */
export function highlightSearchMatches(root: HTMLElement, query: string): number {
  clearSearchHighlights(root)

  const needle = query.trim()
  if (!needle) return 0

  const lowerNeedle = needle.toLowerCase()
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: acceptTextNode,
  })

  const textNodes: Text[] = []
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode as Text)
  }

  let count = 0
  let firstMark: HTMLElement | null = null

  for (const textNode of textNodes) {
    const text = textNode.textContent ?? ''
    const lower = text.toLowerCase()
    let idx = lower.indexOf(lowerNeedle)
    if (idx === -1) continue

    const frag = document.createDocumentFragment()
    let last = 0

    while (idx !== -1) {
      if (idx > last) {
        frag.appendChild(document.createTextNode(text.slice(last, idx)))
      }

      const mark = document.createElement('mark')
      mark.setAttribute(MARK_ATTR, '')
      mark.className = MARK_CLASS
      mark.textContent = text.slice(idx, idx + needle.length)
      frag.appendChild(mark)

      if (!firstMark) firstMark = mark
      count += 1
      last = idx + needle.length
      idx = lower.indexOf(lowerNeedle, last)
    }

    if (last < text.length) {
      frag.appendChild(document.createTextNode(text.slice(last)))
    }

    textNode.parentNode?.replaceChild(frag, textNode)
  }

  if (firstMark) {
    firstMark.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'center',
    })
  }

  return count
}
