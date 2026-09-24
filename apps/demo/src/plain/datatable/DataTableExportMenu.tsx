import type { HTMLAttributes } from 'react'
import { Download } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import {
  DROPDOWN_PANEL_OVERFLOW,
  DROPDOWN_PANEL_Z,
} from '../lib/dropdownPlacement'

export type DataTableExportFormat = 'excel' | 'csv' | 'ods'

export type DataTableExportMenuProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  /** Called when the user picks a format. Caller owns file generation. */
  onExport: (format: DataTableExportFormat) => void
  /** Disable the trigger (e.g. no filtered rows). */
  disabled?: boolean
  /** Busy state while an export is in flight. */
  exporting?: boolean
}

const FORMATS: { format: DataTableExportFormat; label: string }[] = [
  { format: 'excel', label: 'Excel' },
  { format: 'csv', label: 'CSV' },
  { format: 'ods', label: 'ODS' },
]

function blurActive() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
}

/**
 * Header-side Export control for data table chrome: click / focus opens
 * Excel / CSV / ODS (not hover, so the icon tooltip can show while closed).
 * `wash-dropdown-contained` keeps open panels from unlocking rounded chrome
 * overflow. Place in `DataTableHeader` `actions`.
 */
export function DataTableExportMenu({
  onExport,
  disabled = false,
  exporting = false,
  className,
  ...rest
}: DataTableExportMenuProps) {
  const busy = disabled || exporting
  const cursor = busy ? 'cursor-not-allowed' : 'cursor-pointer'

  return (
    <div
      className={[
        'dropdown dropdown-end dropdown-bottom dropdown-no-hover wash-dropdown-contained',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <div className="tooltip tooltip-secondary" data-tip="Export">
        <div
          tabIndex={busy ? -1 : 0}
          role="button"
          className={[
            'btn btn-ghost btn-square btn-sm btn-secondary',
            cursor,
            exporting ? 'loading' : null,
            busy ? 'btn-disabled' : null,
          ]
            .filter(Boolean)
            .join(' ')}
          aria-label="Export"
          aria-haspopup="menu"
          aria-busy={exporting || undefined}
          aria-disabled={busy || undefined}
        >
          {!exporting ? (
            <Download className="size-4" strokeWidth={2} aria-hidden />
          ) : null}
        </div>
      </div>
      {!busy ? (
        <ul
          tabIndex={-1}
          role="menu"
          className={`menu dropdown-content ${DROPDOWN_PANEL_Z} mt-1 w-40 rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)] ${DROPDOWN_PANEL_OVERFLOW}`}
        >
          {FORMATS.map(({ format, label }) => (
            <li key={format} role="none">
              <button
                type="button"
                role="menuitem"
                className="cursor-pointer"
                onClick={() => {
                  onExport(format)
                  blurActive()
                }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
