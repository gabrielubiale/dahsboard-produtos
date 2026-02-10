import { Button, MenuItem, Stack, TextField } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import type { ProductStatus } from '../../../services/types'

type StatusOption = {
  value: ProductStatus | ''
  label: string
}

const STATUS_OPTIONS: StatusOption[] = [
  { value: '', label: 'Todos' },
  { value: 'active', label: 'Ativos' },
  { value: 'inactive', label: 'Inativos' },
]

type ProductsFiltersProps = {
  isLoading: boolean
}

export function ProductsFilters({ isLoading }: ProductsFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') ?? ''
  const status = (searchParams.get('status') as ProductStatus | null) ?? ''

  function updateParam(key: string, value: string | null) {
    const next = new URLSearchParams(searchParams)

    if (value && value.length) {
      next.set(key, value)
    } else {
      next.delete(key)
    }

    setSearchParams(next)
  }

  function handleReset() {
    const next = new URLSearchParams()
    setSearchParams(next)
  }

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <TextField
        fullWidth
        size="small"
        label="Buscar por nome"
        value={search}
        onChange={(event) => updateParam('search', event.target.value)}
        disabled={isLoading}
        className="bg-gray-800"
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#f9fafb',
            '& fieldset': {
              borderColor: '#374151',
            },
            '&:hover fieldset': {
              borderColor: '#4b5563',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3b82f6',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#9ca3af',
            '&.Mui-focused': {
              color: '#3b82f6',
            },
          },
        }}
      />

      <TextField
        select
        fullWidth
        size="small"
        label="Status"
        value={status}
        onChange={(event) => updateParam('status', event.target.value || null)}
        disabled={isLoading}
        className="bg-gray-800"
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#f9fafb',
            '& fieldset': {
              borderColor: '#374151',
            },
            '&:hover fieldset': {
              borderColor: '#4b5563',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3b82f6',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#9ca3af',
            '&.Mui-focused': {
              color: '#3b82f6',
            },
          },
        }}
      >
        {STATUS_OPTIONS.map((option) => (
          <MenuItem key={option.value || 'all'} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <Button
        variant="outlined"
        onClick={handleReset}
        disabled={isLoading}
        className="border-gray-700 text-gray-300 hover:border-gray-600 hover:bg-gray-800"
      >
        Limpar filtros
      </Button>
    </Stack>
  )
}
