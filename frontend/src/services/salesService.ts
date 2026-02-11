import type { Sale } from './types'
import { httpClient } from './httpClient'

export const salesService = {
  fetchSales() {
    return httpClient.get<Sale[]>('/sales')
  },
}
