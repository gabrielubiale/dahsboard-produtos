import { Alert, Button, Stack } from '@mui/material'

type ErrorMessageProps = {
  message: string
  onRetry?: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <Stack spacing={2}>
      <Alert
        severity="error"
        className="bg-red-900/20 border-red-800 text-red-200"
        sx={{
          '& .MuiAlert-icon': {
            color: '#ef4444',
          },
        }}
      >
        {message}
      </Alert>
      {onRetry && (
        <Button
          variant="outlined"
          onClick={onRetry}
          className="border-red-700 text-red-400 hover:border-red-600 hover:bg-red-900/20"
        >
          Tentar novamente
        </Button>
      )}
    </Stack>
  )
}
