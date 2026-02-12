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

  // permite que o front faça requisições (local ou Vercel). FRONTEND_URL no Railway = URL do front (https://lively-solace-production-3892.up.railway.app/)
  const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173'
  app.use(
    cors({
      origin: allowedOrigin,
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
