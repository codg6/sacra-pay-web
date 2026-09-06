import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Eye, Prohibit, CheckCircle, DotsThreeVertical, MagnifyingGlass, Plus } from '@phosphor-icons/react'
import { organizationService } from './organizationService'
import type { OrganizationResponse } from './organizationTypes'
import { Button } from '@/components/ui/button'
import { DataTable, type DataTableColumn } from '@/components/data-table/DataTable'
import { StatusDot } from '@/components/StatusDot'
import { toast } from 'sonner'

function initials(name: string) {
  return name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function OrganizationList() {
  const [organizations, setOrganizations] = useState<OrganizationResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)

  function load() {
    organizationService.findAll(page).then((response) => {
      setOrganizations(response.data.content)
      setTotalPages(response.data.totalPages)
      setTotalElements(response.data.totalElements)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  async function handleToggleStatus(org: OrganizationResponse) {
    const action = org.status === 'ACTIVE' ? 'Inativando' : 'Reativando';
    const promise = organizationService.toggleStatus(org.id)

    toast.promise(promise, {
      loading: `${action} organização...`,
      success: 'Status atualizado com sucesso!',
      error: 'Não foi possível atualizar o status.',
    })

    await promise
    load()
  }

  const columns: DataTableColumn<OrganizationResponse>[] = [
    {
      header: 'Organização',
      accessor: (org) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold flex-shrink-0">
            {initials(org.name)}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-foreground">{org.name}</span>
            <span className="text-xs text-muted-foreground">{org.email}</span>
          </div>
        </div>
      ),
    },
    { header: 'CNPJ', accessor: (org) => <span className="text-muted-foreground">{org.cnpj}</span> },
    { header: 'Status', accessor: (org) => <StatusDot active={org.status === 'ACTIVE'} /> },
    { header: 'Criada em', accessor: (org) => <span className="text-muted-foreground">{formatDate(org.createdAt)}</span> },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-72">
          <MagnifyingGlass size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar nesta página..."
            className="w-full pl-8 pr-3 py-2 border border-input bg-transparent rounded-md text-sm focus:outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
          />
        </div>
        <Button render={<Link to="new" />}>
          <Plus size={15} className="mr-1" /> Nova organização
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={organizations}
        getRowKey={(org) => org.id}
        isLoading={isLoading}
        emptyMessage="Nenhuma organização encontrada."
        page={page}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={setPage}
        actions={(org) => (
          <div className="flex justify-end gap-1">
            <Link to={org.id} className="p-1.5 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground" title="Ver">
              <Eye size={15} />
            </Link>
            <button
              onClick={() => handleToggleStatus(org)}
              className="p-1.5 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              title={org.status === 'ACTIVE' ? 'Inativar' : 'Reativar'}
            >
              {org.status === 'ACTIVE' ? <Prohibit size={15} /> : <CheckCircle size={15} />}
            </button>
            <button className="p-1.5 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground" title="Mais opções">
              <DotsThreeVertical size={15} />
            </button>
          </div>
        )}
      />
    </div>
  )
}