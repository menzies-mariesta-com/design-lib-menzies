import {
  Plus,
  Download,
  Trash2,
  Heart,
  Settings,
  ArrowRight,
  Search,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { GallerySection } from './components/GallerySection'
import { ShowcaseTabs } from './components/ShowcaseTabs'

const colors = [
  { name: 'Default', className: '' },
  { name: 'Neutral', className: 'btn-neutral' },
  { name: 'Primary', className: 'btn-primary' },
  { name: 'Secondary', className: 'btn-secondary' },
  { name: 'Accent', className: 'btn-accent' },
  { name: 'Info', className: 'btn-info' },
  { name: 'Success', className: 'btn-success' },
  { name: 'Warning', className: 'btn-warning' },
  { name: 'Error', className: 'btn-error' },
] as const

const styles = [
  { name: 'Solid', className: '' },
  { name: 'Outline', className: 'btn-outline' },
  { name: 'Dash', className: 'btn-dash' },
  { name: 'Soft', className: 'btn-soft' },
  { name: 'Ghost', className: 'btn-ghost' },
  { name: 'Link', className: 'btn-link' },
] as const

const sizes = [
  { name: 'XS', className: 'btn-xs' },
  { name: 'SM', className: 'btn-sm' },
  { name: 'MD', className: 'btn-md' },
  { name: 'LG', className: 'btn-lg' },
  { name: 'XL', className: 'btn-xl' },
] as const

const tooltipColor: Record<string, string> = {
  '': '',
  'btn-neutral': 'tooltip-neutral',
  'btn-primary': 'tooltip-primary',
  'btn-secondary': 'tooltip-secondary',
  'btn-accent': 'tooltip-accent',
  'btn-info': 'tooltip-info',
  'btn-success': 'tooltip-success',
  'btn-warning': 'tooltip-warning',
  'btn-error': 'tooltip-error',
}

const semanticColorsHtml = "<div class=\"flex flex-wrap items-end gap-4\">\n  <button type=\"button\" class=\"btn ripple\">Default</button>\n  <button type=\"button\" class=\"btn ripple btn-neutral\">Neutral</button>\n  <button type=\"button\" class=\"btn ripple btn-primary\">Primary</button>\n  <button type=\"button\" class=\"btn ripple btn-secondary\">Secondary</button>\n  <button type=\"button\" class=\"btn ripple btn-accent\">Accent</button>\n  <button type=\"button\" class=\"btn ripple btn-info\">Info</button>\n  <button type=\"button\" class=\"btn ripple btn-success\">Success</button>\n  <button type=\"button\" class=\"btn ripple btn-warning\">Warning</button>\n  <button type=\"button\" class=\"btn ripple btn-error\">Error</button>\n</div>"

const semanticColorsJsx = "<div className=\"flex flex-wrap items-end gap-4\">\n  <button type=\"button\" className=\"btn ripple\">Default</button>\n  <button type=\"button\" className=\"btn ripple btn-neutral\">Neutral</button>\n  <button type=\"button\" className=\"btn ripple btn-primary\">Primary</button>\n  <button type=\"button\" className=\"btn ripple btn-secondary\">Secondary</button>\n  <button type=\"button\" className=\"btn ripple btn-accent\">Accent</button>\n  <button type=\"button\" className=\"btn ripple btn-info\">Info</button>\n  <button type=\"button\" className=\"btn ripple btn-success\">Success</button>\n  <button type=\"button\" className=\"btn ripple btn-warning\">Warning</button>\n  <button type=\"button\" className=\"btn ripple btn-error\">Error</button>\n</div>"

const styleVariantsHtml = "<div class=\"space-y-6\">\n  <div>\n    <p class=\"label-ink mb-3\">Solid</p>\n    <div class=\"flex flex-wrap gap-2\">\n      <button type=\"button\" class=\"btn ripple\">Default</button>\n      <button type=\"button\" class=\"btn ripple btn-neutral\">Neutral</button>\n      <button type=\"button\" class=\"btn ripple btn-primary\">Primary</button>\n      <button type=\"button\" class=\"btn ripple btn-secondary\">Secondary</button>\n      <button type=\"button\" class=\"btn ripple btn-accent\">Accent</button>\n      <button type=\"button\" class=\"btn ripple btn-info\">Info</button>\n      <button type=\"button\" class=\"btn ripple btn-success\">Success</button>\n      <button type=\"button\" class=\"btn ripple btn-warning\">Warning</button>\n      <button type=\"button\" class=\"btn ripple btn-error\">Error</button>\n    </div>\n  </div>\n  <div>\n    <p class=\"label-ink mb-3\">Outline</p>\n    <div class=\"flex flex-wrap gap-2\">\n      <button type=\"button\" class=\"btn ripple btn-outline\">Default</button>\n      <button type=\"button\" class=\"btn ripple btn-outline btn-neutral\">Neutral</button>\n      <button type=\"button\" class=\"btn ripple btn-outline btn-primary\">Primary</button>\n      <button type=\"button\" class=\"btn ripple btn-outline btn-secondary\">Secondary</button>\n      <button type=\"button\" class=\"btn ripple btn-outline btn-accent\">Accent</button>\n      <button type=\"button\" class=\"btn ripple btn-outline btn-info\">Info</button>\n      <button type=\"button\" class=\"btn ripple btn-outline btn-success\">Success</button>\n      <button type=\"button\" class=\"btn ripple btn-outline btn-warning\">Warning</button>\n      <button type=\"button\" class=\"btn ripple btn-outline btn-error\">Error</button>\n    </div>\n  </div>\n  <div>\n    <p class=\"label-ink mb-3\">Dash</p>\n    <div class=\"flex flex-wrap gap-2\">\n      <button type=\"button\" class=\"btn ripple btn-dash\">Default</button>\n      <button type=\"button\" class=\"btn ripple btn-dash btn-neutral\">Neutral</button>\n      <button type=\"button\" class=\"btn ripple btn-dash btn-primary\">Primary</button>\n      <button type=\"button\" class=\"btn ripple btn-dash btn-secondary\">Secondary</button>\n      <button type=\"button\" class=\"btn ripple btn-dash btn-accent\">Accent</button>\n      <button type=\"button\" class=\"btn ripple btn-dash btn-info\">Info</button>\n      <button type=\"button\" class=\"btn ripple btn-dash btn-success\">Success</button>\n      <button type=\"button\" class=\"btn ripple btn-dash btn-warning\">Warning</button>\n      <button type=\"button\" class=\"btn ripple btn-dash btn-error\">Error</button>\n    </div>\n  </div>\n  <div>\n    <p class=\"label-ink mb-3\">Soft</p>\n    <div class=\"flex flex-wrap gap-2\">\n      <button type=\"button\" class=\"btn ripple btn-soft\">Default</button>\n      <button type=\"button\" class=\"btn ripple btn-soft btn-neutral\">Neutral</button>\n      <button type=\"button\" class=\"btn ripple btn-soft btn-primary\">Primary</button>\n      <button type=\"button\" class=\"btn ripple btn-soft btn-secondary\">Secondary</button>\n      <button type=\"button\" class=\"btn ripple btn-soft btn-accent\">Accent</button>\n      <button type=\"button\" class=\"btn ripple btn-soft btn-info\">Info</button>\n      <button type=\"button\" class=\"btn ripple btn-soft btn-success\">Success</button>\n      <button type=\"button\" class=\"btn ripple btn-soft btn-warning\">Warning</button>\n      <button type=\"button\" class=\"btn ripple btn-soft btn-error\">Error</button>\n    </div>\n  </div>\n  <div>\n    <p class=\"label-ink mb-3\">Ghost</p>\n    <div class=\"flex flex-wrap gap-2\">\n      <button type=\"button\" class=\"btn ripple btn-ghost\">Default</button>\n      <button type=\"button\" class=\"btn ripple btn-ghost btn-neutral\">Neutral</button>\n      <button type=\"button\" class=\"btn ripple btn-ghost btn-primary\">Primary</button>\n      <button type=\"button\" class=\"btn ripple btn-ghost btn-secondary\">Secondary</button>\n      <button type=\"button\" class=\"btn ripple btn-ghost btn-accent\">Accent</button>\n      <button type=\"button\" class=\"btn ripple btn-ghost btn-info\">Info</button>\n      <button type=\"button\" class=\"btn ripple btn-ghost btn-success\">Success</button>\n      <button type=\"button\" class=\"btn ripple btn-ghost btn-warning\">Warning</button>\n      <button type=\"button\" class=\"btn ripple btn-ghost btn-error\">Error</button>\n    </div>\n  </div>\n  <div>\n    <p class=\"label-ink mb-3\">Link</p>\n    <div class=\"flex flex-wrap gap-2\">\n      <button type=\"button\" class=\"btn ripple btn-link\">Default</button>\n      <button type=\"button\" class=\"btn ripple btn-link btn-neutral\">Neutral</button>\n      <button type=\"button\" class=\"btn ripple btn-link btn-primary\">Primary</button>\n      <button type=\"button\" class=\"btn ripple btn-link btn-secondary\">Secondary</button>\n      <button type=\"button\" class=\"btn ripple btn-link btn-accent\">Accent</button>\n      <button type=\"button\" class=\"btn ripple btn-link btn-info\">Info</button>\n      <button type=\"button\" class=\"btn ripple btn-link btn-success\">Success</button>\n      <button type=\"button\" class=\"btn ripple btn-link btn-warning\">Warning</button>\n      <button type=\"button\" class=\"btn ripple btn-link btn-error\">Error</button>\n    </div>\n  </div>\n</div>"

const styleVariantsJsx = "<div className=\"space-y-6\">\n  <div>\n    <p className=\"label-ink mb-3\">Solid</p>\n    <div className=\"flex flex-wrap gap-2\">\n      <button type=\"button\" className=\"btn ripple\">Default</button>\n      <button type=\"button\" className=\"btn ripple btn-neutral\">Neutral</button>\n      <button type=\"button\" className=\"btn ripple btn-primary\">Primary</button>\n      <button type=\"button\" className=\"btn ripple btn-secondary\">Secondary</button>\n      <button type=\"button\" className=\"btn ripple btn-accent\">Accent</button>\n      <button type=\"button\" className=\"btn ripple btn-info\">Info</button>\n      <button type=\"button\" className=\"btn ripple btn-success\">Success</button>\n      <button type=\"button\" className=\"btn ripple btn-warning\">Warning</button>\n      <button type=\"button\" className=\"btn ripple btn-error\">Error</button>\n    </div>\n  </div>\n  <div>\n    <p className=\"label-ink mb-3\">Outline</p>\n    <div className=\"flex flex-wrap gap-2\">\n      <button type=\"button\" className=\"btn ripple btn-outline\">Default</button>\n      <button type=\"button\" className=\"btn ripple btn-outline btn-neutral\">Neutral</button>\n      <button type=\"button\" className=\"btn ripple btn-outline btn-primary\">Primary</button>\n      <button type=\"button\" className=\"btn ripple btn-outline btn-secondary\">Secondary</button>\n      <button type=\"button\" className=\"btn ripple btn-outline btn-accent\">Accent</button>\n      <button type=\"button\" className=\"btn ripple btn-outline btn-info\">Info</button>\n      <button type=\"button\" className=\"btn ripple btn-outline btn-success\">Success</button>\n      <button type=\"button\" className=\"btn ripple btn-outline btn-warning\">Warning</button>\n      <button type=\"button\" className=\"btn ripple btn-outline btn-error\">Error</button>\n    </div>\n  </div>\n  <div>\n    <p className=\"label-ink mb-3\">Dash</p>\n    <div className=\"flex flex-wrap gap-2\">\n      <button type=\"button\" className=\"btn ripple btn-dash\">Default</button>\n      <button type=\"button\" className=\"btn ripple btn-dash btn-neutral\">Neutral</button>\n      <button type=\"button\" className=\"btn ripple btn-dash btn-primary\">Primary</button>\n      <button type=\"button\" className=\"btn ripple btn-dash btn-secondary\">Secondary</button>\n      <button type=\"button\" className=\"btn ripple btn-dash btn-accent\">Accent</button>\n      <button type=\"button\" className=\"btn ripple btn-dash btn-info\">Info</button>\n      <button type=\"button\" className=\"btn ripple btn-dash btn-success\">Success</button>\n      <button type=\"button\" className=\"btn ripple btn-dash btn-warning\">Warning</button>\n      <button type=\"button\" className=\"btn ripple btn-dash btn-error\">Error</button>\n    </div>\n  </div>\n  <div>\n    <p className=\"label-ink mb-3\">Soft</p>\n    <div className=\"flex flex-wrap gap-2\">\n      <button type=\"button\" className=\"btn ripple btn-soft\">Default</button>\n      <button type=\"button\" className=\"btn ripple btn-soft btn-neutral\">Neutral</button>\n      <button type=\"button\" className=\"btn ripple btn-soft btn-primary\">Primary</button>\n      <button type=\"button\" className=\"btn ripple btn-soft btn-secondary\">Secondary</button>\n      <button type=\"button\" className=\"btn ripple btn-soft btn-accent\">Accent</button>\n      <button type=\"button\" className=\"btn ripple btn-soft btn-info\">Info</button>\n      <button type=\"button\" className=\"btn ripple btn-soft btn-success\">Success</button>\n      <button type=\"button\" className=\"btn ripple btn-soft btn-warning\">Warning</button>\n      <button type=\"button\" className=\"btn ripple btn-soft btn-error\">Error</button>\n    </div>\n  </div>\n  <div>\n    <p className=\"label-ink mb-3\">Ghost</p>\n    <div className=\"flex flex-wrap gap-2\">\n      <button type=\"button\" className=\"btn ripple btn-ghost\">Default</button>\n      <button type=\"button\" className=\"btn ripple btn-ghost btn-neutral\">Neutral</button>\n      <button type=\"button\" className=\"btn ripple btn-ghost btn-primary\">Primary</button>\n      <button type=\"button\" className=\"btn ripple btn-ghost btn-secondary\">Secondary</button>\n      <button type=\"button\" className=\"btn ripple btn-ghost btn-accent\">Accent</button>\n      <button type=\"button\" className=\"btn ripple btn-ghost btn-info\">Info</button>\n      <button type=\"button\" className=\"btn ripple btn-ghost btn-success\">Success</button>\n      <button type=\"button\" className=\"btn ripple btn-ghost btn-warning\">Warning</button>\n      <button type=\"button\" className=\"btn ripple btn-ghost btn-error\">Error</button>\n    </div>\n  </div>\n  <div>\n    <p className=\"label-ink mb-3\">Link</p>\n    <div className=\"flex flex-wrap gap-2\">\n      <button type=\"button\" className=\"btn ripple btn-link\">Default</button>\n      <button type=\"button\" className=\"btn ripple btn-link btn-neutral\">Neutral</button>\n      <button type=\"button\" className=\"btn ripple btn-link btn-primary\">Primary</button>\n      <button type=\"button\" className=\"btn ripple btn-link btn-secondary\">Secondary</button>\n      <button type=\"button\" className=\"btn ripple btn-link btn-accent\">Accent</button>\n      <button type=\"button\" className=\"btn ripple btn-link btn-info\">Info</button>\n      <button type=\"button\" className=\"btn ripple btn-link btn-success\">Success</button>\n      <button type=\"button\" className=\"btn ripple btn-link btn-warning\">Warning</button>\n      <button type=\"button\" className=\"btn ripple btn-link btn-error\">Error</button>\n    </div>\n  </div>\n</div>"

const sizeScaleHtml = "<div class=\"flex flex-wrap items-end gap-4\">\n  <button type=\"button\" class=\"btn ripple btn-primary btn-xs\">XS</button>\n  <button type=\"button\" class=\"btn ripple btn-primary btn-sm\">SM</button>\n  <button type=\"button\" class=\"btn ripple btn-primary btn-md\">MD</button>\n  <button type=\"button\" class=\"btn ripple btn-primary btn-lg\">LG</button>\n  <button type=\"button\" class=\"btn ripple btn-primary btn-xl\">XL</button>\n</div>"

const sizeScaleJsx = "<div className=\"flex flex-wrap items-end gap-4\">\n  <button type=\"button\" className=\"btn ripple btn-primary btn-xs\">XS</button>\n  <button type=\"button\" className=\"btn ripple btn-primary btn-sm\">SM</button>\n  <button type=\"button\" className=\"btn ripple btn-primary btn-md\">MD</button>\n  <button type=\"button\" className=\"btn ripple btn-primary btn-lg\">LG</button>\n  <button type=\"button\" className=\"btn ripple btn-primary btn-xl\">XL</button>\n</div>"

const modifiersHtml = "<div class=\"space-y-6\">\n  <div>\n    <p class=\"label-ink mb-3\">Wide</p>\n    <button type=\"button\" class=\"btn ripple btn-wide btn-primary\">Wide action</button>\n  </div>\n  <div>\n    <p class=\"label-ink mb-3\">Block</p>\n    <button type=\"button\" class=\"btn ripple btn-block btn-neutral\">Full-width block</button>\n  </div>\n  <div>\n    <p class=\"label-ink mb-3\">Square</p>\n    <div class=\"flex flex-wrap gap-3\">\n      <div class=\"tooltip\" data-tip=\"Default\">\n        <button type=\"button\" class=\"btn ripple btn-square\" aria-label=\"Default\">\n          <svg class=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" aria-hidden=\"true\"><path d=\"M5 12h14\"/><path d=\"M12 5v14\"/></svg>\n        </button>\n      </div>\n      <div class=\"tooltip tooltip-neutral\" data-tip=\"Neutral\">\n        <button type=\"button\" class=\"btn ripple btn-square btn-neutral\" aria-label=\"Neutral\">\n          <svg class=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" aria-hidden=\"true\"><path d=\"M5 12h14\"/><path d=\"M12 5v14\"/></svg>\n        </button>\n      </div>\n      <div class=\"tooltip tooltip-primary\" data-tip=\"Primary\">\n        <button type=\"button\" class=\"btn ripple btn-square btn-primary\" aria-label=\"Primary\">\n          <svg class=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" aria-hidden=\"true\"><path d=\"M5 12h14\"/><path d=\"M12 5v14\"/></svg>\n        </button>\n      </div>\n      <div class=\"tooltip tooltip-secondary\" data-tip=\"Secondary\">\n        <button type=\"button\" class=\"btn ripple btn-square btn-secondary\" aria-label=\"Secondary\">\n          <svg class=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" aria-hidden=\"true\"><path d=\"M5 12h14\"/><path d=\"M12 5v14\"/></svg>\n        </button>\n      </div>\n      <div class=\"tooltip tooltip-accent\" data-tip=\"Accent\">\n        <button type=\"button\" class=\"btn ripple btn-square btn-accent\" aria-label=\"Accent\">\n          <svg class=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" aria-hidden=\"true\"><path d=\"M5 12h14\"/><path d=\"M12 5v14\"/></svg>\n        </button>\n      </div>\n    </div>\n  </div>\n  <div>\n    <p class=\"label-ink mb-3\">Circle</p>\n    <div class=\"flex flex-wrap gap-3\">\n      <div class=\"tooltip\" data-tip=\"Default\">\n        <button type=\"button\" class=\"btn ripple btn-circle\" aria-label=\"Default\">\n          <svg class=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" aria-hidden=\"true\"><path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\"/></svg>\n        </button>\n      </div>\n      <div class=\"tooltip tooltip-neutral\" data-tip=\"Neutral\">\n        <button type=\"button\" class=\"btn ripple btn-circle btn-neutral\" aria-label=\"Neutral\">\n          <svg class=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" aria-hidden=\"true\"><path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\"/></svg>\n        </button>\n      </div>\n      <div class=\"tooltip tooltip-primary\" data-tip=\"Primary\">\n        <button type=\"button\" class=\"btn ripple btn-circle btn-primary\" aria-label=\"Primary\">\n          <svg class=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" aria-hidden=\"true\"><path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\"/></svg>\n        </button>\n      </div>\n      <div class=\"tooltip tooltip-secondary\" data-tip=\"Secondary\">\n        <button type=\"button\" class=\"btn ripple btn-circle btn-secondary\" aria-label=\"Secondary\">\n          <svg class=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" aria-hidden=\"true\"><path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\"/></svg>\n        </button>\n      </div>\n      <div class=\"tooltip tooltip-accent\" data-tip=\"Accent\">\n        <button type=\"button\" class=\"btn ripple btn-circle btn-accent\" aria-label=\"Accent\">\n          <svg class=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" aria-hidden=\"true\"><path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\"/></svg>\n        </button>\n      </div>\n    </div>\n  </div>\n</div>"

const modifiersJsx = "<div className=\"space-y-6\">\n  <div>\n    <p className=\"label-ink mb-3\">Wide</p>\n    <button type=\"button\" className=\"btn ripple btn-wide btn-primary\">Wide action</button>\n  </div>\n  <div>\n    <p className=\"label-ink mb-3\">Block</p>\n    <button type=\"button\" className=\"btn ripple btn-block btn-neutral\">Full-width block</button>\n  </div>\n  <div>\n    <p className=\"label-ink mb-3\">Square</p>\n    <div className=\"flex flex-wrap gap-3\">\n      <div className=\"tooltip\" data-tip=\"Default\">\n        <button type=\"button\" className=\"btn ripple btn-square\" aria-label=\"Default\">\n          <svg className=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.75\" aria-hidden=\"true\"><path d=\"M5 12h14\"/><path d=\"M12 5v14\"/></svg>\n        </button>\n      </div>\n      <div className=\"tooltip tooltip-neutral\" data-tip=\"Neutral\">\n        <button type=\"button\" className=\"btn ripple btn-square btn-neutral\" aria-label=\"Neutral\">\n          <svg className=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.75\" aria-hidden=\"true\"><path d=\"M5 12h14\"/><path d=\"M12 5v14\"/></svg>\n        </button>\n      </div>\n      <div className=\"tooltip tooltip-primary\" data-tip=\"Primary\">\n        <button type=\"button\" className=\"btn ripple btn-square btn-primary\" aria-label=\"Primary\">\n          <svg className=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.75\" aria-hidden=\"true\"><path d=\"M5 12h14\"/><path d=\"M12 5v14\"/></svg>\n        </button>\n      </div>\n      <div className=\"tooltip tooltip-secondary\" data-tip=\"Secondary\">\n        <button type=\"button\" className=\"btn ripple btn-square btn-secondary\" aria-label=\"Secondary\">\n          <svg className=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.75\" aria-hidden=\"true\"><path d=\"M5 12h14\"/><path d=\"M12 5v14\"/></svg>\n        </button>\n      </div>\n      <div className=\"tooltip tooltip-accent\" data-tip=\"Accent\">\n        <button type=\"button\" className=\"btn ripple btn-square btn-accent\" aria-label=\"Accent\">\n          <svg className=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.75\" aria-hidden=\"true\"><path d=\"M5 12h14\"/><path d=\"M12 5v14\"/></svg>\n        </button>\n      </div>\n    </div>\n  </div>\n  <div>\n    <p className=\"label-ink mb-3\">Circle</p>\n    <div className=\"flex flex-wrap gap-3\">\n      <div className=\"tooltip\" data-tip=\"Default\">\n        <button type=\"button\" className=\"btn ripple btn-circle\" aria-label=\"Default\">\n          <svg className=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.75\" aria-hidden=\"true\"><path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\"/></svg>\n        </button>\n      </div>\n      <div className=\"tooltip tooltip-neutral\" data-tip=\"Neutral\">\n        <button type=\"button\" className=\"btn ripple btn-circle btn-neutral\" aria-label=\"Neutral\">\n          <svg className=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.75\" aria-hidden=\"true\"><path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\"/></svg>\n        </button>\n      </div>\n      <div className=\"tooltip tooltip-primary\" data-tip=\"Primary\">\n        <button type=\"button\" className=\"btn ripple btn-circle btn-primary\" aria-label=\"Primary\">\n          <svg className=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.75\" aria-hidden=\"true\"><path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\"/></svg>\n        </button>\n      </div>\n      <div className=\"tooltip tooltip-secondary\" data-tip=\"Secondary\">\n        <button type=\"button\" className=\"btn ripple btn-circle btn-secondary\" aria-label=\"Secondary\">\n          <svg className=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.75\" aria-hidden=\"true\"><path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\"/></svg>\n        </button>\n      </div>\n      <div className=\"tooltip tooltip-accent\" data-tip=\"Accent\">\n        <button type=\"button\" className=\"btn ripple btn-circle btn-accent\" aria-label=\"Accent\">\n          <svg className=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.75\" aria-hidden=\"true\"><path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\"/></svg>\n        </button>\n      </div>\n    </div>\n  </div>\n</div>"

const behaviorHtml = "<div class=\"flex flex-wrap gap-3\">\n  <button type=\"button\" class=\"btn ripple\">Idle</button>\n  <button type=\"button\" class=\"btn ripple btn-active\">Active</button>\n  <button type=\"button\" class=\"btn ripple btn-primary btn-active\">Primary active</button>\n  <button type=\"button\" class=\"btn\" disabled>Disabled attr</button>\n  <button type=\"button\" class=\"btn btn-disabled\" tabindex=\"-1\" aria-disabled=\"true\">Disabled class</button>\n</div>"

const behaviorJsx = "<div className=\"flex flex-wrap gap-3\">\n  <button type=\"button\" className=\"btn ripple\">Idle</button>\n  <button type=\"button\" className=\"btn ripple btn-active\">Active</button>\n  <button type=\"button\" className=\"btn ripple btn-primary btn-active\">Primary active</button>\n  <button type=\"button\" className=\"btn\" disabled>Disabled attr</button>\n  <button type=\"button\" className=\"btn btn-disabled\" tabIndex={-1} aria-disabled=\"true\">Disabled class</button>\n</div>"

const iconButtonsHtml = "<div class=\"flex flex-wrap gap-3\">\n  <button type=\"button\" class=\"btn ripple btn-primary\">\n    <svg class=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" aria-hidden=\"true\"><path d=\"M5 12h14\"/><path d=\"M12 5v14\"/></svg>\n    New wash\n  </button>\n  <button type=\"button\" class=\"btn ripple btn-outline\">\n    <svg class=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" aria-hidden=\"true\"><path d=\"M12 15V3\"/><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><path d=\"m7 10 5 5 5-5\"/></svg>\n    Export\n  </button>\n  <button type=\"button\" class=\"btn ripple btn-soft btn-error\">\n    <svg class=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" aria-hidden=\"true\"><path d=\"M3 6h18\"/><path d=\"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6\"/><path d=\"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2\"/></svg>\n    Delete\n  </button>\n  <button type=\"button\" class=\"btn ripple btn-ghost\">\n    Settings\n    <svg class=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" aria-hidden=\"true\"><path d=\"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg>\n  </button>\n  <button type=\"button\" class=\"btn ripple btn-link btn-primary\">\n    Continue\n    <svg class=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" aria-hidden=\"true\"><path d=\"M5 12h14\"/><path d=\"m12 5 7 7-7 7\"/></svg>\n  </button>\n</div>"

const iconButtonsJsx = "<div className=\"flex flex-wrap gap-3\">\n  <button type=\"button\" className=\"btn ripple btn-primary\">\n    <svg className=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.75\" aria-hidden=\"true\"><path d=\"M5 12h14\"/><path d=\"M12 5v14\"/></svg>\n    New wash\n  </button>\n  <button type=\"button\" className=\"btn ripple btn-outline\">\n    <svg className=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.75\" aria-hidden=\"true\"><path d=\"M12 15V3\"/><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><path d=\"m7 10 5 5 5-5\"/></svg>\n    Export\n  </button>\n  <button type=\"button\" className=\"btn ripple btn-soft btn-error\">\n    <svg className=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.75\" aria-hidden=\"true\"><path d=\"M3 6h18\"/><path d=\"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6\"/><path d=\"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2\"/></svg>\n    Delete\n  </button>\n  <button type=\"button\" className=\"btn ripple btn-ghost\">\n    Settings\n    <svg className=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.75\" aria-hidden=\"true\"><path d=\"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg>\n  </button>\n  <button type=\"button\" className=\"btn ripple btn-link btn-primary\">\n    Continue\n    <svg className=\"size-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"1.75\" aria-hidden=\"true\"><path d=\"M5 12h14\"/><path d=\"m12 5 7 7-7 7\"/></svg>\n  </button>\n</div>"

const elementTypesHtml = "<div class=\"flex flex-wrap gap-3\">\n  <button type=\"button\" class=\"btn ripple btn-primary\">&lt;button&gt;</button>\n  <a href=\"#buttons\" class=\"btn ripple btn-outline btn-primary\">&lt;a class=\"btn\"&gt;</a>\n  <input type=\"button\" value=\"&lt;input type=button&gt;\" class=\"btn ripple\" />\n  <input type=\"submit\" value=\"&lt;input type=submit&gt;\" class=\"btn ripple btn-neutral\" />\n  <input type=\"reset\" value=\"&lt;input type=reset&gt;\" class=\"btn ripple btn-ghost\" />\n</div>"

const elementTypesJsx = "<div className=\"flex flex-wrap gap-3\">\n  <button type=\"button\" className=\"btn ripple btn-primary\">&lt;button&gt;</button>\n  <a href=\"#buttons\" className=\"btn ripple btn-outline btn-primary\">&lt;a className=\"btn\"&gt;</a>\n  <input type=\"button\" value=\"<input type=button>\" className=\"btn ripple\" />\n  <input type=\"submit\" value=\"<input type=submit>\" className=\"btn ripple btn-neutral\" />\n  <input type=\"reset\" value=\"<input type=reset>\" className=\"btn ripple btn-ghost\" />\n</div>"

const joinGroupHtml = "<div class=\"join\">\n  <button type=\"button\" class=\"btn ripple join-item\">Left</button>\n  <button type=\"button\" class=\"btn ripple join-item btn-active\">Center</button>\n  <button type=\"button\" class=\"btn ripple join-item\">Right</button>\n</div>"

const joinGroupJsx = "<div className=\"join\">\n  <button type=\"button\" className=\"btn ripple join-item\">Left</button>\n  <button type=\"button\" className=\"btn ripple join-item btn-active\">Center</button>\n  <button type=\"button\" className=\"btn ripple join-item\">Right</button>\n</div>"

const joinOutlineHtml = "<div class=\"join\">\n  <button type=\"button\" class=\"btn ripple btn-outline join-item\">Day</button>\n  <button type=\"button\" class=\"btn ripple btn-outline join-item btn-active\">Week</button>\n  <button type=\"button\" class=\"btn ripple btn-outline join-item\">Month</button>\n</div>"

const joinOutlineJsx = "<div className=\"join\">\n  <button type=\"button\" className=\"btn ripple btn-outline join-item\">Day</button>\n  <button type=\"button\" className=\"btn ripple btn-outline join-item btn-active\">Week</button>\n  <button type=\"button\" className=\"btn ripple btn-outline join-item\">Month</button>\n</div>"

const joinSearchHtml = "<div class=\"join\">\n  <label class=\"input join-item cursor-text\">\n    <svg class=\"size-4 shrink-0 opacity-50\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n    <input type=\"search\" placeholder=\"Filter plates…\" class=\"grow cursor-text\" />\n  </label>\n  <button type=\"button\" class=\"btn ripple btn-primary join-item cursor-pointer\">Search</button>\n</div>"

const joinSearchJsx = "<div className=\"join\">\n  <label className=\"input join-item cursor-text\">\n    <svg className=\"size-4 shrink-0 opacity-50\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n    <input type=\"search\" placeholder=\"Filter plates…\" className=\"grow cursor-text\" />\n  </label>\n  <button type=\"button\" className=\"btn ripple btn-primary join-item cursor-pointer\">Search</button>\n</div>"

const sizeStyleMatrixHtml = "<div class=\"space-y-4\">\n  <div class=\"flex flex-wrap items-center gap-2\">\n    <span class=\"label-ink w-8\">XS</span>\n    <button type=\"button\" class=\"btn ripple btn-primary btn-xs\">Solid</button>\n    <button type=\"button\" class=\"btn ripple btn-outline btn-primary btn-xs\">Outline</button>\n    <button type=\"button\" class=\"btn ripple btn-soft btn-primary btn-xs\">Soft</button>\n    <button type=\"button\" class=\"btn ripple btn-ghost btn-primary btn-xs\">Ghost</button>\n    <button type=\"button\" class=\"btn ripple btn-dash btn-primary btn-xs\">Dash</button>\n  </div>\n  <div class=\"flex flex-wrap items-center gap-2\">\n    <span class=\"label-ink w-8\">SM</span>\n    <button type=\"button\" class=\"btn ripple btn-primary btn-sm\">Solid</button>\n    <button type=\"button\" class=\"btn ripple btn-outline btn-primary btn-sm\">Outline</button>\n    <button type=\"button\" class=\"btn ripple btn-soft btn-primary btn-sm\">Soft</button>\n    <button type=\"button\" class=\"btn ripple btn-ghost btn-primary btn-sm\">Ghost</button>\n    <button type=\"button\" class=\"btn ripple btn-dash btn-primary btn-sm\">Dash</button>\n  </div>\n  <div class=\"flex flex-wrap items-center gap-2\">\n    <span class=\"label-ink w-8\">MD</span>\n    <button type=\"button\" class=\"btn ripple btn-primary btn-md\">Solid</button>\n    <button type=\"button\" class=\"btn ripple btn-outline btn-primary btn-md\">Outline</button>\n    <button type=\"button\" class=\"btn ripple btn-soft btn-primary btn-md\">Soft</button>\n    <button type=\"button\" class=\"btn ripple btn-ghost btn-primary btn-md\">Ghost</button>\n    <button type=\"button\" class=\"btn ripple btn-dash btn-primary btn-md\">Dash</button>\n  </div>\n  <div class=\"flex flex-wrap items-center gap-2\">\n    <span class=\"label-ink w-8\">LG</span>\n    <button type=\"button\" class=\"btn ripple btn-primary btn-lg\">Solid</button>\n    <button type=\"button\" class=\"btn ripple btn-outline btn-primary btn-lg\">Outline</button>\n    <button type=\"button\" class=\"btn ripple btn-soft btn-primary btn-lg\">Soft</button>\n    <button type=\"button\" class=\"btn ripple btn-ghost btn-primary btn-lg\">Ghost</button>\n    <button type=\"button\" class=\"btn ripple btn-dash btn-primary btn-lg\">Dash</button>\n  </div>\n  <div class=\"flex flex-wrap items-center gap-2\">\n    <span class=\"label-ink w-8\">XL</span>\n    <button type=\"button\" class=\"btn ripple btn-primary btn-xl\">Solid</button>\n    <button type=\"button\" class=\"btn ripple btn-outline btn-primary btn-xl\">Outline</button>\n    <button type=\"button\" class=\"btn ripple btn-soft btn-primary btn-xl\">Soft</button>\n    <button type=\"button\" class=\"btn ripple btn-ghost btn-primary btn-xl\">Ghost</button>\n    <button type=\"button\" class=\"btn ripple btn-dash btn-primary btn-xl\">Dash</button>\n  </div>\n</div>"

const sizeStyleMatrixJsx = "<div className=\"space-y-4\">\n  <div className=\"flex flex-wrap items-center gap-2\">\n    <span className=\"label-ink w-8\">XS</span>\n    <button type=\"button\" className=\"btn ripple btn-primary btn-xs\">Solid</button>\n    <button type=\"button\" className=\"btn ripple btn-outline btn-primary btn-xs\">Outline</button>\n    <button type=\"button\" className=\"btn ripple btn-soft btn-primary btn-xs\">Soft</button>\n    <button type=\"button\" className=\"btn ripple btn-ghost btn-primary btn-xs\">Ghost</button>\n    <button type=\"button\" className=\"btn ripple btn-dash btn-primary btn-xs\">Dash</button>\n  </div>\n  <div className=\"flex flex-wrap items-center gap-2\">\n    <span className=\"label-ink w-8\">SM</span>\n    <button type=\"button\" className=\"btn ripple btn-primary btn-sm\">Solid</button>\n    <button type=\"button\" className=\"btn ripple btn-outline btn-primary btn-sm\">Outline</button>\n    <button type=\"button\" className=\"btn ripple btn-soft btn-primary btn-sm\">Soft</button>\n    <button type=\"button\" className=\"btn ripple btn-ghost btn-primary btn-sm\">Ghost</button>\n    <button type=\"button\" className=\"btn ripple btn-dash btn-primary btn-sm\">Dash</button>\n  </div>\n  <div className=\"flex flex-wrap items-center gap-2\">\n    <span className=\"label-ink w-8\">MD</span>\n    <button type=\"button\" className=\"btn ripple btn-primary btn-md\">Solid</button>\n    <button type=\"button\" className=\"btn ripple btn-outline btn-primary btn-md\">Outline</button>\n    <button type=\"button\" className=\"btn ripple btn-soft btn-primary btn-md\">Soft</button>\n    <button type=\"button\" className=\"btn ripple btn-ghost btn-primary btn-md\">Ghost</button>\n    <button type=\"button\" className=\"btn ripple btn-dash btn-primary btn-md\">Dash</button>\n  </div>\n  <div className=\"flex flex-wrap items-center gap-2\">\n    <span className=\"label-ink w-8\">LG</span>\n    <button type=\"button\" className=\"btn ripple btn-primary btn-lg\">Solid</button>\n    <button type=\"button\" className=\"btn ripple btn-outline btn-primary btn-lg\">Outline</button>\n    <button type=\"button\" className=\"btn ripple btn-soft btn-primary btn-lg\">Soft</button>\n    <button type=\"button\" className=\"btn ripple btn-ghost btn-primary btn-lg\">Ghost</button>\n    <button type=\"button\" className=\"btn ripple btn-dash btn-primary btn-lg\">Dash</button>\n  </div>\n  <div className=\"flex flex-wrap items-center gap-2\">\n    <span className=\"label-ink w-8\">XL</span>\n    <button type=\"button\" className=\"btn ripple btn-primary btn-xl\">Solid</button>\n    <button type=\"button\" className=\"btn ripple btn-outline btn-primary btn-xl\">Outline</button>\n    <button type=\"button\" className=\"btn ripple btn-soft btn-primary btn-xl\">Soft</button>\n    <button type=\"button\" className=\"btn ripple btn-ghost btn-primary btn-xl\">Ghost</button>\n    <button type=\"button\" className=\"btn ripple btn-dash btn-primary btn-xl\">Dash</button>\n  </div>\n</div>"

function ClassLabel({ value }: { value: string }) {
  return (
    <code className="font-mono text-[0.65rem] text-ink-muted">
      {value || 'btn'}
    </code>
  )
}

/** daisyUI btn + wash ripple opt-in (global attach in main.tsx). */
function btnCx(...parts: Array<string | false | null | undefined>) {
  return ['btn', 'ripple', ...parts.filter(Boolean)].join(' ')
}

export default function ButtonsPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Buttons
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Every daisyUI <span className="font-mono text-xs">btn</span> color,
          style, size, modifier, and state.
        </p>
      </div>

      <div className="space-y-6">
        <GallerySection
          eyebrow="01 · Colors"
          title="Semantic colors"
          description="Default ink plus neutral, brand, and status colors"
        >
          <ShowcaseTabs
            preview={
              <div className="flex flex-wrap items-end gap-4">
                {colors.map((c) => (
                  <button key={c.name} type="button" className={btnCx(c.className)}>
                    {c.name}
                  </button>
                ))}
              </div>
            }
            html={semanticColorsHtml}
            jsx={semanticColorsJsx}
          />
        </GallerySection>

        <GallerySection
          eyebrow="02 · Styles"
          title="Style variants"
          description="Solid, outline, dash, soft, ghost, and link: each with every color"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="space-y-6">
                {styles.map((style) => (
                  <div key={style.name}>
                    <div className="mb-3 flex items-baseline justify-between gap-2">
                      <p className="label-ink">{style.name}</p>
                      <ClassLabel
                        value={
                          style.className ? `btn ${style.className}` : 'btn (solid)'
                        }
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((c) => (
                        <button
                          key={`${style.name}-${c.name}`}
                          type="button"
                          className={btnCx(style.className, c.className)}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            }
            html={styleVariantsHtml}
            jsx={styleVariantsJsx}
          />
        </GallerySection>

        <GallerySection
          eyebrow="03 · Sizes"
          title="Size scale"
          description="From compact controls to XL actions"
        >
          <ShowcaseTabs
            preview={
              <div className="flex flex-wrap items-end gap-4">
                {sizes.map((s) => (
                  <div key={s.name} className="flex flex-col items-center gap-2">
                    <button type="button" className={btnCx('btn-primary', s.className)}>
                      {s.name}
                    </button>
                    <ClassLabel value={`btn ${s.className}`} />
                  </div>
                ))}
              </div>
            }
            html={sizeScaleHtml}
            jsx={sizeScaleJsx}
          />
        </GallerySection>

        <GallerySection
          eyebrow="04 · Modifiers"
          title="Width & shape"
          description="Wide, block, square, and circle modifiers"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <div className="space-y-6">
                <div>
                  <p className="label-ink mb-3">Wide</p>
                  <button type="button" className={btnCx('btn-wide', 'btn-primary')}>
                    Wide action
                  </button>
                  <p className="mt-2">
                    <ClassLabel value="btn btn-wide btn-primary" />
                  </p>
                </div>

                <div>
                  <p className="label-ink mb-3">Block</p>
                  <button type="button" className={btnCx('btn-block', 'btn-neutral')}>
                    Full-width block
                  </button>
                  <p className="mt-2">
                    <ClassLabel value="btn btn-block btn-neutral" />
                  </p>
                </div>

                <div>
                  <p className="label-ink mb-3">Square</p>
                  <div className="flex flex-wrap gap-3">
                    {colors.slice(0, 5).map((c) => (
                      <div
                        key={`sq-${c.name}`}
                        className={`tooltip ${tooltipColor[c.className] ?? ''}`}
                        data-tip={c.name}
                      >
                        <button
                          type="button"
                          className={btnCx('btn-square', c.className)}
                          aria-label={c.name}
                        >
                          <Plus className="size-4" strokeWidth={1.75} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2">
                    <ClassLabel value="btn btn-square" />
                  </p>
                </div>

                <div>
                  <p className="label-ink mb-3">Circle</p>
                  <div className="flex flex-wrap gap-3">
                    {colors.slice(0, 5).map((c) => (
                      <div
                        key={`cir-${c.name}`}
                        className={`tooltip ${tooltipColor[c.className] ?? ''}`}
                        data-tip={c.name}
                      >
                        <button
                          type="button"
                          className={btnCx('btn-circle', c.className)}
                          aria-label={c.name}
                        >
                          <Heart className="size-4" strokeWidth={1.75} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2">
                    <ClassLabel value="btn btn-circle" />
                  </p>
                </div>
              </div>
            }
            html={modifiersHtml}
            jsx={modifiersJsx}
          />
        </GallerySection>

        <GallerySection
          eyebrow="05 · Behavior"
          title="Active & disabled"
          description="Pressed state and disabled controls"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap gap-3">
                  <button type="button" className={btnCx()}>
                    Idle
                  </button>
                  <button type="button" className={btnCx('btn-active')}>
                    Active
                  </button>
                  <button type="button" className={btnCx('btn-primary', 'btn-active')}>
                    Primary active
                  </button>
                  <button type="button" className="btn" disabled>
                    Disabled attr
                  </button>
                  <button
                    type="button"
                    className="btn btn-disabled"
                    tabIndex={-1}
                    role="button"
                    aria-disabled="true"
                  >
                    Disabled class
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-4">
                  <ClassLabel value="btn btn-active" />
                  <ClassLabel value="btn btn-disabled" />
                </div>
              </>
            }
            html={behaviorHtml}
            jsx={behaviorJsx}
          />
        </GallerySection>

        <GallerySection
          eyebrow="06 · With icons"
          title="Icon + label"
          description="Leading and trailing Lucide marks"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="flex flex-wrap gap-3">
                <button type="button" className={btnCx('btn-primary')}>
                  <Plus className="size-4" strokeWidth={1.75} />
                  New wash
                </button>
                <button type="button" className={btnCx('btn-outline')}>
                  <Download className="size-4" strokeWidth={1.75} />
                  Export
                </button>
                <button type="button" className={btnCx('btn-soft', 'btn-error')}>
                  <Trash2 className="size-4" strokeWidth={1.75} />
                  Delete
                </button>
                <button type="button" className={btnCx('btn-ghost')}>
                  Settings
                  <Settings className="size-4" strokeWidth={1.75} />
                </button>
                <button type="button" className={btnCx('btn-link', 'btn-primary')}>
                  Continue
                  <ArrowRight className="size-4" strokeWidth={1.75} />
                </button>
              </div>
            }
            html={iconButtonsHtml}
            jsx={iconButtonsJsx}
          />
        </GallerySection>

        <GallerySection
          eyebrow="07 · Element types"
          title="Button, link, and input"
          description="Same btn classes on different HTML elements"
        >
          <ShowcaseTabs
            preview={
              <div className="flex flex-wrap items-center gap-3">
                <button type="button" className={btnCx('btn-primary')}>
                  &lt;button&gt;
                </button>
                <a href="#buttons" className={btnCx('btn-outline', 'btn-primary')}>
                  &lt;a class=&quot;btn&quot;&gt;
                </a>
                <input type="button" value="<input type=button>" className={btnCx()} />
                <input
                  type="submit"
                  value="<input type=submit>"
                  className={btnCx('btn-neutral')}
                />
                <input type="reset" value="<input type=reset>" className={btnCx('btn-ghost')} />
              </div>
            }
            html={elementTypesHtml}
            jsx={elementTypesJsx}
          />
        </GallerySection>

        <GallerySection
          eyebrow="08 · Groups"
          title="Join groups"
          description="Segmented controls with join + join-item"
          panel="wash-panel-rose"
        >
          <div className="space-y-6">
            <ShowcaseTabs
              preview={
                <div className="join">
                  <button type="button" className={btnCx('join-item')}>
                    Left
                  </button>
                  <button type="button" className={btnCx('join-item', 'btn-active')}>
                    Center
                  </button>
                  <button type="button" className={btnCx('join-item')}>
                    Right
                  </button>
                </div>
              }
              html={joinGroupHtml}
              jsx={joinGroupJsx}
            />

            <ShowcaseTabs
              preview={
                <div className="join">
                  <button type="button" className={btnCx('btn-outline', 'join-item')}>
                    Day
                  </button>
                  <button
                    type="button"
                    className={btnCx('btn-outline', 'join-item', 'btn-active')}
                  >
                    Week
                  </button>
                  <button type="button" className={btnCx('btn-outline', 'join-item')}>
                    Month
                  </button>
                </div>
              }
              html={joinOutlineHtml}
              jsx={joinOutlineJsx}
            />

            <ShowcaseTabs
              preview={
                <div className="join">
                  <label className="input join-item cursor-text">
                    <Search className="size-4 shrink-0 opacity-50" strokeWidth={2} />
                    <input
                      type="search"
                      placeholder="Filter plates…"
                      className="grow cursor-text"
                    />
                  </label>
                  <button
                    type="button"
                    className={btnCx('btn-primary', 'join-item', 'cursor-pointer')}
                  >
                    Search
                  </button>
                </div>
              }
              html={joinSearchHtml}
              jsx={joinSearchJsx}
            />
          </div>
        </GallerySection>

        <GallerySection
          eyebrow="09 · Size × style matrix"
          title="Soft primary scale"
          description="One color through every size and a few styles"
        >
          <ShowcaseTabs
            preview={
              <div className="space-y-4">
                {sizes.map((s) => (
                  <div key={s.name} className="flex flex-wrap items-center gap-2">
                    <span className="label-ink w-8">{s.name}</span>
                    <button type="button" className={btnCx('btn-primary', s.className)}>
                      Solid
                    </button>
                    <button
                      type="button"
                      className={btnCx('btn-outline', 'btn-primary', s.className)}
                    >
                      Outline
                    </button>
                    <button
                      type="button"
                      className={btnCx('btn-soft', 'btn-primary', s.className)}
                    >
                      Soft
                    </button>
                    <button
                      type="button"
                      className={btnCx('btn-ghost', 'btn-primary', s.className)}
                    >
                      Ghost
                    </button>
                    <button
                      type="button"
                      className={btnCx('btn-dash', 'btn-primary', s.className)}
                    >
                      Dash
                    </button>
                  </div>
                ))}
              </div>
            }
            html={sizeStyleMatrixHtml}
            jsx={sizeStyleMatrixJsx}
          />
        </GallerySection>
      </div>
    </>
  )
}
