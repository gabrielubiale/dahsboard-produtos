const express = require('express')
const cors = require('cors')
const productsRoutes = require('./routes/products')
const salesRoutes = require('./routes/sales')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: 'http://localhost:5173',
}))

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Products API mock running' })
})

app.use('/products', productsRoutes)
app.use('/sales', salesRoutes)

app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err)
  res.status(500).json({ message: 'Internal server error' })
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API mock listening on http://localhost:${PORT}`)
})

