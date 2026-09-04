export const installGuide = {
  mavenCoordinates: 'com.mariesta.menzies:menzies-design-wash-compose:1.0.1',
  modulePath: 'packages/menzies-design-wash-compose',
  demoApp: 'apps/demo-android',
  packageNamespace: 'com.mariesta.menzies.washui',
  mcpPackageName: '@menzies-mariesta-com/wash-compose-mcp',
  targets: ['android', 'desktop (jvm)', 'js (compile)', 'ios (compile)'],
  gradle: {
    settings: 'Included via monorepo settings.gradle.kts as :menzies-design-wash-compose',
    dependency: `implementation("com.mariesta.menzies:menzies-design-wash-compose:1.0.1")`,
    localProject: `implementation(project(":menzies-design-wash-compose"))`,
  },
  steps: [
    'From monorepo root, ensure Android SDK is configured (local.properties)',
    'Depend on :menzies-design-wash-compose (or published Maven artifact when available)',
    'Wrap UI in WashProvider { … }',
    'Use WashScaffold / WashTopBar for shell chrome (no Material3 Scaffold required)',
    'Import LucideIcons.* and BrandIcons.* ImageVectors; render with WashIcon',
    'Regenerate theme schemes from web CSS when pigments change: npm run generate:compose-themes',
  ],
  buildCommands: [
    './gradlew :menzies-design-wash-compose:check',
    './gradlew :demo-android:assembleDebug',
    'npm run build:compose',
  ],
  notes: [
    'No Material3 dependency: primitives are Foundation / Canvas only.',
    'Pigment color schemes are generated from menzies-design-wash-ui/src/styles/themes.css.',
    'Lucide pin mirrors web lucide-react 1.28.0 path data.',
  ],
}

export type DocSection = {
  id: string
  title: string
  content: string
  keywords: string[]
}

export const docSections: DocSection[] = [
  {
    id: 'install',
    title: 'Install (Android / KMP)',
    keywords: ['gradle', 'android', 'dependency', 'kmp'],
    content: `Library module: packages/menzies-design-wash-compose
Namespace: com.mariesta.menzies.washui

Local:
implementation(project(":menzies-design-wash-compose"))

Build:
./gradlew :menzies-design-wash-compose:check
./gradlew :demo-android:assembleDebug`,
  },
  {
    id: 'boot',
    title: 'Boot with WashProvider',
    keywords: ['WashProvider', 'theme', 'pigment'],
    content: `WashProvider(defaultPigment = WashPigment.mineral) {
  WashScaffold(
    topBar = { WashTopBar(title = { WashText("Demo") }) },
  ) { _ ->
    WashButton(onClick = { }, variant = WashButtonVariant.Primary) {
      WashText("Save")
    }
  }
}`,
  },
  {
    id: 'icons',
    title: 'Icons',
    keywords: ['lucide', 'brand', 'WashIcon'],
    content: `Lucide: LucideIcons.Palette (files under icons/lucide/)
Brands: BrandIcons.GitHub (files under icons/brands/)

WashIcon(
  imageVector = LucideIcons.Search,
  contentDescription = "Search",
  tint = WashTheme.colors.primary,
)`,
  },
  {
    id: 'themes',
    title: 'Themes',
    keywords: ['WashPigment', 'WashMode', 'colors'],
    content: `Access colors via WashTheme.colors inside @Composable.
Schemes generated from web themes.css.
Regenerate: python3 scripts/generate_wash_compose_themes.py`,
  },
  {
    id: 'shell',
    title: 'Navigation / shell',
    keywords: ['WashScaffold', 'WashTopBar', 'WashDrawer', 'safeDrawingPadding'],
    content: `WashScaffold applies safeDrawingPadding for edge-to-edge.
Use WashTopBar, WashDrawer, WashBottomSheet for chrome.
Do not pull in Material3 Scaffold.`,
  },
  {
    id: 'mcp',
    title: 'MCP server (Android)',
    keywords: ['mcp', 'cursor', 'ai'],
    content: `Package @menzies-mariesta-com/wash-compose-mcp exposes Compose Wash APIs to AI tools.

Preferred: npx -y @menzies-mariesta-com/wash-compose-mcp@1.0.1
Requires .npmrc for GitHub Packages (@menzies-mariesta-com scope).

Monorepo contributors (optional): npm run mcp:compose:build then node packages/wash-compose-mcp/dist/index.js`,
  },
  {
    id: 'web-parity',
    title: 'Web parity',
    keywords: ['wash-ui', 'equivalent', 'port'],
    content: `Compose ports web primitives with Wash* naming (Button → WashButton).
Themes share pigment ids with menzies-design-wash-ui.
Use wash-ui-web MCP for HTML/JSX/Svelte; use wash-compose-android MCP for Kotlin.`,
  },
]

export function searchDocs(query: string): DocSection[] {
  const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean)
  if (!tokens.length) return docSections
  return docSections.filter((s) => {
    const hay = [s.id, s.title, s.content, ...s.keywords].join(' ').toLowerCase()
    return tokens.every((t) => hay.includes(t))
  })
}

export const kotlinSnippets: Record<
  string,
  { title: string; code: string; keywords: string[] }
> = {
  provider: {
    title: 'WashProvider + scaffold',
    keywords: ['boot', 'shell'],
    code: `import com.mariesta.menzies.washui.WashProvider
import com.mariesta.menzies.washui.primitives.WashScaffold
import com.mariesta.menzies.washui.primitives.WashTopBar
import com.mariesta.menzies.washui.primitives.WashText
import com.mariesta.menzies.washui.theme.WashPigment

WashProvider(defaultPigment = WashPigment.mineral) {
  WashScaffold(
    topBar = { WashTopBar(title = { WashText("Wash gallery") }) },
  ) { _ ->
    // screen content
  }
}`,
  },
  button: {
    title: 'WashButton',
    keywords: ['button', 'primary'],
    code: `import com.mariesta.menzies.washui.primitives.WashButton
import com.mariesta.menzies.washui.primitives.WashButtonVariant
import com.mariesta.menzies.washui.primitives.WashText

WashButton(
  onClick = { /* save */ },
  variant = WashButtonVariant.Primary,
  loading = false,
) {
  WashText("Save changes")
}`,
  },
  icon: {
    title: 'WashIcon Lucide + brand',
    keywords: ['lucide', 'brand'],
    code: `import com.mariesta.menzies.washui.icons.WashIcon
import com.mariesta.menzies.washui.icons.LucideIcons
import com.mariesta.menzies.washui.icons.BrandIcons
import com.mariesta.menzies.washui.icons.lucide.Palette
import com.mariesta.menzies.washui.icons.brands.GitHub
import com.mariesta.menzies.washui.theme.WashTheme

WashIcon(
  imageVector = LucideIcons.Palette,
  contentDescription = "Palette",
  tint = WashTheme.colors.primary,
)
WashIcon(
  imageVector = BrandIcons.GitHub,
  contentDescription = "GitHub",
)`,
  },
  theme: {
    title: 'Read / set theme',
    keywords: ['pigment', 'mode'],
    code: `import com.mariesta.menzies.washui.theme.WashTheme
import com.mariesta.menzies.washui.theme.LocalWashTheme
import com.mariesta.menzies.washui.theme.WashMode

val colors = WashTheme.colors
val state = LocalWashTheme.current
state.setMode(WashMode.Dark)
state.setPigment(com.mariesta.menzies.washui.theme.WashPigment.cerulean)`,
  },
}
