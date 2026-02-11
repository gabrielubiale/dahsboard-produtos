import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { ProductStatus } from '../../../services/types'
import { useProductsStore } from '../../../store/productsStore'

const STATUS_OPTIONS: { value: ProductStatus; label: string }[] = [
  { value: 'active', label: 'Ativo' },
  { value: 'inactive', label: 'Inativo' },
]

export function ProductForm() {
  const navigate = useNavigate()
  const params = useParams()
  const id = params.id

  const {
    selectedProduct,
    isLoading,
    loadProductById,
    createProduct,
    updateProduct,
  } = useProductsStore()

  const isEditMode = Boolean(id)

  useEffect(() => {
    if (isEditMode && id) {
      void loadProductById(id)
    }
  }, [id, isEditMode, loadProductById])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '')
    const category = String(formData.get('category') ?? '')
    const price = Number(formData.get('price') ?? 0)
    const status = formData.get('status') as ProductStatus

    if (!name || !category || !price || !status) {
      return
    }

    if (isEditMode && id) {
      await updateProduct(id, {
        name,
        category,
        price,
        status,
      })
    } else {
      await createProduct({
        name,
        category,
        price,
        status,
      })
    }

    navigate('/products')
  }

  const defaultName = selectedProduct?.name ?? ''
  const defaultCategory = selectedProduct?.category ?? ''
  const defaultPrice = selectedProduct?.price?.toString() ?? ''
  const defaultStatus = selectedProduct?.status ?? 'active'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h6 className="text-lg font-semibold text-white mb-4">
        {isEditMode ? 'Editar produto' : 'Novo produto'}
      </h6>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Nome
        </label>
        <input
          name="name"
          type="text"
          defaultValue={defaultName}
          required
          disabled={isLoading}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Categoria
        </label>
        <input
          name="category"
          type="text"
          defaultValue={defaultCategory}
          required
          disabled={isLoading}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Preço
        </label>
        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          defaultValue={defaultPrice}
          required
          disabled={isLoading}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Status
        </label>
        <select
          name="status"
          defaultValue={defaultStatus}
          required
          disabled={isLoading}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} className="bg-gray-800">
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={() => navigate('/products')}
          disabled={isLoading}
          className="border border-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:border-gray-600 hover:bg-gray-800/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isEditMode ? 'Salvar alterações' : 'Criar produto'}
        </button>
      </div>
    </form>
  )
}
