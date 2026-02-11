# Dashboard de Produtos

Projeto do desafio técnico de dashboard administrativo de produtos em React + TypeScript, utilizando Zustand para gerenciamento de estado, Tailwind CSS, MUI e Chart.js, com mock de API em Node + Express.

Estrutura principal:
- **frontend**: aplicação React (Vite + TS).
- **api-mock**: API mock em Node para `/products` e `/sales`.

## Como rodar

O frontend consome a API em `http://localhost:3001`. É preciso ter a API rodando antes (ou subir os dois juntos):

**Opção 1 – Tudo de uma vez (recomendado)**  
Na raiz do projeto:
```bash
npm install
npm run dev
```
Isso sobe a API (porta 3001) e o frontend (Vite, normalmente porta 5173).

**Opção 2 – Em terminais separados**  
1. Terminal 1 – API: `cd api-mock && npm start`  
2. Terminal 2 – Frontend: `cd frontend && npm run dev`

Consulte os READMEs em `frontend` e `api-mock` para mais detalhes.
