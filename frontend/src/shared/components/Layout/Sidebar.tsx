import { useLocation } from 'react-router-dom'
import { CaretUp, CaretDown } from 'phosphor-react'
import { useState, useEffect } from 'react'
import { menuItems } from '../../../features/sidebar/menuItems'
import type { SidebarProps } from '../../../features/sidebar/types'

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const location = useLocation()
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>({
    Dashboard: true,
  })
  const [activeAnchor, setActiveAnchor] = useState<string>('')

  useEffect(() => {
    setActiveAnchor(window.location.hash || '')
    
    const handleHashChange = () => {
      setActiveAnchor(window.location.hash || '')
    }
    
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [location])

  const handleNavigation = (path: string, anchor?: string) => {
    if (path !== location.pathname) {
      window.location.href = path + (anchor || '')
    } else if (anchor) {
      const element = document.querySelector(anchor)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.history.pushState(null, '', anchor)
        setActiveAnchor(anchor)
      }
    } else if (window.location.hash) {
      window.location.href = path
    }
    if (onClose) {
      onClose()
    }
  }

  const handleToggleSubMenu = (label: string) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  return (
    <div
      className={`fixed left-0 top-0 z-40 h-screen w-70 transform border-r border-gray-800 bg-linear-to-b from-gray-900
        to-gray-950 shadow-2xl transition-all ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}
    >
      {/* título */}
      <div className="w-full flex h-14 items-center justify-center border-b border-gray-800 px-4">
        <h6 className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text font-bold text-transparent text-sm">
          Dashboard
        </h6>
      </div>

      {/* item */}
      <div className="mt-3 px-2">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const hasSubItems = item.subItems && item.subItems.length > 0
            const isSubMenuOpen = openSubMenus[item.label] || false
            const hasActiveSubItem = hasSubItems && item.subItems?.some(subItem => activeAnchor === subItem.anchor)
            const isActive = (location.pathname === item.path || location.pathname.startsWith(item.path)) && !hasActiveSubItem

            return (
              <li key={item.path}>
                <div
                  className={`w-full rounded-lg transition-all flex items-center
                    ${isActive
                      ? 'bg-linear-to-r from-blue-600/20 to-purple-600/20 text-blue-400 shadow-lg'
                      : 'text-gray-400'
                    }
                  `}
                >
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`flex-1 cursor-pointer rounded-lg transition-all flex items-center px-3 py-2 text-left
                      ${!isActive ? 'hover:bg-gray-800/50 hover:text-white' : ''}
                    `}
                  >
                    <div className={`min-w-0 mr-3 transition-colors flex items-center ${isActive ? 'text-blue-400' : 'text-gray-500'}`}>
                      {item.icon}
                    </div>
                    <span className={`font-medium text-lg flex-1 ${isActive ? 'text-white' : 'text-gray-300'}`}>
                      {item.label}
                    </span>
                  </button>
                  {hasSubItems && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        handleToggleSubMenu(item.label)
                      }}
                      className={`cursor-pointer rounded-md p-1.5 transition-colors flex items-center justify-center shrink-0 mr-1
                        ${isActive ? 'text-blue-400 hover:bg-blue-600/30' : 'text-gray-500 hover:bg-gray-700'}
                      `}
                      aria-label={isSubMenuOpen ? 'Fechar submenu' : 'Abrir submenu'}
                    >
                      {isSubMenuOpen ? <CaretUp size={20} /> : <CaretDown size={20} />}
                    </button>
                  )}
                </div>

                {/* subitens */}
                {hasSubItems && (
                  <div className={`overflow-hidden transition-all duration-150 ease-in-out ${isSubMenuOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <ul className="ml-8 mt-1">
                      {item.subItems?.map((subItem) => {
                        const isSubActive = activeAnchor === subItem.anchor
                        return (
                          <li key={subItem.anchor} className="mb-1">
                            <button
                              onClick={() => handleNavigation(item.path, subItem.anchor)}
                              className={`w-full cursor-pointer rounded-lg transition-all flex items-center px-3 py-2
                                ${isSubActive
                                  ? 'bg-linear-to-r from-blue-600/20 to-purple-600/20 text-blue-400 shadow-lg'
                                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                                }
                              `}
                            >
                              <div className={`min-w-0 mr-3 transition-colors flex items-center ${isSubActive ? 'text-blue-400' : 'text-gray-500'}`}>
                                {subItem.icon}
                              </div>
                              <span className={`text-base flex-1 text-left ${isSubActive ? 'text-white' : 'text-gray-300'}`}>
                                {subItem.label}
                              </span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
