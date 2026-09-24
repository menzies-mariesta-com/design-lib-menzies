/**
 * Copy plain text to the clipboard.
 * Prefer the async Clipboard API; fall back to a hidden textarea + execCommand
 * when permission is denied or the API is unavailable (common off-localhost
 * HTTP, headless, and strict browser policies).
 */
export async function copyTextToClipboard(text: string): Promise<void> {
  const value = text ?? ''

  if (
    typeof navigator !== 'undefined' &&
    typeof window !== 'undefined' &&
    window.isSecureContext &&
    navigator.clipboard?.writeText
  ) {
    try {
      await navigator.clipboard.writeText(value)
      return
    } catch {
      // Fall through to execCommand fallback.
    }
  }

  if (typeof document === 'undefined') {
    throw new Error('Clipboard is unavailable in this environment.')
  }

  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', '')
  textarea.setAttribute('aria-hidden', 'true')
  // Keep in-viewport so iOS / Safari treat selection as a real user copy.
  textarea.style.position = 'fixed'
  textarea.style.left = '0'
  textarea.style.top = '0'
  textarea.style.width = '1px'
  textarea.style.height = '1px'
  textarea.style.padding = '0'
  textarea.style.border = 'none'
  textarea.style.outline = 'none'
  textarea.style.boxShadow = 'none'
  textarea.style.opacity = '0'
  textarea.style.zIndex = '-1'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  textarea.setSelectionRange(0, textarea.value.length)

  let copied = false
  try {
    copied = document.execCommand('copy')
  } finally {
    document.body.removeChild(textarea)
  }

  if (!copied) {
    throw new Error('Copy failed.')
  }
}
