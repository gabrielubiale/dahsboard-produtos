export type SidebarProps = {
  isOpen?: boolean
  onClose?: () => void
}

export type SubMenuItem = {
  label: string
  anchor: string
  icon: React.ReactNode
}

export type MenuItem = {
  label: string
  path: string
  icon: React.ReactNode
  subItems?: SubMenuItem[]
}
