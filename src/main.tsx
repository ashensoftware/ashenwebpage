import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Import global styles (includes reset, theme, base, and Tailwind)
import './styles/index.css'
import App from './App.tsx'
import './i18n.js'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
