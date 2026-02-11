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
        backgroundColor: '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#d1d5db',
        borderColor: '#374151',
        borderWidth: 1,
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
          color: '#9ca3af',
          callback: (value: any) => {
            return value.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
            })
          },
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
    <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/90 to-gray-800/90 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-gray-700 hover:shadow-2xl">
      <div className="border-b border-gray-800/50 bg-gray-900/50 px-6 py-4">
        <h6 className="font-semibold text-white text-lg mb-1">
          Preço médio por categoria
        </h6>
        <p className="text-gray-400 text-sm">
          Média de price agrupada por categoria - Dá visão de posicionamento de preço
        </p>
      </div>
      <div className="p-6">
        <div className="h-[300px]">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  )
}
