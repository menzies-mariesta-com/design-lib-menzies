import type { SVGProps } from 'react'
import {
  siAngular,
  siAstro,
  siDaisyui,
  siDiscord,
  siEleventy,
  siGithub,
  siGoogle,
  siHtml5,
  siLit,
  siLucide,
  siNextdotjs,
  siNpm,
  siNuxt,
  siPreact,
  siQwik,
  siReact,
  siRemix,
  siSimpleicons,
  siSolid,
  siSvelte,
  siTailwindcss,
  siTypescript,
  siVite,
  siVuedotjs,
  siX,
} from 'simple-icons'
import { BrandIconBase, type BrandIconProps } from './BrandIconBase'

export type { BrandIconProps }
export { WASH_BRAND_BY_SLUG } from './slugMap'

function make(icon: { path: string; hex: string; title: string }) {
  function Comp(props: BrandIconProps) {
    return (
      <BrandIconBase
        path={icon.path}
        hex={icon.hex}
        title={props.title ?? icon.title}
        {...props}
      />
    )
  }
  Comp.displayName = icon.title.replace(/\s+/g, '')
  return Comp
}

/** Curated named brand components (common Wash demos / docs). */
export const Angular = make(siAngular)
export const Astro = make(siAstro)
export const Daisyui = make(siDaisyui)
export const Discord = make(siDiscord)
export const Eleventy = make(siEleventy)
export const GitHub = make(siGithub)
export const Google = make(siGoogle)
export const Html5 = make(siHtml5)
export const Lit = make(siLit)
export const Lucide = make(siLucide)
export const Nextjs = make(siNextdotjs)
export const Npm = make(siNpm)
export const Nuxt = make(siNuxt)
export const Preact = make(siPreact)
export const Qwik = make(siQwik)
/** React logo (named ReactBrand to avoid clashing with the React namespace). */
export const ReactBrand = make(siReact)
export const Remix = make(siRemix)
export const SimpleIcons = make(siSimpleicons)
export const Solid = make(siSolid)
export const Svelte = make(siSvelte)
export const Tailwindcss = make(siTailwindcss)
export const TypeScript = make(siTypescript)
export const Vite = make(siVite)
export const Vue = make(siVuedotjs)
export const X = make(siX)

/** Re-export SVG props helper for consumers typing wrappers. */
export type BrandSvgProps = SVGProps<SVGSVGElement>
