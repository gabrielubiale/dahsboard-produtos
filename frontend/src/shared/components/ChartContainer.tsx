import { ChartContainerHeader } from './ChartContainerHeader'

type ChartContainerProps = {
  id: string
  title: string
  description: string
  children: React.ReactNode
  className?: string
}

export function ChartContainer({ id, title, description, children, className = '' }: ChartContainerProps) {
  return (
    <div
      id={id}
      className={`flex h-full flex-col overflow-hidden rounded-2xl border border-gray-800 bg-linear-to-br from-gray-900/90 to-gray-800/90 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-gray-700 hover:shadow-2xl ${className}`}
    >
      <ChartContainerHeader title={title} description={description} />
      {children}
    </div>
  )
}
