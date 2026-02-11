import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProductsStore } from '../store/productsStore'
import { ProductsFilters } from '../features/products/components/ProductsFilters'
import { ProductsTable } from '../features/products/components/ProductsTable'
import { ProductsCharts } from '../features/products/components/ProductsCharts'
import { StatsCards } from '../features/products/components/StatsCards'
import { ProductForm } from '../features/products/components/ProductForm'
import { Loader } from '../shared/components/Loader'
import { ErrorMessage } from '../shared/components/ErrorMessage'
import { EmptyState } from '../shared/components/EmptyState'

export function Products() {
  const [searchParams] = useSearchParams()
  const [view, setView] = useState<'dashboard' | 'list'>('dashboard')

  const { products, isLoading, error, loadProducts, removeProduct, setFilters } = useProductsStore()

  const isFormMode = Boolean(searchParams.get('mode') === 'form')

  useEffect(() => {
    const search = searchParams.get('search') ?? undefined
    const status = (searchParams.get('status') as 'active' | 'inactive' | null) ?? undefined

    setFilters({
      search,
      status,
    })

    void loadProducts()
  }, [loadProducts, searchParams, setFilters])

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Compacto */}
      {!isFormMode && (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-white">Produtos</h1>
            <p className="text-sm text-gray-400">
              Gerencie seu catálogo de produtos com visualizações e análises em tempo real
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => loadProducts()}
              disabled={isLoading}
              className="border border-gray-700 text-gray-300 px-4 py-2 rounded-lg transition-all hover:border-gray-600 hover:bg-gray-800/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Recarregar
            </button>
            <a
              href={isFormMode ? '/products' : '/products?mode=form'}
              className="bg-linear-to-r from-blue-600 to-blue-700 text-white shadow-lg px-4 py-2 rounded-lg transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isFormMode ? 'Voltar' : 'Novo produto'}
            </a>
          </div>
        </div>
      )}

      {/* Tabs Elegantes */}
      {!isFormMode && (
        <div className="border-b border-gray-800">
          <div className="flex">
            <button
              onClick={() => setView('dashboard')}
              className={`
                px-6 py-3 text-sm font-medium transition-all
                ${view === 'dashboard'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-300'
                }
              `}
            >
              Dashboard
            </button>
            <button
              onClick={() => setView('list')}
              className={`
                px-6 py-3 text-sm font-medium transition-all
                ${view === 'list'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-300'
                }
              `}
            >
              Lista
            </button>
          </div>
        </div>
      )}

      {/* Filtros Integrados */}
      {!isFormMode && view === 'dashboard' && (
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4 backdrop-blur-sm">
          <ProductsFilters isLoading={isLoading} />
        </div>
      )}

      {/* Conteúdo */}
      {isFormMode ? (
        <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm shadow-xl">
          <ProductForm />
        </div>
      ) : (
        <>
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
            <>
              {view === 'dashboard' ? (
                <>
                  <StatsCards />
                  <hr className="my-8 border-gray-800" />
                  <ProductsCharts />
                </>
              ) : (
                <div className="rounded-2xl border border-gray-800 bg-gray-900/30 p-6 backdrop-blur-sm">
                  <ProductsTable products={products} onDelete={removeProduct} />
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
