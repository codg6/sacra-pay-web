// src/layout/DashboardLayout.tsx
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { GlobalLoadingBar } from '@/components/GlobalLoadingBar'
import { Topbar } from './TopBar'

export function DashboardLayout() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <GlobalLoadingBar />
      <Topbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-neutral-50 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}