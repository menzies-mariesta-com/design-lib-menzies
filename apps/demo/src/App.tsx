import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import {
  Menu,
  BookOpen,
  Crown,
  FolderOpen,
  SquareStack,
  Images,
  Shapes,
  ChartLine,
  Store,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import {
  type AppPage,
  type NavItem,
  nav,
  overviewNav,
  assetsNav,
  iconsNav,
  chartsNav,
  docsNav,
  templatesNav,
  storeNav,
  componentNav,
  isAssetsPage,
  isIconsPage,
  isChartsPage,
  isDocPage,
  isGettingStartedStackPage,
  isTemplatePage,
  isStorePage,
  resolveAppPage,
} from './nav'
import OverviewPage from './OverviewPage'

import {
  ThemeSwitcher,
  WashShell,
  WashUiBrand,
} from '@menzies-mariesta-com/menzies-design-wash-ui'
import { washUiBrandLabel } from '@menzies-mariesta-com/menzies-design-wash-ui/core'
import { getStackByPage } from './data/getting-started-stacks'
import Breadcrumbs from './Breadcrumbs'
import CommandSearch, {
  SearchIconButton,
  SearchTriggerButton,
} from './CommandSearch'
import { buildSearchEntries } from './searchIndex'
import {
  clearSearchHighlights,
  highlightSearchMatches,
} from './highlightMatches'

const DashboardPage = lazy(() => import('./DashboardPage'))
const SupportPage = lazy(() => import('./SupportPage'))
const ButtonsPage = lazy(() => import('./ButtonsPage'))
const RipplePage = lazy(() => import('./RipplePage'))
const LinksPage = lazy(() => import('./LinksPage'))
const AccordionPage = lazy(() => import('./AccordionPage'))
const CollapsePage = lazy(() => import('./CollapsePage'))
const FabPage = lazy(() => import('./FabPage'))
const CheckboxPage = lazy(() => import('./CheckboxPage'))
const TogglePage = lazy(() => import('./TogglePage'))
const SwapPage = lazy(() => import('./SwapPage'))
const RadioPage = lazy(() => import('./RadioPage'))
const InputPage = lazy(() => import('./InputPage'))
const TextareaPage = lazy(() => import('./TextareaPage'))
const RangePage = lazy(() => import('./RangePage'))
const RatingPage = lazy(() => import('./RatingPage'))
const SelectPage = lazy(() => import('./SelectPage'))
const SelectSearchPage = lazy(() => import('./SelectSearchPage'))
const AutocompletePage = lazy(() => import('./AutocompletePage'))
const FieldsetPage = lazy(() => import('./FieldsetPage'))
const LabelPage = lazy(() => import('./LabelPage'))
const OtpPage = lazy(() => import('./OtpPage'))
const ValidatorPage = lazy(() => import('./ValidatorPage'))
const FileInputPage = lazy(() => import('./FileInputPage'))
const FilterPage = lazy(() => import('./FilterPage'))
const FloatingPanelPage = lazy(() => import('./FloatingPanelPage'))
const JoinPage = lazy(() => import('./JoinPage'))
const TooltipPage = lazy(() => import('./TooltipPage'))
const CardPage = lazy(() => import('./CardPage'))
const StatPage = lazy(() => import('./StatPage'))
const BentoMasonryPage = lazy(() => import('./BentoMasonryPage'))
const Hover3dCardPage = lazy(() => import('./Hover3dCardPage'))
const HoverGalleryPage = lazy(() => import('./HoverGalleryPage'))
const CarouselPage = lazy(() => import('./CarouselPage'))
const ChartsLineCategoryPage = lazy(() => import('./ChartsLineCategoryPage'))
const ChartsAreaCategoryPage = lazy(() => import('./ChartsAreaCategoryPage'))
const ChartsRangeAreaCategoryPage = lazy(() => import('./ChartsRangeAreaCategoryPage'))
const ChartsBarCategoryPage = lazy(() => import('./ChartsBarCategoryPage'))
const ChartsMixedCategoryPage = lazy(() => import('./ChartsMixedCategoryPage'))
const ChartsColumnCategoryPage = lazy(() => import('./ChartsColumnCategoryPage'))
const ChartsTimelineCategoryPage = lazy(() => import('./ChartsTimelineCategoryPage'))
const ChartsPieCategoryPage = lazy(() => import('./ChartsPieCategoryPage'))
const ChartsRadialBarCategoryPage = lazy(() => import('./ChartsRadialBarCategoryPage'))
const ChartsGaugeCategoryPage = lazy(() => import('./ChartsGaugeCategoryPage'))
const ChartsSparklinesCategoryPage = lazy(() => import('./ChartsSparklinesCategoryPage'))
const ChartsDashboardsCategoryPage = lazy(() => import('./ChartsDashboardsCategoryPage'))
const ChartsHeatmapCategoryPage = lazy(() => import('./ChartsHeatmapCategoryPage'))
const ChartsTreemapCategoryPage = lazy(() => import('./ChartsTreemapCategoryPage'))
const ChartsSunburstCategoryPage = lazy(() => import('./ChartsSunburstCategoryPage'))
const ChartsScatterCategoryPage = lazy(() => import('./ChartsScatterCategoryPage'))
const ChartsSlopeCategoryPage = lazy(() => import('./ChartsSlopeCategoryPage'))
const ChartsBubbleCategoryPage = lazy(() => import('./ChartsBubbleCategoryPage'))
const ChartsFunnelCategoryPage = lazy(() => import('./ChartsFunnelCategoryPage'))
const ChartsRadarCategoryPage = lazy(() => import('./ChartsRadarCategoryPage'))
const ChartsBoxPlotCategoryPage = lazy(() => import('./ChartsBoxPlotCategoryPage'))
const ChartsViolinCategoryPage = lazy(() => import('./ChartsViolinCategoryPage'))
const ChartsBeeswarmCategoryPage = lazy(() => import('./ChartsBeeswarmCategoryPage'))
const ChartsWaffleCategoryPage = lazy(() => import('./ChartsWaffleCategoryPage'))
const ChartsCandlestickCategoryPage = lazy(() => import('./ChartsCandlestickCategoryPage'))
const ChartsHistogramCategoryPage = lazy(() => import('./ChartsHistogramCategoryPage'))
const ChartsCustomSeriesCategoryPage = lazy(() => import('./ChartsCustomSeriesCategoryPage'))
const ChartsInteractivityCategoryPage = lazy(() => import('./ChartsInteractivityCategoryPage'))
const ChartsNarrativeCategoryPage = lazy(() => import('./ChartsNarrativeCategoryPage'))
const ChartsUnitCategoryPage = lazy(() => import('./ChartsUnitCategoryPage'))
const ChartsPolarAreaCategoryPage = lazy(() => import('./ChartsPolarAreaCategoryPage'))
const TabsPage = lazy(() => import('./TabsPage'))
const TagsInputPage = lazy(() => import('./TagsInputPage'))
const TablePage = lazy(() => import('./TablePage'))
const DataTablePage = lazy(() => import('./DataTablePage'))
const AuthScreenPage = lazy(() => import('./AuthScreenPage'))
const TwoFactorPage = lazy(() => import('./TwoFactorPage'))
const ForgotPasswordPage = lazy(() => import('./ForgotPasswordPage'))
const OtpTemplatePage = lazy(() => import('./OtpTemplatePage'))
const CheckoutTemplatePage = lazy(() => import('./CheckoutTemplatePage'))
const PaymentTemplatePage = lazy(() => import('./PaymentTemplatePage'))
const TerminalLoggingTemplatePage = lazy(() => import('./TerminalLoggingTemplatePage'))
const DocumentationLayoutTemplatePage = lazy(() => import('./DocumentationLayoutTemplatePage'))
const StoreMerchPage = lazy(() => import('./StoreMerchPage'))
const StorePagePage = lazy(() => import('./StorePagePage'))
const ListPage = lazy(() => import('./ListPage'))
const TransferListPage = lazy(() => import('./TransferListPage'))
const PaginationPage = lazy(() => import('./PaginationPage'))
const MockupPage = lazy(() => import('./MockupPage'))
const HeroPage = lazy(() => import('./HeroPage'))
const TextRotatePage = lazy(() => import('./TextRotatePage'))
const AuraPage = lazy(() => import('./AuraPage'))
const DialogPage = lazy(() => import('./DialogPage'))
const BottomSheetPage = lazy(() => import('./BottomSheetPage'))
const DockPage = lazy(() => import('./DockPage'))
const DrawerPage = lazy(() => import('./DrawerPage'))
const FooterPage = lazy(() => import('./FooterPage'))
const DropdownPage = lazy(() => import('./DropdownPage'))
const MenuPage = lazy(() => import('./MenuPage'))
const ContextMenuPage = lazy(() => import('./ContextMenuPage'))
const MegamenuPage = lazy(() => import('./MegamenuPage'))
const NavbarPage = lazy(() => import('./NavbarPage'))
const AppBarPage = lazy(() => import('./AppBarPage'))
const AspectRatioPage = lazy(() => import('./AspectRatioPage'))
const AlertPage = lazy(() => import('./AlertPage'))
const ToastPage = lazy(() => import('./ToastPage'))
const SnackbarPage = lazy(() => import('./SnackbarPage'))
const BadgePage = lazy(() => import('./BadgePage'))
const ChipPage = lazy(() => import('./ChipPage'))
const KbdPage = lazy(() => import('./KbdPage'))
const IndicatorPage = lazy(() => import('./IndicatorPage'))
const StatusPage = lazy(() => import('./StatusPage'))
const LoadingPage = lazy(() => import('./LoadingPage'))
const SkeletonPage = lazy(() => import('./SkeletonPage'))
const ProgressPage = lazy(() => import('./ProgressPage'))
const QrCodePage = lazy(() => import('./QrCodePage'))
const RadialProgressPage = lazy(() => import('./RadialProgressPage'))
const StepsPage = lazy(() => import('./StepsPage'))
const TimelinePage = lazy(() => import('./TimelinePage'))
const OrgChartPage = lazy(() => import('./OrgChartPage'))
const AvatarPage = lazy(() => import('./AvatarPage'))
const MaskPage = lazy(() => import('./MaskPage'))
const MarqueePage = lazy(() => import('./MarqueePage'))
const ChatBubblePage = lazy(() => import('./ChatBubblePage'))
const CalendarPage = lazy(() => import('./CalendarPage'))
const DateTimeFieldsPage = lazy(() => import('./DateTimeFieldsPage'))
const CountdownPage = lazy(() => import('./CountdownPage'))
const DiffPage = lazy(() => import('./DiffPage'))
const DividerPage = lazy(() => import('./DividerPage'))
const PalettePage = lazy(() => import('./PalettePage'))
const ThemeControllerPage = lazy(() => import('./ThemeControllerPage'))
const LayersPage = lazy(() => import('./LayersPage'))
const BackgroundPage = lazy(() => import('./BackgroundPage'))
const ColorPickerPage = lazy(() => import('./ColorPickerPage'))
const WatercolorPlaygroundPage = lazy(() => import('./WatercolorPlaygroundPage'))
const FontsPage = lazy(() => import('./FontsPage'))
const ImagesPage = lazy(() => import('./ImagesPage'))
const IconsUsagePage = lazy(() => import('./IconsUsagePage'))
const IconsBrandsPage = lazy(() => import('./IconsBrandsPage'))
const DocsThemingPage = lazy(() =>
  import('./DocsPages').then((m) => ({ default: m.DocsThemingPage })),
)
const DocsTokensPage = lazy(() =>
  import('./DocsPages').then((m) => ({ default: m.DocsTokensPage })),
)
const DocsCustomizePage = lazy(() =>
  import('./DocsPages').then((m) => ({ default: m.DocsCustomizePage })),
)
const DocsMcpServerPage = lazy(() =>
  import('./DocsPages').then((m) => ({ default: m.DocsMcpServerPage })),
)
const DocsGettingStartedPage = lazy(() =>
  import('./DocsGettingStartedPage').then((m) => ({ default: m.DocsGettingStartedPage })),
)
const DocsStackGuidePage = lazy(() =>
  import('./DocsStackGuidePage').then((m) => ({ default: m.DocsStackGuidePage })),
)


function RequiresPurchaseCrown() {
  return (
    <span
      className="tooltip tooltip-right tooltip-warning shrink-0"
      data-tip="Requires purchase"
    >
      <Crown
        className="size-3.5 text-amber-400"
        strokeWidth={2}
        aria-hidden
      />
    </span>
  )
}

function SidebarNavButton({
  item,
  active,
  onGo,
  nested = false,
  trailing,
}: {
  item: NavItem
  active: boolean
  onGo: () => void
  nested?: boolean
  trailing?: ReactNode
}) {
  return (
    <button
      type="button"
      className={`ripple cursor-pointer ${nested ? 'py-2 text-sm' : ''} ${active ? 'menu-wash-active' : ''}`}
      onClick={onGo}
    >
      <item.icon className="size-4 shrink-0" strokeWidth={2} />
      <span className={trailing ? 'flex-1 truncate' : 'truncate'}>{item.label}</span>
      {trailing}
    </button>
  )
}

function SidebarNavGroup({
  title,
  icon: Icon,
  items,
  page,
  open,
  onOpenChange,
  onGo,
  trailing,
  itemTrailing,
}: {
  title: string
  icon: typeof BookOpen
  items: NavItem[]
  page: AppPage
  open: boolean
  onOpenChange: (open: boolean) => void
  onGo: (next: AppPage) => void
  trailing?: ReactNode
  itemTrailing?: ReactNode
}) {
  const hasActive = items.some((item) => item.page === page)

  return (
    <li>
      <details
        className="group"
        open={open}
        onToggle={(event) => onOpenChange(event.currentTarget.open)}
      >
        <summary
          className={`cursor-pointer font-medium ${hasActive ? 'text-primary' : ''}`}
        >
          <Icon className="size-4 shrink-0" strokeWidth={2} />
          <span className="flex-1 truncate">{title}</span>
          {trailing}
        </summary>
        <ul className="ms-2 mt-0.5 border-s border-ink-border/60 ps-1">
          {items.map((item) => (
            <li key={item.id}>
              <SidebarNavButton
                item={item}
                active={item.page === page}
                nested
                trailing={itemTrailing}
                onGo={() => {
                  if (item.page) onGo(item.page)
                }}
              />
            </li>
          ))}
        </ul>
      </details>
    </li>
  )
}

const authTemplateIds = new Set<AppPage>([
  'auth-screen',
  'auth-2fa',
  'forgot-password',
  'auth-otp',
])
const authTemplateNav = templatesNav.filter(
  (item) => item.page !== undefined && authTemplateIds.has(item.page),
)
const commerceTemplateIds = new Set<AppPage>(['template-checkout', 'template-payment'])
const studioTemplateIds = new Set<AppPage>(['template-terminal-logging'])
const layoutTemplateIds = new Set<AppPage>(['template-docs-layout'])
const commerceTemplateNav = templatesNav.filter(
  (item) => item.page !== undefined && commerceTemplateIds.has(item.page),
)
const studioTemplateNav = templatesNav.filter(
  (item) => item.page !== undefined && studioTemplateIds.has(item.page),
)
const layoutTemplateNav = templatesNav.filter(
  (item) => item.page !== undefined && layoutTemplateIds.has(item.page),
)
const dataTemplateNav = templatesNav.filter((item) => item.id === 'data-table')

function SidebarDocsGroup({
  page,
  open,
  onOpenChange,
  onGo,
}: {
  page: AppPage
  open: boolean
  onOpenChange: (open: boolean) => void
  onGo: (next: AppPage) => void
}) {
  const hasActive =
    docsNav.some((item) => item.page === page) || isGettingStartedStackPage(page)

  return (
    <li>
      <details
        className="group"
        open={open}
        onToggle={(event) => onOpenChange(event.currentTarget.open)}
      >
        <summary
          className={`cursor-pointer font-medium ${hasActive ? 'text-primary' : ''}`}
        >
          <BookOpen className="size-4 shrink-0" strokeWidth={2} />
          <span className="flex-1 truncate">Docs</span>
        </summary>
        <ul className="ms-2 mt-0.5 border-s border-ink-border/60 ps-1">
          {docsNav.map((item) => (
            <li key={item.id}>
              <SidebarNavButton
                item={item}
                active={item.page === page}
                nested
                onGo={() => {
                  if (item.page) onGo(item.page)
                }}
              />
            </li>
          ))}
        </ul>
      </details>
    </li>
  )
}

function SidebarTemplatesGroup({
  page,
  open,
  onOpenChange,
  onGo,
}: {
  page: AppPage
  open: boolean
  onOpenChange: (open: boolean) => void
  onGo: (next: AppPage) => void
}) {
  const hasActive = templatesNav.some((item) => item.page === page)

  return (
    <li>
      <details
        className="group"
        open={open}
        onToggle={(event) => onOpenChange(event.currentTarget.open)}
      >
        <summary
          className={`cursor-pointer font-medium ${hasActive ? 'text-primary' : ''}`}
        >
          <FolderOpen className="size-4 shrink-0" strokeWidth={2} />
          <span className="flex-1 truncate">Templates</span>
        </summary>
        <ul className="ms-2 mt-0.5 border-s border-ink-border/60 ps-1">
          <li className="menu-title px-3 py-1 text-xs">Auth</li>
          {authTemplateNav.map((item) => (
            <li key={item.id}>
              <SidebarNavButton
                item={item}
                active={item.page === page}
                nested
                onGo={() => {
                  if (item.page) onGo(item.page)
                }}
              />
            </li>
          ))}
          <li className="menu-title px-3 py-1 text-xs">Commerce</li>
          {commerceTemplateNav.map((item) => (
            <li key={item.id}>
              <SidebarNavButton
                item={item}
                active={item.page === page}
                nested
                onGo={() => {
                  if (item.page) onGo(item.page)
                }}
              />
            </li>
          ))}
          <li className="menu-title px-3 py-1 text-xs">Data</li>
          {dataTemplateNav.map((item) => (
            <li key={item.id}>
              <SidebarNavButton
                item={item}
                active={item.page === page}
                nested
                onGo={() => {
                  if (item.page) onGo(item.page)
                }}
              />
            </li>
          ))}
          <li className="menu-title px-3 py-1 text-xs">Studio</li>
          {studioTemplateNav.map((item) => (
            <li key={item.id}>
              <SidebarNavButton
                item={item}
                active={item.page === page}
                nested
                onGo={() => {
                  if (item.page) onGo(item.page)
                }}
              />
            </li>
          ))}
          <li className="menu-title px-3 py-1 text-xs">Layout</li>
          {layoutTemplateNav.map((item) => (
            <li key={item.id}>
              <SidebarNavButton
                item={item}
                active={item.page === page}
                nested
                onGo={() => {
                  if (item.page) onGo(item.page)
                }}
              />
            </li>
          ))}
        </ul>
      </details>
    </li>
  )
}

const pageSubtitle: Record<AppPage, string> = {
  overview: washUiBrandLabel(),
  support: 'Sponsor open libraries and Wash UI',
  'assets-fonts': 'Downloadable studio type families',
  'assets-images': 'Favicon, sprite, and hero plate',
  'icons-usage': 'Lucide icon library (1.28.0)',
  'icons-brands': 'Simple Icons brand library',
  'docs-start': 'Choose your web stack',
  'docs-start-vanilla': 'Vanilla HTML, CSS, and JS setup',
  'docs-start-react-vite': 'React and Vite setup guide',
  'docs-start-nextjs': 'Next.js App Router setup',
  'docs-start-vue-vite': 'Vue 3 and Vite setup guide',
  'docs-start-nuxt': 'Nuxt 3 client plugin setup',
  'docs-start-sveltekit': 'SvelteKit layout setup',
  'docs-start-astro': 'Astro layout and client script',
  'docs-start-angular': 'Angular root component setup',
  'docs-start-remix': 'Remix root route setup',
  'docs-start-solid': 'Solid and Vite setup guide',
  'docs-start-preact': 'Preact and Vite setup guide',
  'docs-start-qwik': 'Qwik client plugin setup',
  'docs-start-lit': 'Lit web components setup',
  'docs-start-eleventy': 'Eleventy static site setup',
  'docs-theming': 'Pigments and paper modes',
  'docs-tokens': 'Paper wash ink motion',
  'docs-customize': 'Props slots and a11y',
  'docs-mcp-server': 'AI assistant MCP tools',
  buttons: 'Button gallery',
  ripple: 'Ripple effects',
  links: 'Link gallery',
  accordion: 'Accordion gallery',
  collapse: 'Collapse panels',
  'color-picker': 'Hue wheel color picker',
  fab: 'FAB gallery',
  checkbox: 'Checkbox gallery',
  toggle: 'Toggles',
  swap: 'Swap toggles',
  radio: 'Radio gallery',
  input: 'Input gallery',
  textarea: 'Text areas',
  range: 'Range sliders',
  rating: 'Star ratings',
  select: 'Select gallery',
  'select-search': 'Searchable selects',
  autocomplete: 'Autocomplete',
  fieldset: 'Form fieldsets',
  label: 'Form labels',
  otp: 'OTP inputs',
  validator: 'Validators',
  'file-input': 'File inputs',
  filter: 'Filter groups',
  'floating-panel': 'Floating panels',
  join: 'Join groups',
  tooltip: 'Tooltip gallery',
  card: 'Card gallery',
  stat: 'Stat blocks',
  bento: 'Bento and masonry',
  'hover-3d': 'Hover 3D cards',
  'hover-gallery': 'Hover galleries',
  carousel: 'Carousel gallery',
  'charts-line': 'Line Charts',
  'charts-area': 'Area Charts',
  'charts-range-area': 'Range Area',
  'charts-column': 'Column charts',
  'charts-bar': 'Bar Charts',
  'charts-mixed': 'Mixed Charts',
  'charts-timeline': 'Timeline',
  'charts-pie': 'Pie / Donut Charts',
  'charts-radialbar': 'RadialBar charts',
  'charts-polar-area': 'Polar Area',
  'charts-gauge': 'Gauge Charts',
  'charts-sparklines': 'Sparklines',
  'charts-dashboards': 'Dashboards',
  'charts-heatmap': 'Heatmap Charts',
  'charts-treemap': 'Treemap Charts',
  'charts-sunburst': 'Sunburst Charts',
  'charts-scatter': 'Scatter Charts',
  'charts-slope': 'Slope Charts',
  'charts-bubble': 'Bubble Charts',
  'charts-funnel': 'Funnel Charts',
  'charts-radar': 'Radar Charts',
  'charts-boxplot': 'BoxPlot Charts',
  'charts-violin': 'Violin Charts',
  'charts-beeswarm': 'Beeswarm Charts',
  'charts-waffle': 'Waffle Charts',
  'charts-candlestick': 'Candlestick Charts',
  'charts-histogram': 'Histogram Charts',
  'charts-custom-series': 'Custom Series Charts',
  'charts-interactivity': 'Interactivity',
  'charts-narrative': 'Narrative Charts',
  'charts-unit': 'Unit Charts',
  diff: 'Before and after',
  divider: 'Section dividers',
  tabs: 'Tabs gallery',
  'tags-input': 'Tags inputs',
  table: 'Table gallery',
  'auth-screen': 'Login and signup shells',
  'auth-2fa': 'Two-factor verification',
  'forgot-password': 'Password reset flows',
  'auth-otp': 'One-time code verification',
  'template-checkout': 'Studio commerce checkout',
  'template-payment': 'Card payment step',
  'template-terminal-logging': 'Studio terminal log viewer',
  'template-docs-layout': 'Documentation page shell',
  'store-merch': 'Studio goods coming soon',
  'store-page': 'Wash UI Docs Template',
  'data-table': 'CRUD data tables',
  list: 'List rows',
  'transfer-list': 'Transfer lists',
  pagination: 'Pagination',
  bottomsheet: 'Bottom sheet gallery',
  dock: 'Bottom dock',
  drawer: 'Drawer sidebars',
  footer: 'Page footers',
  dropdown: 'Dropdown menus',
  menu: 'Menus',
  'context-menu': 'Context menus',
  megamenu: 'Megamenus',
  navbar: 'Navbars',
  'app-bar': 'App bars',
  'aspect-ratio': 'Aspect ratios',
  mockup: 'Mockup gallery',
  hero: 'Hero banners',
  'text-rotate': 'Text rotate',
  aura: 'Aura gallery',
  dialog: 'Dialog gallery',
  alert: 'Alert gallery',
  toast: 'Toasts',
  snackbar: 'Snackbars',
  badge: 'Badges',
  chip: 'Chips',
  kbd: 'Keyboard keys',
  indicator: 'Status indicators',
  status: 'Status dots',
  loading: 'Loading indicators',
  skeleton: 'Skeleton loaders',
  progress: 'Progress bars',
  qrcode: 'QR codes',
  'radial-progress': 'Radial progress',
  steps: 'Step indicators',
  timeline: 'Timelines',
  'org-chart': 'Org charts',
  avatar: 'Avatar gallery',
  mask: 'Image masks',
  marquee: 'Marquees',
  chat: 'Chat bubbles',
  calendar: 'Studio calendar',
  'date-time': 'Date and time fields',
  countdown: 'Countdown clocks',
  palette: 'Pigment palette',
  'theme-controller': 'Theme controllers',
  background: 'Page wash atmosphere',
  layers: 'Layer stack',
  'watercolor-playground': 'Paint splash studio',
}

function renderPage(page: AppPage, onNavigate: (next: AppPage) => void) {
  switch (page) {
    case 'overview':
      return <OverviewPage onNavigate={onNavigate} />
    case 'support':
      return <SupportPage />
    case 'assets-fonts':
      return <FontsPage />
    case 'assets-images':
      return <ImagesPage />
    case 'icons-usage':
      return (
        <Suspense
          fallback={
            <p className="text-sm text-ink-muted">Loading icon library…</p>
          }
        >
          <IconsUsagePage />
        </Suspense>
      )
    case 'icons-brands':
      return (
        <Suspense
          fallback={
            <p className="text-sm text-ink-muted">Loading brand icons…</p>
          }
        >
          <IconsBrandsPage />
        </Suspense>
      )
    case 'buttons':
      return <ButtonsPage />
    case 'ripple':
      return <RipplePage />
    case 'links':
      return <LinksPage />
    case 'accordion':
      return <AccordionPage />
    case 'collapse':
      return <CollapsePage />
    case 'color-picker':
      return <ColorPickerPage />
    case 'fab':
      return <FabPage />
    case 'checkbox':
      return <CheckboxPage />
    case 'toggle':
      return <TogglePage />
    case 'swap':
      return <SwapPage />
    case 'radio':
      return <RadioPage />
    case 'input':
      return <InputPage />
    case 'textarea':
      return <TextareaPage />
    case 'range':
      return <RangePage />
    case 'rating':
      return <RatingPage />
    case 'select':
      return <SelectPage />
    case 'select-search':
      return <SelectSearchPage />
    case 'autocomplete':
      return <AutocompletePage />
    case 'fieldset':
      return <FieldsetPage />
    case 'label':
      return <LabelPage />
    case 'otp':
      return <OtpPage />
    case 'validator':
      return <ValidatorPage />
    case 'file-input':
      return <FileInputPage />
    case 'filter':
      return <FilterPage />
    case 'floating-panel':
      return <FloatingPanelPage />
    case 'join':
      return <JoinPage />
    case 'tooltip':
      return <TooltipPage />
    case 'card':
      return <CardPage />
    case 'stat':
      return <StatPage />
    case 'bento':
      return <BentoMasonryPage />
    case 'hover-3d':
      return <Hover3dCardPage />
    case 'hover-gallery':
      return <HoverGalleryPage />
    case 'carousel':
      return <CarouselPage />
    case 'charts-line':
      return <ChartsLineCategoryPage />
    case 'charts-area':
      return <ChartsAreaCategoryPage />
    case 'charts-range-area':
      return <ChartsRangeAreaCategoryPage />
    case 'charts-column':
      return <ChartsColumnCategoryPage />
    case 'charts-bar':
      return <ChartsBarCategoryPage />
    case 'charts-mixed':
      return <ChartsMixedCategoryPage />
    case 'charts-timeline':
      return <ChartsTimelineCategoryPage />
    case 'charts-pie':
      return <ChartsPieCategoryPage />
    case 'charts-radialbar':
      return <ChartsRadialBarCategoryPage />
    case 'charts-polar-area':
      return <ChartsPolarAreaCategoryPage />
    case 'charts-gauge':
      return <ChartsGaugeCategoryPage />
    case 'charts-sparklines':
      return <ChartsSparklinesCategoryPage />
    case 'charts-dashboards':
      return <ChartsDashboardsCategoryPage />
    case 'charts-heatmap':
      return <ChartsHeatmapCategoryPage />
    case 'charts-treemap':
      return <ChartsTreemapCategoryPage />
    case 'charts-sunburst':
      return <ChartsSunburstCategoryPage />
    case 'charts-scatter':
      return <ChartsScatterCategoryPage />
    case 'charts-slope':
      return <ChartsSlopeCategoryPage />
    case 'charts-bubble':
      return <ChartsBubbleCategoryPage />
    case 'charts-funnel':
      return <ChartsFunnelCategoryPage />
    case 'charts-radar':
      return <ChartsRadarCategoryPage />
    case 'charts-boxplot':
      return <ChartsBoxPlotCategoryPage />
    case 'charts-violin':
      return <ChartsViolinCategoryPage />
    case 'charts-beeswarm':
      return <ChartsBeeswarmCategoryPage />
    case 'charts-waffle':
      return <ChartsWaffleCategoryPage />
    case 'charts-candlestick':
      return <ChartsCandlestickCategoryPage />
    case 'charts-histogram':
      return <ChartsHistogramCategoryPage />
    case 'charts-custom-series':
      return <ChartsCustomSeriesCategoryPage />
    case 'charts-interactivity':
      return <ChartsInteractivityCategoryPage />
    case 'charts-narrative':
      return <ChartsNarrativeCategoryPage />
    case 'charts-unit':
      return <ChartsUnitCategoryPage />
    case 'diff':
      return <DiffPage />
    case 'divider':
      return <DividerPage />
    case 'tabs':
      return <TabsPage />
    case 'tags-input':
      return <TagsInputPage />
    case 'table':
      return <TablePage />
    case 'auth-screen':
      return <AuthScreenPage />
    case 'auth-2fa':
      return <TwoFactorPage />
    case 'forgot-password':
      return <ForgotPasswordPage />
    case 'auth-otp':
      return <OtpTemplatePage />
    case 'template-checkout':
      return <CheckoutTemplatePage />
    case 'template-payment':
      return <PaymentTemplatePage />
    case 'template-terminal-logging':
      return <TerminalLoggingTemplatePage />
    case 'template-docs-layout':
      return <DocumentationLayoutTemplatePage />
    case 'store-merch':
      return <StoreMerchPage onNavigate={onNavigate} />
    case 'store-page':
      return <StorePagePage onNavigate={onNavigate} />
    case 'data-table':
      return <DataTablePage />
    case 'list':
      return <ListPage />
    case 'transfer-list':
      return <TransferListPage />
    case 'pagination':
      return <PaginationPage />
    case 'bottomsheet':
      return <BottomSheetPage />
    case 'dock':
      return <DockPage />
    case 'drawer':
      return <DrawerPage />
    case 'footer':
      return <FooterPage />
    case 'dropdown':
      return <DropdownPage />
    case 'menu':
      return <MenuPage />
    case 'context-menu':
      return <ContextMenuPage />
    case 'megamenu':
      return <MegamenuPage />
    case 'navbar':
      return <NavbarPage />
    case 'app-bar':
      return <AppBarPage />
    case 'aspect-ratio':
      return <AspectRatioPage />
    case 'mockup':
      return <MockupPage />
    case 'hero':
      return <HeroPage />
    case 'text-rotate':
      return <TextRotatePage />
    case 'aura':
      return <AuraPage />
    case 'dialog':
      return <DialogPage />
    case 'alert':
      return <AlertPage />
    case 'toast':
      return <ToastPage />
    case 'snackbar':
      return <SnackbarPage />
    case 'badge':
      return <BadgePage />
    case 'background':
      return <BackgroundPage />
    case 'chip':
      return <ChipPage />
    case 'kbd':
      return <KbdPage />
    case 'indicator':
      return <IndicatorPage />
    case 'status':
      return <StatusPage />
    case 'loading':
      return <LoadingPage />
    case 'skeleton':
      return <SkeletonPage />
    case 'progress':
      return <ProgressPage />
    case 'qrcode':
      return <QrCodePage />
    case 'radial-progress':
      return <RadialProgressPage />
    case 'steps':
      return <StepsPage />
    case 'timeline':
      return <TimelinePage />
    case 'org-chart':
      return <OrgChartPage />
    case 'avatar':
      return <AvatarPage />
    case 'mask':
      return <MaskPage />
    case 'marquee':
      return <MarqueePage />
    case 'chat':
      return <ChatBubblePage />
    case 'calendar':
      return <CalendarPage />
    case 'date-time':
      return <DateTimeFieldsPage />
    case 'countdown':
      return <CountdownPage />
    case 'palette':
      return <PalettePage />
    case 'theme-controller':
      return <ThemeControllerPage />
    case 'layers':
      return <LayersPage />
    case 'watercolor-playground':
      return <WatercolorPlaygroundPage />
    case 'docs-start':
      return <DocsGettingStartedPage onNavigate={onNavigate} />
    case 'docs-start-vanilla':
    case 'docs-start-react-vite':
    case 'docs-start-nextjs':
    case 'docs-start-vue-vite':
    case 'docs-start-nuxt':
    case 'docs-start-sveltekit':
    case 'docs-start-astro':
    case 'docs-start-angular':
    case 'docs-start-remix':
    case 'docs-start-solid':
    case 'docs-start-preact':
    case 'docs-start-qwik':
    case 'docs-start-lit':
    case 'docs-start-eleventy': {
      const stack = getStackByPage(page)
      if (!stack) return <DocsGettingStartedPage onNavigate={onNavigate} />
      return <DocsStackGuidePage stack={stack} onNavigate={onNavigate} />
    }
    case 'docs-theming':
      return <DocsThemingPage />
    case 'docs-tokens':
      return <DocsTokensPage />
    case 'docs-customize':
      return <DocsCustomizePage />
    case 'docs-mcp-server':
      return <DocsMcpServerPage />
    default:
      return <DashboardPage />
  }
}

export default function App() {
  const [page, setPage] = useState<AppPage>('overview')
  const [searchOpen, setSearchOpen] = useState(false)
  const [highlightQuery, setHighlightQuery] = useState('')
  const [docsNavOpen, setDocsNavOpen] = useState(false)
  const [assetsNavOpen, setAssetsNavOpen] = useState(false)
  const [iconsNavOpen, setIconsNavOpen] = useState(false)
  const [chartsNavOpen, setChartsNavOpen] = useState(false)
  const [templatesNavOpen, setTemplatesNavOpen] = useState(false)
  const [storeNavOpen, setStoreNavOpen] = useState(false)
  const [componentsNavOpen, setComponentsNavOpen] = useState(false)
  const mainRef = useRef<HTMLElement>(null)
  const pageLabel = nav.find((item) => item.id === page)?.label ?? 'Overview'
  const searchEntries = useMemo(
    () => buildSearchEntries(nav, pageSubtitle),
    [],
  )

  function closeDrawer() {
    const toggle = document.getElementById('studio-drawer') as HTMLInputElement | null
    if (toggle) toggle.checked = false
  }

  function goTo(next: AppPage) {
    setHighlightQuery('')
    setPage(resolveAppPage(next) ?? next)
    closeDrawer()
  }

  function goToFromSearch(next: AppPage, query: string) {
    setHighlightQuery(query)
    setPage(resolveAppPage(next) ?? next)
    closeDrawer()
  }

  useEffect(() => {
    if (isAssetsPage(page)) setAssetsNavOpen(true)
    else if (isIconsPage(page)) setIconsNavOpen(true)
    else if (isChartsPage(page)) setChartsNavOpen(true)
    else if (isDocPage(page) || isGettingStartedStackPage(page)) setDocsNavOpen(true)
    else if (isTemplatePage(page)) setTemplatesNavOpen(true)
    else if (isStorePage(page)) setStoreNavOpen(true)
    else if (page !== 'overview') setComponentsNavOpen(true)
  }, [page])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== 'k') return
      if (e.altKey || e.shiftKey) return
      e.preventDefault()
      setSearchOpen(true)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (searchOpen) {
      setHighlightQuery('')
      clearSearchHighlights(mainRef.current ?? document)
    }
  }, [searchOpen])

  useEffect(() => {
    const root = mainRef.current
    if (!root) return

    if (!highlightQuery.trim()) {
      clearSearchHighlights(root)
      return
    }

    let cancelled = false
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled || !mainRef.current) return
        highlightSearchMatches(mainRef.current, highlightQuery)
      })
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      clearSearchHighlights(root)
    }
  }, [page, highlightQuery])

  return (
    <WashShell
      drawerId="studio-drawer"
      mainProps={{ ref: mainRef }}
      header={
        <>
          <header className="navbar app-chrome-bar border-b border-ink-border/80 bg-base-100/80 px-4 backdrop-blur-sm lg:px-6">
            <div className="navbar-start gap-2">
              <label
                htmlFor="studio-drawer"
                className="btn btn-ghost btn-square ripple cursor-pointer lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5 text-base-content" strokeWidth={2} />
              </label>
              <div className="flex flex-col leading-tight">
                <span className="font-display text-xl font-semibold tracking-tight lg:text-2xl">
                  Menzies Design
                </span>
                <WashUiBrand className="label-ink hidden sm:inline" />
              </div>
            </div>

            <div className="navbar-center hidden md:flex">
              <SearchTriggerButton onOpen={() => setSearchOpen(true)} />
            </div>

            <div className="navbar-end gap-1">
              <div className="md:hidden">
                <SearchIconButton onOpen={() => setSearchOpen(true)} />
              </div>
              <ThemeSwitcher />
            </div>
          </header>

          <div className="border-b border-ink-border/60 bg-base-100/60 px-4 backdrop-blur-sm lg:px-6">
            <div className="mx-auto w-full max-w-[1320px] py-2">
              <Breadcrumbs label={pageLabel} onGoHome={() => goTo('overview')} />
            </div>
          </div>

          <CommandSearch
            open={searchOpen}
            onOpenChange={setSearchOpen}
            entries={searchEntries}
            onSelect={goToFromSearch}
          />
        </>
      }
      sidebar={
        <aside className="flex min-h-full w-[280px] flex-col border-r border-ink-border bg-base-100 paper-grain">
          <div className="app-chrome-bar border-b border-ink-border/80 px-5">
            <div className="flex min-w-0 flex-col leading-tight">
              <p className="font-display text-xl font-semibold tracking-tight lg:text-2xl">
                Menzies Design
              </p>
              <WashUiBrand as="p" className="label-ink mt-0.5" />
            </div>
          </div>

          <ul className="menu w-full flex-1 gap-1 overflow-y-auto px-3 py-4">
            <li>
              <SidebarNavButton
                item={overviewNav}
                active={page === 'overview'}
                onGo={() => goTo('overview')}
              />
            </li>

            <SidebarDocsGroup
              page={page}
              open={docsNavOpen}
              onOpenChange={setDocsNavOpen}
              onGo={goTo}
            />

            <SidebarNavGroup
              title="Assets"
              icon={Images}
              items={assetsNav}
              page={page}
              open={assetsNavOpen}
              onOpenChange={setAssetsNavOpen}
              onGo={goTo}
            />

            <SidebarNavGroup
              title="Icons"
              icon={Shapes}
              items={iconsNav}
              page={page}
              open={iconsNavOpen}
              onOpenChange={setIconsNavOpen}
              onGo={goTo}
            />

            <SidebarNavGroup
              title="Charts"
              icon={ChartLine}
              items={chartsNav}
              page={page}
              open={chartsNavOpen}
              onOpenChange={setChartsNavOpen}
              onGo={goTo}
            />

            <SidebarNavGroup
              title="Components"
              icon={SquareStack}
              items={componentNav}
              page={page}
              open={componentsNavOpen}
              onOpenChange={setComponentsNavOpen}
              onGo={goTo}
            />

            <SidebarTemplatesGroup
              page={page}
              open={templatesNavOpen}
              onOpenChange={setTemplatesNavOpen}
              onGo={goTo}
            />

            <SidebarNavGroup
              title="Store"
              icon={Store}
              items={storeNav}
              page={page}
              open={storeNavOpen}
              onOpenChange={setStoreNavOpen}
              onGo={goTo}
              trailing={<RequiresPurchaseCrown />}
              itemTrailing={<RequiresPurchaseCrown />}
            />
          </ul>
        </aside>
      }
    >
      <Suspense
        fallback={
          <div className="flex min-h-48 items-center justify-center text-sm text-base-content/60">
            Loading…
          </div>
        }
      >
        {renderPage(page, goTo)}
      </Suspense>
    </WashShell>
  )
}
