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
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Produtos Ativos',
      value: stats.active,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Produtos Inativos',
      value: stats.inactive,
      icon: Cancel,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-500/10',
    },
    {
      title: 'Valor Total',
      value: stats.totalValue.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      icon: AttachMoney,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Categorias',
      value: stats.categories,
      icon: Category,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
    },
    {
      title: 'Preço Médio',
      value: stats.avgPrice.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      icon: TrendingUp,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-500/10',
    },
  ]

  return (
    <Grid container spacing={3} className="mb-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 2 }} key={index}>
            <Box
              className={`
                relative overflow-hidden rounded-xl border border-gray-800 
                bg-gradient-to-br from-gray-900 to-gray-800 
                p-6 shadow-xl transition-all duration-300 
                hover:border-gray-700 hover:shadow-2xl
              `}
            >
              <Box className="flex items-start justify-between">
                <Box className="flex-1">
                  <Typography
                    variant="body2"
                    className="mb-2 text-gray-400 uppercase tracking-wide"
                  >
                    {stat.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    className="font-bold text-white"
                    component="div"
                  >
                    {stat.value}
                  </Typography>
                </Box>
                <Box
                  className={`
                    flex h-12 w-12 items-center justify-center rounded-lg 
                    ${stat.bgColor} shadow-lg
                  `}
                >
                  <Icon className={`text-2xl text-white`} />
                </Box>
              </Box>
              <Box
                className={`
                  absolute -right-8 -top-8 h-24 w-24 rounded-full 
                  bg-gradient-to-br ${stat.color} opacity-10 blur-2xl
                `}
              />
            </Box>
          </Grid>
        )
      })}
    </Grid>
  )
}
