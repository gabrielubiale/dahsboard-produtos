import { useMemo } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import {
  Inventory2,
  CheckCircle,
  Cancel,
  AttachMoney,
  Category,
  TrendingUp,
} from '@mui/icons-material'
import { useProductsStore } from '../../../store/productsStore'

export function StatsCards() {
  const products = useProductsStore((state) => state.products)

  const stats = useMemo(() => {
    const total = products.length
    const active = products.filter((p) => p.status === 'active').length
    const inactive = products.filter((p) => p.status === 'inactive').length
    const totalValue = products
      .filter((p) => p.status === 'active')
      .reduce((sum, p) => sum + p.price, 0)
    const categories = new Set(products.map((p) => p.category)).size
    const avgPrice =
      products.length > 0
        ? products.reduce((sum, p) => sum + p.price, 0) / products.length
        : 0

    return {
      total,
      active,
      inactive,
      totalValue,
      categories,
      avgPrice,
    }
  }, [products])

  const statCards = [
    {
      title: 'Total de Produtos',
      value: stats.total,
      icon: Inventory2,
      gradient: 'from-blue-500/20 via-blue-600/10 to-transparent',
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-400',
      borderColor: 'border-blue-500/30',
      glowColor: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Produtos Ativos',
      value: stats.active,
      icon: CheckCircle,
      gradient: 'from-green-500/20 via-green-600/10 to-transparent',
      iconBg: 'bg-green-500/20',
      iconColor: 'text-green-400',
      borderColor: 'border-green-500/30',
      glowColor: 'from-green-500 to-green-600',
    },
    {
      title: 'Produtos Inativos',
      value: stats.inactive,
      icon: Cancel,
      gradient: 'from-red-500/20 via-red-600/10 to-transparent',
      iconBg: 'bg-red-500/20',
      iconColor: 'text-red-400',
      borderColor: 'border-red-500/30',
      glowColor: 'from-red-500 to-red-600',
    },
    {
      title: 'Valor Total',
      value: stats.totalValue.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      icon: AttachMoney,
      gradient: 'from-purple-500/20 via-purple-600/10 to-transparent',
      iconBg: 'bg-purple-500/20',
      iconColor: 'text-purple-400',
      borderColor: 'border-purple-500/30',
      glowColor: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Categorias',
      value: stats.categories,
      icon: Category,
      gradient: 'from-orange-500/20 via-orange-600/10 to-transparent',
      iconBg: 'bg-orange-500/20',
      iconColor: 'text-orange-400',
      borderColor: 'border-orange-500/30',
      glowColor: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Preço Médio',
      value: stats.avgPrice.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      icon: TrendingUp,
      gradient: 'from-pink-500/20 via-pink-600/10 to-transparent',
      iconBg: 'bg-pink-500/20',
      iconColor: 'text-pink-400',
      borderColor: 'border-pink-500/30',
      glowColor: 'from-pink-500 to-pink-600',
    },
  ]

  return (
    <Grid container spacing={3} className="mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 2 }} key={index}>
            <Box
              className={`
                group relative overflow-hidden rounded-2xl border
                bg-gradient-to-br from-gray-900/90 to-gray-800/90
                p-6 shadow-lg backdrop-blur-sm
                transition-all duration-300 ease-out
                hover:scale-[1.02] hover:border-opacity-60 hover:shadow-2xl
                ${stat.borderColor}
              `}
              sx={{
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, ${stat.gradient})`,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                },
                '&:hover::before': {
                  opacity: 1,
                },
              }}
            >
              <Box className="relative z-10 flex items-start justify-between">
                <Box className="flex-1">
                  <Typography
                    variant="body2"
                    className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400"
                  >
                    {stat.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    className="font-bold text-white transition-colors group-hover:text-gray-100"
                    component="div"
                  >
                    {stat.value}
                  </Typography>
                </Box>
                <Box
                  className={`
                    flex h-14 w-14 items-center justify-center rounded-xl
                    shadow-lg transition-all duration-300
                    group-hover:scale-110 group-hover:shadow-xl
                    ${stat.iconBg}
                  `}
                >
                  <Icon className={`text-2xl ${stat.iconColor} transition-transform group-hover:scale-110`} />
                </Box>
              </Box>
              <Box
                className={`
                  absolute -right-12 -top-12 h-32 w-32 rounded-full
                  bg-gradient-to-br opacity-0 blur-3xl
                  transition-opacity duration-500 group-hover:opacity-20
                  ${stat.glowColor}
                `}
              />
            </Box>
          </Grid>
        )
      })}
    </Grid>
  )
}
