# Sistema de Atendimento Interno

## Visão Geral
## Problema Resolvido
## Funcionalidades
## Stack Utilizada
## Arquitetura
## Decisões Técnicas Importantes
## Como Rodar o Projeto
## Status do Projeto
## Próximos Passos

## Visão Geral

Sistema interno para gerenciamento de atendimentos em tempo quase real, desenvolvido para organizar a fila de solicitações feitas por um porteiro/recepção e acompanhadas em uma tela de atendimentos.
O sistema foi pensado para uso interno em empresas, com foco em simplicidade, estabilidade e fácil manutenção.

## Problema Resolvido

Antes do sistema, os atendimentos eram registrados de forma manual ou desorganizada, dificultando:
- o controle da ordem de chegada
- a visualização dos atendimentos pendentes
- a separação entre atendimentos ativos e finalizados

O sistema centraliza essas informações, garantindo organização, clareza e histórico controlado.

## Funcionalidades

- Criação de atendimentos pelo porteiro
- Listagem de atendimentos pendentes
- Finalização de atendimentos
- Separação entre atendimentos pendentes e finalizados
- Atualização automática da lista via requisições HTTP
- Limite de exibição para evitar sobrecarga de UI
- Exclusão automática de atendimentos antigos (7 dias)

## Stack Utilizada

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express
- TypeScript

### Banco de Dados
- PostgreSQL
- Drizzle ORM

### Infraestrutura
- Frontend: Vercel
- Backend: Render (Free Tier)
- Banco de dados: Neon

## Arquitetura

O sistema segue uma arquitetura cliente-servidor:

- O frontend é responsável apenas pela interface e interações do usuário
- O backend centraliza as regras de negócio e acesso ao banco
- O banco de dados é a única fonte de verdade

As telas não se comunicam diretamente entre si, toda sincronização ocorre via API.

## Decisões Técnicas Importantes

### Atualização de dados sem WebSocket em produção

Apesar de o sistema estar preparado para uso com WebSocket, optou-se por utilizar atualização via requisições HTTP (refetch/polling) em produção devido às limitações da infraestrutura gratuita.

Essa abordagem garante:
- maior estabilidade
- menor complexidade operacional
- compatibilidade com ambientes gratuitos

Em uma infraestrutura dedicada, o sistema pode utilizar WebSocket sem alterações significativas na arquitetura.

## Como Rodar o Projeto

### Backend
1. Crie um banco PostgreSQL
2. Configure a variável `DATABASE_URL`
3. Rode as migrations com Drizzle
4. Inicie o servidor

### Frontend
1. Configure a variável `NEXT_PUBLIC_API_URL`
2. Inicie o projeto Next.js

## Status do Projeto

✔ Sistema em produção  
✔ Em uso interno  
✔ Estável para MVP  

## Próximos Passos

- Implementação de autenticação e usuários
- Histórico completo de atendimentos
- Controle de permissões
- Suporte a múltiplas empresas (multi-tenant)
