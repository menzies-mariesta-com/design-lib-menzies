import { WASH_UI_VERSION } from './version'

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

/** Plain-text brand label with synced version, e.g. `Wash UI v0.1.0`. */
export function washUiBrandText(suffix = ''): string {
  return `Wash UI v${WASH_UI_VERSION}${suffix}`
}

/** Alias for washUiBrandText used in search labels and email footers. */
export const washUiBrandLabel = washUiBrandText

/** Inline HTML brand label for transactional email templates. */
export function washUiBrandInlineHtml(
  versionStyle = 'font-size:0.75em;opacity:0.6;',
  suffix = '',
): string {
  const suffixPart = suffix ? ` ${escapeHtml(suffix)}` : ''
  return `Wash UI <span style="${versionStyle}">v${escapeHtml(WASH_UI_VERSION)}</span>${suffixPart}`
}
