# 🚀 Stack Base Backend

<div align="center">

![Node.js](https://img.shields.io/badge/node-%3E%3D18-green?style=for-the-badge&logo=node.js)
![TypeScript](https://img.shields.io/badge/typescript-5.9-blue?style=for-the-badge&logo=typescript)
![Express](https://img.shields.io/badge/express-5.x-lightgrey?style=for-the-badge&logo=express)
![Prisma](https://img.shields.io/badge/prisma-5.21.1-2D3748?style=for-the-badge&logo=prisma)
![MySQL](https://img.shields.io/badge/mysql-database-4479A1?style=for-the-badge&logo=mysql)
![Docker](https://img.shields.io/badge/docker-ready-2496ED?style=for-the-badge&logo=docker)

**Starter kit backend profissional em Node.js + TypeScript, pronto para começar seu projeto sem dor de cabeça.**

</div>

---

## 🎯 Por que usar este projeto?

- 🚀 **Pronto para produção**: Clean Architecture, DDD e testes já configurados  
- ⚡ **Economize tempo**: não perca horas configurando infraestrutura  
- 🛡 **Seguro e organizado**: TypeScript, ESLint, Prettier e validação com Zod  
- 🧪 **Testes inclusos**: Vitest configurado e pronto para rodar  
- 🐳 **Docker Ready**: banco de dados e ambiente isolados  
- 🔑 **Fácil de estender**: cada entidade tem seus próprios casos de uso  

---

## 🛠️ Tecnologias

- Node.js + TypeScript  
- Express 5.x  
- Prisma ORM (MySQL)  
- Vitest para testes  
- Zod para validação  
- ESLint + Prettier  
- Docker & Docker Compose (opcional)  
- JWT pronto para autenticação  

---

## ⚡ Começando

### 1️⃣ Instalar dependências
```bash
pnpm install
```

2️⃣ Configurar ambiente

Crie um arquivo .env baseado no .env.example:

```bash
DATABASE_URL="mysql://user:password@localhost:3306/database"
PORT=3333
JWT_SECRET=supersecret
```

Todas as variáveis serão carregadas automaticamente pelo Docker ou pelo Node.js.

3️⃣ Rodar a aplicação

Modo desenvolvimento:

```bash
pnpm dev
```
Build e start (produção):

```bash 
pnpm build
pnpm start
```

A API estará disponível na porta definida em PORT.

🐳 Docker (opcional)

```bash
docker-compose up -d
```

Banco MySQL isolado em container

Sem necessidade de instalar MySQL localmente

🧪 Testes

```bash
pnpm test       # Rodar todos os testes
pnpm test:watch # Modo watch
```

💡 Benefícios

Economiza dias de configuração

Estrutura pronta para escalar e manter

Permite focar no que realmente importa: suas regras de negócio

👨‍💻 Autor

Yuri Donizete – Backend Developer • Clean Architecture Enthusiast

GitHub: yuri-dzt

LinkedIn: Yuri Donizete

Email: yuridonizete303@gmail.com

