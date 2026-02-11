import { create } from 'zustand'
import type { Sale } from '../services/types'
import { salesService } from '../services/salesService'

type SalesState = {
  sales: Sale[]
  isLoading: boolean
  error?: string
}

type SalesActions = {
  loadSales: () => Promise<void>
}

type SalesStore = SalesState & SalesActions

export const useSalesStore = create<SalesStore>((set) => ({
  sales: [],
  isLoading: false,
  error: undefined,

  loadSales: async () => {
    set({ isLoading: true, error: undefined })

    try {
      const sales = await salesService.fetchSales()
      set({ sales })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao carregar vendas'
      set({ error: message })
    } finally {
      set({ isLoading: false })
    }
  },
}))
