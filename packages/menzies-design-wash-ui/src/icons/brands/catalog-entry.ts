/**
 * Full Simple Icons catalog + dynamic BrandIcon via Wash.
 * Import from `@menzies-mariesta-com/menzies-design-wash-ui/icons/brands/catalog`
 * when you need pickers or slug-based rendering. Prefer curated named exports
 * from `…/icons/brands` for static marks.
 */

export type { BrandCatalogEntry } from './catalog'
export { brandCatalog, brandSlugs, getBrand } from './catalog'

export type { DynamicBrandIconProps } from './BrandIcon'
export { BrandIcon } from './BrandIcon'
export { BrandIconBase } from './BrandIconBase'
export type { BrandIconProps } from './BrandIconBase'
export { WASH_BRAND_BY_SLUG } from './slugMap'
