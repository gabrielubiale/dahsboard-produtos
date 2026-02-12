import { createApp } from './app'

// createApp é uma função que monta o servidor. app é um objeto express para uso
const app = createApp()
const PORT = process.env.PORT || 3001

// listen é um método do objeto express para iniciar o servidor. PORT é a porta que o servidor irá rodar.
app.listen(PORT, () => {
  console.log(`API mock listening on http://localhost:${PORT}`)
})

