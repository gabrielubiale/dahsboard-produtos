// esse arquivo organiza rotas definindo caminhos e associandos eles à função resposável por executar a ação
// quando houver ma requisição para tal endereço é usando tal método

import { Router } from 'express'
import { PRODUCTS_ENDPOINTS } from './routes'
import {
  listProducts,
  getProduct,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from '../controllers/productsController'

export const productsRouter = Router()

productsRouter.get(PRODUCTS_ENDPOINTS.base, listProducts)
productsRouter.get(PRODUCTS_ENDPOINTS.byId, getProduct)
productsRouter.post(PRODUCTS_ENDPOINTS.base, createProductHandler)
productsRouter.put(PRODUCTS_ENDPOINTS.byId, updateProductHandler)
productsRouter.delete(PRODUCTS_ENDPOINTS.byId, deleteProductHandler)
