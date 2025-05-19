# MiniCRUD App

> Um CRUD simples de usuários em React + Vite + TypeScript, com formulários em Formik/Yup, estilização em Bootstrap e testes em Jest/Cypress.

---

## 📦 Instalação / Início rápido

**Pré-requisitos**

- Node.js v16+
- npm ou yarn

```bash
# 1) Clone o repositório
git clone https://github.com/henriquexaud/miniCRUD.git
cd miniCRUD

# 2) Instale as dependências
npm install
# ou
yarn

# 3) Rode em modo desenvolvedor
npm run dev
# abre http://localhost:5173 por padrão
```

---

## 🛠️ Scripts úteis

| Comando                 | Descrição                                            |
| ----------------------- | ---------------------------------------------------- |
| `npm run dev`           | Inicia o servidor Vite em modo desenvolvimento       |
| `npm run build`         | Compila TypeScript e gera build de produção (Vite)   |
| `npm run preview`       | Pré-visualiza o build de produção (Vite Preview)     |
| `npm run lint`          | Executa ESLint em todo o código                      |
| `npm test`              | Roda testes unitários (Jest + React Testing Library) |
| `npm run test:watch`    | Roda Jest em modo watch                              |
| `npm run test:coverage` | Gera relatório de cobertura de testes                |
| `npm run cy:open`       | Abre Cypress UI para testes e2e                      |
| `npm run cy:run`        | Roda Cypress em modo headless                        |

---

## 🚧 Desenvolvendo

### Built With

- **Framework:** React v19
- **Bundler:** Vite v6
- **Linguagem:** TypeScript v5
- **Estilização:** Bootstrap v5 + react-bootstrap
- **Formulários:** Formik + Yup
- **Roteamento:** react-router-dom v7
- **Ícones:** react-bootstrap-icons
- **Media Query:** react-responsive

### Pré-requisitos

- Git
- Node >= 16
- npm ou yarn

### Configurando o ambiente de dev

```bash
git clone https://github.com/henriquexaud/miniCRUD.git
cd miniCRUD
npm install
npm run dev
```

Isso:

1. Clona o projeto localmente.
2. Instala todas as dependências do `package.json`.
3. Inicia o Vite na porta 5173 em modo hot-reload.

### Build

```bash
npm run build
```

- Compila o TypeScript (via `tsc -b`).
- Gera os arquivos otimizados na pasta `dist/` pelo Vite.

### Preview

```bash
npm run preview
```

- Inicia um servidor estático local em `dist/`, para testar o build.

---

## ⚙️ Configuração

Não há variáveis de ambiente externas; todos os dados são armazenados em `localStorage`.
Se quiser apontar para outra API mock, altere a URL em `pages/List.tsx` (fetch).

---

## ✅ Testes

### Unitários (Jest + React Testing Library)

```bash
npm test
npm run test:coverage
```

- Testes em `src/components/*.test.tsx`.
- Usa `ts-jest`, `jest-environment-jsdom` e `@testing-library/jest-dom`.

### E2E (Cypress)

```bash
npm run cy:open  # abre a UI do Cypress
npm run cy:run   # roda headless
```

- Specs em `cypress/e2e/*.cy.ts`.
- Integração completa do fluxo de cadastro, listagem, edição e exclusão.
