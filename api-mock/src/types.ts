export type ProductStatus = 'active' | 'inactive'

export interface Product {
  id: string
  name: string
  category: string
  price: number
  status: ProductStatus
  createdAt: string
  updatedAt: string
}

export interface Sale {
  id: string
  productId: string
  date: string
  quantity: number
  totalAmount: number
}
