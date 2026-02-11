// 30 vendas - distribuídas em Jan, Fev, Mar, Abr 2025
// Campos: id, produtoId, data, quantidade, valorTotal
// valorTotal = quantidade × preço do produto

const { products } = require('./products')

function sale(id, produtoId, year, month, day, quantidade) {
  const product = products.find((p) => p.id === produtoId)
  const valorTotal = product ? Math.round(quantidade * product.price * 100) / 100 : 0
  return {
    id,
    produtoId,
    data: new Date(year, month - 1, day).toISOString(),
    quantidade,
    valorTotal,
  }
}

const sales = [
  // Janeiro 2025 (8 vendas)
  sale('s1', '1', 2025, 1, 3, 2),
  sale('s2', '2', 2025, 1, 7, 1),
  sale('s3', '4', 2025, 1, 10, 5),
  sale('s4', '3', 2025, 1, 15, 12),
  sale('s5', '7', 2025, 1, 18, 3),
  sale('s6', '5', 2025, 1, 22, 4),
  sale('s7', '1', 2025, 1, 25, 1),
  sale('s8', '8', 2025, 1, 28, 2),
  // Fevereiro 2025 (7 vendas)
  sale('s9', '2', 2025, 2, 2, 2),
  sale('s10', '4', 2025, 2, 5, 8),
  sale('s11', '3', 2025, 2, 10, 6),
  sale('s12', '5', 2025, 2, 14, 3),
  sale('s13', '1', 2025, 2, 18, 1),
  sale('s14', '9', 2025, 2, 22, 7),
  sale('s15', '7', 2025, 2, 26, 2),
  // Março 2025 (8 vendas)
  sale('s16', '1', 2025, 3, 3, 3),
  sale('s17', '8', 2025, 3, 6, 1),
  sale('s18', '2', 2025, 3, 11, 1),
  sale('s19', '3', 2025, 3, 15, 15),
  sale('s20', '5', 2025, 3, 19, 2),
  sale('s21', '4', 2025, 3, 22, 4),
  sale('s22', '7', 2025, 3, 25, 1),
  sale('s23', '9', 2025, 3, 28, 4),
  // Abril 2025 (7 vendas)
  sale('s24', '1', 2025, 4, 2, 2),
  sale('s25', '2', 2025, 4, 5, 2),
  sale('s26', '4', 2025, 4, 9, 6),
  sale('s27', '3', 2025, 4, 12, 8),
  sale('s28', '8', 2025, 4, 16, 3),
  sale('s29', '5', 2025, 4, 20, 5),
  sale('s30', '7', 2025, 4, 24, 4),
]

module.exports = { sales }
