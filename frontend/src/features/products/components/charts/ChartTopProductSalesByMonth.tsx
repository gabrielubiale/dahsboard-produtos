import { Bar } from 'react-chartjs-2'
import '../../../../config/chartjs'

type Dataset = { label: string; data: number[]; backgroundColor: string }

type Props = {
  data: { labels: string[]; datasets: Dataset[] }
}

export function ChartTopProductSalesByMonth({ data }: Props) {
  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map((ds) => ({
      label: ds.label,
      data: ds.data,
      backgroundColor: ds.backgroundColor,
      borderWidth: 0,
    })),
  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: { color: '#d1d5db', padding: 12 },
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#d1d5db',
        borderColor: '#374151',
        borderWidth: 1,
        callbacks: {
          label: (ctx: { dataset: { label?: string }; parsed: { y: number | null } }) => {
            const y = ctx.parsed.y ?? 0
            const label = ctx.dataset.label ?? ''
            return `${label}: ${y.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}`
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: { color: '#9ca3af' },
        grid: { color: '#374151' },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: { color: '#9ca3af' },
        grid: { color: '#374151' },
      },
    },
  }
  return (
    <div className="min-h-0 flex-1 p-6">
      <div className="h-full min-h-[200px] w-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}
