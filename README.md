# 🚀 Stack Base Backend

<div align="center">

![Node.js](https://img.shields.io/badge/node-%3E%3D18-green?style=for-the-badge\&logo=node.js)
![TypeScript](https://img.shields.io/badge/typescript-5.9-blue?style=for-the-badge\&logo=typescript)
![Express](https://img.shields.io/badge/express-5.x-lightgrey?style=for-the-badge\&logo=express)
![Prisma](https://img.shields.io/badge/prisma-5.21.1-2D3748?style=for-the-badge\&logo=prisma)
![MySQL](https://img.shields.io/badge/mysql-database-4479A1?style=for-the-badge\&logo=mysql)
![Docker](https://img.shields.io/badge/docker-ready-2496ED?style=for-the-badge\&logo=docker)

**Starter kit backend profissional, opinativo e escalável, baseado em Clean Architecture e DDD.**

</div>

---

## 📌 Visão geral

O **Stack Base Backend** é um *starter kit* para APIs em Node.js criado para servir como **fundação sólida** de projetos reais — SaaS, ERPs, backends para aplicações frontend modernas ou sistemas internos.

Ele foi pensado para desenvolvedores que:

* não querem começar do zero a cada projeto
* valorizam arquitetura, organização e testabilidade
* precisam de um código fácil de manter e evoluir

Este projeto **não é um CRUD genérico**. Ele entrega um padrão arquitetural claro e reutilizável.

---

## 🎯 Objetivos do projeto

* Padronizar a criação de novos backends
* Centralizar boas práticas de arquitetura
* Separar regras de negócio de detalhes técnicos
* Facilitar testes, manutenção e escalabilidade
* Servir como base profissional e material de referência

---

## 🧱 Arquitetura

O projeto segue os princípios de:

* **Clean Architecture**
* **DDD (Domain-Driven Design)** — aplicado de forma pragmática

### Princípios adotados

* O domínio **não depende** de frameworks
* Controllers são finos e sem regra de negócio
* Casos de uso representam ações do sistema
* Infraestrutura é facilmente substituível
* Dependências sempre apontam para o domínio

Fluxo simplificado:

```
HTTP → Controller → Use Case → Repository → Database
```

---

## 🛠️ Tecnologias

* **Node.js** 
* **TypeScript**
* **Express**
* **Prisma ORM**
* **MySQL**
* **JWT** para autenticação
* **Zod** para validação de dados
* **Vitest** para testes
* **ESLint + Prettier**
* **Docker & Docker Compose**

---

## 🔐 Autenticação

O Stack Base Backend possui um fluxo de autenticação completo baseado em:

- JWT (access token)
- Refresh token
- Controle de sessões
- Rotação de tokens
- Logout seguro

A implementação segue boas práticas de segurança e está documentada em detalhes no arquivo `docs.md`.

---

## 📁 Organização do código

A estrutura foi desenhada para deixar clara a responsabilidade de cada camada:

* `domain/` → entidades e regras centrais
* `app/use-cases/` → regras de negócio por operação
* `contracts/` → contratos, DTOs e interfaces
* `infra/` → Express, Prisma, rotas e serviços concretos
* `shared/` → código reutilizável e cross-cutting

A documentação completa da estrutura está disponível em **docs.md**.

---

## ⚡ Começando

### 1. Instalação

```bash
pnpm install
```

### 2. Variáveis de ambiente

Crie um `.env` baseado no `.env.example`:

```env
DATABASE_URL="mysql://user:password@localhost:3306/database"
PORT=3333
JWT_SECRET=supersecret
```

### 3. Executar o projeto

Modo desenvolvimento:

```bash
pnpm dev
```

Build e execução:

```bash
pnpm build
pnpm start
```

---

## 🐳 Docker (opcional)

```bash
docker-compose up -d
```

* MySQL isolado em container
* Sem necessidade de instalação local

---

## 🧪 Testes

```bash
pnpm test       # Executa todos os testes
pnpm test:watch # Modo watch
```

Os testes seguem a mesma organização do `src/`, cobrindo:

* casos de uso
* controllers
* repositórios

---

## ✅ Boas práticas aplicadas

* Controllers sem lógica de negócio
* Casos de uso isolados por ação
* Validações explícitas com Zod
* Erros específicos por contexto
* Tipagem forte ponta a ponta
* Infra desacoplada do domínio

---

## 📦 Quando usar este stack

* APIs REST profissionais
* SaaS multi-tenant
* ERPs e sistemas internos
* Backends para Next.js / React
* Projetos que precisam crescer sem retrabalho

---

## 👨‍💻 Autor

**Yuri Donizete**
Backend Developer • Clean Architecture Enthusiast

* GitHub: `yuri-dzt`
* LinkedIn: `Yuri Donizete`
* Email: `yuridonizete303@gmail.com`

---

> Este projeto é opinativo. Siga o padrão, adapte quando necessário e mantenha a consistência arquitetural.
