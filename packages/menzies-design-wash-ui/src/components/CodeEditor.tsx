import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import {
  getLanguagePack,
  listLanguages,
  normalizeLanguageProp,
  type CodeLanguage,
  type Diagnostic,
  type LanguageId,
} from './editor/languages'
import {
  highlightCode,
  indexFromLineCol,
  lineColFromIndex,
} from './editor/tokenize'
import {
  EditorHistory,
  autoIndentOnEnter,
  indentSelection,
  outdentSelection,
  pairBracket,
  toggleBlockComment,
  toggleLineComment,
} from './editor/textOps'

export type { CodeLanguage, LanguageId, Diagnostic }

export type CodeEditorTab = {
  id: string
  fileName: string
  value: string
  language?: CodeLanguage | LanguageId | string
}

export type CodeEditorProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'children'
> & {
  value?: string
  defaultValue?: string
  onChange?: (value: string, tabId?: string) => void
  language?: CodeLanguage | LanguageId | string
  fileName?: string
  disabled?: boolean
  readOnly?: boolean
  minHeight?: string | number
  showFind?: boolean
  wrap?: boolean
  onWrapChange?: (wrap: boolean) => void
  diagnostics?: Diagnostic[]
  onLanguageChange?: (language: LanguageId) => void
  tabs?: CodeEditorTab[]
  activeTabId?: string
  onTabChange?: (tabId: string) => void
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const PAIRABLES: Record<string, string> = {
  '(': ')',
  '[': ']',
  '{': '}',
  "'": "'",
  '"': '"',
  '`': '`',
}

export function CodeEditor({
  value,
  defaultValue = '',
  onChange,
  language,
  fileName = 'main.ts',
  disabled = false,
  readOnly = false,
  minHeight = '16rem',
  showFind = true,
  wrap: wrapProp,
  onWrapChange,
  diagnostics: diagnosticsProp,
  onLanguageChange,
  tabs,
  activeTabId,
  onTabChange,
  className,
  id,
  ...rest
}: CodeEditorProps) {
  const autoId = useId()
  const rootId = id ?? `wash-code-${autoId}`
  const isTabbed = Boolean(tabs && tabs.length > 0)
  const activeTab =
    isTabbed && tabs
      ? (tabs.find((t) => t.id === activeTabId) ?? tabs[0]!)
      : null

  const [internal, setInternal] = useState(defaultValue)
  const controlled = value !== undefined || isTabbed
  const source = isTabbed
    ? (activeTab?.value ?? '')
    : controlled
      ? (value as string)
      : internal

  const activeFileName = activeTab?.fileName ?? fileName
  const [languageOverride, setLanguageOverride] = useState<LanguageId | null>(
    null,
  )
  const languageId = normalizeLanguageProp(
    languageOverride ?? activeTab?.language ?? language,
    activeFileName,
  )
  const pack = getLanguagePack(languageId)

  useEffect(() => {
    setLanguageOverride(null)
  }, [activeTab?.id, language, activeFileName])

  const locked = disabled || readOnly
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const highlightRef = useRef<HTMLPreElement>(null)
  const gutterRef = useRef<HTMLDivElement>(null)
  const historyRef = useRef(new EditorHistory())
  const [cursor, setCursor] = useState({ line: 1, col: 1 })
  const [findOpen, setFindOpen] = useState(false)
  const [replaceOpen, setReplaceOpen] = useState(false)
  const [gotoOpen, setGotoOpen] = useState(false)
  const [findQuery, setFindQuery] = useState('')
  const [replaceQuery, setReplaceQuery] = useState('')
  const [gotoLine, setGotoLine] = useState('1')
  const [wrapInternal, setWrapInternal] = useState(false)
  const wrap = wrapProp ?? wrapInternal
  const [completion, setCompletion] = useState<{
    items: { label: string; insert: string }[]
    index: number
  } | null>(null)

  const lines = useMemo(() => {
    const parts = source.split('\n')
    return parts.length === 0 ? [''] : parts
  }, [source])

  const highlighted = useMemo(
    () => highlightCode(source.endsWith('\n') ? source : `${source}\n`, languageId),
    [source, languageId],
  )

  const packDiagnostics = useMemo(
    () => pack.validate?.(source) ?? [],
    [pack, source],
  )
  const diagnostics = diagnosticsProp ?? packDiagnostics
  const diagByLine = useMemo(() => {
    const map = new Map<number, Diagnostic>()
    for (const d of diagnostics) {
      if (!map.has(d.line)) map.set(d.line, d)
    }
    return map
  }, [diagnostics])

  const emitChange = useCallback(
    (next: string) => {
      if (!controlled) setInternal(next)
      onChange?.(next, activeTab?.id)
    },
    [controlled, onChange, activeTab?.id],
  )

  const applyEdit = useCallback(
    (
      next: string,
      selectionStart: number,
      selectionEnd: number,
      recordHistory = true,
    ) => {
      const ta = textareaRef.current
      if (recordHistory && ta) {
        historyRef.current.push({
          value: source,
          selectionStart: ta.selectionStart,
          selectionEnd: ta.selectionEnd,
        })
      }
      emitChange(next)
      requestAnimationFrame(() => {
        const el = textareaRef.current
        if (!el) return
        el.selectionStart = selectionStart
        el.selectionEnd = selectionEnd
        setCursor(lineColFromIndex(next, selectionStart))
      })
    },
    [emitChange, source],
  )

  const syncScroll = useCallback(() => {
    const ta = textareaRef.current
    if (!ta) return
    if (highlightRef.current) {
      highlightRef.current.scrollTop = ta.scrollTop
      highlightRef.current.scrollLeft = ta.scrollLeft
    }
    if (gutterRef.current) {
      gutterRef.current.scrollTop = ta.scrollTop
    }
  }, [])

  const updateCursor = useCallback(() => {
    const ta = textareaRef.current
    if (!ta) return
    setCursor(lineColFromIndex(source, ta.selectionStart))
  }, [source])

  useEffect(() => {
    syncScroll()
  }, [source, syncScroll])

  const setWrap = (next: boolean) => {
    if (wrapProp === undefined) setWrapInternal(next)
    onWrapChange?.(next)
  }

  const jumpFind = (reverse = false) => {
    if (!findQuery) return
    const ta = textareaRef.current
    if (!ta) return
    const from = reverse ? Math.max(0, ta.selectionStart - 1) : ta.selectionEnd
    let idx = reverse
      ? source.lastIndexOf(findQuery, from)
      : source.indexOf(findQuery, from)
    if (idx < 0) {
      idx = reverse
        ? source.lastIndexOf(findQuery)
        : source.indexOf(findQuery)
    }
    if (idx < 0) return
    ta.focus()
    ta.setSelectionRange(idx, idx + findQuery.length)
    updateCursor()
  }

  const replaceOne = () => {
    const ta = textareaRef.current
    if (!ta || !findQuery) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    if (source.slice(start, end) === findQuery) {
      applyEdit(
        source.slice(0, start) + replaceQuery + source.slice(end),
        start,
        start + replaceQuery.length,
      )
      return
    }
    jumpFind()
  }

  const replaceAll = () => {
    if (!findQuery) return
    const next = source.split(findQuery).join(replaceQuery)
    applyEdit(next, 0, 0)
  }

  const goToLineNumber = () => {
    const n = Math.max(1, Math.min(lines.length, Number(gotoLine) || 1))
    const idx = indexFromLineCol(source, n, 1)
    applyEdit(source, idx, idx, false)
    setGotoOpen(false)
    textareaRef.current?.focus()
  }

  const openCompletions = (prefix: string) => {
    const items = [
      ...pack.snippets,
      ...pack.keywords.map((k) => ({ label: k, insert: k })),
    ]
      .filter((item) =>
        prefix ? item.label.toLowerCase().startsWith(prefix.toLowerCase()) : true,
      )
      .slice(0, 12)
    if (items.length === 0) {
      setCompletion(null)
      return
    }
    setCompletion({ items, index: 0 })
  }

  const acceptCompletion = (insert: string) => {
    const ta = textareaRef.current
    if (!ta) return
    const start = ta.selectionStart
    const before = source.slice(0, start)
    const match = before.match(/[A-Za-z0-9_$#]*$/)
    const prefixLen = match?.[0]?.length ?? 0
    const cleaned = insert.replace(/\$\d+/g, '')
    const next =
      source.slice(0, start - prefixLen) + cleaned + source.slice(start)
    const caret = start - prefixLen + cleaned.length
    applyEdit(next, caret, caret)
    setCompletion(null)
  }

  const onKeyDown = (e: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    if (locked) return
    const ta = e.currentTarget
    const meta = e.metaKey || e.ctrlKey
    const start = ta.selectionStart
    const end = ta.selectionEnd

    if (completion) {
      if (e.key === 'Escape') {
        e.preventDefault()
        setCompletion(null)
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setCompletion({
          ...completion,
          index: (completion.index + 1) % completion.items.length,
        })
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setCompletion({
          ...completion,
          index:
            (completion.index - 1 + completion.items.length) %
            completion.items.length,
        })
        return
      }
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault()
        acceptCompletion(completion.items[completion.index]!.insert)
        return
      }
    }

    if (meta && e.key.toLowerCase() === 'f' && showFind) {
      e.preventDefault()
      setFindOpen(true)
      setReplaceOpen(false)
      setGotoOpen(false)
      return
    }
    if (meta && e.key.toLowerCase() === 'h' && showFind) {
      e.preventDefault()
      setFindOpen(true)
      setReplaceOpen(true)
      setGotoOpen(false)
      return
    }
    if (meta && e.key.toLowerCase() === 'g') {
      e.preventDefault()
      setGotoOpen(true)
      setFindOpen(false)
      return
    }
    if (meta && e.key.toLowerCase() === 'z' && !e.shiftKey) {
      e.preventDefault()
      const prev = historyRef.current.undo({
        value: source,
        selectionStart: start,
        selectionEnd: end,
      })
      if (prev) applyEdit(prev.value, prev.selectionStart, prev.selectionEnd, false)
      return
    }
    if (meta && (e.key.toLowerCase() === 'y' || (e.key.toLowerCase() === 'z' && e.shiftKey))) {
      e.preventDefault()
      const next = historyRef.current.redo({
        value: source,
        selectionStart: start,
        selectionEnd: end,
      })
      if (next) applyEdit(next.value, next.selectionStart, next.selectionEnd, false)
      return
    }
    if (meta && e.key === '/') {
      e.preventDefault()
      if (!pack.lineComment) return
      const result = toggleLineComment(source, start, end, pack.lineComment)
      applyEdit(result.value, result.start, result.end)
      return
    }
    if (e.altKey && e.shiftKey && e.key.toLowerCase() === 'a') {
      e.preventDefault()
      if (!pack.blockComment) return
      const result = toggleBlockComment(
        source,
        start,
        end,
        pack.blockComment.open,
        pack.blockComment.close,
      )
      applyEdit(result.value, result.start, result.end)
      return
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      const result = e.shiftKey
        ? outdentSelection(source, start, end)
        : indentSelection(source, start, end)
      applyEdit(result.value, result.start, result.end)
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      const result = autoIndentOnEnter(source, start)
      applyEdit(result.value, result.start, result.end)
      return
    }
    if (!e.metaKey && !e.ctrlKey && !e.altKey && PAIRABLES[e.key] && start === end) {
      e.preventDefault()
      const close = PAIRABLES[e.key]!
      const result = pairBracket(source, start, end, e.key, close)
      applyEdit(result.value, result.start, result.end)
      return
    }

    if (!meta && !e.altKey && /^[A-Za-z0-9_$#]$/.test(e.key)) {
      const before = source.slice(0, start) + e.key
      const match = before.match(/[A-Za-z0-9_$#]+$/)
      requestAnimationFrame(() => openCompletions(match?.[0] ?? e.key))
    } else if (e.key === 'Escape') {
      setCompletion(null)
    } else if (e.key === ' ' || e.key === 'Enter') {
      setCompletion(null)
    }
  }

  const bodyStyle: CSSProperties = {
    minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
  }

  const whiteSpace = wrap ? 'pre-wrap' : 'pre'

  return (
    <div
      id={rootId}
      className={cx('wash-code-editor', className)}
      data-disabled={locked ? 'true' : 'false'}
      data-wrap={wrap ? 'true' : 'false'}
      {...rest}
    >
      <div className="wash-code-titlebar">
        <div className="wash-code-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="wash-code-tabs" role={isTabbed ? 'tablist' : undefined}>
          {isTabbed && tabs
            ? tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={tab.id === activeTab?.id}
                  className="wash-code-tab cursor-pointer"
                  data-active={tab.id === activeTab?.id ? 'true' : 'false'}
                  onClick={() => onTabChange?.(tab.id)}
                >
                  {tab.fileName}
                </button>
              ))
            : (
                <span className="wash-code-tab" data-active="true">
                  {activeFileName}
                </span>
              )}
        </div>
        <label className="wash-code-lang-select">
          <span className="sr-only">Language</span>
          <select
            className="select select-xs select-bordered cursor-pointer"
            value={languageId}
            disabled={locked}
            onChange={(e) => {
              const next = e.target.value as LanguageId
              setLanguageOverride(next)
              onLanguageChange?.(next)
            }}
            aria-label="Language"
          >
            {listLanguages().map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {findOpen && showFind ? (
        <div className="wash-code-find">
          <input
            className="input input-sm input-bordered cursor-text"
            value={findQuery}
            placeholder="Find"
            aria-label="Find in editor"
            onChange={(e) => setFindQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                jumpFind(e.shiftKey)
              }
              if (e.key === 'Escape') setFindOpen(false)
            }}
            autoFocus
          />
          {replaceOpen ? (
            <input
              className="input input-sm input-bordered cursor-text"
              value={replaceQuery}
              placeholder="Replace"
              aria-label="Replace with"
              onChange={(e) => setReplaceQuery(e.target.value)}
            />
          ) : null}
          <button
            type="button"
            className="btn btn-sm btn-ghost cursor-pointer"
            onClick={() => jumpFind(false)}
          >
            Next
          </button>
          <button
            type="button"
            className="btn btn-sm btn-ghost cursor-pointer"
            onClick={() => jumpFind(true)}
          >
            Prev
          </button>
          {replaceOpen ? (
            <>
              <button
                type="button"
                className="btn btn-sm btn-ghost cursor-pointer"
                onClick={replaceOne}
              >
                Replace
              </button>
              <button
                type="button"
                className="btn btn-sm btn-ghost cursor-pointer"
                onClick={replaceAll}
              >
                All
              </button>
            </>
          ) : null}
          <button
            type="button"
            className="btn btn-sm btn-ghost cursor-pointer"
            onClick={() => {
              setFindOpen(false)
              setReplaceOpen(false)
            }}
          >
            Close
          </button>
        </div>
      ) : null}

      {gotoOpen ? (
        <div className="wash-code-find">
          <input
            className="input input-sm input-bordered cursor-text w-24"
            value={gotoLine}
            placeholder="Line"
            aria-label="Go to line"
            onChange={(e) => setGotoLine(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                goToLineNumber()
              }
              if (e.key === 'Escape') setGotoOpen(false)
            }}
            autoFocus
          />
          <button
            type="button"
            className="btn btn-sm btn-primary cursor-pointer"
            onClick={goToLineNumber}
          >
            Go
          </button>
          <button
            type="button"
            className="btn btn-sm btn-ghost cursor-pointer"
            onClick={() => setGotoOpen(false)}
          >
            Close
          </button>
        </div>
      ) : null}

      <div className="wash-code-body" style={bodyStyle}>
        <div className="wash-code-gutter" ref={gutterRef} aria-hidden="true">
          {lines.map((_, i) => {
            const diag = diagByLine.get(i + 1)
            return (
              <div
                key={i}
                className="wash-code-gutter-line"
                data-active={cursor.line === i + 1 ? 'true' : 'false'}
                data-diagnostic={diag?.severity ?? undefined}
                title={diag?.message}
              >
                {diag ? (
                  <span className="wash-code-gutter-mark" aria-hidden="true">
                    !
                  </span>
                ) : null}
                {i + 1}
              </div>
            )
          })}
        </div>
        <div className="wash-code-pane">
          <pre
            ref={highlightRef}
            className="wash-code-highlight"
            aria-hidden="true"
            style={{ whiteSpace }}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
          <textarea
            ref={textareaRef}
            className="wash-code-input cursor-text"
            style={{ whiteSpace }}
            value={source}
            disabled={locked}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            aria-label={`Code editor ${activeFileName}`}
            onChange={(e) => {
              historyRef.current.push({
                value: source,
                selectionStart: e.target.selectionStart,
                selectionEnd: e.target.selectionEnd,
              })
              emitChange(e.target.value)
            }}
            onScroll={syncScroll}
            onKeyDown={onKeyDown}
            onKeyUp={updateCursor}
            onClick={updateCursor}
            onSelect={updateCursor}
          />
          {completion ? (
            <ul className="wash-code-completions" role="listbox">
              {completion.items.map((item, i) => (
                <li key={`${item.label}-${i}`}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={i === completion.index}
                    className={cx(
                      'wash-code-completion cursor-pointer',
                      i === completion.index && 'is-active',
                    )}
                    onMouseDown={(ev) => {
                      ev.preventDefault()
                      acceptCompletion(item.insert)
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="wash-code-statusbar">
        <span>
          Ln {cursor.line}, Col {cursor.col}
          {diagnostics.length > 0
            ? ` · ${diagnostics.length} issue${diagnostics.length === 1 ? '' : 's'}`
            : ''}
        </span>
        <div className="wash-code-status-actions">
          <button
            type="button"
            className="btn btn-ghost btn-xs cursor-pointer"
            onClick={() => setWrap(!wrap)}
          >
            {wrap ? 'Wrap' : 'No wrap'}
          </button>
          <span className="uppercase">{pack.label}</span>
        </div>
      </div>
    </div>
  )
}

export default CodeEditor
