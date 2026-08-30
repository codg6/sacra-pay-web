import { api } from '@/lib/axios'
import type { AdminSummary } from './adminTypes'

export const adminService = {
  getSummary: () => api.get<AdminSummary>('/admin/summary'),
}