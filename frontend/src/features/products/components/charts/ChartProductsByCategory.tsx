import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import { Bar } from 'react-chartjs-2'
import '../../../../config/chartjs'

type ChartProductsByCategoryProps = {
  data: { labels: string[]; data: number[] }
}

export function ChartProductsByCategory({ data }: ChartProductsByCategoryProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Quantidade de produtos',
        data: data.data,
        backgroundColor: '#3b82f6',
        borderColor: '#2563eb',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Produtos: ${context.parsed.x}`,
        },
      },
    },
    scales: {
      x: {
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
        title={<Typography variant="h6">Produtos por categoria</Typography>}
        subheader="Quantidade por categoria - Ajuda a identificar concentração ou falta de diversidade"
      />
      <CardContent>
        <div style={{ height: '300px' }}>
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}
