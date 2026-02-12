import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProductsStore } from '../store/productsStore'
import { useSalesStore } from '../store/salesStore'
import { ProductsFilters } from '../features/products/components/ProductsFilters'
import { ProductsTable } from '../features/products/components/ProductsTable'
import { PageTitle } from '../shared/components/PageTitle'
import { Loader } from '../shared/components/Loader'
import { ErrorMessage } from '../shared/components/ErrorMessage'
import { EmptyState } from '../shared/components/EmptyState'

export function ProductsListPage() {
  const [searchParams] = useSearchParams()
  const { products, isLoading, error, loadProducts, removeProduct, setFilters } = useProductsStore()
  const { loadSales } = useSalesStore()

  useEffect(() => {
    const search = searchParams.get('search') ?? undefined
    const status = (searchParams.get('status') as 'active' | 'inactive' | null) ?? undefined

    setFilters({ search, status })
    void loadProducts()
    void loadSales()
  }, [loadProducts, loadSales, searchParams, setFilters])

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageTitle
        title="Produtos"
        description="Gerencie o catálogo de produtos."
        action={
          <a
            href="/products?mode=form"
            className="bg-linear-to-r from-blue-600 to-blue-700 text-white shadow-lg px-4 py-2 rounded-lg transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Novo produto
          </a>
        }
      />

      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4 backdrop-blur-sm">
        <ProductsFilters isLoading={isLoading} />
      </div>

      {isLoading && <Loader />}

      {!isLoading && !!error && (
        <ErrorMessage message={error} onRetry={loadProducts} />
      )}

      {!isLoading && !error && products.length === 0 && (
        <EmptyState
          title="Nenhum produto encontrado"
          description="Tente ajustar os filtros ou criar um novo produto."
          actionLabel="Criar produto"
          onAction={() => (window.location.href = '/products?mode=form')}
        />
      )}

      {!isLoading && !error && products.length > 0 && (
        <div className="rounded-2xl border border-gray-800 bg-gray-900/30 p-6 backdrop-blur-sm">
          <ProductsTable products={products} onDelete={removeProduct} />
        </div>
      )}
    </div>
  )
}
