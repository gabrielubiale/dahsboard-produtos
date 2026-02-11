// 10 produtos de tecnologia - categorias: Hardware, Software, Acessórios, Mobile
// Campos: id, name, category, price, status, createdAt, updatedAt

function isoDate(year, month, day) {
  return new Date(year, month - 1, day).toISOString()
}

const products = [
  {
    id: '1',
    name: 'Notebook Pro 14"',
    category: 'Hardware',
    price: 8999.9,
    status: 'active',
    createdAt: isoDate(2025, 1, 10),
    updatedAt: isoDate(2025, 2, 15),
  },
  {
    id: '2',
    name: 'Smartphone X Max',
    category: 'Mobile',
    price: 5999.9,
    status: 'active',
    createdAt: isoDate(2025, 1, 5),
    updatedAt: isoDate(2025, 3, 1),
  },
  {
    id: '3',
    name: 'Mouse Gamer RGB',
    category: 'Acessórios',
    price: 199.9,
    status: 'active',
    createdAt: isoDate(2025, 2, 1),
    updatedAt: isoDate(2025, 2, 20),
  },
  {
    id: '4',
    name: 'Assinatura Cloud Storage Pro',
    category: 'Software',
    price: 29.9,
    status: 'active',
    createdAt: isoDate(2025, 1, 15),
    updatedAt: isoDate(2025, 4, 10),
  },
  {
    id: '5',
    name: 'Teclado Mecânico ABNT',
    category: 'Acessórios',
    price: 499.9,
    status: 'active',
    createdAt: isoDate(2025, 1, 20),
    updatedAt: isoDate(2025, 3, 5),
  },
  {
    id: '6',
    name: 'Tablet Pro 12.9"',
    category: 'Mobile',
    price: 7499.9,
    status: 'inactive',
    createdAt: isoDate(2025, 2, 10),
    updatedAt: isoDate(2025, 4, 1),
  },
  {
    id: '7',
    name: 'App SaaS Gestão Empresarial',
    category: 'Software',
    price: 199.9,
    status: 'active',
    createdAt: isoDate(2025, 1, 8),
    updatedAt: isoDate(2025, 4, 5),
  },
  {
    id: '8',
    name: 'Monitor 4K 32"',
    category: 'Hardware',
    price: 3299.9,
    status: 'active',
    createdAt: isoDate(2025, 2, 15),
    updatedAt: isoDate(2025, 3, 20),
  },
  {
    id: '9',
    name: 'Hub USB-C 7 em 1',
    category: 'Acessórios',
    price: 349.9,
    status: 'active',
    createdAt: isoDate(2025, 3, 1),
    updatedAt: isoDate(2025, 3, 15),
  },
  {
    id: '10',
    name: 'Licença Antivírus Anual',
    category: 'Software',
    price: 89.9,
    status: 'inactive',
    createdAt: isoDate(2025, 1, 12),
    updatedAt: isoDate(2025, 2, 28),
  },
]

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8)
}

module.exports = {
  products,
  generateId,
}
