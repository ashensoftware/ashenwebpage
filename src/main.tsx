import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Import global styles (includes reset, theme, base, and Tailwind)
import './styles/index.css'
import App from './App.tsx'
import './i18n.js'

import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
