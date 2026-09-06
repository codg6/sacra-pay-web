import { api } from '@/lib/axios'
import type { EventResponse, EventSummary } from './eventTypes'
import type { CardTransactionResponse, PageResponse } from '../organization/organizationTypes'

export const eventService = {

  findAll: () => api.get<EventResponse[]>('/events'),

  findByOrganizationId: (organizationId: string) => { return api.get<EventResponse[]>('/events', { params: { organizationId } }) },

  findById: (id: string) => api.get<EventResponse>(`/events/${id}`),

  getSummary: (id: string) => api.get<EventSummary>(`/events/${id}/summary`),

  findTransactions: (id: string, page: number, size = 10) => api.get<PageResponse<CardTransactionResponse>>(`/events/${id}/transactions`, { params: { page, size } }),
}

