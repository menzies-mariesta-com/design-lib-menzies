import type { ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  BadgeCheck,
  CircleCheck,
  CircleX,
  Droplets,
  Info,
  Layers,
  Paintbrush,
  TriangleAlert,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

const colors = [
  { name: 'Default', className: '' },
  { name: 'Neutral', className: 'badge-neutral' },
  { name: 'Primary', className: 'badge-primary' },
  { name: 'Secondary', className: 'badge-secondary' },
  { name: 'Accent', className: 'badge-accent' },
  { name: 'Info', className: 'badge-info' },
  { name: 'Success', className: 'badge-success' },
  { name: 'Warning', className: 'badge-warning' },
  { name: 'Error', className: 'badge-error' },
] as const

const styleColors = [
  { name: 'Primary', className: 'badge-primary' },
  { name: 'Secondary', className: 'badge-secondary' },
  { name: 'Accent', className: 'badge-accent' },
  { name: 'Info', className: 'badge-info' },
  { name: 'Success', className: 'badge-success' },
  { name: 'Warning', className: 'badge-warning' },
  { name: 'Error', className: 'badge-error' },
] as const

const styles = [
  { name: 'Outline', className: 'badge-outline' },
  { name: 'Dash', className: 'badge-dash' },
  { name: 'Soft', className: 'badge-soft' },
  { name: 'Ghost', className: 'badge-ghost' },
] as const

const sizes = [
  { name: 'XS', className: 'badge-xs', label: 'Xsmall' },
  { name: 'SM', className: 'badge-sm', label: 'Small' },
  { name: 'MD', className: 'badge-md', label: 'Medium' },
  { name: 'LG', className: 'badge-lg', label: 'Large' },
  { name: 'XL', className: 'badge-xl', label: 'Xlarge' },
] as const

const iconBadges = [
  { name: 'Info', className: 'badge-info', Icon: Info },
  { name: 'Success', className: 'badge-success', Icon: CircleCheck },
  { name: 'Warning', className: 'badge-warning', Icon: TriangleAlert },
  { name: 'Error', className: 'badge-error', Icon: CircleX },
] as const

const pigmentTags = [
  { name: 'Ultramarine', className: 'badge-primary' },
  { name: 'Quinacridone', className: 'badge-secondary' },
  { name: 'Sap green', className: 'badge-accent' },
  { name: 'Raw sienna', className: 'badge-warning' },
  { name: 'Payne gray', className: 'badge-neutral' },
  { name: 'Cerulean', className: 'badge-info' },
] as const

const washChips = [
  { name: 'Wet', className: 'badge-soft badge-info', Icon: Droplets },
  { name: 'Drying', className: 'badge-soft badge-warning', Icon: Layers },
  { name: 'Dry', className: 'badge-soft badge-success', Icon: CircleCheck },
  { name: 'Glaze ready', className: 'badge-soft badge-primary', Icon: Paintbrush },
  { name: 'Hold', className: 'badge-outline badge-neutral', Icon: TriangleAlert },
] as const

const plateRows = [
  {
    initials: 'UB',
    wash: 'wash-blue',
    title: 'Ultramarine study',
    detail: 'Cold wash, two layers',
    badge: 'Wet',
    badgeClass: 'badge-info',
  },
  {
    initials: 'QR',
    wash: 'wash-rose',
    title: 'Quinacridone rose',
    detail: 'Warm glaze pending',
    badge: 'Drying',
    badgeClass: 'badge-warning',
  },
  {
    initials: 'SG',
    wash: 'wash-ochre',
    title: 'Sap green field',
    detail: 'Ready for detail',
    badge: 'Dry',
    badgeClass: 'badge-success',
  },
] as const

const basicHtml = "<div class=\"flex flex-wrap items-end gap-4\">\n  <span class=\"badge cursor-default\">Badge</span>\n  <span class=\"badge cursor-default\">New</span>\n  <span class=\"badge cursor-default\">3</span>\n</div>"

const basicJsx = "<div className=\"flex flex-wrap items-end gap-4\">\n  <span className=\"badge cursor-default\">Badge</span>\n  <span className=\"badge cursor-default\">New</span>\n  <span className=\"badge cursor-default\">3</span>\n</div>"

const colorsHtml = "<div class=\"flex flex-wrap items-end gap-4\">\n  <span class=\"badge cursor-default\">Default</span>\n  <span class=\"badge cursor-default badge-neutral\">Neutral</span>\n  <span class=\"badge cursor-default badge-primary\">Primary</span>\n  <span class=\"badge cursor-default badge-secondary\">Secondary</span>\n  <span class=\"badge cursor-default badge-accent\">Accent</span>\n  <span class=\"badge cursor-default badge-info\">Info</span>\n  <span class=\"badge cursor-default badge-success\">Success</span>\n  <span class=\"badge cursor-default badge-warning\">Warning</span>\n  <span class=\"badge cursor-default badge-error\">Error</span>\n</div>"

const colorsJsx = "<div className=\"flex flex-wrap items-end gap-4\">\n  <span className=\"badge cursor-default\">Default</span>\n  <span className=\"badge cursor-default badge-neutral\">Neutral</span>\n  <span className=\"badge cursor-default badge-primary\">Primary</span>\n  <span className=\"badge cursor-default badge-secondary\">Secondary</span>\n  <span className=\"badge cursor-default badge-accent\">Accent</span>\n  <span className=\"badge cursor-default badge-info\">Info</span>\n  <span className=\"badge cursor-default badge-success\">Success</span>\n  <span className=\"badge cursor-default badge-warning\">Warning</span>\n  <span className=\"badge cursor-default badge-error\">Error</span>\n</div>"

const sizesHtml = "<div class=\"flex flex-wrap items-end gap-4 sm:gap-5\">\n  <span class=\"badge cursor-default badge-xs\">Xsmall</span>\n  <span class=\"badge cursor-default badge-sm\">Small</span>\n  <span class=\"badge cursor-default badge-md\">Medium</span>\n  <span class=\"badge cursor-default badge-lg\">Large</span>\n  <span class=\"badge cursor-default badge-xl\">Xlarge</span>\n</div>"

const sizesJsx = "<div className=\"flex flex-wrap items-end gap-4 sm:gap-5\">\n  <span className=\"badge cursor-default badge-xs\">Xsmall</span>\n  <span className=\"badge cursor-default badge-sm\">Small</span>\n  <span className=\"badge cursor-default badge-md\">Medium</span>\n  <span className=\"badge cursor-default badge-lg\">Large</span>\n  <span className=\"badge cursor-default badge-xl\">Xlarge</span>\n</div>"

const softHtml = "<div class=\"flex flex-wrap items-end gap-4\">\n  <span class=\"badge badge-soft cursor-default badge-primary\">Primary</span>\n  <span class=\"badge badge-soft cursor-default badge-secondary\">Secondary</span>\n  <span class=\"badge badge-soft cursor-default badge-accent\">Accent</span>\n  <span class=\"badge badge-soft cursor-default badge-info\">Info</span>\n  <span class=\"badge badge-soft cursor-default badge-success\">Success</span>\n  <span class=\"badge badge-soft cursor-default badge-warning\">Warning</span>\n  <span class=\"badge badge-soft cursor-default badge-error\">Error</span>\n</div>"

const softJsx = "<div className=\"flex flex-wrap items-end gap-4\">\n  <span className=\"badge badge-soft cursor-default badge-primary\">Primary</span>\n  <span className=\"badge badge-soft cursor-default badge-secondary\">Secondary</span>\n  <span className=\"badge badge-soft cursor-default badge-accent\">Accent</span>\n  <span className=\"badge badge-soft cursor-default badge-info\">Info</span>\n  <span className=\"badge badge-soft cursor-default badge-success\">Success</span>\n  <span className=\"badge badge-soft cursor-default badge-warning\">Warning</span>\n  <span className=\"badge badge-soft cursor-default badge-error\">Error</span>\n</div>"

const outlineHtml = "<div class=\"flex flex-wrap items-end gap-4\">\n  <span class=\"badge badge-outline cursor-default badge-primary\">Primary</span>\n  <span class=\"badge badge-outline cursor-default badge-secondary\">Secondary</span>\n  <span class=\"badge badge-outline cursor-default badge-accent\">Accent</span>\n  <span class=\"badge badge-outline cursor-default badge-info\">Info</span>\n  <span class=\"badge badge-outline cursor-default badge-success\">Success</span>\n  <span class=\"badge badge-outline cursor-default badge-warning\">Warning</span>\n  <span class=\"badge badge-outline cursor-default badge-error\">Error</span>\n</div>"

const outlineJsx = "<div className=\"flex flex-wrap items-end gap-4\">\n  <span className=\"badge badge-outline cursor-default badge-primary\">Primary</span>\n  <span className=\"badge badge-outline cursor-default badge-secondary\">Secondary</span>\n  <span className=\"badge badge-outline cursor-default badge-accent\">Accent</span>\n  <span className=\"badge badge-outline cursor-default badge-info\">Info</span>\n  <span className=\"badge badge-outline cursor-default badge-success\">Success</span>\n  <span className=\"badge badge-outline cursor-default badge-warning\">Warning</span>\n  <span className=\"badge badge-outline cursor-default badge-error\">Error</span>\n</div>"

const dashHtml = "<div class=\"flex flex-wrap items-end gap-4\">\n  <span class=\"badge badge-dash cursor-default badge-primary\">Primary</span>\n  <span class=\"badge badge-dash cursor-default badge-secondary\">Secondary</span>\n  <span class=\"badge badge-dash cursor-default badge-accent\">Accent</span>\n  <span class=\"badge badge-dash cursor-default badge-info\">Info</span>\n  <span class=\"badge badge-dash cursor-default badge-success\">Success</span>\n  <span class=\"badge badge-dash cursor-default badge-warning\">Warning</span>\n  <span class=\"badge badge-dash cursor-default badge-error\">Error</span>\n</div>"

const dashJsx = "<div className=\"flex flex-wrap items-end gap-4\">\n  <span className=\"badge badge-dash cursor-default badge-primary\">Primary</span>\n  <span className=\"badge badge-dash cursor-default badge-secondary\">Secondary</span>\n  <span className=\"badge badge-dash cursor-default badge-accent\">Accent</span>\n  <span className=\"badge badge-dash cursor-default badge-info\">Info</span>\n  <span className=\"badge badge-dash cursor-default badge-success\">Success</span>\n  <span className=\"badge badge-dash cursor-default badge-warning\">Warning</span>\n  <span className=\"badge badge-dash cursor-default badge-error\">Error</span>\n</div>"

const ghostHtml = "<span class=\"badge badge-ghost cursor-default\">ghost</span>"

const ghostJsx = "<span className=\"badge badge-ghost cursor-default\">ghost</span>"

const neutralHtml = "<div class=\"rounded-box border border-ink-border/70 bg-white p-4 sm:p-6\">\n  <div class=\"flex flex-wrap items-end gap-4\">\n    <span class=\"badge badge-neutral badge-outline cursor-default\">Outline</span>\n    <span class=\"badge badge-neutral badge-dash cursor-default\">Dash</span>\n  </div>\n</div>"

const neutralJsx = "<div className=\"rounded-box border border-ink-border/70 bg-white p-4 sm:p-6\">\n  <div className=\"flex flex-wrap items-end gap-4\">\n    <span className=\"badge badge-neutral badge-outline cursor-default\">Outline</span>\n    <span className=\"badge badge-neutral badge-dash cursor-default\">Dash</span>\n  </div>\n</div>"

const matrixHtml = "<div class=\"grid gap-6 sm:grid-cols-2 lg:grid-cols-4\">\n  <div class=\"flex flex-col gap-3\">\n    <p class=\"label-ink\">Outline</p>\n    <span class=\"badge cursor-default badge-outline badge-primary\">Primary</span>\n    <span class=\"badge cursor-default badge-outline badge-secondary\">Secondary</span>\n    <span class=\"badge cursor-default badge-outline badge-accent\">Accent</span>\n    <span class=\"badge cursor-default badge-outline badge-info\">Info</span>\n    <span class=\"badge cursor-default badge-outline badge-success\">Success</span>\n    <span class=\"badge cursor-default badge-outline badge-warning\">Warning</span>\n    <span class=\"badge cursor-default badge-outline badge-error\">Error</span>\n  </div>\n  <div class=\"flex flex-col gap-3\">\n    <p class=\"label-ink\">Dash</p>\n    <span class=\"badge cursor-default badge-dash badge-primary\">Primary</span>\n    <span class=\"badge cursor-default badge-dash badge-secondary\">Secondary</span>\n    <span class=\"badge cursor-default badge-dash badge-accent\">Accent</span>\n    <span class=\"badge cursor-default badge-dash badge-info\">Info</span>\n    <span class=\"badge cursor-default badge-dash badge-success\">Success</span>\n    <span class=\"badge cursor-default badge-dash badge-warning\">Warning</span>\n    <span class=\"badge cursor-default badge-dash badge-error\">Error</span>\n  </div>\n  <div class=\"flex flex-col gap-3\">\n    <p class=\"label-ink\">Soft</p>\n    <span class=\"badge cursor-default badge-soft badge-primary\">Primary</span>\n    <span class=\"badge cursor-default badge-soft badge-secondary\">Secondary</span>\n    <span class=\"badge cursor-default badge-soft badge-accent\">Accent</span>\n    <span class=\"badge cursor-default badge-soft badge-info\">Info</span>\n    <span class=\"badge cursor-default badge-soft badge-success\">Success</span>\n    <span class=\"badge cursor-default badge-soft badge-warning\">Warning</span>\n    <span class=\"badge cursor-default badge-soft badge-error\">Error</span>\n  </div>\n  <div class=\"flex flex-col gap-3\">\n    <p class=\"label-ink\">Ghost</p>\n    <span class=\"badge badge-ghost cursor-default\">Ghost</span>\n  </div>\n</div>"

const matrixJsx = "<div className=\"grid gap-6 sm:grid-cols-2 lg:grid-cols-4\">\n  <div className=\"flex flex-col gap-3\">\n    <p className=\"label-ink\">Outline</p>\n    <span className=\"badge cursor-default badge-outline badge-primary\">Primary</span>\n    <span className=\"badge cursor-default badge-outline badge-secondary\">Secondary</span>\n    <span className=\"badge cursor-default badge-outline badge-accent\">Accent</span>\n    <span className=\"badge cursor-default badge-outline badge-info\">Info</span>\n    <span className=\"badge cursor-default badge-outline badge-success\">Success</span>\n    <span className=\"badge cursor-default badge-outline badge-warning\">Warning</span>\n    <span className=\"badge cursor-default badge-outline badge-error\">Error</span>\n  </div>\n  <div className=\"flex flex-col gap-3\">\n    <p className=\"label-ink\">Dash</p>\n    <span className=\"badge cursor-default badge-dash badge-primary\">Primary</span>\n    <span className=\"badge cursor-default badge-dash badge-secondary\">Secondary</span>\n    <span className=\"badge cursor-default badge-dash badge-accent\">Accent</span>\n    <span className=\"badge cursor-default badge-dash badge-info\">Info</span>\n    <span className=\"badge cursor-default badge-dash badge-success\">Success</span>\n    <span className=\"badge cursor-default badge-dash badge-warning\">Warning</span>\n    <span className=\"badge cursor-default badge-dash badge-error\">Error</span>\n  </div>\n  <div className=\"flex flex-col gap-3\">\n    <p className=\"label-ink\">Soft</p>\n    <span className=\"badge cursor-default badge-soft badge-primary\">Primary</span>\n    <span className=\"badge cursor-default badge-soft badge-secondary\">Secondary</span>\n    <span className=\"badge cursor-default badge-soft badge-accent\">Accent</span>\n    <span className=\"badge cursor-default badge-soft badge-info\">Info</span>\n    <span className=\"badge cursor-default badge-soft badge-success\">Success</span>\n    <span className=\"badge cursor-default badge-soft badge-warning\">Warning</span>\n    <span className=\"badge cursor-default badge-soft badge-error\">Error</span>\n  </div>\n  <div className=\"flex flex-col gap-3\">\n    <p className=\"label-ink\">Ghost</p>\n    <span className=\"badge badge-ghost cursor-default\">Ghost</span>\n  </div>\n</div>"

const emptyHtml = "<div class=\"flex flex-wrap items-end gap-4\">\n  <span class=\"badge badge-primary cursor-default badge-xl\" aria-label=\"Empty badge-xl\"></span>\n  <span class=\"badge badge-primary cursor-default badge-lg\" aria-label=\"Empty badge-lg\"></span>\n  <span class=\"badge badge-primary cursor-default badge-md\" aria-label=\"Empty badge-md\"></span>\n  <span class=\"badge badge-primary cursor-default badge-sm\" aria-label=\"Empty badge-sm\"></span>\n  <span class=\"badge badge-primary cursor-default badge-xs\" aria-label=\"Empty badge-xs\"></span>\n</div>"

const emptyJsx = "<div className=\"flex flex-wrap items-end gap-4\">\n  <span className=\"badge badge-primary cursor-default badge-xl\" aria-label=\"Empty badge-xl\"></span>\n  <span className=\"badge badge-primary cursor-default badge-lg\" aria-label=\"Empty badge-lg\"></span>\n  <span className=\"badge badge-primary cursor-default badge-md\" aria-label=\"Empty badge-md\"></span>\n  <span className=\"badge badge-primary cursor-default badge-sm\" aria-label=\"Empty badge-sm\"></span>\n  <span className=\"badge badge-primary cursor-default badge-xs\" aria-label=\"Empty badge-xs\"></span>\n</div>"

const iconsHtml = "<div class=\"flex flex-wrap items-end gap-4\">\n  <span class=\"badge cursor-default badge-info\"><svg class=\"size-[1em]\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 16v-4\"/><path d=\"M12 8h.01\"/></svg> Info</span>\n  <span class=\"badge cursor-default badge-success\"><svg class=\"size-[1em]\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m9 12 2 2 4-4\"/></svg> Success</span>\n  <span class=\"badge cursor-default badge-warning\"><svg class=\"size-[1em]\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\"/><path d=\"M12 9v4\"/><path d=\"M12 17h.01\"/></svg> Warning</span>\n  <span class=\"badge cursor-default badge-error\"><svg class=\"size-[1em]\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m15 9-6 6\"/><path d=\"m9 9 6 6\"/></svg> Error</span>\n  <span class=\"badge badge-primary cursor-default\"><svg class=\"size-[1em]\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z\"/><path d=\"m9 12 2 2 4-4\"/></svg> Verified</span>\n</div>"

const iconsJsx = "<div className=\"flex flex-wrap items-end gap-4\">\n  <span className=\"badge cursor-default badge-info\"><svg className=\"size-[1em]\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 16v-4\"/><path d=\"M12 8h.01\"/></svg> Info</span>\n  <span className=\"badge cursor-default badge-success\"><svg className=\"size-[1em]\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m9 12 2 2 4-4\"/></svg> Success</span>\n  <span className=\"badge cursor-default badge-warning\"><svg className=\"size-[1em]\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\"/><path d=\"M12 9v4\"/><path d=\"M12 17h.01\"/></svg> Warning</span>\n  <span className=\"badge cursor-default badge-error\"><svg className=\"size-[1em]\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m15 9-6 6\"/><path d=\"m9 9 6 6\"/></svg> Error</span>\n  <span className=\"badge badge-primary cursor-default\"><svg className=\"size-[1em]\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><path d=\"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z\"/><path d=\"m9 12 2 2 4-4\"/></svg> Verified</span>\n</div>"

const inTextHtml = "<div class=\"flex flex-col gap-3\">\n  <h2 class=\"font-display text-xl font-semibold\">Heading 1 <span class=\"badge badge-xl cursor-default\">Badge</span></h2>\n  <h3 class=\"font-display text-lg font-semibold\">Heading 2 <span class=\"badge badge-lg cursor-default\">Badge</span></h3>\n  <h4 class=\"text-base font-semibold\">Heading 3 <span class=\"badge badge-md cursor-default\">Badge</span></h4>\n  <h5 class=\"text-sm font-semibold\">Heading 4 <span class=\"badge badge-sm cursor-default\">Badge</span></h5>\n  <p class=\"text-xs font-semibold\">Heading 5 <span class=\"badge badge-xs cursor-default\">Badge</span></p>\n  <p class=\"text-xs text-ink-muted\">Paragraph <span class=\"badge badge-xs cursor-default\">Badge</span></p>\n</div>"

const inTextJsx = "<div className=\"flex flex-col gap-3\">\n  <h2 className=\"font-display text-xl font-semibold\">Heading 1 <span className=\"badge badge-xl cursor-default\">Badge</span></h2>\n  <h3 className=\"font-display text-lg font-semibold\">Heading 2 <span className=\"badge badge-lg cursor-default\">Badge</span></h3>\n  <h4 className=\"text-base font-semibold\">Heading 3 <span className=\"badge badge-md cursor-default\">Badge</span></h4>\n  <h5 className=\"text-sm font-semibold\">Heading 4 <span className=\"badge badge-sm cursor-default\">Badge</span></h5>\n  <p className=\"text-xs font-semibold\">Heading 5 <span className=\"badge badge-xs cursor-default\">Badge</span></p>\n  <p className=\"text-xs text-ink-muted\">Paragraph <span className=\"badge badge-xs cursor-default\">Badge</span></p>\n</div>"

const inButtonsHtml = "<div class=\"flex flex-wrap items-end gap-4\">\n  <button type=\"button\" class=\"btn cursor-pointer\">\n    Inbox\n    <span class=\"badge badge-sm cursor-default\">+99</span>\n  </button>\n  <button type=\"button\" class=\"btn cursor-pointer\">\n    Inbox\n    <span class=\"badge badge-sm badge-secondary cursor-default\">+99</span>\n  </button>\n  <button type=\"button\" class=\"btn btn-primary cursor-pointer\">\n    <svg class=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z\"/><path d=\"m9 12 2 2 4-4\"/></svg>\n    Series\n    <span class=\"badge badge-sm badge-neutral cursor-default\">12</span>\n  </button>\n  <button type=\"button\" class=\"btn btn-ghost cursor-pointer\">\n    Alerts\n    <span class=\"badge badge-xs badge-error cursor-default\">2</span>\n  </button>\n</div>"

const inButtonsJsx = "<div className=\"flex flex-wrap items-end gap-4\">\n  <button type=\"button\" className=\"btn cursor-pointer\">\n    Inbox\n    <span className=\"badge badge-sm cursor-default\">+99</span>\n  </button>\n  <button type=\"button\" className=\"btn cursor-pointer\">\n    Inbox\n    <span className=\"badge badge-sm badge-secondary cursor-default\">+99</span>\n  </button>\n  <button type=\"button\" className=\"btn btn-primary cursor-pointer\">\n    <svg className=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><path d=\"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z\"/><path d=\"m9 12 2 2 4-4\"/></svg>\n    Series\n    <span className=\"badge badge-sm badge-neutral cursor-default\">12</span>\n  </button>\n  <button type=\"button\" className=\"btn btn-ghost cursor-pointer\">\n    Alerts\n    <span className=\"badge badge-xs badge-error cursor-default\">2</span>\n  </button>\n</div>"

const avatarsHtml = "<div class=\"grid gap-6 sm:grid-cols-2 lg:grid-cols-3\">\n  <div class=\"flex items-center gap-3\">\n    <div class=\"avatar avatar-placeholder\">\n      <div class=\"w-10 rounded-full bg-wash-blue text-sm font-semibold\"><span>MK</span></div>\n    </div>\n    <div class=\"min-w-0\">\n      <p class=\"truncate text-sm font-semibold\">Maya K.</p>\n      <span class=\"badge badge-sm badge-primary cursor-default\">Lead</span>\n    </div>\n  </div>\n  <div class=\"flex items-center gap-3\">\n    <div class=\"avatar avatar-placeholder\">\n      <div class=\"w-10 rounded-full bg-wash-rose text-sm font-semibold\"><span>JL</span></div>\n    </div>\n    <div class=\"min-w-0\">\n      <p class=\"truncate text-sm font-semibold\">Jules L.</p>\n      <span class=\"badge badge-sm badge-success cursor-default\">Online</span>\n    </div>\n  </div>\n  <div class=\"flex flex-wrap items-center gap-3\">\n    <div class=\"avatar-group -space-x-4\">\n      <div class=\"avatar avatar-placeholder\">\n        <div class=\"w-8 rounded-full bg-wash-blue text-xs font-semibold\"><span>A</span></div>\n      </div>\n      <div class=\"avatar avatar-placeholder\">\n        <div class=\"w-8 rounded-full bg-wash-ochre text-xs font-semibold\"><span>B</span></div>\n      </div>\n      <div class=\"avatar avatar-placeholder\">\n        <div class=\"w-8 rounded-full bg-wash-rose text-xs font-semibold\"><span>C</span></div>\n      </div>\n    </div>\n    <span class=\"badge badge-xs badge-neutral cursor-default\">+4</span>\n  </div>\n</div>"

const avatarsJsx = "<div className=\"grid gap-6 sm:grid-cols-2 lg:grid-cols-3\">\n  <div className=\"flex items-center gap-3\">\n    <div className=\"avatar avatar-placeholder\">\n      <div className=\"w-10 rounded-full bg-wash-blue text-sm font-semibold\"><span>MK</span></div>\n    </div>\n    <div className=\"min-w-0\">\n      <p className=\"truncate text-sm font-semibold\">Maya K.</p>\n      <span className=\"badge badge-sm badge-primary cursor-default\">Lead</span>\n    </div>\n  </div>\n  <div className=\"flex items-center gap-3\">\n    <div className=\"avatar avatar-placeholder\">\n      <div className=\"w-10 rounded-full bg-wash-rose text-sm font-semibold\"><span>JL</span></div>\n    </div>\n    <div className=\"min-w-0\">\n      <p className=\"truncate text-sm font-semibold\">Jules L.</p>\n      <span className=\"badge badge-sm badge-success cursor-default\">Online</span>\n    </div>\n  </div>\n  <div className=\"flex flex-wrap items-center gap-3\">\n    <div className=\"avatar-group -space-x-4\">\n      <div className=\"avatar avatar-placeholder\">\n        <div className=\"w-8 rounded-full bg-wash-blue text-xs font-semibold\"><span>A</span></div>\n      </div>\n      <div className=\"avatar avatar-placeholder\">\n        <div className=\"w-8 rounded-full bg-wash-ochre text-xs font-semibold\"><span>B</span></div>\n      </div>\n      <div className=\"avatar avatar-placeholder\">\n        <div className=\"w-8 rounded-full bg-wash-rose text-xs font-semibold\"><span>C</span></div>\n      </div>\n    </div>\n    <span className=\"badge badge-xs badge-neutral cursor-default\">+4</span>\n  </div>\n</div>"

const listsHtml = "<ul class=\"list max-w-full overflow-x-auto rounded-box border border-ink-border/70 bg-base-100\">\n  <li class=\"list-row\">\n    <div class=\"avatar avatar-placeholder\">\n      <div class=\"w-10 rounded-box text-sm font-semibold wash-blue\"><span>UB</span></div>\n    </div>\n    <div class=\"list-col-grow min-w-0\">\n      <div class=\"font-semibold\">Ultramarine study</div>\n      <div class=\"text-xs text-ink-muted\">Cold wash, two layers</div>\n    </div>\n    <span class=\"badge badge-sm cursor-default badge-info\">Wet</span>\n  </li>\n  <li class=\"list-row\">\n    <div class=\"avatar avatar-placeholder\">\n      <div class=\"w-10 rounded-box text-sm font-semibold wash-rose\"><span>QR</span></div>\n    </div>\n    <div class=\"list-col-grow min-w-0\">\n      <div class=\"font-semibold\">Quinacridone rose</div>\n      <div class=\"text-xs text-ink-muted\">Warm glaze pending</div>\n    </div>\n    <span class=\"badge badge-sm cursor-default badge-warning\">Drying</span>\n  </li>\n  <li class=\"list-row\">\n    <div class=\"avatar avatar-placeholder\">\n      <div class=\"w-10 rounded-box text-sm font-semibold wash-ochre\"><span>SG</span></div>\n    </div>\n    <div class=\"list-col-grow min-w-0\">\n      <div class=\"font-semibold\">Sap green field</div>\n      <div class=\"text-xs text-ink-muted\">Ready for detail</div>\n    </div>\n    <span class=\"badge badge-sm cursor-default badge-success\">Dry</span>\n  </li>\n</ul>"

const listsJsx = "<ul className=\"list max-w-full overflow-x-auto rounded-box border border-ink-border/70 bg-base-100\">\n  <li className=\"list-row\">\n    <div className=\"avatar avatar-placeholder\">\n      <div className=\"w-10 rounded-box text-sm font-semibold wash-blue\"><span>UB</span></div>\n    </div>\n    <div className=\"list-col-grow min-w-0\">\n      <div className=\"font-semibold\">Ultramarine study</div>\n      <div className=\"text-xs text-ink-muted\">Cold wash, two layers</div>\n    </div>\n    <span className=\"badge badge-sm cursor-default badge-info\">Wet</span>\n  </li>\n  <li className=\"list-row\">\n    <div className=\"avatar avatar-placeholder\">\n      <div className=\"w-10 rounded-box text-sm font-semibold wash-rose\"><span>QR</span></div>\n    </div>\n    <div className=\"list-col-grow min-w-0\">\n      <div className=\"font-semibold\">Quinacridone rose</div>\n      <div className=\"text-xs text-ink-muted\">Warm glaze pending</div>\n    </div>\n    <span className=\"badge badge-sm cursor-default badge-warning\">Drying</span>\n  </li>\n  <li className=\"list-row\">\n    <div className=\"avatar avatar-placeholder\">\n      <div className=\"w-10 rounded-box text-sm font-semibold wash-ochre\"><span>SG</span></div>\n    </div>\n    <div className=\"list-col-grow min-w-0\">\n      <div className=\"font-semibold\">Sap green field</div>\n      <div className=\"text-xs text-ink-muted\">Ready for detail</div>\n    </div>\n    <span className=\"badge badge-sm cursor-default badge-success\">Dry</span>\n  </li>\n</ul>"

const studioHtml = "<div class=\"space-y-6\">\n  <div>\n    <p class=\"label-ink mb-3\">Pigment tags</p>\n    <div class=\"flex flex-wrap gap-2 sm:gap-3\">\n      <span class=\"badge badge-soft cursor-default badge-primary\">Ultramarine</span>\n      <span class=\"badge badge-soft cursor-default badge-secondary\">Quinacridone</span>\n      <span class=\"badge badge-soft cursor-default badge-accent\">Sap green</span>\n      <span class=\"badge badge-soft cursor-default badge-warning\">Raw sienna</span>\n      <span class=\"badge badge-soft cursor-default badge-neutral\">Payne gray</span>\n      <span class=\"badge badge-soft cursor-default badge-info\">Cerulean</span>\n    </div>\n  </div>\n  <div>\n    <p class=\"label-ink mb-3\">Wash status chips</p>\n    <div class=\"flex flex-wrap gap-2 sm:gap-3\">\n      <span class=\"badge cursor-default badge-soft badge-info\"><svg class=\"size-[1em]\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z\"/></svg> Wet</span>\n      <span class=\"badge cursor-default badge-soft badge-warning\"><svg class=\"size-[1em]\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z\"/><path d=\"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12\"/><path d=\"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17\"/></svg> Drying</span>\n      <span class=\"badge cursor-default badge-soft badge-success\"><svg class=\"size-[1em]\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m9 12 2 2 4-4\"/></svg> Dry</span>\n      <span class=\"badge cursor-default badge-soft badge-primary\"><svg class=\"size-[1em]\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"m14.622 17.897-10.68-2.913\"/><path d=\"M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z\"/><path d=\"M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 9.055a1.662 1.662 0 0 0 2.42.4c.545-.46.97-1.1 1.134-1.917.32-1.592.54-3.137.54-4.409\"/></svg> Glaze ready</span>\n      <span class=\"badge cursor-default badge-outline badge-neutral\"><svg class=\"size-[1em]\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\"/><path d=\"M12 9v4\"/><path d=\"M12 17h.01\"/></svg> Hold</span>\n    </div>\n  </div>\n  <div class=\"rounded-box border border-ink-border/70 bg-base-100/80 p-4 sm:p-5\">\n    <div class=\"flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between\">\n      <div class=\"min-w-0\">\n        <p class=\"font-display text-lg font-semibold\">Plate 214 · Morning fog</p>\n        <p class=\"mt-1 text-sm text-ink-muted\">Cold wash, cerulean underpaint, hold before second layer.</p>\n      </div>\n      <div class=\"flex flex-wrap gap-2\">\n        <span class=\"badge badge-soft badge-info cursor-default\">Wet</span>\n        <span class=\"badge badge-outline badge-primary cursor-default\">Series A</span>\n        <span class=\"badge badge-ghost cursor-default\">Draft</span>\n      </div>\n    </div>\n  </div>\n</div>"

const studioJsx = "<div className=\"space-y-6\">\n  <div>\n    <p className=\"label-ink mb-3\">Pigment tags</p>\n    <div className=\"flex flex-wrap gap-2 sm:gap-3\">\n      <span className=\"badge badge-soft cursor-default badge-primary\">Ultramarine</span>\n      <span className=\"badge badge-soft cursor-default badge-secondary\">Quinacridone</span>\n      <span className=\"badge badge-soft cursor-default badge-accent\">Sap green</span>\n      <span className=\"badge badge-soft cursor-default badge-warning\">Raw sienna</span>\n      <span className=\"badge badge-soft cursor-default badge-neutral\">Payne gray</span>\n      <span className=\"badge badge-soft cursor-default badge-info\">Cerulean</span>\n    </div>\n  </div>\n  <div>\n    <p className=\"label-ink mb-3\">Wash status chips</p>\n    <div className=\"flex flex-wrap gap-2 sm:gap-3\">\n      <span className=\"badge cursor-default badge-soft badge-info\"><svg className=\"size-[1em]\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><path d=\"M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z\"/></svg> Wet</span>\n      <span className=\"badge cursor-default badge-soft badge-warning\"><svg className=\"size-[1em]\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><path d=\"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z\"/><path d=\"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12\"/><path d=\"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17\"/></svg> Drying</span>\n      <span className=\"badge cursor-default badge-soft badge-success\"><svg className=\"size-[1em]\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m9 12 2 2 4-4\"/></svg> Dry</span>\n      <span className=\"badge cursor-default badge-soft badge-primary\"><svg className=\"size-[1em]\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><path d=\"m14.622 17.897-10.68-2.913\"/><path d=\"M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z\"/><path d=\"M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 9.055a1.662 1.662 0 0 0 2.42.4c.545-.46.97-1.1 1.134-1.917.32-1.592.54-3.137.54-4.409\"/></svg> Glaze ready</span>\n      <span className=\"badge cursor-default badge-outline badge-neutral\"><svg className=\"size-[1em]\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\"/><path d=\"M12 9v4\"/><path d=\"M12 17h.01\"/></svg> Hold</span>\n    </div>\n  </div>\n  <div className=\"rounded-box border border-ink-border/70 bg-base-100/80 p-4 sm:p-5\">\n    <div className=\"flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between\">\n      <div className=\"min-w-0\">\n        <p className=\"font-display text-lg font-semibold\">Plate 214 · Morning fog</p>\n        <p className=\"mt-1 text-sm text-ink-muted\">Cold wash, cerulean underpaint, hold before second layer.</p>\n      </div>\n      <div className=\"flex flex-wrap gap-2\">\n        <span className=\"badge badge-soft badge-info cursor-default\">Wet</span>\n        <span className=\"badge badge-outline badge-primary cursor-default\">Series A</span>\n        <span className=\"badge badge-ghost cursor-default\">Draft</span>\n      </div>\n    </div>\n  </div>\n</div>"

function Section({
  eyebrow,
  title,
  description,
  children,
  panel = '',
}: {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
  panel?: string
}) {
  return (
    <article className={`wash-panel wash-panel-flush paper-grain soak-in ${panel}`}>
      <div className="border-b border-ink-border/70 px-5 py-4">
        <p className="label-ink">{eyebrow}</p>
        <h2 className="font-display text-xl font-semibold md:text-2xl">{title}</h2>
        <p className="mt-1 text-sm text-ink-muted">{description}</p>
      </div>
      <div className="p-5">{children}</div>
    </article>
  )
}

function ClassLabel({ value }: { value: string }) {
  return (
    <code className="font-mono text-[0.65rem] text-ink-muted">
      {value || 'badge'}
    </code>
  )
}

function Sample({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col items-start gap-2">
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

export default function BadgePage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Badge
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">badge</span> colors, sizes, and styles.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Default badges"
          description="Plain badge with no color or style modifier"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-4">
                            <Sample label="badge">
                              <span className="badge cursor-default">Badge</span>
                            </Sample>
                            <Sample label="badge (label)">
                              <span className="badge cursor-default">New</span>
                            </Sample>
                            <Sample label="badge (count)">
                              <span className="badge cursor-default">3</span>
                            </Sample>
                          </div>
              </>
            }
            html={basicHtml}
            jsx={basicJsx}
          />
        
        </Section>

        <Section
          eyebrow="02 · Colors"
          title="Semantic colors"
          description="Default ink plus neutral, brand, and status colors"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-4">
                            {colors.map((c) => (
                              <Sample
                                key={c.name}
                                label={c.className ? `badge ${c.className}` : 'badge'}
                              >
                                <span className={`badge cursor-default ${c.className}`.trim()}>
                                  {c.name}
                                </span>
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={colorsHtml}
            jsx={colorsJsx}
          />
        
        </Section>

        <Section
          eyebrow="03 · Sizes"
          title="Size scale"
          description="badge-xs through badge-xl"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-4 sm:gap-5">
                            {sizes.map((s) => (
                              <Sample key={s.name} label={`badge ${s.className}`}>
                                <span className={`badge cursor-default ${s.className}`}>
                                  {s.label}
                                </span>
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={sizesHtml}
            jsx={sizesJsx}
          />
        
        </Section>

        <Section
          eyebrow="04 · Soft"
          title="Soft variant"
          description="badge-soft with each brand and status color"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-4">
                            {styleColors.map((c) => (
                              <Sample key={c.name} label={`badge badge-soft ${c.className}`}>
                                <span
                                  className={`badge badge-soft cursor-default ${c.className}`}
                                >
                                  {c.name}
                                </span>
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={softHtml}
            jsx={softJsx}
          />
        
        </Section>

        <Section
          eyebrow="05 · Outline"
          title="Outline variant"
          description="badge-outline for a lighter border treatment"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-4">
                            {styleColors.map((c) => (
                              <Sample key={c.name} label={`badge badge-outline ${c.className}`}>
                                <span
                                  className={`badge badge-outline cursor-default ${c.className}`}
                                >
                                  {c.name}
                                </span>
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={outlineHtml}
            jsx={outlineJsx}
          />
        
        </Section>

        <Section
          eyebrow="06 · Dash"
          title="Dash variant"
          description="badge-dash uses a dashed outline"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-4">
                            {styleColors.map((c) => (
                              <Sample key={c.name} label={`badge badge-dash ${c.className}`}>
                                <span
                                  className={`badge badge-dash cursor-default ${c.className}`}
                                >
                                  {c.name}
                                </span>
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={dashHtml}
            jsx={dashJsx}
          />
        
        </Section>

        <Section
          eyebrow="07 · Ghost"
          title="Ghost variant"
          description="badge-ghost for a quiet, low-contrast label"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="badge badge-ghost">
                            <span className="badge badge-ghost cursor-default">ghost</span>
                          </Sample>
              </>
            }
            html={ghostHtml}
            jsx={ghostJsx}
          />
        
        </Section>

        <Section
          eyebrow="08 · Neutral outline / dash"
          title="Neutral on light ground"
          description="Neutral outline and dash use dark text"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="rounded-box border border-ink-border/70 bg-white p-4 sm:p-6">
                            <div className="flex flex-wrap items-end gap-4">
                              <Sample label="badge badge-neutral badge-outline">
                                <span className="badge badge-neutral badge-outline cursor-default">
                                  Outline
                                </span>
                              </Sample>
                              <Sample label="badge badge-neutral badge-dash">
                                <span className="badge badge-neutral badge-dash cursor-default">
                                  Dash
                                </span>
                              </Sample>
                            </div>
                          </div>
              </>
            }
            html={neutralHtml}
            jsx={neutralJsx}
          />
        
        </Section>

        <Section
          eyebrow="09 · Variants × colors"
          title="Style matrix"
          description="Outline, dash, soft, and ghost across brand and status colors"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {styles.map((style) => (
                              <div key={style.name} className="flex flex-col gap-3">
                                <p className="label-ink">{style.name}</p>
                                {style.className === 'badge-ghost' ? (
                                  <Sample label="badge badge-ghost">
                                    <span className="badge badge-ghost cursor-default">
                                      Ghost
                                    </span>
                                  </Sample>
                                ) : (
                                  styleColors.map((c) => (
                                    <Sample
                                      key={`${style.name}-${c.name}`}
                                      label={`badge ${style.className} ${c.className}`}
                                    >
                                      <span
                                        className={`badge cursor-default ${style.className} ${c.className}`}
                                      >
                                        {c.name}
                                      </span>
                                    </Sample>
                                  ))
                                )}
                              </div>
                            ))}
                          </div>
              </>
            }
            html={matrixHtml}
            jsx={matrixJsx}
          />
        
        </Section>

        <Section
          eyebrow="10 · Empty"
          title="Empty badges"
          description="Remove the text for a status dot"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-4">
                            {(
                              [
                                'badge-xl',
                                'badge-lg',
                                'badge-md',
                                'badge-sm',
                                'badge-xs',
                              ] as const
                            ).map((size) => (
                              <Sample key={size} label={`badge badge-primary ${size}`}>
                                <span
                                  className={`badge badge-primary cursor-default ${size}`}
                                  aria-label={`Empty ${size}`}
                                />
                              </Sample>
                            ))}
                          </div>
              </>
            }
            html={emptyHtml}
            jsx={emptyJsx}
          />
        
        </Section>

        <Section
          eyebrow="11 · Icons"
          title="Badges with Lucide"
          description="Status badges with matching Lucide 1.28.0 icons"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-4">
                            {iconBadges.map(({ name, className, Icon }) => (
                              <Sample key={name} label={`badge ${className} + Lucide`}>
                                <span className={`badge cursor-default ${className}`}>
                                  <Icon className="size-[1em]" strokeWidth={2} aria-hidden />
                                  {name}
                                </span>
                              </Sample>
                            ))}
                            <Sample label="badge badge-primary + BadgeCheck">
                              <span className="badge badge-primary cursor-default">
                                <BadgeCheck className="size-[1em]" strokeWidth={2} aria-hidden />
                                Verified
                              </span>
                            </Sample>
                          </div>
              </>
            }
            html={iconsHtml}
            jsx={iconsJsx}
          />
        
        </Section>

        <Section
          eyebrow="12 · In text"
          title="Inline with headings"
          description="Pair badge size with surrounding type scale"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-3">
                            <Sample label="text-xl + badge badge-xl">
                              <h2 className="font-display text-xl font-semibold">
                                Heading 1{' '}
                                <span className="badge badge-xl cursor-default">Badge</span>
                              </h2>
                            </Sample>
                            <Sample label="text-lg + badge badge-lg">
                              <h3 className="font-display text-lg font-semibold">
                                Heading 2{' '}
                                <span className="badge badge-lg cursor-default">Badge</span>
                              </h3>
                            </Sample>
                            <Sample label="text-base + badge badge-md">
                              <h4 className="text-base font-semibold">
                                Heading 3{' '}
                                <span className="badge badge-md cursor-default">Badge</span>
                              </h4>
                            </Sample>
                            <Sample label="text-sm + badge badge-sm">
                              <h5 className="text-sm font-semibold">
                                Heading 4{' '}
                                <span className="badge badge-sm cursor-default">Badge</span>
                              </h5>
                            </Sample>
                            <Sample label="text-xs + badge badge-xs">
                              <p className="text-xs font-semibold">
                                Heading 5{' '}
                                <span className="badge badge-xs cursor-default">Badge</span>
                              </p>
                            </Sample>
                            <Sample label="paragraph + badge badge-xs">
                              <p className="text-xs text-ink-muted">
                                Paragraph{' '}
                                <span className="badge badge-xs cursor-default">Badge</span>
                              </p>
                            </Sample>
                          </div>
              </>
            }
            html={inTextHtml}
            jsx={inTextJsx}
          />
        
        </Section>

        <Section
          eyebrow="13 · In buttons"
          title="Nested in buttons"
          description="Small badges as counts inside interactive buttons"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-4">
                            <Sample label="btn + badge badge-sm">
                              <button type="button" className="btn cursor-pointer">
                                Inbox
                                <span className="badge badge-sm cursor-default">+99</span>
                              </button>
                            </Sample>
                            <Sample label="btn + badge badge-sm badge-secondary">
                              <button type="button" className="btn cursor-pointer">
                                Inbox
                                <span className="badge badge-sm badge-secondary cursor-default">
                                  +99
                                </span>
                              </button>
                            </Sample>
                            <Sample label="btn btn-primary + badge badge-sm badge-neutral">
                              <button type="button" className="btn btn-primary cursor-pointer">
                                <BadgeCheck className="size-4" strokeWidth={2} aria-hidden />
                                Series
                                <span className="badge badge-sm badge-neutral cursor-default">
                                  12
                                </span>
                              </button>
                            </Sample>
                            <Sample label="btn btn-ghost + badge badge-xs badge-error">
                              <button type="button" className="btn btn-ghost cursor-pointer">
                                Alerts
                                <span className="badge badge-xs badge-error cursor-default">
                                  2
                                </span>
                              </button>
                            </Sample>
                          </div>
              </>
            }
            html={inButtonsHtml}
            jsx={inButtonsJsx}
          />
        
        </Section>

        <Section
          eyebrow="14 · With avatars"
          title="Beside avatar placeholders"
          description="Role and presence chips next to studio avatars"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <Sample label="avatar + badge badge-sm badge-primary">
                              <div className="flex items-center gap-3">
                                <div className="avatar avatar-placeholder">
                                  <div className="w-10 rounded-full bg-wash-blue text-sm font-semibold">
                                    <span>MK</span>
                                  </div>
                                </div>
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-semibold">Maya K.</p>
                                  <span className="badge badge-sm badge-primary cursor-default">
                                    Lead
                                  </span>
                                </div>
                              </div>
                            </Sample>
                            <Sample label="avatar + badge badge-sm badge-success">
                              <div className="flex items-center gap-3">
                                <div className="avatar avatar-placeholder">
                                  <div className="w-10 rounded-full bg-wash-rose text-sm font-semibold">
                                    <span>JL</span>
                                  </div>
                                </div>
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-semibold">Jules L.</p>
                                  <span className="badge badge-sm badge-success cursor-default">
                                    Online
                                  </span>
                                </div>
                              </div>
                            </Sample>
                            <Sample label="avatar-group + badge badge-xs">
                              <div className="flex flex-wrap items-center gap-3">
                                <div className="avatar-group -space-x-4">
                                  <div className="avatar avatar-placeholder">
                                    <div className="w-8 rounded-full bg-wash-blue text-xs font-semibold">
                                      <span>A</span>
                                    </div>
                                  </div>
                                  <div className="avatar avatar-placeholder">
                                    <div className="w-8 rounded-full bg-wash-ochre text-xs font-semibold">
                                      <span>B</span>
                                    </div>
                                  </div>
                                  <div className="avatar avatar-placeholder">
                                    <div className="w-8 rounded-full bg-wash-rose text-xs font-semibold">
                                      <span>C</span>
                                    </div>
                                  </div>
                                </div>
                                <span className="badge badge-xs badge-neutral cursor-default">
                                  +4
                                </span>
                              </div>
                            </Sample>
                          </div>
              </>
            }
            html={avatarsHtml}
            jsx={avatarsJsx}
          />
        
        </Section>

        <Section
          eyebrow="15 · In lists"
          title="List rows with status chips"
          description="badge-sm chips on daisyUI list-row items"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="list + list-row + badge badge-sm">
                            <ul className="list max-w-full overflow-x-auto rounded-box border border-ink-border/70 bg-base-100">
                              {plateRows.map((row) => (
                                <li key={row.title} className="list-row">
                                  <div className="avatar avatar-placeholder">
                                    <div
                                      className={`w-10 rounded-box text-sm font-semibold ${row.wash}`}
                                    >
                                      <span>{row.initials}</span>
                                    </div>
                                  </div>
                                  <div className="list-col-grow min-w-0">
                                    <div className="font-semibold">{row.title}</div>
                                    <div className="text-xs text-ink-muted">{row.detail}</div>
                                  </div>
                                  <span
                                    className={`badge badge-sm cursor-default ${row.badgeClass}`}
                                  >
                                    {row.badge}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </Sample>
              </>
            }
            html={listsHtml}
            jsx={listsJsx}
          />
        
        </Section>

        <Section
          eyebrow="16 · Studio"
          title="Pigment tags and wash chips"
          description="Soft pigment labels and wash-state chips for the desk"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="space-y-6">
                            <div>
                              <p className="label-ink mb-3">Pigment tags</p>
                              <div className="flex flex-wrap gap-2 sm:gap-3">
                                {pigmentTags.map((tag) => (
                                  <Sample
                                    key={tag.name}
                                    label={`badge badge-soft ${tag.className}`}
                                  >
                                    <span
                                      className={`badge badge-soft cursor-default ${tag.className}`}
                                    >
                                      {tag.name}
                                    </span>
                                  </Sample>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="label-ink mb-3">Wash status chips</p>
                              <div className="flex flex-wrap gap-2 sm:gap-3">
                                {washChips.map(({ name, className, Icon }) => (
                                  <Sample key={name} label={`badge ${className} + Lucide`}>
                                    <span className={`badge cursor-default ${className}`}>
                                      <Icon
                                        className="size-[1em]"
                                        strokeWidth={2}
                                        aria-hidden
                                      />
                                      {name}
                                    </span>
                                  </Sample>
                                ))}
                              </div>
                            </div>
                            <div className="rounded-box border border-ink-border/70 bg-base-100/80 p-4 sm:p-5">
                              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div className="min-w-0">
                                  <p className="font-display text-lg font-semibold">
                                    Plate 214 · Morning fog
                                  </p>
                                  <p className="mt-1 text-sm text-ink-muted">
                                    Cold wash, cerulean underpaint, hold before second layer.
                                  </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  <span className="badge badge-soft badge-info cursor-default">
                                    Wet
                                  </span>
                                  <span className="badge badge-outline badge-primary cursor-default">
                                    Series A
                                  </span>
                                  <span className="badge badge-ghost cursor-default">
                                    Draft
                                  </span>
                                </div>
                              </div>
                              <ClassLabel value="badge-soft / badge-outline / badge-ghost (studio card)" />
                            </div>
                          </div>
              </>
            }
            html={studioHtml}
            jsx={studioJsx}
          />
        
        </Section>
      </div>
    </>
  )
}
