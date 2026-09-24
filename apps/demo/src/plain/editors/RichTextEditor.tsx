import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react'
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote,
  Redo2,
  RemoveFormatting,
  Strikethrough,
  Underline,
  Undo2,
  Unlink,
} from 'lucide-react'
import { isRichHtmlEmpty, sanitizeRichHtml } from './editor/sanitizeHtml'

export type RichTextEditorProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'children'
> & {
  value?: string
  defaultValue?: string
  onChange?: (html: string) => void
  onBlur?: () => void
  placeholder?: string
  disabled?: boolean
  minHeight?: string | number
}

type Tool = {
  id: string
  label: string
  icon: ReactNode
  run: () => void
  active?: boolean
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

function ToolButton({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string
  active?: boolean
  disabled?: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <div className="tooltip tooltip-bottom tooltip-primary" data-tip={label}>
      <button
        type="button"
        className={cx(
          'btn btn-ghost btn-square btn-sm btn-primary',
          active && 'btn-active',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        )}
        aria-label={label}
        aria-pressed={active}
        disabled={disabled}
        onMouseDown={(e) => e.preventDefault()}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  )
}

export function RichTextEditor({
  value,
  defaultValue = '',
  onChange,
  onBlur,
  placeholder = 'Write something…',
  disabled = false,
  minHeight,
  className,
  id,
  ...rest
}: RichTextEditorProps) {
  const autoId = useId()
  const surfaceId = id ?? `wash-rte-${autoId}`
  const surfaceRef = useRef<HTMLDivElement>(null)
  const lastEmitted = useRef<string>('')
  const [empty, setEmpty] = useState(true)
  const [active, setActive] = useState({
    bold: false,
    italic: false,
    underline: false,
    strike: false,
  })

  const emit = useCallback(() => {
    const el = surfaceRef.current
    if (!el) return
    const html = sanitizeRichHtml(el.innerHTML)
    setEmpty(isRichHtmlEmpty(html))
    if (html === lastEmitted.current) return
    lastEmitted.current = html
    onChange?.(html)
  }, [onChange])

  const syncFromValue = useCallback(
    (html: string) => {
      const el = surfaceRef.current
      if (!el) return
      const safe = sanitizeRichHtml(html)
      if (el.innerHTML === safe) return
      el.innerHTML = safe
      lastEmitted.current = safe
      setEmpty(isRichHtmlEmpty(safe))
    },
    [],
  )

  useEffect(() => {
    if (value === undefined) {
      syncFromValue(defaultValue)
      return
    }
    syncFromValue(value)
  }, [value, defaultValue, syncFromValue])

  const refreshActive = useCallback(() => {
    if (typeof document === 'undefined') return
    setActive({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strike: document.queryCommandState('strikeThrough'),
    })
  }, [])

  const run = useCallback(
    (command: string, arg?: string) => {
      if (disabled) return
      surfaceRef.current?.focus()
      document.execCommand(command, false, arg)
      emit()
      refreshActive()
    },
    [disabled, emit, refreshActive],
  )

  const runFormatBlock = useCallback(
    (tag: string) => {
      run('formatBlock', `<${tag}>`)
    },
    [run],
  )

  const insertLink = useCallback(() => {
    if (disabled) return
    const url = window.prompt('Link URL', 'https://')
    if (!url) return
    run('createLink', url)
  }, [disabled, run])

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const meta = e.metaKey || e.ctrlKey
    if (!meta) return
    const key = e.key.toLowerCase()
    if (key === 'b') {
      e.preventDefault()
      run('bold')
    } else if (key === 'i') {
      e.preventDefault()
      run('italic')
    } else if (key === 'u') {
      e.preventDefault()
      run('underline')
    } else if (key === 'z' && !e.shiftKey) {
      e.preventDefault()
      run('undo')
    } else if (key === 'y' || (key === 'z' && e.shiftKey)) {
      e.preventDefault()
      run('redo')
    }
  }

  const onPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault()
    const html = e.clipboardData.getData('text/html')
    const text = e.clipboardData.getData('text/plain')
    if (html) {
      document.execCommand('insertHTML', false, sanitizeRichHtml(html))
    } else {
      document.execCommand('insertText', false, text)
    }
    emit()
  }

  const icon = (node: ReactNode) => (
    <span className="inline-flex size-4 items-center justify-center [&>svg]:size-4" aria-hidden="true">
      {node}
    </span>
  )

  const tools: Tool[][] = [
    [
      {
        id: 'undo',
        label: 'Undo',
        icon: icon(<Undo2 strokeWidth={2} />),
        run: () => run('undo'),
      },
      {
        id: 'redo',
        label: 'Redo',
        icon: icon(<Redo2 strokeWidth={2} />),
        run: () => run('redo'),
      },
    ],
    [
      {
        id: 'bold',
        label: 'Bold',
        icon: icon(<Bold strokeWidth={2} />),
        run: () => run('bold'),
        active: active.bold,
      },
      {
        id: 'italic',
        label: 'Italic',
        icon: icon(<Italic strokeWidth={2} />),
        run: () => run('italic'),
        active: active.italic,
      },
      {
        id: 'underline',
        label: 'Underline',
        icon: icon(<Underline strokeWidth={2} />),
        run: () => run('underline'),
        active: active.underline,
      },
      {
        id: 'strike',
        label: 'Strikethrough',
        icon: icon(<Strikethrough strokeWidth={2} />),
        run: () => run('strikeThrough'),
        active: active.strike,
      },
    ],
    [
      {
        id: 'p',
        label: 'Paragraph',
        icon: icon(<Pilcrow strokeWidth={2} />),
        run: () => runFormatBlock('p'),
      },
      {
        id: 'h1',
        label: 'Heading 1',
        icon: icon(<Heading1 strokeWidth={2} />),
        run: () => runFormatBlock('h1'),
      },
      {
        id: 'h2',
        label: 'Heading 2',
        icon: icon(<Heading2 strokeWidth={2} />),
        run: () => runFormatBlock('h2'),
      },
      {
        id: 'h3',
        label: 'Heading 3',
        icon: icon(<Heading3 strokeWidth={2} />),
        run: () => runFormatBlock('h3'),
      },
    ],
    [
      {
        id: 'ul',
        label: 'Bullet list',
        icon: icon(<List strokeWidth={2} />),
        run: () => run('insertUnorderedList'),
      },
      {
        id: 'ol',
        label: 'Numbered list',
        icon: icon(<ListOrdered strokeWidth={2} />),
        run: () => run('insertOrderedList'),
      },
      {
        id: 'quote',
        label: 'Blockquote',
        icon: icon(<Quote strokeWidth={2} />),
        run: () => runFormatBlock('blockquote'),
      },
      {
        id: 'hr',
        label: 'Horizontal rule',
        icon: icon(<Minus strokeWidth={2} />),
        run: () => run('insertHorizontalRule'),
      },
    ],
    [
      {
        id: 'link',
        label: 'Insert link',
        icon: icon(<Link2 strokeWidth={2} />),
        run: insertLink,
      },
      {
        id: 'unlink',
        label: 'Remove link',
        icon: icon(<Unlink strokeWidth={2} />),
        run: () => run('unlink'),
      },
      {
        id: 'clear',
        label: 'Clear formatting',
        icon: icon(<RemoveFormatting strokeWidth={2} />),
        run: () => run('removeFormat'),
      },
    ],
  ]

  return (
    <div
      className={cx('wash-rte', className)}
      data-disabled={disabled ? 'true' : 'false'}
      {...rest}
    >
      <div className="wash-rte-toolbar" role="toolbar" aria-label="Rich text formatting" aria-controls={surfaceId}>
        {tools.map((group, gi) => (
          <div key={gi} className="join">
            {group.map((tool) => (
              <ToolButton
                key={tool.id}
                label={tool.label}
                active={tool.active}
                disabled={disabled}
                onClick={tool.run}
              >
                {tool.icon}
              </ToolButton>
            ))}
          </div>
        ))}
      </div>
      <div
        id={surfaceId}
        ref={surfaceRef}
        className="wash-rte-surface"
        style={minHeight !== undefined ? { minHeight } : undefined}
        contentEditable={!disabled}
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        aria-label={placeholder}
        aria-disabled={disabled}
        data-placeholder={placeholder}
        data-empty={empty ? 'true' : 'false'}
        onInput={emit}
        onBlur={() => {
          emit()
          onBlur?.()
        }}
        onKeyDown={onKeyDown}
        onKeyUp={refreshActive}
        onMouseUp={refreshActive}
        onPaste={onPaste}
      />
    </div>
  )
}

export default RichTextEditor
