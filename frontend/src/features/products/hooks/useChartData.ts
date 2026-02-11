import { useMemo } from 'react'
import type { Product } from '../../../services/types'
import type { Sale } from '../../../services/types'

export function useChartData(products: Product[], sales: Sale[]) {
  const productMap = useMemo(() => new Map(products.map((p) => [p.id, p])), [products])

  // 1. Produtos mais vendidos (Quantidade) - Ranking por unidades vendidas
  const getProductsMostSoldByQuantity = useMemo(() => {
    const byProduct = new Map<string, number>()
    sales.forEach((s) => {
      byProduct.set(s.produtoId, (byProduct.get(s.produtoId) || 0) + s.quantidade)
    })
    const entries = Array.from(byProduct.entries())
      .map(([id, qty]) => [productMap.get(id)?.name ?? id, qty] as [string, number])
      .sort((a, b) => b[1] - a[1])
    return { labels: entries.map((e) => e[0]), data: entries.map((e) => e[1]) }
  }, [sales, productMap])

  // 2. Produtos que mais faturaram (Valor) - Ranking por faturamento total
  const getProductsMostRevenue = useMemo(() => {
    const byProduct = new Map<string, number>()
    sales.forEach((s) => {
      byProduct.set(s.produtoId, (byProduct.get(s.produtoId) || 0) + s.valorTotal)
    })
    const entries = Array.from(byProduct.entries())
      .map(([id, val]) => [productMap.get(id)?.name ?? id, val] as [string, number])
      .sort((a, b) => b[1] - a[1])
    return { labels: entries.map((e) => e[0]), data: entries.map((e) => e[1]) }
  }, [sales, productMap])

  // 3. Faturamento por mês (2025)
  const getRevenueByMonth = useMemo(() => {
    const monthMap = new Map<string, number>()
    const months = ['01', '02', '03', '04']
    months.forEach((m) => monthMap.set(`2025-${m}`, 0))
    sales.forEach((s) => {
      const d = new Date(s.data)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      if (monthMap.has(key)) monthMap.set(key, (monthMap.get(key) || 0) + s.valorTotal)
    })
    const labels = months.map((m) => {
      const names: Record<string, string> = { '01': 'Jan', '02': 'Fev', '03': 'Mar', '04': 'Abr' }
      return names[m] || m
    })
    const data = months.map((m) => monthMap.get(`2025-${m}`) || 0)
    return { labels, data }
  }, [sales])

  // 4. Quantidade de vendas por mês
  const getSalesCountByMonth = useMemo(() => {
    const monthMap = new Map<string, number>()
    const months = ['01', '02', '03', '04']
    months.forEach((m) => monthMap.set(`2025-${m}`, 0))
    sales.forEach((s) => {
      const d = new Date(s.data)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      if (monthMap.has(key)) monthMap.set(key, (monthMap.get(key) || 0) + 1)
    })
    const labels = months.map((m) => {
      const names: Record<string, string> = { '01': 'Jan', '02': 'Fev', '03': 'Mar', '04': 'Abr' }
      return names[m] || m
    })
    const data = months.map((m) => monthMap.get(`2025-${m}`) || 0)
    return { labels, data }
  }, [sales])

  // 5. Participação de cada produto no faturamento total (%)
  const getRevenueShareByProduct = useMemo(() => {
    const byProduct = new Map<string, number>()
    let total = 0
    sales.forEach((s) => {
      byProduct.set(s.produtoId, (byProduct.get(s.produtoId) || 0) + s.valorTotal)
      total += s.valorTotal
    })
    if (total === 0) return { labels: [] as string[], data: [] as number[] }
    const entries = Array.from(byProduct.entries())
      .map(([id, val]) => [productMap.get(id)?.name ?? id, Math.round((val / total) * 1000) / 10] as [string, number])
      .sort((a, b) => b[1] - a[1])
    return { labels: entries.map((e) => e[0]), data: entries.map((e) => e[1]) }
  }, [sales, productMap])

  // 6. Ticket médio por mês
  const getAverageTicketByMonth = useMemo(() => {
    const revenueByMonth = new Map<string, number>()
    const countByMonth = new Map<string, number>()
    const months = ['01', '02', '03', '04']
    months.forEach((m) => {
      revenueByMonth.set(`2025-${m}`, 0)
      countByMonth.set(`2025-${m}`, 0)
    })
    sales.forEach((s) => {
      const d = new Date(s.data)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      if (revenueByMonth.has(key)) {
        revenueByMonth.set(key, (revenueByMonth.get(key) || 0) + s.valorTotal)
        countByMonth.set(key, (countByMonth.get(key) || 0) + 1)
      }
    })
    const labels = months.map((m) => {
      const names: Record<string, string> = { '01': 'Jan', '02': 'Fev', '03': 'Mar', '04': 'Abr' }
      return names[m] || m
    })
    const data = months.map((m) => {
      const key = `2025-${m}`
      const rev = revenueByMonth.get(key) || 0
      const cnt = countByMonth.get(key) || 0
      return cnt > 0 ? Math.round((rev / cnt) * 100) / 100 : 0
    })
    return { labels, data }
  }, [sales])

  // 7. Top 5: Quantidade vs Faturamento (grouped bar)
  const getTop5QuantityVsRevenue = useMemo(() => {
    const qtyByProduct = new Map<string, number>()
    const revByProduct = new Map<string, number>()
    sales.forEach((s) => {
      qtyByProduct.set(s.produtoId, (qtyByProduct.get(s.produtoId) || 0) + s.quantidade)
      revByProduct.set(s.produtoId, (revByProduct.get(s.produtoId) || 0) + s.valorTotal)
    })
    const productIds = Array.from(new Set(sales.map((s) => s.produtoId)))
    const combined = productIds.map((id) => ({
      name: productMap.get(id)?.name ?? id,
      qty: qtyByProduct.get(id) || 0,
      rev: revByProduct.get(id) || 0,
    }))
    combined.sort((a, b) => b.qty - a.qty)
    const top5 = combined.slice(0, 5)
    const labels = top5.map((p) => p.name)
    const quantityData = top5.map((p) => p.qty)
    const revenueData = top5.map((p) => p.rev)
    return { labels, quantityData, revenueData }
  }, [sales, productMap])

  // 8. Distribuição de vendas por categoria
  const getSalesByCategory = useMemo(() => {
    const byCategory = new Map<string, number>()
    sales.forEach((s) => {
      const product = productMap.get(s.produtoId)
      const cat = product?.category ?? 'Outros'
      byCategory.set(cat, (byCategory.get(cat) || 0) + s.quantidade)
    })
    const entries = Array.from(byCategory.entries()).sort((a, b) => b[1] - a[1])
    return { labels: entries.map((e) => e[0]), data: entries.map((e) => e[1]) }
  }, [sales, productMap])

  return {
    getProductsMostSoldByQuantity,
    getProductsMostRevenue,
    getRevenueByMonth,
    getSalesCountByMonth,
    getRevenueShareByProduct,
    getAverageTicketByMonth,
    getTop5QuantityVsRevenue,
    getSalesByCategory,
  }
}
