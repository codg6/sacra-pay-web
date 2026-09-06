import { api } from '@/lib/axios'
import type {
  CardTransactionResponse,
  OrganizationRequest,
  OrganizationResponse,
  OrganizationSummary,
  PageResponse,
} from './organizationTypes'

export const organizationService = {
  
  create: (data: OrganizationRequest) => api.post<OrganizationResponse>('/organizations', data),

  findAll: (page: number, size = 10) => api.get<PageResponse<OrganizationResponse>>('/organizations', { params: { page, size } }),

  findById: (id: string) => api.get<OrganizationResponse>(`/organizations/${id}`),

  getSummary: (id: string) => api.get<OrganizationSummary>(`/organizations/${id}/summary`),

  update: (id: string, data: OrganizationRequest) => api.put<OrganizationResponse>(`/organizations/${id}`, data),

  findTransactions: (id: string, page: number, size = 10) => 
    api.get<PageResponse<CardTransactionResponse>>(`/organizations/${id}/transactions`, { params: { page, size } }),

  toggleStatus: (id: string) => api.patch<OrganizationResponse>(`/organizations/${id}/toggle-status`),

}