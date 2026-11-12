#!/usr/bin/env node
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const required = [
  'WashCalendar',
  'WashTimePicker',
  'WashDatePicker',
  'WashDateTimePicker',
  'WashDateTimeFields',
  'SearchSelect',
  'Select',
  'useDetailsDropdownPlacement',
  'useTriggerWidthPx',
  'useDivDropdownHover',
  'mergeDropdownPanelStyle',
  'resolveTriggerMatchedPanelStyle',
  'attachWaterDropScrollbar',
]

const coreOnly = new Set([
  'attachWaterDropScrollbar',
  'mergeDropdownPanelStyle',
  'resolveTriggerMatchedPanelStyle',
])

const mod = await import(resolve(root, 'dist/index.js'))
const core = await import(resolve(root, 'dist/core/index.js'))

for (const name of required) {
  const from = coreOnly.has(name) ? core : mod
  if (from[name] == null) {
    console.error(`smoke-import: missing export ${name}`)
    process.exit(1)
  }
}

console.log(`smoke-import: ok (${required.length} exports)`)
