import { useEffect, useState } from 'react'
import { Buildings, 
  Users, 
  CalendarBlank, 
  CreditCard 
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { adminService } from './adminService'
import type { AdminSummary } from './adminTypes'
import { Card, CardContent } from '@/components/ui/card'

function StatCard({ icon: Icon, label, value }: { icon: Icon; label: string; value: string | number }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 py-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon size={20} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-xl font-semibold text-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function AdminHome() {
  const [summary, setSummary] = useState<AdminSummary | null>(null)

  useEffect(() => {
    adminService.getSummary().then((res) => setSummary(res.data))
  }, [])

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground">Visão geral</h1>
        <p className="text-sm text-muted-foreground mt-1">Números da plataforma em tempo real</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Buildings} label="Organizações" value={summary?.organizationCount ?? '—'} />
        <StatCard icon={Users} label="Usuários" value={summary?.userCount ?? '—'} />
        <StatCard icon={CalendarBlank} label="Eventos" value={summary?.eventCount ?? '—'} />
        <StatCard icon={CreditCard} label="Cartões emitidos" value={summary?.cardCount ?? '—'} />
      </div>
    </div>
  )
}