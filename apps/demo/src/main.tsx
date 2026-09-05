import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/adwaita-mono/400.css'
import '@fontsource/adwaita-mono/700.css'
import '@fontsource/adwaita-sans/400.css'
import '@fontsource/adwaita-sans/500.css'
import '@fontsource/adwaita-sans/600.css'
import '@fontsource/adwaita-sans/700.css'
/* Fraunces + Maple Mono ship with Wash UI styles.css */
import '@menzies-mariesta-com/menzies-design-wash-ui/styles.css'
import './index.css'
import { WashProvider } from '@menzies-mariesta-com/menzies-design-wash-ui'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WashProvider>
      <App />
    </WashProvider>
  </StrictMode>,
)
