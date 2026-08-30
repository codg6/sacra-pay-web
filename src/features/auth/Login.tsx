// src/features/auth/Login.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { authService } from './authService'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import logo from '@/assets/logo-sacrapay.svg'
import { Eye, EyeSlash } from '@phosphor-icons/react'
import { useAuth } from '@/context/useAuth'
import { decodeJwt } from '@/lib/jwt'

const schema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

type FormData = z.infer<typeof schema>

export function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { login } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
  setErrorMessage(null)
  try {
    const response = await authService.login(data)
    login(response.data.token)

    const payload = decodeJwt<{ role: string }>(response.data.token)
    if (payload?.role === 'SUPER_ADMIN') {
      navigate('/admin')
    } else {
      navigate('/organizations')
    }
  } catch {
    setErrorMessage('E-mail ou senha inválidos.')
  }
}

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Coluna do formulário */}
      <div className="flex flex-col gap-6 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <img src={logo} alt="Sacra Pay" className="h-8" />
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="mb-6 text-center">
              <h1 className="text-xl font-semibold text-foreground">Entrar na sua conta</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Digite seu e-mail abaixo para acessar o painel
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="voce@exemplo.com" {...register('email')} />
                {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a href="#" className="ml-auto text-xs text-muted-foreground underline-offset-4 hover:underline">
                    Esqueceu a senha?
                  </a>
                </div>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        className="pr-9"
                        {...register('password')}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        tabIndex={-1}
                    >
                    {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
                    </button>
                </div>
                {errors.password && <span className="text-xs text-destructive">{errors.password.message}</span>}
              </div>

              {errorMessage && (
                <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {errorMessage}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Coluna de imagem/branding — some em telas pequenas (lg:block) */}
      <div className="relative hidden bg-muted lg:block">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/90 to-primary">
          <div className="max-w-sm text-center text-primary-foreground">
            <h2 className="text-2xl font-semibold">Gestão de pagamentos para eventos</h2>
            <p className="mt-2 text-sm opacity-80">
              Controle cartões, vendas e organizações em um só lugar.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}