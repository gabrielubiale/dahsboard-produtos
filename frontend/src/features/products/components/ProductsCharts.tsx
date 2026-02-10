import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { useProductsStore } from '../../../store/productsStore'

ChartJS.register(ArcElement, Tooltip, Legend)

export function ProductsCharts() {
  const products = useProductsStore((state) => state.products)

  const activeCount = products.filter((p) => p.status === 'active').length
  const inactiveCount = products.filter((p) => p.status === 'inactive').length

  const data = {
    labels: ['Ativos', 'Inativos'],
    datasets: [
      {
        data: [activeCount, inactiveCount],
        backgroundColor: ['#22c55e', '#ef4444'],
      },
    ],
  }

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h6">Distribuição de produtos por status</Typography>}
        subheader="Exemplo inicial de gráfico com Chart.js (dados vindos da store)"
      />
      <CardContent>
        <Doughnut data={data} />
      </CardContent>
    </Card>
  )
}

