import { Shirt } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { WashUiBrand } from '@menzies-mariesta-com/menzies-design-wash-ui'
import type { AppPage } from './nav'
import StoreShowcaseCard from './StoreShowcaseCard'
import hoodieFront from './assets/store/hoodie-front.png'
import hoodieBack from './assets/store/hoodie-back.png'

type StoreMerchPageProps = {
  onNavigate: (page: AppPage) => void
}

const HOODIE_SLIDES = [
  {
    id: 'store-merch-slide-1',
    src: hoodieFront,
    alt: 'Wash UI hoodie front: oversized favicon mark on the chest',
  },
  {
    id: 'store-merch-slide-2',
    src: hoodieBack,
    alt: 'Wash UI hoodie back: favicon mark and Fraunces Wash UI wordmark',
  },
] as const

function MerchScreenshot({
  src,
  alt,
  size = 'dialog',
}: {
  src: string
  alt: string
  size?: 'cover' | 'dialog'
}) {
  const sizeClass =
    size === 'cover'
      ? 'aspect-[16/10] min-h-56 max-h-72 sm:min-h-64 sm:max-h-80'
      : 'max-h-[28rem]'

  return (
    <img
      src={src}
      alt={alt}
      width={964}
      height={960}
      className={`block w-full bg-base-200 object-contain object-center ${sizeClass}`}
      loading="lazy"
      decoding="async"
    />
  )
}

/** daisyUI carousel (next/prev), same pattern as Store Page docs gallery. */
function MerchDialogGallery() {
  const n = HOODIE_SLIDES.length

  return (
    <div className="carousel w-full">
      {HOODIE_SLIDES.map((slide, index) => {
        const prev = index === 0 ? n : index
        const next = index === n - 1 ? 1 : index + 2
        return (
          <div
            key={slide.id}
            id={slide.id}
            className="carousel-item relative w-full"
          >
            <MerchScreenshot src={slide.src} alt={slide.alt} />
            <div className="absolute top-1/2 right-5 left-5 flex -translate-y-1/2 transform justify-between">
              <a
                href={`#store-merch-slide-${prev}`}
                className="btn btn-circle cursor-pointer"
                aria-label="Previous slide"
              >
                ❮
              </a>
              <a
                href={`#store-merch-slide-${next}`}
                className="btn btn-circle cursor-pointer"
                aria-label="Next slide"
              >
                ❯
              </a>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function StoreMerchPage(_props: StoreMerchPageProps) {
  return (
    <div className="space-y-6">
      <header className="soak-in">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-base-content md:text-4xl">
          Merch
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base">
          Studio hoodies for <WashUiBrand as="span" />. Front and back photos
          from the upcoming embroidery drop.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="badge badge-ghost gap-1.5 px-3 py-3">
            <Shirt className="size-3.5" strokeWidth={2} aria-hidden />
            Embroidery hoodie
          </span>
          <span className="badge badge-warning badge-outline px-3 py-3">
            Coming soon
          </span>
        </div>
      </header>

      <section
        aria-labelledby="store-merch-showcase-heading"
        className="soak-in soak-delay-1"
      >
        <h2 id="store-merch-showcase-heading" className="sr-only">
          Wash UI hoodie showcase
        </h2>
        <StoreShowcaseCard
          title="Wash UI Hoodie"
          comingSoon
          cover={
            <MerchScreenshot
              src={hoodieFront}
              alt="Wash UI hoodie cover: front with oversized favicon mark on the chest"
              size="cover"
            />
          }
          dialogPreview={<MerchDialogGallery />}
        />
      </section>
    </div>
  )
}
