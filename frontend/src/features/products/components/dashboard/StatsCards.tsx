import { useMemo } from 'react'
import { Package, CheckCircle, ShoppingCart, CurrencyDollar } from 'phosphor-react'
import { useProductsStore } from '../../../../store/productsStore'
import { useSalesStore } from '../../../../store/salesStore'
import { StatCard } from '../../../../shared/components/StatCard/StatCard'

export function StatsCardsProductsDashboard() {
  type ProductsStore = ReturnType<typeof useProductsStore.getState>
  type SalesStore = ReturnType<typeof useSalesStore.getState>

  const products = useProductsStore((state: ProductsStore) => state.products)
  const sales = useSalesStore((state: SalesStore) => state.sales)

  const stats = useMemo(() => {
    const total = products.length
    const active = products.filter((p) => p.status === 'active').length
    const totalVendas = sales.length
    const totalFaturamento = sales.reduce(
      (sum: number, s) => sum + s.totalAmount,
      0,
    )

    return {
      total,
      active,
      totalVendas,
      totalFaturamento,
    }
  }, [products, sales])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-3 mb-8">
      <StatCard
        title="Total de Produtos"
        icon={Package}
        value={stats.total}
        gradient="from-blue-500/20 via-blue-600/10 to-transparent"
        iconBg="bg-blue-500/20"
        iconColor="text-blue-400"
        borderColor="border-blue-500/30"
        glowColor="from-blue-500 to-blue-600"
      />
      <StatCard
        title="Produtos Disponíveis"
        icon={CheckCircle}
        value={stats.active}
        gradient="from-green-500/20 via-green-600/10 to-transparent"
        iconBg="bg-green-500/20"
        iconColor="text-green-400"
        borderColor="border-green-500/30"
        glowColor="from-green-500 to-green-600"
      />
      <StatCard
        title="Total de Vendas"
        icon={ShoppingCart}
        value={stats.totalVendas}
        gradient="from-amber-500/20 via-amber-600/10 to-transparent"
        iconBg="bg-amber-500/20"
        iconColor="text-amber-400"
        borderColor="border-amber-500/30"
        glowColor="from-amber-500 to-amber-600"
      />
      <StatCard
        title="Total Faturamento"
        icon={CurrencyDollar}
        value={stats.totalFaturamento.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
        gradient="from-purple-500/20 via-purple-600/10 to-transparent"
        iconBg="bg-purple-500/20"
        iconColor="text-purple-400"
        borderColor="border-purple-500/30"
        glowColor="from-purple-500 to-purple-600"
      />
    </div>
  )
}
