import {
  Badge,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import type { Product } from '../../../../services/types'

type ChartRecentUpdatesProps = {
  products: Product[]
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMinutes = Math.floor(diffMs / (1000 * 60))

  if (diffDays > 0) {
    return `${diffDays} ${diffDays === 1 ? 'dia' : 'dias'} atrás`
  }
  if (diffHours > 0) {
    return `${diffHours} ${diffHours === 1 ? 'hora' : 'horas'} atrás`
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} ${diffMinutes === 1 ? 'minuto' : 'minutos'} atrás`
  }
  return 'Agora'
}

export function ChartRecentUpdates({ products }: ChartRecentUpdatesProps) {
  return (
    <Card className="overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/90 to-gray-800/90 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-gray-700 hover:shadow-2xl">
      <CardHeader
        className="border-b border-gray-800/50 bg-gray-900/50"
        title={
          <Box className="flex items-center gap-2">
            <Typography variant="h6" className="font-semibold text-white">
              Últimos produtos atualizados
            </Typography>
            <Badge badgeContent={products.length} color="primary" />
          </Box>
        }
        subheader={
          <Typography variant="body2" className="text-gray-400">
            Usa updatedAt - Ajuda a identificar atividade recente (operação)
          </Typography>
        }
      />
      <CardContent className="p-6">
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow className="border-gray-800">
                <TableCell className="text-gray-400 font-semibold">Nome</TableCell>
                <TableCell className="text-gray-400 font-semibold">Categoria</TableCell>
                <TableCell className="text-gray-400 font-semibold">Status</TableCell>
                <TableCell align="right" className="text-gray-400 font-semibold">
                  Última atualização
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} hover className="border-gray-800">
                  <TableCell className="text-white">{product.name}</TableCell>
                  <TableCell className="text-gray-300">{product.category}</TableCell>
                  <TableCell>
                    <Chip
                      label={product.status === 'active' ? 'Ativo' : 'Inativo'}
                      color={product.status === 'active' ? 'success' : 'error'}
                      size="small"
                      className="font-medium"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" className="text-gray-400">
                      {formatRelativeTime(product.updatedAt)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}
