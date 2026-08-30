// src/features/auth/authService.ts
import { api } from '@/lib/axios'
import type { LoginRequest, LoginResponse } from './authTypes'

export const authService = {
  login: (data: LoginRequest) => {
    return api.post<LoginResponse>('/auth/login', data)
  },
}