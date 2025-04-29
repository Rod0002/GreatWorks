GreatWorks

Monorepositório para o projeto de e‑commerce de camisetas GreatWorks, unificando o Front‑End e o Back‑End.

📖 Descrição

Este repositório contém dois subprojetos:

Front‑End/: site estático (HTML/CSS/JS) que consome uma API para fluxo de carrinho e checkout Shopify.

Back‑End/: API RESTful em Node.js/Express com MySQL, para cadastro de usuários, autenticação JWT e gerenciamento de produtos.

O objetivo é entregar um MVP de loja de camisetas com integração ao Shopify Storefront API para checkout seguro.

📁 Estrutura

GreatWorks/
├── Front‑End/       # Código do cliente (site estático)
│   ├── src/pages/   # Páginas HTML (index, produtos, checkout, etc.)
│   ├── src/css/     # Arquivos de estilo (CSS)
│   ├── src/js/      # Lógica de carrinho e integração com API
│   └── public/      # Imagens e assets públicos
└── Back‑End/        # Código da API (Node.js + Express)
    ├── controllers/ # Controladores de rotas (usuários, produtos)
    ├── middleware/  # Middlewares (ex.: autenticação JWT)
    ├── models/      # Conexão e models do banco (MySQL)
    ├── routes/      # Definição de rotas REST
    ├── .gitignore
    ├── index.js     # Ponto de entrada do servidor
    └── README.md    # Documentação da API

🛠 Tecnologias

Camada

Tecnologias

Front‑End

HTML5, CSS3, JavaScript (ES6 modules), http-server

Back‑End

Node.js, Express, MySQL (mysql2), JWT, bcryptjs, dotenv, cors

Integração

Shopify Storefront API (GraphQL)

🚀 Pré‑requisitos

Node.js v16+ e npm

MySQL

Storefront Access Token Shopify (para checkout)

⚙️ Configuração

Clone este repositório

git clone https://github.com/Rod0002/GreatWorks.git
cd GreatWorks

Configure variáveis de ambiente

Back‑End: crie Back‑End/.env com:

DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=GreatWorks
PORT=3000
JWT_SECRET=um_segredo_forte

Front‑End: (opcional) crie Front‑End/src/js/config.js (não versionar):

export const SHOPIFY_DOMAIN    = "sua-loja.myshopify.com";
export const STOREFRONT_TOKEN = "seu_storefront_access_token";

Instale dependências do Back‑End

cd Back‑End
npm install

▶️ Como rodar

Back‑End

cd Back‑End
npm start    # ou node index.js

A API estará em http://localhost:3000.

Front‑End

Em outra janela de terminal:

cd Front‑End
npx http-server . -p 8000

Acesse http://localhost:8000/src/pages/index.html.

🧪 Testando o checkout

Adicione produtos ao carrinho no Front‑End.

Acesse a página de checkout: checkout.html.

Clique em Confirmar e Pagar.

Você será redirecionado ao checkout hospedado pela Shopify.

🤝 Contribuição

Pull‑requests são bem‑vindos! Para mudanças significativas, abra uma issue primeiro para discutirmos.

📄 Licença

Este projeto está sob a licença MIT. Veja Back‑End/LICENSE para detalhes.

