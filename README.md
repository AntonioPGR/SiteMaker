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
