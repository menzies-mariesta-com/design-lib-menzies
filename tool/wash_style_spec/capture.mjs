#!/usr/bin/env node
/**
 * Optional Playwright capture of computed styles from daisy-inventory + built CSS.
 * Requires: npm run build:lib, npx playwright install chromium
 *
 * Usage: node tool/wash_style_spec/capture.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '../..')
const outPath = join(__dirname, 'wash_daisy_metrics.json')

async function main() {
  let playwright
  try {
    playwright = await import('playwright')
  } catch {
    console.warn('Playwright not installed; keeping existing wash_daisy_metrics.json')
    process.exit(0)
  }

  const cssPath = join(
    root,
    'packages/menzies-design-wash-ui/dist/styles.css',
  )
  const htmlPath = join(
    root,
    'packages/menzies-design-wash-ui/src/styles/daisy-inventory.html',
  )
  const inventory = readFileSync(htmlPath, 'utf8')
  const css = readFileSync(cssPath, 'utf8')
  const pageHtml = `<!DOCTYPE html><html data-theme="mineral"><head><style>${css}</style></head><body>${inventory}</body></html>`

  const browser = await playwright.chromium.launch()
  const page = await browser.newPage()
  await page.setContent(pageHtml)

  const metrics = await page.evaluate(() => {
    const el = document.querySelector('.btn.btn-primary')
    if (!el) return null
    const s = getComputedStyle(el)
    return {
      source: 'playwright computed mineral .btn.btn-primary',
      btn: {
        paddingX: parseFloat(s.paddingLeft),
        minHeight: el.getBoundingClientRect().height,
        fontSize: parseFloat(s.fontSize),
        fontWeight: parseFloat(s.fontWeight),
        borderRadius: parseFloat(s.borderRadius),
        borderWidth: parseFloat(s.borderTopWidth),
      },
    }
  })

  await browser.close()
  if (metrics) {
    const existing = JSON.parse(readFileSync(outPath, 'utf8'))
    writeFileSync(
      outPath,
      JSON.stringify({ ...existing, ...metrics, capturedAt: new Date().toISOString() }, null, 2),
    )
    console.log('Updated metrics from Playwright')
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
