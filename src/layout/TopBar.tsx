import { useState, useEffect } from 'react'
import { BreadcrumbSelector } from '@/components/BreadcrumbSelector'
import type { BreadcrumbOption } from '@/components/BreadcrumbSelectorTypes'
import { organizationService } from '@/features/organization/organizationService'
import type { OrganizationResponse } from '@/features/organization/organizationTypes'
import type { EventResponse } from '@/features/event/eventTypes'
import { eventService } from '@/features/event/eventService'
import { AccountSheet } from './AccountSheet'
import { useAppContext } from '@/context/useAppContext'
import logo from '@/assets/logo-sacrapay.svg'


export function Topbar() {
  const { selectedOrganization, setSelectedOrganization, selectedEvent, setSelectedEvent } = useAppContext()

  const [organizations, setOrganizations] = useState<OrganizationResponse[]>([])
  const [events, setEvents] = useState<EventResponse[]>([])

  useEffect(() => {
    // Para o seletor do header, buscamos uma página "grande" (size=100)
    // em vez de implementar paginação aqui — a lista de organizações
    // paginada de verdade fica só na tela OrganizationList.
    organizationService.findAll(0, 100).then((response) => {
      const list = response.data.content
      setOrganizations(list)
      if (list.length > 0 && !selectedOrganization) {
        handleSelectOrganization(list[0])
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSelectOrganization(org: OrganizationResponse) {
    setSelectedOrganization(org)
    eventService.findByOrganizationId(org.id).then((response) => {
      setEvents(response.data)
    })
  }

  function handleSelectEvent(option: BreadcrumbOption) {
    const event = events.find((e) => e.id === option.id)
    if (event) setSelectedEvent(event)
  }

  const orgOptions: BreadcrumbOption[] = organizations.map((o) => ({
    id: o.id,
    label: o.name,
    badge: 'Free',
  }))

  const eventOptions: BreadcrumbOption[] = events.map((e) => ({
    id: e.id,
    label: e.name,
    badge: 'Active',
  }))

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4 flex-shrink-0 gap-6">
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <img src={logo} alt="Sacra Pay" className="h-6" />
        <span className="text-border text-sm">/</span>

        <BreadcrumbSelector
          options={orgOptions}
          selected={selectedOrganization ? { id: selectedOrganization.id, label: selectedOrganization.name, badge: 'Free' } : null}
          placeholder="Selecionar organização"
          onSelect={(option) => {
            const org = organizations.find((o) => o.id === option.id)
            if (org) handleSelectOrganization(org)
          }}
        />

        <span className="text-border text-sm">/</span>

        <BreadcrumbSelector
          options={eventOptions}
          selected={selectedEvent ? { id: selectedEvent.id, label: selectedEvent.name, badge: 'Active' } : null}
          placeholder="Selecionar evento"
          onSelect={handleSelectEvent}
        />
      </div>

      <AccountSheet />
    </header>
  )
}