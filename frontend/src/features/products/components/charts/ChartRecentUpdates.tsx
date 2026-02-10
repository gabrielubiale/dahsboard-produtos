import {
  Badge,
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
    <Card>
      <CardHeader
        title={
          <Typography variant="h6">
            Últimos produtos atualizados
            <Badge badgeContent={products.length} color="primary" sx={{ ml: 2 }} />
          </Typography>
        }
        subheader="Usa updatedAt - Ajuda a identificar atividade recente (operação)"
      />
      <CardContent>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Última atualização</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <Chip
                      label={product.status === 'active' ? 'Ativo' : 'Inativo'}
                      color={product.status === 'active' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" color="text.secondary">
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
