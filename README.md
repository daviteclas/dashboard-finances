# 💰 FinDash - Seu Dashboard Financeiro Pessoal

![Status do Projeto](https://img.shields.io/badge/Status-Concluído-success)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-1B1F23?style=flat&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-Bear-orange)

> Um aplicativo mobile moderno e performático para controle de finanças pessoais, com cálculo de saldo em tempo real e persistência de dados local. Construído com foco em arquitetura limpa e UX preventiva.

## ✨ Funcionalidades

- **Visão Geral Intuitiva:** Dashboard central com cálculo automático de Entradas, Saídas e Saldo Total (Estado Derivado).
- **Gestão de Transações:** Criação, listagem e exclusão de transações com feedback visual imediato.
- **Busca Dinâmica:** Filtro instantâneo de transações pelo título diretamente na memória.
- **Persistência de Dados (Offline-first):** Suas informações estão seguras no seu dispositivo, mesmo se fechar o app, utilizando AsyncStorage.
- **UX Preventiva:** Validação de formulários em tempo real (Zod) e alertas de confirmação para ações destrutivas (exclusão).
- **Navegação Fluida:** Sistema de roteamento baseado em arquivos com Expo Router, incluindo tabs e telas de modal/stack.
- **Cross-Platform:** Funciona perfeitamente em iOS, Android e Web.

## 🛠️ Tecnologias e Decisões Arquiteturais

- **[React Native](https://reactnative.dev/) & [Expo](https://expo.dev/):** Base do desenvolvimento ágil e universal.
- **[Expo Router](https://docs.expo.dev/router/introduction/):** Navegação moderna baseada em arquivos (File-based routing), eliminando a complexidade do React Navigation clássico.
- **[Zustand](https://github.com/pmndrs/zustand):** Gerenciamento de estado global escolhido pela sua simplicidade, performance e baixo boilerplate (dispensando a burocracia do Redux).
- **[React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/):** Casamento perfeito para formulários de alta performance e validação estrita de dados no lado do cliente.
- **[AsyncStorage](https://react-native-async-storage.github.io/async-storage/):** Escolhido para garantir que o ciclo de dados (CRUD) seja persistido localmente de forma segura e sem custos de banco de dados na nuvem.

## 🚀 Como executar o projeto

### Pré-requisitos

- Node.js instalado (Recomendado v18 ou v20 LTS)
- Aplicativo **Expo Go** instalado no seu celular (iOS ou Android)

👨‍💻 Autor
Criado por Davi Andrade

LinkedIn: https://www.linkedin.com/in/dev-davi/

GitHub: https://github.com/daviteclas
