import { useNavigate } from 'react-router-dom'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { CreditCard, SignOut } from '@phosphor-icons/react'
import { initials } from '@/lib/formatters'
import { useAuth } from '@/context/useAuth'
import { useAppContext } from '@/context/useAppContext'

export function AccountSheet() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { selectedOrganization } = useAppContext()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  if (!user) return null

  return (
    <Sheet>
      <SheetTrigger
        render={
          <button className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent">
            <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
              {initials(user.email)}
            </div>
            <span className="text-sm text-foreground hidden sm:inline">{user.email}</span>
          </button>
        }
      />

      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>Minha conta</SheetTitle>
        </SheetHeader>

        <div className="px-4 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
              {initials(user.email)}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground">{user.role}</p>
            </div>
          </div>

          {selectedOrganization && (
            <div className="border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Organização</p>
              <p className="text-sm font-medium text-foreground">{selectedOrganization.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{selectedOrganization.email}</p>
            </div>
          )}

          <button
            onClick={() => navigate('/plans')}
            className="flex items-center gap-2 text-sm text-foreground hover:text-primary"
          >
            <CreditCard size={16} /> Ver planos
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-destructive hover:opacity-80 mt-auto"
          >
            <SignOut size={16} /> Sair
          </button>
        </div>
      </SheetContent>
    </Sheet>
  )
}