import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { organizationService } from './organizationService'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/useAuth'

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  cnpj: z.string().min(1, 'CNPJ é obrigatório'),
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  phone: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export function OrganizationRegister() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

async function onSubmit(data: FormData) {
  const payload = { ...data, phone: data.phone ?? '' }
  const promise = organizationService.create(payload)

  toast.promise(promise, {
    loading: 'Salvando organização...',
    success: (res) => `Organização "${res.data.name}" criada com sucesso!`,
    error: 'Não foi possível salvar a organização.',
  })

  try {
    await promise
    reset()
  } catch (err: unknown) {
    const description = axios.isAxiosError(err)
      ? (err.response?.data?.message ?? 'Tente novamente em instantes.')
      : 'Tente novamente em instantes.'

    toast.error('Algo deu errado', {
      description,
      action: {
        label: 'Tentar de novo',
        onClick: () => onSubmit(data),
      },
      cancel: {
        label: 'Sair',
        onClick: () => {
          logout()
          navigate('/login')
        },
      },
    })
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-foreground">Nova organização</h1>
        <p className="text-sm text-muted-foreground mt-1">Cadastre uma nova organização no Sacra Pay</p>
      </div>

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
              <Input id="name" placeholder="Paróquia São José" {...register('name')} />
              {errors.name && <span className="text-xs text-destructive mt-1 block">{errors.name.message}</span>}
            </div>
            <div>
              <Label htmlFor="cnpj" className="mb-1.5 block">CNPJ</Label>
              <Input id="cnpj" placeholder="00.000.000/0000-00" {...register('cnpj')} />
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
              <Input id="email" type="email" placeholder="contato@exemplo.com.br" {...register('email')} />
              {errors.email && <span className="text-xs text-destructive mt-1 block">{errors.email.message}</span>}
            </div>
            <div>
              <Label htmlFor="phone" className="mb-1.5 block">Telefone</Label>
              <Input id="phone" placeholder="(11) 98765-4321" {...register('phone')} />
            </div>
          </div>
        </div>

        <hr className="border-border" />

        <div className="pt-6 flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar organização'}
          </Button>
        </div>
      </form>
    </div>
  )
}