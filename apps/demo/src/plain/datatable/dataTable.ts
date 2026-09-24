import type { ReactNode } from 'react'

/**
 * Legend entry contributed by a marked column.
 * Only columns with `legend` set appear in the legends row under the footer.
 */
export type DataTableColumnLegend = {
  /** Column id this legend describes */
  columnId: string
  /** Visible legend label */
  label: string
  /** Tailwind / daisyUI background class for the swatch (e.g. `bg-primary`) */
  swatch?: string
  /** Optional node instead of (or with) a color swatch */
  icon?: ReactNode
}

/**
 * Column def with optional legend marking.
 *
 * ```ts
 * const columns: DataTableColumnDef[] = [
 *   { id: 'actions', header: 'Actions' },
 *   { id: 'status', header: 'Status', legend: { swatch: 'bg-primary' } },
 *   { id: 'tags', header: 'Tags', legend: true },
 * ]
 * const legends = resolveColumnLegends(columns)
 * ```
 */
export type DataTableColumnDef = {
  id: string
  header: string
  /**
   * Mark this column for the legends row under the footer.
   * `true` uses `header` as the legend label.
   * An object can override `label` and set `swatch` / `icon`.
   */
  legend?:
    | boolean
    | {
        label?: string
        swatch?: string
        icon?: ReactNode
      }
}

/** Collect legends from column defs that opt in via `legend`. */
export function resolveColumnLegends(
  columns: DataTableColumnDef[],
): DataTableColumnLegend[] {
  const out: DataTableColumnLegend[] = []
  for (const col of columns) {
    if (!col.legend) continue
    if (col.legend === true) {
      out.push({ columnId: col.id, label: col.header })
      continue
    }
    out.push({
      columnId: col.id,
      label: col.legend.label ?? col.header,
      swatch: col.legend.swatch,
      icon: col.legend.icon,
    })
  }
  return out
}
