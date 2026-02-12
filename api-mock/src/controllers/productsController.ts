import type { Request, Response } from 'express'
import { products, generateId } from '../data/products'
import type { ProductStatus } from '../types'

// GET /products?search=&status=
export function listProducts(req: Request, res: Response) {
  const { search, status } = req.query

  let result = [...products]

  if (typeof search === 'string' && search.trim()) {
    const term = search.toLowerCase()
    result = result.filter((product) =>
      product.name.toLowerCase().includes(term),
    )
  }

  if (status === 'active' || status === 'inactive') {
    result = result.filter((product) => product.status === status)
  }

  res.json(result)
}

// GET /products/:id
export function getProduct(req: Request, res: Response) {
  const { id } = req.params
  const product = products.find((item) => item.id === id)

  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }

  return res.json(product)
}

// POST /products
export function createProductHandler(req: Request, res: Response) {
  const { name, category, price, status } = req.body as {
    name?: string
    category?: string
    price?: number
    status?: ProductStatus
  }

  if (!name || !category || typeof price !== 'number' || !status) {
    return res.status(400).json({ message: 'Invalid payload' })
  }

  if (status !== 'active' && status !== 'inactive') {
    return res.status(400).json({ message: 'Invalid status' })
  }

  const timestamp = new Date().toISOString()

  const product = {
    id: generateId(),
    name,
    category,
    price,
    status,
    createdAt: timestamp,
    updatedAt: timestamp,
  }

  products.push(product)

  return res.status(201).json(product)
}

// PUT /products/:id
export function updateProductHandler(req: Request, res: Response) {
  const { id } = req.params
  const index = products.findIndex((item) => item.id === id)

  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' })
  }

  const existing = products[index]
  const { name, category, price, status } = req.body as {
    name?: string
    category?: string
    price?: number
    status?: ProductStatus
  }

  if (status && status !== 'active' && status !== 'inactive') {
    return res.status(400).json({ message: 'Invalid status' })
  }

  const updated = {
    ...existing,
    ...(name !== undefined ? { name } : {}),
    ...(category !== undefined ? { category } : {}),
    ...(price !== undefined ? { price } : {}),
    ...(status !== undefined ? { status } : {}),
    updatedAt: new Date().toISOString(),
  }

  products[index] = updated

  return res.json(updated)
}

// DELETE /products/:id
export function deleteProductHandler(req: Request, res: Response) {
  const { id } = req.params
  const index = products.findIndex((item) => item.id === id)

  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' })
  }

  products.splice(index, 1)

  return res.status(204).send()
}

