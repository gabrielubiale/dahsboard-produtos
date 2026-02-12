import { Bar } from 'react-chartjs-2'
import '../../../../config/chartjs'

type Props = { data: { labels: string[]; data: number[] } }

export function ChartSalesByCategory({ data }: Props) {
  const chartData = {
    labels: data.labels,
    datasets: [{
      label: 'Vendas (unidades)',
      data: data.data,
      backgroundColor: '#ec4899',
      borderColor: '#db2777',
      borderWidth: 1,
    }],
  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#d1d5db',
        borderColor: '#374151',
        borderWidth: 1,
        callbacks: { label: (ctx: { parsed: { y: number | null } }) => `${ctx.parsed.y ?? 0} unidades vendidas` },
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
    <div className="min-h-0 flex-1 p-6">
      <div className="h-full min-h-[200px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}
