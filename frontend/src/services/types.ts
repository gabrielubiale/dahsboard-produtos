export type ProductStatus = 'active' | 'inactive'

export type Sale = {
  id: string
  productId: string
  date: string
  quantity: number
  totalAmount: number
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

