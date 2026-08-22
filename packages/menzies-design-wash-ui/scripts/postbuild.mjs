import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const cssPath = resolve(root, 'dist/styles.css')

if (existsSync(cssPath)) {
  let css = readFileSync(cssPath, 'utf8')
  // Drop product banners from the compiled stylesheet
  css = css.replace(/\/\*!?\s*🌼[^]*?\*\//g, '')
  css = css.replace(/\/\*[^]*?daisyUI[^]*?\*\//gi, '')
  // Rebrand generated layer names for the public stylesheet
  css = css.replace(/@layer\s+daisyui/g, '@layer wash')
  css = css.replace(/daisyui\./g, 'wash.')
  writeFileSync(cssPath, css)
}

const junk = resolve(root, 'dist/styles-entry.js')
if (existsSync(junk)) unlinkSync(junk)
