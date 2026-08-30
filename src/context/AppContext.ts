import { createContext } from 'react'
import type { OrganizationResponse } from '@/features/organization/organizationTypes'
import type { EventResponse } from '@/features/event/eventTypes'

export interface AppContextValue {
  selectedOrganization: OrganizationResponse | null
  setSelectedOrganization: (org: OrganizationResponse | null) => void
  selectedEvent: EventResponse | null
  setSelectedEvent: (event: EventResponse | null) => void
}

export const AppContext = createContext<AppContextValue | null>(null)