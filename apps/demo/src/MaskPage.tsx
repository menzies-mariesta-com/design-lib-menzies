import type { ReactNode } from 'react'
import heroWash from './assets/hero.png'
import { ShowcaseTabs } from './components/ShowcaseTabs'

const shapes = [
  { name: 'Squircle', className: 'mask-squircle' },
  { name: 'Heart', className: 'mask-heart' },
  { name: 'Hexagon', className: 'mask-hexagon' },
  { name: 'Hexagon 2', className: 'mask-hexagon-2' },
  { name: 'Decagon', className: 'mask-decagon' },
  { name: 'Pentagon', className: 'mask-pentagon' },
  { name: 'Diamond', className: 'mask-diamond' },
  { name: 'Square', className: 'mask-square' },
  { name: 'Circle', className: 'mask-circle' },
  { name: 'Star', className: 'mask-star' },
  { name: 'Star 2', className: 'mask-star-2' },
  { name: 'Triangle', className: 'mask-triangle' },
  { name: 'Triangle 2', className: 'mask-triangle-2' },
  { name: 'Triangle 3', className: 'mask-triangle-3' },
  { name: 'Triangle 4', className: 'mask-triangle-4' },
] as const

const sizes = [
  { name: 'XL', className: 'h-32 w-32' },
  { name: 'LG', className: 'h-24 w-24' },
  { name: 'MD', className: 'h-16 w-16' },
  { name: 'SM', className: 'h-12 w-12' },
  { name: 'XS', className: 'h-8 w-8' },
] as const

const studioPlates = [
  {
    name: 'Cerulean wash',
    shape: 'mask-squircle',
    wash: 'from-[#7aa8b8] via-[#b8dce8] to-[#eef6f9]',
    size: 'h-28 w-28 sm:h-32 sm:w-32',
  },
  {
    name: 'Ochre bloom',
    shape: 'mask-hexagon',
    wash: 'from-[#c4a06a] via-[#e8d2a8] to-[#f8f0e0]',
    size: 'h-28 w-28 sm:h-32 sm:w-32',
  },
  {
    name: 'Rose lake',
    shape: 'mask-heart',
    wash: 'from-[#b87870] via-[#dcb0a8] to-[#f4e4e0]',
    size: 'h-28 w-28 sm:h-32 sm:w-32',
  },
  {
    name: 'Ink star',
    shape: 'mask-star-2',
    wash: 'from-base-content/50 via-base-300 to-base-100',
    size: 'h-28 w-28 sm:h-32 sm:w-32',
  },
  {
    name: 'Jade diamond',
    shape: 'mask-diamond',
    wash: 'from-[#6a9e8a] via-[#a8d4c4] to-[#e8f4ef]',
    size: 'h-28 w-28 sm:h-32 sm:w-32',
  },
  {
    name: 'Violet plate',
    shape: 'mask-pentagon',
    wash: 'from-[#8a7aa8] via-[#c4b8d8] to-[#f0ecf6]',
    size: 'h-28 w-28 sm:h-32 sm:w-32',
  },
] as const

const shapeWashes = [
  'from-[#7aa8b8] via-[#b8dce8] to-[#eef6f9]',
  'from-[#c4a06a] via-[#e8d2a8] to-[#f8f0e0]',
  'from-[#b87870] via-[#dcb0a8] to-[#f4e4e0]',
  'from-[#6a9e8a] via-[#a8d4c4] to-[#e8f4ef]',
  'from-[#8a7aa8] via-[#c4b8d8] to-[#f0ecf6]',
  'from-base-content/45 via-base-300 to-base-100',
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
    <article className={`wash-panel paper-grain soak-in ${panel}`}>
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
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

/** CSS pigment wash cropped by a daisyUI mask. No remote image URLs. */
function WashMask({
  shape,
  size = 'h-24 w-24',
  wash,
  label,
}: {
  shape: string
  size?: string
  wash: string
  label: string
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`mask ${shape} ${size} bg-gradient-to-br ${wash}`}
    >
      <span className="sr-only">{label}</span>
    </div>
  )
}

function GrainWash({
  shape,
  size,
  wash,
  label,
}: {
  shape: string
  size: string
  wash: string
  label: string
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`mask ${shape} ${size} relative bg-gradient-to-br ${wash}`}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 30% 35%, rgba(255,255,255,0.55) 0%, transparent 55%), radial-gradient(ellipse at 72% 68%, rgba(255,255,255,0.3) 0%, transparent 48%)',
        }}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}

export default function MaskPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Mask
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">mask</span> crops washes
          and figures into common shapes. Pigment plates use CSS gradients only.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Shapes"
          title="Shape masks"
          description="Every style class: squircle through triangle-4, on soft studio washes."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {shapes.map((s, i) => (
                    <Sample key={s.className} label={`mask ${s.className}`}>
                      <WashMask
                        shape={s.className}
                        wash={shapeWashes[i % shapeWashes.length]}
                        label={`${s.name} mask over pigment wash`}
                      />
                    </Sample>
                  ))}
                </div>
              </>
            }
            html={'<div class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">\n  <div role="img" aria-label="Squircle mask over pigment wash" class="mask mask-squircle h-24 w-24 bg-gradient-to-br from-[#7aa8b8] via-[#b8dce8] to-[#eef6f9]"></div>\n  <div role="img" aria-label="Heart mask over pigment wash" class="mask mask-heart h-24 w-24 bg-gradient-to-br from-[#c4a06a] via-[#e8d2a8] to-[#f8f0e0]"></div>\n  <!-- more shapes -->\n</div>'}
            jsx={'<div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">\n  {shapes.map((s, i) => (\n    <div\n      key={s.className}\n      role="img"\n      aria-label={`${s.name} mask over pigment wash`}\n      className={`mask ${s.className} h-24 w-24 bg-gradient-to-br ${shapeWashes[i % shapeWashes.length]}`}\n    />\n  ))}\n</div>'}
          />
        </Section>

        <Section
          eyebrow="02 · Half masks"
          title="Half crop"
          description="mask-half-1 and mask-half-2 crop the first or second half of a shape."
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-col gap-10">
                  <div className="flex flex-wrap items-end justify-center gap-8 sm:gap-10">
                    <Sample label="mask mask-half-1 mask-heart">
                      <WashMask
                        shape="mask-half-1 mask-heart"
                        wash="from-[#b87870] via-[#dcb0a8] to-[#f4e4e0]"
                        label="Heart mask, first half"
                      />
                    </Sample>
                    <Sample label="mask mask-half-2 mask-heart">
                      <WashMask
                        shape="mask-half-2 mask-heart"
                        wash="from-[#7aa8b8] via-[#b8dce8] to-[#eef6f9]"
                        label="Heart mask, second half"
                      />
                    </Sample>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <p className="text-sm text-ink-muted">
                      Paired halves form one figure with two washes
                    </p>
                    <div className="flex items-center justify-center">
                      <WashMask
                        shape="mask-half-1 mask-hexagon"
                        size="h-28 w-28"
                        wash="from-[#c4a06a] via-[#e8d2a8] to-[#f8f0e0]"
                        label="Hexagon half one, ochre wash"
                      />
                      <WashMask
                        shape="mask-half-2 mask-hexagon"
                        size="h-28 w-28"
                        wash="from-[#6a9e8a] via-[#a8d4c4] to-[#e8f4ef]"
                        label="Hexagon half two, jade wash"
                      />
                    </div>
                    <ClassLabel value="mask-half-1 + mask-half-2 mask-hexagon" />
                  </div>

                  <div className="flex flex-wrap items-end justify-center gap-8">
                    <Sample label="mask mask-half-1 mask-star">
                      <WashMask
                        shape="mask-half-1 mask-star"
                        wash="from-[#8a7aa8] via-[#c4b8d8] to-[#f0ecf6]"
                        label="Star mask, first half"
                      />
                    </Sample>
                    <Sample label="mask mask-half-2 mask-star">
                      <WashMask
                        shape="mask-half-2 mask-star"
                        wash="from-base-content/50 via-base-300 to-base-100"
                        label="Star mask, second half"
                      />
                    </Sample>
                  </div>
                </div>
              </>
            }
            html={'<div role="img" aria-label="Heart mask, first half" class="mask mask-half-1 mask-heart h-24 w-24 bg-gradient-to-br from-[#b87870] via-[#dcb0a8] to-[#f4e4e0]"></div>\n<div role="img" aria-label="Heart mask, second half" class="mask mask-half-2 mask-heart h-24 w-24 bg-gradient-to-br from-[#7aa8b8] via-[#b8dce8] to-[#eef6f9]"></div>\n<div role="img" aria-label="Hexagon half one" class="mask mask-half-1 mask-hexagon h-28 w-28 bg-gradient-to-br from-[#c4a06a] via-[#e8d2a8] to-[#f8f0e0]"></div>\n<div role="img" aria-label="Hexagon half two" class="mask mask-half-2 mask-hexagon h-28 w-28 bg-gradient-to-br from-[#6a9e8a] via-[#a8d4c4] to-[#e8f4ef]"></div>'}
            jsx={'<div\n  role="img"\n  aria-label="Heart mask, first half"\n  className="mask mask-half-1 mask-heart h-24 w-24 bg-gradient-to-br from-[#b87870] via-[#dcb0a8] to-[#f4e4e0]"\n/>\n<div\n  role="img"\n  aria-label="Heart mask, second half"\n  className="mask mask-half-2 mask-heart h-24 w-24 bg-gradient-to-br from-[#7aa8b8] via-[#b8dce8] to-[#eef6f9]"\n/>\n<div\n  role="img"\n  aria-label="Hexagon half one, ochre wash"\n  className="mask mask-half-1 mask-hexagon h-28 w-28 bg-gradient-to-br from-[#c4a06a] via-[#e8d2a8] to-[#f8f0e0]"\n/>\n<div\n  role="img"\n  aria-label="Hexagon half two, jade wash"\n  className="mask mask-half-2 mask-hexagon h-28 w-28 bg-gradient-to-br from-[#6a9e8a] via-[#a8d4c4] to-[#e8f4ef]"\n/>'}
          />
        </Section>

        <Section
          eyebrow="03 · Sizes"
          title="Custom widths"
          description="Size with Tailwind w-* and h-* on the masked element."
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="flex flex-wrap items-end justify-center gap-6 sm:gap-8">
                  {sizes.map((s, i) => (
                    <Sample
                      key={s.name}
                      label={`mask mask-squircle ${s.className}`}
                    >
                      <WashMask
                        shape="mask-squircle"
                        size={s.className}
                        wash={shapeWashes[i % shapeWashes.length]}
                        label={`Squircle mask, ${s.name} size`}
                      />
                    </Sample>
                  ))}
                </div>
              </>
            }
            html={'<div role="img" aria-label="Squircle mask, XL size" class="mask mask-squircle h-32 w-32 bg-gradient-to-br from-[#7aa8b8] via-[#b8dce8] to-[#eef6f9]"></div>\n<div role="img" aria-label="Squircle mask, LG size" class="mask mask-squircle h-24 w-24 bg-gradient-to-br from-[#c4a06a] via-[#e8d2a8] to-[#f8f0e0]"></div>\n<!-- MD, SM, XS -->'}
            jsx={'{sizes.map((s, i) => (\n  <div\n    key={s.name}\n    role="img"\n    aria-label={`Squircle mask, ${s.name} size`}\n    className={`mask mask-squircle ${s.className} bg-gradient-to-br ${shapeWashes[i % shapeWashes.length]}`}\n  />\n))}'}
          />
        </Section>

        <Section
          eyebrow="04 · Studio"
          title="Pigment wash plates"
          description="Local CSS washes with soft grain, cropped by studio-friendly shapes."
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-3">
                  {studioPlates.map((plate) => (
                    <Sample key={plate.name} label={`mask ${plate.shape}`}>
                      <div className="flex flex-col items-center gap-2">
                        <GrainWash
                          shape={plate.shape}
                          size={plate.size}
                          wash={plate.wash}
                          label={`${plate.name} pigment plate`}
                        />
                        <span className="text-xs text-ink-muted">{plate.name}</span>
                      </div>
                    </Sample>
                  ))}
                </div>

                <div className="mt-8 flex flex-col items-center gap-3 border-t border-ink-border/60 pt-8">
                  <p className="text-sm text-ink-muted">
                    Local asset cropped with mask-circle
                  </p>
                  <Sample label="mask mask-circle">
                    <img
                      src={heroWash}
                      alt="Studio watercolor hero crop in a circle mask"
                      className="mask mask-circle h-28 w-28 object-cover sm:h-32 sm:w-32"
                    />
                  </Sample>
                </div>
              </>
            }
            html={'<div role="img" aria-label="Cerulean wash pigment plate" class="mask mask-squircle h-28 w-28 sm:h-32 sm:w-32 relative bg-gradient-to-br from-[#7aa8b8] via-[#b8dce8] to-[#eef6f9]"></div>\n<!-- more studio plates -->\n<img src="/hero.png" alt="Studio watercolor hero crop in a circle mask" class="mask mask-circle h-28 w-28 object-cover sm:h-32 sm:w-32" />'}
            jsx={'{studioPlates.map((plate) => (\n  <div\n    key={plate.name}\n    role="img"\n    aria-label={`${plate.name} pigment plate`}\n    className={`mask ${plate.shape} ${plate.size} relative bg-gradient-to-br ${plate.wash}`}\n  />\n))}\n<img\n  src={heroWash}\n  alt="Studio watercolor hero crop in a circle mask"\n  className="mask mask-circle h-28 w-28 object-cover sm:h-32 sm:w-32"\n/>'}
          />
        </Section>
      </div>
    </>
  )
}
