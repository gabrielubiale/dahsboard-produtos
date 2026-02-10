import { Alert, Button, Stack } from '@mui/material'

type ErrorMessageProps = {
  message: string
  onRetry?: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <Stack spacing={2}>
      <Alert severity="error">{message}</Alert>
      {onRetry && (
        <Button variant="outlined" color="error" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </Stack>
  )
}

