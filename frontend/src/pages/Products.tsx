import { Stack, Typography } from '@mui/material'
import { ProductsCharts } from '../features/products/components/ProductsCharts'

// Page principal de Produtos.
// Regra: o nome do componente da page é o mesmo nome da pasta em `features` (Products <-> products).
export function Products() {
  return (
    <Stack spacing={4}>
      <Typography variant="h4" component="h1">
        Produtos
      </Typography>

      <Typography variant="body1" color="text.secondary">
        Esta é a página principal de Produtos. Nesta etapa ela funciona apenas como container,
        importando componentes de `features/products` (lista, filtros, gráficos, formulário, etc.)
        que serão implementados nas próximas fases.
      </Typography>

      {/* Exemplo inicial de uso de um componente da feature */}
      <ProductsCharts />
    </Stack>
  )
}

