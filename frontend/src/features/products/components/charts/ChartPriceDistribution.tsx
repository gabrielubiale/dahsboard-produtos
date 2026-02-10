import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import { Bar } from 'react-chartjs-2'
import '../../../../config/chartjs'

type ChartPriceDistributionProps = {
  data: { labels: string[]; data: number[] }
}

export function ChartPriceDistribution({ data }: ChartPriceDistributionProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Quantidade de produtos',
        data: data.data,
        backgroundColor: '#f59e0b',
        borderColor: '#d97706',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Produtos: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  }

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h6">Distribuição de preços</Typography>}
        subheader="Faixas de preço - Identifica produtos fora do padrão (outliers)"
      />
      <CardContent>
        <div style={{ height: '300px' }}>
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}
