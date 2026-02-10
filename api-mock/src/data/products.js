// Dados em memória simulando o serviço de produtos.
// Deve respeitar o tipo Product definido no frontend:
// {
//   id: string;
//   name: string;
//   category: string;
//   price: number;
//   status: 'active' | 'inactive';
//   createdAt: string;
//   updatedAt: string;
// }

const now = () => new Date().toISOString()

/** @type {import('./types').Product[]} (comentário apenas para referência; types reais estão no frontend) */
const products = [
  {
    id: '1',
    name: 'Notebook Pro 14"',
    category: 'Eletrônicos',
    price: 8999.9,
    status: 'active',
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: '2',
    name: 'Cadeira Ergonômica Office',
    category: 'Móveis',
    price: 1299.9,
    status: 'active',
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: '3',
    name: 'Mouse Gamer RGB',
    category: 'Acessórios',
    price: 199.9,
    status: 'inactive',
    createdAt: now(),
    updatedAt: now(),
  },
]

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8)
}

module.exports = {
  products,
  generateId,
}

