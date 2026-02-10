import { Card, CardContent, CardHeader, Typography, Box } from '@mui/material'
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
        backgroundColor: '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#d1d5db',
        borderColor: '#374151',
        borderWidth: 1,
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
    <Card className="overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/90 to-gray-800/90 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-gray-700 hover:shadow-2xl">
      <CardHeader
        className="border-b border-gray-800/50 bg-gray-900/50"
        title={
          <Typography variant="h6" className="font-semibold text-white">
            Distribuição de preços
          </Typography>
        }
        subheader={
          <Typography variant="body2" className="text-gray-400">
            Faixas de preço - Identifica produtos fora do padrão (outliers)
          </Typography>
        }
      />
      <CardContent className="p-6">
        <Box className="h-[300px]">
          <Bar data={chartData} options={options} />
        </Box>
      </CardContent>
    </Card>
  )
}
