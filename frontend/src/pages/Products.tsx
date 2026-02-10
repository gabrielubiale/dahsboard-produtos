import { Button, Box, Tabs, Tab, Divider } from '@mui/material'
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

// Page principal de Produtos.
// Regra: o nome do componente da page é o mesmo nome da pasta em `features` (Products <-> products).
export function Products() {
  const [searchParams] = useSearchParams()
  const [view, setView] = useState<'dashboard' | 'list'>('dashboard')

  const { products, isLoading, error, loadProducts, removeProduct, setFilters } = useProductsStore()

  const isFormMode = Boolean(searchParams.get('mode') === 'form')

  // Sincroniza filtros da URL com a store e carrega produtos na montagem / mudança de filtros
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
    <Box className="space-y-6 animate-in fade-in duration-500">
      {/* Header Compacto */}
      {!isFormMode && (
        <Box className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Box>
            <h1 className="mb-2 text-3xl font-bold text-white">Produtos</h1>
            <p className="text-sm text-gray-400">
              Gerencie seu catálogo de produtos com visualizações e análises em tempo real
            </p>
          </Box>
          <Box className="flex items-center gap-3">
            <Button
              variant="outlined"
              onClick={() => loadProducts()}
              disabled={isLoading}
              className="border-gray-700 text-gray-300 transition-all hover:border-gray-600 hover:bg-gray-800/50"
            >
              Recarregar
            </Button>
            <Button
              variant="contained"
              disabled={isLoading}
              href={isFormMode ? '/products' : '/products?mode=form'}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-xl"
            >
              {isFormMode ? 'Voltar' : 'Novo produto'}
            </Button>
          </Box>
        </Box>
      )}

      {/* Tabs Elegantes */}
      {!isFormMode && (
        <Box className="border-b border-gray-800">
          <Tabs
            value={view}
            onChange={(_, newValue) => setView(newValue)}
            className="min-h-0"
            sx={{
              '& .MuiTab-root': {
                color: '#9ca3af',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '15px',
                minHeight: '48px',
                padding: '12px 24px',
                transition: 'all 0.2s ease',
                '&.Mui-selected': {
                  color: '#3b82f6',
                },
                '&:hover': {
                  color: '#d1d5db',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#3b82f6',
                height: '3px',
                borderRadius: '3px 3px 0 0',
              },
            }}
          >
            <Tab label="Dashboard" value="dashboard" />
            <Tab label="Lista" value="list" />
          </Tabs>
        </Box>
      )}

      {/* Filtros Integrados */}
      {!isFormMode && view === 'dashboard' && (
        <Box className="rounded-xl border border-gray-800 bg-gray-900/50 p-4 backdrop-blur-sm">
          <ProductsFilters isLoading={isLoading} />
        </Box>
      )}

      {/* Conteúdo */}
      {isFormMode ? (
        <Box className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm shadow-xl">
          <ProductForm />
        </Box>
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
                  <Divider className="my-8 border-gray-800" />
                  <ProductsCharts />
                </>
              ) : (
                <Box className="rounded-2xl border border-gray-800 bg-gray-900/30 p-6 backdrop-blur-sm">
                  <ProductsTable products={products} onDelete={removeProduct} />
                </Box>
              )}
            </>
          )}
        </>
      )}
    </Box>
  )
}
