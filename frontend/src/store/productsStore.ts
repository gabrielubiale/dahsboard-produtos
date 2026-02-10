import { create } from 'zustand'
import type { NewProduct, Product, ProductFilters, UpdateProduct } from '../services/types'
import { productsService } from '../services/productsService'

type ProductsState = {
  products: Product[]
  selectedProduct?: Product
  filters: ProductFilters
  isLoading: boolean
  error?: string
}

type ProductsActions = {
  setFilters: (filters: ProductFilters) => void
  loadProducts: () => Promise<void>
  loadProductById: (id: string) => Promise<void>
  createProduct: (data: NewProduct) => Promise<void>
  updateProduct: (id: string, data: UpdateProduct) => Promise<void>
  removeProduct: (id: string) => Promise<void>
}

type ProductsStore = ProductsState & ProductsActions

const initialState: ProductsState = {
  products: [],
  selectedProduct: undefined,
  filters: {},
  isLoading: false,
  error: undefined,
}

export const useProductsStore = create<ProductsStore>((set, get) => ({
  ...initialState,

  setFilters: (filters) => {
    set({ filters })
  },

  loadProducts: async () => {
    const { filters } = get()
    set({ isLoading: true, error: undefined })

    try {
      const products = await productsService.fetchProducts(filters)
      set({ products })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao carregar produtos'
      set({ error: message })
    } finally {
      set({ isLoading: false })
    }
  },

  loadProductById: async (id) => {
    set({ isLoading: true, error: undefined })

    try {
      const selectedProduct = await productsService.fetchProductById(id)
      set({ selectedProduct })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao carregar produto'
      set({ error: message })
    } finally {
      set({ isLoading: false })
    }
  },

  createProduct: async (data) => {
    set({ isLoading: true, error: undefined })

    try {
      const product = await productsService.createProduct(data)
      set((state) => ({ products: [...state.products, product] }))
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao criar produto'
      set({ error: message })
    } finally {
      set({ isLoading: false })
    }
  },

  updateProduct: async (id, data) => {
    set({ isLoading: true, error: undefined })

    try {
      const updated = await productsService.updateProduct(id, data)
      set((state) => ({
        products: state.products.map((product) => (product.id === id ? updated : product)),
        selectedProduct: updated,
      }))
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao atualizar produto'
      set({ error: message })
    } finally {
      set({ isLoading: false })
    }
  },

  removeProduct: async (id) => {
    set({ isLoading: true, error: undefined })

    try {
      await productsService.deleteProduct(id)
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
      }))
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao remover produto'
      set({ error: message })
    } finally {
      set({ isLoading: false })
    }
  },
}))

