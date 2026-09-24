import { ShowcaseTabs } from './components/ShowcaseTabs'
import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { Pause, Play, TimerReset } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

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

const basicHtml = "<div class=\"flex flex-wrap items-end gap-6\"><span class=\"countdown font-mono text-4xl\"><span style=\"--value:59;\" aria-live=\"polite\" aria-label=\"59\">59</span></span><span class=\"countdown font-mono text-4xl\"><span style=\"--value:7;--digits:2;\" aria-live=\"polite\" aria-label=\"7\">7</span></span><span class=\"countdown font-mono text-4xl\"><span style=\"--value:42;--digits:3;\" aria-live=\"polite\" aria-label=\"42\">42</span></span></div>"
const basicJsx = "<div className=\"flex flex-wrap items-end gap-6\"><span className=\"countdown font-mono text-4xl\"><span style={{ '--value': 59 } as CSSProperties} aria-live=\"polite\" aria-label=\"59\">59</span></span><span className=\"countdown font-mono text-4xl\"><span style={{ '--value': 7, '--digits': 2 } as CSSProperties} aria-live=\"polite\" aria-label=\"7\">7</span></span><span className=\"countdown font-mono text-4xl\"><span style={{ '--value': 42, '--digits': 3 } as CSSProperties} aria-live=\"polite\" aria-label=\"42\">42</span></span></div>"

const clockHtml = "<div class=\"flex flex-col gap-8\">\n  <span class=\"countdown font-mono text-2xl\"><span style=\"--value:10;\" aria-live=\"polite\" aria-label=\"10\">10</span>h<span style=\"--value:24;\" aria-live=\"polite\" aria-label=\"24\">24</span>m<span style=\"--value:59;\" aria-live=\"polite\" aria-label=\"59\">59</span>s</span>\n  <span class=\"countdown font-mono text-2xl\"><span style=\"--value:10;\" aria-live=\"polite\" aria-label=\"10\">10</span>:<span style=\"--value:24;--digits:2;\" aria-live=\"polite\" aria-label=\"24\">24</span>:<span style=\"--value:59;--digits:2;\" aria-live=\"polite\" aria-label=\"59\">59</span></span>\n  <div class=\"flex flex-wrap gap-5\">\n    <div><span class=\"countdown font-mono text-4xl\"><span style=\"--value:15;\" aria-live=\"polite\" aria-label=\"15\">15</span></span> days</div>\n    <div><span class=\"countdown font-mono text-4xl\"><span style=\"--value:10;\" aria-live=\"polite\" aria-label=\"10\">10</span></span> hours</div>\n    <div><span class=\"countdown font-mono text-4xl\"><span style=\"--value:24;\" aria-live=\"polite\" aria-label=\"24\">24</span></span> min</div>\n    <div><span class=\"countdown font-mono text-4xl\"><span style=\"--value:59;\" aria-live=\"polite\" aria-label=\"59\">59</span></span> sec</div>\n  </div>\n  <div class=\"grid auto-cols-max grid-flow-col gap-5 text-center\">\n    <div class=\"flex flex-col\"><span class=\"countdown font-mono text-5xl\"><span style=\"--value:15;\" aria-live=\"polite\" aria-label=\"15\">15</span></span>days</div>\n    <div class=\"flex flex-col\"><span class=\"countdown font-mono text-5xl\"><span style=\"--value:10;\" aria-live=\"polite\" aria-label=\"10\">10</span></span>hours</div>\n    <div class=\"flex flex-col\"><span class=\"countdown font-mono text-5xl\"><span style=\"--value:24;\" aria-live=\"polite\" aria-label=\"24\">24</span></span>min</div>\n    <div class=\"flex flex-col\"><span class=\"countdown font-mono text-5xl\"><span style=\"--value:59;\" aria-live=\"polite\" aria-label=\"59\">59</span></span>sec</div>\n  </div>\n</div>"
const clockJsx = "<div className=\"flex flex-col gap-8\">\n  <span className=\"countdown font-mono text-2xl\"><span style={{ '--value': 10 } as CSSProperties} aria-live=\"polite\" aria-label=\"10\">10</span>h<span style={{ '--value': 24 } as CSSProperties} aria-live=\"polite\" aria-label=\"24\">24</span>m<span style={{ '--value': 59 } as CSSProperties} aria-live=\"polite\" aria-label=\"59\">59</span>s</span>\n  <span className=\"countdown font-mono text-2xl\"><span style={{ '--value': 10 } as CSSProperties} aria-live=\"polite\" aria-label=\"10\">10</span>:<span style={{ '--value': 24, '--digits': 2 } as CSSProperties} aria-live=\"polite\" aria-label=\"24\">24</span>:<span style={{ '--value': 59, '--digits': 2 } as CSSProperties} aria-live=\"polite\" aria-label=\"59\">59</span></span>\n  <div className=\"flex flex-wrap gap-5\">\n    <div><span className=\"countdown font-mono text-4xl\"><span style={{ '--value': 15 } as CSSProperties} aria-live=\"polite\" aria-label=\"15\">15</span></span> days</div>\n    <div><span className=\"countdown font-mono text-4xl\"><span style={{ '--value': 10 } as CSSProperties} aria-live=\"polite\" aria-label=\"10\">10</span></span> hours</div>\n    <div><span className=\"countdown font-mono text-4xl\"><span style={{ '--value': 24 } as CSSProperties} aria-live=\"polite\" aria-label=\"24\">24</span></span> min</div>\n    <div><span className=\"countdown font-mono text-4xl\"><span style={{ '--value': 59 } as CSSProperties} aria-live=\"polite\" aria-label=\"59\">59</span></span> sec</div>\n  </div>\n  <div className=\"grid auto-cols-max grid-flow-col gap-5 text-center\">\n    <div className=\"flex flex-col\"><span className=\"countdown font-mono text-5xl\"><span style={{ '--value': 15 } as CSSProperties} aria-live=\"polite\" aria-label=\"15\">15</span></span>days</div>\n    <div className=\"flex flex-col\"><span className=\"countdown font-mono text-5xl\"><span style={{ '--value': 10 } as CSSProperties} aria-live=\"polite\" aria-label=\"10\">10</span></span>hours</div>\n    <div className=\"flex flex-col\"><span className=\"countdown font-mono text-5xl\"><span style={{ '--value': 24 } as CSSProperties} aria-live=\"polite\" aria-label=\"24\">24</span></span>min</div>\n    <div className=\"flex flex-col\"><span className=\"countdown font-mono text-5xl\"><span style={{ '--value': 59 } as CSSProperties} aria-live=\"polite\" aria-label=\"59\">59</span></span>sec</div>\n  </div>\n</div>"

const boxesHtml = "<div class=\"flex flex-col gap-8\">\n  <div class=\"grid auto-cols-max grid-flow-col gap-3 text-center sm:gap-5\">\n    <div class=\"flex flex-col rounded-box bg-neutral p-2 text-neutral-content\"><span class=\"countdown font-mono text-4xl sm:text-5xl\"><span style=\"--value:15;\" aria-live=\"polite\" aria-label=\"15\">15</span></span>days</div>\n    <div class=\"flex flex-col rounded-box bg-neutral p-2 text-neutral-content\"><span class=\"countdown font-mono text-4xl sm:text-5xl\"><span style=\"--value:10;\" aria-live=\"polite\" aria-label=\"10\">10</span></span>hours</div>\n    <div class=\"flex flex-col rounded-box bg-neutral p-2 text-neutral-content\"><span class=\"countdown font-mono text-4xl sm:text-5xl\"><span style=\"--value:24;\" aria-live=\"polite\" aria-label=\"24\">24</span></span>min</div>\n    <div class=\"flex flex-col rounded-box bg-neutral p-2 text-neutral-content\"><span class=\"countdown font-mono text-4xl sm:text-5xl\"><span style=\"--value:59;\" aria-live=\"polite\" aria-label=\"59\">59</span></span>sec</div>\n  </div>\n  <div class=\"grid auto-cols-max grid-flow-col gap-3 text-center sm:gap-5\">\n    <div class=\"flex flex-col rounded-box border border-ink-border/60 bg-wash-blue/40 p-3\"><span class=\"countdown font-mono text-4xl sm:text-5xl\"><span style=\"--value:3;--digits:2;\" aria-live=\"polite\" aria-label=\"3\">3</span></span><span class=\"text-xs text-ink-muted\">days</span></div>\n    <div class=\"flex flex-col rounded-box border border-ink-border/60 bg-wash-blue/40 p-3\"><span class=\"countdown font-mono text-4xl sm:text-5xl\"><span style=\"--value:8;--digits:2;\" aria-live=\"polite\" aria-label=\"8\">8</span></span><span class=\"text-xs text-ink-muted\">hours</span></div>\n    <div class=\"flex flex-col rounded-box border border-ink-border/60 bg-wash-blue/40 p-3\"><span class=\"countdown font-mono text-4xl sm:text-5xl\"><span style=\"--value:45;--digits:2;\" aria-live=\"polite\" aria-label=\"45\">45</span></span><span class=\"text-xs text-ink-muted\">min</span></div>\n    <div class=\"flex flex-col rounded-box border border-ink-border/60 bg-wash-blue/40 p-3\"><span class=\"countdown font-mono text-4xl sm:text-5xl\"><span style=\"--value:12;--digits:2;\" aria-live=\"polite\" aria-label=\"12\">12</span></span><span class=\"text-xs text-ink-muted\">sec</span></div>\n  </div>\n  <span class=\"countdown font-mono text-6xl\"><span style=\"--value:59;--digits:2;\" aria-live=\"polite\" aria-label=\"59\">59</span></span>\n</div>"
const boxesJsx = "<div className=\"flex flex-col gap-8\">\n  <div className=\"grid auto-cols-max grid-flow-col gap-3 text-center sm:gap-5\">\n    <div className=\"flex flex-col rounded-box bg-neutral p-2 text-neutral-content\"><span className=\"countdown font-mono text-4xl sm:text-5xl\"><span style={{ '--value': 15 } as CSSProperties} aria-live=\"polite\" aria-label=\"15\">15</span></span>days</div>\n    <div className=\"flex flex-col rounded-box bg-neutral p-2 text-neutral-content\"><span className=\"countdown font-mono text-4xl sm:text-5xl\"><span style={{ '--value': 10 } as CSSProperties} aria-live=\"polite\" aria-label=\"10\">10</span></span>hours</div>\n    <div className=\"flex flex-col rounded-box bg-neutral p-2 text-neutral-content\"><span className=\"countdown font-mono text-4xl sm:text-5xl\"><span style={{ '--value': 24 } as CSSProperties} aria-live=\"polite\" aria-label=\"24\">24</span></span>min</div>\n    <div className=\"flex flex-col rounded-box bg-neutral p-2 text-neutral-content\"><span className=\"countdown font-mono text-4xl sm:text-5xl\"><span style={{ '--value': 59 } as CSSProperties} aria-live=\"polite\" aria-label=\"59\">59</span></span>sec</div>\n  </div>\n  <div className=\"grid auto-cols-max grid-flow-col gap-3 text-center sm:gap-5\">\n    <div className=\"flex flex-col rounded-box border border-ink-border/60 bg-wash-blue/40 p-3\"><span className=\"countdown font-mono text-4xl sm:text-5xl\"><span style={{ '--value': 3, '--digits': 2 } as CSSProperties} aria-live=\"polite\" aria-label=\"3\">3</span></span><span className=\"text-xs text-ink-muted\">days</span></div>\n    <div className=\"flex flex-col rounded-box border border-ink-border/60 bg-wash-blue/40 p-3\"><span className=\"countdown font-mono text-4xl sm:text-5xl\"><span style={{ '--value': 8, '--digits': 2 } as CSSProperties} aria-live=\"polite\" aria-label=\"8\">8</span></span><span className=\"text-xs text-ink-muted\">hours</span></div>\n    <div className=\"flex flex-col rounded-box border border-ink-border/60 bg-wash-blue/40 p-3\"><span className=\"countdown font-mono text-4xl sm:text-5xl\"><span style={{ '--value': 45, '--digits': 2 } as CSSProperties} aria-live=\"polite\" aria-label=\"45\">45</span></span><span className=\"text-xs text-ink-muted\">min</span></div>\n    <div className=\"flex flex-col rounded-box border border-ink-border/60 bg-wash-blue/40 p-3\"><span className=\"countdown font-mono text-4xl sm:text-5xl\"><span style={{ '--value': 12, '--digits': 2 } as CSSProperties} aria-live=\"polite\" aria-label=\"12\">12</span></span><span className=\"text-xs text-ink-muted\">sec</span></div>\n  </div>\n  <span className=\"countdown font-mono text-6xl\"><span style={{ '--value': 59, '--digits': 2 } as CSSProperties} aria-live=\"polite\" aria-label=\"59\">59</span></span>\n</div>"

const liveHtml = "<div class=\"flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between\">\n  <div class=\"flex flex-col gap-2\">\n    <span class=\"countdown font-mono text-5xl md:text-6xl\"><span style=\"--value:1;--digits:2;\" aria-live=\"polite\" aria-label=\"1\">1</span>:<span style=\"--value:30;--digits:2;\" aria-live=\"polite\" aria-label=\"30\">30</span></span>\n    <p class=\"text-sm text-ink-muted\">Ticking every second</p>\n  </div>\n  <div class=\"flex items-center gap-2\">\n    <div class=\"tooltip tooltip-secondary\" data-tip=\"Pause\"><button type=\"button\" class=\"btn btn-square btn-secondary cursor-pointer\" aria-label=\"Pause\"><svg class=\"size-5\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect></svg></button></div>\n    <div class=\"tooltip tooltip-primary\" data-tip=\"Reset\"><button type=\"button\" class=\"btn btn-square btn-primary cursor-pointer\" aria-label=\"Reset\"><svg class=\"size-5\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"M21 12a9 9 0 1 1-3-6.7\"></path><path d=\"M21 3v6h-6\"></path></svg></button></div>\n  </div>\n</div>"
const liveJsx = "<div className=\"flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between\">\n  <div className=\"flex flex-col gap-2\">\n    <span className=\"countdown font-mono text-5xl md:text-6xl\"><span style={{ '--value': 1, '--digits': 2 } as CSSProperties} aria-live=\"polite\" aria-label=\"1\">1</span>:<span style={{ '--value': 30, '--digits': 2 } as CSSProperties} aria-live=\"polite\" aria-label=\"30\">30</span></span>\n    <p className=\"text-sm text-ink-muted\">Ticking every second</p>\n  </div>\n  <div className=\"flex items-center gap-2\">\n    <div className=\"tooltip tooltip-secondary\" data-tip=\"Pause\"><button type=\"button\" className=\"btn btn-square btn-secondary cursor-pointer\" aria-label=\"Pause\"><svg className=\"size-5\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect></svg></button></div>\n    <div className=\"tooltip tooltip-primary\" data-tip=\"Reset\"><button type=\"button\" className=\"btn btn-square btn-primary cursor-pointer\" aria-label=\"Reset\"><svg className=\"size-5\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><path d=\"M21 12a9 9 0 1 1-3-6.7\"></path><path d=\"M21 3v6h-6\"></path></svg></button></div>\n  </div>\n</div>"

const studioHtml = "<div class=\"flex flex-col gap-5\">\n  <div class=\"flex flex-wrap gap-2\">\n    <button type=\"button\" class=\"btn btn-sm btn-primary cursor-pointer\">Wash dry</button>\n    <button type=\"button\" class=\"btn btn-sm btn-ghost cursor-pointer\">Critique</button>\n  </div>\n  <div class=\"flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between\">\n    <div>\n      <p class=\"label-ink mb-2\">Wash dry time</p>\n      <div class=\"grid grid-flow-col auto-cols-max gap-3 text-center sm:gap-5\">\n        <div class=\"flex flex-col rounded-box bg-base-200/80 p-2 sm:p-3\"><span class=\"countdown font-mono text-3xl sm:text-5xl\"><span style=\"--value:0;--digits:2;\" aria-live=\"polite\" aria-label=\"0\">0</span></span><span class=\"text-xs text-ink-muted\">hours</span></div>\n        <div class=\"flex flex-col rounded-box bg-base-200/80 p-2 sm:p-3\"><span class=\"countdown font-mono text-3xl sm:text-5xl\"><span style=\"--value:45;--digits:2;\" aria-live=\"polite\" aria-label=\"45\">45</span></span><span class=\"text-xs text-ink-muted\">min</span></div>\n        <div class=\"flex flex-col rounded-box bg-base-200/80 p-2 sm:p-3\"><span class=\"countdown font-mono text-3xl sm:text-5xl\"><span style=\"--value:0;--digits:2;\" aria-live=\"polite\" aria-label=\"0\">0</span></span><span class=\"text-xs text-ink-muted\">sec</span></div>\n      </div>\n      <p class=\"mt-3 text-sm text-ink-muted\">Counting down for the studio floor</p>\n    </div>\n    <div class=\"flex items-center gap-2\">\n      <div class=\"tooltip tooltip-secondary\" data-tip=\"Pause\"><button type=\"button\" class=\"btn btn-square btn-secondary cursor-pointer\" aria-label=\"Pause\"><svg class=\"size-5\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect></svg></button></div>\n      <div class=\"tooltip tooltip-primary\" data-tip=\"Reset\"><button type=\"button\" class=\"btn btn-square btn-primary cursor-pointer\" aria-label=\"Reset\"><svg class=\"size-5\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"M21 12a9 9 0 1 1-3-6.7\"></path><path d=\"M21 3v6h-6\"></path></svg></button></div>\n    </div>\n  </div>\n</div>"
const studioJsx = "<div className=\"flex flex-col gap-5\">\n  <div className=\"flex flex-wrap gap-2\">\n    <button type=\"button\" className=\"btn btn-sm btn-primary cursor-pointer\">Wash dry</button>\n    <button type=\"button\" className=\"btn btn-sm btn-ghost cursor-pointer\">Critique</button>\n  </div>\n  <div className=\"flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between\">\n    <div>\n      <p className=\"label-ink mb-2\">Wash dry time</p>\n      <div className=\"grid grid-flow-col auto-cols-max gap-3 text-center sm:gap-5\">\n        <div className=\"flex flex-col rounded-box bg-base-200/80 p-2 sm:p-3\"><span className=\"countdown font-mono text-3xl sm:text-5xl\"><span style={{ '--value': 0, '--digits': 2 } as CSSProperties} aria-live=\"polite\" aria-label=\"0\">0</span></span><span className=\"text-xs text-ink-muted\">hours</span></div>\n        <div className=\"flex flex-col rounded-box bg-base-200/80 p-2 sm:p-3\"><span className=\"countdown font-mono text-3xl sm:text-5xl\"><span style={{ '--value': 45, '--digits': 2 } as CSSProperties} aria-live=\"polite\" aria-label=\"45\">45</span></span><span className=\"text-xs text-ink-muted\">min</span></div>\n        <div className=\"flex flex-col rounded-box bg-base-200/80 p-2 sm:p-3\"><span className=\"countdown font-mono text-3xl sm:text-5xl\"><span style={{ '--value': 0, '--digits': 2 } as CSSProperties} aria-live=\"polite\" aria-label=\"0\">0</span></span><span className=\"text-xs text-ink-muted\">sec</span></div>\n      </div>\n      <p className=\"mt-3 text-sm text-ink-muted\">Counting down for the studio floor</p>\n    </div>\n    <div className=\"flex items-center gap-2\">\n      <div className=\"tooltip tooltip-secondary\" data-tip=\"Pause\"><button type=\"button\" className=\"btn btn-square btn-secondary cursor-pointer\" aria-label=\"Pause\"><svg className=\"size-5\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect></svg></button></div>\n      <div className=\"tooltip tooltip-primary\" data-tip=\"Reset\"><button type=\"button\" className=\"btn btn-square btn-primary cursor-pointer\" aria-label=\"Reset\"><svg className=\"size-5\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" aria-hidden=\"true\"><path d=\"M21 12a9 9 0 1 1-3-6.7\"></path><path d=\"M21 3v6h-6\"></path></svg></button></div>\n    </div>\n  </div>\n</div>"

const responsiveHtml = "<div class=\"grid grid-cols-2 gap-3 text-center sm:grid-cols-4 sm:gap-5\">\n  <div class=\"flex flex-col rounded-box border border-ink-border/50 bg-base-200/60 p-3 sm:p-4\"><span class=\"countdown font-mono text-3xl sm:text-4xl md:text-5xl\"><span style=\"--value:2;--digits:2;\" aria-live=\"polite\" aria-label=\"2\">2</span></span><span class=\"mt-1 text-xs text-ink-muted sm:text-sm\">days</span></div>\n  <div class=\"flex flex-col rounded-box border border-ink-border/50 bg-base-200/60 p-3 sm:p-4\"><span class=\"countdown font-mono text-3xl sm:text-4xl md:text-5xl\"><span style=\"--value:14;--digits:2;\" aria-live=\"polite\" aria-label=\"14\">14</span></span><span class=\"mt-1 text-xs text-ink-muted sm:text-sm\">hours</span></div>\n  <div class=\"flex flex-col rounded-box border border-ink-border/50 bg-base-200/60 p-3 sm:p-4\"><span class=\"countdown font-mono text-3xl sm:text-4xl md:text-5xl\"><span style=\"--value:36;--digits:2;\" aria-live=\"polite\" aria-label=\"36\">36</span></span><span class=\"mt-1 text-xs text-ink-muted sm:text-sm\">min</span></div>\n  <div class=\"flex flex-col rounded-box border border-ink-border/50 bg-base-200/60 p-3 sm:p-4\"><span class=\"countdown font-mono text-3xl sm:text-4xl md:text-5xl\"><span style=\"--value:9;--digits:2;\" aria-live=\"polite\" aria-label=\"9\">9</span></span><span class=\"mt-1 text-xs text-ink-muted sm:text-sm\">sec</span></div>\n</div>\n<p class=\"mt-4 text-sm text-ink-muted\">Two columns on mobile, four on tablet and up. Type steps up with breakpoints.</p>"
const responsiveJsx = "<div className=\"grid grid-cols-2 gap-3 text-center sm:grid-cols-4 sm:gap-5\">\n  <div className=\"flex flex-col rounded-box border border-ink-border/50 bg-base-200/60 p-3 sm:p-4\"><span className=\"countdown font-mono text-3xl sm:text-4xl md:text-5xl\"><span style={{ '--value': 2, '--digits': 2 } as CSSProperties} aria-live=\"polite\" aria-label=\"2\">2</span></span><span className=\"mt-1 text-xs text-ink-muted sm:text-sm\">days</span></div>\n  <div className=\"flex flex-col rounded-box border border-ink-border/50 bg-base-200/60 p-3 sm:p-4\"><span className=\"countdown font-mono text-3xl sm:text-4xl md:text-5xl\"><span style={{ '--value': 14, '--digits': 2 } as CSSProperties} aria-live=\"polite\" aria-label=\"14\">14</span></span><span className=\"mt-1 text-xs text-ink-muted sm:text-sm\">hours</span></div>\n  <div className=\"flex flex-col rounded-box border border-ink-border/50 bg-base-200/60 p-3 sm:p-4\"><span className=\"countdown font-mono text-3xl sm:text-4xl md:text-5xl\"><span style={{ '--value': 36, '--digits': 2 } as CSSProperties} aria-live=\"polite\" aria-label=\"36\">36</span></span><span className=\"mt-1 text-xs text-ink-muted sm:text-sm\">min</span></div>\n  <div className=\"flex flex-col rounded-box border border-ink-border/50 bg-base-200/60 p-3 sm:p-4\"><span className=\"countdown font-mono text-3xl sm:text-4xl md:text-5xl\"><span style={{ '--value': 9, '--digits': 2 } as CSSProperties} aria-live=\"polite\" aria-label=\"9\">9</span></span><span className=\"mt-1 text-xs text-ink-muted sm:text-sm\">sec</span></div>\n</div>\n<p className=\"mt-4 text-sm text-ink-muted\">Two columns on mobile, four on tablet and up. Type steps up with breakpoints.</p>"


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

function CountdownValue({
  value,
  digits,
}: {
  value: number
  digits?: 2 | 3
}) {
  const n = Math.max(0, Math.min(999, Math.floor(value)))
  const style = {
    '--value': n,
    ...(digits != null ? { '--digits': digits } : {}),
  } as CSSProperties

  return (
    <span style={style} aria-live="polite" aria-label={String(n)}>
      {n}
    </span>
  )
}

function splitSeconds(total: number) {
  const s = Math.max(0, Math.floor(total))
  const days = Math.floor(s / 86400)
  const hours = Math.floor((s % 86400) / 3600)
  const minutes = Math.floor((s % 3600) / 60)
  const seconds = s % 60
  return { days, hours, minutes, seconds }
}

const LIVE_START = 90
const WASH_DRY_START = 45 * 60
const CRITIQUE_START = 12 * 60 + 30

function LiveTickDemo() {
  const [remaining, setRemaining] = useState(LIVE_START)
  const [paused, setPaused] = useState(false)
  const running = !paused && remaining > 0

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => {
      setRemaining((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [running])

  const { minutes, seconds } = splitSeconds(remaining)

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-2">
        <span className="countdown font-mono text-5xl md:text-6xl">
          <CountdownValue value={minutes} digits={2} />
          :
          <CountdownValue value={seconds} digits={2} />
        </span>
        <ClassLabel value="countdown + useEffect interval" />
        <p className="text-sm text-ink-muted">
          {remaining === 0
            ? 'Timer finished'
            : paused
              ? 'Paused'
              : 'Ticking every second'}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div
          className={`tooltip ${paused ? 'tooltip-success' : 'tooltip-secondary'}`}
          data-tip={paused ? 'Resume' : 'Pause'}
        >
          <button
            type="button"
            className={`btn btn-square ${
              remaining === 0
                ? 'btn-disabled cursor-not-allowed'
                : paused
                  ? 'btn-success cursor-pointer'
                  : 'btn-secondary cursor-pointer'
            }`}
            aria-label={paused ? 'Resume' : 'Pause'}
            onClick={() => setPaused((p) => !p)}
            disabled={remaining === 0}
          >
            {paused ? (
              <Play className="size-5" strokeWidth={2} />
            ) : (
              <Pause className="size-5" strokeWidth={2} />
            )}
          </button>
        </div>
        <div className="tooltip tooltip-primary" data-tip="Reset">
          <button
            type="button"
            className="btn btn-square btn-primary cursor-pointer"
            aria-label="Reset"
            onClick={() => {
              setRemaining(LIVE_START)
              setPaused(false)
            }}
          >
            <TimerReset className="size-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  )
}

function StudioSessionTimer() {
  const [mode, setMode] = useState<'dry' | 'critique'>('dry')
  const [remaining, setRemaining] = useState(WASH_DRY_START)
  const [paused, setPaused] = useState(false)
  const running = !paused && remaining > 0

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => {
      setRemaining((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [running])

  function switchMode(next: 'dry' | 'critique') {
    setMode(next)
    setRemaining(next === 'dry' ? WASH_DRY_START : CRITIQUE_START)
    setPaused(false)
  }

  const { hours, minutes, seconds } = splitSeconds(remaining)
  const label = mode === 'dry' ? 'Wash dry time' : 'Critique start'

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={`btn btn-sm cursor-pointer ${mode === 'dry' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => switchMode('dry')}
        >
          Wash dry
        </button>
        <button
          type="button"
          className={`btn btn-sm cursor-pointer ${mode === 'critique' ? 'btn-secondary' : 'btn-ghost'}`}
          onClick={() => switchMode('critique')}
        >
          Critique
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="label-ink mb-2">{label}</p>
          <div className="grid grid-flow-col auto-cols-max gap-3 text-center sm:gap-5">
            {mode === 'dry' ? (
              <div className="flex flex-col rounded-box bg-base-200/80 p-2 sm:p-3">
                <span className="countdown font-mono text-3xl sm:text-5xl">
                  <CountdownValue value={hours} digits={2} />
                </span>
                <span className="text-xs text-ink-muted">hours</span>
              </div>
            ) : null}
            <div className="flex flex-col rounded-box bg-base-200/80 p-2 sm:p-3">
              <span className="countdown font-mono text-3xl sm:text-5xl">
                <CountdownValue value={minutes} digits={2} />
              </span>
              <span className="text-xs text-ink-muted">min</span>
            </div>
            <div className="flex flex-col rounded-box bg-base-200/80 p-2 sm:p-3">
              <span className="countdown font-mono text-3xl sm:text-5xl">
                <CountdownValue value={seconds} digits={2} />
              </span>
              <span className="text-xs text-ink-muted">sec</span>
            </div>
          </div>
          <p className="mt-3 text-sm text-ink-muted">
            {remaining === 0
              ? mode === 'dry'
                ? 'Wash is dry. Ready for the next layer.'
                : 'Critique has begun.'
              : paused
                ? 'Session paused'
                : 'Counting down for the studio floor'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`tooltip ${paused ? 'tooltip-success' : 'tooltip-secondary'}`}
            data-tip={paused ? 'Resume' : 'Pause'}
          >
            <button
              type="button"
              className={`btn btn-square ${
                remaining === 0
                  ? 'btn-disabled cursor-not-allowed'
                  : paused
                    ? 'btn-success cursor-pointer'
                    : 'btn-secondary cursor-pointer'
              }`}
              aria-label={paused ? 'Resume' : 'Pause'}
              onClick={() => setPaused((p) => !p)}
              disabled={remaining === 0}
            >
              {paused ? (
                <Play className="size-5" strokeWidth={2} />
              ) : (
                <Pause className="size-5" strokeWidth={2} />
              )}
            </button>
          </div>
          <div className="tooltip tooltip-primary" data-tip="Reset">
            <button
              type="button"
              className="btn btn-square btn-primary cursor-pointer"
              aria-label="Reset"
              onClick={() => {
                setRemaining(mode === 'dry' ? WASH_DRY_START : CRITIQUE_START)
                setPaused(false)
              }}
            >
              <TimerReset className="size-5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CountdownPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Countdown
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">countdown</span> digits
          with wash-panel layouts, live ticks, and studio session timers.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Single value"
          description="Change the span text and the --value CSS variable"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end gap-6">
                            <Sample label="countdown">
                              <span className="countdown font-mono text-4xl">
                                <CountdownValue value={59} />
                              </span>
                            </Sample>
                            <Sample label="countdown · --digits: 2">
                              <span className="countdown font-mono text-4xl">
                                <CountdownValue value={7} digits={2} />
                              </span>
                            </Sample>
                            <Sample label="countdown · --digits: 3">
                              <span className="countdown font-mono text-4xl">
                                <CountdownValue value={42} digits={3} />
                              </span>
                            </Sample>
                          </div>
              </>
            }
            html={basicHtml}
            jsx={basicJsx}
          />
        
        </Section>

        <Section
          eyebrow="02 · Clock"
          title="Days, hours, minutes, seconds"
          description="Classic daisyUI clock layouts"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-8">
                            <Sample label="countdown font-mono text-2xl">
                              <span className="countdown font-mono text-2xl">
                                <CountdownValue value={10} />
                                h
                                <CountdownValue value={24} />
                                m
                                <CountdownValue value={59} />
                                s
                              </span>
                            </Sample>

                            <Sample label="countdown with colons">
                              <span className="countdown font-mono text-2xl">
                                <CountdownValue value={10} />
                                :
                                <CountdownValue value={24} digits={2} />
                                :
                                <CountdownValue value={59} digits={2} />
                              </span>
                            </Sample>

                            <Sample label="labeled units">
                              <div className="flex flex-wrap gap-5">
                                <div>
                                  <span className="countdown font-mono text-4xl">
                                    <CountdownValue value={15} />
                                  </span>{' '}
                                  days
                                </div>
                                <div>
                                  <span className="countdown font-mono text-4xl">
                                    <CountdownValue value={10} />
                                  </span>{' '}
                                  hours
                                </div>
                                <div>
                                  <span className="countdown font-mono text-4xl">
                                    <CountdownValue value={24} />
                                  </span>{' '}
                                  min
                                </div>
                                <div>
                                  <span className="countdown font-mono text-4xl">
                                    <CountdownValue value={59} />
                                  </span>{' '}
                                  sec
                                </div>
                              </div>
                            </Sample>

                            <Sample label="labels under">
                              <div className="grid auto-cols-max grid-flow-col gap-5 text-center">
                                <div className="flex flex-col">
                                  <span className="countdown font-mono text-5xl">
                                    <CountdownValue value={15} />
                                  </span>
                                  days
                                </div>
                                <div className="flex flex-col">
                                  <span className="countdown font-mono text-5xl">
                                    <CountdownValue value={10} />
                                  </span>
                                  hours
                                </div>
                                <div className="flex flex-col">
                                  <span className="countdown font-mono text-5xl">
                                    <CountdownValue value={24} />
                                  </span>
                                  min
                                </div>
                                <div className="flex flex-col">
                                  <span className="countdown font-mono text-5xl">
                                    <CountdownValue value={59} />
                                  </span>
                                  sec
                                </div>
                              </div>
                            </Sample>
                          </div>
              </>
            }
            html={clockHtml}
            jsx={clockJsx}
          />
        
        </Section>

        <Section
          eyebrow="03 · In boxes"
          title="Large type in boxes"
          description="Neutral boxes and wash chrome for exhibition-scale digits"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-8">
                            <Sample label="bg-neutral rounded-box">
                              <div className="grid auto-cols-max grid-flow-col gap-3 text-center sm:gap-5">
                                <div className="flex flex-col rounded-box bg-neutral p-2 text-neutral-content">
                                  <span className="countdown font-mono text-4xl sm:text-5xl">
                                    <CountdownValue value={15} />
                                  </span>
                                  days
                                </div>
                                <div className="flex flex-col rounded-box bg-neutral p-2 text-neutral-content">
                                  <span className="countdown font-mono text-4xl sm:text-5xl">
                                    <CountdownValue value={10} />
                                  </span>
                                  hours
                                </div>
                                <div className="flex flex-col rounded-box bg-neutral p-2 text-neutral-content">
                                  <span className="countdown font-mono text-4xl sm:text-5xl">
                                    <CountdownValue value={24} />
                                  </span>
                                  min
                                </div>
                                <div className="flex flex-col rounded-box bg-neutral p-2 text-neutral-content">
                                  <span className="countdown font-mono text-4xl sm:text-5xl">
                                    <CountdownValue value={59} />
                                  </span>
                                  sec
                                </div>
                              </div>
                            </Sample>

                            <Sample label="wash-panel chrome">
                              <div className="grid auto-cols-max grid-flow-col gap-3 text-center sm:gap-5">
                                <div className="flex flex-col rounded-box border border-ink-border/60 bg-wash-blue/40 p-3">
                                  <span className="countdown font-mono text-4xl sm:text-5xl">
                                    <CountdownValue value={3} digits={2} />
                                  </span>
                                  <span className="text-xs text-ink-muted">days</span>
                                </div>
                                <div className="flex flex-col rounded-box border border-ink-border/60 bg-wash-blue/40 p-3">
                                  <span className="countdown font-mono text-4xl sm:text-5xl">
                                    <CountdownValue value={8} digits={2} />
                                  </span>
                                  <span className="text-xs text-ink-muted">hours</span>
                                </div>
                                <div className="flex flex-col rounded-box border border-ink-border/60 bg-wash-blue/40 p-3">
                                  <span className="countdown font-mono text-4xl sm:text-5xl">
                                    <CountdownValue value={45} digits={2} />
                                  </span>
                                  <span className="text-xs text-ink-muted">min</span>
                                </div>
                                <div className="flex flex-col rounded-box border border-ink-border/60 bg-wash-blue/40 p-3">
                                  <span className="countdown font-mono text-4xl sm:text-5xl">
                                    <CountdownValue value={12} digits={2} />
                                  </span>
                                  <span className="text-xs text-ink-muted">sec</span>
                                </div>
                              </div>
                            </Sample>

                            <Sample label="countdown font-mono text-6xl">
                              <span className="countdown font-mono text-6xl">
                                <CountdownValue value={59} digits={2} />
                              </span>
                            </Sample>
                          </div>
              </>
            }
            html={boxesHtml}
            jsx={boxesJsx}
          />
        
        </Section>

        <Section
          eyebrow="04 · Live tick"
          title="Interval countdown"
          description="React state ticks every second"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <LiveTickDemo />
              </>
            }
            html={liveHtml}
            jsx={liveJsx}
          />
        
        </Section>

        <Section
          eyebrow="05 · Studio session"
          title="Studio session timer"
          description="Wash dry time and critique start timers styled"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <StudioSessionTimer />
              </>
            }
            html={studioHtml}
            jsx={studioJsx}
          />
        
        </Section>

        <Section
          eyebrow="06 · Responsive"
          title="Fluid clock stack"
          description="Units wrap on narrow viewports and scale type from phone to desktop"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4 sm:gap-5">
                            <div className="flex flex-col rounded-box border border-ink-border/50 bg-base-200/60 p-3 sm:p-4">
                              <span className="countdown font-mono text-3xl sm:text-4xl md:text-5xl">
                                <CountdownValue value={2} digits={2} />
                              </span>
                              <span className="mt-1 text-xs text-ink-muted sm:text-sm">days</span>
                            </div>
                            <div className="flex flex-col rounded-box border border-ink-border/50 bg-base-200/60 p-3 sm:p-4">
                              <span className="countdown font-mono text-3xl sm:text-4xl md:text-5xl">
                                <CountdownValue value={14} digits={2} />
                              </span>
                              <span className="mt-1 text-xs text-ink-muted sm:text-sm">hours</span>
                            </div>
                            <div className="flex flex-col rounded-box border border-ink-border/50 bg-base-200/60 p-3 sm:p-4">
                              <span className="countdown font-mono text-3xl sm:text-4xl md:text-5xl">
                                <CountdownValue value={36} digits={2} />
                              </span>
                              <span className="mt-1 text-xs text-ink-muted sm:text-sm">min</span>
                            </div>
                            <div className="flex flex-col rounded-box border border-ink-border/50 bg-base-200/60 p-3 sm:p-4">
                              <span className="countdown font-mono text-3xl sm:text-4xl md:text-5xl">
                                <CountdownValue value={9} digits={2} />
                              </span>
                              <span className="mt-1 text-xs text-ink-muted sm:text-sm">sec</span>
                            </div>
                          </div>
                          <p className="mt-4 text-sm text-ink-muted">
                            Two columns on mobile, four on tablet and up. Type steps up with
                            breakpoints.
                          </p>
              </>
            }
            html={responsiveHtml}
            jsx={responsiveJsx}
          />
        
        </Section>
      </div>
    </>
  )
}
