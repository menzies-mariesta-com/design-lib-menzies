import { useEffect, useMemo, useRef, useState } from 'react'
import {
  LayoutDashboard,
  Palette,
  Layers,
  Paintbrush,
  Search,
  Bell,
  Menu,
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
  CircleGauge,
  Shapes,
  SquareMenu,
  LayoutGrid,
  KeyRound,
  PanelTopOpen,
  PanelTopDashed,
  ChevronsLeftRight,
  Star,
  ChartNoAxesColumn,
  Circle,
  SquareDashed,
  ListOrdered,
  ArrowLeftRight,
  ArrowRightLeft,
  ToggleLeft,
  RotateCw,
  History,
  SunMoon,
  ShieldCheck,
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
  Brush,
  SwatchBook,
  Settings2,
  FolderOpen,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
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

export type AppPage =
  | 'overview'
  | 'docs-start'
  | 'docs-theming'
  | 'docs-brush'
  | 'docs-tokens'
  | 'docs-customize'
  | 'buttons'
  | 'ripple'
  | 'links'
  | 'accordion'
  | 'collapse'
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
  | 'tabs'
  | 'tags-input'
  | 'table'
  | 'auth-screen'
  | 'auth-2fa'
  | 'forgot-password'
  | 'auth-otp'
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
  | 'brushes'

const nav: {
  id: AppPage
  label: string
  icon: typeof LayoutDashboard
  page?: AppPage
}[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, page: 'overview' },
  { id: 'docs-start', label: 'Getting started', icon: BookOpen, page: 'docs-start' },
  { id: 'docs-theming', label: 'Theming', icon: Palette, page: 'docs-theming' },
  { id: 'docs-brush', label: 'Brush system', icon: Brush, page: 'docs-brush' },
  { id: 'docs-tokens', label: 'Tokens', icon: SwatchBook, page: 'docs-tokens' },
  {
    id: 'docs-customize',
    label: 'Customize',
    icon: Settings2,
    page: 'docs-customize',
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
  { id: 'brushes', label: 'Brushes', icon: Paintbrush, page: 'brushes' },
  { id: 'buttons', label: 'Buttons', icon: MousePointerClick, page: 'buttons' },
  { id: 'calendar', label: 'Calendar', icon: Calendar, page: 'calendar' },
  { id: 'card', label: 'Card', icon: SquareStack, page: 'card' },
  { id: 'carousel', label: 'Carousel', icon: GalleryHorizontal, page: 'carousel' },
  { id: 'chat', label: 'Chat bubble', icon: MessagesSquare, page: 'chat' },
  { id: 'checkbox', label: 'Checkbox', icon: ListChecks, page: 'checkbox' },
  { id: 'chip', label: 'Chip', icon: Tags, page: 'chip' },
  { id: 'collapse', label: 'Collapse', icon: FoldVertical, page: 'collapse' },
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
export const docsNav = nav.filter((item) => item.id.startsWith('docs-'))
const templatePageIds = new Set<AppPage>([
  'auth-screen',
  'auth-2fa',
  'forgot-password',
  'auth-otp',
  'data-table',
])
export const templatesNav = nav.filter(
  (item) => item.page !== undefined && templatePageIds.has(item.page),
)
export const componentNav = nav.filter(
  (item) =>
    item.id !== 'overview' &&
    !item.id.startsWith('docs-') &&
    !(item.page !== undefined && templatePageIds.has(item.page)),
)

function isDocPage(p: AppPage) {
  return p.startsWith('docs-')
}

function isTemplatePage(p: AppPage) {
  return templatePageIds.has(p)
}

function SidebarNavButton({
  item,
  active,
  onGo,
  nested = false,
}: {
  item: (typeof nav)[number]
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
  items: typeof nav
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
