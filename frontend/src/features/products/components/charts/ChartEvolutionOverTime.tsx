import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import { Line } from 'react-chartjs-2'
import '../../../../config/chartjs'

type ChartEvolutionOverTimeProps = {
  data: { labels: string[]; data: number[] }
}

export function ChartEvolutionOverTime({ data }: ChartEvolutionOverTimeProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Produtos criados',
        data: data.data,
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Produtos criados: ${context.parsed.y}`,
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
        title={<Typography variant="h6">Evolução de produtos criados no tempo</Typography>}
        subheader="Usa createdAt - Mostra crescimento ou estagnação do cadastro"
      />
      <CardContent>
        <div style={{ height: '300px' }}>
          <Line data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}
