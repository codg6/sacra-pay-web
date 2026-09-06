import { useEffect, useState } from 'react'
import { CalendarBlank, Receipt, CreditCard, Users } from '@phosphor-icons/react'
import { useAuth } from '@/context/useAuth'
import { organizationService } from '@/features/organization/organizationService'
import type { OrganizationSummary } from '@/features/organization/organizationTypes'
import { StatCard } from '@/layout/StatCard'


export function ClientHome() {
  const { user } = useAuth()
  const [summary, setSummary] = useState<OrganizationSummary | null>(null)

  useEffect(() => {
    if (!user?.organizationId) return
    organizationService.getSummary(user.organizationId).then((res) => setSummary(res.data))
  }, [user?.organizationId])

  const firstName = user?.email.split('@')[0]

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground">
          Bem-vindo de volta{firstName ? `, ${firstName}` : ''}! 👋
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Aqui está um resumo da sua organização</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={CalendarBlank} label="Eventos" value={summary?.eventCount ?? '—'} color="violet" />
        <StatCard icon={Users} label="Usuários" value={summary?.userCount ?? '—'} color="blue" />
        <StatCard icon={CreditCard} label="Cartões emitidos" value={summary?.cardCount ?? '—'} color="amber" />
        <StatCard icon={Receipt} label="Transações" value={summary?.transactionCount ?? '—'} color="emerald" />
      </div>
    </div>
  )
}