# Code Ink — Session Handoff

Atualizado em 30/07/2026.

Este documento resume o estado confirmado do Code Ink e deve ser lido antes de continuar o desenvolvimento em outro chat.

## 1. Estado atual do projeto

- O repositório contém um frontend Angular standalone.
- Tecnologias confirmadas: Angular 21, TypeScript 5.9, RxJS, HTML5, CSS3, Vitest, jsdom, Prettier e Git.
- A aplicação usa dados mockados e persistência local no navegador.
- A sessão simulada usa a chave localStorage codeInk.usuario.
- Agendamentos locais usam codeInk.agendamentos e mantêm compatibilidade com codeInk.ultimoAgendamento.
- Existem services HTTP tipados preparados para uma API futura, mas as páginas atuais não consomem esses endpoints.
- Não há backend Java/Spring Boot, banco SQL, migrations, contrato OpenAPI, pipeline de CI ou aplicativo Flutter confirmado nesta raiz.
- O frontend possui páginas públicas, login, cadastro, perfil, dashboard, catálogo, agendamento e contato.
- O projeto está na branch main, que estava à frente da origem por um commit no último estado verificado.
- Último commit registrado: 079e103 test: cobrir alternância de senha nos formulários.

## 2. Tarefas concluídas

### Funcionalidades

- Implementada a alternância de mostrar e ocultar senha no login.
- Implementada a alternância independente da senha no cadastro.
- Implementada a alternância independente da confirmação de senha no cadastro.
- Adicionados aria-label e aria-pressed aos controles de senha.
- Mantida a validação de confirmação de senha por meio do validador senhasIguais.
- Mantido o comportamento de autenticação demonstrativa com dados locais.

### Testes

- Criados testes de componente para login e cadastro.
- Cobertos o tipo inicial password e a alteração para text.
- Cobertos os rótulos acessíveis Mostrar/Ocultar.
- Cobertos os estados acessíveis false e true.
- Criados testes para o AgendamentoService, incluindo persistência, atualização de status, deduplicação, chave legada, IDs inexistentes e JSON inválido.
- A última validação registrada no Learning Log informa 5 arquivos de teste e 15 testes aprovados.

### Documentação e organização

- README, contexto, arquitetura, roadmap, análise do código e learning log foram atualizados em etapas anteriores.
- A Biblioteca de Estudos foi criada no Notion com categorias de Angular, Java, Spring Boot, SQL, Git e GitHub, HTML e CSS, Testes, Acessibilidade, Arquitetura e Entrevistas Técnicas.
- Foi criada a seção Padrões e Decisões do Code Ink.
- As páginas existentes Decisões técnicas e Diário de estudos foram reutilizadas para evitar duplicação.
- Conteúdos ainda não estudados foram marcados como não iniciados.

## 3. Tarefas pendentes

### Alta prioridade

- Investigar a sincronização entre o preenchimento automático do navegador e o estado interno do Reactive Form.
- Executar novamente o build de produção depois da alteração final da confirmação de senha.
- Revisar o diff completo antes do commit.
- Confirmar a formatação do arquivo src/app/core/services/agendamento-service.spec.ts.

### Média prioridade

- Fazer uma auditoria completa de navegação por teclado no cadastro.
- Realizar um teste manual com leitor de tela.
- Validar responsividade em diferentes larguras.
- Criar testes de integração entre agendamento, perfil e dashboard.
- Ampliar a cobertura de testes para AuthService, guards, filtros e formulários.
- Revisar o README para apresentação no GitHub e no portfólio.

### Baixa prioridade ou dependente de decisões

- Confirmar requisitos de produto e regras oficiais de agendamento.
- Confirmar o escopo de cliente, administrador e tatuador.
- Localizar ou criar o backend oficial.
- Definir banco de dados, API, autenticação real e contratos.
- Implementar funcionalidades futuras como recuperação de senha, favoritos persistentes, CRUD administrativo, pagamentos e área de tatuador.

## 4. Decisões arquiteturais

- A aplicação atual é somente frontend Angular standalone.
- Os componentes de página ficam em src/app/pages.
- Elementos reutilizáveis ficam em src/app/shared.
- Estado, persistência e acesso a dados ficam em src/app/core/services.
- Mocks ficam em src/app/core/data.
- Guards controlam acesso a rotas protegidas.
- As rotas usam carregamento sob demanda com loadComponent.
- Os componentes usam ChangeDetectionStrategy.OnPush.
- Reactive Forms são usados nos formulários de login, cadastro e contato.
- Signals são usados para estados que mudam na interface, como etapas do agendamento e visibilidade das senhas.
- Login e cadastro ficam fora do layout principal.
- O restante das páginas usa SiteLayoutComponent.
- A persistência atual é local e não representa autenticação real.
- Services HTTP são scaffolding para uma API futura, não uma integração existente.
- Não se deve afirmar a existência de backend, banco ou aplicativo mobile sem evidência no código.

## 5. Arquivos alterados

O último git status registrado antes da criação deste documento mostrava:

- AGENTS.md
- README.md
- REFATORACAO.md
- docs/ARCHITECTURE.md
- docs/CODEBASE_ANALYSIS.md
- docs/LEARNING_LOG.md
- docs/PROJECT_CONTEXT.md
- docs/ROADMAP.md
- src/app/pages/cadastro-componente/cadastro-componente.html
- src/app/pages/cadastro-componente/cadastro-componente.spec.ts
- src/app/pages/cadastro-componente/cadastro-componente.ts
- src/app/core/services/agendamento-service.spec.ts como arquivo não rastreado naquele momento.

O arquivo criado nesta etapa é:

- SESSION_HANDOFF.md: resumo para continuidade do desenvolvimento em outro chat.

Durante a tarefa da Biblioteca de Estudos do Notion, nenhum arquivo local do projeto foi alterado.

## 6. Padrões utilizados

- Nomes de arquivos e classes seguem a convenção existente do projeto.
- Componentes são standalone.
- Lógica de estado permanece no TypeScript, não no template.
- Regras reutilizáveis ficam em services ou funções específicas.
- Formulários usam Reactive Forms e validadores.
- Controles interativos usam elementos HTML nativos, como button e input.
- Testes seguem a estrutura describe, beforeEach, afterEach e it.
- Testes de interface usam criação de fixture, detectChanges, interação e asserções.
- O localStorage é limpo entre testes para manter isolamento.
- O comportamento acessível é testado junto com o comportamento visual.
- Alterações importantes devem ser documentadas no README, nos arquivos de docs e no Learning Log quando forem afetados.
- Commits devem ter mensagens claras e seguir o padrão já utilizado.

## 7. Validações registradas

Validações confirmadas na conversa ou na documentação:

- Prettier executado com sucesso em etapas anteriores.
- Compilação Angular com ngc --noEmit aprovada em etapas anteriores.
- Build de produção registrado como aprovado no README e no Learning Log de 29/07/2026.
- Suíte automatizada mais recente registrada com 5 arquivos e 15 testes aprovados.
- Teste direcionado do cadastro registrado com 2 testes aprovados.
- Navegação por teclado no login verificada manualmente.
- Funcionamento visual da confirmação de senha confirmado pelo usuário.

Observação importante:

- O README ainda contém um registro histórico de 5 arquivos e 14 testes aprovados. O Learning Log registra a validação mais recente com 15 testes. Confirmar novamente a suíte antes de atualizar esses números.
- O build precisa ser executado novamente após a última alteração da confirmação de senha caso ainda não tenha sido repetido depois dela.
- Não há evidência de teste com leitor de tela ou de testes de integração.

## 8. Contexto do Notion

- A tarefa Criar testes básicos do frontend permaneceu com status Em revisão.
- O próximo passo registrado para essa tarefa é investigar o autocomplete, executar o build final, revisar o diff e preparar o commit manual.
- A Biblioteca de Estudos está organizada na página Biblioteca de Estudos.
- A página Roadmap pertence ao objetivo profissional Dev Canadá.
- O Notion deve ser atualizado somente com evidências reais do código, dos testes e da documentação.

## 9. Próximos passos sugeridos

A próxima sessão deve tratar uma única tarefa:

### Investigar o autocomplete do cadastro

Arquivos prováveis:

- src/app/pages/cadastro-componente/cadastro-componente.ts
- src/app/pages/cadastro-componente/cadastro-componente.html
- src/app/pages/cadastro-componente/cadastro-componente.spec.ts

Sequência sugerida:

1. Reproduzir o problema no navegador.
2. Comparar o valor visual do input com o valor do FormControl.
3. Identificar em que momento o autofill ocorre.
4. Escolher uma correção pequena e compatível com Reactive Forms.
5. Criar ou ajustar um teste de regressão.
6. Executar a suíte, o compilador e o build.
7. Revisar o diff.
8. Orientar o usuário a criar o commit manualmente.

## 10. Regras para continuar em outro chat

- Ensinar antes de implementar.
- Explicar o problema, a causa, a ideia da solução, os arquivos envolvidos e como testar.
- Não alterar ou criar arquivos sem autorização explícita.
- Trabalhar em pequenas etapas.
- Esperar a confirmação do usuário quando a alteração não tiver sido autorizada.
- Não fazer commit, push ou Pull Request automaticamente.
- Diferenciar testes automatizados de testes manuais.
- Não considerar backend, banco ou mobile como existentes sem confirmação no repositório.
- Usar português brasileiro e linguagem adequada a um estudante iniciante.
- Relacionar as explicações ao Code Ink e ao objetivo de conseguir uma vaga Full Stack Júnior no Canadá.
