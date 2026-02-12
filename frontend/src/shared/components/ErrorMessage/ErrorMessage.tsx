type ErrorMessageProps = {
  message: string
  onRetry?: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="space-y-2">
      <div className="bg-red-900/20 border border-red-800 text-red-200 rounded-lg p-4 flex items-center">
        <span className="text-red-400 mr-2">⚠</span>
        <span>{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="border border-red-700 text-red-400 hover:border-red-600 hover:bg-red-900/20 px-4 py-2 rounded-lg transition-colors"
        >
          Tentar novamente
        </button>
      )}
    </div>
  )
}
