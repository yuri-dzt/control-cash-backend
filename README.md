# 🚀 Stack Base Backend

<div align="center">

![Node.js](https://img.shields.io/badge/node-%3E%3D18-green?style=for-the-badge&logo=node.js)
![TypeScript](https://img.shields.io/badge/typescript-5.9-blue?style=for-the-badge&logo=typescript)
![Express](https://img.shields.io/badge/express-5.x-lightgrey?style=for-the-badge&logo=express)
![Prisma](https://img.shields.io/badge/prisma-5.21.1-2D3748?style=for-the-badge&logo=prisma)
![MySQL](https://img.shields.io/badge/mysql-database-4479A1?style=for-the-badge&logo=mysql)
![Docker](https://img.shields.io/badge/docker-ready-2496ED?style=for-the-badge&logo=docker)

**Starter kit backend em Node.js + TypeScript para projetos escaláveis e testáveis**

[Características](#-características) •
[Instalação](#-instalação) •
[Uso](#️-uso) •
[Arquitetura](#-arquitetura) •
[Testes](#-testes)

</div>

---

## 🎯 Sobre o Projeto

Stack Base Backend é um **starter kit robusto** que elimina o tempo gasto configurando infraestrutura inicial, permitindo que você foque diretamente nas **regras de negócio** do seu projeto.

Construído com base em princípios sólidos de **Clean Architecture** e **Domain-Driven Design (DDD)**, este repositório oferece uma fundação profissional para APIs REST modernas.

### ✨ Características

- ✅ **Clean Architecture** - Separação clara de responsabilidades
- ✅ **Domain-Driven Design** - Foco nas regras de negócio
- ✅ **Type-Safe** - TypeScript em todo o projeto
- ✅ **ORM Moderno** - Prisma para manipulação de dados
- ✅ **Testes Automatizados** - Vitest configurado e pronto
- ✅ **Validação de Dados** - Zod para schemas robustos
- ✅ **Code Quality** - ESLint + Prettier configurados
- ✅ **Docker Ready** - Ambiente containerizado
- ✅ **API REST** - Express 5.x otimizado

---

## 🏗️ Arquitetura

O projeto segue princípios de **Clean Architecture**, garantindo baixo acoplamento e alta coesão:

```
src/
├── 📁 app/                    # Camada de Aplicação
│   └── use-cases/             # Casos de uso (regras de aplicação)
│       └── entidade/
│           └── caso-de-uso/
│               ├── input.ts   # DTOs de entrada
│               ├── error.ts   # Erros específicos
│               └── index.ts   # Implementação
│
├── 📁 contracts/              # Contratos (Interfaces)
│   ├── controllers/           # Interfaces de controllers
│   ├── dtos/                  # Data Transfer Objects
│   ├── enums/                 # Enumerações
│   ├── mappers/               # Interfaces de mapeamento
│   ├── repositories/          # Interfaces de repositórios
│   └── services/              # Interfaces de serviços
│
├── 📁 domain/                 # Camada de Domínio
│   └── entities/              # Entidades (regras de negócio puras)
│       └── entidade/
│           ├── enum.ts        # Enums da entidade
│           └── index.ts       # Classe da entidade
│
├── 📁 infra/                  # Camada de Infraestrutura
│   ├── controllers/           # Controladores HTTP
│   ├── factories/             # Factories (DI)
│   ├── middlewares/           # Middlewares Express
│   ├── repositories/          # Implementações dos repositórios
│   │   └── prisma/            # Repositórios com Prisma
│   ├── routes/                # Rotas da API
│   ├── schemas/               # Schemas Zod
│   ├── services/              # Serviços externos
│   ├── app.ts                 # Configuração Express
│   ├── logger.ts              # Sistema de logs
│   └── server.ts              # Inicialização do servidor
│
├── 📁 shared/                 # Código Compartilhado
│   └── prisma/
│       ├── client.ts          # Cliente Prisma
│       └── error.ts           # Tratamento de erros
│
└── 📁 tests/                  # Testes Automatizados
```

### 🧠 Princípios Aplicados

| Camada | Responsabilidade | Dependências |
|--------|------------------|--------------|
| **Domain** | Entidades e regras de negócio puras | Nenhuma |
| **Use Cases** | Orquestração de regras de aplicação | Domain + Contracts |
| **Contracts** | Definição de interfaces | Domain |
| **Infra** | Implementações técnicas | Contracts + Frameworks |
| **Shared** | Código reutilizável | Mínimas |

---

## 🛠️ Stack Tecnológica

<table>
<tr>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=nodejs" width="48" height="48" alt="Node.js" />
<br>Node.js
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=typescript" width="48" height="48" alt="TypeScript" />
<br>TypeScript
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=express" width="48" height="48" alt="Express" />
<br>Express
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=prisma" width="48" height="48" alt="Prisma" />
<br>Prisma
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=mysql" width="48" height="48" alt="MySQL" />
<br>MySQL
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=vitest" width="48" height="48" alt="Vitest" />
<br>Vitest
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=docker" width="48" height="48" alt="Docker" />
<br>Docker
</td>
</tr>
</table>

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** >= 18
- **pnpm** (recomendado) ou npm/yarn
- **MySQL** (local ou via Docker)

### Instalando pnpm

```bash
npm install -g pnpm
```

---

## 🚀 Instalação

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/yuri-dzt/stack-base-backend.git
cd stack-base-backend
```

### 2️⃣ Instale as dependências

```bash
pnpm install
```

### 3️⃣ Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/database"

# Server
PORT=3333

# Authentication
JWT_SECRET=supersecret
```

### 4️⃣ Configure o banco de dados

```bash
# Gerar o Prisma Client
pnpm exec prisma generate

# Rodar as migrations
pnpm exec prisma migrate dev
```

---

## ▶️ Uso

### Modo Desenvolvimento

```bash
pnpm dev
```

A API estará disponível em `http://localhost:3333`

### Build para Produção

```bash
pnpm build
pnpm start
```

### 🐳 Usando Docker

Suba o banco de dados MySQL com Docker Compose:

```bash
docker-compose up -d
```

---

## 🧪 Testes

Execute os testes automatizados:

```bash
# Rodar todos os testes
pnpm test

# Modo watch
pnpm test:watch

# Coverage
pnpm test:coverage
```

---

## 📝 Padrões e Boas Práticas

### ✅ Princípios Adotados

- **Use Cases** não conhecem frameworks
- **Controllers** apenas orquestram
- **Infra** depende de **Contracts**, nunca o contrário
- **Domínio** é totalmente isolado
- Cada entidade possui seus próprios casos de uso
- Injeção de dependência via **Factories**
- Validação de dados com **Zod**

### 📐 Convenções de Código

- **ESLint** para análise estática
- **Prettier** para formatação
- **Conventional Commits** para mensagens de commit
- **TypeScript strict mode** habilitado

---

## 🎯 Roadmap

- [ ] Autenticação JWT completa
- [ ] Sistema de Refresh Token
- [ ] Integração com Redis (Cache)
- [ ] Upload de arquivos

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Sinta-se à vontade para:

1. Fazer um Fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

---

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

<div align="center">
<img src="https://github.com/yuri-dzt.png" width="100px" style="border-radius: 50%;" alt="Yuri Donizete"/>

**Yuri Donizete**

*Software Developer • Backend Specialist • Clean Architecture Enthusiast*

[![GitHub](https://img.shields.io/badge/GitHub-yuri--dzt-181717?style=for-the-badge&logo=github)](https://github.com/yuri-dzt)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Yuri%20Donizete-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/yuri-donizete-58092b266/)
[![Email](https://img.shields.io/badge/Email-yuridonizete303%40gmail.com-EA4335?style=for-the-badge&logo=gmail)](mailto:yuridonizete303@gmail.com)

</div>

---

<div align="center">

**⭐ Se este projeto foi útil para você, considere dar uma estrela!**

Made with ❤️ and ☕ by Yuri Donizete

</div>