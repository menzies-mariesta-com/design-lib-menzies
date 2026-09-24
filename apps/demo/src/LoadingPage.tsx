import type { ReactNode } from 'react'
import { ShowcaseTabs } from './components/ShowcaseTabs'
import { Droplets, Palette } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import {
  BrushStrokeLoader,
  BrushTipLoader,
  InkWordmarkLoader,
  PigmentBloomLoader,
  PigmentMark,
} from './StudioLoading'
import { daisyToJsx } from './snippets/markup/daisyGalleryDefaults'

function toJsxMarkup(html: string): string {
  return daisyToJsx(html).replace(/stroke-width=/g, 'strokeWidth=')
}

const identityHtml = `<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
  <div class="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-base-100/70 px-4 py-8" role="status" aria-busy="true" aria-live="polite">
    <div class="studio-load-stroke relative flex h-14 w-full max-w-xs items-center overflow-hidden sm:h-16" aria-hidden="true">
  <span class="studio-load-stroke__mark"></span>
</div>
    <p class="font-display text-base font-semibold">Stroke sweep</p>
    <p class="text-center text-sm text-ink-muted">A round tip draws across the paper, then lifts.</p>
    <code class="font-mono text-[0.65rem] text-ink-muted">studio-load-stroke</code>
  </div>
  <div class="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-base-100/70 px-4 py-8" role="status" aria-busy="true" aria-live="polite">
    <div class="studio-load-tip flex items-center justify-center" aria-hidden="true" style="--tip-w: 33px; --tip-h: 33px">
  <span class="studio-load-tip__blob"></span>
</div>
    <p class="font-display text-base font-semibold">Tip pulse</p>
    <p class="text-center text-sm text-ink-muted">Blob size tracks desk px. Edge soft follows water and hardness.</p>
    <code class="font-mono text-[0.65rem] text-ink-muted">studio-load-tip + --brush-*</code>
  </div>
  <div class="flex cursor-progress flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-wash-blue/25 px-4 py-8" role="status" aria-busy="true" aria-live="polite">
    <div class="studio-load-bloom relative size-24 overflow-hidden rounded-full sm:size-28" aria-hidden="true">
  <span class="studio-load-bloom__a"></span>
  <span class="studio-load-bloom__b"></span>
  <span class="studio-load-bloom__c"></span>
  <span class="studio-load-bloom__drop"></span>
</div>
    <p class="font-display text-base font-semibold">Wash bloom</p>
    <p class="text-center text-sm text-ink-muted">Droplet and pigment pools pulse with wash-a / wash-b / wash-c.</p>
    <code class="font-mono text-[0.65rem] text-ink-muted">studio-load-bloom + wash tokens</code>
  </div>
  <div class="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-wash-rose/20 px-4 py-8 sm:col-span-2 xl:col-span-1" role="status" aria-busy="true" aria-live="polite">
    <div class="studio-load-ink flex flex-col items-center gap-3" aria-hidden="true">
  <svg class="studio-load-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="56" height="56" fill="none" aria-hidden="true">
  <circle class="studio-load-mark__a" cx="14" cy="16" r="10" fill="var(--color-primary)" opacity="0.4"></circle>
  <circle class="studio-load-mark__b" cx="20" cy="14" r="8" fill="var(--color-secondary)" opacity="0.32"></circle>
  <circle class="studio-load-mark__c" cx="16" cy="20" r="7" fill="var(--color-accent)" opacity="0.28"></circle>
  <circle class="studio-load-mark__core" cx="12" cy="12" r="3" fill="var(--color-primary)" opacity="0.7"></circle>
</svg>
  <p class="studio-load-ink__word font-display text-2xl font-semibold tracking-tight sm:text-3xl">Menzies Design</p>
  <p class="label-ink">Ink soaking in</p>
</div>
    <code class="font-mono text-[0.65rem] text-ink-muted">studio-load-ink + pigment mark</code>
  </div>
</div>`

const statesHtml = `<div class="grid gap-4 md:grid-cols-2">
  <div class="flex min-h-52 cursor-wait flex-col items-center justify-center gap-4 rounded-box border border-ink-border/60 bg-base-100/70 px-6 py-10" role="status" aria-busy="true" aria-live="polite">
    <div class="studio-load-stroke relative flex h-14 w-full max-w-xs items-center overflow-hidden sm:h-16" aria-hidden="true">
  <span class="studio-load-stroke__mark"></span>
</div>
    <p class="font-display text-lg font-semibold">Laying wash</p>
    <p class="max-w-xs text-center text-sm text-ink-muted">Soft edges settling with default studio load.</p>
  </div>
  <div class="relative flex min-h-52 cursor-progress flex-col items-center justify-center gap-4 overflow-hidden rounded-box border border-ink-border/60 px-6 py-10" role="status" aria-busy="true" aria-live="polite">
    <div class="pointer-events-none absolute inset-0 bg-wash-blue/20" aria-hidden="true"></div>
    <span class="pointer-events-none absolute -left-8 -top-10 size-40 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-a)_75%,transparent)_0%,transparent_70%)] opacity-80 blur-2xl" aria-hidden="true"></span>
    <span class="pointer-events-none absolute -bottom-12 -right-6 size-36 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-c)_70%,transparent)_0%,transparent_70%)] opacity-70 blur-2xl" aria-hidden="true"></span>
    <div class="relative z-10 flex flex-col items-center gap-4">
      <div class="flex items-center gap-4">
        <div class="studio-load-tip flex items-center justify-center" aria-hidden="true" style="--tip-w: 33px; --tip-h: 33px">
  <span class="studio-load-tip__blob"></span>
</div>
        <div class="studio-load-bloom relative size-24 overflow-hidden rounded-full sm:size-28" aria-hidden="true">
  <span class="studio-load-bloom__a"></span>
  <span class="studio-load-bloom__b"></span>
  <span class="studio-load-bloom__c"></span>
  <span class="studio-load-bloom__drop"></span>
</div>
      </div>
      <p class="font-display text-lg font-semibold">Pigment mix</p>
      <p class="max-w-xs text-center text-sm text-ink-muted">Bloom radius follows flow and water from wash CSS vars.</p>
    </div>
  </div>
  <div class="flex min-h-48 cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-base-200/50 px-6 py-10 md:col-span-2" role="status" aria-busy="true" aria-live="polite">
    <div class="flex flex-wrap items-center justify-center gap-6">
      <svg class="studio-load-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64" fill="none" aria-hidden="true">
  <circle class="studio-load-mark__a" cx="14" cy="16" r="10" fill="var(--color-primary)" opacity="0.4"></circle>
  <circle class="studio-load-mark__b" cx="20" cy="14" r="8" fill="var(--color-secondary)" opacity="0.32"></circle>
  <circle class="studio-load-mark__c" cx="16" cy="20" r="7" fill="var(--color-accent)" opacity="0.28"></circle>
  <circle class="studio-load-mark__core" cx="12" cy="12" r="3" fill="var(--color-primary)" opacity="0.7"></circle>
</svg>
      <div class="studio-load-ink flex flex-col items-center gap-3" aria-hidden="true">
  <svg class="studio-load-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="56" height="56" fill="none" aria-hidden="true">
  <circle class="studio-load-mark__a" cx="14" cy="16" r="10" fill="var(--color-primary)" opacity="0.4"></circle>
  <circle class="studio-load-mark__b" cx="20" cy="14" r="8" fill="var(--color-secondary)" opacity="0.32"></circle>
  <circle class="studio-load-mark__c" cx="16" cy="20" r="7" fill="var(--color-accent)" opacity="0.28"></circle>
  <circle class="studio-load-mark__core" cx="12" cy="12" r="3" fill="var(--color-primary)" opacity="0.7"></circle>
</svg>
  <p class="studio-load-ink__word font-display text-2xl font-semibold tracking-tight sm:text-3xl">Menzies Design</p>
  <p class="label-ink">Ink soaking in</p>
</div>
    </div>
    <p class="max-w-md text-center text-sm text-ink-muted">Logo soak uses the pigment mark from the favicon palette and an ink-fill wordmark timed to <span class="font-mono text-xs">--brush-soak-duration</span>.</p>
  </div>
</div>`

const typesHtml = `<div class="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
  <span class="loading loading-spinner loading-lg text-primary" aria-label="Spinner loading"></span>
  <span class="loading loading-dots loading-lg text-primary" aria-label="Dots loading"></span>
  <span class="loading loading-ring loading-lg text-primary" aria-label="Ring loading"></span>
  <span class="loading loading-ball loading-lg text-primary" aria-label="Ball loading"></span>
  <span class="loading loading-bars loading-lg text-primary" aria-label="Bars loading"></span>
  <span class="loading loading-infinity loading-lg text-primary" aria-label="Infinity loading"></span>
</div>`

const sizesHtml = `<div class="flex flex-wrap items-end justify-center gap-6 sm:justify-start">
  <span class="loading loading-spinner loading-xs text-primary" aria-label="XS spinner"></span>
  <span class="loading loading-spinner loading-sm text-primary" aria-label="SM spinner"></span>
  <span class="loading loading-spinner loading-md text-primary" aria-label="MD spinner"></span>
  <span class="loading loading-spinner loading-lg text-primary" aria-label="LG spinner"></span>
  <span class="loading loading-spinner loading-xl text-primary" aria-label="XL spinner"></span>
</div>`

const colorsHtml = `<div class="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-8">
  <span class="loading loading-spinner loading-lg text-primary" aria-label="Primary loading"></span>
  <span class="loading loading-spinner loading-lg text-secondary" aria-label="Secondary loading"></span>
  <span class="loading loading-spinner loading-lg text-accent" aria-label="Accent loading"></span>
  <span class="loading loading-spinner loading-lg text-neutral" aria-label="Neutral loading"></span>
  <span class="loading loading-spinner loading-lg text-info" aria-label="Info loading"></span>
  <span class="loading loading-spinner loading-lg text-success" aria-label="Success loading"></span>
  <span class="loading loading-spinner loading-lg text-warning" aria-label="Warning loading"></span>
  <span class="loading loading-spinner loading-lg text-error" aria-label="Error loading"></span>
</div>`

const matrixHtml = `<div class="overflow-x-auto">
  <div class="flex min-w-[36rem] flex-col gap-5">
    <div>
      <p class="label-ink mb-3">Spinner</p>
      <div class="flex flex-wrap items-end gap-5">
        <span class="loading loading-spinner loading-md text-primary" aria-label="Spinner Primary"></span>
        <span class="loading loading-spinner loading-md text-secondary" aria-label="Spinner Secondary"></span>
        <span class="loading loading-spinner loading-md text-accent" aria-label="Spinner Accent"></span>
        <span class="loading loading-spinner loading-md text-neutral" aria-label="Spinner Neutral"></span>
        <span class="loading loading-spinner loading-md text-info" aria-label="Spinner Info"></span>
        <span class="loading loading-spinner loading-md text-success" aria-label="Spinner Success"></span>
        <span class="loading loading-spinner loading-md text-warning" aria-label="Spinner Warning"></span>
        <span class="loading loading-spinner loading-md text-error" aria-label="Spinner Error"></span>
      </div>
    </div>
    <div>
      <p class="label-ink mb-3">Dots</p>
      <div class="flex flex-wrap items-end gap-5">
        <span class="loading loading-dots loading-md text-primary" aria-label="Dots Primary"></span>
        <span class="loading loading-dots loading-md text-secondary" aria-label="Dots Secondary"></span>
        <span class="loading loading-dots loading-md text-accent" aria-label="Dots Accent"></span>
        <span class="loading loading-dots loading-md text-neutral" aria-label="Dots Neutral"></span>
        <span class="loading loading-dots loading-md text-info" aria-label="Dots Info"></span>
        <span class="loading loading-dots loading-md text-success" aria-label="Dots Success"></span>
        <span class="loading loading-dots loading-md text-warning" aria-label="Dots Warning"></span>
        <span class="loading loading-dots loading-md text-error" aria-label="Dots Error"></span>
      </div>
    </div>
    <div>
      <p class="label-ink mb-3">Ring</p>
      <div class="flex flex-wrap items-end gap-5">
        <span class="loading loading-ring loading-md text-primary" aria-label="Ring Primary"></span>
        <span class="loading loading-ring loading-md text-secondary" aria-label="Ring Secondary"></span>
        <span class="loading loading-ring loading-md text-accent" aria-label="Ring Accent"></span>
        <span class="loading loading-ring loading-md text-neutral" aria-label="Ring Neutral"></span>
        <span class="loading loading-ring loading-md text-info" aria-label="Ring Info"></span>
        <span class="loading loading-ring loading-md text-success" aria-label="Ring Success"></span>
        <span class="loading loading-ring loading-md text-warning" aria-label="Ring Warning"></span>
        <span class="loading loading-ring loading-md text-error" aria-label="Ring Error"></span>
      </div>
    </div>
    <div>
      <p class="label-ink mb-3">Ball</p>
      <div class="flex flex-wrap items-end gap-5">
        <span class="loading loading-ball loading-md text-primary" aria-label="Ball Primary"></span>
        <span class="loading loading-ball loading-md text-secondary" aria-label="Ball Secondary"></span>
        <span class="loading loading-ball loading-md text-accent" aria-label="Ball Accent"></span>
        <span class="loading loading-ball loading-md text-neutral" aria-label="Ball Neutral"></span>
        <span class="loading loading-ball loading-md text-info" aria-label="Ball Info"></span>
        <span class="loading loading-ball loading-md text-success" aria-label="Ball Success"></span>
        <span class="loading loading-ball loading-md text-warning" aria-label="Ball Warning"></span>
        <span class="loading loading-ball loading-md text-error" aria-label="Ball Error"></span>
      </div>
    </div>
    <div>
      <p class="label-ink mb-3">Bars</p>
      <div class="flex flex-wrap items-end gap-5">
        <span class="loading loading-bars loading-md text-primary" aria-label="Bars Primary"></span>
        <span class="loading loading-bars loading-md text-secondary" aria-label="Bars Secondary"></span>
        <span class="loading loading-bars loading-md text-accent" aria-label="Bars Accent"></span>
        <span class="loading loading-bars loading-md text-neutral" aria-label="Bars Neutral"></span>
        <span class="loading loading-bars loading-md text-info" aria-label="Bars Info"></span>
        <span class="loading loading-bars loading-md text-success" aria-label="Bars Success"></span>
        <span class="loading loading-bars loading-md text-warning" aria-label="Bars Warning"></span>
        <span class="loading loading-bars loading-md text-error" aria-label="Bars Error"></span>
      </div>
    </div>
    <div>
      <p class="label-ink mb-3">Infinity</p>
      <div class="flex flex-wrap items-end gap-5">
        <span class="loading loading-infinity loading-md text-primary" aria-label="Infinity Primary"></span>
        <span class="loading loading-infinity loading-md text-secondary" aria-label="Infinity Secondary"></span>
        <span class="loading loading-infinity loading-md text-accent" aria-label="Infinity Accent"></span>
        <span class="loading loading-infinity loading-md text-neutral" aria-label="Infinity Neutral"></span>
        <span class="loading loading-infinity loading-md text-info" aria-label="Infinity Info"></span>
        <span class="loading loading-infinity loading-md text-success" aria-label="Infinity Success"></span>
        <span class="loading loading-infinity loading-md text-warning" aria-label="Infinity Warning"></span>
        <span class="loading loading-infinity loading-md text-error" aria-label="Infinity Error"></span>
      </div>
    </div>
  </div>
</div>`

const btnMixingHtml = `<button type="button" class="btn cursor-wait gap-2" disabled aria-busy="true">
  <span class="inline-block w-14 shrink-0" aria-hidden="true">
    <div class="studio-load-stroke relative flex h-14 w-full max-w-xs items-center overflow-hidden sm:h-16 h-3! max-w-none" aria-hidden="true">
  <span class="studio-load-stroke__mark"></span>
</div>
  </span>
  Mixing
</button>`

const btnSavingHtml = `<button type="button" class="btn btn-primary cursor-wait gap-2" disabled aria-busy="true">
  <svg class="studio-load-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="22" height="22" fill="none" aria-hidden="true">
  <circle class="studio-load-mark__a" cx="14" cy="16" r="10" fill="var(--color-primary)" opacity="0.4"></circle>
  <circle class="studio-load-mark__b" cx="20" cy="14" r="8" fill="var(--color-secondary)" opacity="0.32"></circle>
  <circle class="studio-load-mark__c" cx="16" cy="20" r="7" fill="var(--color-accent)" opacity="0.28"></circle>
  <circle class="studio-load-mark__core" cx="12" cy="12" r="3" fill="var(--color-primary)" opacity="0.7"></circle>
</svg>
  Saving plate
</button>`

const btnSyncingHtml = `<button type="button" class="btn btn-secondary cursor-wait gap-2" disabled aria-busy="true">
  <div class="studio-load-tip flex items-center justify-center scale-[0.45] origin-center" aria-hidden="true" style="--tip-w: 33px; --tip-h: 33px">
  <span class="studio-load-tip__blob"></span>
</div>
  Syncing
</button>`

const btnExportHtml = `<button type="button" class="btn btn-accent btn-outline cursor-progress" disabled aria-busy="true">
  <span class="loading loading-bars loading-sm" aria-hidden="true"></span>
  Exporting
</button>`

const btnCircleHtml = `<button type="button" class="btn btn-ghost btn-circle cursor-wait" disabled aria-busy="true" aria-label="Loading">
  <svg class="studio-load-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="none" aria-hidden="true">
  <circle class="studio-load-mark__a" cx="14" cy="16" r="10" fill="var(--color-primary)" opacity="0.4"></circle>
  <circle class="studio-load-mark__b" cx="20" cy="14" r="8" fill="var(--color-secondary)" opacity="0.32"></circle>
  <circle class="studio-load-mark__c" cx="16" cy="20" r="7" fill="var(--color-accent)" opacity="0.28"></circle>
  <circle class="studio-load-mark__core" cx="12" cy="12" r="3" fill="var(--color-primary)" opacity="0.7"></circle>
</svg>
</button>`

const btnDryingHtml = `<button type="button" class="btn btn-soft btn-info cursor-progress" disabled aria-busy="true">
  <span class="loading loading-infinity" aria-hidden="true"></span>
  Drying wash
</button>`

const panelsHtml = `<div class="grid gap-4 md:grid-cols-2">
  <div class="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-base-100/70 px-6 py-12" role="status" aria-busy="true" aria-live="polite">
    <div class="studio-load-stroke relative flex h-14 w-full max-w-xs items-center overflow-hidden sm:h-16" aria-hidden="true">
  <span class="studio-load-stroke__mark"></span>
</div>
    <p class="font-display text-lg font-semibold">Wash drying</p>
    <p class="text-center text-sm text-ink-muted">Soft edges are settling. Leave the plate undisturbed.</p>
    <code class="font-mono text-[0.65rem] text-ink-muted">studio-load-stroke</code>
  </div>
  <div class="flex cursor-progress flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-wash-blue/30 px-6 py-12" role="status" aria-busy="true" aria-live="polite">
    <div class="studio-load-bloom relative size-24 overflow-hidden rounded-full sm:size-28" aria-hidden="true">
  <span class="studio-load-bloom__a"></span>
  <span class="studio-load-bloom__b"></span>
  <span class="studio-load-bloom__c"></span>
  <span class="studio-load-bloom__drop"></span>
</div>
    <p class="font-display text-lg font-semibold">Pigment mix</p>
    <p class="text-center text-sm text-ink-muted">Blending ultramarine and ochre for the next glaze.</p>
    <code class="font-mono text-[0.65rem] text-ink-muted">studio-load-bloom</code>
  </div>
  <div class="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-wash-rose/25 px-6 py-12 md:col-span-2 lg:col-span-1" role="status" aria-busy="true" aria-live="polite">
    <div class="flex items-center gap-3">
      <svg class="size-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 1 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>
      <svg class="studio-load-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="36" height="36" fill="none" aria-hidden="true">
  <circle class="studio-load-mark__a" cx="14" cy="16" r="10" fill="var(--color-primary)" opacity="0.4"></circle>
  <circle class="studio-load-mark__b" cx="20" cy="14" r="8" fill="var(--color-secondary)" opacity="0.32"></circle>
  <circle class="studio-load-mark__c" cx="16" cy="20" r="7" fill="var(--color-accent)" opacity="0.28"></circle>
  <circle class="studio-load-mark__core" cx="12" cy="12" r="3" fill="var(--color-primary)" opacity="0.7"></circle>
</svg>
      <svg class="size-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
    </div>
    <p class="font-display text-lg font-semibold">Series sync</p>
    <p class="text-center text-sm text-ink-muted">Pulling the latest plates into your studio shelf.</p>
    <code class="font-mono text-[0.65rem] text-ink-muted">pigment mark + Lucide</code>
  </div>
  <div class="relative flex min-h-48 cursor-progress flex-col items-center justify-center gap-3 overflow-hidden rounded-box border border-ink-border/60 px-6 py-12 md:col-span-2 lg:col-span-1" role="status" aria-busy="true" aria-live="polite">
    <div class="absolute inset-0 bg-base-300/40 backdrop-blur-[1px]" aria-hidden="true"></div>
    <div class="relative z-10 flex flex-col items-center gap-3">
      <div class="studio-load-ink flex flex-col items-center gap-3" aria-hidden="true">
  <svg class="studio-load-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="56" height="56" fill="none" aria-hidden="true">
  <circle class="studio-load-mark__a" cx="14" cy="16" r="10" fill="var(--color-primary)" opacity="0.4"></circle>
  <circle class="studio-load-mark__b" cx="20" cy="14" r="8" fill="var(--color-secondary)" opacity="0.32"></circle>
  <circle class="studio-load-mark__c" cx="16" cy="20" r="7" fill="var(--color-accent)" opacity="0.28"></circle>
  <circle class="studio-load-mark__core" cx="12" cy="12" r="3" fill="var(--color-primary)" opacity="0.7"></circle>
</svg>
  <p class="studio-load-ink__word font-display text-2xl font-semibold tracking-tight sm:text-3xl">Menzies Design</p>
  <p class="label-ink">Ink soaking in</p>
</div>
      <p class="text-center text-sm text-ink-muted">Content stays in place under a light wash veil.</p>
      <code class="font-mono text-[0.65rem] text-ink-muted">studio-load-ink + overlay</code>
    </div>
  </div>
</div>`

const responsiveHtml = `<div class="flex flex-col gap-4 md:flex-row md:items-stretch">
  <div class="flex flex-1 cursor-wait items-center gap-4 rounded-box border border-ink-border/60 bg-base-100/60 px-4 py-4">
    <div class="studio-load-tip flex items-center justify-center shrink-0 scale-75" aria-hidden="true" style="--tip-w: 33px; --tip-h: 33px">
  <span class="studio-load-tip__blob"></span>
</div>
    <div class="min-w-0">
      <p class="font-medium">Thumbnail bake</p>
      <p class="text-sm text-ink-muted">Compressing preview for the shelf grid with round tip.</p>
      <code class="font-mono text-[0.65rem] text-ink-muted">studio-load-tip</code>
    </div>
  </div>
  <div class="flex flex-1 cursor-progress items-center gap-4 rounded-box border border-ink-border/60 bg-base-100/60 px-4 py-4">
    <svg class="studio-load-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="40" height="40" fill="none" aria-hidden="true">
  <circle class="studio-load-mark__a" cx="14" cy="16" r="10" fill="var(--color-primary)" opacity="0.4"></circle>
  <circle class="studio-load-mark__b" cx="20" cy="14" r="8" fill="var(--color-secondary)" opacity="0.32"></circle>
  <circle class="studio-load-mark__c" cx="16" cy="20" r="7" fill="var(--color-accent)" opacity="0.28"></circle>
  <circle class="studio-load-mark__core" cx="12" cy="12" r="3" fill="var(--color-primary)" opacity="0.7"></circle>
</svg>
    <div class="min-w-0">
      <p class="font-medium">Cloud archive</p>
      <p class="text-sm text-ink-muted">Uploading high-res scan in the background.</p>
      <code class="font-mono text-[0.65rem] text-ink-muted">studio-load-mark</code>
    </div>
  </div>
</div>`

const types = [
  { name: 'Spinner', className: 'loading-spinner' },
  { name: 'Dots', className: 'loading-dots' },
  { name: 'Ring', className: 'loading-ring' },
  { name: 'Ball', className: 'loading-ball' },
  { name: 'Bars', className: 'loading-bars' },
  { name: 'Infinity', className: 'loading-infinity' },
] as const

const sizes = [
  { name: 'XS', className: 'loading-xs' },
  { name: 'SM', className: 'loading-sm' },
  { name: 'MD', className: 'loading-md' },
  { name: 'LG', className: 'loading-lg' },
  { name: 'XL', className: 'loading-xl' },
] as const

const colors = [
  { name: 'Primary', className: 'text-primary' },
  { name: 'Secondary', className: 'text-secondary' },
  { name: 'Accent', className: 'text-accent' },
  { name: 'Neutral', className: 'text-neutral' },
  { name: 'Info', className: 'text-info' },
  { name: 'Success', className: 'text-success' },
  { name: 'Warning', className: 'text-warning' },
  { name: 'Error', className: 'text-error' },
] as const

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

export default function LoadingPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Loading
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Studio loaders built from stroke, pigment bloom, and the Menzies
          mark, plus daisyUI{' '}
          <span className="font-mono text-xs">loading</span> spinners.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="00 · Studio identity"
          title="Stroke, pigment, and logo"
          description="Custom busy states that share wash tokens with the desk"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                          <div
                            className="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-base-100/70 px-4 py-8"
                            role="status"
                            aria-busy="true"
                            aria-live="polite"
                          >
                            <BrushStrokeLoader decorative />
                            <p className="font-display text-base font-semibold">Stroke sweep</p>
                            <p className="text-center text-sm text-ink-muted">
                              A round tip draws across the paper, then
                              lifts.
                            </p>
                            <ClassLabel value="studio-load-stroke" />
                          </div>

                          <div
                            className="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-base-100/70 px-4 py-8"
                            role="status"
                            aria-busy="true"
                            aria-live="polite"
                          >
                            <BrushTipLoader decorative />
                            <p className="font-display text-base font-semibold">Tip pulse</p>
                            <p className="text-center text-sm text-ink-muted">
                              Blob size tracks desk px. Edge soft follows water and hardness.
                            </p>
                            <ClassLabel value="studio-load-tip + --brush-*" />
                          </div>

                          <div
                            className="flex cursor-progress flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-wash-blue/25 px-4 py-8"
                            role="status"
                            aria-busy="true"
                            aria-live="polite"
                          >
                            <PigmentBloomLoader decorative />
                            <p className="font-display text-base font-semibold">Wash bloom</p>
                            <p className="text-center text-sm text-ink-muted">
                              Droplet and pigment pools pulse with wash-a / wash-b / wash-c.
                            </p>
                            <ClassLabel value="studio-load-bloom + wash tokens" />
                          </div>

                          <div
                            className="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-wash-rose/20 px-4 py-8 sm:col-span-2 xl:col-span-1"
                            role="status"
                            aria-busy="true"
                            aria-live="polite"
                          >
                            <InkWordmarkLoader decorative />
                            <ClassLabel value="studio-load-ink + pigment mark" />
                          </div>
                        </div>
            
              </>
            }
            html={identityHtml}
            jsx={toJsxMarkup(identityHtml)}
          />
        
        </Section>

        <Section
          eyebrow="01 · Studio states"
          title="Busy panels that follow the desk"
          description="Full-bleed studio states"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="grid gap-4 md:grid-cols-2">
                          <div
                            className="flex min-h-52 cursor-wait flex-col items-center justify-center gap-4 rounded-box border border-ink-border/60 bg-base-100/70 px-6 py-10"
                            role="status"
                            aria-busy="true"
                            aria-live="polite"
                          >
                            <BrushStrokeLoader decorative />
                            <p className="font-display text-lg font-semibold">Laying wash</p>
                            <p className="max-w-xs text-center text-sm text-ink-muted">
                              Soft edges settling with default studio load.
                            </p>
                          </div>

                          <div
                            className="relative flex min-h-52 cursor-progress flex-col items-center justify-center gap-4 overflow-hidden rounded-box border border-ink-border/60 px-6 py-10"
                            role="status"
                            aria-busy="true"
                            aria-live="polite"
                          >
                            <div
                              className="pointer-events-none absolute inset-0 bg-wash-blue/20"
                              aria-hidden
                            />
                            <span
                              className="pointer-events-none absolute -left-8 -top-10 size-40 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-a)_75%,transparent)_0%,transparent_70%)] opacity-80 blur-2xl"
                              aria-hidden
                            />
                            <span
                              className="pointer-events-none absolute -bottom-12 -right-6 size-36 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--wash-c)_70%,transparent)_0%,transparent_70%)] opacity-70 blur-2xl"
                              aria-hidden
                            />
                            <div className="relative z-10 flex flex-col items-center gap-4">
                              <div className="flex items-center gap-4">
                                <BrushTipLoader decorative />
                                <PigmentBloomLoader decorative />
                              </div>
                              <p className="font-display text-lg font-semibold">Pigment mix</p>
                              <p className="max-w-xs text-center text-sm text-ink-muted">
                                Bloom radius follows flow and water from wash CSS vars.
                              </p>
                            </div>
                          </div>

                          <div
                            className="flex min-h-48 cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-base-200/50 px-6 py-10 md:col-span-2"
                            role="status"
                            aria-busy="true"
                            aria-live="polite"
                          >
                            <div className="flex flex-wrap items-center justify-center gap-6">
                              <PigmentMark size={64} />
                              <InkWordmarkLoader decorative />
                            </div>
                            <p className="max-w-md text-center text-sm text-ink-muted">
                              Logo soak uses the pigment mark from the favicon palette and an
                              ink-fill wordmark timed to{' '}
                              <span className="font-mono text-xs">--brush-soak-duration</span>.
                            </p>
                          </div>
                        </div>
            
              </>
            }
            html={statesHtml}
            jsx={toJsxMarkup(statesHtml)}
          />
        
        </Section>

        <Section
          eyebrow="02 · Types"
          title="daisyUI animation styles"
          description="All six daisyUI 5 loading styles with class labels"
        >
          <ShowcaseTabs
            preview={
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
                {types.map((t) => (
                  <span
                    key={t.name}
                    className={`loading ${t.className} loading-lg text-primary`}
                    aria-label={`${t.name} loading`}
                  />
                ))}
              </div>
            }
            html={typesHtml}
            jsx={toJsxMarkup(typesHtml)}
          />
        </Section>

        <Section
          eyebrow="03 · Sizes"
          title="Size scale"
          description="loading-xs through loading-xl on the default spinner"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <div className="flex flex-wrap items-end justify-center gap-6 sm:justify-start">
                {sizes.map((s) => (
                  <span
                    key={s.name}
                    className={`loading loading-spinner ${s.className} text-primary`}
                    aria-label={`${s.name} spinner`}
                  />
                ))}
              </div>
            }
            html={sizesHtml}
            jsx={toJsxMarkup(sizesHtml)}
          />
        </Section>

        <Section
          eyebrow="04 · Colors"
          title="Semantic colors"
          description="Color via text-* utilities"
        >
          <ShowcaseTabs
            preview={
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-8">
                {colors.map((c) => (
                  <span
                    key={c.name}
                    className={`loading loading-spinner loading-lg ${c.className}`}
                    aria-label={`${c.name} loading`}
                  />
                ))}
              </div>
            }
            html={colorsHtml}
            jsx={toJsxMarkup(colorsHtml)}
          />
        </Section>

        <Section
          eyebrow="05 · Types × colors"
          title="Style matrix"
          description="Each animation style across primary through error"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <div className="overflow-x-auto">
                <div className="flex min-w-[36rem] flex-col gap-5">
                  {types.map((t) => (
                    <div key={t.name}>
                      <p className="label-ink mb-3">{t.name}</p>
                      <div className="flex flex-wrap items-end gap-5">
                        {colors.map((c) => (
                          <span
                            key={`${t.name}-${c.name}`}
                            className={`loading ${t.className} loading-md ${c.className}`}
                            aria-label={`${t.name} ${c.name}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
            html={matrixHtml}
            jsx={toJsxMarkup(matrixHtml)}
          />
        </Section>

        <Section
          eyebrow="06 · In buttons"
          title="Loading button states"
          description="Busy buttons use studio marks or daisyUI loading, disabled state"
        >
          <div className="flex flex-wrap items-end gap-4">
            <ShowcaseTabs
            preview={
              <>

              <button
                              type="button"
                              className="btn cursor-wait gap-2"
                              disabled
                              aria-busy="true"
                            >
                              <span className="inline-block w-14 shrink-0" aria-hidden>
                                <BrushStrokeLoader
                                 
                                  decorative
                                  className="h-3! max-w-none"
                                />
                              </span>
                              Mixing
                            </button>
            
              </>
            }
            html={btnMixingHtml}
            jsx={toJsxMarkup(btnMixingHtml)}
          />
            <ShowcaseTabs
            preview={
              <>

              <button
                              type="button"
                              className="btn btn-primary cursor-wait gap-2"
                              disabled
                              aria-busy="true"
                            >
                              <PigmentMark size={22} className="shrink-0" />
                              Saving plate
                            </button>
            
              </>
            }
            html={btnSavingHtml}
            jsx={toJsxMarkup(btnSavingHtml)}
          />
            <ShowcaseTabs
            preview={
              <>

              <button
                              type="button"
                              className="btn btn-secondary cursor-wait gap-2"
                              disabled
                              aria-busy="true"
                            >
                              <BrushTipLoader
                               
                                decorative
                                className="scale-[0.45] origin-center"
                              />
                              Syncing
                            </button>
            
              </>
            }
            html={btnSyncingHtml}
            jsx={toJsxMarkup(btnSyncingHtml)}
          />
            <ShowcaseTabs
            preview={
              <>

              <button
                              type="button"
                              className="btn btn-accent btn-outline cursor-progress"
                              disabled
                              aria-busy="true"
                            >
                              <span className="loading loading-bars loading-sm" aria-hidden />
                              Exporting
                            </button>
            
              </>
            }
            html={btnExportHtml}
            jsx={toJsxMarkup(btnExportHtml)}
          />
            <ShowcaseTabs
            preview={
              <>

              <button
                              type="button"
                              className="btn btn-ghost btn-circle cursor-wait"
                              disabled
                              aria-busy="true"
                              aria-label="Loading"
                            >
                              <PigmentMark size={20} />
                            </button>
            
              </>
            }
            html={btnCircleHtml}
            jsx={toJsxMarkup(btnCircleHtml)}
          />
            <ShowcaseTabs
            preview={
              <>

              <button
                              type="button"
                              className="btn btn-soft btn-info cursor-progress"
                              disabled
                              aria-busy="true"
                            >
                              <span className="loading loading-infinity" aria-hidden />
                              Drying wash
                            </button>
            
              </>
            }
            html={btnDryingHtml}
            jsx={toJsxMarkup(btnDryingHtml)}
          />
          </div>
        </Section>

        <Section
          eyebrow="07 · Studio panels"
          title="Wash drying panels"
          description="Full-bleed busy states mixing studio loaders with daisyUI accents"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="grid gap-4 md:grid-cols-2">
                          <div
                            className="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-base-100/70 px-6 py-12"
                            role="status"
                            aria-busy="true"
                            aria-live="polite"
                          >
                            <BrushStrokeLoader decorative />
                            <p className="font-display text-lg font-semibold">Wash drying</p>
                            <p className="text-center text-sm text-ink-muted">
                              Soft edges are settling. Leave the plate undisturbed.
                            </p>
                            <ClassLabel value="studio-load-stroke" />
                          </div>

                          <div
                            className="flex cursor-progress flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-wash-blue/30 px-6 py-12"
                            role="status"
                            aria-busy="true"
                            aria-live="polite"
                          >
                            <PigmentBloomLoader decorative />
                            <p className="font-display text-lg font-semibold">Pigment mix</p>
                            <p className="text-center text-sm text-ink-muted">
                              Blending ultramarine and ochre for the next glaze.
                            </p>
                            <ClassLabel value="studio-load-bloom" />
                          </div>

                          <div
                            className="flex cursor-wait flex-col items-center justify-center gap-3 rounded-box border border-ink-border/60 bg-wash-rose/25 px-6 py-12 md:col-span-2 lg:col-span-1"
                            role="status"
                            aria-busy="true"
                            aria-live="polite"
                          >
                            <div className="flex items-center gap-3">
                              <Droplets className="size-5 text-accent" strokeWidth={2} aria-hidden />
                              <PigmentMark size={36} />
                              <Palette className="size-5 text-accent" strokeWidth={2} aria-hidden />
                            </div>
                            <p className="font-display text-lg font-semibold">Series sync</p>
                            <p className="text-center text-sm text-ink-muted">
                              Pulling the latest plates into your studio shelf.
                            </p>
                            <ClassLabel value="pigment mark + Lucide" />
                          </div>

                          <div
                            className="relative flex min-h-48 cursor-progress flex-col items-center justify-center gap-3 overflow-hidden rounded-box border border-ink-border/60 px-6 py-12 md:col-span-2 lg:col-span-1"
                            role="status"
                            aria-busy="true"
                            aria-live="polite"
                          >
                            <div
                              className="absolute inset-0 bg-base-300/40 backdrop-blur-[1px]"
                              aria-hidden
                            />
                            <div className="relative z-10 flex flex-col items-center gap-3">
                              <InkWordmarkLoader decorative />
                              <p className="text-center text-sm text-ink-muted">
                                Content stays in place under a light wash veil.
                              </p>
                              <ClassLabel value="studio-load-ink + overlay" />
                            </div>
                          </div>
                        </div>
            
              </>
            }
            html={panelsHtml}
            jsx={toJsxMarkup(panelsHtml)}
          />
        
        </Section>

        <Section
          eyebrow="08 · Responsive"
          title="Adaptive busy rows"
          description="Stacked on mobile, side by side from md up"
        >
          <ShowcaseTabs
            preview={
              <>

              <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
                          <div className="flex flex-1 cursor-wait items-center gap-4 rounded-box border border-ink-border/60 bg-base-100/60 px-4 py-4">
                            <BrushTipLoader
                             
                              decorative
                              className="shrink-0 scale-75"
                            />
                            <div className="min-w-0">
                              <p className="font-medium">Thumbnail bake</p>
                              <p className="text-sm text-ink-muted">
                                Compressing preview for the shelf grid with{' '}
                                round tip.
                              </p>
                              <ClassLabel value="studio-load-tip" />
                            </div>
                          </div>
                          <div className="flex flex-1 cursor-progress items-center gap-4 rounded-box border border-ink-border/60 bg-base-100/60 px-4 py-4">
                            <PigmentMark size={40} className="shrink-0" />
                            <div className="min-w-0">
                              <p className="font-medium">Cloud archive</p>
                              <p className="text-sm text-ink-muted">
                                Uploading high-res scan in the background.
                              </p>
                              <ClassLabel value="studio-load-mark" />
                            </div>
                          </div>
                        </div>
            
              </>
            }
            html={responsiveHtml}
            jsx={toJsxMarkup(responsiveHtml)}
          />
        
        </Section>
      </div>
    </>
  )
}
