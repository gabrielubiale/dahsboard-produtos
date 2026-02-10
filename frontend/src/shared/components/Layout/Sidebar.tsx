import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import InventoryIcon from '@mui/icons-material/Inventory'
import { useState } from 'react'

type MenuItem = {
  label: string
  path: string
  icon: React.ReactNode
}

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    path: '/products',
    icon: <DashboardIcon />,
  },
  {
    label: 'Produtos',
    path: '/products',
    icon: <InventoryIcon />,
  },
]

type SidebarProps = {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigation = (path: string) => {
    navigate(path)
    if (onClose) {
      onClose()
    }
  }

  return (
    <Box
      className={`
        fixed left-0 top-0 z-40 h-screen w-64 transform
        border-r border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950
        shadow-2xl transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}
    >
      {/* Logo/Título */}
      <Box className="flex h-16 items-center border-b border-gray-800 px-6">
        <Typography
          variant="h6"
          className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-bold text-transparent"
        >
          Dashboard
        </Typography>
      </Box>

      {/* Menu de Navegação */}
      <Box className="mt-4 px-3">
        <List className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path)
            return (
              <ListItem key={item.path} disablePadding className="mb-1">
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    rounded-lg transition-all duration-200
                    ${isActive
                      ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 shadow-lg'
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                    }
                  `}
                  sx={{
                    '&:hover': {
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <ListItemIcon
                    className={`
                      min-w-[40px] transition-colors
                      ${isActive ? 'text-blue-400' : 'text-gray-500'}
                    `}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      className: `font-medium ${isActive ? 'text-white' : 'text-gray-300'}`,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Box>

      {/* Footer da Sidebar */}
      <Box className="absolute bottom-0 left-0 right-0 border-t border-gray-800 p-4">
        <Typography variant="caption" className="text-gray-500">
          v1.0.0
        </Typography>
      </Box>
    </Box>
  )
}
