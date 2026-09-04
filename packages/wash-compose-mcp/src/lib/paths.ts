import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))

export function hasLiveRepo(): boolean {
  return Boolean(findLiveRepoRoot())
}

export function findLiveRepoRoot(): string | null {
  const fromEnv = process.env.WASH_UI_REPO_ROOT?.trim()
  if (fromEnv && existsSync(fromEnv)) {
    const root = resolve(fromEnv)
    if (existsSync(join(root, 'packages/menzies-design-wash-compose/build.gradle.kts'))) {
      return root
    }
  }

  const candidates = [
    join(here, '../../../..'),
    join(here, '../../..'),
    process.cwd(),
  ]
  for (const c of candidates) {
    const root = resolve(c)
    if (
      existsSync(join(root, 'packages/menzies-design-wash-compose/build.gradle.kts')) &&
      existsSync(join(root, 'packages/wash-compose-mcp/package.json'))
    ) {
      return root
    }
  }
  return null
}

/** Monorepo root when available; otherwise empty string (use embedded snapshot). */
export function repoRoot(): string {
  return findLiveRepoRoot() ?? ''
}

export function composeKotlinRoot(): string | null {
  const root = findLiveRepoRoot()
  return root
    ? join(
        root,
        'packages/menzies-design-wash-compose/src/commonMain/kotlin/com/mariesta/menzies/washui',
      )
    : null
}

export function dataMode(): 'live' | 'embedded' {
  return hasLiveRepo() ? 'live' : 'embedded'
}
