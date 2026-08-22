import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: ['src/styles/**'],
      rollupTypes: false,
      insertTypesEntry: true,
    }),
  ],
  build: {
    emptyOutDir: false,
    lib: {
      entry: {
        index: resolve(import.meta.dirname, 'src/index.ts'),
        'core/index': resolve(import.meta.dirname, 'src/core/index.ts'),
        'react/index': resolve(import.meta.dirname, 'src/react/index.ts'),
        'theme/index': resolve(import.meta.dirname, 'src/theme/index.ts'),
        'brush/index': resolve(import.meta.dirname, 'src/brush/index.ts'),
        'icons/index': resolve(import.meta.dirname, 'src/icons/index.ts'),
        'icons/brands/index': resolve(import.meta.dirname, 'src/icons/brands/index.tsx'),
        'charts/index': resolve(import.meta.dirname, 'src/charts/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'lucide-react',
        /^lucide-react\//,
        'simple-icons',
        /^simple-icons\//,
        'apexcharts',
        'react-apexcharts',
      ],
      output: {
        preserveModules: false,
        entryFileNames: '[name].js',
      },
    },
    sourcemap: true,
    minify: false,
  },
})
