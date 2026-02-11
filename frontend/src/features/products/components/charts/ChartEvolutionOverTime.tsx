import { Line } from 'react-chartjs-2'
import '../../../../config/chartjs'

type ChartEvolutionOverTimeProps = {
  data: { labels: string[]; data: number[] }
}

export function ChartEvolutionOverTime({ data }: ChartEvolutionOverTimeProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Produtos criados',
        data: data.data,
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#111827',
        pointBorderWidth: 2,
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
          label: (context: any) => `Produtos criados: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#9ca3af',
        },
        grid: {
          color: '#374151',
        },
      },
      x: {
        ticks: {
          color: '#9ca3af',
        },
        grid: {
          color: '#374151',
        },
      },
    },
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/90 to-gray-800/90 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-gray-700 hover:shadow-2xl">
      <div className="border-b border-gray-800/50 bg-gray-900/50 px-6 py-4">
        <h6 className="font-semibold text-white text-lg mb-1">
          Evolução de produtos criados no tempo
        </h6>
        <p className="text-gray-400 text-sm">
          Usa createdAt - Mostra crescimento ou estagnação do cadastro
        </p>
      </div>
      <div className="p-6">
        <div className="h-[300px]">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  )
}
