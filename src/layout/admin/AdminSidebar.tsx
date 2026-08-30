import { NavLink } from 'react-router-dom'
import { SquaresFour, Buildings, CreditCard, Receipt, ChartLineUp, GearSix } from '@phosphor-icons/react'

const navItems = [
  { to: '/admin', label: 'Visão geral', icon: SquaresFour, end: true },
  { to: '/admin/organizations', label: 'Organizações', icon: Buildings },
  { to: '/admin/plans', label: 'Planos', icon: CreditCard },
  { to: '/admin/subscriptions', label: 'Assinaturas', icon: Receipt },
  { to: '/admin/reports', label: 'Relatórios', icon: ChartLineUp },
  { to: '/admin/settings', label: 'Configurações', icon: GearSix },
]

export function AdminSidebar() {
  return (
    <aside className="w-60 min-w-60 flex flex-col bg-card border-r border-border">
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-border">
        <div className="w-7 h-7 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
          S
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-semibold text-foreground text-[15px]">Sacra Pay</span>
          <span className="text-[10px] text-muted-foreground">Painel Master</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 flex flex-col gap-0.5">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`
            }
          >
            <Icon size={16} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-3.5 border-t border-border flex-shrink-0">
        <span className="text-[11px] text-muted-foreground">v0.1 · desenvolvimento</span>
      </div>
    </aside>
  )
}