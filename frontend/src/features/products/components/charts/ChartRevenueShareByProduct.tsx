import { Doughnut } from 'react-chartjs-2'
import '../../../../config/chartjs'

type Props = { data: { labels: string[]; data: number[] } }

const COLORS = [
  '#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6',
  '#ec4899', '#06b6d4', '#84cc16',
]

export function ChartRevenueShareByProduct({ data }: Props) {
  const chartData = {
    labels: data.labels,
    datasets: [{
      data: data.data,
      backgroundColor: COLORS.slice(0, data.labels.length),
      borderColor: '#1f2937',
      borderWidth: 2,
    }],
  }
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'right' as const,
        labels: { color: '#d1d5db', padding: 12 },
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#d1d5db',
        borderColor: '#374151',
        borderWidth: 1,
        callbacks: {
          label: (ctx: { parsed: number }) => `${ctx.parsed}% do faturamento`,
        },
      },
    },
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-800 bg-linear-to-br from-gray-900/90 to-gray-800/90 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-gray-700 hover:shadow-2xl">
      <div className="border-b border-gray-800/50 bg-gray-900/50 px-6 py-4">
        <h6 className="font-semibold text-white text-lg mb-1">Participação no faturamento total</h6>
        <p className="text-gray-400 text-sm">Percentual de contribuição por produto</p>
      </div>
      <div className="p-6">
        <div className="flex h-[300px] items-center justify-center">
          <Doughnut data={chartData} options={options} />
        </div>
      </div>
    </div>
  )
}
