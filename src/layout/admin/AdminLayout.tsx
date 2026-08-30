import { Outlet } from 'react-router-dom'
import { GlobalLoadingBar } from '@/components/GlobalLoadingBar'
import { AdminSidebar } from './AdminSidebar'
import { AdminTopbar } from './AdminTopbar'

export function AdminLayout() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <GlobalLoadingBar />
      <AdminTopbar />

      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto bg-muted/30 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}