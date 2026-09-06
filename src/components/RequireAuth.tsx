import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/useAuth'

interface RequireAuthProps {
  allowedRoles?: string[]
}

/**
 * Guarda de rota: se não houver usuário logado, redireciona para /login.
 * Se allowedRoles for informado e a role do usuário não estiver na lista,
 * redireciona para o dashboard correto dele (evita SELLER acessando /admin,
 * por exemplo). O <Outlet /> renderiza a rota filha só quando tudo passa.
 */
export function RequireAuth({ allowedRoles }: RequireAuthProps) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === 'SUPER_ADMIN' ? '/admin' : '/organizations'} replace />
  }

  return <Outlet />
}