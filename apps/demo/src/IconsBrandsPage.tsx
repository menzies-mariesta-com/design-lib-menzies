import { useMemo } from 'react'
import { BrandIcon } from '@menzies-mariesta-com/menzies-design-wash-ui/icons/brands/catalog'
import {
  IconLibraryPage,
  type IconLibraryItem,
} from './components/IconLibraryPage'
import { brandImportSnippets, loadBrandCatalog } from './data/brandCatalog'

export default function IconsBrandsPage() {
  const items = useMemo<IconLibraryItem[]>(() => {
    return loadBrandCatalog().map((entry) => {
      const snippets = brandImportSnippets(entry)
      return {
        id: entry.slug,
        label: entry.title,
        keywords: [
          entry.slug,
          entry.washExport,
          entry.siExport,
          'brand',
          'wash',
        ]
          .filter(Boolean)
          .join(' '),
        preview: (
          <BrandIcon
            slug={entry.slug}
            className="size-6"
            aria-hidden="true"
          />
        ),
        ...snippets,
      }
    })
  }, [])

  return (
    <IconLibraryPage
      eyebrow="Icons"
      title="Brands"
      description="Full Simple Icons brands via Wash UI. Click for import snippets."
      items={items}
    />
  )
}
