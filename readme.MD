<p align="center">
  <h4 align="center">FoodBackEnd</h4>
</p>

## 💻 About:

O aplicativo desenvolvido é um cardápio digital para um restaurante conhecido como foodExplorer, onde é necessário se autenticar para entrar no aplicativo através da tela de login.

O Food Explorer tem duas pessoas: o administrador e o usuário;

O administrador é a pessoa responsável pelo restaurante, para que possa criar, visualizar e excluir um prato a qualquer momento. 

O usuário vê todos os pratos cadastrados e, ao clicar em um prato, é redirecionado para uma nova tela com informações mais detalhadas sobre ele.

Tanto o administrador quanto o usuário podem pesquisar pratos por nome.

Nesta aplicação, foram abordados os seguintes tópicos:


- [Node.js](https://nodejs.org/en/)
- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Express](https://expressjs.com)
- [Nodemon](https://nodemon.io/)
- [SQLite](https://www.sqlite.org/index.html)
- [Knex](https://knexjs.org/)
- [BCryptjs](https://www.npmjs.com/package/bcryptjs)
- [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken)
- [Multer](https://www.npmjs.com/package/multer)
- [CORS](https://www.npmjs.com/package/cors)
---

## Características

- [x] Um projeto estruturado, com uma boa organização de pastas, divisão de componentes no front-end, etc.
- [x] Um arquivo README.md com as especificações sobre como executar o projeto em um ambiente de desenvolvimento.
- [x] Os usuários precisarão se autenticar para entrar no aplicativo por meio da tela de login.
- [x] O administrador fará o upload de imagens para registrar os pratos.
- [x] Nomes significativos para funções e variáveis: Trabalhando um pouco com conceitos de Código Limpo.
- [x] Os dados do administrador, do restaurante e do usuário serão armazenados em um banco de dados.
- [x] Possibilidade de pesquisar o nome do prato.

---

## 🚀 Como executar o projeto.

### Pré requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:
[Node.js] (https://nodejs.org/en/). 
Além disso, é bom ter um editor para trabalhar com o código, como [VSCode](https://code.visualstudio.com/)

### 🚧 Executando o BackEnd (servidor)

```bash
# Baixe o repositório
$ https://github.com/Gabrielingnau/FoodBackEnd

# Abra seu VS CODE e, em seguida, abra a pasta Backend para abrir o projeto
$ cd FoodExplorer_BackEnd

# No BackEnd, insira uma PORT e uma SECRET no arquivo .env vazio
  AUTH_SECRET=
  PORT=

# Instale as dependências necessárias
$ npm i

# Agora inicie o servidor BackEnd
$ npm run dev

# O servidor iniciará na port: 3333 - vá para <http://localhost:3333>
```

---

## deploy do projeto.

Esse back-end foi hospedado diretamente no Render.
___
Nota: Por estar hospedado em um serviço gratuito, o BackEnd "hiberna" após 15 minutos sem uso.
<br>
Se você estiver tentando acessar o site e o BackEnd não responder, aguarde pois ele estará "inicializando" os serviços.
<br>
Essa etapa pode levar até 1 minuto, dependendo da carga nos servidores de renderização.

---
