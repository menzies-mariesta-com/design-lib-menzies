import {
  useEffect,
  useId,
  useRef,
  useState,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { CircleCheck, CircleX, X } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'
import { ShowcaseTabs } from './components/ShowcaseTabs'

const pigmentSuggestions = [
  'Ultramarine',
  'Cobalt blue',
  'Cerulean',
  'Yellow ochre',
  'Burnt sienna',
  'Quinacridone rose',
  'Viridian',
  'Sap green',
  'Alizarin crimson',
  'Payne\'s gray',
] as const

const washSuggestions = [
  'Wet-on-wet',
  'Dry brush',
  'Glaze',
  'Bloom',
  'Lift',
  'Granulating',
  'Opaque',
] as const

const colorVariants = [
  { name: 'Default', input: '', badge: '' },
  { name: 'Primary', input: 'input-primary', badge: 'badge-primary' },
  { name: 'Secondary', input: 'input-secondary', badge: 'badge-secondary' },
  { name: 'Accent', input: 'input-accent', badge: 'badge-accent' },
  { name: 'Info', input: 'input-info', badge: 'badge-info' },
  { name: 'Success', input: 'input-success', badge: 'badge-success' },
  { name: 'Warning', input: 'input-warning', badge: 'badge-warning' },
  { name: 'Error', input: 'input-error', badge: 'badge-error' },
] as const

const sizeVariants = [
  {
    name: 'XS',
    input: 'input-xs',
    badge: 'badge-xs',
  },
  {
    name: 'SM',
    input: 'input-sm',
    badge: 'badge-sm',
  },
  {
    name: 'MD',
    input: 'input-md',
    badge: 'badge-md',
  },
  {
    name: 'LG',
    input: 'input-lg',
    badge: 'badge-lg',
  },
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
        <h2 className="font-display text-xl font-semibold md:text-2xl">
          {title}
        </h2>
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

function normalizeTag(raw: string) {
  return raw.trim().replace(/^,+|,+$/g, '').trim()
}

type TagsInputProps = {
  id?: string
  tags: string[]
  onChange: (next: string[]) => void
  placeholder?: string
  dismissible?: boolean
  allowDuplicates?: boolean
  maxTags?: number
  suggestions?: readonly string[]
  suggestionMode?: 'datalist' | 'menu' | 'none'
  inputClassName?: string
  badgeClassName?: string
  shellClassName?: string
  disabled?: boolean
  required?: boolean
  name?: string
  'aria-label'?: string
  'aria-invalid'?: boolean
  onLimitHit?: () => void
  onDuplicate?: (tag: string) => void
}

function TagsInput({
  id,
  tags,
  onChange,
  placeholder = 'Add a tag…',
  dismissible = false,
  allowDuplicates = false,
  maxTags,
  suggestions = [],
  suggestionMode = 'none',
  inputClassName = '',
  badgeClassName = 'badge-soft',
  shellClassName = '',
  disabled = false,
  required = false,
  name,
  'aria-label': ariaLabel,
  'aria-invalid': ariaInvalid,
  onLimitHit,
  onDuplicate,
}: TagsInputProps) {
  const [draft, setDraft] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const rootRef = useRef<HTMLLabelElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listId = useId()
  const atLimit = maxTags !== undefined && tags.length >= maxTags

  const filteredSuggestions = suggestions.filter((item) => {
    const q = draft.trim().toLowerCase()
    if (!q) return !tags.includes(item)
    return (
      item.toLowerCase().includes(q) &&
      (allowDuplicates || !tags.includes(item))
    )
  })

  useEffect(() => {
    if (suggestionMode !== 'menu' || !menuOpen) return

    function onPointerDown(event: PointerEvent) {
      const el = rootRef.current
      if (!el) return
      if (event.target instanceof Node && !el.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen, suggestionMode])

  function commit(raw: string) {
    const value = normalizeTag(raw)
    if (!value) return false
    if (atLimit) {
      onLimitHit?.()
      return false
    }
    if (!allowDuplicates && tags.some((t) => t.toLowerCase() === value.toLowerCase())) {
      onDuplicate?.(value)
      return false
    }
    onChange([...tags, value])
    setDraft('')
    return true
  }

  function removeAt(index: number) {
    onChange(tags.filter((_, i) => i !== index))
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      commit(draft)
      return
    }
    if (event.key === 'Backspace' && draft === '' && tags.length > 0) {
      event.preventDefault()
      onChange(tags.slice(0, -1))
    }
  }

  function onPaste(event: ClipboardEvent<HTMLInputElement>) {
    const text = event.clipboardData.getData('text')
    if (!text.includes(',')) return
    event.preventDefault()
    const parts = text.split(/[,\n]/).map(normalizeTag).filter(Boolean)
    let next = [...tags]
    for (const part of parts) {
      if (maxTags !== undefined && next.length >= maxTags) {
        onLimitHit?.()
        break
      }
      if (
        !allowDuplicates &&
        next.some((t) => t.toLowerCase() === part.toLowerCase())
      ) {
        onDuplicate?.(part)
        continue
      }
      next.push(part)
    }
    onChange(next)
    setDraft('')
  }

  return (
    <div className="relative w-full">
      <label
        ref={rootRef}
        className={[
          'input flex h-auto min-h-10 w-full flex-wrap items-center gap-2 py-2',
          shellClassName,
          inputClassName,
          disabled ? 'input-disabled cursor-not-allowed opacity-60' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {tags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className={[
              'badge gap-1 whitespace-nowrap',
              badgeClassName,
              dismissible ? 'pr-1' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {tag}
            {dismissible ? (
              <div
                className="tooltip tooltip-error tooltip-right"
                data-tip="Remove"
              >
                <button
                  type="button"
                  className="btn btn-ghost btn-xs btn-square btn-error cursor-pointer"
                  aria-label={`Remove ${tag}`}
                  disabled={disabled}
                  onClick={(e) => {
                    e.preventDefault()
                    removeAt(index)
                    inputRef.current?.focus()
                  }}
                >
                  <X className="size-3.5" strokeWidth={2} aria-hidden />
                </button>
              </div>
            ) : null}
          </span>
        ))}
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="text"
          className="min-w-[8rem] flex-1 grow cursor-text border-0 bg-transparent p-0 outline-none focus:outline-none"
          value={draft}
          disabled={disabled || atLimit}
          placeholder={tags.length === 0 ? placeholder : atLimit ? 'Limit reached' : placeholder}
          aria-label={ariaLabel}
          aria-invalid={ariaInvalid}
          aria-required={required || undefined}
          list={
            suggestionMode === 'datalist' && suggestions.length > 0
              ? listId
              : undefined
          }
          onChange={(e) => {
            setDraft(e.target.value)
            if (suggestionMode === 'menu') setMenuOpen(true)
          }}
          onFocus={() => {
            if (suggestionMode === 'menu') setMenuOpen(true)
          }}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          onBlur={() => {
            if (draft.trim()) commit(draft)
          }}
        />
        {required ? (
          <input
            type="text"
            className="sr-only"
            tabIndex={-1}
            required
            value={tags.length > 0 ? tags.join(',') : ''}
            onChange={() => undefined}
            aria-hidden
          />
        ) : null}
      </label>

      {suggestionMode === 'datalist' && suggestions.length > 0 ? (
        <datalist id={listId}>
          {suggestions.map((item) => (
            <option key={item} value={item} />
          ))}
        </datalist>
      ) : null}

      {suggestionMode === 'menu' && menuOpen && filteredSuggestions.length > 0 ? (
        <ul
          className="menu dropdown-content absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-box border border-ink-border bg-base-100 p-2 shadow-[var(--shadow-paper-md)]"
          role="listbox"
        >
          {filteredSuggestions.map((item) => (
            <li key={item}>
              <button
                type="button"
                className="cursor-pointer"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  commit(item)
                  setMenuOpen(false)
                  inputRef.current?.focus()
                }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

function BasicTagsDemo() {
  const [tags, setTags] = useState(['Ultramarine', 'Glaze'])

  return (
    <Sample label="input + badge · Enter / comma · Backspace">
      <TagsInput
        tags={tags}
        onChange={setTags}
        placeholder="Type a pigment, press Enter"
        aria-label="Basic tags"
        badgeClassName="badge-soft badge-primary"
      />
      <p className="text-sm text-ink-muted">
        Press Enter or comma to add. Backspace removes the last tag when the
        field is empty.
      </p>
    </Sample>
  )
}

function DismissibleTagsDemo() {
  const [tags, setTags] = useState([
    'Quinacridone rose',
    'Yellow ochre',
    'Draft plate',
  ])

  return (
    <Sample label="badge + tooltip-error dismiss">
      <TagsInput
        tags={tags}
        onChange={setTags}
        dismissible
        placeholder="Add wash label…"
        aria-label="Dismissible tags"
        badgeClassName="badge-secondary badge-soft"
      />
    </Sample>
  )
}

function SuggestionsDemo() {
  const [datalistTags, setDatalistTags] = useState(['Cobalt blue'])
  const [menuTags, setMenuTags] = useState<string[]>([])

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Sample label="input + datalist suggestions">
        <TagsInput
          tags={datalistTags}
          onChange={setDatalistTags}
          dismissible
          suggestions={pigmentSuggestions}
          suggestionMode="datalist"
          placeholder="Pick or type a pigment"
          aria-label="Datalist pigment tags"
          badgeClassName="badge-info badge-soft"
        />
      </Sample>
      <Sample label="input + menu suggestions">
        <TagsInput
          tags={menuTags}
          onChange={setMenuTags}
          dismissible
          suggestions={washSuggestions}
          suggestionMode="menu"
          placeholder="Wash technique…"
          aria-label="Menu wash tags"
          badgeClassName="badge-accent badge-outline"
        />
      </Sample>
    </div>
  )
}

function SizesColorsDemo() {
  const [byColor, setByColor] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(colorVariants.map((c) => [c.name, [c.name]])),
  )
  const [bySize, setBySize] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(sizeVariants.map((s) => [s.name, [s.name]])),
  )

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {colorVariants.map((variant) => (
          <Sample
            key={variant.name}
            label={
              variant.input
                ? `input ${variant.input} + badge ${variant.badge}`
                : 'input + badge'
            }
          >
            <TagsInput
              tags={byColor[variant.name] ?? []}
              onChange={(next) =>
                setByColor((prev) => ({ ...prev, [variant.name]: next }))
              }
              dismissible
              placeholder="Add…"
              aria-label={`${variant.name} tags`}
              inputClassName={variant.input}
              badgeClassName={`${variant.badge} badge-soft`.trim()}
            />
          </Sample>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sizeVariants.map((variant) => (
          <Sample
            key={variant.name}
            label={`input ${variant.input} + badge ${variant.badge}`}
          >
            <TagsInput
              tags={bySize[variant.name] ?? []}
              onChange={(next) =>
                setBySize((prev) => ({ ...prev, [variant.name]: next }))
              }
              dismissible
              placeholder="Add…"
              aria-label={`${variant.name} size tags`}
              inputClassName={variant.input}
              badgeClassName={`badge-primary badge-soft ${variant.badge}`}
            />
          </Sample>
        ))}
      </div>
    </div>
  )
}

function LimitsDemo() {
  const [maxTags, setMaxTags] = useState(['Warm', 'Cool', 'Earth'])
  const [uniqueTags, setUniqueTags] = useState(['Glaze'])
  const [note, setNote] = useState<string | null>(null)

  useEffect(() => {
    if (!note) return
    const t = window.setTimeout(() => setNote(null), 2800)
    return () => window.clearTimeout(t)
  }, [note])

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Sample label="maxTags={4}">
        <TagsInput
          tags={maxTags}
          onChange={setMaxTags}
          dismissible
          maxTags={4}
          placeholder="Up to 4 tags"
          aria-label="Max tags"
          badgeClassName="badge-warning badge-soft"
          onLimitHit={() => setNote('Maximum of 4 tags on this plate.')}
        />
        <p className="text-sm text-ink-muted">
          {maxTags.length}/4 tags
        </p>
      </Sample>
      <Sample label="duplicates blocked">
        <TagsInput
          tags={uniqueTags}
          onChange={setUniqueTags}
          dismissible
          placeholder="Unique labels only"
          aria-label="Unique tags"
          badgeClassName="badge-success badge-soft"
          onDuplicate={(tag) => setNote(`"${tag}" is already on the list.`)}
        />
      </Sample>
      {note ? (
        <p className="text-sm text-warning lg:col-span-2" role="status">
          {note}
        </p>
      ) : null}
    </div>
  )
}

function StudioPlateDemo() {
  const [pigments, setPigments] = useState([
    'Ultramarine',
    'Burnt sienna',
  ])
  const [washes, setWashes] = useState(['Wet-on-wet', 'Lift'])

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-box border border-ink-border/80 bg-base-100/50 p-4">
        <p className="label-ink mb-3">Pigment tags</p>
        <TagsInput
          tags={pigments}
          onChange={setPigments}
          dismissible
          suggestions={pigmentSuggestions}
          suggestionMode="menu"
          placeholder="Name a tube…"
          aria-label="Pigment tags"
          badgeClassName="badge-info badge-soft"
          shellClassName="border-ink-border"
        />
      </div>
      <div className="rounded-box border border-ink-border/80 bg-base-100/50 p-4">
        <p className="label-ink mb-3">Wash labels</p>
        <TagsInput
          tags={washes}
          onChange={setWashes}
          dismissible
          suggestions={washSuggestions}
          suggestionMode="datalist"
          placeholder="Technique…"
          aria-label="Wash labels"
          badgeClassName="badge-outline badge-primary"
          shellClassName="border-ink-border"
        />
      </div>
      <ClassLabel value="studio plate · pigment + wash TagsInput" />
    </div>
  )
}

function RequiredFormDemo() {
  const [tags, setTags] = useState<string[]>([])
  const [title, setTitle] = useState('')
  const [toast, setToast] = useState<{
    tone: 'success' | 'error'
    message: string
  } | null>(null)

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(t)
  }, [toast])

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (tags.length === 0) {
      setToast({
        tone: 'error',
        message: 'Add at least one plate tag.',
      })
      return
    }
    setToast({
      tone: 'success',
      message: `Plate "${title}" saved with ${tags.length} tag${tags.length === 1 ? '' : 's'}.`,
    })
    setTitle('')
    setTags([])
  }

  return (
    <>
      <form
        className="max-w-lg rounded-box border border-ink-border/80 bg-base-100/60 p-4"
        onSubmit={onSubmit}
        noValidate
      >
        <h3 className="card-title text-primary font-bold text-base">
          Label a plate
        </h3>
        <div className="mt-3 flex flex-col gap-3">
          <label className="form-control w-full" htmlFor="plate-title">
            <span className="label-text mb-1">
              Title
              <span
                className="text-error align-top text-sm leading-none"
                aria-hidden="true"
              >
                *
              </span>
            </span>
            <input
              id="plate-title"
              className="input w-full cursor-text border-ink-border"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Evening glaze study"
            />
          </label>

          <div className="form-control w-full">
            <label className="label-text mb-1" htmlFor="plate-tags">
              Tags
              <span
                className="text-error align-top text-sm leading-none"
                aria-hidden="true"
              >
                *
              </span>
            </label>
            <TagsInput
              id="plate-tags"
              tags={tags}
              onChange={setTags}
              dismissible
              required
              suggestions={pigmentSuggestions}
              suggestionMode="datalist"
              placeholder="At least one tag"
              aria-label="Required plate tags"
              aria-invalid={tags.length === 0}
              badgeClassName="badge-primary badge-soft"
              shellClassName={
                tags.length === 0 ? 'input-error border-error' : 'border-ink-border'
              }
            />
          </div>

          <button type="submit" className="btn btn-primary cursor-pointer self-start">
            Save plate
          </button>
        </div>
        <ClassLabel value="required TagsInput + form toast" />
      </form>

      {toast ? (
        <div className="toast toast-bottom toast-end z-[100]">
          <div
            className={`alert shadow-lg ${toast.tone === 'success' ? 'alert-success' : 'alert-error'}`}
          >
            {toast.tone === 'success' ? (
              <CircleCheck className="h-5 w-5 shrink-0" strokeWidth={2} />
            ) : (
              <CircleX className="h-5 w-5 shrink-0" strokeWidth={2} />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      ) : null}
    </>
  )
}

function ResponsiveWrapDemo() {
  const [tags, setTags] = useState([
    'Ultramarine deep',
    'Quinacridone rose',
    'Yellow ochre light',
    'Burnt sienna',
    'Sap green',
    'Cerulean hue',
    'Payne\'s gray',
    'Wet-on-wet bloom',
  ])

  return (
    <Sample label="flex-wrap tags inside input shell" className="w-full">
      <TagsInput
        tags={tags}
        onChange={setTags}
        dismissible
        placeholder="More tags wrap…"
        aria-label="Wrapping tags"
        badgeClassName="badge-soft"
        shellClassName="w-full max-w-full border-ink-border"
      />
      <p className="text-sm text-ink-muted">
        Tags wrap inside the field on narrow viewports. No horizontal page
        scroll.
      </p>
    </Sample>
  )
}

export default function TagsInputPage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Tags input
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Compose daisyUI <span className="font-mono text-xs">input</span> with{' '}
          <span className="font-mono text-xs">badge</span> chips to add and
          remove tags.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Basic"
          title="Type and commit"
          description="Enter or comma adds a tag"
        >
          <ShowcaseTabs
            preview={
              <>
                <BasicTagsDemo />
              </>
            }
            html={`<BasicTagsDemo />`}
            jsx={`<BasicTagsDemo />`}
          />
        </Section>

        <Section
          eyebrow="02 · Dismissible"
          title="Remove from each tag"
          description="Icon-only dismiss with tooltip-error matching btn-error"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <DismissibleTagsDemo />
              </>
            }
            html={`<DismissibleTagsDemo />`}
            jsx={`<DismissibleTagsDemo />`}
          />
        </Section>

        <Section
          eyebrow="03 · Suggestions"
          title="Pigment and wash hints"
          description="Optional datalist or menu of studio suggestions"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <SuggestionsDemo />
              </>
            }
            html={`<SuggestionsDemo />`}
            jsx={`<SuggestionsDemo />`}
          />
        </Section>

        <Section
          eyebrow="04 · Sizes and colors"
          title="Input and badge variants"
          description="daisyUI input and badge color and size modifiers on the same field"
        >
          <ShowcaseTabs
            preview={
              <>
                <SizesColorsDemo />
              </>
            }
            html={`<SizesColorsDemo />`}
            jsx={`<SizesColorsDemo />`}
          />
        </Section>

        <Section
          eyebrow="05 · Limits"
          title="Max tags and duplicates"
          description="Cap the list and block repeated labels with quiet feedback"
          panel="wash-panel-ochre"
        >
          <ShowcaseTabs
            preview={
              <>
                <LimitsDemo />
              </>
            }
            html={`<LimitsDemo />`}
            jsx={`<LimitsDemo />`}
          />
        </Section>

        <Section
          eyebrow="06 · Studio"
          title="Plate labels"
          description="Pigment tags and wash labels on a watercolor plate"
          panel="wash-panel-blue"
        >
          <ShowcaseTabs
            preview={
              <>
                <StudioPlateDemo />
              </>
            }
            html={`<StudioPlateDemo />`}
            jsx={`<StudioPlateDemo />`}
          />
        </Section>

        <Section
          eyebrow="07 · Required"
          title="Form with tags"
          description="Required asterisk, validation, and bottom-right toast on save"
          panel="wash-panel-rose"
        >
          <ShowcaseTabs
            preview={
              <>
                <RequiredFormDemo />
              </>
            }
            html={`<RequiredFormDemo />`}
            jsx={`<RequiredFormDemo />`}
          />
        </Section>

        <Section
          eyebrow="08 · Responsive"
          title="Wrapping field"
          description="Long tag sets wrap inside the input shell on small screens"
        >
          <ShowcaseTabs
            preview={
              <>
                <ResponsiveWrapDemo />
              </>
            }
            html={`<ResponsiveWrapDemo />`}
            jsx={`<ResponsiveWrapDemo />`}
          />
        </Section>
      </div>
    </>
  )
}
