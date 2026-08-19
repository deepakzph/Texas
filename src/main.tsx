import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@/context/ThemeContext'
import { PlayerProvider } from '@/context/PlayerContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </ThemeProvider>
  </StrictMode>,
)
