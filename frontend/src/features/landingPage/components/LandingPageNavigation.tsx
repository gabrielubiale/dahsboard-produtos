import { Link } from 'react-router-dom'
import { SquaresFour, Package } from 'phosphor-react'

const btnPrimary =
  'inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-xl'

const btnSecondary =
  'inline-flex items-center gap-2 border border-gray-600 text-gray-300 font-medium px-6 py-3 rounded-xl transition-all hover:border-blue-500 hover:text-blue-400 hover:bg-gray-800/50'

export function LandingPageNavigation() {
  return (
    <section className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <Link to="/products" className={btnPrimary}>
        <SquaresFour size={22} weight="fill" />
        Acessar Dashboard
      </Link>
      <Link to="/lista" className={btnSecondary}>
        <Package size={22} />
        Gerenciar Produtos
      </Link>
    </section>
  )
}
