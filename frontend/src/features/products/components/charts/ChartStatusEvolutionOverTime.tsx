import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import { Line } from 'react-chartjs-2'
import '../../../../config/chartjs'

type ChartStatusEvolutionOverTimeProps = {
  data: { labels: string[]; activeData: number[]; inactiveData: number[] }
}

export function ChartStatusEvolutionOverTime({ data }: ChartStatusEvolutionOverTimeProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Ativos',
        data: data.activeData,
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Inativos',
        data: data.inactiveData,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        beginAtZero: true,
        stacked: false,
        ticks: {
          stepSize: 1,
        },
      },
    },
  }

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h6">Produtos ativos vs inativos ao longo do tempo</Typography>}
        subheader="Evolução histórica do status - Mostra se o time está desativando mais do que ativando"
      />
      <CardContent>
        <div style={{ height: '300px' }}>
          <Line data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}
