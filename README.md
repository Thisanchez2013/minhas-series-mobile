# 📺 Minhas Séries

Aplicativo mobile desenvolvido como projeto prático da disciplina de **Programação para Dispositivos Móveis**.

O objetivo do projeto é permitir o gerenciamento das séries que o usuário está assistindo ou já concluiu, utilizando persistência local com SQLite.

O aplicativo permite cadastrar, visualizar, editar, avaliar e excluir séries, além de controlar o status de cada série entre **Assistindo** e **Concluída**.

---

## 🚀 Tecnologias utilizadas

- React Native
- Expo
- TypeScript
- Expo Router
- NativeWind
- Tailwind CSS
- SQLite
- Repository Pattern

---

## 📱 Funcionalidades

- Cadastro de séries
- Visualização das séries cadastradas
- Edição de séries
- Exclusão com confirmação
- Avaliação de 1 a 5 estrelas
- Possibilidade de deixar uma série sem nota
- Controle de status entre Assistindo e Concluída
- Filtro de todas as séries
- Filtro de séries em andamento
- Filtro de séries concluídas
- Persistência local utilizando SQLite
- Navegação entre telas utilizando Expo Router
- Atualização automática das informações ao retornar para uma tela

---

## 🗂️ Estrutura do projeto

```text
app/
├── _layout.tsx
├── index.tsx
├── form.tsx
└── detalhe.tsx

src/
├── database/
│   ├── database.ts
│   └── serieRepository.ts
└── types/
    └── serie.ts
```

A aplicação foi organizada separando as responsabilidades entre as telas, os tipos TypeScript e a camada responsável pelo acesso ao banco de dados.

As telas não executam comandos SQL diretamente. As operações com SQLite ficam centralizadas no `serieRepository.ts`.

---

## 💾 Banco de dados

O aplicativo utiliza **SQLite** para armazenamento local das séries.

Cada série possui as seguintes informações:

- ID
- Título
- Plataforma
- Quantidade de temporadas
- Nota
- Status de conclusão
- Data de criação

As novas séries são cadastradas inicialmente com o status **Assistindo**.

As consultas ao banco utilizam parâmetros `?` para os valores recebidos pela aplicação.

Os filtros **Assistindo** e **Concluídas** são realizados diretamente através das consultas SQL.

---

## ▶️ Como executar

### 1. Instalar as dependências

```bash
npm install
```

### 2. Iniciar o projeto

```bash
npx expo start
```

### 3. Executar no celular

Abra o aplicativo **Expo Go** e execute o projeto.

---

## 🧪 Teste de persistência

Foi realizado um teste para verificar se as informações permanecem armazenadas no SQLite mesmo após o aplicativo ser completamente fechado.

### Procedimento realizado

1. Foram cadastradas três séries.
2. Uma das séries foi marcada como concluída.
3. Outra série teve seus dados editados.
4. Foram testados os filtros Todas, Assistindo e Concluídas.
5. O aplicativo foi completamente fechado.
6. O aplicativo foi aberto novamente.
7. As três séries continuaram cadastradas.
8. As alterações realizadas permaneceram salvas.
9. O status da série concluída permaneceu salvo.
10. Os filtros continuaram apresentando corretamente as séries.

### Resultado

O teste confirmou que os dados são persistidos corretamente utilizando SQLite e permanecem disponíveis após fechar e abrir novamente o aplicativo.

---

## 📸 Evidências do teste

### Séries cadastradas

![Séries cadastradas:](image.png)

### Filtro de séries concluídas

![Filtro de séries concluídas:](image-1.png)

### Detalhes de uma série

![Detalhes de uma série:](image-2.png)

### Persistência após reabrir o aplicativo

![Persistência após reabrir o aplicativo:](image-3.png)

---

# 🤖 Diário do Copiloto

Durante o desenvolvimento, ferramentas de Inteligência Artificial foram utilizadas como apoio para compreender conceitos, analisar erros e revisar partes específicas da implementação.

---

### Registro 1 — Configuração do Expo Router e NativeWind

**O que eu pedi:**  
Ajuda para configurar o projeto com Expo Router, NativeWind e TypeScript seguindo a estrutura solicitada na atividade.

**O que a IA sugeriu (resumo):**  
A IA orientou a instalação das dependências necessárias e a configuração dos arquivos `tailwind.config.js`, `babel.config.js`, `metro.config.js`, `global.css` e `nativewind-env.d.ts`. Também sugeriu criar uma tela simples com a mensagem "Configuração OK" para validar o funcionamento.

**O que eu fiz:**  
Realizei as instalações e configurações passo a passo, executei o projeto no Expo Go e confirmei que o Expo Router e as classes do NativeWind estavam funcionando corretamente.

---

### Registro 2 — Correção do erro de importação do global.css

**O que eu pedi:**  
Ajuda para entender um erro apresentado pelo comando `npx tsc --noEmit` relacionado ao arquivo `global.css`.

**O que a IA sugeriu (resumo):**  
A IA analisou o erro do TypeScript e sugeriu declarar o módulo `*.css` no arquivo `nativewind-env.d.ts`.

**O que eu fiz:**  
Verifiquei que o arquivo de tipagem já estava sendo reconhecido pelo TypeScript e adicionei `declare module "*.css";`. Depois executei novamente `npx tsc --noEmit` e o projeto passou na validação sem erros.

---

### Registro 3 — Modelagem dos tipos TypeScript

**O que eu pedi:**  
Ajuda para estruturar os tipos necessários para representar uma série e os dados utilizados no cadastro, edição e filtros.

**O que a IA sugeriu (resumo):**  
A IA explicou a diferença entre `Serie`, `CreateSerieInput`, `UpdateSerieInput` e `SerieFilter`, além do motivo de `nota` aceitar `number | null` e `concluida` utilizar os valores numéricos 0 e 1.

**O que eu fiz:**  
Criei o arquivo `src/types/serie.ts` separando a entidade completa dos dados utilizados para criação e atualização. Também criei o tipo de filtro com `todas`, `assistindo` e `concluidas`.

---

### Registro 4 — Repository e consultas SQLite

**O que eu pedi:**  
Ajuda para implementar o Repository responsável pelas operações de banco de dados sem colocar SQL diretamente nas telas.

**O que a IA sugeriu (resumo):**  
A IA orientou a criação das funções `getSeries`, `getSerieById`, `createSerie`, `updateSerie`, `toggleSerieConcluida` e `deleteSerie`. Também explicou a utilização de placeholders `?` nas consultas e a realização dos filtros diretamente no SQL.

**O que eu fiz:**  
Implementei as seis funções no `serieRepository.ts`, mantive o acesso ao SQLite separado dos componentes React e utilizei parâmetros `?` para os valores enviados às consultas. A listagem foi ordenada por `createdAt` e os filtros foram implementados com `WHERE` no SQL.

---

### Registro 5 — Atualização da lista com useFocusEffect

**O que eu pedi:**  
Ajuda para fazer a lista de séries atualizar depois de cadastrar ou editar uma série e retornar para a tela principal.

**O que a IA sugeriu (resumo):**  
A IA explicou que apenas `useEffect` com dependências vazias não seria suficiente nesse fluxo, pois a tela poderia continuar montada durante a navegação. Foi sugerido utilizar `useFocusEffect` junto com `useCallback`.

**O que eu fiz:**  
Implementei `useFocusEffect` na tela principal para buscar novamente as séries quando a tela recebe foco. Também utilizei o mesmo conceito na tela de detalhes para atualizar os dados depois de retornar da edição.

---

### Registro 6 — Sugestão corrigida durante o desenvolvimento

**O que eu pedi:**  
Usei como referência o projeto desenvolvido nas aulas e pedi ajuda para adaptar a implementação dos filtros para o projeto Minhas Séries.

**O que a IA sugeriu (resumo):**  
Durante a comparação, foi identificado que uma implementação semelhante à utilizada no projeto de referência poderia realizar o filtro dos dados no JavaScript após carregá-los.

**O que eu fiz:**  
Não utilizei essa abordagem porque o enunciado deste projeto exige que o filtro seja realizado diretamente no SQL. Mantive o filtro no Repository utilizando `WHERE concluida = ?` para os filtros `assistindo` e `concluidas`.

Dessa forma, adaptei a solução para cumprir especificamente os requisitos da atividade em vez de simplesmente reproduzir a implementação de referência.

---

## ✅ Validação

Durante o desenvolvimento foi utilizado o comando:

```bash
npx tsc --noEmit
```

para verificar erros de tipagem TypeScript.

O projeto foi validado sem erros de TypeScript.

---

## 👨‍💻 Autor

Thiago Sanchez

Projeto desenvolvido para a disciplina de **Programação para Dispositivos Móveis**.