#!/usr/bin/env node
/** Fix broken ShowcaseTabs imports. */
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

function fixImports(source) {
  let next = source.replace(
    /import \{\nimport \{ ShowcaseTabs \} from '\.\/components\/ShowcaseTabs'\n/g,
    'import {\n',
  )

  next = next.replace(
    /^import \{ ShowcaseTabs \} from '\.\/components\/ShowcaseTabs'\n/gm,
    '',
  )

  if (!next.includes('<ShowcaseTabs')) return next

  const importLine = "import { ShowcaseTabs } from './components/ShowcaseTabs'\n"
  const importBlock = next.match(
    /^(?:import[\s\S]*?from ['"][^'"]+['"];?\n)+/,
  )
  if (importBlock) {
    const end = importBlock[0].length
    return next.slice(0, end) + importLine + next.slice(end)
  }

  return importLine + next
}

for (const page of pages) {
  const filePath = path.join(demoSrc, page)
  if (!fs.existsSync(filePath)) continue
  const original = fs.readFileSync(filePath, 'utf8')
  const fixed = fixImports(original)
  if (fixed !== original) {
    fs.writeFileSync(filePath, fixed)
    console.log('fixed', page)
  }
}
