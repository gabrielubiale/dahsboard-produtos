import { Box, Button, Stack, Typography } from '@mui/material'

type EmptyStateProps = {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <Box
      py={12}
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      className="rounded-xl border border-gray-800 bg-gray-900"
    >
      <Stack spacing={3}>
        <Typography variant="h6" className="text-white font-semibold">
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" className="text-gray-400">
            {description}
          </Typography>
        )}
        {actionLabel && onAction && (
          <Button
            variant="contained"
            onClick={onAction}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {actionLabel}
          </Button>
        )}
      </Stack>
    </Box>
  )
}
