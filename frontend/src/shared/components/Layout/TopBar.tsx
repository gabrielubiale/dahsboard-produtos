import {
  AppBar,
  Box,
  Breadcrumbs,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

type TopBarProps = {
  onMenuClick?: () => void
  title?: string
  breadcrumbs?: Array<{ label: string; path?: string }>
}

export function TopBar({ onMenuClick, title, breadcrumbs }: TopBarProps) {
  return (
    <AppBar
      position="sticky"
      className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm"
      elevation={0}
    >
      <Toolbar className="px-4 lg:px-6">
        {/* Menu Toggle (mobile) */}
        <IconButton
          edge="start"
          onClick={onMenuClick}
          className="mr-3 text-gray-400 lg:hidden"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>

        {/* Breadcrumbs */}
        <Box className="flex flex-1 items-center">
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <Breadcrumbs
              separator={<ChevronRightIcon className="text-gray-600" fontSize="small" />}
              className="text-gray-400"
            >
              <Box className="flex items-center text-gray-500">
                <HomeIcon className="mr-1" fontSize="small" />
                <Typography variant="body2">Dashboard</Typography>
              </Box>
              {breadcrumbs.map((crumb, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  className={index === breadcrumbs.length - 1 ? 'text-white font-medium' : 'text-gray-400'}
                >
                  {crumb.label}
                </Typography>
              ))}
            </Breadcrumbs>
          ) : (
            <Typography variant="h6" className="font-semibold text-white">
              {title || 'Dashboard'}
            </Typography>
          )}
        </Box>

        {/* Ações (futuro: notificações, perfil, etc.) */}
        <Box className="flex items-center gap-2">
          {/* Espaço para ações futuras */}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
