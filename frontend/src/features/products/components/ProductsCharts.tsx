import { useProductsStore } from '../../../store/productsStore'
import { useSalesStore } from '../../../store/salesStore'
import { ChartContainer } from '../../../shared/components/ChartContainer'
import { useChartData } from '../hooks/useChartData'
import { ChartProductsMostSoldByQuantity } from './charts/ChartProductsMostSoldByQuantity'
import { ChartProductsMostRevenue } from './charts/ChartProductsMostRevenue'
import { ChartRevenueByMonth } from './charts/ChartRevenueByMonth'
import { ChartSalesCountByMonth } from './charts/ChartSalesCountByMonth'
import { ChartRevenueShareByProduct } from './charts/ChartRevenueShareByProduct'
import { ChartAverageTicketByMonth } from './charts/ChartAverageTicketByMonth'
import { ChartTopProductSalesByMonth } from './charts/ChartTopProductSalesByMonth'
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 [&>div]:min-h-[420px]">
      <ChartContainer
        id="chart-products-most-sold"
        title="Produtos mais vendidos (Quantidade)"
        description="Ranking dos produtos por número total de unidades vendidas"
      >
        <ChartProductsMostSoldByQuantity data={chartData.getProductsMostSoldByQuantity} />
      </ChartContainer>
      <ChartContainer
        id="chart-products-most-revenue"
        title="Produtos que mais faturaram (Valor)"
        description="Ranking dos produtos por faturamento total"
      >
        <ChartProductsMostRevenue data={chartData.getProductsMostRevenue} />
      </ChartContainer>
      <ChartContainer
        id="chart-revenue-by-month"
        title="Faturamento por mês (2025)"
        description="Soma do faturamento mensal"
      >
        <ChartRevenueByMonth data={chartData.getRevenueByMonth} />
      </ChartContainer>
      <ChartContainer
        id="chart-sales-count-by-month"
        title="Quantidade de vendas por mês"
        description="Total de vendas realizadas em cada mês"
      >
        <ChartSalesCountByMonth data={chartData.getSalesCountByMonth} />
      </ChartContainer>
      <ChartContainer
        id="chart-revenue-share"
        title="Participação no faturamento total"
        description="Percentual de contribuição por produto"
      >
        <ChartRevenueShareByProduct data={chartData.getRevenueShareByProduct} />
      </ChartContainer>
      <ChartContainer
        id="chart-average-ticket"
        title="Ticket médio por mês"
        description="Faturamento total do mês ÷ número de vendas"
      >
        <ChartAverageTicketByMonth data={chartData.getAverageTicketByMonth} />
      </ChartContainer>
      <ChartContainer
        id="chart-top-product-sales-by-month"
        title="Distribuição de vendas do produto de maior faturamento ao longo dos meses"
        description="Faturamento total por mês, segmentado por produto (Stacked Bar Chart)"
        className="h-[500px]"
      >
        <ChartTopProductSalesByMonth data={chartData.getStackedRevenueByMonth} />
      </ChartContainer>
      <ChartContainer
        id="chart-sales-by-category"
        title="Distribuição de vendas por categoria"
        description="Quantidade total de vendas por categoria de produto"
        className="h-[500px]"
      >
        <ChartSalesByCategory data={chartData.getSalesByCategory} />
      </ChartContainer>
    </div>
  )
}
