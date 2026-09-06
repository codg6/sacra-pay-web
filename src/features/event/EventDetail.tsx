import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Receipt, Coins } from '@phosphor-icons/react'
import { eventService } from './eventService'
import type { EventSummary } from './eventTypes'
import type { CardTransactionResponse } from '@/features/organization/organizationTypes'
import { DataTable, type DataTableColumn } from '@/components/data-table/DataTable'
import { useAppContext } from '@/context/useAppContext'
import { StatCard } from '@/layout/StatCard'

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('pt-BR')
}

export function EventDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { setSelectedEvent } = useAppContext()

  const [summary, setSummary] = useState<EventSummary | null>(null)
  const [transactions, setTransactions] = useState<CardTransactionResponse[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    eventService.getSummary(id).then((res) => {
      setSummary(res.data)
      setIsLoading(false)
    })
  }, [id])

  useEffect(() => {
    if (!id) return
    eventService.findTransactions(id, page).then((res) => {
      setTransactions(res.data.content)
      setTotalPages(res.data.totalPages)
      setTotalElements(res.data.totalElements)
    })
  }, [id, page])

  function handleBack() {
    // Limpa o evento selecionado no contexto global, para que o dropdown
    // do header volte a mostrar "Selecionar evento" em vez do evento
    // que acabamos de sair de detalhar.
    setSelectedEvent(null)
    navigate('/events')
  }

  const columns: DataTableColumn<CardTransactionResponse>[] = [
    { header: 'Cartão', accessor: (tx) => tx.cardCode },
    { header: 'Tipo', accessor: (tx) => tx.type },
    { header: 'Valor', accessor: (tx) => formatCurrency(tx.amount) },
    { header: 'Data', accessor: (tx) => new Date(tx.createdAt).toLocaleString('pt-BR') },
  ]

  if (isLoading) {
    return <div className="max-w-4xl mx-auto py-10 text-center text-muted-foreground">Carregando...</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={handleBack}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft size={16} /> Voltar para eventos
      </button>

      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground">{summary?.name}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {formatDate(summary?.startDate ?? null)} — {formatDate(summary?.endDate ?? null)}
          {' · '}Criado em {summary && new Date(summary.createdAt).toLocaleDateString('pt-BR')}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard icon={CreditCard} label="Cartões emitidos" value={summary?.cardCount ?? 0} color="amber" />
        <StatCard icon={Receipt} label="Transações" value={summary?.transactionCount ?? 0} color="blue" />
        <StatCard icon={Coins} label="Valor movimentado" value={formatCurrency(summary?.totalAmount ?? 0)} color="emerald" />
      </div>

      <h2 className="text-sm font-semibold text-foreground mb-3">Transações do evento</h2>
      <DataTable
        columns={columns}
        data={transactions}
        getRowKey={(tx) => tx.id}
        emptyMessage="Nenhuma transação registrada para este evento."
        page={page}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={setPage}
      />
    </div>
  )
}