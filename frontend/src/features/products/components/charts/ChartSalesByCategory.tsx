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
    maintainAspectRatio: true,
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
    <div className="overflow-hidden rounded-2xl border border-gray-800 bg-linear-to-br from-gray-900/90 to-gray-800/90 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-gray-700 hover:shadow-2xl">
      <div className="border-b border-gray-800/50 bg-gray-900/50 px-6 py-4">
        <h6 className="font-semibold text-white text-lg mb-1">Distribuição de vendas por categoria</h6>
        <p className="text-gray-400 text-sm">Quantidade total de vendas por categoria de produto</p>
      </div>
      <div className="p-6">
        <div className="h-[300px]">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  )
}
