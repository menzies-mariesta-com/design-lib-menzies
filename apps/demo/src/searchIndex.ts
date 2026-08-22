import type { WashIcon } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import type { AppPage } from './nav'

export type SearchNavItem = {
  id: AppPage
  label: string
  icon: WashIcon
  page?: AppPage
}

export type SearchEntry = {
  id: AppPage
  label: string
  subtitle: string
  keywords: string[]
  icon: WashIcon
}

/** Extra aliases beyond label / subtitle / id tokens. */
const extraKeywords: Partial<Record<AppPage, string[]>> = {
  overview: [
    'dashboard',
    'home',
    'studio',
    'desk',
    'kpi',
    'plates',
    'menzies',
    'menzies design',
    'wash ui',
  ],
  'docs-start': ['install', 'quickstart', 'getting started', 'washprovider'],
  'docs-theming': ['theme', 'pigment', 'dark', 'light', 'customize'],
  'docs-brush': ['brush', 'preset', 'atmosphere', 'css variables'],
  'docs-tokens': ['tokens', 'wash', 'paper', 'ink', 'motion'],
  'docs-customize': ['props', 'a11y', 'accessibility', 'slots', 'variants'],
  buttons: ['btn', 'cta', 'click', 'gallery'],
  ripple: ['ink', 'splash', 'effect'],
  links: ['anchor', 'href', 'url', 'preview', 'hover'],
  accordion: ['expand', 'collapse', 'section'],
  collapse: ['fold', 'panel', 'disclosure'],
  fab: ['floating', 'action', 'speed dial'],
  checkbox: ['tick', 'check', 'form'],
  toggle: ['switch', 'boolean'],
  swap: ['flip', 'icon swap'],
  radio: ['option', 'choice', 'form'],
  input: ['text field', 'form', 'field'],
  textarea: ['multiline', 'form'],
  range: ['slider', 'volume'],
  rating: ['stars', 'score'],
  select: ['dropdown', 'option', 'form'],
  'select-search': ['combobox', 'filterable', 'typeahead'],
  autocomplete: ['suggest', 'typeahead', 'combobox'],
  fieldset: ['form', 'group', 'legend'],
  label: ['form', 'caption'],
  otp: ['pin', 'code', 'one time'],
  validator: ['validation', 'error', 'form'],
  'file-input': ['upload', 'attach'],
  filter: ['facet', 'chip filter'],
  'floating-panel': ['float', 'draggable', 'popover', 'inspector', 'overlay'],
  join: ['group', 'connected'],
  tooltip: ['hint', 'hover', 'smart placement', 'clip'],
  card: ['panel', 'tile'],
  stat: ['metric', 'kpi', 'number'],
  bento: ['masonry', 'grid', 'layout'],
  'hover-3d': ['perspective', 'tilt', 'card'],
  'hover-gallery': ['images', 'preview'],
  carousel: ['slider', 'swiper', 'gallery'],
  'charts-overview': ['chart', 'wash chart', 'graph', 'analytics', 'kpi'],
  'charts-sparklines': [
    'sparkline',
    'mini chart',
    'kpi',
    'stat block',
    'trend',
    'micro chart',
    'desk kpi',
    'wash chart',
  ],
  'charts-line': [
    'line chart',
    'missing values',
    'null gaps',
    'gradient line chart',
    'stepline chart',
    'trend',
    'wash chart',
    'time series',
    'realtime chart',
    'live chart',
    'streaming',
    'synced charts',
    'linked charts',
    'brush chart',
    'range selection',
    'downsampled line chart',
    'lttb',
    'min-max',
    'large dataset',
    'annotations',
    'drilldown',
  ],
  'charts-area': [
    'area chart',
    'stacked area',
    'spline area',
    'datetime area',
    'missing values area',
    'negative area',
    'github style area',
    'irregular time series',
    'filled chart',
    'wash chart',
  ],
  'charts-range-area': [
    'range area',
    'range area chart',
    'band chart',
    'confidence interval',
    'high low range',
    'spread chart',
    'range line combo',
    'wash chart',
  ],
  'charts-bar': [
    'bar chart',
    'horizontal bar',
    'stacked bar',
    'grouped bar',
    'negative bar',
    'reversed bar',
    'bar markers',
    'bar race',
    'patterned bar',
    'wash chart',
  ],
  'charts-mixed': [
    'mixed chart',
    'combo chart',
    'line column',
    'line area',
    'dual y axis',
    'multiple y axis',
    'wash chart',
  ],
  'charts-column': [
    'column chart',
    'vertical bar',
    'stacked column',
    'grouped column',
    'data labels',
    'negative column',
    'wash chart',
  ],
  'charts-timeline': [
    'timeline chart',
    'gantt chart',
    'range bar',
    'project plan',
    'schedule',
    'wash chart',
  ],
  'charts-pie': [
    'pie chart',
    'donut',
    'donut chart',
    'monochrome pie',
    'gradient donut',
    'rounded donut',
    'circular',
    'wash chart',
  ],
  'charts-radialbar': [
    'radial bar',
    'radial bar chart',
    'circle chart',
    'multi track radial',
    'custom angle',
    'start angle',
    'wash chart',
  ],
  'charts-gauge': [
    'gauge chart',
    'radial gauge',
    'semi circle gauge',
    'needle gauge',
    'progress gauge',
    'wash chart',
    'kpi',
  ],
  'charts-slope': [
    'slope chart',
    'slope',
    'slope graph',
    'change chart',
    'period comparison',
    'multi group slope',
    'basic slope',
    'wash chart',
    'studio throughput',
  'charts-bubble': [
    'bubble chart',
    'bubble',
    'xyz chart',
    '3d bubble',
    'bubble size',
    'z dimension',
    'wash chart',
    'pigment load',
    'batch size',
  ],
  'charts-heatmap': [
    'heatmap',
    'heatmap chart',
    'grid chart',
    'matrix',
    'intensity',
    'color range',
    'multiple series heatmap',
    'rounded cells',
    'calendar heatmap',
    'continuous datetime',
    'gradient legend',
    'drilldown',
    'canvas renderer',
    'wash chart',
    'pigment',
  ],
  'charts-scatter': [
    'scatter chart',
    'scatter',
    'scatter plot',
    'xy chart',
    'datetime scatter',
    'jitter scatter',
    'wash chart',
    'viscosity',
    'moisture',
  ],
  tabs: ['segment', 'panel'],
  table: ['grid', 'rows'],
  'auth-screen': ['login', 'signup', 'sign in', 'register', 'password', 'auth'],
  'auth-2fa': [
    'two factor',
    '2fa',
    'totp',
    'authenticator',
    'backup code',
    'mfa',
    'template',
  ],
  'forgot-password': [
    'reset password',
    'recover',
    'reset link',
    'forgot',
    'email reset',
    'template',
  ],
  'auth-otp': [
    'one time password',
    'verification code',
    'sms',
    'magic code',
    'passwordless',
    'template',
  ],
  'data-table': ['crud', 'datagrid', 'ledger', 'template'],
  list: ['rows', 'items'],
  'transfer-list': ['dual list', 'move', 'shuttle'],
  pagination: ['pages', 'pager'],
  bottomsheet: ['sheet', 'drawer bottom'],
  dock: ['taskbar', 'bottom bar'],
  drawer: ['sidebar', 'side panel'],
  footer: ['site footer'],
  dropdown: ['menu', 'popover'],
  menu: ['nav', 'sidebar menu'],
  'context-menu': ['right click', 'contextual'],
  megamenu: ['mega', 'nav'],
  navbar: ['top bar', 'header'],
  'app-bar': ['toolbar', 'top bar'],
  'aspect-ratio': ['aspect', 'ratio', 'crop'],
  mockup: ['phone', 'browser', 'device'],
  hero: ['banner', 'landing'],
  'text-rotate': ['rotate', 'cycle', 'words'],
  aura: ['glow', 'atmosphere'],
  dialog: ['modal', 'popup', 'overlay'],
  alert: ['banner', 'warning', 'notice'],
  toast: ['notification', 'snack'],
  snackbar: ['toast', 'notification'],
  badge: ['count', 'pill'],
  chip: ['tag', 'token'],
  kbd: ['keyboard', 'shortcut', 'hotkey'],
  indicator: ['badge', 'presence'],
  status: ['dot', 'online'],
  loading: ['spinner', 'busy', 'brush', 'pigment', 'logo', 'wash'],
  skeleton: ['placeholder', 'shimmer'],
  progress: ['bar', 'percent'],
  'radial-progress': ['circle', 'percent'],
  steps: ['wizard', 'stepper'],
  timeline: ['history', 'events'],
  'org-chart': ['org', 'hierarchy', 'tree'],
  avatar: ['profile', 'photo'],
  mask: ['shape', 'clip'],
  marquee: ['scroll', 'ticker', 'banner', 'loop'],
  chat: ['message', 'bubble', 'conversation'],
  calendar: ['date', 'schedule', 'events'],
  'date-time': ['time', 'date', 'datetime', 'range', 'cally', 'temporal'],
  countdown: ['timer', 'clock'],
  diff: ['compare', 'before after'],
  divider: ['separator', 'rule'],
  palette: ['color', 'pigment', 'swatch'],
  'theme-controller': ['theme', 'dark', 'light', 'mode'],
  layers: ['stack', 'z-index'],
  brushes: ['brush', 'stroke', 'tool'],
}

export function buildSearchEntries(
  nav: SearchNavItem[],
  pageSubtitle: Record<AppPage, string>,
): SearchEntry[] {
  return nav
    .filter((item) => item.page)
    .map((item) => {
      const page = item.page as AppPage
      const subtitle = pageSubtitle[page] ?? ''
      const idTokens = page.split('-').filter(Boolean)
      const keywords = [
        item.label,
        subtitle,
        page,
        ...idTokens,
        ...(extraKeywords[page] ?? []),
      ]
        .map((k) => k.trim().toLowerCase())
        .filter(Boolean)

      return {
        id: page,
        label: item.label,
        subtitle,
        keywords: [...new Set(keywords)],
        icon: item.icon,
      }
    })
}

export function filterSearchEntries(
  entries: SearchEntry[],
  query: string,
): SearchEntry[] {
  const q = query.trim().toLowerCase()
  if (!q) return entries

  const scored = entries
    .map((entry) => {
      const label = entry.label.toLowerCase()
      const subtitle = entry.subtitle.toLowerCase()
      const id = entry.id.toLowerCase()
      let score = 0

      if (label === q) score += 100
      else if (label.startsWith(q)) score += 80
      else if (label.includes(q)) score += 50

      if (id === q) score += 40
      else if (id.includes(q)) score += 25

      if (subtitle.includes(q)) score += 20

      if (entry.keywords.some((k) => k === q || k.includes(q))) score += 15

      return { entry, score }
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.label.localeCompare(b.entry.label))

  return scored.map((row) => row.entry)
}
