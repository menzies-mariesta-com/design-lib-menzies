import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ReactNode,
  Ref,
} from 'react'
import { WashBackground } from './WashBackground'

export type WashShellProps = ComponentPropsWithoutRef<'div'> & {
  children?: ReactNode
  /**
   * Paper-fiber grain overlay. Defaults to true (same as WashBackground).
   */
  grain?: boolean
  /** Optional top chrome (navbar, breadcrumbs, toolbars). */
  header?: ReactNode
  /**
   * Optional sidebar. When set, enables the daisyUI drawer shell
   * (`drawer` + overlay). Pass the `<aside>` (or equivalent) as children of this slot.
   */
  sidebar?: ReactNode
  /** Checkbox id for the drawer toggle. Default `wash-drawer`. */
  drawerId?: string
  /** Open the drawer from the `lg` breakpoint up. Default true when `sidebar` is set. */
  drawerOpenOnLg?: boolean
  /**
   * Main content max width in CSS pixels. Default `1320`.
   * Pass `false` for a full-bleed main (still keeps page padding unless `flush`).
   */
  maxWidth?: number | false
  /** Skip page padding on the main column (`wash-shell-main-flush`). */
  flush?: boolean
  /** Extra props for the `<main>` landmark (supports `ref`). */
  mainProps?: ComponentPropsWithoutRef<'main'> & {
    ref?: Ref<HTMLElement>
  }
}

/**
 * Full app shell: atmosphere background, optional header/sidebar, and a
 * padded content column. Prefer this over hand-rolled `px-4 py-6` / max-width.
 *
 * Vanilla equivalent:
 * `page-wash paper-grain wash-shell` + `wash-shell-main` on `<main>`.
 */
export function WashShell({
  children,
  className,
  grain = true,
  header,
  sidebar,
  drawerId = 'wash-drawer',
  drawerOpenOnLg = true,
  maxWidth = 1320,
  flush = false,
  mainProps,
  ...rest
}: WashShellProps) {
  const hasDrawer = Boolean(sidebar)

  const rootClass = [
    'wash-shell',
    hasDrawer && 'drawer',
    hasDrawer && drawerOpenOnLg && 'lg:drawer-open',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const { className: mainClassName, style: mainStyle, ...mainRest } =
    mainProps ?? {}

  const mainClass = [
    'wash-shell-main',
    flush && 'wash-shell-main-flush',
    maxWidth === false && 'wash-shell-main-fluid',
    mainClassName,
  ]
    .filter(Boolean)
    .join(' ')

  const resolvedMainStyle: CSSProperties | undefined = (() => {
    const next: CSSProperties = { ...mainStyle }
    if (typeof maxWidth === 'number' && maxWidth !== 1320) {
      next.maxWidth = `${maxWidth}px`
    }
    return Object.keys(next).length > 0 ? next : undefined
  })()

  return (
    <WashBackground className={rootClass} grain={grain} {...rest}>
      {hasDrawer ? (
        <input id={drawerId} type="checkbox" className="drawer-toggle" />
      ) : null}

      <div
        className={
          hasDrawer
            ? 'drawer-content flex min-h-dvh flex-col'
            : 'flex min-h-dvh flex-col'
        }
      >
        {header}
        <main className={mainClass} style={resolvedMainStyle} {...mainRest}>
          {children}
        </main>
      </div>

      {hasDrawer ? (
        <div className="drawer-side z-40">
          <label
            htmlFor={drawerId}
            aria-label="Close sidebar"
            className="drawer-overlay"
          />
          {sidebar}
        </div>
      ) : null}
    </WashBackground>
  )
}
