import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

export default defineConfig({
  server: {
    // Bind IPv4+IPv6 so both localhost and 127.0.0.1 work (Vite default can be ::1-only).
    host: true,
    port: 9999,
    fs: {
      allow: [resolve(__dirname, '../..')],
    },
  },
  preview: {
    host: true,
    port: 9999,
  },
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: [
      'apexcharts',
      'apexcharts/boxPlot',
      'react-apexcharts',
    ],
    // Full Simple Icons catalog is only used on Icons → Brands (lazy). Prebundling
    // it (~5MB + huge graph) stalls first Vite boot / first paint.
    exclude: ['simple-icons'],
    // Do not block the browser on crawling 100+ lazy showcase routes.
    holdUntilCrawlEnd: false,
  },
  resolve: {
    alias: {
      '@menzies-mariesta-com/menzies-design-wash-ui/styles.css': resolve(
        __dirname,
        '../../packages/menzies-design-wash-ui/src/styles/index.css',
      ),
      '@menzies-mariesta-com/menzies-design-wash-ui/icons/brands/catalog': resolve(
        __dirname,
        '../../packages/menzies-design-wash-ui/src/icons/brands/catalog-entry.ts',
      ),
      '@menzies-mariesta-com/menzies-design-wash-ui/icons/brands': resolve(
        __dirname,
        '../../packages/menzies-design-wash-ui/src/icons/brands/index.tsx',
      ),
      '@menzies-mariesta-com/menzies-design-wash-ui/icons': resolve(
        __dirname,
        '../../packages/menzies-design-wash-ui/src/icons/index.ts',
      ),
      '@menzies-mariesta-com/menzies-design-wash-ui/theme': resolve(
        __dirname,
        '../../packages/menzies-design-wash-ui/src/theme/index.ts',
      ),
      '@menzies-mariesta-com/menzies-design-wash-ui/core': resolve(
        __dirname,
        '../../packages/menzies-design-wash-ui/src/core/index.ts',
      ),
      '@menzies-mariesta-com/menzies-design-wash-ui/react': resolve(
        __dirname,
        '../../packages/menzies-design-wash-ui/src/react/index.ts',
      ),
      '@menzies-mariesta-com/menzies-design-wash-ui/charts': resolve(
        __dirname,
        '../../packages/menzies-design-wash-ui/src/charts/index.ts',
      ),
      '@menzies-mariesta-com/menzies-design-wash-ui': resolve(
        __dirname,
        '../../packages/menzies-design-wash-ui/src/index.ts',
      ),
    },
  },
})
