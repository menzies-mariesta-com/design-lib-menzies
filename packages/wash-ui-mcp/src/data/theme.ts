export const themeTokensDoc = {
  overview:
    'Wash UI uses pigment themes with light and dark paper modes. Each pigment sets daisyUI-compatible CSS variables and data-theme on html.',
  cssVariables: [
    { name: '--wash-a', description: 'Primary wash tint' },
    { name: '--wash-b', description: 'Secondary wash tint' },
    { name: '--wash-c', description: 'Accent wash tint' },
    { name: '--paper-fiber', description: 'Paper background texture color' },
    { name: '--pigment-grain', description: 'Subtle grain overlay' },
    { name: '--ink-muted', description: 'Muted body copy color' },
    { name: '--ink-border', description: 'Hairline borders' },
    { name: '--ease-absorb', description: 'Motion easing for soak animations' },
    { name: '--shadow-paper-md', description: 'Paper elevation shadow' },
    { name: '--font-display', description: 'Display heading font stack' },
    { name: '--font-sans', description: 'Body font stack' },
    { name: '--font-mono', description: 'Monospace font stack' },
  ],
  utilityClasses: [
    'wash-panel',
    'wash-panel-flush',
    'wash-shell',
    'wash-shell-main',
    'paper-grain',
    'soak-in',
    'ripple',
    'label-ink',
    'page-wash',
    'WashBackground',
    'WashShell',
  ],
  api: [
    {
      name: 'applyTheme',
      import: '@menzies-mariesta-com/menzies-design-wash-ui/theme',
      signature: "applyTheme(pigment: WatercolorThemeId, mode: 'light' | 'dark')",
      description: 'Apply pigment and mode to document root.',
    },
    {
      name: 'applyMode',
      import: '@menzies-mariesta-com/menzies-design-wash-ui/theme',
      signature: "applyMode(mode: 'light' | 'dark')",
      description: 'Switch mode while keeping current pigment.',
    },
    {
      name: 'watercolorThemes',
      import: '@menzies-mariesta-com/menzies-design-wash-ui/theme',
      signature: 'watercolorThemes: { id, label, swatch }[]',
      description: 'All available pigment definitions.',
    },
    {
      name: 'readStoredTheme',
      import: '@menzies-mariesta-com/menzies-design-wash-ui/theme',
      description: 'Read persisted pigment from localStorage.',
    },
    {
      name: 'readStoredMode',
      import: '@menzies-mariesta-com/menzies-design-wash-ui/theme',
      description: 'Read persisted mode from localStorage.',
    },
    {
      name: 'THEME_CHANGE_EVENT',
      import: '@menzies-mariesta-com/menzies-design-wash-ui/theme',
      description: 'Custom event fired when theme changes.',
    },
  ],
  react: [
    {
      name: 'useWash',
      description: 'React hook: pigment, mode, setPigment, setMode from WashProvider.',
    },
    {
      name: 'WashProvider',
      description: 'React provider with defaultPigment and defaultMode props.',
    },
  ],
  dataAttributes: [
    { attr: 'data-theme', description: 'Pigment id or pigment-dark (e.g. mineral, cerulean-dark)' },
  ],
}
