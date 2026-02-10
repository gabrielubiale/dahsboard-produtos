import type { NewProduct, Product, ProductFilters, UpdateProduct } from './types'
import { httpClient } from './httpClient'

function buildQuery(filters?: ProductFilters) {
  const params = new URLSearchParams()

  if (filters?.search) params.set('search', filters.search)
  if (filters?.status) params.set('status', filters.status)

  const query = params.toString()
  return query ? `?${query}` : ''
}

export const productsService = {
  fetchProducts(filters?: ProductFilters) {
    const query = buildQuery(filters)
    return httpClient.get<Product[]>(`/products${query}`)
  },
  fetchProductById(id: string) {
    return httpClient.get<Product>(`/products/${id}`)
  },
  createProduct(data: NewProduct) {
    return httpClient.post<Product>('/products', data)
  },
  updateProduct(id: string, data: UpdateProduct) {
    return httpClient.put<Product>(`/products/${id}`, data)
  },
  deleteProduct(id: string) {
    return httpClient.delete<void>(`/products/${id}`)
  },
}

