# 📁 Documentação de Arquitetura – Stack Base Backend

Este documento descreve **como o projeto está organizado**, **por que essa organização existe** e **quais regras devem ser seguidas** ao evoluir o código.

Ele serve como **manual técnico** para desenvolvedores que utilizam ou estendem o Stack Base Backend.

---

## 🎯 Objetivo da Arquitetura

A arquitetura deste projeto foi definida para:

* Separar regras de negócio de detalhes técnicos
* Facilitar testes e manutenção
* Evitar acoplamento entre camadas
* Garantir consistência entre diferentes projetos
* Servir como base escalável para sistemas reais

O projeto segue princípios de **Clean Architecture** e **DDD aplicado de forma pragmática**.

---

## 🧱 Visão Geral das Camadas

```
HTTP (Express)
  ↓
Controllers (infra)
  ↓
Use Cases (app)
  ↓
Repositories (contracts → infra)
  ↓
Database (Prisma / MySQL)
```

### Regras importantes

* O **domínio não conhece** Express, Prisma ou banco de dados
* Controllers **não possuem lógica de negócio**
* Casos de uso representam **ações do sistema**, não endpoints
* Infraestrutura pode ser substituída sem alterar o domínio

---

## 📂 Estrutura de Pastas

```
stack-base-backend/
│
├── src/
│   ├── app/
│   │   └── use-cases/
│   │       └── <entidade>/
│   │           ├── create/
│   │           │   ├── index.ts   # Lógica do caso de uso
│   │           │   ├── input.ts   # Tipagem e validação de entrada
│   │           │   └── error.ts   # Erros específicos
│   │           └── ...            # update, delete, etc
│   │
│   ├── domain/
│   │   └── entities/
│   │       └── <entidade>/
│   │           ├── index.ts       # Entidade e regras
│   │           └── enum.ts        # Enums do domínio
│   │
│   ├── contracts/
│   │   ├── controllers/           # Interfaces de controllers
│   │   ├── dtos/                  # DTOs de entrada/saída
│   │   ├── repositories/          # Interfaces de repositório
│   │   ├── services/              # Interfaces de serviços
│   │   ├── mappers/               # Mapeadores domínio ↔ DTO
│   │   └── enums/                 # Enums globais
│   │
│   ├── infra/
│   │   ├── controllers/           # Controllers Express
│   │   ├── routes/                # Rotas HTTP
│   │   ├── factories/             # Criação de dependências
│   │   ├── middlewares/            # Middlewares Express
│   │   ├── repositories/
│   │   │   └── prisma/             # Implementações Prisma
│   │   ├── schemas/                # Validações Zod por endpoint
│   │   ├── services/               # Serviços concretos
│   │   ├── app.ts                  # Configuração do Express
│   │   ├── server.ts               # Inicialização do servidor
│   │   └── logger.ts               # Logger centralizado
│   │
│   └── shared/
│       ├── prisma/                # Prisma Client
│       ├── types/                 # Tipagens globais
│       └── utils/                 # Utilitários compartilhados
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── tests/                          # Testes unitários e integração
├── Dockerfile
├── docker-compose.yml
├── README.md
├── docs.md
├── .env.example
└── .env
```

---

## 📌 Responsabilidade das Camadas

### `app/use-cases`

* Contém **toda a lógica de negócio**
* Cada pasta representa uma ação (ex: create, update)
* Não importa Express, Prisma ou HTTP

### `domain/entities`

* Define entidades e regras do domínio
* Independente de frameworks
* Pode conter validações de regra de negócio

### `contracts`

* Define **contratos do sistema**
* Interfaces de repositórios, serviços e controllers
* DTOs e mappers
* **Nunca contém lógica de negócio**

### `infra`

* Implementação técnica
* Controllers Express
* Repositórios Prisma
* Middlewares, rotas e serviços

### `shared`

* Código reutilizável entre módulos
* Prisma Client
* Tipagens globais
* Utilitários comuns

---

## 🔐 Autenticação, Sessões e Tokens

### Visão geral

O sistema utiliza um fluxo de autenticação baseado em **JWT + Refresh Token**, com controle de **sessões persistidas**.

### Conceitos

* **Access Token**

  * Curta duração
  * Enviado no header Authorization
  * Usado para proteger rotas

* **Refresh Token**

  * Longa duração
  * Persistido no banco de dados
  * Associado a uma sessão

* **Session**

  * Criada a cada login
  * Vincula usuário, refresh token e metadados
  * Permite múltiplos logins simultâneos

### Fluxo de login

```
Login →
  Cria sessão →
    Gera refresh token →
      Gera access token
```

### Fluxo de refresh

```
Access token expirado →
  Cliente envia refresh token →
    Valida sessão →
      Gera novo access token
```

### Logout

* Invalida a sessão
* Remove refresh token
* Access token expira naturalmente

---

## 🚫 Regras Arquiteturais (Obrigatórias)

* ❌ Controllers não devem conter regra de negócio
* ❌ Use-cases não conhecem Express
* ❌ Schemas Zod não substituem validações de domínio
* ❌ Entidades não dependem de infra

---

## 🧪 Testes

* Estrutura espelhada ao `src/`
* Testes unitários para use-cases
* Testes de integração para controllers e repositórios

---

## ✅ Checklist de Qualidade

* Casos de uso isolados
* Domínio independente
* Infra desacoplada
* Tipagem forte
* Validações explícitas
* Testes cobrindo regras críticas

---

## 🎁 Benefícios da Estrutura

* Facilita manutenção e evolução
* Reduz risco de regressões
* Acelera onboarding
* Ideal para projetos profissionais e produtos pagos

> Este documento define o padrão. Modificações são permitidas, desde que a consistência arquitetural seja mantida.
