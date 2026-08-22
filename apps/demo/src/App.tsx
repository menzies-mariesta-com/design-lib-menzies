import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Menu,
  BookOpen,
  FolderOpen,
  SquareStack,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import {
  type AppPage,
  type NavItem,
  nav,
  overviewNav,
  docsNav,
  templatesNav,
  componentNav,
  isDocPage,
  isTemplatePage,
} from './nav'
import DashboardPage from './DashboardPage'
import OverviewPage from './OverviewPage'
import ButtonsPage from './ButtonsPage'
import RipplePage from './RipplePage'
import LinksPage from './LinksPage'
import AccordionPage from './AccordionPage'
import CollapsePage from './CollapsePage'
import FabPage from './FabPage'
import CheckboxPage from './CheckboxPage'
import TogglePage from './TogglePage'
import SwapPage from './SwapPage'
import RadioPage from './RadioPage'
import InputPage from './InputPage'
import TextareaPage from './TextareaPage'
import RangePage from './RangePage'
import RatingPage from './RatingPage'
import SelectPage from './SelectPage'
import SelectSearchPage from './SelectSearchPage'
import AutocompletePage from './AutocompletePage'
import FieldsetPage from './FieldsetPage'
import LabelPage from './LabelPage'
import OtpPage from './OtpPage'
import ValidatorPage from './ValidatorPage'
import FileInputPage from './FileInputPage'
import FilterPage from './FilterPage'
import FloatingPanelPage from './FloatingPanelPage'
import JoinPage from './JoinPage'
import TooltipPage from './TooltipPage'
import CardPage from './CardPage'
import StatPage from './StatPage'
import BentoMasonryPage from './BentoMasonryPage'
import Hover3dCardPage from './Hover3dCardPage'
import HoverGalleryPage from './HoverGalleryPage'
import CarouselPage from './CarouselPage'
import ChartsOverviewPage from './ChartsOverviewPage'
import ChartsLinePage from './ChartsLinePage'
import ChartsSyncedPage from './ChartsSyncedPage'
import ChartsBarPage from './ChartsBarPage'
import ChartsPiePage from './ChartsPiePage'
import ChartsHeatmapPage from './ChartsHeatmapPage'
import ChartsBrushPage from './ChartsBrushPage'
import TabsPage from './TabsPage'
import TagsInputPage from './TagsInputPage'
import TablePage from './TablePage'
import DataTablePage from './DataTablePage'
import AuthScreenPage from './AuthScreenPage'
import TwoFactorPage from './TwoFactorPage'
import ForgotPasswordPage from './ForgotPasswordPage'
import OtpTemplatePage from './OtpTemplatePage'
import ListPage from './ListPage'
import TransferListPage from './TransferListPage'
import PaginationPage from './PaginationPage'
import MockupPage from './MockupPage'
import HeroPage from './HeroPage'
import TextRotatePage from './TextRotatePage'
import AuraPage from './AuraPage'
import DialogPage from './DialogPage'
import BottomSheetPage from './BottomSheetPage'
import DockPage from './DockPage'
import DrawerPage from './DrawerPage'
import FooterPage from './FooterPage'
import DropdownPage from './DropdownPage'
import MenuPage from './MenuPage'
import ContextMenuPage from './ContextMenuPage'
import MegamenuPage from './MegamenuPage'
import NavbarPage from './NavbarPage'
import AppBarPage from './AppBarPage'
import AspectRatioPage from './AspectRatioPage'
import AlertPage from './AlertPage'
import ToastPage from './ToastPage'
import SnackbarPage from './SnackbarPage'
import BadgePage from './BadgePage'
import ChipPage from './ChipPage'
import KbdPage from './KbdPage'
import IndicatorPage from './IndicatorPage'
import StatusPage from './StatusPage'
import LoadingPage from './LoadingPage'
import SkeletonPage from './SkeletonPage'
import ProgressPage from './ProgressPage'
import QrCodePage from './QrCodePage'
import RadialProgressPage from './RadialProgressPage'
import StepsPage from './StepsPage'
import TimelinePage from './TimelinePage'
import OrgChartPage from './OrgChartPage'
import AvatarPage from './AvatarPage'
import MaskPage from './MaskPage'
import MarqueePage from './MarqueePage'
import ChatBubblePage from './ChatBubblePage'
import CalendarPage from './CalendarPage'
import DateTimeFieldsPage from './DateTimeFieldsPage'
import CountdownPage from './CountdownPage'
import DiffPage from './DiffPage'
import DividerPage from './DividerPage'
import PalettePage from './PalettePage'
import ThemeControllerPage from './ThemeControllerPage'
import LayersPage from './LayersPage'
import BrushesPage from './BrushesPage'
import { ThemeSwitcher, BrushSwitcher } from '@menzies-mariesta-com/menzies-design-wash-ui'
import {
  DocsGettingStartedPage,
  DocsThemingPage,
  DocsBrushPage,
  DocsTokensPage,
  DocsCustomizePage,
} from './DocsPages'
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

function SidebarNavButton({
  item,
  active,
  onGo,
  nested = false,
}: {
  item: NavItem
  active: boolean
  onGo: () => void
  nested?: boolean
}) {
  return (
    <button
      type="button"
      className={`ripple cursor-pointer ${nested ? 'py-2 text-sm' : ''} ${active ? 'menu-wash-active' : ''}`}
      onClick={onGo}
    >
      <item.icon className="size-4 shrink-0" strokeWidth={2} />
      <span className="truncate">{item.label}</span>
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
}: {
  title: string
  icon: typeof BookOpen
  items: NavItem[]
  page: AppPage
  open: boolean
  onOpenChange: (open: boolean) => void
  onGo: (next: AppPage) => void
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
        </summary>
        <ul className="ms-2 mt-0.5 border-s border-ink-border/60 ps-1">
          {items.map((item) => (
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

const authTemplateIds = new Set<AppPage>([
  'auth-screen',
  'auth-2fa',
  'forgot-password',
  'auth-otp',
])
const authTemplateNav = templatesNav.filter(
  (item) => item.page !== undefined && authTemplateIds.has(item.page),
)
const dataTemplateNav = templatesNav.filter((item) => item.id === 'data-table')

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
        </ul>
      </details>
    </li>
  )
}

const pageSubtitle: Record<AppPage, string> = {
  overview: 'Wash UI',
  'docs-start': 'Install and first render',
  'docs-theming': 'Pigments and paper modes',
  'docs-brush': 'Global brush atmosphere',
  'docs-tokens': 'Paper wash ink motion',
  'docs-customize': 'Props slots and a11y',
  buttons: 'Button gallery',
  ripple: 'Ripple effects',
  links: 'Link gallery',
  accordion: 'Accordion gallery',
  collapse: 'Collapse panels',
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
  'charts-overview': 'Charts overview',
  'charts-line': 'Line and area charts',
  'charts-synced': 'Synced charts',
  'charts-brush': 'Brush chart',
  'charts-bar': 'Bar and column charts',
  'charts-pie': 'Pie, donut, and radial',
  'charts-heatmap': 'Heatmap grids',
  diff: 'Before and after',
  divider: 'Section dividers',
  tabs: 'Tabs gallery',
  'tags-input': 'Tags inputs',
  table: 'Table gallery',
  'auth-screen': 'Login and signup shells',
  'auth-2fa': 'Two-factor verification',
  'forgot-password': 'Password reset flows',
  'auth-otp': 'One-time code verification',
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
  layers: 'Layer stack',
  brushes: 'Brush library',
}

function renderPage(page: AppPage, onNavigate: (next: AppPage) => void) {
  switch (page) {
    case 'overview':
      return <OverviewPage onNavigate={onNavigate} />
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
    case 'charts-overview':
      return <ChartsOverviewPage onNavigate={onNavigate} />
    case 'charts-line':
      return <ChartsLinePage />
    case 'charts-synced':
      return <ChartsSyncedPage />
    case 'charts-brush':
      return <ChartsBrushPage />
    case 'charts-bar':
      return <ChartsBarPage />
    case 'charts-pie':
      return <ChartsPiePage />
    case 'charts-heatmap':
      return <ChartsHeatmapPage />
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
    case 'brushes':
      return <BrushesPage />
    case 'docs-start':
      return <DocsGettingStartedPage />
    case 'docs-theming':
      return <DocsThemingPage />
    case 'docs-brush':
      return <DocsBrushPage />
    case 'docs-tokens':
      return <DocsTokensPage />
    case 'docs-customize':
      return <DocsCustomizePage />
    default:
      return <DashboardPage />
  }
}

export default function App() {
  const [page, setPage] = useState<AppPage>('overview')
  const [searchOpen, setSearchOpen] = useState(false)
  const [highlightQuery, setHighlightQuery] = useState('')
  const [docsNavOpen, setDocsNavOpen] = useState(false)
  const [templatesNavOpen, setTemplatesNavOpen] = useState(false)
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
    setPage(next)
    closeDrawer()
  }

  function goToFromSearch(next: AppPage, query: string) {
    setHighlightQuery(query)
    setPage(next)
    closeDrawer()
  }

  useEffect(() => {
    if (isDocPage(page)) setDocsNavOpen(true)
    else if (isTemplatePage(page)) setTemplatesNavOpen(true)
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
    <div className="drawer lg:drawer-open page-wash paper-grain min-h-dvh">
      <input id="studio-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex min-h-dvh flex-col">
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
              <span className="label-ink hidden sm:inline">Wash UI</span>
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
            <BrushSwitcher />
          </div>
        </header>

        <div className="border-b border-ink-border/60 bg-base-100/60 px-4 backdrop-blur-sm lg:px-6">
          <div className="mx-auto w-full max-w-[1320px] py-2">
            <Breadcrumbs label={pageLabel} onGoHome={() => goTo('overview')} />
          </div>
        </div>

        <main
          ref={mainRef}
          className="mx-auto w-full max-w-[1320px] flex-1 px-4 py-6 lg:px-6 lg:py-8"
        >
          {renderPage(page, goTo)}
        </main>
      </div>

      <CommandSearch
        open={searchOpen}
        onOpenChange={setSearchOpen}
        entries={searchEntries}
        onSelect={goToFromSearch}
      />

      <div className="drawer-side z-40">
        <label
          htmlFor="studio-drawer"
          aria-label="Close sidebar"
          className="drawer-overlay"
        />
        <aside className="flex min-h-full w-[280px] flex-col border-r border-ink-border bg-base-100 paper-grain">
          <div className="app-chrome-bar border-b border-ink-border/80 px-5">
            <div className="flex min-w-0 flex-col leading-tight">
              <p className="font-display text-xl font-semibold tracking-tight lg:text-2xl">
                Menzies Design
              </p>
              <p className="label-ink mt-0.5">Wash UI</p>
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

            <SidebarNavGroup
              title="Docs"
              icon={BookOpen}
              items={docsNav}
              page={page}
              open={docsNavOpen}
              onOpenChange={setDocsNavOpen}
              onGo={goTo}
            />

            <SidebarTemplatesGroup
              page={page}
              open={templatesNavOpen}
              onOpenChange={setTemplatesNavOpen}
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
          </ul>
        </aside>
      </div>
    </div>
  )
}
