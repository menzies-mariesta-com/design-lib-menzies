import {
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from 'react'
import { X } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

const colors = [
  { name: 'Default', className: '' },
  { name: 'Ghost', className: 'file-input-ghost' },
  { name: 'Neutral', className: 'file-input-neutral' },
  { name: 'Primary', className: 'file-input-primary' },
  { name: 'Secondary', className: 'file-input-secondary' },
  { name: 'Accent', className: 'file-input-accent' },
  { name: 'Info', className: 'file-input-info' },
  { name: 'Success', className: 'file-input-success' },
  { name: 'Warning', className: 'file-input-warning' },
  { name: 'Error', className: 'file-input-error' },
] as const

const sizes = [
  { name: 'XS', className: 'file-input-xs' },
  { name: 'SM', className: 'file-input-sm' },
  { name: 'MD', className: 'file-input-md' },
  { name: 'LG', className: 'file-input-lg' },
  { name: 'XL', className: 'file-input-xl' },
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
    <code className="font-mono text-[0.65rem] text-ink-muted">
      {value || 'file-input'}
    </code>
  )
}

function RequiredMark() {
  return (
    <span className="text-error align-top text-sm leading-none" aria-hidden="true">
      *
    </span>
  )
}

function fileNames(list: FileList | null): string {
  if (!list || list.length === 0) return ''
  return Array.from(list)
    .map((f) => f.name)
    .join(', ')
}

function StudioUpload() {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [names, setNames] = useState('')

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setNames(fileNames(e.target.files))
  }

  function clearSelection() {
    if (inputRef.current) inputRef.current.value = ''
    setNames('')
  }

  return (
    <fieldset className="fieldset max-w-lg rounded-box border border-ink-border bg-base-100/80 p-4">
      <legend className="fieldset-legend">Studio upload</legend>
      <label className="label" htmlFor={inputId}>
        <span className="label-text">
          Watercolor scan
          <RequiredMark />
        </span>
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept="image/*,.pdf"
          required
          className="file-input file-input-primary w-full max-w-full cursor-pointer sm:min-w-0 sm:flex-1"
          onChange={onChange}
        />
        <div className="tooltip tooltip-error tooltip-left" data-tip="Clear file">
          <button
            type="button"
            className={`btn btn-ghost btn-square btn-error ${names ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            aria-label="Clear file"
            disabled={!names}
            onClick={clearSelection}
          >
            <X className="size-4" strokeWidth={2} />
          </button>
        </div>
      </div>
      <p className="label mt-1">
        {names ? (
          <span className="text-base-content">Selected: {names}</span>
        ) : (
          <span>Reference photo or scan. PNG, JPEG, or PDF.</span>
        )}
      </p>
      <ClassLabel value="file-input file-input-primary + required" />
    </fieldset>
  )
}

function MultipleDemo() {
  const inputId = useId()
  const [names, setNames] = useState('')

  return (
    <div className="flex max-w-lg flex-col gap-2">
      <label className="label" htmlFor={inputId}>
        <span className="label-text">Plate references</span>
      </label>
      <input
        id={inputId}
        type="file"
        multiple
        accept="image/*"
        className="file-input file-input-secondary w-full max-w-full cursor-pointer"
        onChange={(e) => setNames(fileNames(e.target.files))}
      />
      <p className="text-sm text-ink-muted">
        {names ? `Selected: ${names}` : 'Choose one or more images.'}
      </p>
      <ClassLabel value='file-input multiple' />
    </div>
  )
}

export default function FileInputPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          File input
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">file-input</span> styles
          for scans, references, and studio uploads on watercolor paper.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Default file input"
          description="Plain file picker with the base file-input class."
        >
          <div className="flex max-w-md flex-col gap-2">
            <input
              type="file"
              className="file-input w-full max-w-full cursor-pointer border-ink-border"
              aria-label="Default file input"
            />
            <ClassLabel value="file-input" />
          </div>
        </Section>

        <Section
          eyebrow="02 · Sizes"
          title="Size scale"
          description="From compact pickers to XL."
          panel="wash-panel-ochre"
        >
          <div className="flex max-w-lg flex-col gap-4">
            {sizes.map((s) => (
              <div key={s.name} className="flex flex-col gap-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <span className="label-ink w-8 shrink-0">{s.name}</span>
                  <input
                    type="file"
                    className={`file-input file-input-primary w-full max-w-full cursor-pointer ${s.className}`}
                    aria-label={`${s.name} file input`}
                  />
                </div>
                <ClassLabel value={`file-input ${s.className}`} />
              </div>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="03 · Colors"
          title="Semantic colors"
          description="Ghost plus neutral through error accents."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {colors.map((c) => (
              <div key={c.name} className="flex min-w-0 flex-col gap-2">
                <input
                  type="file"
                  className={`file-input w-full max-w-full cursor-pointer ${c.className}`}
                  aria-label={`${c.name} file input`}
                />
                <ClassLabel
                  value={
                    c.className ? `file-input ${c.className}` : 'file-input'
                  }
                />
              </div>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="04 · Variants"
          title="Bordered and ghost"
          description="Default bordered control beside the ghost style."
          panel="wash-panel-rose"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-2">
              <input
                type="file"
                className="file-input w-full max-w-full cursor-pointer border-ink-border"
                aria-label="Bordered file input"
              />
              <ClassLabel value="file-input (bordered default)" />
            </div>
            <div className="flex min-w-0 flex-col gap-2">
              <input
                type="file"
                className="file-input file-input-ghost w-full max-w-full cursor-pointer"
                aria-label="Ghost file input"
              />
              <ClassLabel value="file-input file-input-ghost" />
            </div>
          </div>
        </Section>

        <Section
          eyebrow="05 · Disabled"
          title="Disabled state"
          description="Non-interactive picker for locked uploads."
        >
          <div className="flex max-w-md flex-col gap-2">
            <input
              type="file"
              className="file-input w-full max-w-full cursor-not-allowed"
              disabled
              aria-label="Disabled file input"
            />
            <ClassLabel value="file-input disabled" />
          </div>
        </Section>

        <Section
          eyebrow="06 · Studio"
          title="Watercolor scan upload"
          description="Required reference upload with selected filename and clear action."
          panel="wash-panel-ochre"
        >
          <StudioUpload />
        </Section>

        <Section
          eyebrow="07 · Multiple"
          title="Multiple files"
          description="HTML multiple attribute for batch reference photos."
        >
          <MultipleDemo />
        </Section>

        <Section
          eyebrow="08 · Responsive"
          title="Fluid width"
          description="Full-width on small screens, capped on larger viewports."
          panel="wash-panel-rose"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="fi-responsive">
                <span className="label-text">Series cover</span>
              </label>
              <input
                id="fi-responsive"
                type="file"
                accept="image/*"
                className="file-input file-input-accent w-full max-w-full cursor-pointer md:max-w-md lg:max-w-lg"
              />
              <ClassLabel value="file-input w-full md:max-w-md lg:max-w-lg" />
            </div>
            <fieldset className="fieldset w-full rounded-box border border-ink-border bg-base-100/80 p-4">
              <legend className="fieldset-legend">Pick a file</legend>
              <input
                type="file"
                className="file-input w-full max-w-full cursor-pointer"
                aria-label="Fieldset file input"
              />
              <label className="label">Max size 2MB</label>
              <ClassLabel value="fieldset + file-input" />
            </fieldset>
          </div>
        </Section>
      </div>
    </>
  )
}
