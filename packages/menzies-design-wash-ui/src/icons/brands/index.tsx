import type { SVGProps } from 'react'
import {
  siAngular,
  siAstro,
  siDiscord,
  siEleventy,
  siGithub,
  siGoogle,
  siHtml5,
  siLit,
  siNextdotjs,
  siNpm,
  siNuxt,
  siPreact,
  siQwik,
  siReact,
  siRemix,
  siSolid,
  siSvelte,
  siTypescript,
  siVite,
  siVuedotjs,
  siX,
} from 'simple-icons'

export type BrandIconProps = SVGProps<SVGSVGElement> & {
  title?: string
  size?: number | string
}

function BrandIcon({
  path,
  hex,
  title,
  size = '1em',
  ...rest
}: BrandIconProps & { path: string; hex: string }) {
  return (
    <svg
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={`#${hex}`}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <path d={path} />
    </svg>
  )
}

function make(icon: { path: string; hex: string; title: string }) {
  function Comp(props: BrandIconProps) {
    return (
      <BrandIcon
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

export const Angular = make(siAngular)
export const Astro = make(siAstro)
export const Discord = make(siDiscord)
export const Eleventy = make(siEleventy)
export const GitHub = make(siGithub)
export const Google = make(siGoogle)
export const Html5 = make(siHtml5)
export const Lit = make(siLit)
export const Nextjs = make(siNextdotjs)
export const Npm = make(siNpm)
export const Nuxt = make(siNuxt)
export const Preact = make(siPreact)
export const Qwik = make(siQwik)
export const ReactBrand = make(siReact)
export const Remix = make(siRemix)
export const Solid = make(siSolid)
export const Svelte = make(siSvelte)
export const TypeScript = make(siTypescript)
export const Vite = make(siVite)
export const Vue = make(siVuedotjs)
export const X = make(siX)
