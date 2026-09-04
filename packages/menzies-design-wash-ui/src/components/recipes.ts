/**
 * Recipe helpers: stable class strings for gallery patterns.
 * Prefer React primitives when available; use these for progressive extraction.
 */
export const washRecipes = {
  table: 'table table-zebra [&_tbody_tr]:hover:bg-primary/40',
  btnRipple: 'btn ripple cursor-pointer',
  tooltipIcon: (tone: string, side = 'right') =>
    `tooltip tooltip-${side} tooltip-${tone}`,
  join: 'join',
  menu: 'menu rounded-box border border-ink-border bg-base-100',
  navbar: 'navbar border-b border-ink-border/80 bg-base-100/80 backdrop-blur-sm',
  drawer: 'drawer lg:drawer-open',
  /** App / page atmosphere (also available as `<WashBackground>`). */
  pageWash: 'page-wash paper-grain',
  pageWashFlat: 'page-wash',
  /**
   * Full shell root + atmosphere. Prefer `<WashShell>` in React.
   * Pair with `washShellMain` on the content landmark.
   */
  washShell: 'page-wash paper-grain wash-shell',
  washShellFlat: 'page-wash wash-shell',
  /** Padded content column (max-width + page gutters). */
  washShellMain: 'wash-shell-main',
  /** Panel with default 1rem padding (Compose WashPanel parity). */
  washPanel: 'wash-panel paper-grain',
  /** Panel without padding (edge-to-edge headers / dense grids). */
  washPanelFlush: 'wash-panel wash-panel-flush paper-grain',
  alertSoft: (tone: string) => `alert alert-soft alert-${tone} border border-ink-border`,
  badgeSoft: (tone: string) => `badge badge-soft badge-${tone}`,
  progress: 'progress progress-primary progress-wash',
  skeleton: 'skeleton',
  loading: 'loading loading-spinner',
} as const
