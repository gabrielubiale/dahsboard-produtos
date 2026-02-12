import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express'
import cors from 'cors'
import { productsRouter } from './routes/products'
import { salesRouter } from './routes/sales'

export function createApp() {
  const app = express()

  // permite que o front faça requisições rodando na porta 5173 evitando erro de cross-origin
  app.use(
    cors({
      origin: 'http://localhost:5173',
    }),
  )

  app.use(express.json())

  app.get('/', (_req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'Products API mock running' })
  })

  app.use('/products', productsRouter)
  app.use('/sales', salesRouter)

  app.use(
    (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
      console.error(err)
      res.status(500).json({ message: 'Internal server error' })
    },
  )

  return app
}
