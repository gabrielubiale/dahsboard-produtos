import { Bar } from 'react-chartjs-2'
import '../../../../config/chartjs'

type Props = { data: { labels: string[]; data: number[] } }

export function ChartSalesCountByMonth({ data }: Props) {
  const chartData = {
    labels: data.labels,
    datasets: [{
      label: 'Quantidade de vendas',
      data: data.data,
      backgroundColor: '#f59e0b',
      borderColor: '#d97706',
      borderWidth: 1,
    }],
  }
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#d1d5db',
        borderColor: '#374151',
        borderWidth: 1,
        callbacks: { label: (ctx: { parsed: { y: number | null } }) => `${ctx.parsed.y ?? 0} vendas` },
      },
    },
    scales: {
      x: {
        ticks: { color: '#9ca3af' },
        grid: { color: '#374151' },
      },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, color: '#9ca3af' },
        grid: { color: '#374151' },
      },
    },
  }
  return (
    <div className="p-6">
      <div className="h-[300px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}
