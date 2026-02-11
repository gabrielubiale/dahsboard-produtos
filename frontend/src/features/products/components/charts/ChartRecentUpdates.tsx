import type { Product } from '../../../../services/types'

type ChartRecentUpdatesProps = {
  products: Product[]
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMinutes = Math.floor(diffMs / (1000 * 60))

  if (diffDays > 0) {
    return `${diffDays} ${diffDays === 1 ? 'dia' : 'dias'} atrás`
  }
  if (diffHours > 0) {
    return `${diffHours} ${diffHours === 1 ? 'hora' : 'horas'} atrás`
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} ${diffMinutes === 1 ? 'minuto' : 'minutos'} atrás`
  }
  return 'Agora'
}

export function ChartRecentUpdates({ products }: ChartRecentUpdatesProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/90 to-gray-800/90 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-gray-700 hover:shadow-2xl">
      <div className="border-b border-gray-800/50 bg-gray-900/50 px-6 py-4">
        <div className="flex items-center gap-2">
          <h6 className="font-semibold text-white text-lg">
            Últimos produtos atualizados
          </h6>
          <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            {products.length}
          </span>
        </div>
        <p className="text-gray-400 text-sm mt-1">
          Usa updatedAt - Ajuda a identificar atividade recente (operação)
        </p>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-4 py-3 text-left text-gray-400 font-semibold text-sm">Nome</th>
                <th className="px-4 py-3 text-left text-gray-400 font-semibold text-sm">Categoria</th>
                <th className="px-4 py-3 text-left text-gray-400 font-semibold text-sm">Status</th>
                <th className="px-4 py-3 text-right text-gray-400 font-semibold text-sm">Última atualização</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                  <td className="px-4 py-3 text-white">{product.name}</td>
                  <td className="px-4 py-3 text-gray-300">{product.category}</td>
                  <td className="px-4 py-3">
                    <span className={`
                      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${product.status === 'active'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }
                    `}>
                      {product.status === 'active' ? 'Disponível' : 'Indisponível'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-gray-400 text-sm">
                      {formatRelativeTime(product.updatedAt)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
