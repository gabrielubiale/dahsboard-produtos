import { Pencil, Trash } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import type { Product } from '../../../services/types'

type ProductsTableProps = {
  products: Product[]
  onDelete: (id: string) => void
}

export function ProductsTable({ products, onDelete }: ProductsTableProps) {
  const navigate = useNavigate()

  if (!products.length) {
    return null
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 shadow-xl backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-900/80">
              <th className="px-4 py-3 text-left font-semibold text-gray-300">Nome</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-300">Categoria</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-300">Preço</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-300">Status</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-300">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className={`
                  border-b border-gray-800/50 transition-all duration-200
                  hover:bg-gray-800/30 hover:translate-x-1 hover:shadow-[inset_4px_0_0_rgba(59,130,246,0.5)]
                  ${index % 2 === 0 ? 'bg-gray-900/30' : 'bg-gray-900/50'}
                `}
              >
                <td className="px-4 py-3">
                  <span className="font-medium text-white">{product.name}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-gray-400">{product.category}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="font-semibold text-white">
                    {product.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </td>
                <td className="px-4 py-3">
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
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => navigate(`/products/${product.id}/edit`)}
                      className="text-blue-400 transition-all hover:bg-blue-500/20 hover:scale-110 p-2 rounded-lg"
                      title="Editar"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="text-red-400 transition-all hover:bg-red-500/20 hover:scale-110 p-2 rounded-lg"
                      title="Excluir"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
