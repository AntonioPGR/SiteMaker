# SiteMaker

O **SiteMaker** é um projeto voltado ao **Maker Space do IFSULDEMINAS – Campus Poços de Caldas**.

O objetivo da aplicação é fornecer uma plataforma web para **organizar e controlar o laboratório**, centralizando suas informações e facilitando o gerenciamento de seus recursos, atividades e processos.

A arquitetura do sistema é dividida em duas aplicações principais:

* **Frontend:** desenvolvido utilizando Next.js, responsável pela interface e interação com os usuários.
* **Backend:** desenvolvido utilizando Spring Boot, responsável pela API, regras de negócio e comunicação com os dados da aplicação.

Essa separação permite que as camadas de apresentação e de processamento sejam desenvolvidas e mantidas de forma independente, facilitando a evolução e manutenção do sistema.


## Requisitos

Antes de executar o projeto, certifique-se de que as seguintes versões estão instaladas:

| Tecnologia | Versão    |
| ---------- | --------- |
| Node.js    | `24.18.1` |
| npm        | `12.0.2`  |
| Java       | `25.0.4`  |
| Maven      | `3.9.12`  |

Para verificar as versões instaladas:

```bash
node --version
npm --version
java --version
mvn --version
```

## Estrutura do projeto

```text
SiteMaker/
├── backend/
│   ├── pom.xml
│   └── src/
│
├── frontend/
│   ├── package.json
│   └── ...
│
└── README.md
```

## Instalação

### 1. Clonar o projeto

```bash
git clone <URL_DO_REPOSITORIO>
cd SiteMaker
```

### 2. Configurar o Backend

Entre no diretório do backend:

```bash
cd backend
```

Limpe os arquivos gerados anteriormente:

```bash
mvn clean
```

Instale as dependências e compile o projeto:

```bash
mvn install
```

Execute a aplicação Spring Boot:

```bash
mvn spring-boot:run
```

O backend será iniciado pelo Spring Boot.

### 3. Configurar o Frontend

Em outro terminal, volte para a raiz do projeto e entre no diretório do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm i
```

Execute o servidor de desenvolvimento:

```bash
npm run dev
```

O frontend estará disponível no endereço informado pelo Next.js no terminal.

## PostgreSQL, autenticação e áreas administrativas

O backend usa PostgreSQL. Para desenvolvimento local, `backend/compose.yaml`
inicia um PostgreSQL persistente usando as credenciais em `backend/.env`
(arquivo ignorado pelo Git). Inicie-o antes do backend:

```bash
cd backend
docker compose up -d postgres
./mvnw spring-boot:run
```

Para um PostgreSQL externo, configure `DATABASE_URL`, `DATABASE_USERNAME` e
`DATABASE_PASSWORD` no ambiente ou em `backend/.env`. Por padrão, a conexão
aponta para `jdbc:postgresql://localhost:5432/sitemaker`.
`spring.jpa.hibernate.ddl-auto=update` cria/atualiza as tabelas no ambiente local;
para produção, use migrações versionadas antes de desativar a atualização
automática do schema.

Exemplo para criar um banco e usuário locais no PostgreSQL (substitua a senha
por uma senha forte e use a mesma em `DATABASE_PASSWORD`):

```sql
CREATE USER sitemaker WITH PASSWORD 'replace-with-a-strong-database-password';
CREATE DATABASE sitemaker OWNER sitemaker;
```

O backend aceita o cadastro público de usuários comuns e emite JWTs no endpoint
`POST /api/auth/login`. O frontend envia o token nas chamadas protegidas. Usuários
comuns seguem para a página inicial; administradores seguem para `/admin`.

Para desenvolvimento local, o backend pode ler `backend/.env` (ignorado pelo Git).
O primeiro administrador é criado com `ADMIN_EMAIL` e `ADMIN_PASSWORD`; a senha
precisa ter pelo menos 12 caracteres. Esses segredos locais não são versionados.
Também é possível fornecer as variáveis no ambiente de execução:

```bash
ADMIN_EMAIL=admin@example.org ADMIN_PASSWORD='use-a-unique-long-password' ./mvnw spring-boot:run
```

O CRUD administrativo de máquinas está disponível em `/api/machines`, o de
agendamentos em `/api/agendamentos`, a gestão de usuários em `/api/users` e a
promoção a administrador em `PATCH /api/users/{id}/promote-to-admin`. O PDF
demonstrativo das normas está em `GET /api/normas/pdf`. Configure
`NEXT_PUBLIC_API_BASE_URL` no frontend somente quando a API estiver hospedada
fora de `http://localhost:8081/api`.
