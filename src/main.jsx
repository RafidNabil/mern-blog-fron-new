import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssVarsProvider } from '@mui/joy/styles'
import CssBaseline from '@mui/joy/CssBaseline'
import App from './App.jsx'
import theme from './components/theme.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'

// Check system preference for initial theme, but default to dark
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme-preference');
const initialMode = savedTheme || (prefersDark ? 'dark' : 'dark'); // Force dark as default

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <CssVarsProvider 
        theme={theme} 
        defaultMode={initialMode}
        modeStorageKey="joy-mode"
        colorSchemeStorageKey="joy-color-scheme"
      >
        <CssBaseline />
        <App />
      </CssVarsProvider>
    </ThemeProvider>
  </StrictMode>
)
