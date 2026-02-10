import { Card, CardContent, CardHeader, Typography, Box } from '@mui/material'
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
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#111827',
        pointBorderWidth: 2,
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
          label: (context: any) => `Produtos criados: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#9ca3af',
        },
        grid: {
          color: '#374151',
        },
      },
      x: {
        ticks: {
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
            Evolução de produtos criados no tempo
          </Typography>
        }
        subheader={
          <Typography variant="body2" className="text-gray-400">
            Usa createdAt - Mostra crescimento ou estagnação do cadastro
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
