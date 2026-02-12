import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useProductsStore } from '../../../../store/productsStore'
import { ProductFormFields } from './ProductFormFields'

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

  async function handleSubmit(data: { name: string; category: string; price: number; status: 'active' | 'inactive' }) {
    if (isEditMode && id) {
      await updateProduct(id, data)
    } else {
      await createProduct(data)
    }
    navigate('/products')
  }

  const defaultValues = selectedProduct
    ? {
        name: selectedProduct.name,
        category: selectedProduct.category,
        price: selectedProduct.price,
        status: selectedProduct.status,
      }
    : undefined

  return (
    <ProductFormFields
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      onCancel={() => navigate('/products')}
      isLoading={isLoading}
      submitLabel={isEditMode ? 'Salvar alterações' : 'Criar produto'}
      title={isEditMode ? 'Editar produto' : 'Novo produto'}
    />
  )
}
