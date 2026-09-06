import type { ReactNode } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

export interface DataTableColumn<T> {
  header: string
  accessor: (row: T) => ReactNode
  align?: 'left' | 'right'
  className?: string
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  data: T[]
  getRowKey: (row: T) => string
  isLoading?: boolean
  emptyMessage?: string
  actions?: (row: T) => ReactNode
  // Paginação — opcional; se omitida, a tabela renderiza sem rodapé de páginas
  page?: number
  totalPages?: number
  totalElements?: number
  onPageChange?: (page: number) => void
}

/**
 * Tabela genérica com TypeScript generics (<T>): T representa o tipo de
 * dado da linha (Organization, CardTransaction, User, etc). As colunas são
 * configuradas via "accessor" — uma função que sabe extrair/formatar o
 * valor daquela coluna a partir de uma linha — em vez de escrever <td>
 * fixos para cada tela. Isso permite reaproveitar o mesmo componente para
 * qualquer lista paginada do sistema, só trocando "columns" e "data".
 */
export function DataTable<T>({
  columns,
  data,
  getRowKey,
  isLoading,
  emptyMessage = 'Nenhum registro encontrado.',
  actions,
  page,
  totalPages,
  totalElements,
  onPageChange,
}: DataTableProps<T>) {
  const showPagination = page !== undefined && totalPages !== undefined && onPageChange;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.header} className={col.align === 'right' ? 'text-right' : ''}>
                {col.header}
              </TableHead>
            ))}
            {actions && <TableHead className="text-right">Ações</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-10 text-muted-foreground">
                Carregando...
              </TableCell>
            </TableRow>
          )}

          {!isLoading && data.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-10 text-muted-foreground">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}

          {!isLoading && data.map((row) => (
            <TableRow key={getRowKey(row)}>
              {columns.map((col) => (
                <TableCell key={col.header} className={col.align === 'right' ? 'text-right' : col.className}>
                  {col.accessor(row)}
                </TableCell>
              ))}
              {actions && <TableCell className="text-right">{actions(row)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showPagination && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <span className="text-xs text-muted-foreground">{totalElements} registros no total</span>
          <div className="flex items-center gap-2">
            <button
              disabled={page === 0}
              onClick={() => onPageChange(page - 1)}
              className="p-1.5 rounded-md text-muted-foreground hover:bg-accent disabled:opacity-40 disabled:pointer-events-none"
            >
              <CaretLeft size={15} />
            </button>
            <span className="text-xs text-muted-foreground">Página {page + 1} de {Math.max(totalPages, 1)}</span>
            <button
              disabled={page >= totalPages - 1}
              onClick={() => onPageChange(page + 1)}
              className="p-1.5 rounded-md text-muted-foreground hover:bg-accent disabled:opacity-40 disabled:pointer-events-none"
            >
              <CaretRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}