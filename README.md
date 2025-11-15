# 📧 Notificator TaskHero

Serviço de notificações automatizadas para o sistema TaskHero. Este microsserviço é responsável por monitorar metas e tarefas, enviando notificações por e-mail aos usuários sobre metas que estão expirando ou já expiraram.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Cronograma de Tarefas](#cronograma-de-tarefas)
- [Templates de E-mail](#templates-de-e-mail)

## 🎯 Sobre o Projeto

O **Notificator TaskHero** é um serviço de notificações que trabalha em conjunto com a API principal do TaskHero. Ele executa tarefas agendadas (cron jobs) para:

- Notificar usuários sobre metas que estão próximas de expirar
- Alertar sobre metas que já expiraram
- Marcar automaticamente metas como expiradas no banco de dados
- Enviar e-mails personalizados com informações das metas

## ✨ Funcionalidades

- **Notificações Automáticas**: Envio de e-mails agendados para usuários
- **Monitoramento de Metas**: Verificação periódica do status das metas
- **Templates Personalizados**: E-mails com design personalizado e informações dinâmicas
- **Agendamento Flexível**: Múltiplos cron jobs configuráveis
- **Gestão de Status**: Atualização automática do status das metas expiradas

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Sequelize** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados
- **Nodemailer** - Envio de e-mails
- **Node-Cron** - Agendamento de tarefas
- **Nodemon** - Hot reload durante desenvolvimento
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📦 Pré-requisitos

- Node.js 18+ instalado
- PostgreSQL configurado e rodando
- Conta Gmail com senha de aplicativo habilitada (para envio de e-mails)
- Banco de dados TaskHero configurado

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd notificator-taskhero
```

2. Instale as dependências:
```bash
npm install
```

## ⚙️ Configuração

1. Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:
```bash
cp .env.example .env
```

2. Configure as variáveis de ambiente no arquivo `.env`:
```env
# Configuração do E-mail
APP_TASKHERO_EMAIL_ADRESS=seu-email@gmail.com
APP_TASKHERO_EMAIL_PASSWORD=sua-senha-de-aplicativo

# Configuração do Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskhero
DB_USER=seu-usuario
DB_PASSWORD=sua-senha
```

### 📧 Como Obter a Senha de Aplicativo do Gmail

1. Acesse sua conta Google
2. Vá em "Segurança"
3. Ative a "Verificação em duas etapas"
4. Procure por "Senhas de app"
5. Gere uma nova senha para "Outro (nome personalizado)"
6. Use essa senha no `.env`

## 🎮 Uso

### Modo Desenvolvimento

Para iniciar o serviço em modo de desenvolvimento com hot reload:

```bash
npm run dev
```

### Modo Produção

Para iniciar o serviço em modo de produção:

```bash
node src/index.js
```

O serviço iniciará na porta **8081** e começará a executar os cron jobs automaticamente.

## 📁 Estrutura do Projeto

```
notificator-taskhero/
├── assets/
│   └── templates/              # Templates HTML de e-mail
│       ├── email-meta-expirada.html
│       └── email-meta-expirando.html
├── src/
│   ├── constants/              # Constantes do projeto
│   │   └── CronConstants.js    # Expressões cron
│   ├── controller/             # Controllers
│   │   └── TesteController.js
│   ├── repository/             # Camada de acesso a dados
│   │   ├── MetaRepository.js
│   │   └── UserRepository.js
│   ├── schedules/              # Agendamentos cron
│   │   └── NotificationSchedule.js
│   ├── services/               # Lógica de negócio
│   │   ├── EmailService.js
│   │   ├── MetaService.js
│   │   └── NotificationService.js
│   ├── utils/                  # Utilitários
│   │   ├── ObjectUtils.js
│   │   └── TemplateUtils.js
│   ├── db.js                   # Configuração do banco
│   └── index.js                # Ponto de entrada
├── .env.example                # Exemplo de variáveis de ambiente
├── .gitignore
├── jest.config.mjs             # Configuração do Jest
├── package.json
└── README.md
```

## ⏰ Cronograma de Tarefas

O serviço executa as seguintes tarefas agendadas:

| Tarefa | Frequência | Descrição |
|--------|-----------|-----------|
| **Notificar Metas Expirando** | Semanal (Segunda, 12h) | Envia e-mails sobre metas pendentes, bloqueadas ou em andamento |
| **Notificar Metas Expiradas** | Semanal (Segunda, 12h) | Envia e-mails sobre metas que já expiraram |
| **Expirar Metas** | A cada 5 minutos | Verifica e marca metas como expiradas automaticamente |

### Expressões Cron Disponíveis

```javascript
EVERY_ONE_HOUR = '0 * * * *'        // A cada hora
EVERY_DAY = '0 12 * * *'            // Todo dia às 12h
ONCE_PER_WEEK = '0 12 * * 1'        // Toda segunda às 12h
EVERY_FIVE_MINUTES = '*/5 * * * *'  // A cada 5 minutos
```

## 📬 Templates de E-mail

O serviço utiliza templates HTML personalizados localizados em `assets/templates/`:

### email-meta-expirando.html
Enviado para usuários com metas que estão próximas de expirar (status: PENDENTE, BLOQUEADO ou EM_ANDAMENTO).

### email-meta-expirada.html
Enviado para usuários com metas que já expiraram.

Os templates suportam variáveis dinâmicas que são preenchidas automaticamente com dados do usuário e suas metas.

## 🔒 Segurança

- ⚠️ **Nunca** commite o arquivo `.env` com suas credenciais
- Use senhas de aplicativo do Gmail, não sua senha principal
- Mantenha as dependências atualizadas
- Configure adequadamente as permissões do banco de dados

## 📝 Logs

O serviço registra logs no console para:
- Inicialização do servidor
- Envio de e-mails (sucesso/erro)
- Execução dos cron jobs
- Erros de conexão

## 📄 Licença

Este projeto está sob a licença ISC.

## 👥 Autores

Desenvolvido pela equipe TaskHero

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
