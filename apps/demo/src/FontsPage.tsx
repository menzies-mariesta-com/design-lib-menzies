import { Download } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { siteFonts, type SiteFont, type SiteFontFile } from './data/site-assets'

function FontPreview({
  font,
  hero = false,
}: {
  font: SiteFont
  hero?: boolean
}) {
  return (
    <div className="rounded-box border border-ink-border/70 bg-base-100/80 p-4">
      <p className="label-ink text-xs">Preview</p>
      <p
        className={`${font.tailwindClass} mt-2 font-semibold tracking-tight ${
          hero ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'
        }`}
        style={{ fontFamily: font.family }}
      >
        {font.sample}
      </p>
      <p
        className={`mt-2 text-ink-muted ${hero ? 'text-base' : 'text-sm'}`}
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
        <p className="truncate font-mono text-sm">{file.filename}</p>
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

/**
 * Asymmetric bento on md+:
 * [ Fraunces 2×2 ] [ Maple Mono 2×1 ]
 * [               ] [ Adwaita Sans ] [ Adwaita Mono ]
 */
const fontBentoLayout: Record<
  SiteFont['id'],
  { className: string; panel?: string; hero?: boolean }
> = {
  fraunces: {
    className: 'md:col-span-2 md:row-span-2',
    panel: 'wash-panel-blue',
    hero: true,
  },
  'maple-mono': {
    className: 'md:col-span-2',
    panel: 'wash-panel-ochre',
  },
  'adwaita-sans': {
    className: 'md:col-span-1',
  },
  'adwaita-mono': {
    className: 'md:col-span-1',
    panel: 'wash-panel-rose',
  },
}

function FontCard({
  font,
  className = '',
  panel = '',
  hero = false,
}: {
  font: SiteFont
  className?: string
  panel?: string
  hero?: boolean
}) {
  return (
    <article
      className={`wash-panel wash-panel-flush paper-grain flex h-full min-h-0 flex-col overflow-hidden ${panel} ${className}`}
    >
      <div className="border-b border-ink-border/70 px-5 py-4">
        <p className="label-ink">{font.role}</p>
        <h2
          className={`font-display font-semibold ${
            hero ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}
        >
          {font.name}
        </h2>
        <p className="mt-1 text-sm text-ink-muted">{font.usage}</p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 p-5">
        <FontPreview font={font} hero={hero} />

        <dl
          className={`grid gap-2 text-sm ${
            hero ? 'sm:grid-cols-2' : 'grid-cols-1'
          }`}
        >
          <div>
            <dt className="label-ink text-xs">CSS variable</dt>
            <dd className="break-all font-mono text-xs">
              {font.cssVariable ?? 'none'}
            </dd>
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

        <div className="mt-auto space-y-2">
          <p className="label-ink text-xs">Font files</p>
          <div
            className={
              hero
                ? 'grid gap-2 sm:grid-cols-1'
                : 'max-h-48 space-y-2 overflow-y-auto pr-1'
            }
          >
            {font.files.map((file) => (
              <FontFileRow key={file.filename} file={file} />
            ))}
          </div>
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
          Demo typefaces in a planned bento: Fraunces as the hero tile, Maple
          Mono beside it, Adwaita faces as the smaller plates.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2 md:gap-4">
        {siteFonts.map((font) => {
          const layout = fontBentoLayout[font.id]
          return (
            <FontCard
              key={font.id}
              font={font}
              className={layout?.className ?? 'md:col-span-1'}
              panel={layout?.panel ?? ''}
              hero={layout?.hero ?? false}
            />
          )
        })}
      </div>
    </div>
  )
}
