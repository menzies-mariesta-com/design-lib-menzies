#!/usr/bin/env node
/**
 * Audit ShowcaseTabs Svelte paste readiness.
 * Flags pages whose html (primary Svelte source) still looks stubby,
 * or that lack svelteFiles for known complex surfaces.
 *
 * Usage: node apps/demo/scripts/audit-svelte-stubs.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src')

const STUB_RE =
  /<!--\s*Sample\s*-->|wash-chart["'\s>][\s\S]{0,80}<\/div>|<LineChart\b|<BarChart\b|<Select\b[^>]*\/>|#plain|<!--\s*\w+Demo\s*-->/i

const pages = []
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(p)
    else if (ent.name.endsWith('Page.tsx') || ent.name.endsWith('Page.ts')) pages.push(p)
  }
}
walk(root)

const issues = []
for (const file of pages) {
  const text = fs.readFileSync(file, 'utf8')
  if (!text.includes('ShowcaseTabs')) continue
  const rel = path.relative(root, file)
  const hasKit = /svelteFiles\s*=/.test(text)
  const hasSvelteProp = /\bsvelte\s*=\{/.test(text)
  if (STUB_RE.test(text) && !hasKit) {
    issues.push({ rel, reason: 'stub-html-or-component-api', hasKit, hasSvelteProp })
  } else if (!hasKit && !hasSvelteProp && /html=\{["`]<!--/.test(text)) {
    issues.push({ rel, reason: 'comment-only-html', hasKit, hasSvelteProp })
  }
}

console.log(`Scanned ${pages.length} *Page files`)
console.log(`Issues: ${issues.length}`)
for (const i of issues) {
  console.log(`- ${i.rel}: ${i.reason}`)
}
process.exitCode = issues.length > 0 ? 1 : 0
