import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GlobalStyles } from "./styles/globalStyles"
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyles />
    <App />
  </StrictMode>,
)
