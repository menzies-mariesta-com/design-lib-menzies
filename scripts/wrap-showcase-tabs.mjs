#!/usr/bin/env node
/**
 * Wraps each <Section> body in demo gallery pages with ShowcaseTabs.
 */
import fs from 'node:fs'
import path from 'node:path'

const demoSrc = path.resolve('apps/demo/src')

const pages = [
  'QrCodePage.tsx',
  'RadialProgressPage.tsx',
  'RadioPage.tsx',
  'RangePage.tsx',
  'RatingPage.tsx',
  'RipplePage.tsx',
  'SelectPage.tsx',
  'SelectSearchPage.tsx',
  'SkeletonPage.tsx',
  'SnackbarPage.tsx',
  'StatPage.tsx',
  'StatusPage.tsx',
  'StepsPage.tsx',
  'SwapPage.tsx',
  'TablePage.tsx',
  'TabsPage.tsx',
  'TagsInputPage.tsx',
  'TextRotatePage.tsx',
  'TextareaPage.tsx',
  'ThemeControllerPage.tsx',
  'TimelinePage.tsx',
  'ToastPage.tsx',
  'TogglePage.tsx',
  'TooltipPage.tsx',
  'TransferListPage.tsx',
  'ValidatorPage.tsx',
  'AuthScreenPage.tsx',
  'TwoFactorPage.tsx',
  'ForgotPasswordPage.tsx',
  'OtpTemplatePage.tsx',
]

function escapeTemplateLiteral(value) {
  return value.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
}

function stripGalleryHelpers(content) {
  return content
    .replace(/<ClassLabel[^>]*\/>/g, '')
    .replace(/<ClassLabel[^>]*>[\s\S]*?<\/ClassLabel>/g, '')
    .replace(/<Sample[^>]*>/g, '')
    .replace(/<\/Sample>/g, '')
    .trim()
}

function toHtml(jsx) {
  let html = stripGalleryHelpers(jsx)
  html = html
    .replace(/\{Array\.from\([^}]+\}\)/g, '<span></span>'.repeat(6))
    .replace(/\{[^}]*\.map\([\s\S]*?\)\}/g, '<!-- repeat for each item -->')
    .replace(/\{[^}]*\}/g, '')
    .replace(/className=/g, 'class=')
    .replace(/htmlFor=/g, 'for=')
    .replace(/defaultChecked/g, 'checked')
    .replace(/defaultValue=/g, 'value=')
    .replace(/strokeWidth=\{[^}]+\}/g, '')
    .replace(/aria-hidden=\{[^}]+\}/g, 'aria-hidden="true"')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
  return html
}

function toJsx(jsx) {
  return stripGalleryHelpers(jsx).replace(/\n{3,}/g, '\n\n').trim()
}

function findSectionBlocks(source) {
  const blocks = []
  const openRe = /<Section\b/g
  let match

  while ((match = openRe.exec(source)) !== null) {
    const openStart = match.index
    const openEnd = source.indexOf('>', openStart) + 1
    let depth = 1
    let i = openEnd

    while (i < source.length && depth > 0) {
      const nextOpen = source.indexOf('<Section', i)
      const nextClose = source.indexOf('</Section>', i)
      if (nextClose === -1) break

      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth += 1
        i = nextOpen + 8
      } else {
        depth -= 1
        if (depth === 0) {
          const closeEnd = nextClose + '</Section>'.length
          blocks.push({ start: openStart, end: closeEnd, inner: source.slice(openEnd, nextClose) })
          openRe.lastIndex = closeEnd
          break
        }
        i = nextClose + 10
      }
    }
  }

  return blocks
}

function ensureImport(source) {
  source = source.replace(
    /import \{\nimport \{ ShowcaseTabs \} from '\.\/components\/ShowcaseTabs'\n/g,
    'import {\n',
  )
  if (/^import \{ ShowcaseTabs \} from '\.\/components\/ShowcaseTabs'/m.test(source)) {
    return source
  }

  const importLine = "import { ShowcaseTabs } from './components/ShowcaseTabs'\n"
  const importBlock = source.match(/^(?:import[\s\S]*?from ['"][^'"]+['"];?\n)+/)
  if (importBlock) {
    const end = importBlock[0].length
    return source.slice(0, end) + importLine + source.slice(end)
  }
  return importLine + source
}

function wrapInner(inner) {
  const trimmed = inner.trim()
  if (trimmed.includes('<ShowcaseTabs')) return inner

  const html = toHtml(trimmed)
  const jsx = toJsx(trimmed)
  const indent = inner.match(/^\n(\s*)/)?.[1] ?? '          '

  return (
    `\n${indent}<ShowcaseTabs\n` +
    `${indent}  preview={\n` +
    `${indent}    <>\n` +
    trimmed
      .split('\n')
      .map((line) => `${indent}      ${line}`)
      .join('\n') +
    `\n${indent}    </>\n` +
    `${indent}  }\n` +
    `${indent}  html={\`${escapeTemplateLiteral(html)}\`}\n` +
    `${indent}  jsx={\`${escapeTemplateLiteral(jsx)}\`}\n` +
    `${indent}/>\n${indent.slice(2)}`
  )
}

function transformFile(filePath) {
  let source = fs.readFileSync(filePath, 'utf8')
  if ((source.match(/<ShowcaseTabs/g) ?? []).length >= 2) {
    return { skipped: true, sections: 0 }
  }

  source = ensureImport(source)
  let sections = 0

  for (let n = 0; n < 50; n++) {
    const blocks = findSectionBlocks(source)
    const unwrapped = blocks.find((b) => !b.inner.trim().includes('<ShowcaseTabs'))
    if (!unwrapped) break

    const wrappedInner = wrapInner(unwrapped.inner)
    source =
      source.slice(0, unwrapped.start) +
      source.slice(unwrapped.start, unwrapped.end).replace(unwrapped.inner, wrappedInner) +
      source.slice(unwrapped.end)
    sections += 1
  }

  fs.writeFileSync(filePath, source)
  return { skipped: sections === 0, sections }
}

for (const page of pages) {
  const filePath = path.join(demoSrc, page)
  if (!fs.existsSync(filePath)) {
    console.log('missing', page)
    continue
  }
  const result = transformFile(filePath)
  console.log(page, result)
}
