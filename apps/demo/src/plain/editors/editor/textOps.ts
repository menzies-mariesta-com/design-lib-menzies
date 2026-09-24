export type HistorySnapshot = {
  value: string
  selectionStart: number
  selectionEnd: number
}

export class EditorHistory {
  private undoStack: HistorySnapshot[] = []
  private redoStack: HistorySnapshot[] = []
  private lastPush = 0

  clear() {
    this.undoStack = []
    this.redoStack = []
  }

  push(snapshot: HistorySnapshot, coalesceMs = 400) {
    const now = Date.now()
    const top = this.undoStack[this.undoStack.length - 1]
    if (top && now - this.lastPush < coalesceMs && top.value !== snapshot.value) {
      this.undoStack[this.undoStack.length - 1] = snapshot
    } else if (!top || top.value !== snapshot.value) {
      this.undoStack.push(snapshot)
      if (this.undoStack.length > 200) this.undoStack.shift()
    }
    this.lastPush = now
    this.redoStack = []
  }

  undo(current: HistorySnapshot): HistorySnapshot | null {
    if (this.undoStack.length === 0) return null
    const prev = this.undoStack.pop()!
    this.redoStack.push(current)
    return prev
  }

  redo(current: HistorySnapshot): HistorySnapshot | null {
    if (this.redoStack.length === 0) return null
    const next = this.redoStack.pop()!
    this.undoStack.push(current)
    return next
  }
}

export function indentSelection(
  source: string,
  start: number,
  end: number,
  indent = '  ',
): { value: string; start: number; end: number } {
  if (start === end) {
    const next = source.slice(0, start) + indent + source.slice(end)
    return { value: next, start: start + indent.length, end: start + indent.length }
  }
  const lineStart = source.lastIndexOf('\n', start - 1) + 1
  const lineEnd =
    end > 0 && source[end - 1] === '\n'
      ? end - 1
      : source.indexOf('\n', end) === -1
        ? source.length
        : source.indexOf('\n', end)
  const block = source.slice(lineStart, lineEnd)
  const indented = block
    .split('\n')
    .map((line) => indent + line)
    .join('\n')
  const value = source.slice(0, lineStart) + indented + source.slice(lineEnd)
  return {
    value,
    start: start + indent.length,
    end: end + indent.length * block.split('\n').length,
  }
}

export function outdentSelection(
  source: string,
  start: number,
  end: number,
  indent = '  ',
): { value: string; start: number; end: number } {
  const lineStart = source.lastIndexOf('\n', start - 1) + 1
  const lineEnd =
    end > 0 && source[end - 1] === '\n'
      ? end - 1
      : source.indexOf('\n', end) === -1
        ? source.length
        : source.indexOf('\n', end)
  const block = source.slice(lineStart, lineEnd)
  let removedBefore = 0
  let removedTotal = 0
  const lines = block.split('\n')
  const outdented = lines
    .map((line, i) => {
      const strip = line.startsWith(indent)
        ? indent.length
        : line.startsWith(' ')
          ? 1
          : line.startsWith('\t')
            ? 1
            : 0
      if (i === 0) removedBefore = strip
      removedTotal += strip
      return line.slice(strip)
    })
    .join('\n')
  const value = source.slice(0, lineStart) + outdented + source.slice(lineEnd)
  return {
    value,
    start: Math.max(lineStart, start - removedBefore),
    end: Math.max(lineStart, end - removedTotal),
  }
}

export function toggleLineComment(
  source: string,
  start: number,
  end: number,
  comment: string,
): { value: string; start: number; end: number } {
  const prefix = comment.endsWith(' ') ? comment : `${comment} `
  const lineStart = source.lastIndexOf('\n', start - 1) + 1
  const last =
    end > 0 && source[end - 1] === '\n' ? end - 1 : end
  const lineEnd =
    source.indexOf('\n', last) === -1 ? source.length : source.indexOf('\n', last)
  const block = source.slice(lineStart, lineEnd)
  const lines = block.split('\n')
  const allCommented = lines.every(
    (line) => line.trim() === '' || line.trimStart().startsWith(comment),
  )
  let delta = 0
  const nextLines = lines.map((line) => {
    if (line.trim() === '') return line
    const lead = line.match(/^\s*/)?.[0] ?? ''
    const body = line.slice(lead.length)
    if (allCommented) {
      if (body.startsWith(prefix)) {
        delta -= prefix.length
        return lead + body.slice(prefix.length)
      }
      if (body.startsWith(comment)) {
        delta -= comment.length
        return lead + body.slice(comment.length)
      }
      return line
    }
    delta += prefix.length
    return lead + prefix + body
  })
  const value = source.slice(0, lineStart) + nextLines.join('\n') + source.slice(lineEnd)
  return {
    value,
    start: start + (allCommented ? -Math.min(prefix.length, start - lineStart) : 0),
    end: end + delta,
  }
}

export function toggleBlockComment(
  source: string,
  start: number,
  end: number,
  open: string,
  close: string,
): { value: string; start: number; end: number } {
  const selected = source.slice(start, end)
  if (selected.startsWith(open) && selected.endsWith(close)) {
    const inner = selected.slice(open.length, selected.length - close.length)
    const value = source.slice(0, start) + inner + source.slice(end)
    return { value, start, end: start + inner.length }
  }
  const wrapped = `${open}${selected || ' '}${close}`
  const value = source.slice(0, start) + wrapped + source.slice(end)
  return {
    value,
    start: start + open.length,
    end: start + open.length + (selected.length || 1),
  }
}

export function pairBracket(
  source: string,
  start: number,
  end: number,
  open: string,
  close: string,
): { value: string; start: number; end: number } {
  const selected = source.slice(start, end)
  const value = source.slice(0, start) + open + selected + close + source.slice(end)
  if (selected) {
    return { value, start: start + 1, end: end + 1 }
  }
  return { value, start: start + 1, end: start + 1 }
}

export function autoIndentOnEnter(
  source: string,
  start: number,
): { value: string; start: number; end: number } {
  const lineStart = source.lastIndexOf('\n', start - 1) + 1
  const prev = source.slice(lineStart, start)
  const indent = prev.match(/^\s*/)?.[0] ?? ''
  const extra = /[{[(]\s*$/.test(prev) ? '  ' : ''
  const insert = `\n${indent}${extra}`
  const value = source.slice(0, start) + insert + source.slice(start)
  const caret = start + insert.length
  return { value, start: caret, end: caret }
}
