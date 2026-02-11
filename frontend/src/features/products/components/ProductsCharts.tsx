import { useProductsStore } from '../../../store/productsStore'
import { useSalesStore } from '../../../store/salesStore'
import { useChartData } from '../hooks/useChartData'
import { ChartProductsMostSoldByQuantity } from './charts/ChartProductsMostSoldByQuantity'
import { ChartProductsMostRevenue } from './charts/ChartProductsMostRevenue'
import { ChartRevenueByMonth } from './charts/ChartRevenueByMonth'
import { ChartSalesCountByMonth } from './charts/ChartSalesCountByMonth'
import { ChartRevenueShareByProduct } from './charts/ChartRevenueShareByProduct'
import { ChartAverageTicketByMonth } from './charts/ChartAverageTicketByMonth'
import { ChartTop5QuantityVsRevenue } from './charts/ChartTop5QuantityVsRevenue'
import { ChartSalesByCategory } from './charts/ChartSalesByCategory'

export function ProductsCharts() {
  const products = useProductsStore((state) => state.products)
  const sales = useSalesStore((state) => state.sales)
  const chartData = useChartData(products, sales)

  if (products.length === 0 && sales.length === 0) {
    return (
      <p className="py-8 text-center text-gray-400">
        Nenhum dado disponível para exibir gráficos.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div id="chart-products-most-sold">
        <ChartProductsMostSoldByQuantity data={chartData.getProductsMostSoldByQuantity} />
      </div>
      <div id="chart-products-most-revenue">
        <ChartProductsMostRevenue data={chartData.getProductsMostRevenue} />
      </div>
      <div id="chart-revenue-by-month">
        <ChartRevenueByMonth data={chartData.getRevenueByMonth} />
      </div>
      <div id="chart-sales-count-by-month">
        <ChartSalesCountByMonth data={chartData.getSalesCountByMonth} />
      </div>
      <div id="chart-revenue-share">
        <ChartRevenueShareByProduct data={chartData.getRevenueShareByProduct} />
      </div>
      <div id="chart-average-ticket">
        <ChartAverageTicketByMonth data={chartData.getAverageTicketByMonth} />
      </div>
      <div className="md:col-span-2" id="chart-top5-quantity-vs-revenue">
        <ChartTop5QuantityVsRevenue data={chartData.getTop5QuantityVsRevenue} />
      </div>
      <div id="chart-sales-by-category">
        <ChartSalesByCategory data={chartData.getSalesByCategory} />
      </div>
    </div>
  )
}
