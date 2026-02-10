import { Card, CardContent, CardHeader, Typography, Box } from '@mui/material'
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
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: '#22c55e',
        pointBorderColor: '#111827',
        pointBorderWidth: 2,
      },
      {
        label: 'Inativos',
        data: data.inactiveData,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: '#ef4444',
        pointBorderColor: '#111827',
        pointBorderWidth: 2,
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
        labels: {
          color: '#d1d5db',
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#d1d5db',
        borderColor: '#374151',
        borderWidth: 1,
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        stacked: false,
        ticks: {
          color: '#9ca3af',
        },
        grid: {
          color: '#374151',
        },
      },
      y: {
        beginAtZero: true,
        stacked: false,
        ticks: {
          stepSize: 1,
          color: '#9ca3af',
        },
        grid: {
          color: '#374151',
        },
      },
    },
  }

  return (
    <Card className="border-gray-800 bg-gray-900 shadow-xl">
      <CardHeader
        className="border-b border-gray-800"
        title={
          <Typography variant="h6" className="font-semibold text-white">
            Produtos ativos vs inativos ao longo do tempo
          </Typography>
        }
        subheader={
          <Typography variant="body2" className="text-gray-400">
            Evolução histórica do status - Mostra se o time está desativando mais do que ativando
          </Typography>
        }
      />
      <CardContent className="p-6">
        <Box className="h-[300px]">
          <Line data={chartData} options={options} />
        </Box>
      </CardContent>
    </Card>
  )
}
