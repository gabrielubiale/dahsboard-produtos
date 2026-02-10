import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import { Doughnut } from 'react-chartjs-2'
import '../../../../config/chartjs'

type ChartStatusDistributionProps = {
  data: { labels: string[]; data: number[] }
}

export function ChartStatusDistribution({ data }: ChartStatusDistributionProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.data,
        backgroundColor: ['#22c55e', '#ef4444'],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
            const percentage = ((context.parsed / total) * 100).toFixed(1)
            return `${context.label}: ${context.parsed} (${percentage}%)`
          },
        },
      },
    },
  }

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h6">Total de produtos por status</Typography>}
        subheader="Active vs Inactive - Pergunta: meu catálogo está saudável?"
      />
      <CardContent>
        <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Doughnut data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}
