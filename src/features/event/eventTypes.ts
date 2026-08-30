// src/features/event/event.types.ts
export interface EventResponse {
  id: string
  name: string
  organizationId: string
  organizationName: string
  startDate: string | null
  endDate: string | null
}