import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import type { ProductStatus } from '../../../services/types'
import { useProductsStore } from '../../../store/productsStore'

const STATUS_OPTIONS: { value: ProductStatus; label: string }[] = [
  { value: 'active', label: 'Ativo' },
  { value: 'inactive', label: 'Inativo' },
]

export function ProductForm() {
  const navigate = useNavigate()
  const params = useParams()
  const id = params.id

  const {
    selectedProduct,
    isLoading,
    loadProductById,
    createProduct,
    updateProduct,
  } = useProductsStore()

  const isEditMode = Boolean(id)

  useEffect(() => {
    if (isEditMode && id) {
      // carga inicial do produto para edição
      void loadProductById(id)
    }
  }, [id, isEditMode, loadProductById])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '')
    const category = String(formData.get('category') ?? '')
    const price = Number(formData.get('price') ?? 0)
    const status = formData.get('status') as ProductStatus

    if (!name || !category || !price || !status) {
      // validação simples por enquanto
      return
    }

    if (isEditMode && id) {
      await updateProduct(id, {
        name,
        category,
        price,
        status,
      })
    } else {
      await createProduct({
        name,
        category,
        price,
        status,
      })
    }

    navigate('/products')
  }

  const defaultName = selectedProduct?.name ?? ''
  const defaultCategory = selectedProduct?.category ?? ''
  const defaultPrice = selectedProduct?.price?.toString() ?? ''
  const defaultStatus = selectedProduct?.status ?? 'active'

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <Typography variant="h6">
          {isEditMode ? 'Editar produto' : 'Novo produto'}
        </Typography>

        <TextField
          name="name"
          label="Nome"
          defaultValue={defaultName}
          required
          disabled={isLoading}
        />

        <TextField
          name="category"
          label="Categoria"
          defaultValue={defaultCategory}
          required
          disabled={isLoading}
        />

        <TextField
          name="price"
          label="Preço"
          type="number"
          defaultValue={defaultPrice}
          required
          inputProps={{ min: 0, step: 0.01 }}
          disabled={isLoading}
        />

        <TextField
          name="status"
          label="Status"
          select
          defaultValue={defaultStatus}
          required
          disabled={isLoading}
        >
          {STATUS_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            type="button"
            variant="outlined"
            onClick={() => navigate('/products')}
            disabled={isLoading}
          >
            Cancelar
          </Button>

          <Button type="submit" variant="contained" disabled={isLoading}>
            {isEditMode ? 'Salvar alterações' : 'Criar produto'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

