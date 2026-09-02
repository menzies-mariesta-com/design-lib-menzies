import {
  LayoutDashboard,
  Palette,
  Layers,
  Search,
  Bell,
  MousePointerClick,
  Link,
  ChevronsDownUp,
  FoldVertical,
  CircleFadingPlus,
  ListChecks,
  CircleDot,
  Radio,
  TextCursorInput,
  AlignLeft,
  SlidersHorizontal,
  SquareChevronDown,
  Group,
  MessageCircle,
  SquareStack,
  Images,
  GalleryHorizontal,
  GalleryHorizontalEnd,
  PanelTop,
  Table2,
  Sheet,
  List,
  MonitorSmartphone,
  Sparkles,
  MessageSquare,
  MessageSquareMore,
  PanelBottom,
  AppWindow,
  PanelLeft,
  ChevronDown,
  TriangleAlert,
  BadgeCheck,
  UserRound,
  MessagesSquare,
  Calendar,
  CalendarClock,
  Timer,
  Columns2,
  SeparatorHorizontal,
  FileUp,
  ListFilter,
  GalleryVertical,
  PanelBottomClose,
  Box,
  Keyboard,
  Tag,
  Combine,
  LoaderCircle,
  Gauge,
  Heart,
  CircleGauge,
  Shapes,
  SquareMenu,
  LayoutGrid,
  KeyRound,
  PanelTopOpen,
  PanelTopDashed,
  ChevronsLeftRight,
  Star,
  ChartBar,
  ChartCandlestick,
  ChartGantt,
  ChartLine,
  ChartNoAxesColumn,
  ChartPie,
  ChartScatter,
  Circle,
  Radar,
  SquareDashed,
  ListOrdered,
  ArrowLeftRight,
  ArrowRightLeft,
  ToggleLeft,
  RotateCw,
  History,
  ScrollText,
  SunMoon,
  ShieldCheck,
  ShoppingBag,
  Mail,
  TextSearch,
  Tags,
  Grid2x2,
  Network,
  SquareMousePointer,
  Aperture,
  PictureInPicture2,
  QrCode,
  Hash,
  RectangleHorizontal,
  BookOpen,
  SwatchBook,
  Settings2,
  TrendingUp,
  Waves,
  Sun,
  Droplets,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

export type AppPage =
  | 'overview'
  | 'support'
  | 'assets-fonts'
  | 'assets-images'
  | 'docs-start'
  | 'docs-start-vanilla'
  | 'docs-start-react-vite'
  | 'docs-start-nextjs'
  | 'docs-start-vue-vite'
  | 'docs-start-nuxt'
  | 'docs-start-sveltekit'
  | 'docs-start-astro'
  | 'docs-start-angular'
  | 'docs-start-remix'
  | 'docs-start-solid'
  | 'docs-start-preact'
  | 'docs-start-qwik'
  | 'docs-start-lit'
  | 'docs-start-eleventy'
  | 'docs-theming'
  | 'docs-tokens'
  | 'docs-customize'
  | 'docs-mcp-server'
  | 'buttons'
  | 'ripple'
  | 'links'
  | 'accordion'
  | 'collapse'
  | 'color-picker'
  | 'fab'
  | 'checkbox'
  | 'toggle'
  | 'swap'
  | 'radio'
  | 'input'
  | 'textarea'
  | 'range'
  | 'rating'
  | 'select'
  | 'select-search'
  | 'autocomplete'
  | 'fieldset'
  | 'label'
  | 'otp'
  | 'validator'
  | 'file-input'
  | 'filter'
  | 'floating-panel'
  | 'join'
  | 'tooltip'
  | 'card'
  | 'stat'
  | 'bento'
  | 'hover-3d'
  | 'hover-gallery'
  | 'carousel'
  | 'charts-overview'
  | 'charts-line'
  | 'charts-area'
  | 'charts-range-area'
  | 'charts-slope'
  | 'charts-column'
  | 'charts-bar'
  | 'charts-mixed'
  | 'charts-timeline'
  | 'charts-pie'
  | 'charts-radialbar'
  | 'charts-polar-area'
  | 'charts-gauge'
  | 'charts-sparklines'
  | 'charts-dashboards'
  | 'charts-heatmap'
  | 'charts-treemap'
  | 'charts-sunburst'
  | 'charts-scatter'
  | 'charts-bubble'
  | 'charts-funnel'
  | 'charts-radar'
  | 'charts-boxplot'
  | 'charts-violin'
  | 'charts-beeswarm'
  | 'charts-waffle'
  | 'charts-candlestick'
  | 'charts-histogram'
  | 'charts-custom-series'
  | 'charts-interactivity'
  | 'charts-narrative'
  | 'charts-unit'
  | 'tabs'
  | 'tags-input'
  | 'table'
  | 'auth-screen'
  | 'auth-2fa'
  | 'forgot-password'
  | 'auth-otp'
  | 'template-checkout'
  | 'template-payment'
  | 'template-terminal-logging'
  | 'template-docs-layout'
  | 'data-table'
  | 'list'
  | 'transfer-list'
  | 'pagination'
  | 'bottomsheet'
  | 'dock'
  | 'drawer'
  | 'footer'
  | 'dropdown'
  | 'menu'
  | 'context-menu'
  | 'megamenu'
  | 'navbar'
  | 'app-bar'
  | 'aspect-ratio'
  | 'mockup'
  | 'hero'
  | 'text-rotate'
  | 'aura'
  | 'dialog'
  | 'alert'
  | 'toast'
  | 'snackbar'
  | 'badge'
  | 'chip'
  | 'kbd'
  | 'indicator'
  | 'status'
  | 'loading'
  | 'skeleton'
  | 'progress'
  | 'qrcode'
  | 'radial-progress'
  | 'steps'
  | 'timeline'
  | 'org-chart'
  | 'avatar'
  | 'mask'
  | 'marquee'
  | 'chat'
  | 'calendar'
  | 'date-time'
  | 'countdown'
  | 'diff'
  | 'divider'
  | 'palette'
  | 'theme-controller'
  | 'layers'
  | 'watercolor-playground'

export type NavItem = {
  id: AppPage
  label: string
  icon: typeof LayoutDashboard
  page?: AppPage
}

export const assetsNav: NavItem[] = [
  { id: 'assets-fonts', label: 'Fonts', icon: AlignLeft, page: 'assets-fonts' },
  { id: 'assets-images', label: 'Images', icon: Images, page: 'assets-images' },
]

export const nav: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, page: 'overview' },
  { id: 'support', label: 'Support', icon: Heart, page: 'support' },
  ...assetsNav,
  { id: 'docs-start', label: 'Getting started', icon: BookOpen, page: 'docs-start' },
  { id: 'docs-start-vanilla', label: 'Vanilla HTML / CSS / JS', icon: BookOpen, page: 'docs-start-vanilla' },
  { id: 'docs-start-react-vite', label: 'React (Vite)', icon: BookOpen, page: 'docs-start-react-vite' },
  { id: 'docs-start-nextjs', label: 'Next.js', icon: BookOpen, page: 'docs-start-nextjs' },
  { id: 'docs-start-vue-vite', label: 'Vue (Vite)', icon: BookOpen, page: 'docs-start-vue-vite' },
  { id: 'docs-start-nuxt', label: 'Nuxt', icon: BookOpen, page: 'docs-start-nuxt' },
  { id: 'docs-start-sveltekit', label: 'SvelteKit', icon: BookOpen, page: 'docs-start-sveltekit' },
  { id: 'docs-start-astro', label: 'Astro', icon: BookOpen, page: 'docs-start-astro' },
  { id: 'docs-start-angular', label: 'Angular', icon: BookOpen, page: 'docs-start-angular' },
  { id: 'docs-start-remix', label: 'Remix', icon: BookOpen, page: 'docs-start-remix' },
  { id: 'docs-start-solid', label: 'Solid (Vite)', icon: BookOpen, page: 'docs-start-solid' },
  { id: 'docs-start-preact', label: 'Preact (Vite)', icon: BookOpen, page: 'docs-start-preact' },
  { id: 'docs-start-qwik', label: 'Qwik', icon: BookOpen, page: 'docs-start-qwik' },
  { id: 'docs-start-lit', label: 'Lit', icon: BookOpen, page: 'docs-start-lit' },
  { id: 'docs-start-eleventy', label: 'Eleventy', icon: BookOpen, page: 'docs-start-eleventy' },
  { id: 'docs-theming', label: 'Theming', icon: Palette, page: 'docs-theming' },
  { id: 'docs-tokens', label: 'Tokens', icon: SwatchBook, page: 'docs-tokens' },
  {
    id: 'docs-customize',
    label: 'Customize',
    icon: Settings2,
    page: 'docs-customize',
  },
  {
    id: 'docs-mcp-server',
    label: 'MCP server',
    icon: Network,
    page: 'docs-mcp-server',
  },
  { id: 'accordion', label: 'Accordion', icon: ChevronsDownUp, page: 'accordion' },
  { id: 'alert', label: 'Alert', icon: TriangleAlert, page: 'alert' },
  { id: 'app-bar', label: 'App bar', icon: PanelTopDashed, page: 'app-bar' },
  {
    id: 'aspect-ratio',
    label: 'Aspect ratio',
    icon: RectangleHorizontal,
    page: 'aspect-ratio',
  },
  { id: 'auth-screen', label: 'Auth Screen', icon: KeyRound, page: 'auth-screen' },
  { id: 'auth-2fa', label: '2FA', icon: ShieldCheck, page: 'auth-2fa' },
  {
    id: 'forgot-password',
    label: 'Forgot password',
    icon: Mail,
    page: 'forgot-password',
  },
  { id: 'auth-otp', label: 'OTP', icon: Hash, page: 'auth-otp' },
  {
    id: 'template-checkout',
    label: 'Checkout',
    icon: ShoppingBag,
    page: 'template-checkout',
  },
  {
    id: 'template-docs-layout',
    label: 'Documentation layout',
    icon: BookOpen,
    page: 'template-docs-layout',
  },
  {
    id: 'template-payment',
    label: 'Payment',
    icon: ShieldCheck,
    page: 'template-payment',
  },
  {
    id: 'template-terminal-logging',
    label: 'Terminal logging',
    icon: ScrollText,
    page: 'template-terminal-logging',
  },
  { id: 'aura', label: 'Aura', icon: Sparkles, page: 'aura' },
  {
    id: 'autocomplete',
    label: 'Autocomplete',
    icon: TextSearch,
    page: 'autocomplete',
  },
  { id: 'avatar', label: 'Avatar', icon: UserRound, page: 'avatar' },
  { id: 'badge', label: 'Badge', icon: BadgeCheck, page: 'badge' },
  { id: 'bento', label: 'Bento / Masonry', icon: Grid2x2, page: 'bento' },
  { id: 'bottomsheet', label: 'Bottom sheet', icon: PanelBottom, page: 'bottomsheet' },
  {
    id: 'watercolor-playground',
    label: 'Paint splash',
    icon: Droplets,
    page: 'watercolor-playground',
  },
  { id: 'buttons', label: 'Buttons', icon: MousePointerClick, page: 'buttons' },
  { id: 'calendar', label: 'Calendar', icon: Calendar, page: 'calendar' },
  { id: 'card', label: 'Card', icon: SquareStack, page: 'card' },
  { id: 'carousel', label: 'Carousel', icon: GalleryHorizontal, page: 'carousel' },
  { id: 'charts-column', label: 'Column charts', icon: ChartNoAxesColumn, page: 'charts-column' },
  { id: 'charts-area', label: 'Area Charts', icon: ChartLine, page: 'charts-area' },
  { id: 'charts-range-area', label: 'Range Area', icon: Layers, page: 'charts-range-area' },
  { id: 'charts-slope', label: 'Slope Charts', icon: ArrowLeftRight, page: 'charts-slope' },
  { id: 'charts-bar', label: 'Bar Charts', icon: ChartBar, page: 'charts-bar' },
  { id: 'charts-mixed', label: 'Mixed Charts', icon: Combine, page: 'charts-mixed' },
  { id: 'charts-timeline', label: 'Timeline', icon: ChartGantt, page: 'charts-timeline' },
  { id: 'charts-overview', label: 'Charts', icon: ChartLine, page: 'charts-overview' },
  { id: 'charts-line', label: 'Line Charts', icon: ChartLine, page: 'charts-line' },
  { id: 'charts-pie', label: 'Pie / Donut Charts', icon: ChartPie, page: 'charts-pie' },
  { id: 'charts-radialbar', label: 'RadialBar Charts', icon: CircleGauge, page: 'charts-radialbar' },
  { id: 'charts-polar-area', label: 'Polar Area', icon: Aperture, page: 'charts-polar-area' },
  { id: 'charts-gauge', label: 'Gauge Charts', icon: Gauge, page: 'charts-gauge' },
  { id: 'charts-sparklines', label: 'Sparklines', icon: TrendingUp, page: 'charts-sparklines' },
  { id: 'charts-dashboards', label: 'Dashboards', icon: LayoutDashboard, page: 'charts-dashboards' },
  { id: 'charts-heatmap', label: 'Heatmap Charts', icon: Grid2x2, page: 'charts-heatmap' },
  { id: 'charts-treemap', label: 'Treemap Charts', icon: LayoutGrid, page: 'charts-treemap' },
  { id: 'charts-sunburst', label: 'Sunburst Charts', icon: Sun, page: 'charts-sunburst' },
  { id: 'charts-scatter', label: 'Scatter Charts', icon: ChartScatter, page: 'charts-scatter' },
  { id: 'charts-bubble', label: 'Bubble Charts', icon: Circle, page: 'charts-bubble' },
  { id: 'charts-funnel', label: 'Funnel Charts', icon: ChevronsDownUp, page: 'charts-funnel' },
  { id: 'charts-radar', label: 'Radar Charts', icon: Radar, page: 'charts-radar' },
  { id: 'charts-boxplot', label: 'BoxPlot Charts', icon: Box, page: 'charts-boxplot' },
  { id: 'charts-violin', label: 'Violin Charts', icon: Waves, page: 'charts-violin' },
  { id: 'charts-beeswarm', label: 'Beeswarm Charts', icon: Network, page: 'charts-beeswarm' },
  { id: 'charts-waffle', label: 'Waffle Charts', icon: SquareDashed, page: 'charts-waffle' },
  { id: 'charts-candlestick', label: 'Candlestick Charts', icon: ChartCandlestick, page: 'charts-candlestick' },
  { id: 'charts-histogram', label: 'Histogram Charts', icon: ChartNoAxesColumn, page: 'charts-histogram' },
  {
    id: 'charts-custom-series',
    label: 'Custom Series Charts',
    icon: Shapes,
    page: 'charts-custom-series',
  },
  {
    id: 'charts-interactivity',
    label: 'Interactivity',
    icon: SquareMousePointer,
    page: 'charts-interactivity',
  },
  {
    id: 'charts-narrative',
    label: 'Narrative Charts',
    icon: GalleryVertical,
    page: 'charts-narrative',
  },
  {
    id: 'charts-unit',
    label: 'Unit Charts',
    icon: Heart,
    page: 'charts-unit',
  },
  { id: 'chat', label: 'Chat bubble', icon: MessagesSquare, page: 'chat' },
  { id: 'checkbox', label: 'Checkbox', icon: ListChecks, page: 'checkbox' },
  { id: 'chip', label: 'Chip', icon: Tags, page: 'chip' },
  { id: 'collapse', label: 'Collapse', icon: FoldVertical, page: 'collapse' },
  { id: 'color-picker', label: 'Color picker', icon: SwatchBook, page: 'color-picker' },
  {
    id: 'context-menu',
    label: 'Context menu',
    icon: SquareMousePointer,
    page: 'context-menu',
  },
  { id: 'countdown', label: 'Countdown', icon: Timer, page: 'countdown' },
  { id: 'data-table', label: 'Data table', icon: Sheet, page: 'data-table' },
  {
    id: 'date-time',
    label: 'Date and time',
    icon: CalendarClock,
    page: 'date-time',
  },
  { id: 'dialog', label: 'Dialog', icon: MessageSquare, page: 'dialog' },
  { id: 'diff', label: 'Diff', icon: Columns2, page: 'diff' },
  { id: 'divider', label: 'Divider', icon: SeparatorHorizontal, page: 'divider' },
  { id: 'dock', label: 'Dock', icon: AppWindow, page: 'dock' },
  { id: 'drawer', label: 'Drawer', icon: PanelLeft, page: 'drawer' },
  { id: 'dropdown', label: 'Dropdown', icon: ChevronDown, page: 'dropdown' },
  { id: 'fab', label: 'FAB', icon: CircleFadingPlus, page: 'fab' },
  { id: 'fieldset', label: 'Fieldset', icon: Group, page: 'fieldset' },
  { id: 'file-input', label: 'File input', icon: FileUp, page: 'file-input' },
  { id: 'filter', label: 'Filter', icon: ListFilter, page: 'filter' },
  {
    id: 'floating-panel',
    label: 'Floating panel',
    icon: PictureInPicture2,
    page: 'floating-panel',
  },
  { id: 'footer', label: 'Footer', icon: PanelBottomClose, page: 'footer' },
  { id: 'hero', label: 'Hero', icon: GalleryVertical, page: 'hero' },
  { id: 'hover-3d', label: 'Hover 3D', icon: Box, page: 'hover-3d' },
  { id: 'hover-gallery', label: 'Hover gallery', icon: Images, page: 'hover-gallery' },
  { id: 'indicator', label: 'Indicator', icon: Radio, page: 'indicator' },
  { id: 'input', label: 'Input', icon: TextCursorInput, page: 'input' },
  { id: 'join', label: 'Join', icon: Combine, page: 'join' },
  { id: 'kbd', label: 'Kbd', icon: Keyboard, page: 'kbd' },
  { id: 'label', label: 'Label', icon: Tag, page: 'label' },
  { id: 'layers', label: 'Layers', icon: Layers, page: 'layers' },
  { id: 'links', label: 'Links', icon: Link, page: 'links' },
  { id: 'list', label: 'List', icon: List, page: 'list' },
  { id: 'loading', label: 'Loading', icon: LoaderCircle, page: 'loading' },
  { id: 'mask', label: 'Mask', icon: Shapes, page: 'mask' },
  { id: 'marquee', label: 'Marquee', icon: GalleryHorizontalEnd, page: 'marquee' },
  { id: 'megamenu', label: 'Megamenu', icon: LayoutGrid, page: 'megamenu' },
  { id: 'menu', label: 'Menu', icon: SquareMenu, page: 'menu' },
  { id: 'mockup', label: 'Mockup', icon: MonitorSmartphone, page: 'mockup' },
  { id: 'navbar', label: 'Navbar', icon: PanelTopOpen, page: 'navbar' },
  { id: 'org-chart', label: 'Org chart', icon: Network, page: 'org-chart' },
  { id: 'otp', label: 'OTP', icon: KeyRound, page: 'otp' },
  { id: 'pagination', label: 'Pagination', icon: ChevronsLeftRight, page: 'pagination' },
  { id: 'palette', label: 'Palette', icon: Palette, page: 'palette' },
  { id: 'progress', label: 'Progress', icon: Gauge, page: 'progress' },
  { id: 'qrcode', label: 'QR code', icon: QrCode, page: 'qrcode' },
  { id: 'radial-progress', label: 'Radial progress', icon: CircleGauge, page: 'radial-progress' },
  { id: 'radio', label: 'Radio', icon: CircleDot, page: 'radio' },
  { id: 'range', label: 'Range', icon: SlidersHorizontal, page: 'range' },
  { id: 'rating', label: 'Rating', icon: Star, page: 'rating' },
  { id: 'ripple', label: 'Ripple', icon: Aperture, page: 'ripple' },
  { id: 'select', label: 'Select', icon: SquareChevronDown, page: 'select' },
  {
    id: 'select-search',
    label: 'Select search',
    icon: Search,
    page: 'select-search',
  },
  { id: 'skeleton', label: 'Skeleton', icon: SquareDashed, page: 'skeleton' },
  { id: 'snackbar', label: 'Snackbar', icon: MessageSquareMore, page: 'snackbar' },
  { id: 'stat', label: 'Stat', icon: ChartNoAxesColumn, page: 'stat' },
  { id: 'status', label: 'Status', icon: Circle, page: 'status' },
  { id: 'steps', label: 'Steps', icon: ListOrdered, page: 'steps' },
  { id: 'swap', label: 'Swap', icon: ArrowLeftRight, page: 'swap' },
  { id: 'table', label: 'Table', icon: Table2, page: 'table' },
  { id: 'tabs', label: 'Tabs', icon: PanelTop, page: 'tabs' },
  { id: 'tags-input', label: 'Tags input', icon: Hash, page: 'tags-input' },
  { id: 'text-rotate', label: 'Text rotate', icon: RotateCw, page: 'text-rotate' },
  { id: 'textarea', label: 'Textarea', icon: AlignLeft, page: 'textarea' },
  {
    id: 'theme-controller',
    label: 'Theme controller',
    icon: SunMoon,
    page: 'theme-controller',
  },
  { id: 'timeline', label: 'Timeline', icon: History, page: 'timeline' },
  { id: 'toast', label: 'Toast', icon: Bell, page: 'toast' },
  { id: 'toggle', label: 'Toggle', icon: ToggleLeft, page: 'toggle' },
  { id: 'tooltip', label: 'Tooltip', icon: MessageCircle, page: 'tooltip' },
  {
    id: 'transfer-list',
    label: 'Transfer list',
    icon: ArrowRightLeft,
    page: 'transfer-list',
  },
  { id: 'validator', label: 'Validator', icon: ShieldCheck, page: 'validator' },
]

export const overviewNav = nav.find((item) => item.id === 'overview')!
export const supportNav = nav.find((item) => item.id === 'support')!
export const gettingStartedStackNav = nav.filter(
  (item) => item.page !== undefined && isGettingStartedStackPage(item.page),
)
export const docsNav = nav.filter(
  (item) =>
    item.id.startsWith('docs-') &&
    !(item.page !== undefined && isGettingStartedStackPage(item.page)),
)
export const templatePageIds = new Set<AppPage>([
  'auth-screen',
  'auth-2fa',
  'forgot-password',
  'auth-otp',
  'template-checkout',
  'template-payment',
  'template-terminal-logging',
  'template-docs-layout',
  'data-table',
])
export const templatesNav = nav.filter(
  (item) => item.page !== undefined && templatePageIds.has(item.page),
)
export const componentNav = nav.filter(
  (item) =>
    item.id !== 'overview' &&
    item.id !== 'support' &&
    !item.id.startsWith('assets-') &&
    !item.id.startsWith('docs-') &&
    !(item.page !== undefined && templatePageIds.has(item.page)),
)

export function isAssetsPage(p: AppPage) {
  return p.startsWith('assets-')
}

export function isDocPage(p: AppPage) {
  return p.startsWith('docs-')
}

export function isGettingStartedStackPage(p: AppPage) {
  return p.startsWith('docs-start-') && p !== 'docs-start'
}

export function isTemplatePage(p: AppPage) {
  return templatePageIds.has(p)
}
