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

  // permite que o front faça requisições (local, Vercel ou Railway)
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    /\.railway\.app$/,
    /\.vercel\.app$/,
    /^http:\/\/localhost(:\d+)?$/,
  ].filter(Boolean)

  app.use(
    cors({
      origin: (origin, cb) => {
        if (!origin) return cb(null, true)
        const ok = allowedOrigins.some((o) =>
          typeof o === 'string' ? o === origin : (o as RegExp).test(origin)
        )
        cb(null, ok)
      },
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
