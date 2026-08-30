import { AccountSheet } from '@/layout/AccountSheet'
import logo from '@/assets/logo-sacrapay.svg'

export function AdminTopbar() {
  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4 flex-shrink-0">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Sacra Pay" className="h-6" />
        <span className="text-border text-sm">/</span>
        <span className="text-sm font-medium text-foreground">Painel Master</span>
      </div>

      <AccountSheet />
    </header>
  )
}