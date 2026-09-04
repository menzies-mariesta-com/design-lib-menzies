import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))

/** Monorepo root (design-lib-menzies). */
export function repoRoot(): string {
  const fromEnv = process.env.WASH_UI_REPO_ROOT?.trim()
  if (fromEnv && existsSync(fromEnv)) return resolve(fromEnv)

  // dist/lib or src/lib -> package -> packages -> monorepo root
  const candidates = [
    join(here, '../../../..'),
    join(here, '../../..'),
    process.cwd(),
  ]
  for (const c of candidates) {
    const root = resolve(c)
    if (
      existsSync(join(root, 'packages/menzies-design-wash-ui/package.json')) &&
      existsSync(join(root, 'packages/wash-ui-mcp/package.json'))
    ) {
      return root
    }
  }
  return resolve(join(here, '../../../..'))
}

export function washUiSrc(): string {
  return join(repoRoot(), 'packages/menzies-design-wash-ui/src')
}
