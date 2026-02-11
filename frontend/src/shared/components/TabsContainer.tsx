type TabsContainerProps = {
  children: React.ReactNode
}

export function TabsContainer({ children }: TabsContainerProps) {
  return (
    <div className="border-b border-gray-800">
      <div className="flex">{children}</div>
    </div>
  )
}
