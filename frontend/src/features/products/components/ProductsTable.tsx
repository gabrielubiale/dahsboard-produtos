import {
  Box,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import type { Product } from '../../../services/types'

type ProductsTableProps = {
  products: Product[]
  onDelete: (id: string) => void
}

export function ProductsTable({ products, onDelete }: ProductsTableProps) {
  const navigate = useNavigate()

  if (!products.length) {
    return null
  }

  return (
    <TableContainer
      component={Paper}
      className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 shadow-xl backdrop-blur-sm"
      elevation={0}
    >
      <Table size="medium" className="min-w-[800px]">
        <TableHead>
          <TableRow className="border-b border-gray-800 bg-gray-900/80">
            <TableCell className="font-semibold text-gray-300">Nome</TableCell>
            <TableCell className="font-semibold text-gray-300">Categoria</TableCell>
            <TableCell align="right" className="font-semibold text-gray-300">
              Preço
            </TableCell>
            <TableCell className="font-semibold text-gray-300">Status</TableCell>
            <TableCell align="right" className="font-semibold text-gray-300">
              Ações
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <TableRow
              key={product.id}
              className={`
                border-b border-gray-800/50 transition-all duration-200
                hover:bg-gray-800/30
                ${index % 2 === 0 ? 'bg-gray-900/30' : 'bg-gray-900/50'}
              `}
              sx={{
                '&:hover': {
                  transform: 'translateX(4px)',
                  boxShadow: 'inset 4px 0 0 rgba(59, 130, 246, 0.5)',
                },
              }}
            >
              <TableCell>
                <Typography className="font-medium text-white">{product.name}</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-gray-400">{product.category}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography className="font-semibold text-white">
                  {product.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={product.status === 'active' ? 'Ativo' : 'Inativo'}
                  size="small"
                  className={`
                    font-semibold
                    ${product.status === 'active'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }
                  `}
                />
              </TableCell>
              <TableCell align="right">
                <Box className="flex items-center justify-end gap-1">
                  <Tooltip title="Editar" arrow>
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/products/${product.id}/edit`)}
                      className="text-blue-400 transition-all hover:bg-blue-500/20 hover:scale-110"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir" arrow>
                    <IconButton
                      size="small"
                      onClick={() => onDelete(product.id)}
                      className="text-red-400 transition-all hover:bg-red-500/20 hover:scale-110"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
