import { useProductsStore } from '../../../../store/productsStore'
import { Modal } from '../../../../shared/components/Modal/Modal'
import { ProductFormFields } from '../form/ProductFormFields'

type ProductCreateModalProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function ProductCreateModal({ isOpen, onClose, onSuccess }: ProductCreateModalProps) {
  const { createProduct, isLoading } = useProductsStore()

  async function handleSubmit(data: { name: string; category: string; price: number; status: 'active' | 'inactive' }) {
    await createProduct(data)
    onClose()
    onSuccess?.()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo produto">
      <ProductFormFields
        onSubmit={handleSubmit}
        onCancel={onClose}
        isLoading={isLoading}
        submitLabel="Criar produto"
        title="Novo produto"
        showTitle={false}
      />
    </Modal>
  )
}
