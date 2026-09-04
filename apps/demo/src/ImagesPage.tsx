import { Download } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { GallerySection } from './components/GallerySection'
import { siteImages } from './data/site-assets'

function ImageCard({
  image,
}: {
  image: (typeof siteImages)[number]
}) {
  const isSvg = image.format === 'SVG'

  return (
    <article className="wash-panel wash-panel-flush paper-grain flex flex-col overflow-hidden">
      <div className="border-b border-ink-border/70 px-5 py-4">
        <p className="label-ink">{image.format}</p>
        <h3 className="font-display text-lg font-semibold">{image.name}</h3>
        <p className="mt-1 text-sm text-ink-muted">{image.usage}</p>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex min-h-40 items-center justify-center rounded-box border border-ink-border/70 bg-base-200/80 p-6">
          {isSvg ? (
            <img
              src={image.url}
              alt={image.alt}
              className={`max-h-24 max-w-full object-contain ${image.id === 'favicon' ? 'size-16' : 'h-20 w-auto'}`}
            />
          ) : (
            <img
              src={image.url}
              alt={image.alt}
              className="max-h-48 max-w-full rounded-lg object-contain shadow-md"
              width={343}
              height={361}
            />
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-sm">{image.filename}</p>
          <a
            href={image.url}
            download={image.filename}
            className="btn btn-primary btn-sm cursor-pointer gap-2 self-start sm:self-auto"
          >
            <Download className="size-4" aria-hidden="true" />
            Download
          </a>
        </div>
      </div>
    </article>
  )
}

export default function ImagesPage() {
  return (
    <div className="space-y-8 soak-in">
      <header className="space-y-3">
        <p className="label-ink">Brand kit · Assets</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Images
        </h1>
        <p className="max-w-2xl text-sm text-ink-muted md:text-base">
          Local brand artwork. Download any file below.
        </p>
      </header>

      <GallerySection
        eyebrow="Raster and vector"
        title="Brand artwork"
        description="Favicon, sprite, and hero plate"
        panel="wash-panel-ochre"
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {siteImages.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      </GallerySection>
    </div>
  )
}
