import type { AppPage } from '../nav'

export const PKG = '@menzies-mariesta-com/menzies-design-wash-ui'

export type GettingStartedStackId =
  | 'vanilla'
  | 'react-vite'
  | 'nextjs'
  | 'vue-vite'
  | 'nuxt'
  | 'sveltekit'
  | 'astro'
  | 'angular'
  | 'remix'
  | 'solid'
  | 'preact'
  | 'qwik'
  | 'lit'
  | 'eleventy'

export type GuideStep = {
  title: string
  body?: string
  code?: string
}

export type GettingStartedStack = {
  id: GettingStartedStackId
  page: AppPage
  name: string
  shortLabel: string
  description: string
  accentClass: string
  adapter: 'core' | 'react'
  steps: GuideStep[]
  notes?: string[]
}

const npmrc = `# .npmrc (GitHub Packages)
@menzies-mariesta-com:registry=https://npm.pkg.github.com`

export const gettingStartedStacks: GettingStartedStack[] = [
  {
    id: 'vanilla',
    page: 'docs-start-vanilla',
    name: 'Vanilla HTML / CSS / JS',
    shortLabel: 'Vanilla',
    description: 'HTML, CSS, and initWash',
    accentClass: 'bg-warning/15 text-warning',
    adapter: 'core',
    steps: [
      {
        title: 'Create project or open an existing site',
        body: 'You need any folder with an index.html and a bundler or static server. Vite vanilla-ts is a good default.',
        code: `npm create vite@latest my-wash-app -- --template vanilla-ts
cd my-wash-app`,
      },
      {
        title: 'Install Wash UI',
        code: `${npmrc}

npm i ${PKG}`,
      },
      {
        title: 'Import styles',
        code: `// src/main.ts
import '${PKG}/styles.css'`,
      },
      {
        title: 'Boot initWash once',
        code: `import { initWash, washRecipes } from '${PKG}/core'

const wash = initWash({ defaultPigment: 'mineral', defaultMode: 'light' })

// Optional: call wash.destroy() on SPA teardown`,
      },
      {
        title: 'Use a component via HTML classes',
        code: `// index.html
<button class="btn btn-primary ripple cursor-pointer">Save plate</button>

// Or apply a recipe from core
document.querySelector('button')!.className = washRecipes.btnRipple`,
      },
      {
        title: 'Run the dev server',
        code: `npm run dev`,
      },
    ],
  },
  {
    id: 'react-vite',
    page: 'docs-start-react-vite',
    name: 'React (Vite)',
    shortLabel: 'React + Vite',
    description: 'Vite + WashProvider',
    accentClass: 'bg-info/15 text-info',
    adapter: 'react',
    steps: [
      {
        title: 'Create a Vite React project',
        code: `npm create vite@latest my-wash-app -- --template react-ts
cd my-wash-app`,
      },
      {
        title: 'Install Wash UI and peers',
        code: `${npmrc}

npm i ${PKG} react react-dom`,
      },
      {
        title: 'Import styles in the entry file',
        code: `// src/main.tsx
import '${PKG}/styles.css'`,
      },
      {
        title: 'Wrap the app with WashProvider',
        code: `// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WashProvider } from '${PKG}'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WashProvider defaultPigment="mineral" defaultMode="light">
      <App />
    </WashProvider>
  </StrictMode>,
)`,
      },
      {
        title: 'Use a Wash component',
        code: `// src/App.tsx
import { Button } from '${PKG}'

export default function App() {
  return <Button variant="primary">Save plate</Button>
}`,
      },
      {
        title: 'Run the dev server',
        code: `npm run dev`,
      },
    ],
  },
  {
    id: 'nextjs',
    page: 'docs-start-nextjs',
    name: 'Next.js',
    shortLabel: 'Next.js',
    description: 'Next.js App Router + WashProvider',
    accentClass: 'bg-base-content/10 text-base-content',
    adapter: 'react',
    steps: [
      {
        title: 'Create a Next.js app',
        code: `npx create-next-app@latest my-wash-app --ts --app --eslint
cd my-wash-app`,
      },
      {
        title: 'Install Wash UI and peers',
        code: `${npmrc}

npm i ${PKG} react react-dom`,
      },
      {
        title: 'Import styles in the root layout',
        code: `// app/layout.tsx
import '${PKG}/styles.css'
import type { ReactNode } from 'react'
import { WashShell } from './wash-shell'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WashShell>{children}</WashShell>
      </body>
    </html>
  )
}`,
      },
      {
        title: 'Add a client provider shell',
        code: `// app/wash-shell.tsx
'use client'

import { WashProvider } from '${PKG}'
import type { ReactNode } from 'react'

export function WashShell({ children }: { children: ReactNode }) {
  return (
    <WashProvider defaultPigment="mineral" defaultMode="light">
      {children}
    </WashProvider>
  )
}`,
      },
      {
        title: 'Use a component on a page',
        code: `// app/page.tsx
'use client'

import { Button } from '${PKG}'

export default function Home() {
  return <Button variant="primary">Save plate</Button>
}`,
      },
      {
        title: 'Run the dev server',
        code: `npm run dev`,
      },
    ],
    notes: [
      'WashProvider must live in a client component. Keep server components free of interactive Wash widgets unless wrapped.',
    ],
  },
  {
    id: 'vue-vite',
    page: 'docs-start-vue-vite',
    name: 'Vue (Vite)',
    shortLabel: 'Vue + Vite',
    description: 'Vue 3 + core HTML classes',
    accentClass: 'bg-success/15 text-success',
    adapter: 'core',
    steps: [
      {
        title: 'Create a Vite Vue project',
        code: `npm create vite@latest my-wash-app -- --template vue-ts
cd my-wash-app`,
      },
      {
        title: 'Install Wash UI',
        code: `${npmrc}

npm i ${PKG}`,
      },
      {
        title: 'Import styles in main.ts',
        code: `// src/main.ts
import '${PKG}/styles.css'`,
      },
      {
        title: 'Boot initWash on mount',
        code: `// src/main.ts
import { createApp } from 'vue'
import { initWash } from '${PKG}/core'
import App from './App.vue'

const wash = initWash({ defaultPigment: 'mineral', defaultMode: 'light' })

const app = createApp(App)
app.mount('#app')

// Optional: wash.destroy() before unmount in advanced setups`,
      },
      {
        title: 'Use HTML classes in a SFC',
        code: `<!-- src/App.vue -->
<template>
  <button class="btn btn-primary ripple cursor-pointer">Save plate</button>
</template>`,
      },
      {
        title: 'Run the dev server',
        code: `npm run dev`,
      },
    ],
  },
  {
    id: 'nuxt',
    page: 'docs-start-nuxt',
    name: 'Nuxt',
    shortLabel: 'Nuxt',
    description: 'Nuxt plugin + initWash',
    accentClass: 'bg-success/20 text-success',
    adapter: 'core',
    steps: [
      {
        title: 'Create a Nuxt project',
        code: `npx nuxi@latest init my-wash-app
cd my-wash-app`,
      },
      {
        title: 'Install Wash UI',
        code: `${npmrc}

npm i ${PKG}`,
      },
      {
        title: 'Import styles globally',
        code: `// nuxt.config.ts
export default defineNuxtConfig({
  css: ['${PKG}/styles.css'],
})`,
      },
      {
        title: 'Add a client-only Wash plugin',
        code: `// plugins/wash.client.ts
import { initWash } from '${PKG}/core'

export default defineNuxtPlugin(() => {
  initWash({ defaultPigment: 'mineral', defaultMode: 'light' })
})`,
      },
      {
        title: 'Use HTML classes in a page',
        code: `<!-- app.vue or pages/index.vue -->
<template>
  <button class="btn btn-primary ripple cursor-pointer">Save plate</button>
</template>`,
      },
      {
        title: 'Run the dev server',
        code: `npm run dev`,
      },
    ],
  },
  {
    id: 'sveltekit',
    page: 'docs-start-sveltekit',
    name: 'SvelteKit',
    shortLabel: 'SvelteKit',
    description: 'SvelteKit layout + initWash',
    accentClass: 'bg-error/15 text-error',
    adapter: 'core',
    steps: [
      {
        title: 'Create a SvelteKit project',
        code: `npm create svelte@latest my-wash-app
cd my-wash-app`,
      },
      {
        title: 'Install Wash UI',
        code: `${npmrc}

npm i ${PKG}`,
      },
      {
        title: 'Import styles in the root layout',
        code: `// src/routes/+layout.svelte
<script lang="ts">
  import '${PKG}/styles.css'
</script>`,
      },
      {
        title: 'Boot initWash on mount',
        code: `// src/routes/+layout.svelte
<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { initWash, type WashRuntime } from '${PKG}/core'
  import '${PKG}/styles.css'

  let wash: WashRuntime | undefined

  onMount(() => {
    wash = initWash({ defaultPigment: 'mineral', defaultMode: 'light' })
  })

  onDestroy(() => {
    wash?.destroy()
  })
</script>`,
      },
      {
        title: 'Use HTML classes on a page',
        code: `<!-- src/routes/+page.svelte -->
<button class="btn btn-primary ripple cursor-pointer">Save plate</button>`,
      },
      {
        title: 'Run the dev server',
        code: `npm run dev`,
      },
    ],
  },
  {
    id: 'astro',
    page: 'docs-start-astro',
    name: 'Astro',
    shortLabel: 'Astro',
    description: 'Astro + initWash client',
    accentClass: 'bg-accent/15 text-accent',
    adapter: 'core',
    steps: [
      {
        title: 'Create an Astro project',
        code: `npm create astro@latest my-wash-app
cd my-wash-app`,
      },
      {
        title: 'Install Wash UI',
        code: `${npmrc}

npm i ${PKG}`,
      },
      {
        title: 'Import styles in the base layout',
        code: `---
// src/layouts/Layout.astro
import '${PKG}/styles.css'
---
<html lang="en">
  <body>
    <slot />
  </body>
</html>`,
      },
      {
        title: 'Boot initWash with a client script',
        code: `<!-- src/layouts/Layout.astro -->
<script>
  import { initWash } from '${PKG}/core'
  initWash({ defaultPigment: 'mineral', defaultMode: 'light' })
</script>`,
      },
      {
        title: 'Use HTML classes on a page',
        code: `<!-- src/pages/index.astro -->
<button class="btn btn-primary ripple cursor-pointer">Save plate</button>`,
      },
      {
        title: 'Run the dev server',
        code: `npm run dev`,
      },
    ],
  },
  {
    id: 'angular',
    page: 'docs-start-angular',
    name: 'Angular',
    shortLabel: 'Angular',
    description: 'Angular root + initWash',
    accentClass: 'bg-error/20 text-error',
    adapter: 'core',
    steps: [
      {
        title: 'Create an Angular project',
        code: `ng new my-wash-app --style=css --routing=false
cd my-wash-app`,
      },
      {
        title: 'Install Wash UI',
        code: `${npmrc}

npm i ${PKG}`,
      },
      {
        title: 'Import styles in angular.json or styles.css',
        code: `/* src/styles.css */
@import '${PKG}/styles.css';`,
      },
      {
        title: 'Boot initWash in the root component',
        code: `// src/app/app.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core'
import { initWash, type WashRuntime } from '${PKG}/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  private wash?: WashRuntime

  ngOnInit() {
    this.wash = initWash({ defaultPigment: 'mineral', defaultMode: 'light' })
  }

  ngOnDestroy() {
    this.wash?.destroy()
  }
}`,
      },
      {
        title: 'Use HTML classes in a template',
        code: `<!-- src/app/app.component.html -->
<button class="btn btn-primary ripple cursor-pointer">Save plate</button>`,
      },
      {
        title: 'Run the dev server',
        code: `ng serve`,
      },
    ],
    notes: [
      'There is no Angular adapter yet. Compose UI from documented HTML classes or wrap React components separately.',
    ],
  },
  {
    id: 'remix',
    page: 'docs-start-remix',
    name: 'Remix',
    shortLabel: 'Remix',
    description: 'Remix + WashProvider',
    accentClass: 'bg-neutral/15 text-neutral',
    adapter: 'react',
    steps: [
      {
        title: 'Create a Remix app',
        code: `npx create-remix@latest my-wash-app
cd my-wash-app`,
      },
      {
        title: 'Install Wash UI and peers',
        code: `${npmrc}

npm i ${PKG} react react-dom`,
      },
      {
        title: 'Import styles in root.tsx',
        code: `// app/root.tsx
import '${PKG}/styles.css'`,
      },
      {
        title: 'Wrap the document with WashProvider',
        code: `// app/root.tsx
import { WashProvider } from '${PKG}'

export default function App() {
  return (
    <WashProvider defaultPigment="mineral" defaultMode="light">
      <Outlet />
    </WashProvider>
  )
}`,
      },
      {
        title: 'Use a component on a route',
        code: `// app/routes/_index.tsx
import { Button } from '${PKG}'

export default function Index() {
  return <Button variant="primary">Save plate</Button>
}`,
      },
      {
        title: 'Run the dev server',
        code: `npm run dev`,
      },
    ],
  },
  {
    id: 'solid',
    page: 'docs-start-solid',
    name: 'Solid (Vite)',
    shortLabel: 'Solid + Vite',
    description: 'Solid + core API',
    accentClass: 'bg-primary/15 text-primary',
    adapter: 'core',
    steps: [
      {
        title: 'Create a Solid Vite project',
        code: `npm create vite@latest my-wash-app -- --template solid-ts
cd my-wash-app`,
      },
      {
        title: 'Install Wash UI',
        code: `${npmrc}

npm i ${PKG}`,
      },
      {
        title: 'Import styles in index.tsx',
        code: `// src/index.tsx
import '${PKG}/styles.css'`,
      },
      {
        title: 'Boot initWash once',
        code: `// src/index.tsx
import { initWash } from '${PKG}/core'

initWash({ defaultPigment: 'mineral', defaultMode: 'light' })`,
      },
      {
        title: 'Use HTML classes in a component',
        code: `// src/App.tsx
export default function App() {
  return <button class="btn btn-primary ripple cursor-pointer">Save plate</button>
}`,
      },
      {
        title: 'Run the dev server',
        code: `npm run dev`,
      },
    ],
  },
  {
    id: 'preact',
    page: 'docs-start-preact',
    name: 'Preact (Vite)',
    shortLabel: 'Preact + Vite',
    description: 'Preact + initWash',
    accentClass: 'bg-secondary/15 text-secondary',
    adapter: 'core',
    steps: [
      {
        title: 'Create a Preact Vite project',
        code: `npm create vite@latest my-wash-app -- --template preact-ts
cd my-wash-app`,
      },
      {
        title: 'Install Wash UI',
        code: `${npmrc}

npm i ${PKG}`,
      },
      {
        title: 'Import styles in main.tsx',
        code: `// src/main.tsx
import '${PKG}/styles.css'`,
      },
      {
        title: 'Boot initWash on startup',
        code: `// src/main.tsx
import { initWash } from '${PKG}/core'

initWash({ defaultPigment: 'mineral', defaultMode: 'light' })`,
      },
      {
        title: 'Use HTML classes in a component',
        code: `// src/app.tsx
export function App() {
  return <button class="btn btn-primary ripple cursor-pointer">Save plate</button>
}`,
      },
      {
        title: 'Run the dev server',
        code: `npm run dev`,
      },
    ],
    notes: ['Use core HTML classes. The React adapter targets React 18/19 peers only.'],
  },
  {
    id: 'qwik',
    page: 'docs-start-qwik',
    name: 'Qwik',
    shortLabel: 'Qwik',
    description: 'Qwik City + initWash',
    accentClass: 'bg-info/20 text-info',
    adapter: 'core',
    steps: [
      {
        title: 'Create a Qwik project',
        code: `npm create qwik@latest my-wash-app
cd my-wash-app`,
      },
      {
        title: 'Install Wash UI',
        code: `${npmrc}

npm i ${PKG}`,
      },
      {
        title: 'Import styles in root layout',
        code: `// src/root.tsx
import '${PKG}/styles.css'`,
      },
      {
        title: 'Boot initWash in a client plugin',
        code: `// src/entry.client.tsx (or a dedicated plugin module)
import { initWash } from '${PKG}/core'

initWash({ defaultPigment: 'mineral', defaultMode: 'light' })`,
      },
      {
        title: 'Use HTML classes on a route',
        code: `// src/routes/index.tsx
export default component$(() => {
  return <button class="btn btn-primary ripple cursor-pointer">Save plate</button>
})`,
      },
      {
        title: 'Run the dev server',
        code: `npm run dev`,
      },
    ],
  },
  {
    id: 'lit',
    page: 'docs-start-lit',
    name: 'Lit',
    shortLabel: 'Lit',
    description: 'Lit + initWash',
    accentClass: 'bg-accent/20 text-accent',
    adapter: 'core',
    steps: [
      {
        title: 'Create a Lit Vite project',
        code: `npm create vite@latest my-wash-app -- --template lit-ts
cd my-wash-app`,
      },
      {
        title: 'Install Wash UI',
        code: `${npmrc}

npm i ${PKG}`,
      },
      {
        title: 'Import styles in index.ts',
        code: `// src/index.ts
import '${PKG}/styles.css'`,
      },
      {
        title: 'Boot initWash once',
        code: `// src/index.ts
import { initWash } from '${PKG}/core'

initWash({ defaultPigment: 'mineral', defaultMode: 'light' })`,
      },
      {
        title: 'Use classes inside a Lit template',
        code: `// src/my-element.ts
import { html, LitElement } from 'lit'

export class MyElement extends LitElement {
  render() {
    return html\`
      <button class="btn btn-primary ripple cursor-pointer">Save plate</button>
    \`
  }
}`,
      },
      {
        title: 'Run the dev server',
        code: `npm run dev`,
      },
    ],
  },
  {
    id: 'eleventy',
    page: 'docs-start-eleventy',
    name: 'Eleventy (11ty)',
    shortLabel: 'Eleventy',
    description: 'Eleventy + initWash',
    accentClass: 'bg-base-content/10 text-base-content',
    adapter: 'core',
    steps: [
      {
        title: 'Create an Eleventy project',
        code: `mkdir my-wash-app && cd my-wash-app
npm init -y
npm i @11ty/eleventy`,
      },
      {
        title: 'Install Wash UI',
        code: `${npmrc}

npm i ${PKG}`,
      },
      {
        title: 'Import or link the stylesheet',
        code: `<!-- src/_includes/layout.njk -->
<link rel="stylesheet" href="/styles/wash.css" />`,
      },
      {
        title: 'Boot initWash from a client bundle',
        code: `// src/wash-init.js
import { initWash } from '${PKG}/core'

initWash({ defaultPigment: 'mineral', defaultMode: 'light' })`,
      },
      {
        title: 'Use HTML classes in a template',
        code: `{# src/index.njk #}
<button class="btn btn-primary ripple cursor-pointer">Save plate</button>`,
      },
      {
        title: 'Run the dev server',
        code: `npx @11ty/eleventy --serve`,
      },
    ],
    notes: [
      'Copy styles.css into your output folder or bundle it with your preferred JS bundler alongside initWash.',
    ],
  },
]

export const gettingStartedStackPages = gettingStartedStacks.map((s) => s.page)

export function getStackByPage(page: AppPage): GettingStartedStack | undefined {
  return gettingStartedStacks.find((stack) => stack.page === page)
}

export function isGettingStartedStackPage(page: AppPage): boolean {
  return gettingStartedStackPages.includes(page)
}
