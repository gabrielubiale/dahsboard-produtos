import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import { Bar } from 'react-chartjs-2'
import '../../../../config/chartjs'

type ChartTopCategoriesByValueProps = {
  data: { labels: string[]; data: number[] }
}

export function ChartTopCategoriesByValue({ data }: ChartTopCategoriesByValueProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Valor total (R$)',
        data: data.data,
        backgroundColor: '#ec4899',
        borderColor: '#db2777',
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
            return `Valor total: ${value.toLocaleString('pt-BR', {
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
        title={<Typography variant="h6">Top categorias por valor total em estoque</Typography>}
        subheader="Soma de price por categoria (apenas produtos ativos) - Onde está concentrado o valor do catálogo?"
      />
      <CardContent>
        <div style={{ height: '300px' }}>
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}
