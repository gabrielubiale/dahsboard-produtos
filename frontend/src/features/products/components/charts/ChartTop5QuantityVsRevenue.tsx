import { Bar } from 'react-chartjs-2'
import '../../../../config/chartjs'

type Props = {
  data: { labels: string[]; quantityData: number[]; revenueData: number[] }
}

export function ChartTop5QuantityVsRevenue({ data }: Props) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Quantidade (unidades)',
        data: data.quantityData,
        backgroundColor: '#3b82f6',
        borderColor: '#2563eb',
        borderWidth: 1,
      },
      {
        label: 'Faturamento (R$)',
        data: data.revenueData,
        backgroundColor: '#22c55e',
        borderColor: '#16a34a',
        borderWidth: 1,
      },
    ],
  }
  const options = {
    responsive: true,
    maintainAspectRatio: true,
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
          label: (ctx: { datasetIndex: number; parsed: { y: number | null } }) => {
            const y = ctx.parsed.y ?? 0
            return ctx.datasetIndex === 1
              ? `Faturamento: ${y.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
              : `Quantidade: ${y} unidades`
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#9ca3af' },
        grid: { color: '#374151' },
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#9ca3af' },
        grid: { color: '#374151' },
      },
    },
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-800 bg-linear-to-br from-gray-900/90 to-gray-800/90 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-gray-700 hover:shadow-2xl">
      <div className="border-b border-gray-800/50 bg-gray-900/50 px-6 py-4">
        <h6 className="font-semibold text-white text-lg mb-1">Comparativo: Top 5 produtos (Quantidade vs Faturamento)</h6>
        <p className="text-gray-400 text-sm">Mostra discrepâncias entre vender muito e faturar mais</p>
      </div>
      <div className="p-6">
        <div className="h-[300px]">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  )
}
