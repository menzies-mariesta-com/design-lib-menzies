import { Download } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { siteFonts, type SiteFont, type SiteFontFile } from './data/site-assets'

function FontPreview({ font }: { font: SiteFont }) {
  return (
    <div className="rounded-box border border-ink-border/70 bg-base-100/80 p-4">
      <p className="label-ink text-xs">Preview</p>
      <p
        className={`${font.tailwindClass} mt-2 text-2xl font-semibold tracking-tight md:text-3xl`}
        style={{ fontFamily: font.family }}
      >
        {font.sample}
      </p>
      <p
        className="mt-2 text-sm text-ink-muted"
        style={{ fontFamily: font.family }}
      >
        ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
      </p>
    </div>
  )
}

function FontFileRow({ file }: { file: SiteFontFile }) {
  return (
    <div className="flex flex-col gap-3 rounded-box border border-ink-border/60 bg-base-100/60 p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="font-mono text-sm">{file.filename}</p>
        <p className="text-xs text-ink-muted">
          Weight {file.weight} · {file.format.toUpperCase()}
        </p>
      </div>
      <a
        href={file.url}
        download={file.filename}
        className="btn btn-outline btn-sm cursor-pointer gap-2 self-start sm:self-auto"
      >
        <Download className="size-4" aria-hidden="true" />
        Download
      </a>
    </div>
  )
}

/** Planned bento spans: one typeface per cell. */
const fontBentoLayout: Record<
  SiteFont['id'],
  { className: string; panel?: string }
> = {
  fraunces: {
    className: 'md:col-span-2',
    panel: 'wash-panel-blue',
  },
  'maple-mono': {
    className: 'md:col-span-2',
    panel: 'wash-panel-ochre',
  },
  'adwaita-sans': {
    className: 'md:col-span-2',
  },
  'adwaita-mono': {
    className: 'md:col-span-2',
    panel: 'wash-panel-rose',
  },
}

function FontCard({
  font,
  className = '',
  panel = '',
}: {
  font: SiteFont
  className?: string
  panel?: string
}) {
  return (
    <article
      className={`wash-panel wash-panel-flush paper-grain flex h-fit flex-col self-start overflow-hidden ${panel} ${className}`}
    >
      <div className="border-b border-ink-border/70 px-5 py-4">
        <p className="label-ink">{font.role}</p>
        <h2 className="font-display text-xl font-semibold">{font.name}</h2>
        <p className="mt-1 text-sm text-ink-muted">{font.usage}</p>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <FontPreview font={font} />

        <dl className="grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="label-ink text-xs">CSS variable</dt>
            <dd className="font-mono text-xs">{font.cssVariable ?? 'none'}</dd>
          </div>
          <div>
            <dt className="label-ink text-xs">Tailwind</dt>
            <dd className="font-mono text-xs">{font.tailwindClass}</dd>
          </div>
          <div>
            <dt className="label-ink text-xs">Source</dt>
            <dd className="text-ink-muted">{font.source}</dd>
          </div>
          <div>
            <dt className="label-ink text-xs">License</dt>
            <dd className="text-ink-muted">{font.license}</dd>
          </div>
        </dl>

        <div className="space-y-2">
          <p className="label-ink text-xs">Font files</p>
          {font.files.map((file) => (
            <FontFileRow key={file.filename} file={file} />
          ))}
        </div>
      </div>
    </article>
  )
}

export default function FontsPage() {
  return (
    <div className="space-y-8 soak-in">
      <header className="space-y-3">
        <p className="label-ink">Brand kit · Assets</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Fonts
        </h1>
        <p className="max-w-2xl text-sm text-ink-muted md:text-base">
          Demo typefaces. One per bento cell. Download any weight below.
        </p>
      </header>

      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-4 md:gap-4">
        {siteFonts.map((font) => {
          const layout = fontBentoLayout[font.id]
          return (
            <FontCard
              key={font.id}
              font={font}
              className={layout?.className ?? 'md:col-span-2'}
              panel={layout?.panel ?? ''}
            />
          )
        })}
      </div>
    </div>
  )
}
