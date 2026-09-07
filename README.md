# 🥟 Baozi Store

Sistema web para gerenciamento de produtos, clientes e pedidos.

O projeto foi desenvolvido utilizando uma arquitetura separada entre **backend e frontend**, com uma API REST construída em Spring Boot e uma interface web desenvolvida em React + TypeScript.

---

## 📋 Sobre o projeto

O **Baozi Store** é um sistema de gerenciamento de vendas que permite administrar:

- 👤 Clientes
- 📦 Produtos
- 🛒 Pedidos
- 📊 Dashboard com informações gerais do sistema

O projeto foi desenvolvido com foco na aplicação prática de conceitos de:

- Desenvolvimento de APIs REST
- Arquitetura em camadas
- Persistência de dados com JPA/Hibernate
- Relacionamentos entre entidades
- DTOs
- Tratamento global de exceções
- CRUD
- Consumo de APIs REST com React
- Arquitetura Feature-Based no frontend

---

## 🏗️ Arquitetura

O projeto está organizado como um monorepo contendo duas aplicações independentes:

```text
baozi/
│
├── baozi-front/          # Frontend
│
├── baozi-store/          # Backend
│
├── .gitignore
└── README.md
Backend

O backend segue uma arquitetura em camadas:

Controller
    ↓
Service
    ↓
Repository
    ↓
Database

Responsabilidades:

Controller → recebe as requisições HTTP
Service → contém as regras de negócio
Repository → comunicação com o banco de dados
Model → representa as entidades do sistema
DTO → define os dados de entrada e saída da API
Exception → tratamento de erros da aplicação
Frontend

O frontend utiliza uma arquitetura Feature-Based, onde cada funcionalidade possui seus próprios componentes, páginas, tipos e comunicação com a API.

Exemplo:

src/
│
├── components/
│
├── features/
│   ├── clientes/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── types/
│   │
│   ├── produtos/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── types/
│   │
│   └── pedidos/
│       ├── api/
│       ├── components/
│       ├── pages/
│       └── types/
│
└── ...
🚀 Tecnologias
Backend
Java 21
Spring Boot
Spring Web
Spring Data JPA
Hibernate
PostgreSQL
Maven
Frontend
React
TypeScript
Vite
React Router
Tailwind CSS
Fetch API
📦 Funcionalidades
👤 Clientes
Listar clientes
Buscar cliente por ID
Cadastrar cliente
Atualizar cliente
Excluir cliente
Pesquisar clientes pela interface
📦 Produtos
Listar produtos
Buscar produto por ID
Cadastrar produto
Atualizar produto
Excluir produto
Pesquisar produtos pela interface
🛒 Pedidos
Criar pedido
Listar pedidos
Buscar pedido por ID
Excluir pedido
Associar cliente ao pedido
Associar produto ao pedido
Definir quantidade de produtos
📊 Dashboard

O dashboard apresenta informações gerais do sistema, como:

Total de clientes
Total de produtos
Total de pedidos
Valor total dos pedidos
Pedidos recentes
🔗 Relacionamento entre as entidades

O sistema possui três entidades principais:

Cliente
   │
   │ 1:N
   ▼
Pedido
   ▲
   │ N:1
   │
Produto

Um cliente pode possuir vários pedidos.

Um produto pode estar associado a vários pedidos.

Cada pedido pertence a um cliente e possui um produto.

🌐 API REST

A API disponibiliza os seguintes recursos:

Clientes
GET    /clientes
GET    /clientes/{id}
POST   /clientes
PUT    /clientes/{id}
DELETE /clientes/{id}
Produtos
GET    /produtos
GET    /produtos/{id}
POST   /produtos
PUT    /produtos/{id}
DELETE /produtos/{id}
Pedidos
GET    /pedidos
GET    /pedidos/{id}
POST   /pedidos
PUT    /pedidos/{id}
DELETE /pedidos/{id}
🗃️ Banco de dados

O projeto utiliza PostgreSQL.

As entidades principais são:

cliente
produto
pedido

O Hibernate/JPA é responsável pelo mapeamento objeto-relacional.

Exemplo:

@Entity
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private BigDecimal preco;
}
🔐 Configuração do banco

As credenciais do banco não devem ser versionadas no Git.

O projeto utiliza um arquivo local:

baozi-store/src/main/resources/application-local.properties

Esse arquivo está incluído no .gitignore.

Exemplo:

spring.datasource.url=jdbc:mysql://localhost:3306/baozi_store
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA

O arquivo:

application-local.properties

deve permanecer apenas no ambiente local.

## 🐳 Execução com Docker

O arquivo `compose.yaml` inicia a aplicação completa em três contêineres:

- `database`: MySQL 8.4, publicado em `localhost:3307` e acessível internamente como `database:3306`;
- `backend`: API Spring Boot executada com Java 21 e o perfil `docker`, publicada em `localhost:8080`;
- `frontend`: aplicação React compilada com Node e servida pelo Nginx em `localhost:5173`.

O frontend envia as chamadas iniciadas por `/api` ao Nginx. O Nginx encaminha essas chamadas ao backend pela rede interna do Docker, sem depender de `localhost` entre os contêineres.

### Arquivos da implementação

- `compose.yaml`: conecta MySQL, backend e frontend;
- `.env.example`: modelo das variáveis necessárias;
- `baozi-store/Dockerfile`: compila o backend e cria a imagem final com Java 21;
- `baozi-store/src/main/resources/application-docker.properties`: configura banco e JWT no perfil Docker;
- `baozi-front/Dockerfile`: compila o React e cria a imagem final com Nginx;
- `baozi-front/nginx.conf`: serve o frontend, suporta as rotas do React e encaminha `/api` ao backend;
- `.dockerignore`: evita enviar dependências, builds locais e arquivos sensíveis para as imagens.

### Pré-requisitos

- Docker Desktop instalado e em execução;
- portas `5173`, `8080` e `3307` disponíveis.

Se uma porta estiver ocupada, altere apenas sua porta externa no `.env`. A porta interna do MySQL deve continuar sendo `3306`.

### Configuração do `.env`

Na raiz do projeto, crie o arquivo local a partir do modelo:

```powershell
Copy-Item .env.example .env
```

Revise no `.env`:

- `MYSQL_DATABASE`: nome do banco;
- `MYSQL_USER`: usuário usado pelo backend;
- `MYSQL_PASSWORD`: senha do usuário da aplicação;
- `MYSQL_ROOT_PASSWORD`: senha administrativa do MySQL;
- `MYSQL_PORT`: porta do MySQL no Windows, configurada como `3307` para não conflitar com uma instalação local na porta `3306`;
- `JWT_SECRET`: chave de assinatura dos tokens, com pelo menos 32 caracteres;
- `BACKEND_PORT` e `FRONTEND_PORT`: portas publicadas pela aplicação.

O `.env` contém credenciais e está ignorado pelo Git. Somente o `.env.example` deve ser versionado. Troque as senhas de exemplo antes de usar a aplicação fora do ambiente local.

### Primeira inicialização

Construa as imagens e inicie os serviços:

```powershell
docker compose --env-file .env up -d --build
```

Na primeira execução, o Docker baixa as imagens-base, compila o backend e o frontend e cria o volume persistente do MySQL. Esse processo pode levar alguns minutos.

Confira o estado:

```powershell
docker compose --env-file .env ps
```

O serviço `database` deve aparecer como `healthy`, e `backend` e `frontend` devem aparecer como `Up`.

Depois, acesse:

- frontend: `http://localhost:5173`;
- backend: `http://localhost:8080`.

### Inicializações seguintes

Se o código e os Dockerfiles não mudaram, não é necessário fazer o build novamente:

```powershell
docker compose --env-file .env up -d
```

Use `--build` novamente quando alterar código-fonte, dependências, Dockerfiles ou arquivos usados durante a construção das imagens:

```powershell
docker compose --env-file .env up -d --build
```

### Logs e diagnóstico

Para acompanhar todos os serviços:

```powershell
docker compose --env-file .env logs -f
```

Para conferir somente o backend:

```powershell
docker compose --env-file .env logs --tail 100 backend
```

Se o frontend abrir, mas o login retornar erro `502`, confira se o backend está reiniciando:

```powershell
docker compose --env-file .env ps
```

#### Erro de senha do MySQL

O MySQL aplica `MYSQL_USER`, `MYSQL_PASSWORD` e `MYSQL_ROOT_PASSWORD` somente quando o volume é criado pela primeira vez. Alterar essas variáveis no `.env` depois disso não modifica automaticamente os usuários que já existem no banco.

O sintoma mais comum no backend é:

```text
Access denied for user 'baozi'
```

Para preservar os dados, restaure no `.env` as credenciais usadas quando o volume foi criado e recrie apenas os contêineres:

```powershell
docker compose --env-file .env up -d --force-recreate
```

Se não houver dados importantes e você quiser inicializar um banco novo com as credenciais atuais do `.env`, remova o volume e suba os serviços novamente:

```powershell
docker compose --env-file .env down -v
docker compose --env-file .env up -d
```

**Atenção:** `down -v` apaga definitivamente todos os dados do MySQL armazenados pelo Docker.

### Pausar, retomar e encerrar

Para pausar e retomar sem remover os contêineres:

```powershell
docker compose --env-file .env stop
docker compose --env-file .env start
```

Para remover os contêineres e preservar o banco:

```powershell
docker compose --env-file .env down
```

O banco permanece no volume nomeado `mysql_data`. Não acrescente `-v` ao comando quando quiser preservar os dados.

⚙️ Como executar o backend

Entre na pasta:

cd baozi-store

Execute:

./mvnw spring-boot:run

No Windows:

mvnw.cmd spring-boot:run

O backend será iniciado na porta padrão:

http://localhost:8080
💻 Como executar o frontend

Entre na pasta:

cd baozi-front

Instale as dependências:

npm install

Execute o projeto:

npm run dev

O Vite disponibilizará a aplicação em um endereço semelhante a:

http://localhost:5173
🔄 Comunicação Frontend → Backend

O frontend realiza requisições HTTP para a API utilizando a Fetch API.

Exemplo:

const response = await fetch(`${API_URL}/produtos`);

if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
}

const produtos = await response.json();

A comunicação segue o fluxo:

React
  │
  │ HTTP / JSON
  ▼
Spring Boot
  │
  ▼
Controller
  │
  ▼
Service
  │
  ▼
Repository
  │
  ▼
PostgreSQL
📁 Estrutura geral
baozi/
│
├── .gitignore
├── README.md
│
├── baozi-front/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   │   ├── clientes/
│   │   │   ├── produtos/
│   │   │   └── pedidos/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
└── baozi-store/
    │
    ├── src/
    │   ├── main/
    │   │   ├── java/
    │   │   │   └── com/baozi/baozi_store/
    │   │   │       ├── config/
    │   │   │       ├── controller/
    │   │   │       ├── dto/
    │   │   │       ├── exception/
    │   │   │       ├── model/
    │   │   │       ├── repository/
    │   │   │       └── service/
    │   │   │
    │   │   └── resources/
    │   │       ├── application.properties
    │   │       └── application-local.properties
    │   │
    │   └── test/
    │
    ├── pom.xml
    └── mvnw
🎯 Objetivos do projeto

O projeto tem como objetivo colocar em prática conceitos fundamentais do desenvolvimento de aplicações web modernas, incluindo:

Criação de APIs REST
Desenvolvimento com Spring Boot
Persistência com JPA/Hibernate
Modelagem de relacionamentos
Padrão DTO
Arquitetura em camadas
Tratamento de exceções
Desenvolvimento de interfaces com React
TypeScript
Consumo de APIs
CRUD completo
Separação entre frontend e backend
📌 Status

🚧 Em desenvolvimento

Funcionalidades principais do CRUD:

 CRUD de Clientes
 CRUD de Produtos
 CRUD de Pedidos
 Relacionamentos JPA
 DTOs
 Tratamento de exceções
 API REST
 Frontend React
 Dashboard
 Modal/Formulários
 Melhorias de validação
 Testes automatizados
 Deploy
👨‍💻 Autor

Projeto desenvolvido como parte dos estudos em desenvolvimento web, utilizando Java/Spring Boot no backend e React/TypeScript no frontend.
