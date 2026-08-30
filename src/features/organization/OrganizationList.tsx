// src/features/organization/OrganizationList.tsx — reescrito com paginação real
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Eye, Trash, DotsThreeVertical, MagnifyingGlass, Plus, CaretLeft, CaretRight } from '@phosphor-icons/react'
import { organizationService } from './organizationService'
import type { OrganizationResponse } from './organizationTypes'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { initials, formatDate } from '@/lib/formatters'

export function OrganizationList() {
  const [organizations, setOrganizations] = useState<OrganizationResponse[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)

  // Toda vez que "page" muda, dispara uma NOVA consulta ao backend —
  // é isso que torna a paginação "de verdade" (server-side), em vez de
  // só esconder/mostrar itens que já estavam todos carregados de uma vez.
  useEffect(() => {
    organizationService.findAll(page).then((response) => {
      setOrganizations(response.data.content)
      setTotalPages(response.data.totalPages)
      setTotalElements(response.data.totalElements)
      setIsLoading(false)
    })
  }, [page])

  // Filtro de busca continua no front, mas atua só sobre os itens da
  // página atual — uma busca "de verdade" (em todo o banco) exigiria
  // um parâmetro de busca no backend, que podemos adicionar depois.
  const visible = organizations.filter((org) => {
    const term = searchTerm.toLowerCase().trim()
    if (!term) return true
    return org.name.toLowerCase().includes(term) || org.email.toLowerCase().includes(term)
  })

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-72">
          <MagnifyingGlass size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar nesta página..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-2 border border-input bg-transparent rounded-md text-sm focus:outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
          />
        </div>

        <Button render={<Link to="/organizations/new" />}>
          <Plus size={15} className="mr-1" /> Nova organização
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organização</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Criada em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow><TableCell colSpan={5} className="text-center py-10 text-muted-foreground">Carregando...</TableCell></TableRow>
            )}
            {!isLoading && visible.length === 0 && (
              <TableRow><TableCell colSpan={5} className="text-center py-10 text-muted-foreground">Nenhuma organização encontrada.</TableCell></TableRow>
            )}
            {!isLoading && visible.map((org) => (
              <TableRow key={org.id}>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold flex-shrink-0">
                      {initials(org.name)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{org.name}</span>
                      <span className="text-xs text-muted-foreground">{org.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{org.cnpj}</TableCell>
                <TableCell className="text-muted-foreground">{org.phone || '—'}</TableCell>
                <TableCell className="text-muted-foreground">{formatDate(org.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Link to={`/organizations/${org.id}`} className="p-1.5 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground" title="Ver">
                      <Eye size={15} />
                    </Link>
                    <button className="p-1.5 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground" title="Inativar">
                      <Trash size={15} />
                    </button>
                    <button className="p-1.5 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground" title="Mais opções">
                      <DotsThreeVertical size={15} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <span className="text-xs text-muted-foreground">{totalElements} organizações no total</span>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              className="p-1.5 rounded-md text-muted-foreground hover:bg-accent disabled:opacity-40 disabled:pointer-events-none"
            >
              <CaretLeft size={15} />
            </button>

            <span className="text-xs text-muted-foreground">
              Página {page + 1} de {Math.max(totalPages, 1)}
            </span>

            <button
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
              className="p-1.5 rounded-md text-muted-foreground hover:bg-accent disabled:opacity-40 disabled:pointer-events-none"
            >
              <CaretRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}