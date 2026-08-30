import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import './index.css'
import App from './App.tsx'
import { AppProvider } from './context/AppProvider'
import { AuthProvider } from './context/AuthProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppProvider >
          <App />
          <Toaster position="top-right" richColors closeButton />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)