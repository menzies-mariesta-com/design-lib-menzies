import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

/** Builds the standalone compiled stylesheet for out-of-the-box use. */
export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    rollupOptions: {
      input: resolve(__dirname, 'src/styles/css-entry.ts'),
      output: {
        assetFileNames: (asset) =>
          asset.name?.endsWith('.css') ? 'styles.css' : 'assets/[name][extname]',
        entryFileNames: 'styles-entry.js',
      },
    },
  },
})
