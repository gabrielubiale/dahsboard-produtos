import { Button, Divider, Stack, Tabs, Tab, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProductsStore } from '../store/productsStore'
import { ProductsFilters } from '../features/products/components/ProductsFilters'
import { ProductsTable } from '../features/products/components/ProductsTable'
import { ProductsCharts } from '../features/products/components/ProductsCharts'
import { ProductForm } from '../features/products/components/ProductForm'
import { Loader } from '../shared/components/Loader'
import { ErrorMessage } from '../shared/components/ErrorMessage'
import { EmptyState } from '../shared/components/EmptyState'

// Page principal de Produtos.
// Regra: o nome do componente da page é o mesmo nome da pasta em `features` (Products <-> products).
export function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
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
    <Stack spacing={4}>
      <Typography variant="h4" component="h1">
        Produtos
      </Typography>

      <Typography variant="body1" color="text.secondary">
        Dashboard administrativo de gestão de produtos com gráficos para decisão, visão rápida e operação.
      </Typography>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Tabs value={view} onChange={(_, newValue) => setView(newValue)}>
          <Tab label="Dashboard" value="dashboard" />
          <Tab label="Lista" value="list" />
        </Tabs>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => loadProducts()} disabled={isLoading}>
            Recarregar
          </Button>
          <Button
            variant="contained"
            disabled={isLoading}
            href={isFormMode ? '/products' : '/products?mode=form'}
          >
            {isFormMode ? 'Voltar' : 'Novo produto'}
          </Button>
        </Stack>
      </Stack>

      {!isFormMode && (
        <>
          <ProductsFilters isLoading={isLoading} />
          <Divider />
        </>
      )}

      {isFormMode ? (
        <ProductForm />
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
                <ProductsCharts />
              ) : (
                <ProductsTable products={products} onDelete={removeProduct} />
              )}
            </>
          )}
        </>
      )}

    </Stack>
  )
}

