import { Box, Drawer } from '@mui/material'
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
    <Box className="flex min-h-screen bg-black">
      {/* Sidebar Desktop */}
      <Box className="hidden lg:block">
        <Sidebar isOpen={true} />
      </Box>

      {/* Sidebar Mobile (Drawer) */}
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        ModalProps={{
          keepMounted: true, // Melhor performance em mobile
        }}
        className="lg:hidden"
        sx={{
          '& .MuiDrawer-paper': {
            width: 256,
            backgroundColor: '#111827',
            borderRight: '1px solid #1f2937',
          },
        }}
      >
        <Sidebar isOpen={true} onClose={() => setSidebarOpen(false)} />
      </Drawer>

      {/* Conteúdo Principal */}
      <Box className="flex flex-1 flex-col lg:ml-64">
        {/* TopBar */}
        <TopBar onMenuClick={() => setSidebarOpen(true)} breadcrumbs={getBreadcrumbs()} />

        {/* Conteúdo Scrollável */}
        <Box className="flex-1 overflow-y-auto bg-black">
          <Box className="mx-auto max-w-[1920px] p-4 lg:p-6">
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
