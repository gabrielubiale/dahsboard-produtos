type TabProps = {
  label: string
  isActive: boolean
  onClick: () => void
}

export function Tab({ label, isActive, onClick }: TabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        cursor-pointer px-6 py-3 text-sm font-medium transition-all
        ${isActive
          ? 'text-blue-400 border-b-2 border-blue-400'
          : 'text-gray-400 hover:text-gray-300'
        }
      `}
    >
      {label}
    </button>
  )
}
