import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { eventService } from './eventService'
import type { EventResponse } from './eventTypes'
import { Button } from '@/components/ui/button'
import { DataTable, type DataTableColumn } from '@/components/data-table/DataTable'

function formatDate(dateStr: string | null) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('pt-BR')
}

export function EventList() {
  const [events, setEvents] = useState<EventResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    eventService.findAll().then((res) => {
      setEvents(res.data)
      setIsLoading(false)
    })
  }, [])

  const columns: DataTableColumn<EventResponse>[] = [
    { header: 'Nome', accessor: (e) => <span className="font-medium text-foreground">{e.name}</span> },
    { header: 'Criado em', accessor: (e) => formatDate(e.createdAt) },
    { header: 'Início', accessor: (e) => formatDate(e.startDate) },
    { header: 'Fim', accessor: (e) => formatDate(e.endDate) },
  ]

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground">Eventos</h1>
        <p className="text-sm text-muted-foreground mt-1">Eventos cadastrados na sua organização</p>
      </div>

      <DataTable
        columns={columns}
        data={events}
        getRowKey={(e) => e.id}
        isLoading={isLoading}
        emptyMessage="Nenhum evento cadastrado ainda."
        actions={(event) => (
          <Button variant="outline" size="sm" render={<Link to={`/events/${event.id}`} />}>
            Detalhar evento
          </Button>
        )}
      />
    </div>
  )
}