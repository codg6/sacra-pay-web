import { useContext } from 'react'
import { AppContext } from './AppContext'

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext precisa ser usado dentro de um <AppProvider>')
  }
  return context
}