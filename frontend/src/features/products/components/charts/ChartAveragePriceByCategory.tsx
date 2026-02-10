import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import { Bar } from 'react-chartjs-2'
import '../../../../config/chartjs'

type ChartAveragePriceByCategoryProps = {
  data: { labels: string[]; data: number[] }
}

export function ChartAveragePriceByCategory({ data }: ChartAveragePriceByCategoryProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Preço médio (R$)',
        data: data.data,
        backgroundColor: '#10b981',
        borderColor: '#059669',
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
          label: (context: any) => {
            const value = context.parsed.y
            return `Preço médio: ${value.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}`
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => {
            return value.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
            })
          },
        },
      },
    },
  }

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h6">Preço médio por categoria</Typography>}
        subheader="Média de price agrupada por categoria - Dá visão de posicionamento de preço"
      />
      <CardContent>
        <div style={{ height: '300px' }}>
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}
