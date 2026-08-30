import { createContext } from 'react'

export interface AuthUser {
  userId: string
  email: string
  role: string
  organizationId: string | null
}

export interface AuthContextValue {
  user: AuthUser | null
  login: (token: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)