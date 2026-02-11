import { useProductsStore } from '../../../store/productsStore'
import { useChartData } from '../hooks/useChartData'
import { ChartStatusDistribution } from './charts/ChartStatusDistribution'
import { ChartProductsByCategory } from './charts/ChartProductsByCategory'
import { ChartEvolutionOverTime } from './charts/ChartEvolutionOverTime'
import { ChartAveragePriceByCategory } from './charts/ChartAveragePriceByCategory'
import { ChartPriceDistribution } from './charts/ChartPriceDistribution'
import { ChartStatusEvolutionOverTime } from './charts/ChartStatusEvolutionOverTime'
import { ChartRecentUpdates } from './charts/ChartRecentUpdates'
import { ChartTopCategoriesByValue } from './charts/ChartTopCategoriesByValue'

export function ProductsCharts() {
  const products = useProductsStore((state) => state.products)
  const chartData = useChartData(products)

  if (products.length === 0) {
    return (
      <p className="py-8 text-center text-gray-400">
        Nenhum produto disponível para exibir gráficos.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Gráfico 1: Total de produtos por status */}
      <div id="chart-status-distribution">
        <ChartStatusDistribution data={chartData.getStatusDistribution} />
      </div>

      {/* Gráfico 2: Produtos por categoria */}
      <div id="chart-products-by-category">
        <ChartProductsByCategory data={chartData.getProductsByCategory} />
      </div>

      {/* Gráfico 3: Evolução de produtos criados no tempo */}
      <div className="md:col-span-2" id="chart-evolution-over-time">
        <ChartEvolutionOverTime data={chartData.getEvolutionOverTime} />
      </div>

      {/* Gráfico 4: Preço médio por categoria */}
      <div id="chart-average-price-by-category">
        <ChartAveragePriceByCategory data={chartData.getAveragePriceByCategory} />
      </div>

      {/* Gráfico 5: Distribuição de preços */}
      <div id="chart-price-distribution">
        <ChartPriceDistribution data={chartData.getPriceDistribution} />
      </div>

      {/* Gráfico 6: Produtos disponíveis vs indisponíveis ao longo do tempo */}
      <div className="md:col-span-2" id="chart-status-evolution-over-time">
        <ChartStatusEvolutionOverTime data={chartData.getStatusEvolutionOverTime} />
      </div>

      {/* Gráfico 7: Últimos produtos atualizados */}
      <div id="chart-recent-updates">
        <ChartRecentUpdates products={chartData.getRecentUpdates} />
      </div>

      {/* Gráfico 8: Top categorias por valor total */}
      <div id="chart-top-categories-by-value">
        <ChartTopCategoriesByValue data={chartData.getTopCategoriesByValue} />
      </div>
    </div>
  )
}
