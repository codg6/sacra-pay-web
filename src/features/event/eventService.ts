// src/features/event/event.service.ts
import { api } from '@/lib/axios'
import type { EventResponse } from './eventTypes'

export const eventService = {
  findByOrganizationId: (organizationId: string) => {
    return api.get<EventResponse[]>('/events', { params: { organizationId } })
  },
}