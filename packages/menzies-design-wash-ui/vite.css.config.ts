import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

/** Builds the standalone compiled stylesheet for out-of-the-box use. */
export default defineConfig({
  // Relative asset URLs so fonts resolve from node_modules/.../dist/styles.css
  base: './',
  plugins: [tailwindcss()],
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    rollupOptions: {
      input: resolve(import.meta.dirname, 'src/styles/css-entry.ts'),
      output: {
        assetFileNames: (asset) =>
          asset.name?.endsWith('.css') ? 'styles.css' : 'assets/[name][extname]',
        entryFileNames: 'styles-entry.js',
      },
    },
  },
})
