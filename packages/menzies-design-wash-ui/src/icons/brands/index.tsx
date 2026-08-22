import type { SVGProps } from 'react'
import {
  siDiscord,
  siGithub,
  siGoogle,
  siNpm,
  siReact,
  siSvelte,
  siTypescript,
  siVite,
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

export const GitHub = make(siGithub)
export const Npm = make(siNpm)
export const ReactBrand = make(siReact)
export const Svelte = make(siSvelte)
export const TypeScript = make(siTypescript)
export const Vite = make(siVite)
export const X = make(siX)
export const Discord = make(siDiscord)
export const Google = make(siGoogle)
