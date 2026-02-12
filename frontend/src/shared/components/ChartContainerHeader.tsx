type ChartContainerHeaderProps = {
  title: string
  description: string
}

export function ChartContainerHeader({ title, description }: ChartContainerHeaderProps) {
  return (
    <div className="shrink-0 border-b border-gray-800/50 bg-gray-900/50 px-6 py-4">
      <h6 className="font-semibold text-white text-lg mb-1">{title}</h6>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}
