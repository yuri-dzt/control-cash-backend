# Mini CRM SaaS

## 📌 Visão Geral

Este projeto é um **Mini CRM SaaS multi-tenant**, desenvolvido para atender micro e pequenas empresas que precisam organizar **leads, clientes, atividades e pipeline de vendas** de forma simples, flexível e escalável.

O foco do produto é:

* simplicidade de uso
* alta personalização por empresa
* arquitetura preparada para crescimento

O sistema foi pensado desde o início como um **produto vendável**, com separação clara entre **domínio do cliente (CRM)** e **domínio da plataforma (administração do SaaS)**.

---

## 🎯 Público-alvo

* Pequenas empresas
* Clínicas e consultórios
* Profissionais autônomos
* Times de vendas pequenos
* Agências e prestadores de serviço

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

#### 🔹 Domínio do Produto (CRM)

Responsável pelas funcionalidades usadas pelos clientes:

* organizações
* usuários
* contatos
* pipeline
* atividades

#### 🔹 Domínio da Plataforma (SaaS)

Responsável pela administração do sistema:

* controle de organizações
* planos
* métricas globais
* suporte

Esse domínio é operado por usuários especiais chamados **SystemOperators**.

---

## 🧩 Entidades do Sistema

### 🧾 Plan

Representa os planos comerciais do SaaS.

**Campos principais:**

* id
* name
* price
* is_active
* created_at
* updated_at

---

### 🏢 Organization

Representa uma empresa cliente da plataforma.

Cada organização possui seus próprios dados, usuários e configurações.

**Campos principais:**

* id
* plan_id
* name
* email
* is_active
* email_is_verified
* created_at
* updated_at

---

### 👤 User

Usuário pertencente a uma organização.

**Campos principais:**

* id
* organization_id
* name
* email
* role (ADMIN | USER)
* created_at
* updated_at

---

### 🏷️ Tag

Tags criadas por uma organização para classificar contatos.

**Campos principais:**

* id
* organization_id
* name
* color
* created_at
* updated_at

---

### 🔗 Taggable

Entidade de ligação entre tags e contatos.

**Campos principais:**

* id
* organization_id
* tag_id
* contact_id
* created_at
* updated_at

---

### 🔄 Pipeline

Representa um funil de vendas.

Cada organização pode criar múltiplos pipelines, separados por tipo de contato.

**Campos principais:**

* id
* organization_id
* name
* contact_type (LEAD | CLIENT)
* is_default
* is_active
* created_at
* updated_at

---

### 📍 PipelineStage

Estágios de um pipeline.

**Campos principais:**

* id
* organization_id
* pipeline_id
* name
* position
* color
* is_initial
* is_final
* is_active
* created_at
* updated_at

---

### 👥 Contact

Entidade central do sistema.

Leads e clientes são representados por uma única entidade, diferenciados pelo campo `type`.

**Campos principais:**

* id
* organization_id
* type (LEAD | CLIENT)
* contact_status_id
* pipeline_id?
* pipeline_stage_id?
* origin_id?
* name
* email
* phone
* assigned_to_user_id?
* created_at
* updated_at

**Regras de negócio:**

* contatos do tipo LEAD participam de pipelines
* contatos do tipo CLIENT não participam de pipelines
* conversão de lead para cliente é feita alterando o campo `type`

---

### 🟢 ContactStatus

Status customizáveis definidos por organização.

**Campos principais:**

* id
* organization_id
* applies_to (LEAD | CLIENT)
* name
* color
* created_at
* updated_at

---

### 📞 Activity

Representa tarefas e interações relacionadas a um contato.

**Campos principais:**

* id
* organization_id
* contact_id
* activity_type_id
* activity_status_id
* due_date
* completed_at?
* assigned_to_user_id
* created_at
* updated_at

---

### 🧩 ActivityType

Tipos de atividades configuráveis por organização.

Exemplos:

* ligação
* reunião
* WhatsApp

**Campos principais:**

* id
* organization_id
* name
* created_at
* updated_at

---

### 🚦 ActivityStatus

Status possíveis para uma atividade.

Exemplos:

* pending
* done
* canceled

**Campos principais:**

* id
* organization_id
* name
* created_at
* updated_at

---

### 🕓 PipelineStageHistory

Histórico de movimentação dos contatos no pipeline.

Permite auditoria e análise de funil.

**Campos principais:**

* id
* organization_id
* contact_id
* contact_type
* from_stage_id
* to_stage_id
* changed_by_user_id
* changed_at
* created_at
* updated_at

---

## 🛠️ Domínio da Plataforma

### 🧑‍💻 SystemOperator

Usuários internos responsáveis por operar e administrar o SaaS.

**Características:**

* não pertencem a nenhuma organization
* possuem acesso global
* operam dashboards administrativos

**Exemplos de responsabilidades:**

* ativar/desativar organizações
* alterar planos
* visualizar métricas globais
* suporte aos clientes

---

## 🚀 Objetivos do Projeto

* Servir como **projeto de portfólio avançado**
* Ser uma base realista para um **produto SaaS vendável**
* Demonstrar boas práticas de:

  * modelagem de domínio
  * multi-tenancy
  * escalabilidade
  * separação de responsabilidades

---

## 📌 Status

O projeto está em desenvolvimento ativo e foi planejado para evoluir incrementalmente, começando por um MVP funcional e expandindo conforme validação do produto.

---

## 📄 Licença

Projeto de uso educacional e profissional. A licença final poderá ser definida conforme o modelo de distribuição escolhido.
