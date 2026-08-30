// src/components/BreadcrumbSelector.tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CaretUpDown } from '@phosphor-icons/react'
import type { BreadcrumbOption } from './BreadcrumbSelectorTypes'

interface BreadcrumbSelectorProps {
  options: BreadcrumbOption[]
  selected: BreadcrumbOption | null
  placeholder: string
  onSelect: (option: BreadcrumbOption) => void
}

export function BreadcrumbSelector({
  options,
  selected,
  placeholder,
  onSelect,
}: BreadcrumbSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-sm font-medium text-foreground hover:bg-accent" />
        }
      >
        <span>{selected?.label ?? placeholder}</span>

        {selected?.badge && (
          <span className="text-[11px] font-medium text-muted-foreground bg-accent border border-border rounded-full px-2 py-0.5">
            {selected.badge}
          </span>
        )}

        <CaretUpDown size={13} className="text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-56">
        {options.length === 0 && (
          <div className="px-2 py-1.5 text-sm text-muted-foreground">
            Nenhum item disponível
          </div>
        )}

        {options.map((option) => (
          <DropdownMenuItem key={option.id} onClick={() => onSelect(option)}>
            <div className="flex items-center justify-between w-full">
              <span>{option.label}</span>
              {option.badge && (
                <span className="text-[11px] text-muted-foreground bg-accent border border-border rounded-full px-2 py-0.5">
                  {option.badge}
                </span>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}