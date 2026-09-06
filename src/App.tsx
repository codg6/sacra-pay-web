import { Routes, Route } from 'react-router-dom'
import { RequireAuth } from './components/RequireAuth'
import { DashboardLayout } from './layout/DashboardLayout'
import { AdminLayout } from './layout/admin/AdminLayout'
import { AdminHome } from './features/admin/AdminHome'
import { OrganizationList } from './features/organization/OrganizationList'
import { OrganizationRegister } from './features/organization/OrganizationRegister'
import { OrganizationDetail } from './features/organization/OrganizationDetail'
import { Login } from './features/auth/Login'
import { ComingSoon } from './components/ComingSoon'
import { ClientHome } from './features/admin/ClientHome'
import { EventDetail } from './features/event/EventDetail'
import { EventList } from './features/event/EventList'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<RequireAuth allowedRoles={['SUPER_ADMIN']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="organizations" element={<OrganizationList />} />
          <Route path="organizations/new" element={<OrganizationRegister />} />
          <Route path="organizations/:id" element={<OrganizationDetail />} />
          <Route path="plans" element={<ComingSoon title="Planos" />} />
          <Route path="subscriptions" element={<ComingSoon title="Assinaturas" />} />
          <Route path="reports" element={<ComingSoon title="Relatórios" />} />
          <Route path="settings" element={<ComingSoon title="Configurações" />} />
        </Route>
      </Route>

      <Route element={<RequireAuth allowedRoles={['ADMIN', 'MANAGER', 'SELLER', 'CASHIER']} />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<ClientHome />} />
          <Route path="events" element={<EventList />} />
          <Route path="events/:id" element={<EventDetail />} />
          <Route path="transactions" element={<ComingSoon title="Transações" />} />
          <Route path="users" element={<ComingSoon title="Usuários" />} />
          <Route path="reports" element={<ComingSoon title="Relatório" />} />
          <Route path="settings" element={<ComingSoon title="Configurações" />} />
          <Route path="organizations/:id" element={<OrganizationDetail />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App