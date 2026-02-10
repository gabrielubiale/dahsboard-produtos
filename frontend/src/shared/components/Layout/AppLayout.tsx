import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <Box className="min-h-screen" sx={{ backgroundColor: '#000000' }}>
      <AppBar
        position="static"
        className="bg-gray-900 border-b border-gray-800 shadow-lg"
        elevation={0}
      >
        <Toolbar className="px-6">
          <Typography variant="h6" component="div" className="font-bold text-white">
            Dashboard de Produtos
          </Typography>
        </Toolbar>
      </AppBar>

      <Box className="p-6 max-w-[1920px] mx-auto">
        <Outlet />
      </Box>
    </Box>
  )
}
