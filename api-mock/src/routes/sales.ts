import { Router, type Request, type Response } from 'express'
import { sales } from '../data/sales'

export const salesRouter = Router()

salesRouter.get('/', (_req: Request, res: Response) => {
  res.json(sales)
})

