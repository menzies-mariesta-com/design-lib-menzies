import type { SVGProps } from 'react'

export type BrandIconProps = SVGProps<SVGSVGElement> & {
  title?: string
  size?: number | string
}

export function BrandIconBase({
  path,
  hex,
  title,
  size = '1em',
  ...rest
}: BrandIconProps & { path: string; hex: string }) {
  return (
    <svg
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={`#${hex}`}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <path d={path} />
    </svg>
  )
}
