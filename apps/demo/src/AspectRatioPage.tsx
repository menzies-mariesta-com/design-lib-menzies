import { useId, useState, type ReactNode } from 'react'
import heroWash from './assets/hero.png'

const basicRatios = [
  { name: 'Square', className: 'aspect-square', hint: '1:1' },
  { name: 'Video', className: 'aspect-video', hint: '16:9' },
  { name: 'Classic', className: 'aspect-[4/3]', hint: '4:3' },
  { name: 'Portrait', className: 'aspect-[3/4]', hint: '3:4' },
  { name: 'Cinema', className: 'aspect-[21/9]', hint: '21:9' },
] as const

const paperFrames = [
  {
    name: 'Study square',
    className: 'aspect-square',
    wash: 'from-[#7aa8b8] via-[#b8dce8] to-[#eef6f9]',
    size: 'Quarter sheet',
  },
  {
    name: 'Sketch portrait',
    className: 'aspect-[3/4]',
    wash: 'from-[#c4a06a] via-[#e8d2a8] to-[#f8f0e0]',
    size: 'A5 portrait',
  },
  {
    name: 'Wash landscape',
    className: 'aspect-[4/3]',
    wash: 'from-[#b87870] via-[#dcb0a8] to-[#f4e4e0]',
    size: 'A4 landscape',
  },
  {
    name: 'Panorama strip',
    className: 'aspect-[21/9]',
    wash: 'from-[#6a9e8a] via-[#a8d4c4] to-[#e8f4ef]',
    size: 'Wide crop',
  },
] as const

const studioAspects = [
  { id: 'square', label: 'Square', className: 'aspect-square' },
  { id: 'video', label: 'Video', className: 'aspect-video' },
  { id: 'classic', label: '4:3', className: 'aspect-[4/3]' },
  { id: 'portrait', label: '3:4', className: 'aspect-[3/4]' },
  { id: 'cinema', label: '21:9', className: 'aspect-[21/9]' },
] as const

type StudioAspectId = (typeof studioAspects)[number]['id']

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

/** Soft watercolor plate: CSS wash only, no remote image URLs. */
function WashPlate({
  wash,
  label,
  caption,
}: {
  wash: string
  label: string
  caption?: string
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative grid h-full w-full place-content-center bg-gradient-to-br ${wash}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 30% 35%, rgba(255,255,255,0.55) 0%, transparent 55%), radial-gradient(ellipse at 72% 68%, rgba(255,255,255,0.3) 0%, transparent 48%)',
        }}
        aria-hidden="true"
      />
      <div className="relative px-3 text-center">
        <p className="font-display text-lg font-semibold tracking-tight sm:text-xl">
          {label}
        </p>
        {caption ? (
          <p className="mt-1 text-[0.65rem] uppercase tracking-widest text-base-content/55">
            {caption}
          </p>
        ) : null}
      </div>
    </div>
  )
}

function AspectFrame({
  aspect,
  children,
  className = '',
}: {
  aspect: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`w-full overflow-hidden rounded-lg border border-ink-border/70 bg-base-200/40 ${aspect} ${className}`}
    >
      {children}
    </div>
  )
}

export default function AspectRatioPage() {
  const [previewAspect, setPreviewAspect] = useState<StudioAspectId>('video')
  const previewGroupId = useId()
  const activePreview =
    studioAspects.find((a) => a.id === previewAspect) ?? studioAspects[1]

  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Aspect ratio
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Tailwind <span className="font-mono text-xs">aspect-*</span> frames for
          washes, figures, and crop previews on watercolor paper.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Common ratios"
          description="Built-in and arbitrary aspect utilities with class labels on each plate."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {basicRatios.map((r) => (
              <Sample key={r.className} label={r.className}>
                <AspectFrame aspect={r.className} className="cursor-default">
                  <WashPlate
                    wash="from-[#7aa8b8] via-[#b8dce8] to-[#eef6f9]"
                    label={r.name}
                    caption={r.hint}
                  />
                </AspectFrame>
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="02 · Cards / figures"
          title="In cards and figures"
          description="Aspect frames inside daisyUI cards and figure markup, with local assets only."
          panel="wash-panel-ochre"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <Sample label="card + figure + aspect-video">
              <div className="card card-border bg-base-100 cursor-default shadow-sm">
                <figure className="aspect-video w-full overflow-hidden">
                  <img
                    src={heroWash}
                    alt="Studio watercolor wash cropped to video aspect"
                    className="h-full w-full object-cover"
                  />
                </figure>
                <div className="card-body gap-1 p-4">
                  <h3 className="card-title font-display text-lg">Wet wash plate</h3>
                  <p className="text-sm text-ink-muted">
                    Local hero asset framed at 16:9 inside a card figure.
                  </p>
                </div>
              </div>
            </Sample>

            <Sample label="card + aspect-[4/3] wash plate">
              <div className="card card-border bg-base-100 cursor-default shadow-sm">
                <figure className="aspect-[4/3] w-full overflow-hidden">
                  <WashPlate
                    wash="from-[#c4a06a] via-[#e8d2a8] to-[#f8f0e0]"
                    label="Ochre bloom"
                    caption="4:3 figure"
                  />
                </figure>
                <div className="card-body gap-1 p-4">
                  <h3 className="card-title font-display text-lg">Pigment card</h3>
                  <p className="text-sm text-ink-muted">
                    CSS wash only. No remote image URL.
                  </p>
                </div>
              </div>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="03 · Object-fit"
          title="Cover and contain"
          description="Same aspect box, different object-fit behavior on the local studio photo."
          panel="wash-panel-rose"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Sample label="aspect-square + object-cover">
              <AspectFrame aspect="aspect-square" className="mx-auto max-w-xs cursor-default">
                <img
                  src={heroWash}
                  alt="Studio wash cropped with object-cover"
                  className="h-full w-full object-cover"
                />
              </AspectFrame>
            </Sample>
            <Sample label="aspect-square + object-contain">
              <AspectFrame aspect="aspect-square" className="mx-auto max-w-xs cursor-default bg-base-300/50">
                <img
                  src={heroWash}
                  alt="Studio wash letterboxed with object-contain"
                  className="h-full w-full object-contain"
                />
              </AspectFrame>
            </Sample>
            <Sample label="aspect-video + object-cover">
              <AspectFrame aspect="aspect-video" className="cursor-default">
                <img
                  src={heroWash}
                  alt="Studio wash cover-cropped to video frame"
                  className="h-full w-full object-cover"
                />
              </AspectFrame>
            </Sample>
            <Sample label="aspect-[3/4] + object-contain">
              <AspectFrame
                aspect="aspect-[3/4]"
                className="mx-auto max-w-[14rem] cursor-default bg-base-300/50"
              >
                <img
                  src={heroWash}
                  alt="Studio wash contained in a portrait frame"
                  className="h-full w-full object-contain"
                />
              </AspectFrame>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="04 · Studio"
          title="Paper sizes and crop frames"
          description="Watercolor paper proportions as crop frames for study, sketch, and panorama work."
          panel="wash-panel-blue"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {paperFrames.map((frame) => (
              <Sample key={frame.name} label={frame.className}>
                <AspectFrame aspect={frame.className} className="cursor-default">
                  <WashPlate
                    wash={frame.wash}
                    label={frame.name}
                    caption={frame.size}
                  />
                </AspectFrame>
                <p className="text-xs text-ink-muted">{frame.size}</p>
              </Sample>
            ))}
          </div>

          <div className="mt-8 border-t border-ink-border/60 pt-6">
            <p className="label-ink mb-3">Crop matte</p>
            <Sample label="aspect-[4/3] + inset matte + object-cover">
              <div className="mx-auto max-w-md cursor-default rounded-lg border border-ink-border/80 bg-base-200/60 p-3 sm:p-4">
                <div className="aspect-[4/3] overflow-hidden rounded-md border border-base-content/10">
                  <img
                    src={heroWash}
                    alt="Studio wash inside a paper crop matte"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="05 · Responsive"
          title="Breakpoint aspects"
          description="One frame that shifts ratio by viewport: square on mobile, video from md up."
        >
          <Sample label="aspect-square md:aspect-video">
            <AspectFrame
              aspect="aspect-square md:aspect-video"
              className="cursor-default"
            >
              <WashPlate
                wash="from-[#8a7aa8] via-[#c4b8d8] to-[#f0ecf6]"
                label="Responsive frame"
                caption="square → video"
              />
            </AspectFrame>
          </Sample>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Sample label="aspect-[3/4] sm:aspect-[4/3]">
              <AspectFrame
                aspect="aspect-[3/4] sm:aspect-[4/3]"
                className="cursor-default"
              >
                <WashPlate
                  wash="from-[#b87870] via-[#dcb0a8] to-[#f4e4e0]"
                  label="Portrait to landscape"
                  caption="3:4 → 4:3"
                />
              </AspectFrame>
            </Sample>
            <Sample label="aspect-video lg:aspect-[21/9]">
              <AspectFrame
                aspect="aspect-video lg:aspect-[21/9]"
                className="cursor-default"
              >
                <WashPlate
                  wash="from-[#6a9e8a] via-[#a8d4c4] to-[#e8f4ef]"
                  label="Wide at desktop"
                  caption="16:9 → 21:9"
                />
              </AspectFrame>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="06 · Interactive"
          title="Toggle preview aspect"
          description="Switch the preview frame among common studio ratios."
          panel="wash-panel-ochre"
        >
          <div className="flex flex-col gap-5">
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-labelledby={`${previewGroupId}-label`}
            >
              <span id={`${previewGroupId}-label`} className="sr-only">
                Preview aspect ratio
              </span>
              {studioAspects.map((opt) => {
                const selected = opt.id === previewAspect
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`btn btn-sm cursor-pointer ${
                      selected ? 'btn-primary' : 'btn-ghost'
                    }`}
                    aria-pressed={selected}
                    onClick={() => setPreviewAspect(opt.id)}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>

            <Sample label={activePreview.className}>
              <AspectFrame
                aspect={activePreview.className}
                className="mx-auto max-w-2xl cursor-default transition-[aspect-ratio] duration-300"
              >
                <img
                  src={heroWash}
                  alt={`Studio wash preview at ${activePreview.label} aspect`}
                  className="h-full w-full object-cover"
                />
              </AspectFrame>
            </Sample>
          </div>
        </Section>
      </div>
    </>
  )
}
