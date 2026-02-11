import { List, House, CaretRight } from 'phosphor-react'

type TopBarProps = {
  onMenuClick?: () => void
  title?: string
  breadcrumbs?: Array<{ label: string; path?: string }>
}

export function TopBar({ onMenuClick, title, breadcrumbs }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm">
      <nav className="flex items-center px-4 lg:px-6 min-h-[64px]">
        {/* Menu Toggle (mobile) */}
        <button
          onClick={onMenuClick}
          className="mr-3 text-gray-400 lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="menu"
        >
          <List size={24} />
        </button>

        {/* Breadcrumbs */}
        <div className="flex flex-1 items-center">
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <nav className="flex items-center text-gray-400 space-x-2">
              <div className="flex items-center text-gray-500">
                <House size={16} className="mr-1" />
                <span className="text-sm">Dashboard</span>
              </div>
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CaretRight size={16} className="text-gray-600" />
                  <span className={`text-sm ${index === breadcrumbs.length - 1 ? 'text-white font-medium' : 'text-gray-400'}`}>
                    {crumb.label}
                  </span>
                </div>
              ))}
            </nav>
          ) : (
            <h6 className="font-semibold text-white text-lg">
              {title || 'Dashboard'}
            </h6>
          )}
        </div>

        {/* Ações (futuro: notificações, perfil, etc.) */}
        <div className="flex items-center gap-2">
          {/* Espaço para ações futuras */}
        </div>
      </nav>
    </header>
  )
}
