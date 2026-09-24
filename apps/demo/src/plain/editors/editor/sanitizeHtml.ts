const ALLOWED_TAGS = new Set([
  'P',
  'BR',
  'DIV',
  'SPAN',
  'STRONG',
  'B',
  'EM',
  'I',
  'U',
  'S',
  'STRIKE',
  'H1',
  'H2',
  'H3',
  'UL',
  'OL',
  'LI',
  'A',
  'BLOCKQUOTE',
  'HR',
])

const ALLOWED_ATTRS = new Set(['href', 'target', 'rel', 'class'])

/** Strip unsafe tags/attrs from rich HTML (paste + controlled sync). */
export function sanitizeRichHtml(html: string): string {
  if (typeof document === 'undefined') return html
  const template = document.createElement('template')
  template.innerHTML = html
  const walk = (node: Node) => {
    const children = Array.from(node.childNodes)
    for (const child of children) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const el = child as HTMLElement
        if (!ALLOWED_TAGS.has(el.tagName)) {
          const text = document.createTextNode(el.textContent ?? '')
          el.replaceWith(text)
          continue
        }
        for (const attr of Array.from(el.attributes)) {
          if (!ALLOWED_ATTRS.has(attr.name.toLowerCase())) {
            el.removeAttribute(attr.name)
          }
        }
        if (el.tagName === 'A') {
          const href = el.getAttribute('href') ?? ''
          if (!/^(https?:|mailto:|#)/i.test(href)) {
            el.removeAttribute('href')
          }
          el.setAttribute('rel', 'noopener noreferrer')
          el.setAttribute('target', '_blank')
        }
        walk(el)
      } else if (child.nodeType === Node.COMMENT_NODE) {
        child.parentNode?.removeChild(child)
      }
    }
  }
  walk(template.content)
  return template.innerHTML
}

export function isRichHtmlEmpty(html: string): boolean {
  const text = html
    .replace(/<br\s*\/?>/gi, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .trim()
  return text.length === 0
}
