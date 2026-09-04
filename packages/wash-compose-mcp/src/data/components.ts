export type ComposeCategory =
  | 'provider'
  | 'primitive'
  | 'component'
  | 'shell'
  | 'theme'
  | 'icon'
  | 'effect'

export type ComposeEntry = {
  name: string
  category: ComposeCategory
  packageName: string
  description: string
  params?: string[]
  example?: string
  keywords?: string[]
  webEquivalent?: string
}

const PKG = 'com.mariesta.menzies.washui'

export const composeEntries: ComposeEntry[] = [
  {
    name: 'WashProvider',
    category: 'provider',
    packageName: PKG,
    description: 'Root provider for pigment, mode, colors, and typography. Persist preferences when storage is available.',
    params: [
      'defaultPigment',
      'defaultMode',
      'followSystemMode',
      'content',
    ],
    example: `WashProvider(defaultPigment = WashPigment.mineral) {
  WashScaffold(topBar = { WashTopBar(title = { WashText("Gallery") }) }) { padding ->
    // content
  }
}`,
    keywords: ['theme', 'provider', 'boot'],
    webEquivalent: 'WashProvider',
  },
  {
    name: 'WashTheme',
    category: 'theme',
    packageName: `${PKG}.theme`,
    description: 'Object accessors (colors, pigment, mode, typography) and a lightweight WashTheme {} wrapper for previews.',
    keywords: ['colors', 'LocalWashColors'],
    webEquivalent: 'useWash / applyTheme',
  },
  {
    name: 'WashPigment',
    category: 'theme',
    packageName: `${PKG}.theme`,
    description: 'Enum of pigment ids mirroring web watercolorThemes (mineral, cerulean, …).',
    webEquivalent: 'watercolorThemes[].id',
  },
  {
    name: 'WashMode',
    category: 'theme',
    packageName: `${PKG}.theme`,
    description: 'Light or Dark paper mode.',
    webEquivalent: "mode: 'light' | 'dark'",
  },
  {
    name: 'WashScaffold',
    category: 'shell',
    packageName: `${PKG}.primitives`,
    description: 'App shell with optional topBar, safe drawing padding, and content slot. Replaces Material3 Scaffold.',
    params: ['modifier', 'topBar', 'contentPadding', 'content'],
    keywords: ['navigation', 'layout', 'shell'],
    webEquivalent: 'page layout / app chrome',
  },
  {
    name: 'WashTopBar',
    category: 'shell',
    packageName: `${PKG}.primitives`,
    description: 'Top app bar for gallery / screen chrome.',
    keywords: ['appbar', 'toolbar'],
  },
  {
    name: 'WashDrawer',
    category: 'shell',
    packageName: `${PKG}.primitives`,
    description: 'Side drawer navigation surface.',
    keywords: ['nav', 'menu'],
  },
  {
    name: 'WashBottomSheet',
    category: 'shell',
    packageName: `${PKG}.primitives`,
    description: 'Bottom sheet overlay.',
    keywords: ['sheet', 'modal'],
  },
  {
    name: 'WashButton',
    category: 'primitive',
    packageName: `${PKG}.primitives`,
    description: 'Button with WashButtonVariant / WashButtonSize, loading, and wash ripple.',
    params: ['onClick', 'variant', 'size', 'enabled', 'loading', 'ripple', 'content'],
    example: `WashButton(onClick = { }, variant = WashButtonVariant.Primary) {
  WashText("Save")
}`,
    webEquivalent: 'Button',
  },
  {
    name: 'WashIconButton',
    category: 'primitive',
    packageName: `${PKG}.primitives`,
    description: 'Icon-only button. Pair with contentDescription for a11y.',
    webEquivalent: 'btn btn-square + icon',
  },
  {
    name: 'WashInput',
    category: 'primitive',
    packageName: `${PKG}.primitives`,
    description: 'Text field with Wash formField labeling patterns.',
    webEquivalent: 'Input',
  },
  {
    name: 'WashTextarea',
    category: 'primitive',
    packageName: `${PKG}.primitives`,
    description: 'Multiline text field.',
    webEquivalent: 'Textarea',
  },
  {
    name: 'WashCheckbox',
    category: 'primitive',
    packageName: `${PKG}.primitives`,
    description: 'Checkbox control.',
    webEquivalent: 'Checkbox',
  },
  {
    name: 'WashToggle',
    category: 'primitive',
    packageName: `${PKG}.primitives`,
    description: 'Boolean toggle switch.',
    webEquivalent: 'Toggle',
  },
  {
    name: 'WashSelect',
    category: 'primitive',
    packageName: `${PKG}.primitives`,
    description: 'Select / dropdown field.',
    webEquivalent: 'Select',
  },
  {
    name: 'WashDialog',
    category: 'primitive',
    packageName: `${PKG}.primitives`,
    description: 'Modal dialog surface.',
    webEquivalent: 'Dialog',
  },
  {
    name: 'WashTooltip',
    category: 'primitive',
    packageName: `${PKG}.primitives`,
    description: 'Tooltip overlay.',
    webEquivalent: 'Tooltip',
  },
  {
    name: 'WashToast',
    category: 'primitive',
    packageName: `${PKG}.primitives`,
    description: 'Toast / snackbar-style feedback.',
    webEquivalent: 'ToastProvider / useToast',
  },
  {
    name: 'WashLoading',
    category: 'primitive',
    packageName: `${PKG}.primitives`,
    description: 'Loading indicator / overlay.',
    webEquivalent: 'Loading',
  },
  {
    name: 'WashText',
    category: 'primitive',
    packageName: `${PKG}.primitives`,
    description: 'Themed text primitive (Foundation, not Material Typography).',
  },
  {
    name: 'WashChip',
    category: 'primitive',
    packageName: `${PKG}.primitives`,
    description: 'Chip / badge-like control.',
  },
  {
    name: 'WashSlider',
    category: 'primitive',
    packageName: `${PKG}.primitives`,
    description: 'Range slider.',
  },
  {
    name: 'WashRadio',
    category: 'primitive',
    packageName: `${PKG}.primitives`,
    description: 'Radio option.',
  },
  {
    name: 'WashDivider',
    category: 'primitive',
    packageName: `${PKG}.primitives`,
    description: 'Horizontal / vertical divider.',
  },
  {
    name: 'WashPanel',
    category: 'primitive',
    packageName: `${PKG}.primitives`,
    description: 'Paper panel surface.',
    webEquivalent: 'WashPanel / wash-panel',
  },
  {
    name: 'WashDropdownMenu',
    category: 'primitive',
    packageName: `${PKG}.primitives`,
    description: 'Dropdown menu surface.',
  },
  {
    name: 'WashFormField',
    category: 'primitive',
    packageName: `${PKG}.primitives`,
    description: 'Label + control + hint/error field wrapper.',
  },
  {
    name: 'WashCard',
    category: 'component',
    packageName: `${PKG}.components`,
    description: 'Card container aligned with web Card.',
    webEquivalent: 'Card',
  },
  {
    name: 'WashAccordion',
    category: 'component',
    packageName: `${PKG}.components`,
    description: 'Expandable accordion.',
    webEquivalent: 'Accordion',
  },
  {
    name: 'WashTabs',
    category: 'component',
    packageName: `${PKG}.components`,
    description: 'Tabbed content.',
    webEquivalent: 'Tabs',
  },
  {
    name: 'WashThemeSwitcher',
    category: 'component',
    packageName: `${PKG}.components`,
    description: 'Pigment / mode switcher control.',
    webEquivalent: 'ThemeSwitcher',
  },
  {
    name: 'StudioLoading',
    category: 'component',
    packageName: `${PKG}.components`,
    description: 'Studio-style loading treatment used in demos.',
    webEquivalent: 'StudioLoading',
  },
  {
    name: 'WashIcon',
    category: 'icon',
    packageName: `${PKG}.icons`,
    description: 'Renders LucideIcons / BrandIcons ImageVectors via Foundation Image.',
    params: ['imageVector', 'contentDescription', 'modifier', 'tint', 'size'],
    example: `WashIcon(
  imageVector = LucideIcons.Palette,
  contentDescription = "Palette",
  tint = WashTheme.colors.primary,
)`,
    keywords: ['lucide', 'brand'],
    webEquivalent: 'icons from /icons and /icons/brands',
  },
  {
    name: 'LucideIcons',
    category: 'icon',
    packageName: `${PKG}.icons`,
    description: 'Marker object; Lucide ImageVectors live as LucideIcons.Name (from icons/lucide/*.kt).',
    example: `import com.mariesta.menzies.washui.icons.LucideIcons
import com.mariesta.menzies.washui.icons.lucide.Palette

WashIcon(imageVector = LucideIcons.Palette, contentDescription = null)`,
    webEquivalent: `${'@menzies-mariesta-com/menzies-design-wash-ui'}/icons`,
  },
  {
    name: 'BrandIcons',
    category: 'icon',
    packageName: `${PKG}.icons`,
    description: 'Marker object for curated Simple Icons brand vectors (icons/brands/*.kt).',
    example: `WashIcon(imageVector = BrandIcons.GitHub, contentDescription = "GitHub")`,
    webEquivalent: `${'@menzies-mariesta-com/menzies-design-wash-ui'}/icons/brands`,
  },
]

export function findEntry(name: string): ComposeEntry | undefined {
  const q = name.toLowerCase().replace(/\s+/g, '')
  return composeEntries.find(
    (e) =>
      e.name.toLowerCase() === q ||
      e.name.toLowerCase().replace(/^wash/, '') === q.replace(/^wash/, ''),
  )
}

export function searchEntries(query: string, category?: ComposeCategory): ComposeEntry[] {
  const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
  return composeEntries.filter((e) => {
    if (category && e.category !== category) return false
    if (!tokens.length) return true
    const hay = [
      e.name,
      e.category,
      e.description,
      e.packageName,
      e.webEquivalent ?? '',
      ...(e.keywords ?? []),
      ...(e.params ?? []),
    ]
      .join(' ')
      .toLowerCase()
    return tokens.every((t) => hay.includes(t))
  })
}
