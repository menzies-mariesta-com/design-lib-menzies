import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/maple-mono/400.css'
import '@fontsource/maple-mono/500.css'
import '@fontsource/maple-mono/600.css'
import '@fontsource/maple-mono/700.css'
import 'menzies-design-wash-ui/styles.css'
import { WashProvider } from 'menzies-design-wash-ui'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WashProvider>
      <App />
    </WashProvider>
  </StrictMode>,
)
