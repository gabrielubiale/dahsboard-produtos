// arquivo onde configura-se as rotas para ser usada com os métodos http
// garante que cada trecho de código tenha uma responsabilidade

export const PRODUCTS_BASE = '/' as const
export const SALES_BASE = '/sales' as const

export const PRODUCTS_ENDPOINTS = {
  base: PRODUCTS_BASE,
  byId: `${PRODUCTS_BASE}:id`,
} as const
