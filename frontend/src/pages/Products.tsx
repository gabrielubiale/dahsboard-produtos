import { Button, Divider, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
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
  const [searchParams] = useSearchParams()

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
        Página principal de Produtos. Aqui conectamos filtros, lista, gráficos e formulário à store global
        e à API mock.
      </Typography>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Lista de produtos</Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => loadProducts()} disabled={isLoading}>
            Recarregar
          </Button>
          {/* Navegação simples para alternar entre lista e formulário via query string */}
          <Button
            variant="contained"
            disabled={isLoading}
            href={isFormMode ? '/products' : '/products?mode=form'}
          >
            {isFormMode ? 'Voltar para lista' : 'Novo produto'}
          </Button>
        </Stack>
      </Stack>

      <ProductsFilters isLoading={isLoading} />

      <Divider />

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
              <ProductsTable products={products} onDelete={removeProduct} />
              <ProductsCharts />
            </>
          )}
        </>
      )}

    </Stack>
  )
}

