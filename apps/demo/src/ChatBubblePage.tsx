import { useState, type FormEvent, type ReactNode } from 'react'
import { Send } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

const picsum = (id: number, size = 80) =>
  `https://picsum.photos/id/${id}/${size}/${size}`

const bubbleColors = [
  { name: 'Primary', className: 'chat-bubble-primary', sample: 'Primary wash note' },
  { name: 'Secondary', className: 'chat-bubble-secondary', sample: 'Secondary wash note' },
  { name: 'Accent', className: 'chat-bubble-accent', sample: 'Accent wash note' },
  { name: 'Neutral', className: 'chat-bubble-neutral', sample: 'Neutral wash note' },
  { name: 'Info', className: 'chat-bubble-info', sample: 'Info wash note' },
  { name: 'Success', className: 'chat-bubble-success', sample: 'Success wash note' },
  { name: 'Warning', className: 'chat-bubble-warning', sample: 'Warning wash note' },
  { name: 'Error', className: 'chat-bubble-error', sample: 'Error wash note' },
] as const

type CritiqueMsg = {
  id: number
  side: 'start' | 'end'
  name: string
  time: string
  text: string
  bubble?: string
}

const critiqueSeed: CritiqueMsg[] = [
  {
    id: 1,
    side: 'start',
    name: 'Maya',
    time: '09:12',
    text: 'The sky wash is blooming too hard near the horizon. Soften the edge with a clean brush.',
    bubble: 'chat-bubble-info',
  },
  {
    id: 2,
    side: 'end',
    name: 'You',
    time: '09:14',
    text: 'Agreed. I will lift pigment while it is still damp.',
    bubble: 'chat-bubble-primary',
  },
  {
    id: 3,
    side: 'start',
    name: 'Maya',
    time: '09:15',
    text: 'Keep the foreground dark enough so the midground can breathe.',
  },
]

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
      {value || 'chat'}
    </code>
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
    <div className="flex flex-col gap-2">
      {children}
      <ClassLabel value={label} />
    </div>
  )
}

function StudioCritiqueThread() {
  const [messages, setMessages] = useState(critiqueSeed)
  const [draft, setDraft] = useState('')

  function send(e: FormEvent) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    const now = new Date()
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        side: 'end',
        name: 'You',
        time,
        text,
        bubble: 'chat-bubble-primary',
      },
    ])
    setDraft('')
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-box border border-ink-border/70 bg-base-100/50 p-3 sm:p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat ${msg.side === 'start' ? 'chat-start' : 'chat-end'}`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  src={picsum(msg.side === 'start' ? 64 : 91)}
                  alt={`${msg.name} studio portrait`}
                />
              </div>
            </div>
            <div className="chat-header">
              {msg.name}
              <time className="text-xs opacity-50">{msg.time}</time>
            </div>
            <div className={`chat-bubble ${msg.bubble ?? ''}`.trim()}>{msg.text}</div>
            <div className="chat-footer opacity-50">
              {msg.side === 'end' ? 'Sent' : 'Seen'}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={send}
        className="flex flex-col gap-2 sm:flex-row sm:items-end"
      >
        <label className="form-control w-full flex-1">
          <span className="label-ink mb-1">Reply</span>
          <input
            type="text"
            className="input w-full cursor-text border-ink-border bg-base-100"
            placeholder="Add a critique note…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            aria-label="Critique reply"
          />
        </label>
        <button type="submit" className="btn btn-primary cursor-pointer sm:mb-0">
          <Send className="size-4" strokeWidth={2} />
          Send
        </button>
      </form>
      <ClassLabel value="chat chat-start | chat-end + interactive reply" />
    </div>
  )
}

export default function ChatBubblePage() {
  return (
    <>
      <div className="mb-6 soak-in">
        <p className="label-ink mb-2">Component gallery</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Chat bubble
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          daisyUI <span className="font-mono text-xs">chat</span> placement,
          colors, and chrome for studio conversations. Placement is required:{' '}
          <span className="font-mono text-xs">chat-start</span> or{' '}
          <span className="font-mono text-xs">chat-end</span>.
        </p>
      </div>

      <div className="space-y-6">
        <Section
          eyebrow="01 · Start / end"
          title="Conversation sides"
          description="chat-start aligns left; chat-end aligns right. Both placement classes are required."
        >
          <Sample label="chat chat-start | chat chat-end">
            <div>
              <div className="chat chat-start">
                <div className="chat-bubble">
                  Soften the wash edge before it dries.
                </div>
              </div>
              <div className="chat chat-end">
                <div className="chat-bubble">Lifting now with a clean brush.</div>
              </div>
            </div>
          </Sample>
        </Section>

        <Section
          eyebrow="02 · Colors"
          title="Bubble colors"
          description="Every chat-bubble-* semantic color with class labels."
          panel="wash-panel-ochre"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {bubbleColors.map(({ name, className, sample }, index) => (
              <Sample key={name} label={`chat-bubble ${className}`}>
                <div
                  className={`chat ${index % 2 === 0 ? 'chat-start' : 'chat-end'}`}
                >
                  <div className={`chat-bubble ${className}`}>{sample}</div>
                </div>
              </Sample>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="03 · Chrome"
          title="Avatar, header, footer, time"
          description="Full chat line: image avatar, name header with time, bubble, and status footer."
          panel="wash-panel-rose"
        >
          <Sample label="chat-image avatar + chat-header + chat-bubble + chat-footer">
            <div>
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={picsum(64)}
                      alt="Mentor artist portrait"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  Maya Chen
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">
                  Leave a dry edge where the paper should sparkle.
                </div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
              <div className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={picsum(91)}
                      alt="Student artist portrait"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  You
                  <time className="text-xs opacity-50">12:46</time>
                </div>
                <div className="chat-bubble chat-bubble-primary">
                  Noted. Masking that highlight now.
                </div>
                <div className="chat-footer opacity-50">Seen at 12:46</div>
              </div>
            </div>
          </Sample>
        </Section>

        <Section
          eyebrow="04 · Density"
          title="Avatar and text scale"
          description="daisyUI chat has no size modifiers. Scale with avatar width and text utilities."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <Sample label="avatar w-8 + text-sm">
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-8 rounded-full">
                    <img src={picsum(65)} alt="Compact mentor portrait" />
                  </div>
                </div>
                <div className="chat-header text-xs">
                  Compact
                  <time className="opacity-50">10:01</time>
                </div>
                <div className="chat-bubble text-sm">Compact density.</div>
                <div className="chat-footer text-xs opacity-50">Seen</div>
              </div>
            </Sample>
            <Sample label="avatar w-10 (default)">
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img src={picsum(177)} alt="Default mentor portrait" />
                  </div>
                </div>
                <div className="chat-header">
                  Default
                  <time className="text-xs opacity-50">10:02</time>
                </div>
                <div className="chat-bubble">Default density.</div>
                <div className="chat-footer opacity-50">Seen</div>
              </div>
            </Sample>
            <Sample label="avatar w-14 + text-base">
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-14 rounded-full">
                    <img src={picsum(239)} alt="Large mentor portrait" />
                  </div>
                </div>
                <div className="chat-header text-base">
                  Large
                  <time className="text-xs opacity-50">10:03</time>
                </div>
                <div className="chat-bubble text-base">Larger density.</div>
                <div className="chat-footer opacity-50">Seen</div>
              </div>
            </Sample>
          </div>
        </Section>

        <Section
          eyebrow="05 · Studio critique"
          title="Critique thread"
          description="A short watercolor-studio conversation. Type a reply to append a chat-end bubble."
          panel="wash-panel-ochre"
        >
          <StudioCritiqueThread />
        </Section>

        <Section
          eyebrow="06 · Responsive"
          title="Narrow and wide layouts"
          description="Stack threads full width on mobile; split side-by-side from lg up."
          panel="wash-panel-rose"
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <Sample label="single column thread">
              <div className="rounded-box border border-ink-border/60 bg-base-100/40 p-3">
                <div className="chat chat-start">
                  <div className="chat-bubble chat-bubble-secondary">
                    How wide should the vignette sit?
                  </div>
                </div>
                <div className="chat chat-end">
                  <div className="chat-bubble chat-bubble-accent">
                    Keep it soft past the third vertical.
                  </div>
                </div>
              </div>
            </Sample>
            <Sample label="lg:grid-cols-2 companion panel">
              <div className="rounded-box border border-ink-border/60 bg-base-100/40 p-3">
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img src={picsum(64)} alt="Critic portrait" />
                    </div>
                  </div>
                  <div className="chat-header">
                    Crit
                    <time className="text-xs opacity-50">Just now</time>
                  </div>
                  <div className="chat-bubble chat-bubble-warning">
                    Check value contrast on phone before you glaze.
                  </div>
                  <div className="chat-footer opacity-50">Pinned</div>
                </div>
              </div>
            </Sample>
          </div>
        </Section>
      </div>
    </>
  )
}
