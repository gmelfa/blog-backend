# Blog Pessoal Backend

Este é o backend do projeto Blog Pessoal, desenvolvido em Node.js com Express e Sequelize.

## Funcionalidades

- CRUD completo para usuários e posts
- Autenticação de usuários com JWT
- Senhas criptografadas com bcrypt
- Banco de dados SQLite para armazenamento

## Tecnologias Utilizadas

- Node.js
- Express
- Sequelize
- SQLite
- bcrypt
- JSON Web Token (JWT)

## Como Rodar o Projeto

1. Clone o repositório
2. Instale as dependências com `npm install`
3. Execute o servidor com `node src/index.js`
4. Use ferramentas como Postman para testar as rotas

## Rotas Principais

- `/users` - Gerenciamento de usuários (GET, POST, PUT, DELETE)
- `/posts` - Gerenciamento de posts (GET, POST, PUT, DELETE)
- `/auth/login` - Autenticação de usuários

## Estrutura do Projeto

blog-backend/
├── src/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── config/
│ ├── app.js
│ └── index.js
├── package.json
└── .gitignore