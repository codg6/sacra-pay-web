// src/features/organization/OrganizationDetail.tsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Users, CalendarBlank, CreditCard, CheckCircle, WarningCircle } from '@phosphor-icons/react'
import { organizationService } from './organizationService'
import type { OrganizationResponse, OrganizationSummary } from './organizationTypes'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Icon } from '@phosphor-icons/react'
import axios from 'axios'

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  cnpj: z.string().min(1, 'CNPJ é obrigatório'),
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  phone: z.string().optional(),
})

type FormData = z.infer<typeof schema>

// Cada card de estatística — reutilizável, evita repetir o mesmo JSX 3x
function StatCard({ icon: Icon, label, value }: { icon: Icon; label: string; value: string | number }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon size={18} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-lg font-semibold text-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function OrganizationDetail() {
  const { id } = useParams<{ id: string }>()
  const [summary, setSummary] = useState<OrganizationSummary | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (!id) return

    Promise.all([
      organizationService.findById(id),
      organizationService.getSummary(id),
    ]).then(([orgRes, summaryRes]) => {
      const org: OrganizationResponse = orgRes.data
      reset({ name: org.name, cnpj: org.cnpj, email: org.email, phone: org.phone })
      setSummary(summaryRes.data)
      setIsLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function onSubmit(data: FormData) {
    if (!id) return
    setSuccessMessage(null)
    setErrorMessage(null)

    try {
      await organizationService.update(id, { ...data, phone: data.phone ?? '' })
      setSuccessMessage('Organização atualizada com sucesso!')
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
    ? err.response?.data?.message
    : 'Erro ao atualizar organização.'
  setErrorMessage(message ?? 'Erro ao atualizar organização.')
    }
  }

  if (isLoading) {
    return <div className="max-w-3xl mx-auto py-10 text-center text-muted-foreground">Carregando...</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground">Detalhes da organização</h1>
        <p className="text-sm text-muted-foreground mt-1">Resumo e dados cadastrais</p>
      </div>

      {/* Resumo — mesma largura máxima do formulário abaixo, para ficar
          visualmente alinhado com o restante das telas do módulo */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <StatCard icon={Users} label="Usuários" value={summary?.userCount ?? 0} />
        <StatCard icon={CalendarBlank} label="Eventos" value={summary?.eventCount ?? 0} />
        <StatCard icon={CreditCard} label="Cartões emitidos" value={summary?.cardCount ?? 0} />
      </div>

      <Card className="mb-8">
        <CardContent className="flex items-center gap-3 py-4">
          {summary?.billingStatus === 'UP_TO_DATE' ? (
            <>
              <CheckCircle size={20} className="text-primary" />
              <span className="text-sm text-foreground">Mensalidade em dia</span>
            </>
          ) : (
            <>
              <WarningCircle size={20} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Status de mensalidade indisponível (módulo de assinatura ainda não conectado)
              </span>
            </>
          )}
        </CardContent>
      </Card>

      {/* Formulário — mesmo layout "settings" que já usamos no cadastro */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-[220px_1fr] gap-8 py-6">
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-1.5">Identificação</h2>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Nome e CNPJ usados para identificar a organização no sistema.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="name" className="mb-1.5 block">Nome</Label>
              <Input id="name" {...register('name')} />
              {errors.name && <span className="text-xs text-destructive mt-1 block">{errors.name.message}</span>}
            </div>
            <div>
              <Label htmlFor="cnpj" className="mb-1.5 block">CNPJ</Label>
              <Input id="cnpj" {...register('cnpj')} />
              {errors.cnpj && <span className="text-xs text-destructive mt-1 block">{errors.cnpj.message}</span>}
            </div>
          </div>
        </div>

        <hr className="border-border" />

        <div className="grid grid-cols-[220px_1fr] gap-8 py-6">
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-1.5">Contato</h2>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Informações usadas para comunicação e recuperação de acesso.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email" className="mb-1.5 block">E-mail</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && <span className="text-xs text-destructive mt-1 block">{errors.email.message}</span>}
            </div>
            <div>
              <Label htmlFor="phone" className="mb-1.5 block">Telefone</Label>
              <Input id="phone" {...register('phone')} />
            </div>
          </div>
        </div>

        <hr className="border-border" />

        <div className="pt-6 flex flex-col items-end gap-3">
          {successMessage && <div className="w-full px-3 py-2.5 rounded-md text-sm bg-primary/10 text-primary">{successMessage}</div>}
          {errorMessage && <div className="w-full px-3 py-2.5 rounded-md text-sm bg-destructive/10 text-destructive">{errorMessage}</div>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </div>
      </form>
    </div>
  )
}