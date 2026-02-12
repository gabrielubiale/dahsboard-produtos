import { useEffect } from 'react'
import { useProductsStore } from '../../../../store/productsStore'
import { Modal } from '../../../../shared/components/Modal/Modal'
import { ProductFormFields } from '../form/ProductFormFields'

type ProductEditModalProps = {
  isOpen: boolean
  onClose: () => void
  productId: string | null
  onSuccess?: () => void
}

export function ProductEditModal({ isOpen, onClose, productId, onSuccess }: ProductEditModalProps) {
  const { selectedProduct, isLoading, loadProductById, updateProduct } = useProductsStore()

  useEffect(() => {
    if (isOpen && productId) {
      void loadProductById(productId)
    }
  }, [isOpen, productId, loadProductById])

  async function handleSubmit(data: { name: string; category: string; price: number; status: 'active' | 'inactive' }) {
    if (!productId) return
    await updateProduct(productId, data)
    onClose()
    onSuccess?.()
  }

  const defaultValues =
    selectedProduct && selectedProduct.id === productId
      ? {
          name: selectedProduct.name,
          category: selectedProduct.category,
          price: selectedProduct.price,
          status: selectedProduct.status,
        }
      : undefined

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar produto">
      <ProductFormFields
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isLoading={isLoading}
        submitLabel="Salvar alterações"
        title="Editar produto"
        showTitle={false}
      />
    </Modal>
  )
}
