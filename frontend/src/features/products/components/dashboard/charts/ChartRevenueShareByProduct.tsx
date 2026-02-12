import { Doughnut } from 'react-chartjs-2'
import '../../../../../config/chartjs'

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
    <div className="p-6">
      <div className="flex h-[300px] items-center justify-center">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  )
}
