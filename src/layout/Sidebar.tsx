// src/layout/Sidebar.tsx
import { NavLink } from 'react-router-dom'
import { Buildings, Users, CreditCard, Gear, ChartBar } from '@phosphor-icons/react'

const navItems = [
  { to: '/organizations', label: 'Organizações', icon: Buildings },
  { to: '/users', label: 'Usuários', icon: Users },
  { to: '/plans', label: 'Planos', icon: CreditCard },
  { to: '/reports', label: 'Relatórios', icon: ChartBar },
  { to: '/settings', label: 'Configurações', icon: Gear },
]

export function Sidebar() {
  return (
    <aside className="w-60 min-w-60 flex flex-col bg-card border-r border-border">
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-border">
        <div className="w-7 h-7 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
          S
        </div>
        <span className="font-semibold text-foreground text-[15px]">Sacra Pay</span>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 flex flex-col gap-0.5">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
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