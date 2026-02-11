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
        borderColor: '#111827',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
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
    <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/90 to-gray-800/90 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-gray-700 hover:shadow-2xl">
      <div className="border-b border-gray-800/50 bg-gray-900/50 px-6 py-4">
        <h6 className="font-semibold text-white text-lg mb-1">
          Total de produtos por status
        </h6>
        <p className="text-gray-400 text-sm">
          Active vs Inactive - Pergunta: meu catálogo está saudável?
        </p>
      </div>
      <div className="p-6">
        <div className="flex h-[300px] items-center justify-center">
          <Doughnut data={chartData} options={options} />
        </div>
      </div>
    </div>
  )
}
