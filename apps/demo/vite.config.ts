import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: [
      'apexcharts',
      'apexcharts/boxPlot',
      'react-apexcharts',
    ],
  },
  resolve: {
    alias: {
      '@menzies-mariesta-com/menzies-design-wash-ui/styles.css': resolve(
        __dirname,
        '../../packages/menzies-design-wash-ui/src/styles/index.css',
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
      '@menzies-mariesta-com/menzies-design-wash-ui/brush': resolve(
        __dirname,
        '../../packages/menzies-design-wash-ui/src/brush/index.ts',
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
