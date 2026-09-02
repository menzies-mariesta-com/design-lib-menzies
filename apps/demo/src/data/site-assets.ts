import adwaitaMono400 from '@fontsource/adwaita-mono/files/adwaita-mono-latin-400-normal.woff2?url'
import adwaitaMono700 from '@fontsource/adwaita-mono/files/adwaita-mono-latin-700-normal.woff2?url'
import adwaitaSans400 from '@fontsource/adwaita-sans/files/adwaita-sans-latin-400-normal.woff2?url'
import adwaitaSans500 from '@fontsource/adwaita-sans/files/adwaita-sans-latin-500-normal.woff2?url'
import adwaitaSans600 from '@fontsource/adwaita-sans/files/adwaita-sans-latin-600-normal.woff2?url'
import adwaitaSans700 from '@fontsource/adwaita-sans/files/adwaita-sans-latin-700-normal.woff2?url'
import mapleMono400 from '@fontsource/maple-mono/files/maple-mono-latin-400-normal.woff2?url'
import mapleMono500 from '@fontsource/maple-mono/files/maple-mono-latin-500-normal.woff2?url'
import mapleMono600 from '@fontsource/maple-mono/files/maple-mono-latin-600-normal.woff2?url'
import mapleMono700 from '@fontsource/maple-mono/files/maple-mono-latin-700-normal.woff2?url'
import fraunces500 from '@fontsource/fraunces/files/fraunces-latin-500-normal.woff2?url'
import fraunces600 from '@fontsource/fraunces/files/fraunces-latin-600-normal.woff2?url'
import fraunces700 from '@fontsource/fraunces/files/fraunces-latin-700-normal.woff2?url'
import heroImage from '../assets/hero.png?url'

export type SiteFontFile = {
  weight: number
  format: 'woff2'
  filename: string
  url: string
}

export type SiteFont = {
  id: string
  name: string
  family: string
  role: string
  usage: string
  cssVariable?: string
  tailwindClass: string
  sample: string
  source: string
  license: string
  files: SiteFontFile[]
}

export type SiteImage = {
  id: string
  name: string
  filename: string
  url: string
  alt: string
  usage: string
  format: string
}

export const siteFonts: SiteFont[] = [
  {
    id: 'fraunces',
    name: 'Fraunces',
    family: '"Fraunces", ui-serif, Georgia, serif',
    role: 'Display headings',
    usage:
      'Page titles, section headings, and hero copy via font-display and --font-display. Loaded from Google Fonts in index.html (weights 500, 650, 750).',
    cssVariable: '--font-display',
    tailwindClass: 'font-display',
    sample: 'Pigment desk gallery',
    source: 'Google Fonts / @fontsource/fraunces',
    license: 'SIL Open Font License 1.1',
    files: [
      {
        weight: 500,
        format: 'woff2',
        filename: 'fraunces-latin-500-normal.woff2',
        url: fraunces500,
      },
      {
        weight: 600,
        format: 'woff2',
        filename: 'fraunces-latin-600-normal.woff2',
        url: fraunces600,
      },
      {
        weight: 700,
        format: 'woff2',
        filename: 'fraunces-latin-700-normal.woff2',
        url: fraunces700,
      },
    ],
  },
  {
    id: 'maple-mono',
    name: 'Maple Mono',
    family: '"Maple Mono", ui-monospace, monospace',
    role: 'Body and monospace UI',
    usage:
      'Default UI type, labels, tables, and code blocks via font-sans, font-mono, --font-sans, and --font-mono. Bundled through @fontsource/maple-mono.',
    cssVariable: '--font-sans, --font-mono',
    tailwindClass: 'font-sans',
    sample: 'Wash tokens · btn-primary · 0123456789',
    source: '@fontsource/maple-mono',
    license: 'SIL Open Font License 1.1',
    files: [
      {
        weight: 400,
        format: 'woff2',
        filename: 'maple-mono-latin-400-normal.woff2',
        url: mapleMono400,
      },
      {
        weight: 500,
        format: 'woff2',
        filename: 'maple-mono-latin-500-normal.woff2',
        url: mapleMono500,
      },
      {
        weight: 600,
        format: 'woff2',
        filename: 'maple-mono-latin-600-normal.woff2',
        url: mapleMono600,
      },
      {
        weight: 700,
        format: 'woff2',
        filename: 'maple-mono-latin-700-normal.woff2',
        url: mapleMono700,
      },
    ],
  },
  {
    id: 'adwaita-sans',
    name: 'Adwaita Sans',
    family: '"Adwaita Sans", ui-sans-serif, system-ui, sans-serif',
    role: 'GNOME UI sans-serif',
    usage:
      'Default sans-serif for GNOME and libadwaita apps. Based on Inter. Available here for download; not wired into this demo theme.',
    tailwindClass: 'font-sans',
    sample: 'Libadwaita · adaptive layout · 0123456789',
    source: 'GNOME adwaita-fonts / @fontsource/adwaita-sans',
    license: 'SIL Open Font License 1.1',
    files: [
      {
        weight: 400,
        format: 'woff2',
        filename: 'adwaita-sans-latin-400-normal.woff2',
        url: adwaitaSans400,
      },
      {
        weight: 500,
        format: 'woff2',
        filename: 'adwaita-sans-latin-500-normal.woff2',
        url: adwaitaSans500,
      },
      {
        weight: 600,
        format: 'woff2',
        filename: 'adwaita-sans-latin-600-normal.woff2',
        url: adwaitaSans600,
      },
      {
        weight: 700,
        format: 'woff2',
        filename: 'adwaita-sans-latin-700-normal.woff2',
        url: adwaitaSans700,
      },
    ],
  },
  {
    id: 'adwaita-mono',
    name: 'Adwaita Mono',
    family: '"Adwaita Mono", ui-monospace, monospace',
    role: 'GNOME UI monospace',
    usage:
      'Monospace companion for GNOME apps, terminals, and code views. Based on Iosevka. Available here for download; not wired into this demo theme.',
    tailwindClass: 'font-mono',
    sample: 'gtk4-rs · gsettings · 0123456789',
    source: 'GNOME adwaita-fonts / @fontsource/adwaita-mono',
    license: 'SIL Open Font License 1.1',
    files: [
      {
        weight: 400,
        format: 'woff2',
        filename: 'adwaita-mono-latin-400-normal.woff2',
        url: adwaitaMono400,
      },
      {
        weight: 700,
        format: 'woff2',
        filename: 'adwaita-mono-latin-700-normal.woff2',
        url: adwaitaMono700,
      },
    ],
  },
]

export const siteImages: SiteImage[] = [
  {
    id: 'favicon',
    name: 'Pigment mark favicon',
    filename: 'favicon.svg',
    url: '/favicon.svg',
    alt: 'Menzies Design pigment wash favicon',
    usage: 'Browser tab icon, chart scatter markers, and loading logo soak.',
    format: 'SVG',
  },
  {
    id: 'icons-sprite',
    name: 'Social icon sprite',
    filename: 'icons.svg',
    url: '/icons.svg',
    alt: 'Sprite sheet with Bluesky, Discord, GitHub, and X icons',
    usage: 'Footer and documentation social links (symbol references).',
    format: 'SVG',
  },
  {
    id: 'hero-plate',
    name: 'Coastal fog watercolor plate',
    filename: 'hero.png',
    url: heroImage,
    alt: 'Menzies Design watercolor hero plate',
    usage:
      'Hero, carousel, hover gallery, mask, aspect ratio, and indicator demos. Local plate keeps galleries offline-safe.',
    format: 'PNG',
  },
]
