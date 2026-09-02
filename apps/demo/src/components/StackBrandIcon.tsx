import type { ComponentType, SVGProps } from 'react'
import {
  Angular,
  Astro,
  Eleventy,
  Html5,
  Lit,
  Nextjs,
  Nuxt,
  Preact,
  Qwik,
  ReactBrand,
  Remix,
  Solid,
  Svelte,
  Vue,
} from '@menzies-mariesta-com/menzies-design-wash-ui/icons/brands'
import type { GettingStartedStackId } from '../data/getting-started-stacks'

const iconMap: Record<GettingStartedStackId, ComponentType<SVGProps<SVGSVGElement>>> = {
  vanilla: Html5,
  'react-vite': ReactBrand,
  nextjs: Nextjs,
  'vue-vite': Vue,
  nuxt: Nuxt,
  sveltekit: Svelte,
  astro: Astro,
  angular: Angular,
  remix: Remix,
  solid: Solid,
  preact: Preact,
  qwik: Qwik,
  lit: Lit,
  eleventy: Eleventy,
}

type StackBrandIconProps = {
  stackId: GettingStartedStackId
  className?: string
}

export function StackBrandIcon({ stackId, className = 'size-6' }: StackBrandIconProps) {
  const Icon = iconMap[stackId]
  return <Icon className={className} />
}
