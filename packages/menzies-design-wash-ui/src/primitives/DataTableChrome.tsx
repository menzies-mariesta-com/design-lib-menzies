import type { HTMLAttributes, ReactNode } from 'react'
import type { DataTableColumnLegend } from './dataTable'

export type DataTableHeaderProps = HTMLAttributes<HTMLDivElement> & {
  /** Bold title on the left (e.g. "Studio plates") */
  title: ReactNode
  /** Optional short muted description under the title */
  description?: ReactNode
  /** Optional right-side actions (secondary tools; primary Add often stays in the footer) */
  actions?: ReactNode
}

/**
 * Title strip inside the table chrome card, above the sticky thead /
 * scroll body. `shrink-0` so it never scrolls away with the rows.
 * Keep `DataTableFooterBar` for paginator + Refresh/Add.
 */
export function DataTableHeader({
  title,
  description,
  actions,
  className,
  ...rest
}: DataTableHeaderProps) {
  const hasDescription =
    description != null &&
    !(typeof description === 'string' && !description.trim())
  return (
    <div
      className={[
        'border-base-300 bg-base-100 flex shrink-0 items-start justify-between gap-3 border-b px-3 py-2.5',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <div className="min-w-0 flex-1">
        <h2 className="text-base font-bold leading-tight text-base-content">
          {title}
        </h2>
        {hasDescription ? (
          <p className="mt-0.5 text-xs text-ink-muted">{description}</p>
        ) : null}
      </div>
      {actions != null ? (
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
          {actions}
        </div>
      ) : null}
    </div>
  )
}

export type DataTableLegendsRowProps = HTMLAttributes<HTMLDivElement> & {
  legends: DataTableColumnLegend[]
  /** Optional leading label before the swatches (omitted when empty) */
  title?: string
}

/**
 * Legends row rendered under the footer bar (includes a top border
 * divider). Renders only when `legends` is non-empty. Pass legends from
 * `resolveColumnLegends(columns)` or a hand-built list.
 */
export function DataTableLegendsRow({
  legends,
  title,
  className,
  ...rest
}: DataTableLegendsRowProps) {
  if (legends.length === 0) return null
  const showTitle = Boolean(title?.trim())
  return (
    <div
      className={[
        'border-base-300 bg-base-100 flex shrink-0 flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t px-3 pt-3 pb-2',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {showTitle ? (
        <span className="text-xs font-semibold text-ink-muted">{title}</span>
      ) : null}
      <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-x-6 gap-y-1.5 p-0">
        {legends.map((item) => (
          <li
            key={item.columnId}
            className="flex items-center gap-2 text-xs text-base-content"
          >
            {item.icon ? (
              <span className="inline-flex size-3.5 items-center justify-center" aria-hidden>
                {item.icon}
              </span>
            ) : (
              <span
                className={[
                  'inline-block size-2.5 shrink-0 rounded-full',
                  item.swatch ?? 'bg-base-content/60',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-hidden
              />
            )}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export type DataTableFooterBarProps = HTMLAttributes<HTMLDivElement> & {
  /** Center summary, e.g. `Showing 1-5 of 10` */
  summary: ReactNode
  /** Right-side: Refresh + Add (or other row actions) */
  controls: ReactNode
  /** Left slot: per-page select + paginator */
  start?: ReactNode
}

/**
 * Three-section footer: per-page + paginator on the left, centered
 * "Showing…" text, Refresh/Add on the right.
 * Always one horizontal row (`1fr auto 1fr`). Place
 * `DataTableLegendsRow` after this (legends row includes a top border).
 */
export function DataTableFooterBar({
  summary,
  controls,
  start,
  className,
  ...rest
}: DataTableFooterBarProps) {
  return (
    <div
      className={[
        'border-base-300 bg-base-100 grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-2 border-t px-3 py-2',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <div className="flex min-w-0 flex-wrap items-center justify-start justify-self-start gap-2">
        {start}
      </div>
      <p className="justify-self-center font-mono text-center text-xs text-ink-muted">
        {summary}
      </p>
      <div className="flex min-w-0 flex-wrap items-center justify-end justify-self-end gap-2">
        {controls}
      </div>
    </div>
  )
}
