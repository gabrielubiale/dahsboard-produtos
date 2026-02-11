import { 
  SquaresFour, 
  ChartPie, 
  ChartBar, 
  ChartLine, 
  CurrencyDollar, 
  ChartBarHorizontal, 
  Clock, 
  ClockClockwise, 
  TrendUp 
} from 'phosphor-react'
import type { MenuItem } from './types'

const ICON_SIZE_ITEM = 28
const ICON_SIZE_SUBITEM = 22

export const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    path: '/products',
    icon: <SquaresFour size={ICON_SIZE_ITEM} />,
    subItems: [
      {
        label: 'Produtos por status',
        anchor: '#chart-status-distribution',
        icon: <ChartPie size={ICON_SIZE_SUBITEM} />,
      },
      {
        label: 'Produtos por categoria',
        anchor: '#chart-products-by-category',
        icon: <ChartBar size={ICON_SIZE_SUBITEM} />,
      },
      {
        label: 'Produtos criados',
        anchor: '#chart-evolution-over-time',
        icon: <ChartLine size={ICON_SIZE_SUBITEM} />,
      },
      {
        label: 'Preço médio por categoria',
        anchor: '#chart-average-price-by-category',
        icon: <CurrencyDollar size={ICON_SIZE_SUBITEM} />,
      },
      {
        label: 'Distribuição de preços',
        anchor: '#chart-price-distribution',
        icon: <ChartBarHorizontal size={ICON_SIZE_SUBITEM} />,
      },
      {
        label: 'Disponíveis vs indisponíveis pelo tempo',
        anchor: '#chart-status-evolution-over-time',
        icon: <Clock size={ICON_SIZE_SUBITEM} />,
      },
      {
        label: 'Últimos produtos atualizados',
        anchor: '#chart-recent-updates',
        icon: <ClockClockwise size={ICON_SIZE_SUBITEM} />,
      },
      {
        label: 'Categorias por valor em estoque',
        anchor: '#chart-top-categories-by-value',
        icon: <TrendUp size={ICON_SIZE_SUBITEM} />,
      },
    ],
  },
]
