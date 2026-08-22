export const brushApiDoc = {
  overview:
    'Brush presets drive site-wide wash atmosphere via CSS variables. Not a drawing canvas: a global load for the desk.',
  cssVariables: [
    { name: '--brush-size', description: 'Brush size in px' },
    { name: '--brush-opacity', description: 'Opacity 0-1' },
    { name: '--brush-water', description: 'Water dilution 0-1' },
    { name: '--brush-hardness', description: 'Edge hardness 0-1' },
    { name: '--brush-flow', description: 'Paint flow 0-1' },
    { name: '--brush-ripple-scale', description: 'Ripple scale multiplier' },
    { name: '--brush-soak-duration', description: 'Soak animation duration' },
  ],
  dataAttributes: [
    { attr: 'data-brush', description: 'Active brush tip shape' },
    { attr: 'data-brush-id', description: 'Active preset id' },
  ],
  api: [
    {
      name: 'applyBrushPreset',
      import: '@menzies-mariesta-com/menzies-design-wash-ui/brush',
      signature: 'applyBrushPreset(presetId: BrushPresetId)',
      description: 'Apply a named studio preset.',
      example: "applyBrushPreset('cloud-mop')",
    },
    {
      name: 'applyBrush',
      import: '@menzies-mariesta-com/menzies-design-wash-ui/brush',
      signature: 'applyBrush(state: BrushState)',
      description: 'Apply custom brush state.',
    },
    {
      name: 'brushPresets',
      import: '@menzies-mariesta-com/menzies-design-wash-ui/brush',
      description: 'Array of all presets with id, label, group, and tip shape.',
    },
    {
      name: 'brushGroups',
      import: '@menzies-mariesta-com/menzies-design-wash-ui/brush',
      description: 'Preset grouping metadata.',
    },
    {
      name: 'brushCssVars',
      import: '@menzies-mariesta-com/menzies-design-wash-ui/brush',
      description: 'Convert BrushState to CSS custom property map.',
    },
    {
      name: 'getBrushPreset',
      import: '@menzies-mariesta-com/menzies-design-wash-ui/brush',
      description: 'Look up a preset by id.',
    },
    {
      name: 'readStoredBrush',
      import: '@menzies-mariesta-com/menzies-design-wash-ui/brush',
      description: 'Read persisted brush from localStorage.',
    },
    {
      name: 'BRUSH_CHANGE_EVENT',
      import: '@menzies-mariesta-com/menzies-design-wash-ui/brush',
      description: 'Custom event fired when brush changes.',
    },
  ],
  react: [
    {
      name: 'BrushSwitcher',
      import: '@menzies-mariesta-com/menzies-design-wash-ui',
      description: 'React control to pick brush presets.',
    },
    {
      name: 'useWash().setBrush',
      description: 'Set brush from React context.',
    },
  ],
}
