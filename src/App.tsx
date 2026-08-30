// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { DashboardLayout } from './layout/DashboardLayout'
import { AdminLayout } from './layout/admin/AdminLayout'
import { OrganizationList } from './features/organization/OrganizationList'
import { OrganizationRegister } from './features/organization/OrganizationRegister'
import { OrganizationDetail } from './features/organization/OrganizationDetail'
import { Login } from './features/auth/Login'
import { ComingSoon } from './components/ComingSoon'
import { AdminHome } from './features/admin/AdminHome'


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Painel do SUPER_ADMIN */}
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

      {/* Painel da organização logada (cliente) */}
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/organizations" replace />} />
        <Route path="organizations" element={<OrganizationList />} />
        <Route path="organizations/new" element={<OrganizationRegister />} />
        <Route path="organizations/:id" element={<OrganizationDetail />} />
        <Route path="users" element={<ComingSoon title="Usuários" />} />
        <Route path="plans" element={<ComingSoon title="Planos" />} />
        <Route path="reports" element={<ComingSoon title="Relatórios" />} />
        <Route path="settings" element={<ComingSoon title="Configurações" />} />
      </Route>
    </Routes>
  )
}

export default App