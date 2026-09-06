// src/features/admin/AdminHome.tsx
import { useEffect, useState } from 'react'
import { Buildings, Users, CalendarBlank, CreditCard } from '@phosphor-icons/react'
import { adminService } from './adminService'
import type { AdminSummary } from './adminTypes'
import { StatCard } from '@/layout/StatCard'

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
        <StatCard icon={Buildings} label="Organizações" value={summary?.organizationCount ?? '—'} color="violet" />
        <StatCard icon={Users} label="Usuários" value={summary?.userCount ?? '—'} color="blue" />
        <StatCard icon={CalendarBlank} label="Eventos" value={summary?.eventCount ?? '—'} color="amber" />
        <StatCard icon={CreditCard} label="Cartões emitidos" value={summary?.cardCount ?? '—'} color="emerald" />
      </div>
    </div>
  )
}