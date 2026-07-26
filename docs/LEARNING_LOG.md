# Learning Log - Code Ink

## 2026-07-26 - Gestão administrativa de status dos agendamentos

### O que foi desenvolvido

- Criação das ações para confirmar e cancelar agendamentos na área administrativa.
- Integração da página administrativa com o `AgendamentoService`.
- Atualização imediata da lista após a alteração de um status.
- Persistência dos novos status no `localStorage`.
- Bloqueio das ações conforme o estado atual do agendamento.
- Estilização da página administrativa, tabela, botões e indicadores de status.
- Correção do menu mobile para mostrar `Minha conta` quando o usuário está autenticado.
- Configuração explícita de `rootDir` no `tsconfig.app.json` para compatibilidade com o TypeScript 6.

### Regras de status aplicadas

- Um agendamento pendente pode ser confirmado ou cancelado.
- Um agendamento confirmado ainda pode ser cancelado.
- Um agendamento cancelado não pode ser reaberto pela interface.
- Um agendamento finalizado não pode ser alterado.

### Problemas encontrados

- Ao atualizar um agendamento mock, o novo status era salvo no `localStorage`, mas a tabela continuava exibindo a lista antiga até a página ser recarregada.
- O problema foi resolvido buscando uma nova lista no service depois da atualização.
- O menu mobile sempre mostrava `Entrar`, mesmo quando o usuário estava autenticado.
- O problema acontecia porque a versão mobile possuía um link fixo e não consultava o `AuthService`.

### Conceitos praticados

- Comunicação entre componente e service.
- Eventos de clique com `(click)`.
- Propriedades condicionais com `[disabled]`.
- Classes CSS condicionais com `[class.nome-da-classe]`.
- Tipagem de status com `StatusAgendamento`.
- Diferença entre alterar os dados salvos e atualizar a referência exibida pela tela.
- Uso do retorno booleano para verificar se uma atualização foi realizada.
- Persistência de dados no `localStorage`.
- Isolamento de estilos entre componentes Angular.
- Renderização condicional com `@if` e `@else`.
- Formatação automática com Prettier.
- Diferença entre `rootDir` e `outDir` no TypeScript.

### Testes realizados

- Compilação Angular executada com:

```powershell
.\node_modules\.bin\ngc.cmd -p tsconfig.app.json --noEmit
```

Resultado: passou sem erros.

- Testes automatizados executados com:

```powershell
npm test -- --watch=false
```

Resultado: 2 arquivos de teste e 2 testes passaram.

- Teste completo do fluxo entre cliente, agendamento, perfil e administração.
- Alteração dos status dos agendamentos mocks e de um novo agendamento.
- Persistência dos status após atualizar a página com F5.
- Verificação de que os agendamentos não aparecem duplicados.
- Verificação dos status no Dashboard e no perfil do cliente.
- Verificação do menu mobile para usuários autenticados.

### Próximo passo sugerido

Criar testes automatizados para o `AgendamentoService`, cobrindo atualização de mocks, persistência dos status e prevenção de registros duplicados. Depois, realizar a revisão final de responsividade e acessibilidade do frontend.

## 2026-07-22 - Guards e redirecionamento apos login

### O que foi desenvolvido

- Melhoria no `clienteGuard` para redirecionar usuarios nao autenticados para o login mantendo a URL original.
- Melhoria no `adminGuard` com a mesma logica de redirecionamento.
- O acesso a `/perfil` agora pode redirecionar para `/login?redirect=/perfil`.
- O acesso a `/dashboard` agora pode redirecionar para `/login?redirect=/dashboard`.

### Conceitos praticados

- `Guard`: funciona como um porteiro de rota, decidindo se uma pagina pode ser acessada.
- `CanActivateFn`: funcao do Angular usada para permitir ou bloquear uma rota.
- `state.url`: guarda a URL que o usuario tentou acessar antes de ser redirecionado.
- `queryParams`: parametros enviados na URL, usados aqui para guardar o destino original.
- Redirecionamento apos login: melhora a experiencia do usuario porque o sistema lembra para onde ele queria ir.

### Dificuldades e aprendizados

- Foi necessario entender que `(_route, state)` permite acessar informacoes da navegacao atual.
- O parametro `_route` foi mantido com underline porque o Angular entrega esse valor, mas ele nao foi usado nesta melhoria.
- A logica principal aprendida foi:

```text
Se o perfil tem permissao, deixa entrar.
Se nao tem permissao, manda para login e guarda a URL original.
```

### Testes realizados

- Foi executada a checagem de compilacao do Angular:

```bash
.\node_modules\.bin\ngc.cmd -p tsconfig.app.json --noEmit
```

Resultado:

```text
Passou sem erros.
```

- Tambem foi feito teste manual do fluxo de redirecionamento.

### Proximo passo sugerido

Exibir o ultimo agendamento salvo no perfil do cliente, conectando o fluxo de agendamento com a area do usuario.

## 2026-07-21 - Fluxo de agendamento no Angular

### O que foi desenvolvido

- Melhoria no fluxo de agendamento do Code Ink.
- Criação de um resumo estruturado do agendamento escolhido pelo cliente.
- Exibição do resumo na tela de confirmação.
- Criação da ação "Novo agendamento" para reiniciar o fluxo.
- Salvamento do último agendamento no `localStorage` como demonstração.
- Ajuste do texto da confirmação para deixar claro que os dados ainda não são enviados para uma API real.

### Conceitos praticados

- `signal`: usado para guardar valores que mudam na tela, como etapa, opção, artista, data e horário.
- `computed`: usado para calcular automaticamente o resumo do agendamento a partir das escolhas do usuário.
- Operador ternário: usado para transformar a opção escolhida em um texto amigável para o cliente.
- `localStorage`: usado para salvar dados simples no navegador durante a simulação.
- `JSON.stringify`: usado para transformar o objeto do resumo em texto antes de salvar no `localStorage`.
- Separação entre lógica e visual: o TypeScript organiza os dados e o HTML apenas exibe as informações.

### Dificuldades e aprendizados

- Foi necessário entender a diferença entre valor vazio, `null` e `0`:
  - `0` representa a primeira etapa do fluxo.
  - `null` representa uma escolha que ainda não foi feita.
  - `''` representa texto vazio.
- Também foi praticada a leitura de mensagens de erro do Angular, especialmente quando havia problema de template.
- A indentação do HTML foi revisada para deixar o código mais legível.

### Testes realizados

- Foi executada a checagem de compilação do Angular:

```bash
.\node_modules\.bin\ngc.cmd -p tsconfig.app.json --noEmit
```

Resultado:

```text
Passou sem erros.
```

### Próximo passo sugerido

Exibir o último agendamento salvo no perfil do cliente, ainda de forma simulada, preparando o projeto para uma futura integração com a API Spring Boot.
