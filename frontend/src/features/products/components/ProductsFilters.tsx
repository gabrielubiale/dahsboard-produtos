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
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Buscar por nome
        </label>
        <input
          type="text"
          value={search}
          onChange={(event) => updateParam('search', event.target.value)}
          disabled={isLoading}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Digite o nome do produto..."
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Status
        </label>
        <select
          value={status}
          onChange={(event) => updateParam('status', event.target.value || null)}
          disabled={isLoading}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value || 'all'} value={option.value} className="bg-gray-800">
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-end">
        <button
          onClick={handleReset}
          disabled={isLoading}
          className="border border-gray-700 text-gray-300 hover:border-gray-600 hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Limpar filtros
        </button>
      </div>
    </div>
  )
}
