import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const getBreadcrumbs = () => {
    const path = location.pathname
    if (path === '/products' || path === '/') {
      return [{ label: 'Produtos' }]
    }
    if (path.includes('/products/new')) {
      return [{ label: 'Produtos' }, { label: 'Novo Produto' }]
    }
    if (path.includes('/products/') && path.includes('/edit')) {
      return [{ label: 'Produtos' }, { label: 'Editar Produto' }]
    }
    return []
  }

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar Desktop */}
      <div className="hidden lg:block">
        <Sidebar isOpen={true} />
      </div>

      {/* Sidebar Mobile (Drawer) */}
      {sidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 z-40 h-screen w-70 lg:hidden">
            <Sidebar isOpen={true} onClose={() => setSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* Conteúdo Principal */}
      <div className="flex flex-1 flex-col lg:ml-70 w-full">
        {/* TopBar */}
        <TopBar onMenuClick={() => setSidebarOpen(true)} breadcrumbs={getBreadcrumbs()} />

        {/* Conteúdo Scrollável */}
        <div className="flex-1 overflow-y-auto bg-black">
          <div className="mx-auto max-w-[1920px] p-4 lg:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
