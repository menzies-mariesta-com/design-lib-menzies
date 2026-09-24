import { useState, type CSSProperties, type ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  Clock,
  Droplets,
  Layers,
  Paintbrush,
  Palette,
  Sparkles,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

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
    <code className="font-mono text-[0.65rem] text-ink-muted">{value}</code>
  )
}

function Sample({
  label,
  children,
  className = '',
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

const masonryCards = [
  {
    id: 'cerulean',
    title: 'Cerulean wash',
    body: 'Cool sky field for coastal plates. Keep edges soft.',
    height: 'min-h-28',
    panel: 'wash-panel-blue',
  },
  {
    id: 'sienna',
    title: 'Raw sienna',
    body: 'Warm ground layer. Useful under fog and sand.',
    height: 'min-h-40',
    panel: 'wash-panel-ochre',
  },
  {
    id: 'madder',
    title: 'Rose madder',
    body: 'Quiet accent for dusk edges and bloom notes.',
    height: 'min-h-24',
    panel: 'wash-panel-rose',
  },
  {
    id: 'payne',
    title: 'Payne grey',
    body: 'Ink weight for cliffs and shadow bands without heavy black.',
    height: 'min-h-36',
    panel: '',
  },
  {
    id: 'sap',
    title: 'Sap green',
    body: 'Tide vegetation. Thin, then glaze.',
    height: 'min-h-32',
    panel: '',
  },
  {
    id: 'violet',
    title: 'Cobalt violet',
    body: 'Evening bloom. Pair with cerulean, not ochre.',
    height: 'min-h-44',
    panel: 'wash-panel-rose',
  },
  {
    id: 'fog',
    title: 'Fog plate',
    body: 'Low contrast wash. Hierarchy from type, not pigment.',
    height: 'min-h-28',
    panel: 'wash-panel-blue',
  },
  {
    id: 'critique',
    title: 'Critique note',
    body: 'Hold back chroma on the second pass.',
    height: 'min-h-36',
    panel: 'wash-panel-ochre',
  },
] as const

const bentoHtml = "<div class=\"grid grid-cols-1 gap-3 md:grid-cols-4 md:auto-rows-[7.5rem] md:gap-4\">\n  <div class=\"wash-panel wash-panel-blue paper-grain flex flex-col justify-between md:col-span-2 md:row-span-2\">\n    <div>\n      <p class=\"label-ink\">Hero tile</p>\n      <h3 class=\"font-display mt-1 text-2xl font-semibold\">Menzies Design desk</h3>\n      <p class=\"mt-2 max-w-sm text-sm text-ink-muted\">Planned span for the primary plate: title, status, and one clear action.</p>\n    </div>\n    <div class=\"mt-4 flex flex-wrap items-center gap-2\">\n      <button type=\"button\" class=\"btn btn-primary btn-sm cursor-pointer\">Open series</button>\n    </div>\n  </div>\n  <div class=\"stats cursor-default bg-base-100 shadow-sm md:col-span-2\">\n    <div class=\"stat place-items-start py-3\">\n      <div class=\"stat-figure text-primary\"><svg class=\"size-5\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z\"/></svg></div>\n      <div class=\"stat-title\">Washes</div>\n      <div class=\"stat-value text-2xl\">48</div>\n      <div class=\"stat-desc\">This week</div>\n    </div>\n    <div class=\"stat place-items-start py-3\">\n      <div class=\"stat-figure text-secondary\"><svg class=\"size-5\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><polyline points=\"12 6 12 12 16 14\"/></svg></div>\n      <div class=\"stat-title\">Drying</div>\n      <div class=\"stat-value text-2xl\">6</div>\n      <div class=\"stat-desc\">In tray</div>\n    </div>\n  </div>\n  <div class=\"card card-border bg-base-100 md:col-span-1\">\n    <div class=\"card-body gap-2 p-4\">\n      <svg class=\"size-4 text-base-content/70\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"m14.622 17.897-10.68-2.913\"/><path d=\"M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z\"/><path d=\"M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 9.055a1.662 1.662 0 0 0 2.42.4c.545-.46.97-1.1 1.134-1.917.32-1.592.54-3.137.54-4.409\"/></svg>\n      <h3 class=\"card-title font-display text-base\">Brushes</h3>\n      <p class=\"text-sm text-ink-muted\">12 ready</p>\n    </div>\n  </div>\n  <div class=\"card card-border bg-base-100 md:col-span-1\">\n    <div class=\"card-body gap-2 p-4\">\n      <svg class=\"size-4 text-base-content/70\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z\"/><path d=\"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12\"/><path d=\"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17\"/></svg>\n      <h3 class=\"card-title font-display text-base\">Layers</h3>\n      <p class=\"text-sm text-ink-muted\">Stack of 4</p>\n    </div>\n  </div>\n  <div class=\"card bg-base-100 shadow-sm md:col-span-2\">\n    <div class=\"card-body flex-row items-center gap-4 p-4\">\n      <svg class=\"size-5 shrink-0 text-accent\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z\"/><path d=\"M20 3v4\"/><path d=\"M22 5h-4\"/><path d=\"M4 17v2\"/><path d=\"M5 18H3\"/></svg>\n      <div class=\"min-w-0\">\n        <h3 class=\"font-display text-base font-semibold\">Critique queue</h3>\n        <p class=\"text-sm text-ink-muted\">Three plates waiting. Wide span for a list cue.</p>\n      </div>\n    </div>\n  </div>\n</div>"

const bentoJsx = "<div className=\"grid grid-cols-1 gap-3 md:grid-cols-4 md:auto-rows-[7.5rem] md:gap-4\">\n  <div className=\"wash-panel wash-panel-blue paper-grain flex flex-col justify-between md:col-span-2 md:row-span-2\">\n    <div>\n      <p className=\"label-ink\">Hero tile</p>\n      <h3 className=\"font-display mt-1 text-2xl font-semibold\">Menzies Design desk</h3>\n      <p className=\"mt-2 max-w-sm text-sm text-ink-muted\">Planned span for the primary plate: title, status, and one clear action.</p>\n    </div>\n    <div className=\"mt-4 flex flex-wrap items-center gap-2\">\n      <button type=\"button\" className=\"btn btn-primary btn-sm cursor-pointer\">Open series</button>\n    </div>\n  </div>\n  <div className=\"stats cursor-default bg-base-100 shadow-sm md:col-span-2\">\n    <div className=\"stat place-items-start py-3\">\n      <div className=\"stat-figure text-primary\"><svg className=\"size-5\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><path d=\"M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z\"/></svg></div>\n      <div className=\"stat-title\">Washes</div>\n      <div className=\"stat-value text-2xl\">48</div>\n      <div className=\"stat-desc\">This week</div>\n    </div>\n    <div className=\"stat place-items-start py-3\">\n      <div className=\"stat-figure text-secondary\"><svg className=\"size-5\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><polyline points=\"12 6 12 12 16 14\"/></svg></div>\n      <div className=\"stat-title\">Drying</div>\n      <div className=\"stat-value text-2xl\">6</div>\n      <div className=\"stat-desc\">In tray</div>\n    </div>\n  </div>\n  <div className=\"card card-border bg-base-100 md:col-span-1\">\n    <div className=\"card-body gap-2 p-4\">\n      <svg className=\"size-4 text-base-content/70\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><path d=\"m14.622 17.897-10.68-2.913\"/><path d=\"M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z\"/><path d=\"M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 9.055a1.662 1.662 0 0 0 2.42.4c.545-.46.97-1.1 1.134-1.917.32-1.592.54-3.137.54-4.409\"/></svg>\n      <h3 className=\"card-title font-display text-base\">Brushes</h3>\n      <p className=\"text-sm text-ink-muted\">12 ready</p>\n    </div>\n  </div>\n  <div className=\"card card-border bg-base-100 md:col-span-1\">\n    <div className=\"card-body gap-2 p-4\">\n      <svg className=\"size-4 text-base-content/70\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><path d=\"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z\"/><path d=\"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12\"/><path d=\"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17\"/></svg>\n      <h3 className=\"card-title font-display text-base\">Layers</h3>\n      <p className=\"text-sm text-ink-muted\">Stack of 4</p>\n    </div>\n  </div>\n  <div className=\"card bg-base-100 shadow-sm md:col-span-2\">\n    <div className=\"card-body flex-row items-center gap-4 p-4\">\n      <svg className=\"size-5 shrink-0 text-accent\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><path d=\"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z\"/><path d=\"M20 3v4\"/><path d=\"M22 5h-4\"/><path d=\"M4 17v2\"/><path d=\"M5 18H3\"/></svg>\n      <div className=\"min-w-0\">\n        <h3 className=\"font-display text-base font-semibold\">Critique queue</h3>\n        <p className=\"text-sm text-ink-muted\">Three plates waiting. Wide span for a list cue.</p>\n      </div>\n    </div>\n  </div>\n</div>"

const masonryHtml = "<div class=\"columns-1 gap-4 sm:columns-2 lg:columns-3\">\n  <div class=\"mb-4 break-inside-avoid card card-border bg-base-100 min-h-28\">\n    <div class=\"card-body p-4 wash-panel-blue\">\n      <h3 class=\"card-title font-display text-base\">Cerulean wash</h3>\n      <p class=\"text-sm text-ink-muted\">Cool sky field for coastal plates. Keep edges soft.</p>\n    </div>\n  </div>\n  <div class=\"mb-4 break-inside-avoid card card-border bg-base-100 min-h-40\">\n    <div class=\"card-body p-4 wash-panel-ochre\">\n      <h3 class=\"card-title font-display text-base\">Raw sienna</h3>\n      <p class=\"text-sm text-ink-muted\">Warm ground layer. Useful under fog and sand.</p>\n    </div>\n  </div>\n  <div class=\"mb-4 break-inside-avoid card card-border bg-base-100 min-h-24\">\n    <div class=\"card-body p-4 wash-panel-rose\">\n      <h3 class=\"card-title font-display text-base\">Rose madder</h3>\n      <p class=\"text-sm text-ink-muted\">Quiet accent for dusk edges and bloom notes.</p>\n    </div>\n  </div>\n  <div class=\"mb-4 break-inside-avoid card card-border bg-base-100 min-h-36\">\n    <div class=\"card-body p-4\">\n      <h3 class=\"card-title font-display text-base\">Payne grey</h3>\n      <p class=\"text-sm text-ink-muted\">Ink weight for cliffs and shadow bands without heavy black.</p>\n    </div>\n  </div>\n  <div class=\"mb-4 break-inside-avoid card card-border bg-base-100 min-h-32\">\n    <div class=\"card-body p-4\">\n      <h3 class=\"card-title font-display text-base\">Sap green</h3>\n      <p class=\"text-sm text-ink-muted\">Tide vegetation. Thin, then glaze.</p>\n    </div>\n  </div>\n  <div class=\"mb-4 break-inside-avoid card card-border bg-base-100 min-h-44\">\n    <div class=\"card-body p-4 wash-panel-rose\">\n      <h3 class=\"card-title font-display text-base\">Cobalt violet</h3>\n      <p class=\"text-sm text-ink-muted\">Evening bloom. Pair with cerulean, not ochre.</p>\n    </div>\n  </div>\n  <div class=\"mb-4 break-inside-avoid card card-border bg-base-100 min-h-28\">\n    <div class=\"card-body p-4 wash-panel-blue\">\n      <h3 class=\"card-title font-display text-base\">Fog plate</h3>\n      <p class=\"text-sm text-ink-muted\">Low contrast wash. Hierarchy from type, not pigment.</p>\n    </div>\n  </div>\n  <div class=\"mb-4 break-inside-avoid card card-border bg-base-100 min-h-36\">\n    <div class=\"card-body p-4 wash-panel-ochre\">\n      <h3 class=\"card-title font-display text-base\">Critique note</h3>\n      <p class=\"text-sm text-ink-muted\">Hold back chroma on the second pass.</p>\n    </div>\n  </div>\n</div>"

const masonryJsx = "<div className=\"columns-1 gap-4 sm:columns-2 lg:columns-3\">\n  <div className=\"mb-4 break-inside-avoid card card-border bg-base-100 min-h-28\">\n    <div className=\"card-body p-4 wash-panel-blue\">\n      <h3 className=\"card-title font-display text-base\">Cerulean wash</h3>\n      <p className=\"text-sm text-ink-muted\">Cool sky field for coastal plates. Keep edges soft.</p>\n    </div>\n  </div>\n  <div className=\"mb-4 break-inside-avoid card card-border bg-base-100 min-h-40\">\n    <div className=\"card-body p-4 wash-panel-ochre\">\n      <h3 className=\"card-title font-display text-base\">Raw sienna</h3>\n      <p className=\"text-sm text-ink-muted\">Warm ground layer. Useful under fog and sand.</p>\n    </div>\n  </div>\n  <div className=\"mb-4 break-inside-avoid card card-border bg-base-100 min-h-24\">\n    <div className=\"card-body p-4 wash-panel-rose\">\n      <h3 className=\"card-title font-display text-base\">Rose madder</h3>\n      <p className=\"text-sm text-ink-muted\">Quiet accent for dusk edges and bloom notes.</p>\n    </div>\n  </div>\n  <div className=\"mb-4 break-inside-avoid card card-border bg-base-100 min-h-36\">\n    <div className=\"card-body p-4\">\n      <h3 className=\"card-title font-display text-base\">Payne grey</h3>\n      <p className=\"text-sm text-ink-muted\">Ink weight for cliffs and shadow bands without heavy black.</p>\n    </div>\n  </div>\n  <div className=\"mb-4 break-inside-avoid card card-border bg-base-100 min-h-32\">\n    <div className=\"card-body p-4\">\n      <h3 className=\"card-title font-display text-base\">Sap green</h3>\n      <p className=\"text-sm text-ink-muted\">Tide vegetation. Thin, then glaze.</p>\n    </div>\n  </div>\n  <div className=\"mb-4 break-inside-avoid card card-border bg-base-100 min-h-44\">\n    <div className=\"card-body p-4 wash-panel-rose\">\n      <h3 className=\"card-title font-display text-base\">Cobalt violet</h3>\n      <p className=\"text-sm text-ink-muted\">Evening bloom. Pair with cerulean, not ochre.</p>\n    </div>\n  </div>\n  <div className=\"mb-4 break-inside-avoid card card-border bg-base-100 min-h-28\">\n    <div className=\"card-body p-4 wash-panel-blue\">\n      <h3 className=\"card-title font-display text-base\">Fog plate</h3>\n      <p className=\"text-sm text-ink-muted\">Low contrast wash. Hierarchy from type, not pigment.</p>\n    </div>\n  </div>\n  <div className=\"mb-4 break-inside-avoid card card-border bg-base-100 min-h-36\">\n    <div className=\"card-body p-4 wash-panel-ochre\">\n      <h3 className=\"card-title font-display text-base\">Critique note</h3>\n      <p className=\"text-sm text-ink-muted\">Hold back chroma on the second pass.</p>\n    </div>\n  </div>\n</div>"

const densityHtml = "<div class=\"grid gap-6 lg:grid-cols-3\">\n  <div class=\"columns-2 gap-2\">\n    <div class=\"mb-2 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3\">\n      <p class=\"text-sm font-semibold\">Cerulean wash</p>\n      <p class=\"mt-1 text-xs text-ink-muted\">Tight density</p>\n    </div>\n    <div class=\"mb-2 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3\">\n      <p class=\"text-sm font-semibold\">Raw sienna</p>\n      <p class=\"mt-1 text-xs text-ink-muted\">Tight density</p>\n    </div>\n    <div class=\"mb-2 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3\">\n      <p class=\"text-sm font-semibold\">Rose madder</p>\n      <p class=\"mt-1 text-xs text-ink-muted\">Tight density</p>\n    </div>\n    <div class=\"mb-2 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3\">\n      <p class=\"text-sm font-semibold\">Payne grey</p>\n      <p class=\"mt-1 text-xs text-ink-muted\">Tight density</p>\n    </div>\n  </div>\n  <div class=\"columns-2 gap-4\">\n    <div class=\"mb-4 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3\">\n      <p class=\"text-sm font-semibold\">Cerulean wash</p>\n      <p class=\"mt-1 text-xs text-ink-muted\">Comfort density</p>\n    </div>\n    <div class=\"mb-4 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3\">\n      <p class=\"text-sm font-semibold\">Raw sienna</p>\n      <p class=\"mt-1 text-xs text-ink-muted\">Comfort density</p>\n    </div>\n    <div class=\"mb-4 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3\">\n      <p class=\"text-sm font-semibold\">Rose madder</p>\n      <p class=\"mt-1 text-xs text-ink-muted\">Comfort density</p>\n    </div>\n    <div class=\"mb-4 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3\">\n      <p class=\"text-sm font-semibold\">Payne grey</p>\n      <p class=\"mt-1 text-xs text-ink-muted\">Comfort density</p>\n    </div>\n  </div>\n  <div class=\"columns-2 gap-6\">\n    <div class=\"mb-6 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-4\">\n      <p class=\"text-sm font-semibold\">Cerulean wash</p>\n      <p class=\"mt-1 text-xs text-ink-muted\">Loose density</p>\n    </div>\n    <div class=\"mb-6 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-4\">\n      <p class=\"text-sm font-semibold\">Raw sienna</p>\n      <p class=\"mt-1 text-xs text-ink-muted\">Loose density</p>\n    </div>\n    <div class=\"mb-6 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-4\">\n      <p class=\"text-sm font-semibold\">Rose madder</p>\n      <p class=\"mt-1 text-xs text-ink-muted\">Loose density</p>\n    </div>\n    <div class=\"mb-6 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-4\">\n      <p class=\"text-sm font-semibold\">Payne grey</p>\n      <p class=\"mt-1 text-xs text-ink-muted\">Loose density</p>\n    </div>\n  </div>\n</div>"

const densityJsx = "<div className=\"grid gap-6 lg:grid-cols-3\">\n  <div className=\"columns-2 gap-2\">\n    <div className=\"mb-2 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3\">\n      <p className=\"text-sm font-semibold\">Cerulean wash</p>\n      <p className=\"mt-1 text-xs text-ink-muted\">Tight density</p>\n    </div>\n    <div className=\"mb-2 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3\">\n      <p className=\"text-sm font-semibold\">Raw sienna</p>\n      <p className=\"mt-1 text-xs text-ink-muted\">Tight density</p>\n    </div>\n    <div className=\"mb-2 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3\">\n      <p className=\"text-sm font-semibold\">Rose madder</p>\n      <p className=\"mt-1 text-xs text-ink-muted\">Tight density</p>\n    </div>\n    <div className=\"mb-2 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3\">\n      <p className=\"text-sm font-semibold\">Payne grey</p>\n      <p className=\"mt-1 text-xs text-ink-muted\">Tight density</p>\n    </div>\n  </div>\n  <div className=\"columns-2 gap-4\">\n    <div className=\"mb-4 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3\">\n      <p className=\"text-sm font-semibold\">Cerulean wash</p>\n      <p className=\"mt-1 text-xs text-ink-muted\">Comfort density</p>\n    </div>\n    <div className=\"mb-4 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3\">\n      <p className=\"text-sm font-semibold\">Raw sienna</p>\n      <p className=\"mt-1 text-xs text-ink-muted\">Comfort density</p>\n    </div>\n    <div className=\"mb-4 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3\">\n      <p className=\"text-sm font-semibold\">Rose madder</p>\n      <p className=\"mt-1 text-xs text-ink-muted\">Comfort density</p>\n    </div>\n    <div className=\"mb-4 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3\">\n      <p className=\"text-sm font-semibold\">Payne grey</p>\n      <p className=\"mt-1 text-xs text-ink-muted\">Comfort density</p>\n    </div>\n  </div>\n  <div className=\"columns-2 gap-6\">\n    <div className=\"mb-6 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-4\">\n      <p className=\"text-sm font-semibold\">Cerulean wash</p>\n      <p className=\"mt-1 text-xs text-ink-muted\">Loose density</p>\n    </div>\n    <div className=\"mb-6 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-4\">\n      <p className=\"text-sm font-semibold\">Raw sienna</p>\n      <p className=\"mt-1 text-xs text-ink-muted\">Loose density</p>\n    </div>\n    <div className=\"mb-6 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-4\">\n      <p className=\"text-sm font-semibold\">Rose madder</p>\n      <p className=\"mt-1 text-xs text-ink-muted\">Loose density</p>\n    </div>\n    <div className=\"mb-6 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-4\">\n      <p className=\"text-sm font-semibold\">Payne grey</p>\n      <p className=\"mt-1 text-xs text-ink-muted\">Loose density</p>\n    </div>\n  </div>\n</div>"

const interactiveBentoHtml = "<div class=\"grid grid-cols-1 gap-3 md:grid-cols-3 md:grid-rows-3 md:gap-4\">\n  <button type=\"button\" aria-pressed=\"true\" class=\"wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,transform] duration-300 wash-panel-blue md:col-span-2 md:row-span-2 ring-2 ring-primary shadow-md scale-[1.01]\">\n    <div class=\"flex items-start justify-between gap-2\">\n      <p class=\"font-display text-lg font-semibold\">Studio desk</p>\n      <svg class=\"size-4 shrink-0 text-base-content/70\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><circle cx=\"13.5\" cy=\"6.5\" r=\".5\" fill=\"currentColor\"/><circle cx=\"17.5\" cy=\"10.5\" r=\".5\" fill=\"currentColor\"/><circle cx=\"8.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\"/><circle cx=\"6.5\" cy=\"12.5\" r=\".5\" fill=\"currentColor\"/><path d=\"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z\"/></svg>\n    </div>\n    <p class=\"mt-2 text-sm text-ink-muted\">Open washes, drying plates, and critique queue in one planned span.</p>\n  </button>\n  <button type=\"button\" aria-pressed=\"false\" class=\"wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,transform] duration-300 hover:shadow-sm\">\n    <div class=\"flex items-start justify-between gap-2\">\n      <p class=\"font-display text-lg font-semibold\">Water</p>\n      <svg class=\"size-4 shrink-0 text-base-content/70\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z\"/></svg>\n    </div>\n    <p class=\"mt-2 text-sm text-ink-muted\">62% load</p>\n  </button>\n  <button type=\"button\" aria-pressed=\"false\" class=\"wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,transform] duration-300 wash-panel-ochre hover:shadow-sm\">\n    <div class=\"flex items-start justify-between gap-2\">\n      <p class=\"font-display text-lg font-semibold\">Brush</p>\n      <svg class=\"size-4 text-base-content/70\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"m14.622 17.897-10.68-2.913\"/><path d=\"M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z\"/><path d=\"M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 9.055a1.662 1.662 0 0 0 2.42.4c.545-.46.97-1.1 1.134-1.917.32-1.592.54-3.137.54-4.409\"/></svg>\n    </div>\n    <p class=\"mt-2 text-sm text-ink-muted\">Round 8</p>\n  </button>\n  <button type=\"button\" aria-pressed=\"false\" class=\"wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,transform] duration-300 wash-panel-rose md:col-span-2 hover:shadow-sm\">\n    <div class=\"flex items-start justify-between gap-2\">\n      <p class=\"font-display text-lg font-semibold\">Layer stack</p>\n      <svg class=\"size-4 text-base-content/70\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z\"/><path d=\"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12\"/><path d=\"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17\"/></svg>\n    </div>\n    <p class=\"mt-2 text-sm text-ink-muted\">Three wet layers. One dry glaze waiting.</p>\n  </button>\n</div>\n<p class=\"mt-2 text-sm text-ink-muted\" aria-live=\"polite\">Selected: Studio desk</p>"

const interactiveBentoJsx = "<div className=\"grid grid-cols-1 gap-3 md:grid-cols-3 md:grid-rows-3 md:gap-4\">\n  <button type=\"button\" aria-pressed=\"true\" className=\"wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,transform] duration-300 wash-panel-blue md:col-span-2 md:row-span-2 ring-2 ring-primary shadow-md scale-[1.01]\">\n    <div className=\"flex items-start justify-between gap-2\">\n      <p className=\"font-display text-lg font-semibold\">Studio desk</p>\n      <svg className=\"size-4 shrink-0 text-base-content/70\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><circle cx=\"13.5\" cy=\"6.5\" r=\".5\" fill=\"currentColor\"/><circle cx=\"17.5\" cy=\"10.5\" r=\".5\" fill=\"currentColor\"/><circle cx=\"8.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\"/><circle cx=\"6.5\" cy=\"12.5\" r=\".5\" fill=\"currentColor\"/><path d=\"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z\"/></svg>\n    </div>\n    <p className=\"mt-2 text-sm text-ink-muted\">Open washes, drying plates, and critique queue in one planned span.</p>\n  </button>\n  <button type=\"button\" aria-pressed=\"false\" className=\"wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,transform] duration-300 hover:shadow-sm\">\n    <div className=\"flex items-start justify-between gap-2\">\n      <p className=\"font-display text-lg font-semibold\">Water</p>\n      <svg className=\"size-4 shrink-0 text-base-content/70\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><path d=\"M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z\"/></svg>\n    </div>\n    <p className=\"mt-2 text-sm text-ink-muted\">62% load</p>\n  </button>\n  <button type=\"button\" aria-pressed=\"false\" className=\"wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,transform] duration-300 wash-panel-ochre hover:shadow-sm\">\n    <div className=\"flex items-start justify-between gap-2\">\n      <p className=\"font-display text-lg font-semibold\">Brush</p>\n      <svg className=\"size-4 text-base-content/70\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><path d=\"m14.622 17.897-10.68-2.913\"/><path d=\"M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z\"/><path d=\"M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 9.055a1.662 1.662 0 0 0 2.42.4c.545-.46.97-1.1 1.134-1.917.32-1.592.54-3.137.54-4.409\"/></svg>\n    </div>\n    <p className=\"mt-2 text-sm text-ink-muted\">Round 8</p>\n  </button>\n  <button type=\"button\" aria-pressed=\"false\" className=\"wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,transform] duration-300 wash-panel-rose md:col-span-2 hover:shadow-sm\">\n    <div className=\"flex items-start justify-between gap-2\">\n      <p className=\"font-display text-lg font-semibold\">Layer stack</p>\n      <svg className=\"size-4 text-base-content/70\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><path d=\"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z\"/><path d=\"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12\"/><path d=\"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17\"/></svg>\n    </div>\n    <p className=\"mt-2 text-sm text-ink-muted\">Three wet layers. One dry glaze waiting.</p>\n  </button>\n</div>\n<p className=\"mt-2 text-sm text-ink-muted\" aria-live=\"polite\">Selected: Studio desk</p>"

const interactiveMasonryHtml = "<div class=\"columns-1 gap-4 md:columns-2 xl:columns-3\">\n  <button type=\"button\" aria-pressed=\"false\" class=\"mb-4 w-full break-inside-avoid wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,opacity] duration-300 wash-panel-blue min-h-28 hover:shadow-sm\">\n    <p class=\"font-display text-base font-semibold\">Cerulean wash</p>\n    <p class=\"mt-2 text-sm text-ink-muted\">Cool sky field for coastal plates. Keep edges soft.</p>\n  </button>\n  <button type=\"button\" aria-pressed=\"false\" class=\"mb-4 w-full break-inside-avoid wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,opacity] duration-300 wash-panel-ochre min-h-40 hover:shadow-sm\">\n    <p class=\"font-display text-base font-semibold\">Raw sienna</p>\n    <p class=\"mt-2 text-sm text-ink-muted\">Warm ground layer. Useful under fog and sand.</p>\n  </button>\n  <button type=\"button\" aria-pressed=\"false\" class=\"mb-4 w-full break-inside-avoid wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,opacity] duration-300 wash-panel-rose min-h-24 hover:shadow-sm\">\n    <p class=\"font-display text-base font-semibold\">Rose madder</p>\n    <p class=\"mt-2 text-sm text-ink-muted\">Quiet accent for dusk edges and bloom notes.</p>\n  </button>\n  <button type=\"button\" aria-pressed=\"false\" class=\"mb-4 w-full break-inside-avoid wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,opacity] duration-300  min-h-36 hover:shadow-sm\">\n    <p class=\"font-display text-base font-semibold\">Payne grey</p>\n    <p class=\"mt-2 text-sm text-ink-muted\">Ink weight for cliffs and shadow bands without heavy black.</p>\n  </button>\n  <button type=\"button\" aria-pressed=\"false\" class=\"mb-4 w-full break-inside-avoid wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,opacity] duration-300  min-h-32 hover:shadow-sm\">\n    <p class=\"font-display text-base font-semibold\">Sap green</p>\n    <p class=\"mt-2 text-sm text-ink-muted\">Tide vegetation. Thin, then glaze.</p>\n  </button>\n  <button type=\"button\" aria-pressed=\"false\" class=\"mb-4 w-full break-inside-avoid wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,opacity] duration-300 wash-panel-rose min-h-44 hover:shadow-sm\">\n    <p class=\"font-display text-base font-semibold\">Cobalt violet</p>\n    <p class=\"mt-2 text-sm text-ink-muted\">Evening bloom. Pair with cerulean, not ochre.</p>\n  </button>\n  <button type=\"button\" aria-pressed=\"false\" class=\"mb-4 w-full break-inside-avoid wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,opacity] duration-300 wash-panel-blue min-h-28 hover:shadow-sm\">\n    <p class=\"font-display text-base font-semibold\">Fog plate</p>\n    <p class=\"mt-2 text-sm text-ink-muted\">Low contrast wash. Hierarchy from type, not pigment.</p>\n  </button>\n  <button type=\"button\" aria-pressed=\"false\" class=\"mb-4 w-full break-inside-avoid wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,opacity] duration-300 wash-panel-ochre min-h-36 hover:shadow-sm\">\n    <p class=\"font-display text-base font-semibold\">Critique note</p>\n    <p class=\"mt-2 text-sm text-ink-muted\">Hold back chroma on the second pass.</p>\n  </button>\n</div>\n<p class=\"mt-1 text-sm text-ink-muted\" aria-live=\"polite\">Click a pigment card to focus it.</p>"

const interactiveMasonryJsx = "<div className=\"columns-1 gap-4 md:columns-2 xl:columns-3\">\n  <button type=\"button\" aria-pressed=\"false\" className=\"mb-4 w-full break-inside-avoid wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,opacity] duration-300 wash-panel-blue min-h-28 hover:shadow-sm\">\n    <p className=\"font-display text-base font-semibold\">Cerulean wash</p>\n    <p className=\"mt-2 text-sm text-ink-muted\">Cool sky field for coastal plates. Keep edges soft.</p>\n  </button>\n  <button type=\"button\" aria-pressed=\"false\" className=\"mb-4 w-full break-inside-avoid wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,opacity] duration-300 wash-panel-ochre min-h-40 hover:shadow-sm\">\n    <p className=\"font-display text-base font-semibold\">Raw sienna</p>\n    <p className=\"mt-2 text-sm text-ink-muted\">Warm ground layer. Useful under fog and sand.</p>\n  </button>\n  <button type=\"button\" aria-pressed=\"false\" className=\"mb-4 w-full break-inside-avoid wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,opacity] duration-300 wash-panel-rose min-h-24 hover:shadow-sm\">\n    <p className=\"font-display text-base font-semibold\">Rose madder</p>\n    <p className=\"mt-2 text-sm text-ink-muted\">Quiet accent for dusk edges and bloom notes.</p>\n  </button>\n  <button type=\"button\" aria-pressed=\"false\" className=\"mb-4 w-full break-inside-avoid wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,opacity] duration-300  min-h-36 hover:shadow-sm\">\n    <p className=\"font-display text-base font-semibold\">Payne grey</p>\n    <p className=\"mt-2 text-sm text-ink-muted\">Ink weight for cliffs and shadow bands without heavy black.</p>\n  </button>\n  <button type=\"button\" aria-pressed=\"false\" className=\"mb-4 w-full break-inside-avoid wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,opacity] duration-300  min-h-32 hover:shadow-sm\">\n    <p className=\"font-display text-base font-semibold\">Sap green</p>\n    <p className=\"mt-2 text-sm text-ink-muted\">Tide vegetation. Thin, then glaze.</p>\n  </button>\n  <button type=\"button\" aria-pressed=\"false\" className=\"mb-4 w-full break-inside-avoid wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,opacity] duration-300 wash-panel-rose min-h-44 hover:shadow-sm\">\n    <p className=\"font-display text-base font-semibold\">Cobalt violet</p>\n    <p className=\"mt-2 text-sm text-ink-muted\">Evening bloom. Pair with cerulean, not ochre.</p>\n  </button>\n  <button type=\"button\" aria-pressed=\"false\" className=\"mb-4 w-full break-inside-avoid wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,opacity] duration-300 wash-panel-blue min-h-28 hover:shadow-sm\">\n    <p className=\"font-display text-base font-semibold\">Fog plate</p>\n    <p className=\"mt-2 text-sm text-ink-muted\">Low contrast wash. Hierarchy from type, not pigment.</p>\n  </button>\n  <button type=\"button\" aria-pressed=\"false\" className=\"mb-4 w-full break-inside-avoid wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,opacity] duration-300 wash-panel-ochre min-h-36 hover:shadow-sm\">\n    <p className=\"font-display text-base font-semibold\">Critique note</p>\n    <p className=\"mt-2 text-sm text-ink-muted\">Hold back chroma on the second pass.</p>\n  </button>\n</div>\n<p className=\"mt-1 text-sm text-ink-muted\" aria-live=\"polite\">Click a pigment card to focus it.</p>"

const responsiveHtml = "<div class=\"grid gap-6 lg:grid-cols-2\">\n  <div class=\"grid grid-cols-1 gap-2 md:grid-cols-3\">\n    <div class=\"rounded-box bg-base-200 p-4 md:col-span-2\">\n      <p class=\"font-display font-semibold\">Wide on desktop</p>\n      <p class=\"mt-1 text-sm text-ink-muted\">Full width on mobile</p>\n    </div>\n    <div class=\"rounded-box bg-base-200 p-4\">\n      <p class=\"font-display font-semibold\">Side</p>\n      <p class=\"mt-1 text-sm text-ink-muted\">Stacks below</p>\n    </div>\n    <div class=\"rounded-box bg-base-200 p-4 md:col-span-3\">\n      <p class=\"font-display font-semibold\">Footer span</p>\n      <p class=\"mt-1 text-sm text-ink-muted\">md:col-span-3</p>\n    </div>\n  </div>\n  <div class=\"columns-1 gap-3 xl:columns-3\">\n    <div class=\"mb-3 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3\">\n      <p class=\"text-sm font-semibold\">Fog</p>\n      <p class=\"mt-1 text-xs text-ink-muted\">One column until xl</p>\n    </div>\n    <div class=\"mb-3 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3\">\n      <p class=\"text-sm font-semibold\">Sand</p>\n      <p class=\"mt-1 text-xs text-ink-muted\">One column until xl</p>\n    </div>\n    <div class=\"mb-3 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3\">\n      <p class=\"text-sm font-semibold\">Cliff</p>\n      <p class=\"mt-1 text-xs text-ink-muted\">One column until xl</p>\n    </div>\n  </div>\n</div>"

const responsiveJsx = "<div className=\"grid gap-6 lg:grid-cols-2\">\n  <div className=\"grid grid-cols-1 gap-2 md:grid-cols-3\">\n    <div className=\"rounded-box bg-base-200 p-4 md:col-span-2\">\n      <p className=\"font-display font-semibold\">Wide on desktop</p>\n      <p className=\"mt-1 text-sm text-ink-muted\">Full width on mobile</p>\n    </div>\n    <div className=\"rounded-box bg-base-200 p-4\">\n      <p className=\"font-display font-semibold\">Side</p>\n      <p className=\"mt-1 text-sm text-ink-muted\">Stacks below</p>\n    </div>\n    <div className=\"rounded-box bg-base-200 p-4 md:col-span-3\">\n      <p className=\"font-display font-semibold\">Footer span</p>\n      <p className=\"mt-1 text-sm text-ink-muted\">md:col-span-3</p>\n    </div>\n  </div>\n  <div className=\"columns-1 gap-3 xl:columns-3\">\n    <div className=\"mb-3 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3\">\n      <p className=\"text-sm font-semibold\">Fog</p>\n      <p className=\"mt-1 text-xs text-ink-muted\">One column until xl</p>\n    </div>\n    <div className=\"mb-3 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3\">\n      <p className=\"text-sm font-semibold\">Sand</p>\n      <p className=\"mt-1 text-xs text-ink-muted\">One column until xl</p>\n    </div>\n    <div className=\"mb-3 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3\">\n      <p className=\"text-sm font-semibold\">Cliff</p>\n      <p className=\"mt-1 text-xs text-ink-muted\">One column until xl</p>\n    </div>\n  </div>\n</div>"

const compareHtml = "<div class=\"grid gap-4 md:grid-cols-2\">\n  <div class=\"rounded-box border border-ink-border bg-base-100 p-5\">\n    <p class=\"label-ink\">Bento</p>\n    <h3 class=\"font-display mt-1 text-lg font-semibold\">Planned spans</h3>\n    <p class=\"mt-2 text-sm text-ink-muted\">You assign <span class=\"font-mono text-xs\">col-span</span> and <span class=\"font-mono text-xs\">row-span</span>. Hero tiles stay dominant. Gaps are even. Best for dashboards and feature desks.</p>\n  </div>\n  <div class=\"rounded-box border border-ink-border bg-base-100 p-5\">\n    <p class=\"label-ink\">Masonry</p>\n    <h3 class=\"font-display mt-1 text-lg font-semibold\">Flow packing</h3>\n    <p class=\"mt-2 text-sm text-ink-muted\">Cards keep natural heights. Columns pack top-to-bottom, then across. Order follows source, not a fixed map. Best for pigment libraries and note walls.</p>\n  </div>\n</div>"

const compareJsx = "<div className=\"grid gap-4 md:grid-cols-2\">\n  <div className=\"rounded-box border border-ink-border bg-base-100 p-5\">\n    <p className=\"label-ink\">Bento</p>\n    <h3 className=\"font-display mt-1 text-lg font-semibold\">Planned spans</h3>\n    <p className=\"mt-2 text-sm text-ink-muted\">You assign <span className=\"font-mono text-xs\">col-span</span> and <span className=\"font-mono text-xs\">row-span</span>. Hero tiles stay dominant. Gaps are even. Best for dashboards and feature desks.</p>\n  </div>\n  <div className=\"rounded-box border border-ink-border bg-base-100 p-5\">\n    <p className=\"label-ink\">Masonry</p>\n    <h3 className=\"font-display mt-1 text-lg font-semibold\">Flow packing</h3>\n    <p className=\"mt-2 text-sm text-ink-muted\">Cards keep natural heights. Columns pack top-to-bottom, then across. Order follows source, not a fixed map. Best for pigment libraries and note walls.</p>\n  </div>\n</div>"

function InteractiveBento() {
  const [active, setActive] = useState<string | null>('hero')

  const tiles = [
    {
      id: 'hero',
      label: 'col-span-2 row-span-2',
      className: 'md:col-span-2 md:row-span-2',
      title: 'Studio desk',
      body: 'Open washes, drying plates, and critique queue in one planned span.',
      icon: Palette,
      panel: 'wash-panel-blue',
    },
    {
      id: 'water',
      label: 'col-span-1',
      className: '',
      title: 'Water',
      body: '62% load',
      icon: Droplets,
      panel: '',
    },
    {
      id: 'brush',
      label: 'col-span-1',
      className: '',
      title: 'Brush',
      body: 'Round 8',
      icon: Paintbrush,
      panel: 'wash-panel-ochre',
    },
    {
      id: 'layers',
      label: 'col-span-1 md:col-span-2',
      className: 'md:col-span-2',
      title: 'Layer stack',
      body: 'Three wet layers. One dry glaze waiting.',
      icon: Layers,
      panel: 'wash-panel-rose',
    },
  ] as const

  return (
    <Sample label="grid + col-span / row-span · click to highlight">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:grid-rows-3 md:gap-4">
        {tiles.map((tile) => {
          const Icon = tile.icon
          const selected = active === tile.id
          return (
            <button
              key={tile.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(tile.id)}
              className={`wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,transform] duration-300 motion-reduce:transition-none motion-reduce:transform-none ${tile.panel} ${tile.className} ${
                selected
                  ? 'ring-2 ring-primary shadow-md scale-[1.01] motion-reduce:scale-100'
                  : 'hover:shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-display text-lg font-semibold">{tile.title}</p>
                <Icon className="size-4 shrink-0 text-base-content/70" strokeWidth={2} />
              </div>
              <p className="mt-2 text-sm text-ink-muted">{tile.body}</p>
              <ClassLabel value={tile.label} />
            </button>
          )
        })}
      </div>
      <p className="mt-2 text-sm text-ink-muted" aria-live="polite">
        Selected: {tiles.find((t) => t.id === active)?.title ?? 'none'}
      </p>
    </Sample>
  )
}

function InteractiveMasonry() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <Sample label="columns-1 md:columns-2 xl:columns-3 · break-inside-avoid">
      <div className="columns-1 gap-4 md:columns-2 xl:columns-3">
        {masonryCards.map((card, index) => {
          const selected = active === card.id
          return (
            <button
              key={card.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(card.id === active ? null : card.id)}
              className={`mb-4 w-full break-inside-avoid wash-panel paper-grain cursor-pointer text-left transition-[box-shadow,opacity] duration-300 motion-reduce:transition-none soak-in motion-reduce:animate-none ${card.panel} ${card.height} ${
                selected
                  ? 'ring-2 ring-secondary shadow-md'
                  : 'hover:shadow-sm'
              }`}
              style={
                {
                  animationDelay: `${Math.min(index, 6) * 40}ms`,
                } as CSSProperties
              }
            >
              <p className="font-display text-base font-semibold">{card.title}</p>
              <p className="mt-2 text-sm text-ink-muted">{card.body}</p>
            </button>
          )
        })}
      </div>
      <p className="mt-1 text-sm text-ink-muted" aria-live="polite">
        {active
          ? `Focused pigment: ${masonryCards.find((c) => c.id === active)?.title}`
          : 'Click a pigment card to focus it.'}
      </p>
    </Sample>
  )
}

export default function BentoMasonryPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Bento / Masonry
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Layout galleries for Menzies Design desks.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Bento"
          title="Asymmetric studio grid"
          description="Hero tile plus smaller metric tiles"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[7.5rem]">
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:auto-rows-[7.5rem] md:gap-4">
                              <div className="wash-panel wash-panel-blue paper-grain flex flex-col justify-between md:col-span-2 md:row-span-2">
                                <div>
                                  <p className="label-ink">Hero tile</p>
                                  <h3 className="font-display mt-1 text-2xl font-semibold">
                                    Menzies Design desk
                                  </h3>
                                  <p className="mt-2 max-w-sm text-sm text-ink-muted">
                                    Planned span for the primary plate: title, status, and one
                                    clear action.
                                  </p>
                                </div>
                                <div className="mt-4 flex flex-wrap items-center gap-2">
                                  <button type="button" className="btn btn-primary btn-sm cursor-pointer">
                                    Open series
                                  </button>
                                  <ClassLabel value="md:col-span-2 md:row-span-2" />
                                </div>
                              </div>

                              <div className="stats cursor-default bg-base-100 shadow-sm md:col-span-2">
                                <div className="stat place-items-start py-3">
                                  <div className="stat-figure text-primary">
                                    <Droplets className="size-5" strokeWidth={2} />
                                  </div>
                                  <div className="stat-title">Washes</div>
                                  <div className="stat-value text-2xl">48</div>
                                  <div className="stat-desc">This week</div>
                                </div>
                                <div className="stat place-items-start py-3">
                                  <div className="stat-figure text-secondary">
                                    <Clock className="size-5" strokeWidth={2} />
                                  </div>
                                  <div className="stat-title">Drying</div>
                                  <div className="stat-value text-2xl">6</div>
                                  <div className="stat-desc">In tray</div>
                                </div>
                              </div>

                              <div className="card card-border bg-base-100 md:col-span-1">
                                <div className="card-body gap-2 p-4">
                                  <Paintbrush className="size-4 text-base-content/70" strokeWidth={2} />
                                  <h3 className="card-title font-display text-base">Brushes</h3>
                                  <p className="text-sm text-ink-muted">12 ready</p>
                                  <ClassLabel value="md:col-span-1" />
                                </div>
                              </div>

                              <div className="card card-border bg-base-100 md:col-span-1">
                                <div className="card-body gap-2 p-4">
                                  <Layers className="size-4 text-base-content/70" strokeWidth={2} />
                                  <h3 className="card-title font-display text-base">Layers</h3>
                                  <p className="text-sm text-ink-muted">Stack of 4</p>
                                  <ClassLabel value="md:col-span-1" />
                                </div>
                              </div>

                              <div className="card bg-base-100 shadow-sm md:col-span-2">
                                <div className="card-body flex-row items-center gap-4 p-4">
                                  <Sparkles className="size-5 shrink-0 text-accent" strokeWidth={2} />
                                  <div className="min-w-0">
                                    <h3 className="font-display text-base font-semibold">
                                      Critique queue
                                    </h3>
                                    <p className="text-sm text-ink-muted">
                                      Three plates waiting. Wide span for a list cue.
                                    </p>
                                  </div>
                                  <ClassLabel value="md:col-span-2" />
                                </div>
                              </div>
                            </div>
                          </Sample>
              </>
            }
            html={bentoHtml}
            jsx={bentoJsx}
          />
        
        </Section>

        <Section
          eyebrow="02 · Masonry"
          title="Staggered pigment columns"
          description="CSS columns flow cards by height"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <Sample label="columns-1 sm:columns-2 lg:columns-3 · break-inside-avoid">
                            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                              {masonryCards.map((card) => (
                                <div
                                  key={card.id}
                                  className={`mb-4 break-inside-avoid card card-border bg-base-100 ${card.height}`}
                                >
                                  <div className={`card-body p-4 ${card.panel}`}>
                                    <h3 className="card-title font-display text-base">{card.title}</h3>
                                    <p className="text-sm text-ink-muted">{card.body}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </Sample>
              </>
            }
            html={masonryHtml}
            jsx={masonryJsx}
          />
        
        </Section>

        <Section
          eyebrow="03 · Sizes / density"
          title="Gap and column density"
          description="Tighten or open the packing without changing tile content"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 lg:grid-cols-3">
                            <Sample label="gap-2 · columns-2">
                              <div className="columns-2 gap-2">
                                {masonryCards.slice(0, 4).map((card) => (
                                  <div
                                    key={`tight-${card.id}`}
                                    className="mb-2 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3"
                                  >
                                    <p className="text-sm font-semibold">{card.title}</p>
                                    <p className="mt-1 text-xs text-ink-muted">Tight density</p>
                                  </div>
                                ))}
                              </div>
                            </Sample>
                            <Sample label="gap-4 · columns-2">
                              <div className="columns-2 gap-4">
                                {masonryCards.slice(0, 4).map((card) => (
                                  <div
                                    key={`mid-${card.id}`}
                                    className="mb-4 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3"
                                  >
                                    <p className="text-sm font-semibold">{card.title}</p>
                                    <p className="mt-1 text-xs text-ink-muted">Comfort density</p>
                                  </div>
                                ))}
                              </div>
                            </Sample>
                            <Sample label="gap-6 · columns-2">
                              <div className="columns-2 gap-6">
                                {masonryCards.slice(0, 4).map((card) => (
                                  <div
                                    key={`loose-${card.id}`}
                                    className="mb-6 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-4"
                                  >
                                    <p className="text-sm font-semibold">{card.title}</p>
                                    <p className="mt-1 text-xs text-ink-muted">Loose density</p>
                                  </div>
                                ))}
                              </div>
                            </Sample>
                          </div>
              </>
            }
            html={densityHtml}
            jsx={densityJsx}
          />
        
        </Section>

        <Section
          eyebrow="04 · Interactive"
          title="Click to highlight"
          description="Local selection only"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <InteractiveBento />
              </>
            }
            html={interactiveBentoHtml}
            jsx={interactiveBentoJsx}
          />
        
        </Section>

        <Section
          eyebrow="05 · Interactive masonry"
          title="Focus a pigment card"
          description="Same click pattern on column-packed cards"
        >
          <ShowcaseTabs
            preview={
              <>
                <InteractiveMasonry />
              </>
            }
            html={interactiveMasonryHtml}
            jsx={interactiveMasonryJsx}
          />
        
        </Section>

        <Section
          eyebrow="06 · Responsive"
          title="Single column on mobile"
          description="Bento collapses to one column under md"
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-6 lg:grid-cols-2">
                            <Sample label="grid-cols-1 md:grid-cols-3">
                              <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                                <div className="rounded-box bg-base-200 p-4 md:col-span-2">
                                  <p className="font-display font-semibold">Wide on desktop</p>
                                  <p className="mt-1 text-sm text-ink-muted">Full width on mobile</p>
                                </div>
                                <div className="rounded-box bg-base-200 p-4">
                                  <p className="font-display font-semibold">Side</p>
                                  <p className="mt-1 text-sm text-ink-muted">Stacks below</p>
                                </div>
                                <div className="rounded-box bg-base-200 p-4 md:col-span-3">
                                  <p className="font-display font-semibold">Footer span</p>
                                  <p className="mt-1 text-sm text-ink-muted">md:col-span-3</p>
                                </div>
                              </div>
                            </Sample>
                            <Sample label="columns-1 xl:columns-3">
                              <div className="columns-1 gap-3 xl:columns-3">
                                {['Fog', 'Sand', 'Cliff'].map((name) => (
                                  <div
                                    key={name}
                                    className="mb-3 break-inside-avoid rounded-box border border-ink-border bg-base-100 p-3"
                                  >
                                    <p className="text-sm font-semibold">{name}</p>
                                    <p className="mt-1 text-xs text-ink-muted">
                                      One column until xl
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </Sample>
                          </div>
              </>
            }
            html={responsiveHtml}
            jsx={responsiveJsx}
          />
        
        </Section>

        <Section
          eyebrow="07 · Bento vs masonry"
          title="How they differ"
          description="Choose the model that matches the desk: planned hierarchy or flowing"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-box border border-ink-border bg-base-100 p-5">
                              <p className="label-ink">Bento</p>
                              <h3 className="font-display mt-1 text-lg font-semibold">
                                Planned spans
                              </h3>
                              <p className="mt-2 text-sm text-ink-muted">
                                You assign <span className="font-mono text-xs">col-span</span>{' '}
                                and <span className="font-mono text-xs">row-span</span>. Hero
                                tiles stay dominant. Gaps are even. Best for dashboards and
                                feature desks.
                              </p>
                              <ClassLabel value="CSS Grid · explicit spans" />
                            </div>
                            <div className="rounded-box border border-ink-border bg-base-100 p-5">
                              <p className="label-ink">Masonry</p>
                              <h3 className="font-display mt-1 text-lg font-semibold">
                                Flow packing
                              </h3>
                              <p className="mt-2 text-sm text-ink-muted">
                                Cards keep natural heights. Columns pack top-to-bottom, then
                                across. Order follows source, not a fixed map. Best for pigment
                                libraries and note walls.
                              </p>
                              <ClassLabel value="CSS columns · break-inside-avoid" />
                            </div>
                          </div>
              </>
            }
            html={compareHtml}
            jsx={compareJsx}
          />
        
        </Section>
      </div>
    </>
  )
}
