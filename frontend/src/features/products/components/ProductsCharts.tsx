import { Grid, Typography } from '@mui/material'
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
      <Typography variant="body1" color="text.secondary" align="center" py={4}>
        Nenhum produto disponível para exibir gráficos.
      </Typography>
    )
  }

  return (
    <Grid container spacing={3}>
      {/* Gráfico 1: Total de produtos por status */}
      <Grid item xs={12} md={6}>
        <ChartStatusDistribution data={chartData.getStatusDistribution} />
      </Grid>

      {/* Gráfico 2: Produtos por categoria */}
      <Grid item xs={12} md={6}>
        <ChartProductsByCategory data={chartData.getProductsByCategory} />
      </Grid>

      {/* Gráfico 3: Evolução de produtos criados no tempo */}
      <Grid item xs={12}>
        <ChartEvolutionOverTime data={chartData.getEvolutionOverTime} />
      </Grid>

      {/* Gráfico 4: Preço médio por categoria */}
      <Grid item xs={12} md={6}>
        <ChartAveragePriceByCategory data={chartData.getAveragePriceByCategory} />
      </Grid>

      {/* Gráfico 5: Distribuição de preços */}
      <Grid item xs={12} md={6}>
        <ChartPriceDistribution data={chartData.getPriceDistribution} />
      </Grid>

      {/* Gráfico 6: Produtos ativos vs inativos ao longo do tempo */}
      <Grid item xs={12}>
        <ChartStatusEvolutionOverTime data={chartData.getStatusEvolutionOverTime} />
      </Grid>

      {/* Gráfico 7: Últimos produtos atualizados */}
      <Grid item xs={12} md={6}>
        <ChartRecentUpdates products={chartData.getRecentUpdates} />
      </Grid>

      {/* Gráfico 8: Top categorias por valor total */}
      <Grid item xs={12} md={6}>
        <ChartTopCategoriesByValue data={chartData.getTopCategoriesByValue} />
      </Grid>
    </Grid>
  )
}
