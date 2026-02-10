import { Button, Box, Tabs, Tab } from '@mui/material'
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
    <Box className="space-y-6">
      {/* Header */}
      <Box className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <Box>
          <h1 className="text-3xl font-bold text-white mb-2">Produtos</h1>
          <p className="text-gray-400">
            Dashboard administrativo de gestão de produtos com gráficos para decisão, visão rápida e
            operação.
          </p>
        </Box>
        <Box className="flex items-center gap-3">
          <Button
            variant="outlined"
            onClick={() => loadProducts()}
            disabled={isLoading}
            className="border-gray-700 text-gray-300 hover:border-gray-600 hover:bg-gray-800"
          >
            Recarregar
          </Button>
          <Button
            variant="contained"
            disabled={isLoading}
            href={isFormMode ? '/products' : '/products?mode=form'}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isFormMode ? 'Voltar' : 'Novo produto'}
          </Button>
        </Box>
      </Box>

      {/* Tabs */}
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
                minHeight: '48px',
                '&.Mui-selected': {
                  color: '#3b82f6',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#3b82f6',
              },
            }}
          >
            <Tab label="Dashboard" value="dashboard" />
            <Tab label="Lista" value="list" />
          </Tabs>
        </Box>
      )}

      {/* Filtros */}
      {!isFormMode && view === 'dashboard' && (
        <Box className="rounded-xl border border-gray-800 bg-gray-900 p-4">
          <ProductsFilters isLoading={isLoading} />
        </Box>
      )}

      {/* Conteúdo */}
      {isFormMode ? (
        <Box className="rounded-xl border border-gray-800 bg-gray-900 p-6">
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
                  <ProductsCharts />
                </>
              ) : (
                <Box className="rounded-xl border border-gray-800 bg-gray-900 p-6">
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
