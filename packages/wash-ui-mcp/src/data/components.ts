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
    description:
      'Wash listbox select: daisyUI-styled trigger + custom dropdown menu (viewport placement, outside click, Escape). Menu width defaults to the trigger (absolute overlay; table-safe). Customize with menuWidth / menuClassName. Not the native OS picker.',
    props: [
      'options',
      'label',
      'value',
      'onChange',
      'placeholder',
      'required',
      'disabled',
      'menuWidth',
      'menuClassName',
      'forceOpen',
    ],
    demoPage: 'select',
  },
  {
    name: 'SearchSelect',
    category: 'primitive',
    importPath: PKG,
    description:
      'Searchable combobox with viewport-aware dropdown placement (bottom default, flips top when tight). Uses dropdown-no-hover so the list stays click-to-open.',
    props: [
      'options',
      'label',
      'value',
      'onChange',
      'placeholder',
      'required',
      'forceOpen',
    ],
    demoPage: 'search-select',
  },
  {
    name: 'useDropdownPlacement',
    category: 'hook',
    importPath: PKG,
    description:
      'Measure viewport space for controlled dropdowns; returns end/top/maxHeight and remeasures on resize/scroll while open.',
    demoPage: 'behaviour-auto-dropdown',
  },
  {
    name: 'useDetailsDropdownPlacement',
    category: 'hook',
    importPath: PKG,
    description:
      'Placement for details.dropdown menus; opens on hover for fine pointers by default (hover: false to disable). Used by ThemeSwitcher and date filters.',
    demoPage: 'behaviour-dropdown-on-hover',
  },
  {
    name: 'WashCalendar',
    category: 'primitive',
    importPath: PKG,
    description:
      'Published package API: native Wash month calendar with month/year daisyUI dropdowns. Modes: single, range, multi. Optional includeTime footer (single mode) with a Material-style analog clock (hour, minute, second hands; 0-59 minutes/seconds). Emits YYYY-MM-DDTHH:mm:ss. Gallery demos paste CalendarMonth from #plain (apps/demo/src/plain/calendar), not this import.',
    props: [
      'mode',
      'value',
      'onChange',
      'min',
      'max',
      'isDateDisallowed',
      'markedDates',
      'getDayMeta',
      'showOutsideDays',
      'size',
      'bordered',
      'maxYears',
      'includeTime',
      'defaultTime',
      'timeStep',
    ],
    demoPage: 'calendar',
    keywords: [
      'calendar',
      'date',
      'time',
      'datetime',
      'range',
      'multi',
      'month',
      'year',
      'picker',
      'includeTime',
      'CalendarMonth',
      'plain',
    ],
    example: `<WashCalendar mode="single" includeTime value={iso} onChange={setIso} />`,
  },
  {
    name: 'WashTimePicker',
    category: 'primitive',
    importPath: PKG,
    description:
      'Published package API: analog clock time picker (Material-style): hour, minute, and second hands. Hour dial is dual-ring 24h (outer 0-11, inner 12-23); 12h locales keep an AM/PM toggle in sync. Minutes and seconds are every value 0-59. Emits HH:mm:ss. Gallery demos paste TimeClockDial from #plain (apps/demo/src/plain/time).',
    props: [
      'value',
      'defaultValue',
      'onChange',
      'locale',
      'size',
      'disabled',
      'triggerClassName',
      'className',
    ],
    demoPage: 'date-time',
    keywords: [
      'time',
      'clock',
      'picker',
      'analog',
      'hour',
      'minute',
      'second',
      'WashTimePicker',
      'TimeClockDial',
      'plain',
    ],
    example: `<WashTimePicker value={time} onChange={setTime} />`,
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
    description:
      'CRUD table shell with sticky header, scroll body, and sticky footer. Pair with DataTableHeader, DataTableFooterBar, then DataTableLegendsRow.',
    demoPage: 'data-table',
    props: ['header', 'body', 'footer', 'bodyClassName'],
  },
  {
    name: 'DataTableHeader',
    category: 'primitive',
    importPath: PKG,
    description:
      'Title strip inside the table chrome card (above sticky thead / scroll body): bold title, optional muted description, optional right-side actions. Template places Export, Refresh, and Add side by side here.',
    demoPage: 'data-table',
    props: ['title', 'description', 'actions'],
  },
  {
    name: 'DataTableExportMenu',
    category: 'primitive',
    importPath: PKG,
    description:
      'Header Export control for data tables: hover (and focus) opens Excel / CSV / ODS. Place in DataTableHeader actions beside Refresh and Add. Caller supplies onExport; demo exports the current filtered rows (not only the page).',
    demoPage: 'data-table',
    props: ['onExport', 'disabled', 'exporting'],
    example: `<DataTableHeader\n  title="Studio plates"\n  actions={\n    <>\n      <DataTableExportMenu onExport={(format) => exportFiltered(format)} />\n      {/* Refresh + Add */}\n    </>\n  }\n/>`,
    keywords: ['export', 'csv', 'excel', 'ods', 'download', 'filtered'],
  },
  {
    name: 'DataTableLegendsRow',
    category: 'primitive',
    importPath: PKG,
    description:
      'Legends row under the footer for marked columns (top border divider). Build via resolveColumnLegends(columnDefs). Content is centered.',
    demoPage: 'data-table',
    props: ['legends', 'title'],
  },
  {
    name: 'DataTableFooterBar',
    category: 'primitive',
    importPath: PKG,
    description:
      'Pagination footer: three-zone grid on sm+ (per-page start | centered Showing range | join paginator end). Showing is hidden below sm (hidden sm:block). Optional controls after the paginator (Export / Refresh / Add live in DataTableHeader). When there is no start/summary, the paginator aligns end. Place DataTableLegendsRow after this (top border divider).',
    demoPage: 'data-table',
    props: ['summary', 'controls', 'start', 'paginator'],
  },
  {
    name: 'resolveColumnLegends',
    category: 'primitive',
    importPath: PKG,
    description:
      'Collect DataTableColumnLegend entries from column defs that set legend: true | { label?, swatch?, icon? }.',
    demoPage: 'data-table',
  },
  {
    name: 'Loading',
    category: 'primitive',
    importPath: PKG,
    description: 'Loading overlay with live region announcements.',
    demoPage: 'loading',
  },
  {
    name: 'WashShell',
    category: 'component',
    importPath: `${PKG}/react`,
    description:
      'Full app shell: atmosphere background, optional header/sidebar drawer, padded content column (max-width + page gutters).',
    props: [
      'children',
      'header',
      'sidebar',
      'drawerId',
      'drawerOpenOnLg',
      'maxWidth',
      'flush',
      'grain',
      'mainProps',
    ],
    example: `<WashProvider defaultPigment="mineral" defaultMode="light">
  <WashShell>
    <WashPanel>Content</WashPanel>
  </WashShell>
</WashProvider>`,
    keywords: ['shell', 'layout', 'padding', 'page-wash', 'drawer'],
    demoPage: 'docs-start',
  },
  {
    name: 'WashPanel',
    category: 'primitive',
    importPath: PKG,
    description:
      'Paper panel surface with wash styling and default 1rem padding. Use flush for edge-to-edge layouts.',
    props: ['as', 'ochre', 'rose', 'grain', 'flush', 'className', 'children'],
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
  {
    name: 'RichTextEditor',
    category: 'component',
    importPath: `${PKG}/editors`,
    description:
      'From-scratch rich text editor (toolbar, lists, links, paste sanitize). Optional entry: not on /react barrel.',
    props: ['value', 'defaultValue', 'onChange', 'placeholder', 'disabled', 'minHeight'],
    example: `import { RichTextEditor } from '${PKG}/editors'\n<RichTextEditor value={html} onChange={setHtml} />`,
    keywords: ['editor', 'rte', 'wysiwyg', 'contenteditable', 'template'],
    demoPage: 'template-rich-text',
  },
  {
    name: 'CodeEditor',
    category: 'component',
    importPath: `${PKG}/editors`,
    description:
      'From-scratch Broad IDE code editor (grammar packs, not LSP): multi-tab, find/replace, go-to-line, completions, diagnostics. Optional /editors entry.',
    props: [
      'value',
      'defaultValue',
      'onChange',
      'language',
      'fileName',
      'tabs',
      'activeTabId',
      'onTabChange',
      'wrap',
      'diagnostics',
      'disabled',
      'readOnly',
      'minHeight',
      'showFind',
    ],
    example: `import { CodeEditor, listLanguages } from '${PKG}/editors'\n<CodeEditor language="typescript" fileName="main.ts" value={src} onChange={setSrc} />`,
    keywords: [
      'editor',
      'code',
      'syntax',
      'highlight',
      'template',
      'lsp',
      'typescript',
      'python',
      'rust',
    ],
    demoPage: 'template-code-editor',
  },
  {
    name: 'listLanguages',
    category: 'utility',
    importPath: `${PKG}/editors`,
    description:
      'List in-package CodeEditor language packs (manageable registry; not language servers).',
    keywords: ['language', 'registry', 'editor', 'grammar'],
  },
  {
    name: 'resolveLanguageFromFileName',
    category: 'utility',
    importPath: `${PKG}/editors`,
    description: 'Resolve a CodeEditor LanguageId from a file extension.',
    keywords: ['language', 'extension', 'editor'],
  },
  {
    name: 'sanitizeRichHtml',
    category: 'utility',
    importPath: `${PKG}/editors`,
    description: 'Sanitize rich-text HTML for RichTextEditor paste and value sync.',
    keywords: ['sanitize', 'html', 'xss', 'editor'],
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
    description:
      'Full Lucide UI icons via Wash (React). Named exports + DynamicIcon / iconNames. Pin: lucide-react 1.28.0 inside Wash.',
    example: `import { Palette, DynamicIcon } from '${PKG}/icons'\n<Palette className="size-5" />\n<DynamicIcon name="heart" className="size-5" />`,
    demoPage: 'icons-usage',
  },
  {
    name: 'Brand icons',
    category: 'icon',
    importPath: `${PKG}/icons/brands`,
    description:
      'Brand marks via Wash (React). Curated named exports + BrandIcon / brandCatalog. Simple Icons stays inside the package.',
    example: `import { GitHub } from '${PKG}/icons/brands'\nimport { BrandIcon, brandCatalog } from '${PKG}/icons/brands/catalog'\n<GitHub size={24} />\n<BrandIcon slug="discord" size={24} />`,
    demoPage: 'icons-brands',
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
