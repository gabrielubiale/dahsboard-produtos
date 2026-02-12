import { Bar } from 'react-chartjs-2'
import '../../../../../config/chartjs'

type Props = { data: { labels: string[]; data: number[] } }

export function ChartProductsMostRevenue({ data }: Props) {
  const chartData = {
    labels: data.labels,
    datasets: [{
      label: 'Faturamento (R$)',
      data: data.data,
      backgroundColor: '#22c55e',
      borderColor: '#16a34a',
      borderWidth: 1,
    }],
  }
  const options = {
    indexAxis: 'y' as const,
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
        callbacks: {
          label: (ctx: { parsed: { x: number | null } }) =>
            (ctx.parsed.x ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { color: '#9ca3af' },
        grid: { color: '#374151' },
      },
      y: {
        ticks: { color: '#9ca3af' },
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
