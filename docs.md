documentacao_estrutura: |
  # 📁 Documentação da Estrutura – Stack Base Backend

  Este documento descreve detalhadamente a estrutura do projeto **Stack Base Backend**, explicando onde cada parte do código deve estar e como funciona. Ideal para desenvolvedores que compram o kit starter e querem entender rapidamente a arquitetura.

  ---

  ## Estrutura de Pastas

stack-base-backend/
│
├── src/
│ ├── app/
│ │ └── use-cases/
│ │ └── <entidade>/
│ │ ├── create/
│ │ │ ├── error.ts # Erros específicos do caso de uso
│ │ │ ├── index.ts # Lógica principal do caso de uso
│ │ │ └── input.ts # Validações de entrada (Zod)
│ │ └── ... # update, delete etc.
│ │
│ ├── contracts/
│ │ ├── controllers/ # Interfaces dos controllers
│ │ │ └── controller.ts
│ │ ├── dtos/ # DTOs de entrada/saída
│ │ │ └── entidade.ts
│ │ ├── enums/ # Enums globais
│ │ │ └── enum.ts
│ │ ├── mappers/ # Funções de mapeamento
│ │ │ └── entidade.ts
│ │ ├── repositories/ # Interfaces de repositório
│ │ │ └── entidade.ts
│ │ └── services/ # Interfaces de serviços
│ │ └── serviço.ts
│ │
│ ├── domain/
│ │ └── entities/
│ │ └── <entidade>/
│ │ ├── enum.ts
│ │ └── index.ts
│ │
│ ├── infra/
│ │ ├── controllers/
│ │ │ └── <entidade>/
│ │ │ ├── create.ts
│ │ │ ├── delete.ts
│ │ │ └── ...
│ │ ├── factories/
│ │ │ └── <entidade>/
│ │ │ ├── create.ts
│ │ │ └── delete.ts
│ │ ├── middlewares/
│ │ │ └── middleware.ts
│ │ ├── repositories/
│ │ │ └── prisma/
│ │ │ └── entidade.ts
│ │ ├── routes/
│ │ │ └── entidade.ts
│ │ ├── schemas/
│ │ │ └── <entidade>/
│ │ │ ├── create.ts
│ │ │ └── delete.ts
│ │ ├── services/
│ │ │ └── serviço.ts
│ │ ├── app.ts
│ │ ├── logger.ts
│ │ └── server.ts
│ │
│ └── shared/
│ ├── prisma/
│ │ ├── client.ts
│ │ └── error.ts
│ ├── types/
│ │ └── express/
│ │ └── index.d.ts
│ └── account.ts
│
├── prisma/
│ ├── migrations/
│ └── schema.prisma
│
├── tests/ # Testes unitários e integração
├── docker-compose.yml
├── Dockerfile
├── README.md
├── .env
└── .env.example


---

## Explicação das Pastas

### `src/app/use-cases`
- Contém **a lógica de negócio** de cada entidade.
- Cada operação (create, update, delete) tem:
  - input.ts → validação de entrada com Zod
  - error.ts → erros específicos do caso de uso
  - index.ts → execução do caso de uso
- Mantém a lógica independente de frameworks ou banco de dados.

### `src/contracts`
- Define **interfaces e contratos** do sistema.
- Inclui:
  - controllers/ → assinaturas de controllers
  - dtos/ → DTOs de entrada/saída
  - enums/ → enums globais
  - mappers/ → funções de mapeamento
  - repositories/ → interfaces de repositórios
  - services/ → interfaces de serviços

### `src/domain/entities`
- Contém **entidades do domínio**, independentes de tecnologia.
- Exemplo: User, Product, com enums e propriedades.

### `src/infra`
- Camada de **implementação tecnológica**:
  - controllers/ → controllers Express
  - factories/ → fábricas para criar instâncias
  - middlewares/ → middlewares Express
  - repositories/prisma/ → repositórios concretos usando Prisma
  - routes/ → rotas Express
  - schemas/ → validações Zod
  - services/ → serviços concretos
  - app.ts → inicialização do app
  - server.ts → start do servidor
  - logger.ts → logging

### `src/shared`
- Código **compartilhado entre módulos**:
  - Prisma client e erros
  - Tipagens Express customizadas
  - Utils gerais (`account.ts`)

### `prisma/`
- schema.prisma → modelo do banco
- migrations/ → histórico de migrations

### `__tests__/`
- Testes unitários e de integração, organizados seguindo a mesma estrutura do `src/`.

### Arquivos principais
- .env e .env.example → variáveis de ambiente
- Dockerfile e docker-compose.yml → setup Docker
- README.md → documentação principal

---

## Fluxo da aplicação

1. **Rotas** → `infra/routes/*.ts`  
2. **Controllers** → recebem requisições HTTP e chamam **use-cases**  
3. **Use-cases** → executam a lógica de negócio (`app/use-cases`)  
4. **Repositórios** → acessam o banco via Prisma (`infra/repositories/prisma`)  
5. **Retorno** → Controllers enviam resposta ao cliente

---

## Boas práticas

- Separação clara entre **domínio** e **infraestrutura**
- Cada entidade possui **casos de uso isolados**
- shared/ - centraliza tipos, validações e utilitários
- Testes seguem a mesma estrutura para fácil manutenção
- Validações Zod por operação, dentro de `schemas/`

-----------------------------------------------------

🔹 Explicação das Pastas (detalhado)
src/app/use-cases

Contém casos de uso específicos por entidade

Cada operação (create, update, delete) possui:

index.ts → lógica do caso de uso
input.ts → interface do que será recebido
error.ts → erros específicos

src/domain/entities

Contém entidades do domínio

Independentes de frameworks

Cada entidade tem:

enum.ts → enums da entidade
index.ts → definição da entidade e propriedades

src/contracts

Contém interfaces e contratos

Mantém padronização entre controllers, DTOs, repositórios e serviços

src/infra

Implementação tecnológica:

Controllers Express finos, chamando casos de uso

Factories → criam instâncias

Middlewares Express

Repositórios Prisma

Schemas Zod → validação de dados de entrada nos endpoints

App.ts e server.ts → inicialização do servidor

Logger.ts → logging centralizado

src/shared

Tipos e utilitários compartilhados

Prisma client

Custom typings Express

Arquivo account.ts com tipos gerais

Prisma

schema.prisma → modelo do banco

migrations/ → histórico de migrações

Testes

Seguem a mesma estrutura do src/

Unitários e integração

Cobrem use-cases, controllers e repositórios

🔹 Checklist de Boas Práticas
Use-cases

Cada operação isolada em sua pasta

input.ts apenas interface

error.ts apenas erros específicos

index.ts → lógica de negócio pura

Domain

Entidades independentes de infra

Enum separado

Contracts

Sem lógica de negócio

Apenas DTOs, interfaces e tipos

Infra

Controllers finos

Schemas Zod só para validação

Repositórios acessam Prisma

Factories isolam criação de instâncias

Logger centralizado

Middlewares reutilizáveis

Shared

Centraliza tipos, utils, Prisma client

Evita duplicação de código

Testes

Seguir estrutura src/

Cobrir todos os casos de uso

Testar controllers isoladamente

🔹 Benefícios desta Estrutura

Separação clara entre domínio e infraestrutura

Facilita escalabilidade

Código testável e tipado

Facilita onboarding de novos desenvolvedores

Ideal para entregar como material premium do kit starter