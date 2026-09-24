/**
 * Recipe helpers: stable class strings for gallery patterns.
 * Prefer React primitives when available; use these for progressive extraction.
 */
export const washRecipes = {
  /** Zebra table. Prefer card/chrome hover (`tableChrome` / `paneCard`); do not tint tbody rows. */
  table: 'table table-zebra',
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
  /** Panel with default 1rem padding. */
  washPanel: 'wash-panel paper-grain',
  /** Panel without padding (edge-to-edge headers / dense grids). */
  washPanelFlush: 'wash-panel wash-panel-flush paper-grain',
  /**
   * Data-table chrome: lift + border + shadow + light primary wash on hover /
   * focus-within. Includes `wash-table-chrome` so tbody zebra stays fixed
   * (card wash does not read as per-row hover). Pair with `border` + `bg-base-100`.
   */
  tableChrome:
    'wash-table-chrome shadow-sm transition-[box-shadow,transform,background-color,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md focus-within:-translate-y-0.5 focus-within:border-primary/40 focus-within:bg-primary/5 focus-within:shadow-md',
  /**
   * Decorative bordered pane (editors, marketing cards): lift + wash on hover /
   * focus-within. Theme tokens only (works across pigments).
   */
  paneCard:
    'shadow-sm transition-[box-shadow,transform,background-color,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md focus-within:-translate-y-0.5 focus-within:border-primary/40 focus-within:bg-primary/5 focus-within:shadow-md',
  alertSoft: (tone: string) => `alert alert-soft alert-${tone} border border-ink-border`,
  badgeSoft: (tone: string) => `badge badge-soft badge-${tone}`,
  progress: 'progress progress-primary progress-wash',
  skeleton: 'skeleton',
  loading: 'loading loading-spinner',
} as const
