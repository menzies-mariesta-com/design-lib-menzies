import { useMemo } from 'react'
import {
  DynamicIcon,
  iconNames,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { IconLibraryPage } from './components/IconLibraryPage'
import {
  buildLucideCatalog,
  lucideImportSnippets,
} from './data/iconCatalog'

export default function IconsUsagePage() {
  const items = useMemo(() => {
    return buildLucideCatalog(iconNames).map((entry) => {
      const snippets = lucideImportSnippets(entry)
      return {
        id: entry.kebab,
        label: entry.pascal,
        keywords: `${entry.kebab} lucide wash`,
        preview: (
          <DynamicIcon
            name={entry.kebab}
            className="size-6"
            strokeWidth={1.75}
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
      title="Usage"
      description="Full Lucide 1.28.0 via Wash UI. Click for import snippets."
      items={items}
    />
  )
}
