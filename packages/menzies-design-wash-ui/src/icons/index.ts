/**
 * Wash UI Lucide icons (lucide-react 1.28.0, internal).
 * Prefer this entry over importing `lucide-react` in app code.
 *
 * Named exports are tree-shakeable. For icon pickers / dynamic names, use
 * `DynamicIcon` + `iconNames` from the same package path.
 */
export type { LucideProps as WashIconProps, LucideIcon as WashIcon } from 'lucide-react'

export * from 'lucide-react'

export {
  DynamicIcon,
  dynamicIconImports,
  iconNames,
} from 'lucide-react/dynamic.js'

export type { DynamicIconModule, IconName } from 'lucide-react/dynamic.js'
