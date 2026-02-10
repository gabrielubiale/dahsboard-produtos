import { Box, CircularProgress } from '@mui/material'

export function Loader() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={8}>
      <CircularProgress className="text-blue-600" />
    </Box>
  )
}
