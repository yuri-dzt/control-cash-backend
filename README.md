# CONTROL CA$H — Mini ERP Financeiro SaaS
## 📌 Visão Geral

O **CONTROL CA$H** é um **mini ERP financeiro SaaS multi-tenant**, desenvolvido para ajudar empresas a controlarem **clientes, vendas, receitas e despesas** de forma simples, organizada e escalável.

O foco do produto é:

controle financeiro centralizado

simplicidade de uso

flexibilidade para diferentes tipos de negócio

arquitetura preparada para crescimento

O sistema foi projetado desde o início como um **produto SaaS vendável**, com separação clara entre o **domínio financeiro (ERP)** e o **domínio da plataforma (administração do SaaS)**.

---

## 🎯 Público-alvo

* Pequenas e médias empresas
* Prestadores de serviço
* Clínicas e consultórios
* Profissionais autônomos
* Microempreendedores (MEI)
* Times administrativos e financeiros

---

## 🏗️ Arquitetura

### Multi-tenant

O sistema utiliza o modelo **Shared Database + Tenant ID**, onde todas as entidades de negócio possuem o campo:

```
organization_id
```

Isso garante:

* isolamento de dados entre empresas
* fácil aplicação de Row Level Security (RLS)
* escalabilidade

---

### Separação de domínios

#### 🔹 Domínio do Produto (ERP Financeiro)

Responsável pelas funcionalidades utilizadas pelas empresas:

* clientes
* vendas
* receitas
* despesas
* recorrências
* usuários e permissões

#### 🔹 Domínio da Plataforma (SaaS)

Responsável pela gestão do SaaS:

* organizações
* planos
* operadores do sistema
* métricas globais

Esse domínio é operado por usuários especiais chamados **SystemOperators**.

---

## 🧩 Entidades do Sistema

🧑‍💻 **SystemOperator**

Usuários internos responsáveis por administrar a plataforma SaaS.

**Campos principais:**

* id
* name
* email
* password
* role (SUPER_ADMIN | SUPPORT)
* is_active
* created_at
* updated_at

---

### 🧾 Plan

Representa os planos comerciais do SaaS.

**Campos principais:**

* id
* name
* price
* is_active
* max_users
* max_contacts
* created_at
* updated_at

---

### 🏢 Organization

Representa uma empresa cliente da plataforma.

Cada organização possui seus próprios dados e usuários.

**Campos principais:**

* id
* plan_id
* name
* email
* is_active
* email_is_verified
* plan_started_at
* plan_expires_at?
* created_at
* updated_at

---

### 👤 User

Usuários pertencentes a uma organização.

**Campos principais:**

* id
* organization_id
* name
* email
* password
* is_active
* role (ADMIN | USER)
* created_at
* updated_at

**Relacionamentos:**

* permissions: UserPermission[]

---

### 🔐 Permission

Define ações permitidas em páginas do sistema.

**Campos principais:**

* id
* page_id
* action (CREATE | UPDATE | DELETE | VIEW)
* created_at
* updated_at

---

### 📄 Page

Representa páginas ou módulos do sistema.

**Campos principais:**

* id
* name
* route
* created_at
* updated_at

---

### 🔗 UserPermission

Relaciona usuários às permissões.

**Campos principais:**

* id
* user_id
* permission_id
* created_at
* updated_at

---

### 👥 Client

Representa clientes de uma organização.

**Campos principais:**

* id
* organization_id
* name
* email?
* document? (CPF | CNPJ)
* created_at
* updated_at

---

### 💰 Sale

Representa uma venda realizada para um cliente.

**Campos principais:**

* id
* organization_id
* client_id
* value
* description?
* created_at
* updated_at

**Relacionamentos:**

* revenues: Revenue[]

---

### 💵 Revenue

Representa receitas geradas a partir de vendas.

**Campos principais:**

* id
* organization_id
* sale_id
* value
* is_installment
* status (OPEN | PAID | OVERDUE)
* paid_at?
* billing_date
* payment_method (CASH | PIX | BOLETO | CREDIT_CARD)
* created_at
* updated_at

---

### 📉 Expense

Representa despesas da organização.

**Campos principais:**

* id
* organization_id
* recurring_expense_id?
* name
* description?
* value
* due_date
* paid_date?
* status (OPEN | PAID | OVERDUE)
* created_at
* updated_at

---

### 🔁 RecurringExpense

Representa despesas recorrentes.

Essas despesas geram automaticamente registros em Expense.

**Campos principais:**

* id
* organization_id
* name
* description?
* value
* due_date
* is_active
* created_at
* updated_at

---

### ⚙️ Regras de Negócio Principais

* Cada organização possui seus próprios dados financeiros.
* Uma venda pode gerar uma ou múltiplas receitas (parcelamento).
* Despesas podem ser:
  * pontuais (```Expense```)
  * recorrentes (```RecurringExpense```)
* O status financeiro é controlado pelo enum ```FinancialStatus```.
* O acesso ao sistema é controlado por:
  * papéis (```UserRole```)
  * permissões granulares (```Permission```).

---

### 📌 Status do Projeto

O CONTROL CA$H está em desenvolvimento ativo, começando por um MVP funcional e evoluindo de forma incremental, com foco em:

* controle financeiro básico
* multi-tenancy
* permissões e papéis
* estrutura SaaS

---

### 🚀 Objetivos do Projeto

* Servir como projeto de portfólio avançado
* Demonstrar boas práticas de:
  * modelagem de domínio
  * multi-tenancy
  * controle de permissões
  * organização de regras de negócio
  * escalabilidade