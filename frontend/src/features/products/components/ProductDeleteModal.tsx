import { ConfirmModal } from '../../../shared/components/ConfirmModal'

type ProductDeleteModalProps = {
  isOpen: boolean
  onClose: () => void
  productId: string | null
  productName?: string
  onConfirm: () => void | Promise<void>
}

export function ProductDeleteModal({
  isOpen,
  onClose,
  productId,
  productName = '',
  onConfirm,
}: ProductDeleteModalProps) {
  const message = productName
    ? `Tem certeza que deseja excluir o produto "${productName}"?`
    : 'Tem certeza que deseja excluir este produto?'

  function handleConfirm() {
    if (productId) {
      return onConfirm()
    }
  }

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Excluir produto"
      message={message}
      confirmLabel="Excluir"
      cancelLabel="Cancelar"
      variant="danger"
    />
  )
}
