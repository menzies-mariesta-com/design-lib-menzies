import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  Card,
  CardBody,
  washRecipes,
} from '@menzies-mariesta-com/menzies-design-wash-ui'
import {
  CodeEditor,
  listLanguages,
  type CodeEditorTab,
  type LanguageId,
} from '@menzies-mariesta-com/menzies-design-wash-ui/editors'
import { Check, ClipboardCopy } from '@menzies-mariesta-com/menzies-design-wash-ui/icons'

const SAMPLE_BY_LANG: Record<LanguageId, { fileName: string; value: string }> = {
  typescript: {
    fileName: 'app.ts',
    value: `import { initWash } from '@menzies-mariesta-com/menzies-design-wash-ui/core'

export function boot(): boolean {
  initWash({ pigment: 'mineral', mode: 'light' })
  return true
}
`,
  },
  javascript: {
    fileName: 'boot.js',
    value: `export function greet(name) {
  return 'Hello ' + name
}
`,
  },
  json: {
    fileName: 'theme.json',
    value: `{
  "pigment": "mineral",
  "mode": "dark",
  "version": 1
}
`,
  },
  css: {
    fileName: 'panel.css',
    value: `.wash-panel {
  border-radius: 0.75rem;
  background: #f7f4ef;
}
`,
  },
  html: {
    fileName: 'card.html',
    value: `<section class="wash-panel">
  <h2>Plate</h2>
  <p>Studio ready.</p>
</section>
`,
  },
  markdown: {
    fileName: 'NOTES.md',
    value: `# Studio notes

- Grammar packs, not LSP
- Ctrl/Cmd+F find, Ctrl/Cmd+H replace
`,
  },
  plaintext: {
    fileName: 'notes.txt',
    value: `Wash UI code editor
Line numbers, tabs, find.
`,
  },
  yaml: {
    fileName: 'config.yaml',
    value: `pigment: mineral
mode: light
features:
  - editors
  - charts
`,
  },
  toml: {
    fileName: 'Cargo.toml',
    value: `[package]
name = "wash-demo"
version = "0.1.0"
`,
  },
  xml: {
    fileName: 'data.xml',
    value: `<?xml version="1.0"?>
<root>
  <item id="1">Plate</item>
</root>
`,
  },
  sql: {
    fileName: 'query.sql',
    value: `SELECT id, name
FROM plates
WHERE status = 'Review'
ORDER BY updated_at DESC
LIMIT 25;
`,
  },
  graphql: {
    fileName: 'schema.graphql',
    value: `type Plate {
  id: ID!
  name: String!
}

type Query {
  plates: [Plate!]!
}
`,
  },
  shell: {
    fileName: 'build.sh',
    value: `#!/usr/bin/env bash
set -euo pipefail
npm run build
`,
  },
  python: {
    fileName: 'main.py',
    value: `def greet(name: str) -> str:
    return f"Hello {name}"

if __name__ == "__main__":
    print(greet("Wash"))
`,
  },
  go: {
    fileName: 'main.go',
    value: `package main

import "fmt"

func main() {
  fmt.Println("Wash UI")
}
`,
  },
  rust: {
    fileName: 'lib.rs',
    value: `pub fn boot() -> bool {
    println!("wash");
    true
}
`,
  },
  java: {
    fileName: 'Main.java',
    value: `public class Main {
  public static void main(String[] args) {
    System.out.println("Wash UI");
  }
}
`,
  },
  c: {
    fileName: 'main.c',
    value: `#include <stdio.h>

int main(void) {
  printf("Wash UI\\n");
  return 0;
}
`,
  },
  cpp: {
    fileName: 'main.cpp',
    value: `#include <iostream>

int main() {
  std::cout << "Wash UI\\n";
  return 0;
}
`,
  },
  kotlin: {
    fileName: 'Main.kt',
    value: `fun main() {
  println("Wash UI")
}
`,
  },
  svelte: {
    fileName: 'App.svelte',
    value: `<script lang="ts">
  let count = $state(0)
</script>

<button onclick={() => count += 1}>
  clicks {count}
</button>
`,
  },
  vue: {
    fileName: 'App.vue',
    value: `<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
`,
  },
}

const paneCardClassName = `w-full overflow-hidden bg-base-100 ${washRecipes.paneCard}`

function EditorPaneCard({
  title,
  className = '',
  children,
}: {
  title: string
  className?: string
  children: ReactNode
}) {
  return (
    <section className={className}>
      <Card bordered className={paneCardClassName}>
        <CardBody className="gap-3 p-4 sm:p-5">
          <h2 className="font-display text-lg font-semibold">{title}</h2>
          {children}
        </CardBody>
      </Card>
    </section>
  )
}

function buildInitialTabs(): CodeEditorTab[] {
  return listLanguages().map((lang) => {
    const sample = SAMPLE_BY_LANG[lang.id]
    return {
      id: lang.id,
      fileName: sample.fileName,
      value: sample.value,
      language: lang.id,
    }
  })
}

function resolveInitialTab(language?: LanguageId): string {
  if (language && SAMPLE_BY_LANG[language]) return language
  return 'typescript'
}

export default function CodeEditorTemplatePage({
  language,
}: {
  language?: LanguageId
} = {}) {
  const [tabs, setTabs] = useState<CodeEditorTab[]>(() => buildInitialTabs())
  const [activeTabId, setActiveTabId] = useState<string>(() =>
    resolveInitialTab(language),
  )
  const [copying, setCopying] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!language) return
    setActiveTabId(resolveInitialTab(language))
  }, [language])

  const activeTab = useMemo(
    () => tabs.find((t) => t.id === activeTabId) ?? tabs[0],
    [tabs, activeTabId],
  )

  const activeLabel =
    listLanguages().find((pack) => pack.id === activeTab?.language)?.label ??
    activeTab?.language ??
    'Source'

  const onCopy = async () => {
    setCopying(true)
    try {
      await navigator.clipboard.writeText(activeTab?.value ?? '')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } finally {
      setCopying(false)
    }
  }

  return (
    <div className="space-y-6">
      <header className="soak-in">
        <p className="label-ink mb-2">Studio template</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Code editor
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted md:text-base">
          Theme-aware grammar packs (not real language servers). Token colors use
          Wash pigment CSS variables so highlighting tracks light/dark and the
          active pigment. Import from the optional{' '}
          <code className="text-xs">/editors</code> entry.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className={`btn btn-sm btn-secondary cursor-pointer gap-1.5 ${copying ? 'btn-disabled cursor-not-allowed' : ''}`}
          disabled={copying}
          aria-busy={copying}
          onClick={() => void onCopy()}
        >
          {copying ? (
            <span className="loading loading-spinner loading-sm" aria-hidden="true" />
          ) : copied ? (
            <Check className="size-4" aria-hidden="true" />
          ) : (
            <ClipboardCopy className="size-4" aria-hidden="true" />
          )}
          {copied ? 'Copied' : 'Copy code'}
        </button>
      </div>

      <EditorPaneCard title={activeLabel}>
        <p className="text-xs text-ink-muted">
          Shortcuts: Ctrl/Cmd+F find, Ctrl/Cmd+H replace, Ctrl/Cmd+G go to line,
          Ctrl/Cmd+/ comment, Tab indent. Completions are keyword/snippet packs,
          not LSP. Syntax tokens (`.wash-code-tok-*`) follow the current pigment.
        </p>
        <CodeEditor
          tabs={tabs}
          activeTabId={activeTabId}
          onTabChange={setActiveTabId}
          onChange={(next, tabId) => {
            const id = tabId ?? activeTabId
            setTabs((prev) =>
              prev.map((t) => (t.id === id ? { ...t, value: next } : t)),
            )
          }}
          onLanguageChange={(lang) => {
            const sample = SAMPLE_BY_LANG[lang]
            if (!sample) return
            setActiveTabId(lang)
            setTabs((prev) => {
              if (prev.some((t) => t.id === lang)) {
                return prev.map((t) =>
                  t.id === lang
                    ? { ...t, language: lang, fileName: sample.fileName }
                    : t,
                )
              }
              return prev
            })
          }}
          minHeight="22rem"
        />
      </EditorPaneCard>
    </div>
  )
}
