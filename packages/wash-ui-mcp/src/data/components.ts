export type ComponentCategory =
  | 'primitive'
  | 'component'
  | 'provider'
  | 'hook'
  | 'core'
  | 'theme'
  | 'chart'
  | 'email'
  | 'icon'
  | 'utility'

export type ComponentEntry = {
  name: string
  category: ComponentCategory
  importPath: string
  description: string
  props?: string[]
  example?: string
  keywords?: string[]
  demoPage?: string
}

const PKG = '@menzies-mariesta-com/menzies-design-wash-ui'

export const components: ComponentEntry[] = [
  // Provider
  {
    name: 'WashProvider',
    category: 'provider',
    importPath: `${PKG}/react`,
    description: 'React context provider for pigment and mode state.',
    props: ['defaultPigment', 'defaultMode', 'children'],
    example: `<WashProvider defaultPigment="mineral" defaultMode="light">\n  {children}\n</WashProvider>`,
    keywords: ['context', 'theme', 'provider'],
    demoPage: 'docs-start',
  },
  {
    name: 'useWash',
    category: 'hook',
    importPath: `${PKG}/react`,
    description: 'Access pigment, mode, and setters from WashProvider.',
    keywords: ['hook', 'theme', 'context'],
  },
  {
    name: 'useWashOptional',
    category: 'hook',
    importPath: `${PKG}/react`,
    description: 'Like useWash but returns null outside a provider.',
  },

  // Primitives
  {
    name: 'Button',
    category: 'primitive',
    importPath: PKG,
    description: 'Primary interactive button with variants, sizes, ripple, and loading.',
    props: ['variant', 'size', 'ripple', 'loading', 'disabled', 'className'],
    example: `<Button variant="primary" ripple>Save</Button>`,
    keywords: ['btn', 'cta', 'click'],
    demoPage: 'buttons',
  },
  {
    name: 'Input',
    category: 'primitive',
    importPath: PKG,
    description: 'Text input with label, required mark, hint, and error states.',
    props: ['label', 'required', 'error', 'hint', 'placeholder'],
    demoPage: 'input',
  },
  {
    name: 'Textarea',
    category: 'primitive',
    importPath: PKG,
    description: 'Multiline text input with label and validation wiring.',
    demoPage: 'textarea',
  },
  {
    name: 'Checkbox',
    category: 'primitive',
    importPath: PKG,
    description: 'Checkbox control with label and indeterminate support.',
    demoPage: 'checkbox',
  },
  {
    name: 'Toggle',
    category: 'primitive',
    importPath: PKG,
    description: 'Boolean toggle switch.',
    demoPage: 'toggle',
  },
  {
    name: 'Select',
    category: 'primitive',
    importPath: PKG,
    description: 'Native-style select with options array.',
    props: ['options', 'label', 'value', 'onChange'],
    demoPage: 'select',
  },
  {
    name: 'Dialog',
    category: 'primitive',
    importPath: PKG,
    description: 'Modal dialog with focus trap and Escape dismiss.',
    demoPage: 'dialog',
  },
  {
    name: 'ToastProvider',
    category: 'provider',
    importPath: PKG,
    description: 'Toast queue provider. Use with useToast hook.',
    demoPage: 'toast',
  },
  {
    name: 'useToast',
    category: 'hook',
    importPath: PKG,
    description: 'Push success, error, warning, or info toasts.',
    demoPage: 'toast',
  },
  {
    name: 'Tooltip',
    category: 'primitive',
    importPath: PKG,
    description: 'Tooltip with semantic tone and placement.',
    demoPage: 'tooltip',
  },
  {
    name: 'Alert',
    category: 'primitive',
    importPath: PKG,
    description: 'Inline alert banner with tone and soft/solid variants.',
    demoPage: 'alert',
  },
  {
    name: 'TableShell',
    category: 'primitive',
    importPath: PKG,
    description: 'CRUD table shell with sticky header, scroll body, and paginator.',
    demoPage: 'table',
  },
  {
    name: 'Loading',
    category: 'primitive',
    importPath: PKG,
    description: 'Loading overlay with live region announcements.',
    demoPage: 'loading',
  },
  {
    name: 'WashPanel',
    category: 'primitive',
    importPath: PKG,
    description: 'Paper panel surface with wash styling.',
    demoPage: 'card',
  },

  // Components
  {
    name: 'Card',
    category: 'component',
    importPath: PKG,
    description: 'Card container with CardBody and CardTitle subcomponents.',
    demoPage: 'card',
  },
  {
    name: 'CardBody',
    category: 'component',
    importPath: PKG,
    description: 'Card content region.',
    demoPage: 'card',
  },
  {
    name: 'CardTitle',
    category: 'component',
    importPath: PKG,
    description: 'Card heading with optional tone.',
    demoPage: 'card',
  },
  {
    name: 'Accordion',
    category: 'component',
    importPath: PKG,
    description: 'Expandable accordion with AccordionItem children.',
    demoPage: 'accordion',
  },
  {
    name: 'Tabs',
    category: 'component',
    importPath: PKG,
    description: 'Tabbed panel with Tab children.',
    demoPage: 'tabs',
  },
  {
    name: 'ThemeSwitcher',
    category: 'component',
    importPath: PKG,
    description: 'Pigment and mode switcher control.',
    demoPage: 'theme-controller',
  },
  {
    name: 'FloatingPanel',
    category: 'component',
    importPath: PKG,
    description: 'Draggable floating panel surface.',
    demoPage: 'floating-panel',
  },
  {
    name: 'WashUiBrand',
    category: 'component',
    importPath: PKG,
    description: 'Brand wordmark component for Wash UI.',
    demoPage: 'overview',
  },

  // Core
  {
    name: 'initWash',
    category: 'core',
    importPath: `${PKG}/core`,
    description: 'Boot framework-free Wash: theme, ripple, smart tooltips.',
    props: ['defaultPigment', 'defaultMode'],
    example: `const wash = initWash({ defaultPigment: 'mineral', defaultMode: 'light' })\n// wash.destroy() on teardown`,
    keywords: ['vanilla', 'boot', 'init'],
    demoPage: 'docs-start',
  },
  {
    name: 'washRecipes',
    category: 'utility',
    importPath: `${PKG}/core`,
    description: 'Stable class strings for buttons, tables, and common patterns.',
    example: `element.className = washRecipes.btnRipple`,
    demoPage: 'docs-start',
  },
  {
    name: 'attachGlobalRipple',
    category: 'core',
    importPath: `${PKG}/core`,
    description: 'Attach ink ripple effect to interactive elements globally.',
    demoPage: 'ripple',
  },
  {
    name: 'attachSmartTooltips',
    category: 'core',
    importPath: `${PKG}/core`,
    description: 'Auto-position tooltips to avoid overflow clipping.',
    demoPage: 'tooltip',
  },
  {
    name: 'trapFocus',
    category: 'core',
    importPath: `${PKG}/core`,
    description: 'Focus trap for vanilla modal overlays.',
    demoPage: 'dialog',
  },
  {
    name: 'createLiveAnnouncer',
    category: 'core',
    importPath: `${PKG}/core`,
    description: 'Screen reader live region for dynamic status updates.',
  },

  // Theme
  {
    name: 'applyTheme',
    category: 'theme',
    importPath: `${PKG}/theme`,
    description: 'Apply a pigment and light/dark mode to document root.',
    example: `applyTheme('cerulean', 'dark')`,
    demoPage: 'docs-theming',
  },
  {
    name: 'applyMode',
    category: 'theme',
    importPath: `${PKG}/theme`,
    description: 'Switch light or dark paper mode for current pigment.',
    demoPage: 'docs-theming',
  },
  {
    name: 'watercolorThemes',
    category: 'theme',
    importPath: `${PKG}/theme`,
    description: 'Array of all pigment theme definitions with id, label, and swatch.',
    demoPage: 'docs-theming',
  },
  {
    name: 'readStoredTheme',
    category: 'theme',
    importPath: `${PKG}/theme`,
    description: 'Read persisted pigment from localStorage.',
  },
  {
    name: 'readStoredMode',
    category: 'theme',
    importPath: `${PKG}/theme`,
    description: 'Read persisted mode from localStorage.',
  },

  // Email
  {
    name: 'buildOtpVerificationEmail',
    category: 'email',
    importPath: `${PKG}/email`,
    description: 'Build pigment-aware OTP verification email HTML and plain text.',
    example: `const { subject, html, text } = buildOtpVerificationEmail({\n  code: '482913',\n  recipientName: 'Studio artist',\n  pigment: 'cerulean',\n})`,
    demoPage: 'auth-otp-email',
  },
  {
    name: 'WASH_EMAIL_COLORS',
    category: 'email',
    importPath: `${PKG}/email`,
    description: 'Pigment-aware email color tokens.',
    demoPage: 'auth-otp-email',
  },

  // Icons
  {
    name: 'Lucide icons',
    category: 'icon',
    importPath: `${PKG}/icons`,
    description: 'Tree-shakeable Lucide-based UI icons (React). Pin: lucide-react 1.28.0.',
    example: `import { Palette, Brush } from '${PKG}/icons'`,
    demoPage: 'docs-customize',
  },
  {
    name: 'Simple Icons brands',
    category: 'icon',
    importPath: `${PKG}/icons/brands`,
    description: 'Tree-shakeable brand marks from Simple Icons (React).',
    demoPage: 'docs-customize',
  },
]

export function findComponent(name: string): ComponentEntry | undefined {
  const q = name.toLowerCase()
  return components.find(
    (c) =>
      c.name.toLowerCase() === q ||
      c.name.toLowerCase().replace(/\s+/g, '') === q.replace(/\s+/g, ''),
  )
}

export function searchComponents(query: string, category?: ComponentCategory): ComponentEntry[] {
  const q = query.toLowerCase().trim()
  const tokens = q.split(/\s+/).filter(Boolean)

  return components.filter((c) => {
    if (category && c.category !== category) return false
    if (!q) return true
    const haystack = [
      c.name,
      c.category,
      c.description,
      c.importPath,
      ...(c.keywords ?? []),
      ...(c.props ?? []),
    ]
      .join(' ')
      .toLowerCase()
    return tokens.every((t) => haystack.includes(t))
  })
}
