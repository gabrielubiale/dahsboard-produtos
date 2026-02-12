import { Line } from 'react-chartjs-2'
import '../../../../../config/chartjs'

type Props = { data: { labels: string[]; data: number[] } }

export function ChartAverageTicketByMonth({ data }: Props) {
  const chartData = {
    labels: data.labels,
    datasets: [{
      label: 'Ticket médio (R$)',
      data: data.data,
      borderColor: '#06b6d4',
      backgroundColor: 'rgba(6, 182, 212, 0.2)',
      fill: true,
      tension: 0.4,
      pointRadius: 5,
      pointBackgroundColor: '#06b6d4',
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
        callbacks: {
          label: (ctx: { parsed: { y: number | null } }) =>
            (ctx.parsed.y ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
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
    <div className="p-6">
      <div className="h-[300px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
}
