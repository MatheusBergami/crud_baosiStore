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

spring.datasource.url=jdbc:postgresql://localhost:5432/baozi
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA

O arquivo:

application-local.properties

deve permanecer apenas no ambiente local.

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