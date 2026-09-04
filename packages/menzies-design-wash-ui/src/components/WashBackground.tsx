import type { HTMLAttributes, ReactNode } from 'react'

export type WashBackgroundProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
  /**
   * Paper-fiber grain overlay (`paper-grain`). Defaults to true to match the
   * demo-web app shell. Disable for flat pigment washes only.
   */
  grain?: boolean
}

/**
 * Page atmosphere: soft pigment radial washes over `base-100`, with optional
 * paper grain. Wrap app shells or hero surfaces.
 *
 * Uses the `page-wash` (+ optional `paper-grain`) CSS utilities from Wash styles.
 */
export function WashBackground({
  children,
  className,
  grain = true,
  ...rest
}: WashBackgroundProps) {
  return (
    <div
      className={['page-wash', grain && 'paper-grain', className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  )
}
