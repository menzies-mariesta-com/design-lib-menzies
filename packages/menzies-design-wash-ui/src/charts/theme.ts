import type { ApexOptions } from 'apexcharts'
import { THEME_CHANGE_EVENT } from '../theme'

/** Wash UI CSS custom properties mapped for chart theming. */
const WASH_CHART_VARS = {
  primary: '--color-primary',
  secondary: '--color-secondary',
  accent: '--color-accent',
  info: '--color-info',
  success: '--color-success',
  warning: '--color-warning',
  error: '--color-error',
  neutral: '--color-neutral',
  baseContent: '--color-base-content',
  base100: '--color-base-100',
  base200: '--color-base-200',
  base300: '--color-base-300',
  inkMuted: '--ink-muted',
  inkBorder: '--ink-border',
  fontSans: '--font-sans',
} as const

export type WashChartCssTokens = Record<keyof typeof WASH_CHART_VARS, string>

const DEFAULT_WASH_CHART_COLORS = [
  '#276c8e',
  '#3b3b36',
  '#b87524',
  '#4a7a8e',
  '#3f7a52',
  '#b87524',
  '#a33a32',
]

function readCssVar(name: string, fallback = '', root?: HTMLElement): string {
  const el = root ?? (typeof document !== 'undefined' ? document.documentElement : null)
  if (!el) return fallback
  const value = getComputedStyle(el).getPropertyValue(name).trim()
  return value || fallback
}

/** Read current Wash pigment tokens from computed CSS variables. */
export function readWashChartTokens(root?: HTMLElement): WashChartCssTokens {
  const el = root ?? (typeof document !== 'undefined' ? document.documentElement : null)
  if (!el) {
    return {
      primary: '',
      secondary: '',
      accent: '',
      info: '',
      success: '',
      warning: '',
      error: '',
      neutral: '',
      baseContent: '',
      base100: '',
      base200: '',
      base300: '',
      inkMuted: '',
      inkBorder: '',
      fontSans: '',
    }
  }

  return {
    primary: readCssVar(WASH_CHART_VARS.primary, '', el),
    secondary: readCssVar(WASH_CHART_VARS.secondary, '', el),
    accent: readCssVar(WASH_CHART_VARS.accent, '', el),
    info: readCssVar(WASH_CHART_VARS.info, '', el),
    success: readCssVar(WASH_CHART_VARS.success, '', el),
    warning: readCssVar(WASH_CHART_VARS.warning, '', el),
    error: readCssVar(WASH_CHART_VARS.error, '', el),
    neutral: readCssVar(WASH_CHART_VARS.neutral, '', el),
    baseContent: readCssVar(WASH_CHART_VARS.baseContent, '', el),
    base100: readCssVar(WASH_CHART_VARS.base100, '', el),
    base200: readCssVar(WASH_CHART_VARS.base200, '', el),
    base300: readCssVar(WASH_CHART_VARS.base300, '', el),
    inkMuted: readCssVar(WASH_CHART_VARS.inkMuted, '', el),
    inkBorder: readCssVar(WASH_CHART_VARS.inkBorder, '', el),
    fontSans:
      readCssVar(WASH_CHART_VARS.fontSans, '', el) ||
      '"Maple Mono", ui-monospace, monospace',
  }
}

/** True when `data-theme` ends with `-dark` (Wash pigment dark mode). */
export function isWashDarkMode(root?: HTMLElement): boolean {
  const el = root ?? (typeof document !== 'undefined' ? document.documentElement : null)
  if (!el) return false
  const theme = el.getAttribute('data-theme') ?? ''
  if (theme.endsWith('-dark')) return true
  return getComputedStyle(el).colorScheme === 'dark'
}

/** Stable key for memoizing chart options when pigment or mode changes. */
export function washChartThemeKey(root?: HTMLElement): string {
  const el = root ?? (typeof document !== 'undefined' ? document.documentElement : null)
  return el?.getAttribute('data-theme') ?? 'wash-default'
}

/** Semantic series palette derived from the active pigment theme. */
export function washChartPalette(tokens: WashChartCssTokens = readWashChartTokens()): string[] {
  const palette = [
    tokens.primary,
    tokens.accent,
    tokens.secondary,
    tokens.info,
    tokens.success,
    tokens.warning,
    tokens.error,
    tokens.neutral,
  ].filter(Boolean)

  return palette.length > 0 ? palette : DEFAULT_WASH_CHART_COLORS
}

export function readWashChartColors(override?: string[]): string[] {
  if (override?.length) return override
  return washChartPalette()
}

export type WashApexThemeOptions = {
  tokens?: WashChartCssTokens
  dark?: boolean
  partial?: ApexOptions
}

/** Build ApexCharts theme options from Wash UI CSS variables. */
export function buildWashApexTheme(options: WashApexThemeOptions = {}): ApexOptions {
  const tokens = options.tokens ?? readWashChartTokens()
  const dark = options.dark ?? isWashDarkMode()
  const palette = washChartPalette(tokens)
  const fontFamily = tokens.fontSans || 'inherit'
  const labelColor = tokens.inkMuted || tokens.baseContent
  const gridColor = tokens.inkBorder || tokens.base300

  const base: ApexOptions = {
    theme: {
      mode: dark ? 'dark' : 'light',
      palette: 'palette1',
    },
    colors: palette,
    chart: {
      background: 'transparent',
      fontFamily,
      foreColor: labelColor,
      toolbar: {
        show: false,
        tools: {
          download: false,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
      animations: {
        enabled: true,
        speed: 450,
      },
      redrawOnParentResize: true,
      redrawOnWindowResize: true,
      zoom: { enabled: false },
    },
    grid: {
      borderColor: gridColor,
      strokeDashArray: 4,
      padding: {
        left: 8,
        right: 8,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontFamily,
          fontWeight: 500,
        },
      },
      axisBorder: {
        color: gridColor,
      },
      axisTicks: {
        color: gridColor,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontFamily,
          fontWeight: 500,
        },
      },
    },
    legend: {
      fontFamily,
      labels: {
        colors: labelColor,
      },
      markers: {
        shape: 'circle',
      },
    },
    tooltip: {
      theme: dark ? 'dark' : 'light',
      style: {
        fontFamily,
        fontSize: '12px',
      },
    },
    dataLabels: {
      style: {
        fontFamily,
        fontWeight: 600,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
      lineCap: 'round',
    },
    fill: {
      opacity: 0.88,
    },
    title: {
      style: {
        fontFamily,
        color: labelColor,
        fontWeight: '600',
      },
    },
    subtitle: {
      style: {
        fontFamily,
        color: labelColor,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            name: { color: labelColor },
            value: { color: labelColor },
            total: { color: labelColor },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  }

  return mergeWashChartOptions(base, options.partial)
}

/** Alias for chart preset builders that accept partial overrides. */
export function buildWashApexOptions(partial?: ApexOptions): ApexOptions {
  return buildWashApexTheme({ partial })
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** Deep-merge Wash defaults with caller options (caller wins on conflicts). */
export function mergeWashChartOptions(
  base: ApexOptions,
  overrides: ApexOptions = {},
): ApexOptions {
  const result: Record<string, unknown> = { ...base }

  for (const [key, value] of Object.entries(overrides)) {
    const existing = result[key]
    if (isPlainObject(existing) && isPlainObject(value)) {
      result[key] = mergeWashChartOptions(existing as ApexOptions, value as ApexOptions)
    } else {
      result[key] = value
    }
  }

  return result as ApexOptions
}

/** Convenience helper: Wash defaults merged with partial overrides. */
export function mergeWashOptions(partial?: ApexOptions): ApexOptions {
  return buildWashApexOptions(partial)
}

export function mergeApexOptions(...parts: Array<ApexOptions | undefined>): ApexOptions {
  return parts.reduce<ApexOptions>(
    (acc, part) => mergeWashChartOptions(acc, part ?? {}),
    {},
  )
}

/** Subscribe to pigment/mode changes via `data-theme` and Wash theme events. */
export function subscribeWashChartTheme(onChange: () => void): () => void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => undefined
  }

  const refresh = () => onChange()

  window.addEventListener(THEME_CHANGE_EVENT, refresh)

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
        refresh()
        break
      }
    }
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, refresh)
    observer.disconnect()
  }
}

export function buildCartesianOptions(
  props: Pick<
    import('./types.js').WashCartesianChartProps,
    | 'title'
    | 'subtitle'
    | 'categories'
    | 'xaxisTitle'
    | 'yaxisTitle'
    | 'showLegend'
    | 'showToolbar'
    | 'colors'
    | 'stacked'
  >,
): ApexOptions {
  return {
    colors: props.colors,
    title: props.title ? { text: props.title, align: 'left' as const } : undefined,
    subtitle: props.subtitle ? { text: props.subtitle, align: 'left' as const } : undefined,
    chart: {
      stacked: props.stacked ?? false,
      toolbar: { show: props.showToolbar ?? false },
    },
    legend: { show: props.showLegend ?? true },
    xaxis: {
      categories: props.categories,
      title: props.xaxisTitle ? { text: props.xaxisTitle } : undefined,
    },
    yaxis: {
      title: props.yaxisTitle ? { text: props.yaxisTitle } : undefined,
    },
  }
}

export function buildRadialTitleOptions(
  props: Pick<
    import('./types.js').WashRadialBarChartProps,
    'title' | 'subtitle' | 'showLegend' | 'colors'
  >,
): ApexOptions {
  return {
    colors: props.colors,
    title: props.title ? { text: props.title, align: 'left' as const } : undefined,
    subtitle: props.subtitle ? { text: props.subtitle, align: 'left' as const } : undefined,
    legend: { show: props.showLegend ?? true },
  }
}

export function buildPieTitleOptions(
  props: Pick<
    import('./types.js').WashPieChartProps,
    'title' | 'subtitle' | 'showLegend' | 'colors'
  >,
): ApexOptions {
  return {
    colors: props.colors,
    title: props.title ? { text: props.title, align: 'left' as const } : undefined,
    subtitle: props.subtitle ? { text: props.subtitle, align: 'left' as const } : undefined,
    legend: { show: props.showLegend ?? true },
    labels: undefined,
  }
}
