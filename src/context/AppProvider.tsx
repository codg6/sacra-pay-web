import { useState, type ReactNode } from 'react'
import { AppContext } from './AppContext'
import type { OrganizationResponse } from '@/features/organization/organizationTypes'
import type { EventResponse } from '@/features/event/eventTypes'

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedOrganization, setSelectedOrganizationState] = useState<OrganizationResponse | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<EventResponse | null>(null)

  function setSelectedOrganization(org: OrganizationResponse | null) {
    setSelectedOrganizationState(org)
    setSelectedEvent(null)
  }

  return (
    <AppContext.Provider value={{ selectedOrganization, setSelectedOrganization, selectedEvent, setSelectedEvent }}>
      {children}
    </AppContext.Provider>
  )
}