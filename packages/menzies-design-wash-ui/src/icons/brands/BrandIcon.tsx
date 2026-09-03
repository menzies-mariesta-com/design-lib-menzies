import { BrandIconBase, type BrandIconProps } from './BrandIconBase'
import { getBrand } from './catalog'

export type DynamicBrandIconProps = BrandIconProps & {
  /** Simple Icons slug, e.g. `github`, `nextdotjs`. */
  slug: string
}

/**
 * Render any Simple Icons brand by slug via Wash (do not import `simple-icons` in apps).
 */
export function BrandIcon({ slug, title, ...rest }: DynamicBrandIconProps) {
  const brand = getBrand(slug)
  if (!brand) return null
  return (
    <BrandIconBase
      path={brand.path}
      hex={brand.hex}
      title={title ?? brand.title}
      {...rest}
    />
  )
}
