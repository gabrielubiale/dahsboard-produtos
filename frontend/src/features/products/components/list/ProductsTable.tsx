import { Pencil, Trash } from 'phosphor-react'
import type { Product } from '../../../../services/types'
import type { Column } from '../../../../shared/components/DynamicTable/DynamicTable'
import { DynamicTable } from '../../../../shared/components/DynamicTable/DynamicTable'

type ProductsTableProps = {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

export function ProductsTable({ products, onEdit, onDelete }: ProductsTableProps) {
  const columns: Column<Product>[] = [
    {
      id: 'name',
      header: 'Nome',
      render: (product: Product) => (
        <span className="font-medium text-white">{product.name}</span>
      ),
    },
    {
      id: 'category',
      header: 'Categoria',
      render: (product: Product) => (
        <span className="text-gray-400">{product.category}</span>
      ),
    },
    {
      id: 'price',
      header: 'Preço',
      align: 'right',
      render: (product: Product) => (
        <span className="font-semibold text-white">
          {product.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      render: (product: Product) => (
        <span
          className={`
            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
            ${product.status === 'active'
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }
          `}
        >
          {product.status === 'active' ? 'Disponível' : 'Indisponível'}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Ações',
      align: 'right',
      render: (product: Product) => (
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="text-blue-400 transition-all hover:bg-blue-500/20 hover:scale-110 p-2 rounded-lg"
            title="Editar"
          >
            <Pencil size={18} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(product)}
            className="text-red-400 transition-all hover:bg-red-500/20 hover:scale-110 p-2 rounded-lg"
            title="Excluir"
          >
            <Trash size={18} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <DynamicTable<Product>
      data={products}
      columns={columns}
      keyExtractor={(p: Product) => p.id}
      minWidth="800px"
    />
  )
}
