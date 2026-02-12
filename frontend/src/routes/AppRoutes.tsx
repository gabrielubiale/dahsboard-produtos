import { Route, Routes } from 'react-router-dom'
import { AppLayout } from '../shared/components/Layout/AppLayout'
import { Products } from '../pages/Products'
import { ProductsListPage } from '../pages/ProductsListPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/lista" element={<ProductsListPage />} />
        <Route path="/products/new" element={<Products />} />
        <Route path="/products/:id/edit" element={<Products />} />
      </Route>
    </Routes>
  )
}

