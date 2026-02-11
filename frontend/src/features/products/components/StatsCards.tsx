import { useMemo } from 'react'
import {
  Package,
  CheckCircle,
  X,
  CurrencyDollar,
} from 'phosphor-react'
import { useProductsStore } from '../../../store/productsStore'

export function StatsCards() {
  const products = useProductsStore((state) => state.products)

  const stats = useMemo(() => {
    const total = products.length
    const active = products.filter((p) => p.status === 'active').length
    const inactive = products.filter((p) => p.status === 'inactive').length
    const totalValue = products
      .filter((p) => p.status === 'active')
      .reduce((sum, p) => sum + p.price, 0)

    return {
      total,
      active,
      inactive,
      totalValue,
    }
  }, [products])

  const statCards = [
    {
      title: 'Total de Produtos',
      value: stats.total,
      icon: Package,
      gradient: 'from-blue-500/20 via-blue-600/10 to-transparent',
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-400',
      borderColor: 'border-blue-500/30',
      glowColor: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Produtos Disponíveis',
      value: stats.active,
      icon: CheckCircle,
      gradient: 'from-green-500/20 via-green-600/10 to-transparent',
      iconBg: 'bg-green-500/20',
      iconColor: 'text-green-400',
      borderColor: 'border-green-500/30',
      glowColor: 'from-green-500 to-green-600',
    },
    {
      title: 'Produtos Indisponíveis',
      value: stats.inactive,
      icon: X,
      gradient: 'from-red-500/20 via-red-600/10 to-transparent',
      iconBg: 'bg-red-500/20',
      iconColor: 'text-red-400',
      borderColor: 'border-red-500/30',
      glowColor: 'from-red-500 to-red-600',
    },
    {
      title: 'Valor Total',
      value: stats.totalValue.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      icon: CurrencyDollar,
      gradient: 'from-purple-500/20 via-purple-600/10 to-transparent',
      iconBg: 'bg-purple-500/20',
      iconColor: 'text-purple-400',
      borderColor: 'border-purple-500/30',
      glowColor: 'from-purple-500 to-purple-600',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-3 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className={`
            group relative overflow-hidden rounded-2xl border
            bg-linear-to-br from-gray-900/90 to-gray-800/90
            p-6 shadow-lg backdrop-blur-sm
            transition-all duration-300 ease-out
            hover:scale-[1.02] hover:border-opacity-60 hover:shadow-2xl
            ${stat.borderColor}
          `}>
            <div className={`absolute inset-0 bg-linear-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            <div className="relative z-10">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {stat.title}
                </p>
                <div className={`
                  flex h-9 w-9 shrink-0 items-center justify-center self-center rounded-lg
                  shadow-lg transition-all duration-300
                  group-hover:scale-110 group-hover:shadow-xl
                  ${stat.iconBg}
                `}>
                  <Icon size={18} weight="fill" className={`${stat.iconColor} transition-transform group-hover:scale-110`} />
                </div>
              </div>
              <h4 className="font-bold text-white transition-colors group-hover:text-gray-100 text-2xl">
                {stat.value}
              </h4>
            </div>
            <div className={`
              absolute -right-12 -top-12 h-32 w-32 rounded-full
              bg-linear-to-br opacity-0 blur-3xl
              transition-opacity duration-500 group-hover:opacity-20
              ${stat.glowColor}
            `} />
          </div>
        )
      })}
    </div>
  )
}
