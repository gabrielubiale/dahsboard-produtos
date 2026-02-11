export type ProductStatus = 'active' | 'inactive'

export type Sale = {
  id: string
  produtoId: string
  data: string
  quantidade: number
  valorTotal: number
}

export type Product = {
  id: string
  name: string
  category: string
  price: number
  status: ProductStatus
  createdAt: string
  updatedAt: string
}

export type NewProduct = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateProduct = Partial<NewProduct>

export type ProductFilters = {
  search?: string
  status?: ProductStatus
}

