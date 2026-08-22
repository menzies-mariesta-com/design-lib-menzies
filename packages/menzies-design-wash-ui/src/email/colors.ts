/** Mineral pigment palette (default Wash theme) for email-safe inline colors. */
export const WASH_EMAIL_COLORS = {
  primary: '#276c8e',
  primaryLight: '#e8f1f5',
  accent: '#b87524',
  base100: '#ffffff',
  base200: '#f7f4ef',
  base300: '#e8e1d4',
  baseContent: '#111111',
  inkMuted: '#5c5a54',
  inkBorder: '#d9d2c6',
  error: '#a33a32',
} as const

export type WashEmailColors = typeof WASH_EMAIL_COLORS
