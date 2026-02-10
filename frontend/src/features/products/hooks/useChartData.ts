import { useMemo } from 'react'
import type { Product } from '../../../services/types'

export function useChartData(products: Product[]) {
  // 1. Distribuição por status (active vs inactive)
  const getStatusDistribution = useMemo(() => {
    const active = products.filter((p) => p.status === 'active').length
    const inactive = products.filter((p) => p.status === 'inactive').length
    return {
      labels: ['Ativos', 'Inativos'],
      data: [active, inactive],
    }
  }, [products])

  // 2. Produtos por categoria (contagem)
  const getProductsByCategory = useMemo(() => {
    const categoryMap = new Map<string, number>()
    products.forEach((p) => {
      categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + 1)
    })
    const categories = Array.from(categoryMap.keys()).sort()
    const counts = categories.map((cat) => categoryMap.get(cat) || 0)
    return {
      labels: categories,
      data: counts,
    }
  }, [products])

  // 3. Evolução de produtos criados no tempo (por mês)
  const getEvolutionOverTime = useMemo(() => {
    const monthMap = new Map<string, number>()
    products.forEach((p) => {
      const date = new Date(p.createdAt)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      monthMap.set(monthKey, (monthMap.get(monthKey) || 0) + 1)
    })
    const months = Array.from(monthMap.keys()).sort()
    const counts = months.map((month) => monthMap.get(month) || 0)
    // Formatar labels para exibição (MM/YYYY)
    const formattedLabels = months.map((month) => {
      const [year, monthNum] = month.split('-')
      return `${monthNum}/${year}`
    })
    return {
      labels: formattedLabels,
      data: counts,
    }
  }, [products])

  // 4. Preço médio por categoria
  const getAveragePriceByCategory = useMemo(() => {
    const categoryMap = new Map<string, { sum: number; count: number }>()
    products.forEach((p) => {
      const existing = categoryMap.get(p.category) || { sum: 0, count: 0 }
      categoryMap.set(p.category, {
        sum: existing.sum + p.price,
        count: existing.count + 1,
      })
    })
    const categories = Array.from(categoryMap.keys()).sort()
    const averages = categories.map((cat) => {
      const { sum, count } = categoryMap.get(cat) || { sum: 0, count: 0 }
      return count > 0 ? sum / count : 0
    })
    return {
      labels: categories,
      data: averages,
    }
  }, [products])

  // 5. Distribuição de preços (histograma por faixas)
  const getPriceDistribution = useMemo(() => {
    const ranges = [
      { label: '0-100', min: 0, max: 100 },
      { label: '100-500', min: 100, max: 500 },
      { label: '500-2000', min: 500, max: 2000 },
      { label: '2000-5000', min: 2000, max: 5000 },
      { label: '5000+', min: 5000, max: Infinity },
    ]
    const counts = ranges.map((range) => {
      return products.filter((p) => p.price >= range.min && p.price < range.max).length
    })
    return {
      labels: ranges.map((r) => r.label),
      data: counts,
    }
  }, [products])

  // 6. Evolução de status ao longo do tempo (área empilhada)
  // Agrupa por mês e conta quantos produtos estavam active/inactive naquele mês
  const getStatusEvolutionOverTime = useMemo(() => {
    const monthMap = new Map<
      string,
      { active: number; inactive: number }
    >()
    products.forEach((p) => {
      const date = new Date(p.createdAt)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      const existing = monthMap.get(monthKey) || { active: 0, inactive: 0 }
      if (p.status === 'active') {
        existing.active++
      } else {
        existing.inactive++
      }
      monthMap.set(monthKey, existing)
    })
    const months = Array.from(monthMap.keys()).sort()
    const formattedLabels = months.map((month) => {
      const [year, monthNum] = month.split('-')
      return `${monthNum}/${year}`
    })
    const activeData = months.map((month) => monthMap.get(month)?.active || 0)
    const inactiveData = months.map((month) => monthMap.get(month)?.inactive || 0)
    return {
      labels: formattedLabels,
      activeData,
      inactiveData,
    }
  }, [products])

  // 7. Últimos produtos atualizados (top 10)
  const getRecentUpdates = useMemo(() => {
    return [...products]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 10)
  }, [products])

  // 8. Top categorias por valor total (soma de preços, apenas produtos active)
  const getTopCategoriesByValue = useMemo(() => {
    const categoryMap = new Map<string, number>()
    products
      .filter((p) => p.status === 'active')
      .forEach((p) => {
        categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + p.price)
      })
    const entries = Array.from(categoryMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10) // Top 10
    return {
      labels: entries.map(([cat]) => cat),
      data: entries.map(([, value]) => value),
    }
  }, [products])

  return {
    getStatusDistribution,
    getProductsByCategory,
    getEvolutionOverTime,
    getAveragePriceByCategory,
    getPriceDistribution,
    getStatusEvolutionOverTime,
    getRecentUpdates,
    getTopCategoriesByValue,
  }
}
