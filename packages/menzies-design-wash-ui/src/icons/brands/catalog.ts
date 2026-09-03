import * as si from 'simple-icons'
import { WASH_BRAND_BY_SLUG } from './slugMap'

export type BrandCatalogEntry = {
  title: string
  slug: string
  hex: string
  path: string
  /** Internal simple-icons export key (not a public app import). */
  siExport: string
  /** Curated Wash `/icons/brands` component name when available. */
  washExport?: string
}

type SiIcon = {
  title: string
  slug: string
  hex: string
  path: string
}

function isSiIcon(value: unknown): value is SiIcon {
  return (
    !!value &&
    typeof value === 'object' &&
    'slug' in value &&
    'path' in value &&
    'hex' in value &&
    'title' in value
  )
}

/** Full Simple Icons catalog exposed through Wash (search / BrandIcon). */
export const brandCatalog: BrandCatalogEntry[] = Object.entries(si)
  .filter(([key, value]) => key.startsWith('si') && isSiIcon(value))
  .map(([key, value]) => {
    const icon = value as SiIcon
    return {
      title: icon.title,
      slug: icon.slug,
      hex: icon.hex,
      path: icon.path,
      siExport: key,
      washExport: WASH_BRAND_BY_SLUG[icon.slug],
    }
  })
  .sort((a, b) => a.title.localeCompare(b.title))

export const brandSlugs: readonly string[] = brandCatalog.map((b) => b.slug)

const bySlug = new Map(brandCatalog.map((entry) => [entry.slug, entry]))

export function getBrand(slug: string): BrandCatalogEntry | undefined {
  return bySlug.get(slug)
}
