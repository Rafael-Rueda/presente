# 🎓 Presente - Sistema de Gestão de Presença

<div align="center">

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13%2B-blue.svg)

**Sistema moderno e intuitivo para gerenciamento de presença de alunos**

[Características](#-características) • [Tecnologias](#-tecnologias) • [Instalação](#-instalação) • [Uso](#-como-usar) • [API Docs](#-documentação-da-api)

</div>

---

## 📋 Sobre o Projeto

**Presente** é uma solução completa para gerenciamento de presença de alunos, desenvolvida com foco em simplicidade, eficiência e experiência do usuário. O sistema oferece uma interface web intuitiva e uma API REST robusta, permitindo o controle total sobre o registro e acompanhamento de presenças.

### 🎯 Proposta

O sistema foi idealizado para resolver os desafios comuns no controle de presença acadêmica:

- **Validação Rápida**: Registro de presença em poucos cliques
- **Prevenção de Duplicação**: Constraint único garante integridade dos dados
- **Relatórios Instantâneos**: Visualização em tempo real de presenças e faltas
- **Interface Moderna**: Design clean e responsivo com foco em usabilidade
- **API Completa**: Documentação Swagger para fácil integração

### 💡 Casos de Uso

- Instituições de ensino (escolas, cursos, universidades)
- Professores particulares
- Coordenadores de eventos e workshops
- Gestores de treinamentos corporativos

---

## ✨ Características

### 🔐 Autenticação e Segurança
- Sistema de login/registro com JWT
- Proteção de rotas sensíveis
- Senhas criptografadas com bcrypt
- Persistência de sessão

### 👥 Gestão de Alunos
- Cadastro completo de alunos (nome e email)
- Email único para cada aluno
- Listagem com dados de cadastro
- Interface intuitiva para gerenciamento

### ✅ Validação de Presença
- Registro rápido de presença por aluno
- Prevenção automática de duplicação (um registro por dia)
- Data opcional (padrão: dia atual)
- Feedback visual imediato
- Histórico completo de presenças

### 📊 Dashboard e Relatórios
- Estatísticas em tempo real:
  - Total de alunos cadastrados
  - Presenças validadas hoje
  - Total de presenças no sistema
- Filtros por aluno específico
- Visualização de data e hora de registro
- Interface responsiva e moderna

### 📚 Documentação Swagger
- API totalmente documentada
- Interface interativa para testes
- Exemplos de requisições e respostas
- Schemas de dados bem definidos

---

## 🔄 CI/CD

O projeto possui integração contínua configurada com GitHub Actions, executando automaticamente em cada push ou pull request.

### Pipeline de CI

O workflow executa os seguintes checks:

- ✅ **Build Matrix**: Testa em múltiplas versões do Node.js (18.x e 20.x)
- ✅ **Instalação de Dependências**: Garante que todas as dependências são instaláveis
- ✅ **Linting**: Verifica qualidade do código com Biome
- ✅ **Formatação**: Valida formatação do código
- ✅ **Startup Check**: Verifica se a aplicação inicia corretamente

### Badges

[![CI](https://github.com/Rafael-Rueda/presente/actions/workflows/ci.yml/badge.svg)](https://github.com/Rafael-Rueda/presente/actions/workflows/ci.yml)

### Scripts de Qualidade de Código

```bash
# Verificar linting
npm run lint

# Verificar formatação
npm run format:check

# Formatar código automaticamente
npm run format

# Executar testes
npm test
```

---

## 🚀 Tecnologias

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web minimalista
- **Sequelize** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação stateless
- **Bcrypt** - Criptografia de senhas
- **Swagger** - Documentação OpenAPI 3.0

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna (Grid, Flexbox, Gradientes)
- **JavaScript ES6+** - Lógica da aplicação
- **Fetch API** - Comunicação com backend
- **LocalStorage** - Persistência de sessão

### Arquitetura
- **Design Patterns**: Repository, Service, Controller
- **REST API**: Endpoints RESTful bem estruturados
- **Separação de Responsabilidades**: Camadas bem definidas
- **Error Handling**: Tratamento centralizado de erros

---

## 📦 Instalação

### Pré-requisitos

- Node.js >= 18.0.0
- PostgreSQL >= 13
- npm ou yarn

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/presente.git
cd presente
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure o Banco de Dados

Certifique-se de que o PostgreSQL está rodando e crie um banco de dados:

```bash
# Acesse o PostgreSQL
psql -U postgres

# Crie o banco de dados
CREATE DATABASE presente;

# Saia do psql
\q
```

### 4. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3333
JWT_SECRET=seu_segredo_super_secreto_aqui
DATABASE_URL=postgres://postgres:postgres@localhost:5432/presente
```

### 5. Inicie o Servidor

```bash
npm start
```

O servidor estará rodando em `http://localhost:3333`

```
✓ Database connection established successfully
✓ Database models synchronized
✓ Server is running on http://localhost:3333
✓ API available at http://localhost:3333
✓ Health check at http://localhost:3333/health
✓ API Documentation at http://localhost:3333/docs
```

---

## 💻 Como Usar

### Acesso Web

#### 1. Abra o Frontend

Abra o arquivo `app.html` no seu navegador ou sirva-o com um servidor local:

```bash
# Opção 1: Abrir diretamente
# Clique duas vezes em app.html

# Opção 2: Servidor Python
python -m http.server 8000
# Acesse: http://localhost:8000/app.html

# Opção 3: Servidor Node.js
npx serve
```

#### 2. Cadastre-se

1. Na tela inicial, clique em **"Cadastre-se"**
2. Preencha: Nome, Email e Senha
3. Clique em **"Cadastrar"**
4. Após o sucesso, você será redirecionado para o login

#### 3. Faça Login

1. Digite seu email e senha
2. Clique em **"Entrar"**
3. Você será direcionado ao dashboard

### Usando o Sistema

#### 📊 Dashboard

Visualize estatísticas em tempo real:
- Número total de alunos
- Presenças registradas hoje
- Total de presenças no sistema

#### 👥 Gerenciar Alunos

1. Clique na aba **"Alunos"**
2. Clique em **"+ Novo Aluno"**
3. Preencha nome e email
4. Clique em **"Adicionar Aluno"**

#### ✅ Validar Presença

1. Clique na aba **"Validar Presença"**
2. Selecione um aluno no dropdown
3. (Opcional) Selecione uma data específica
4. Clique em **"✓ Validar Presença"**

**Nota**: O sistema previne automaticamente duplicação de presença para o mesmo aluno no mesmo dia.

#### 📈 Relatórios

1. Clique na aba **"Relatórios"**
2. (Opcional) Filtre por aluno específico
3. Visualize todas as presenças com data e hora

---

## 📚 Documentação da API

### Swagger UI

Acesse a documentação interativa completa:

```
http://localhost:3333/docs
```

A interface Swagger permite:
- Visualizar todos os endpoints
- Testar requisições diretamente
- Ver exemplos de payloads
- Entender códigos de resposta

### Autenticação na API

Para testar endpoints protegidos no Swagger:

1. Crie um usuário em `POST /users`
2. Faça login em `POST /sessions` e copie o token
3. Clique em **"Authorize"** no topo da página Swagger
4. Cole o token no formato: `Bearer seu-token-aqui`
5. Teste os endpoints protegidos

### Principais Endpoints

#### Autenticação
- `POST /users` - Cadastrar usuário
- `POST /sessions` - Login (retorna JWT token)

#### Alunos
- `POST /students` - Cadastrar aluno 🔒
- `GET /students` - Listar todos os alunos 🔒
- `GET /students/:id` - Buscar aluno por ID 🔒

#### Presenças
- `POST /attendances/validate` - Validar presença 🔒
- `GET /attendances` - Listar todas as presenças 🔒
- `GET /attendances/student/:studentId` - Presenças de um aluno 🔒

🔒 = Requer autenticação (Bearer Token)

### Testando com cURL

#### Criar usuário
```bash
curl -X POST http://localhost:3333/users \
  -H "Content-Type: application/json" \
  -d '{"name":"João Silva","email":"joao@email.com","password":"senha123"}'
```

#### Login
```bash
curl -X POST http://localhost:3333/sessions \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@email.com","password":"senha123"}'
```

#### Cadastrar aluno (com token)
```bash
curl -X POST http://localhost:3333/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"name":"Maria Santos","email":"maria@email.com"}'
```

#### Validar presença
```bash
curl -X POST http://localhost:3333/attendances/validate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"studentId":"uuid-do-aluno"}'
```

---

## 🎨 Design e UI/UX

### Paleta de Cores

- **Azul Primário**: `#1e3c72` - Elementos principais
- **Azul Secundário**: `#2a5298` - Hover states
- **Gradiente**: `#1e3c72` → `#2a5298`
- **Cards**: Gradiente roxo/azul `#667eea` → `#764ba2`
- **Branco**: `#ffffff` - Background dos cards
- **Preto**: `#333333` - Textos

### Características da Interface

- ✨ Design moderno e minimalista
- 📱 Totalmente responsivo
- 🎯 Foco em usabilidade
- ⚡ Transições suaves
- 🔔 Feedback visual imediato
- 📊 Estados de loading e empty states
- 🎨 Ícones SVG inline

---

## 🛡️ Segurança

- **Autenticação JWT**: Tokens seguros e stateless
- **Bcrypt**: Senhas criptografadas com salt
- **Validação de Dados**: Validação em todas as camadas
- **SQL Injection**: Prevenção via Sequelize ORM
- **CORS**: Configurável conforme necessidade
- **Error Handling**: Mensagens genéricas para o cliente

---

## 🔄 Regras de Negócio

### Alunos
- Email único por aluno
- Nome e email obrigatórios
- Soft delete (pode ser implementado)

### Presenças
- **Constraint única**: Um aluno não pode ter duas presenças no mesmo dia
- Data NULL indica falta (para implementações futuras)
- Registro automático de timestamp
- Validação de existência do aluno antes de registrar

### Autenticação
- Token JWT com expiração de 15 minutos
- Refresh token (pode ser implementado)
- Logout invalida o token (stateless)

---

## 🐳 Docker (Opcional)

O projeto inclui configuração Docker para facilitar o setup:

```bash
# Subir o banco de dados PostgreSQL
docker-compose up -d

# O PostgreSQL estará disponível em localhost:5432
```

---

## 📝 Scripts Disponíveis

```bash
# Iniciar o servidor em modo desenvolvimento
npm run dev
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👥 Autores

- **Rafael Rueda, Renan Manancero, André Cícero** - *Desenvolvimento inicial* - [GitHub](https://github.com/rafael-rueda/presente)

---

## 🙏 Agradecimentos

- Comunidade Node.js
- Equipe Sequelize
- Desenvolvedores do Express
- Todos os contribuidores

---

<div align="center">

**🎓 Presente - Gestão de Presença Simplificada**

Feito com ❤️ por [Rafael Rueda, Renan Manancero, André Cícero]

[⬆ Voltar ao topo](#-presente---sistema-de-gestão-de-presença)

</div>
