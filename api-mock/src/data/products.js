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

// Helper para gerar datas no passado
function monthsAgo(months) {
  const date = new Date()
  date.setMonth(date.getMonth() - months)
  return date.toISOString()
}

// Helper para gerar data atualizada (pode ser igual ou até 2 meses depois do createdAt)
function updatedAtFromCreated(createdAt, maxMonthsAfter = 2) {
  const created = new Date(createdAt)
  const monthsAfter = Math.floor(Math.random() * (maxMonthsAfter + 1))
  created.setMonth(created.getMonth() + monthsAfter)
  return created.toISOString()
}

/** @type {import('./types').Product[]} (comentário apenas para referência; types reais estão no frontend) */
const products = [
  // Eletrônicos (8-10 produtos, preços altos: R$ 1.000 - R$ 10.000)
  {
    id: '1',
    name: 'Notebook Pro 14"',
    category: 'Eletrônicos',
    price: 8999.9,
    status: 'active',
    createdAt: monthsAgo(2),
    updatedAt: updatedAtFromCreated(monthsAgo(2)),
  },
  {
    id: '2',
    name: 'Smartphone X Max',
    category: 'Eletrônicos',
    price: 5999.9,
    status: 'active',
    createdAt: monthsAgo(1),
    updatedAt: updatedAtFromCreated(monthsAgo(1)),
  },
  {
    id: '3',
    name: 'Tablet Pro 12.9"',
    category: 'Eletrônicos',
    price: 7499.9,
    status: 'active',
    createdAt: monthsAgo(3),
    updatedAt: updatedAtFromCreated(monthsAgo(3)),
  },
  {
    id: '4',
    name: 'Monitor 4K 32"',
    category: 'Eletrônicos',
    price: 3299.9,
    status: 'active',
    createdAt: monthsAgo(4),
    updatedAt: updatedAtFromCreated(monthsAgo(4)),
  },
  {
    id: '5',
    name: 'Smart TV 55" OLED',
    category: 'Eletrônicos',
    price: 8999.9,
    status: 'active',
    createdAt: monthsAgo(5),
    updatedAt: updatedAtFromCreated(monthsAgo(5)),
  },
  {
    id: '6',
    name: 'Notebook Gamer RTX 4060',
    category: 'Eletrônicos',
    price: 10999.9,
    status: 'active',
    createdAt: monthsAgo(6),
    updatedAt: updatedAtFromCreated(monthsAgo(6)),
  },
  {
    id: '7',
    name: 'Smartwatch Pro',
    category: 'Eletrônicos',
    price: 2499.9,
    status: 'inactive',
    createdAt: monthsAgo(8),
    updatedAt: updatedAtFromCreated(monthsAgo(8)),
  },
  {
    id: '8',
    name: 'Fone Bluetooth Noise Cancelling',
    category: 'Eletrônicos',
    price: 1299.9,
    status: 'inactive',
    createdAt: monthsAgo(10),
    updatedAt: updatedAtFromCreated(monthsAgo(10)),
  },
  {
    id: '9',
    name: 'Câmera Mirrorless 4K',
    category: 'Eletrônicos',
    price: 7999.9,
    status: 'active',
    createdAt: monthsAgo(1),
    updatedAt: updatedAtFromCreated(monthsAgo(1)),
  },
  {
    id: '10',
    name: 'Console de Videogame',
    category: 'Eletrônicos',
    price: 4499.9,
    status: 'active',
    createdAt: monthsAgo(2),
    updatedAt: updatedAtFromCreated(monthsAgo(2)),
  },

  // Móveis (6-8 produtos, preços médios: R$ 500 - R$ 3.000)
  {
    id: '11',
    name: 'Cadeira Ergonômica Office',
    category: 'Móveis',
    price: 1299.9,
    status: 'active',
    createdAt: monthsAgo(3),
    updatedAt: updatedAtFromCreated(monthsAgo(3)),
  },
  {
    id: '12',
    name: 'Mesa de Escritório em L',
    category: 'Móveis',
    price: 1899.9,
    status: 'active',
    createdAt: monthsAgo(4),
    updatedAt: updatedAtFromCreated(monthsAgo(4)),
  },
  {
    id: '13',
    name: 'Estante Modular',
    category: 'Móveis',
    price: 799.9,
    status: 'inactive',
    createdAt: monthsAgo(7),
    updatedAt: updatedAtFromCreated(monthsAgo(7)),
  },
  {
    id: '14',
    name: 'Sofá Retrátil 3 Lugares',
    category: 'Móveis',
    price: 2999.9,
    status: 'active',
    createdAt: monthsAgo(5),
    updatedAt: updatedAtFromCreated(monthsAgo(5)),
  },
  {
    id: '15',
    name: 'Cama Box Casal',
    category: 'Móveis',
    price: 2499.9,
    status: 'active',
    createdAt: monthsAgo(6),
    updatedAt: updatedAtFromCreated(monthsAgo(6)),
  },
  {
    id: '16',
    name: 'Rack para TV 55"',
    category: 'Móveis',
    price: 899.9,
    status: 'active',
    createdAt: monthsAgo(2),
    updatedAt: updatedAtFromCreated(monthsAgo(2)),
  },
  {
    id: '17',
    name: 'Guarda-Roupa 6 Portas',
    category: 'Móveis',
    price: 1999.9,
    status: 'inactive',
    createdAt: monthsAgo(9),
    updatedAt: updatedAtFromCreated(monthsAgo(9)),
  },
  {
    id: '18',
    name: 'Mesa de Jantar 6 Lugares',
    category: 'Móveis',
    price: 1799.9,
    status: 'active',
    createdAt: monthsAgo(3),
    updatedAt: updatedAtFromCreated(monthsAgo(3)),
  },

  // Acessórios (8-10 produtos, preços baixos: R$ 50 - R$ 500)
  {
    id: '19',
    name: 'Mouse Gamer RGB',
    category: 'Acessórios',
    price: 199.9,
    status: 'inactive',
    createdAt: monthsAgo(8),
    updatedAt: updatedAtFromCreated(monthsAgo(8)),
  },
  {
    id: '20',
    name: 'Teclado Mecânico ABNT',
    category: 'Acessórios',
    price: 499.9,
    status: 'active',
    createdAt: monthsAgo(2),
    updatedAt: updatedAtFromCreated(monthsAgo(2)),
  },
  {
    id: '21',
    name: 'Hub USB-C 7 em 1',
    category: 'Acessórios',
    price: 349.9,
    status: 'inactive',
    createdAt: monthsAgo(6),
    updatedAt: updatedAtFromCreated(monthsAgo(6)),
  },
  {
    id: '22',
    name: 'Webcam Full HD',
    category: 'Acessórios',
    price: 399.9,
    status: 'active',
    createdAt: monthsAgo(1),
    updatedAt: updatedAtFromCreated(monthsAgo(1)),
  },
  {
    id: '23',
    name: 'Carregador Wireless',
    category: 'Acessórios',
    price: 149.9,
    status: 'active',
    createdAt: monthsAgo(3),
    updatedAt: updatedAtFromCreated(monthsAgo(3)),
  },
  {
    id: '24',
    name: 'Cabo HDMI 2.1 3m',
    category: 'Acessórios',
    price: 89.9,
    status: 'active',
    createdAt: monthsAgo(4),
    updatedAt: updatedAtFromCreated(monthsAgo(4)),
  },
  {
    id: '25',
    name: 'Suporte para Monitor',
    category: 'Acessórios',
    price: 299.9,
    status: 'active',
    createdAt: monthsAgo(2),
    updatedAt: updatedAtFromCreated(monthsAgo(2)),
  },
  {
    id: '26',
    name: 'Pasta para Notebook 15"',
    category: 'Acessórios',
    price: 179.9,
    status: 'inactive',
    createdAt: monthsAgo(7),
    updatedAt: updatedAtFromCreated(monthsAgo(7)),
  },
  {
    id: '27',
    name: 'Mousepad Grande',
    category: 'Acessórios',
    price: 79.9,
    status: 'active',
    createdAt: monthsAgo(1),
    updatedAt: updatedAtFromCreated(monthsAgo(1)),
  },
  {
    id: '28',
    name: 'Adaptador USB-C para HDMI',
    category: 'Acessórios',
    price: 129.9,
    status: 'active',
    createdAt: monthsAgo(5),
    updatedAt: updatedAtFromCreated(monthsAgo(5)),
  },

  // Vestuário (5-6 produtos, preços baixos/médios: R$ 80 - R$ 400)
  {
    id: '29',
    name: 'Camiseta Tech Dry-fit',
    category: 'Vestuário',
    price: 89.9,
    status: 'active',
    createdAt: monthsAgo(2),
    updatedAt: updatedAtFromCreated(monthsAgo(2)),
  },
  {
    id: '30',
    name: 'Jaqueta Corta-Vento',
    category: 'Vestuário',
    price: 249.9,
    status: 'inactive',
    createdAt: monthsAgo(5),
    updatedAt: updatedAtFromCreated(monthsAgo(5)),
  },
  {
    id: '31',
    name: 'Tênis Esportivo',
    category: 'Vestuário',
    price: 399.9,
    status: 'active',
    createdAt: monthsAgo(3),
    updatedAt: updatedAtFromCreated(monthsAgo(3)),
  },
  {
    id: '32',
    name: 'Moletom com Capuz',
    category: 'Vestuário',
    price: 179.9,
    status: 'active',
    createdAt: monthsAgo(4),
    updatedAt: updatedAtFromCreated(monthsAgo(4)),
  },
  {
    id: '33',
    name: 'Calça Jeans Slim',
    category: 'Vestuário',
    price: 199.9,
    status: 'active',
    createdAt: monthsAgo(1),
    updatedAt: updatedAtFromCreated(monthsAgo(1)),
  },
  {
    id: '34',
    name: 'Boné Aba Reta',
    category: 'Vestuário',
    price: 79.9,
    status: 'inactive',
    createdAt: monthsAgo(6),
    updatedAt: updatedAtFromCreated(monthsAgo(6)),
  },

  // Escritório (6-8 produtos, preços baixos: R$ 50 - R$ 300)
  {
    id: '35',
    name: 'Kit Canetas Premium',
    category: 'Escritório',
    price: 59.9,
    status: 'active',
    createdAt: monthsAgo(1),
    updatedAt: updatedAtFromCreated(monthsAgo(1)),
  },
  {
    id: '36',
    name: 'Organizador de Mesa',
    category: 'Escritório',
    price: 129.9,
    status: 'active',
    createdAt: monthsAgo(2),
    updatedAt: updatedAtFromCreated(monthsAgo(2)),
  },
  {
    id: '37',
    name: 'Caderno Inteligente A5',
    category: 'Escritório',
    price: 79.9,
    status: 'inactive',
    createdAt: monthsAgo(8),
    updatedAt: updatedAtFromCreated(monthsAgo(8)),
  },
  {
    id: '38',
    name: 'Agenda Executiva 2026',
    category: 'Escritório',
    price: 149.9,
    status: 'active',
    createdAt: monthsAgo(3),
    updatedAt: updatedAtFromCreated(monthsAgo(3)),
  },
  {
    id: '39',
    name: 'Porta-Canetas Premium',
    category: 'Escritório',
    price: 89.9,
    status: 'active',
    createdAt: monthsAgo(4),
    updatedAt: updatedAtFromCreated(monthsAgo(4)),
  },
  {
    id: '40',
    name: 'Bloco de Notas A4',
    category: 'Escritório',
    price: 49.9,
    status: 'active',
    createdAt: monthsAgo(5),
    updatedAt: updatedAtFromCreated(monthsAgo(5)),
  },
  {
    id: '41',
    name: 'Calculadora Científica',
    category: 'Escritório',
    price: 199.9,
    status: 'active',
    createdAt: monthsAgo(2),
    updatedAt: updatedAtFromCreated(monthsAgo(2)),
  },
  {
    id: '42',
    name: 'Grampeador Profissional',
    category: 'Escritório',
    price: 69.9,
    status: 'inactive',
    createdAt: monthsAgo(7),
    updatedAt: updatedAtFromCreated(monthsAgo(7)),
  },

  // Casa (5-6 produtos, preços médios: R$ 200 - R$ 1.500)
  {
    id: '43',
    name: 'Aspirador de Pó Robô',
    category: 'Casa',
    price: 1499.9,
    status: 'active',
    createdAt: monthsAgo(2),
    updatedAt: updatedAtFromCreated(monthsAgo(2)),
  },
  {
    id: '44',
    name: 'Cafeteira Expresso',
    category: 'Casa',
    price: 899.9,
    status: 'active',
    createdAt: monthsAgo(3),
    updatedAt: updatedAtFromCreated(monthsAgo(3)),
  },
  {
    id: '45',
    name: 'Jogo de Panelas Antiaderente',
    category: 'Casa',
    price: 599.9,
    status: 'active',
    createdAt: monthsAgo(4),
    updatedAt: updatedAtFromCreated(monthsAgo(4)),
  },
  {
    id: '46',
    name: 'Liquidificador 1000W',
    category: 'Casa',
    price: 399.9,
    status: 'inactive',
    createdAt: monthsAgo(6),
    updatedAt: updatedAtFromCreated(monthsAgo(6)),
  },
  {
    id: '47',
    name: 'Ferro de Passar Vapor',
    category: 'Casa',
    price: 299.9,
    status: 'active',
    createdAt: monthsAgo(1),
    updatedAt: updatedAtFromCreated(monthsAgo(1)),
  },
  {
    id: '48',
    name: 'Kit Toalhas de Banho',
    category: 'Casa',
    price: 249.9,
    status: 'active',
    createdAt: monthsAgo(5),
    updatedAt: updatedAtFromCreated(monthsAgo(5)),
  },
]

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8)
}

module.exports = {
  products,
  generateId,
}
