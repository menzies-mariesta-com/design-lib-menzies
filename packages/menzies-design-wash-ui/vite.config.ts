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
        index: resolve(__dirname, 'src/index.ts'),
        'core/index': resolve(__dirname, 'src/core/index.ts'),
        'react/index': resolve(__dirname, 'src/react/index.ts'),
        'theme/index': resolve(__dirname, 'src/theme/index.ts'),
        'brush/index': resolve(__dirname, 'src/brush/index.ts'),
        'icons/index': resolve(__dirname, 'src/icons/index.ts'),
        'icons/brands/index': resolve(__dirname, 'src/icons/brands/index.tsx'),
        'charts/index': resolve(__dirname, 'src/charts/index.ts'),
        'email/index': resolve(__dirname, 'src/email/index.ts'),
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
