import { useState, type ReactNode } from 'react'
import { AuthContext, type AuthUser } from './AuthContext'
import { decodeJwt } from '@/lib/jwt'
interface JwtPayload {
  sub: string
  email: string
  role: string
  organizationId?: string
}

function userFromToken(token: string): AuthUser | null {
  const payload = decodeJwt<JwtPayload>(token)
  if (!payload) return null
  return {
    userId: payload.sub,
    email: payload.email,
    role: payload.role,
    organizationId: payload.organizationId ?? null,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const token = localStorage.getItem('sacrapay_token')
    return token ? userFromToken(token) : null
  })

  function login(token: string) {
    localStorage.setItem('sacrapay_token', token)
    setUser(userFromToken(token))
  }

  function logout() {
    localStorage.removeItem('sacrapay_token')
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}