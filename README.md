# Projeto BlogApp API com NodeJS, MongoDB, Handlebars e Bootstrap. #

Link hospedado: https://blogapp-sumita.herokuapp.com/

O Projeto BlogApp é uma API desenvolvida na linguagem JavaScript utilizando a plataforma e recursos do NodeJS,
utilizando também os frameworks como Handlebars, Bootstrap e banco de dados MongoDB.

Finalidade: Criar e listar categorias e postagens através de requisições http, trabalhando com Handlebars e Bootstrap para montar o front e Mongoose para manipular o banco de dados MongoDB.


Necessário:
* Possuir o NodeJS instalado na maquina, link: https://nodejs.org/en/download/
* Possuir o MongoDB instalado na maquina, link: https://www.youtube.com/watch?v=XlvR0_AECoI&list=PLJ_KhUnlXUPtbtLwaxxUxHqvcNQndmI4B&index=28
* Baixar o projeto no link do GitHub: https://github.com/DouglasSumita/BlogApp
* Após baixado, acessar a pasta do projeto BlogApp na linha de comando do NodeJS e instalar os pacotes com comando: "npm install"
* Iniciar serviço da Api com comando: "npm start"
* Se tudo ocorreu bem ira apresentar mensagem na linha de comando do node: "Servidor rodando!" e "Conectado ao MongoDB com sucesso".

Links para acessar via Browser local: 

Pagina Inicial: http://localhost:8081/

Usuarios:
   * Login: /login
   * Logout: /logout
   * Registrar Usuario: /registro


Categorias: 
   * Listar: /categorias
   * Editar: /categorias/editar/:id
   * Deletar: /categorias/deletar/:id

Postagens: 
   * Listar: /postagens
   * Editar: /postagens/editar/:id
   * Deletar: /postagens/deletar/:id
   * Postagem Específica: /postagem/:slug

*  Para acessar as rotas Editar/Criar/Deletar Categorias e Postagens sera necessário cadastrar o usuário como Administrador marcando o checkbox "Administrador" na opção "Registrar-se".
