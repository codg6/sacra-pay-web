import { useState, useEffect } from 'react'
import { useAppContext } from '@/context/useAppContext'
import { useAuth } from '@/context/useAuth'
import { BreadcrumbSelector } from '@/components/BreadcrumbSelector'
import type { BreadcrumbOption } from '@/components/BreadcrumbSelectorTypes'
import { organizationService } from '@/features/organization/organizationService'
import type { EventResponse } from '@/features/event/eventTypes'
import { eventService } from '@/features/event/eventService'
import { AccountSheet } from './AccountSheet'
import logo from '@/assets/logo-sacrapay.svg'
import { useNavigate } from 'react-router-dom'

export function Topbar() {

  const { selectedOrganization, setSelectedOrganization, selectedEvent, setSelectedEvent } = useAppContext()
  
  const { user } = useAuth()

  const [events, setEvents] = useState<EventResponse[]>([])

  const isSuperAdmin = user?.role === 'SUPER_ADMIN'

  const navigate = useNavigate()

  useEffect(() => {
    // SUPER_ADMIN não tem organização — não busca nada aqui.
    if (isSuperAdmin || !user?.organizationId) return

    // Usuário comum: busca direto A PRÓPRIA organização (sem listar todas)
    // e os eventos dela — nunca chama findAll() de organizações.
    organizationService.findById(user.organizationId).then((res) => {
      setSelectedOrganization(res.data)
    })

    eventService.findByOrganizationId(user.organizationId).then((res) => {
      setEvents(res.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuperAdmin, user?.organizationId])

  function handleSelectEvent(option: BreadcrumbOption) {
    const event = events.find((e) => e.id === option.id)
    if (event) {
      setSelectedEvent(event)
      navigate(`/events/${event.id}`)
    }
  }

  

  const eventOptions: BreadcrumbOption[] = events.map((e) => ({ id: e.id, label: e.name, badge: 'Active' }))

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4 flex-shrink-0 gap-6">
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <img src={logo} alt="Sacra Pay" className="h-6" />

        {!isSuperAdmin && selectedOrganization && (
          <>
            <span className="text-border text-sm">/</span>
            {/* Organização travada: texto estático, sem dropdown */}
            <span className="px-2 py-1.5 text-sm font-medium text-foreground">
              {selectedOrganization.name}
            </span>

            <span className="text-border text-sm">/</span>
            <BreadcrumbSelector
              options={eventOptions}
              selected={selectedEvent ? { id: selectedEvent.id, label: selectedEvent.name, badge: 'Active' } : null}
              placeholder="Selecionar evento"
              onSelect={handleSelectEvent}
            />
          </>
        )}
      </div>

      <AccountSheet />
    </header>
  )
}