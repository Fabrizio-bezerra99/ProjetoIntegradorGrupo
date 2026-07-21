# Analise da Codebase - Code Ink

Data da analise: 17/07/2026

## Tipo de tarefa

Analise e documentacao.

Esta analise foi feita em modo somente leitura sobre a aplicacao. O unico arquivo criado nesta etapa foi este relatorio em `docs/CODEBASE_ANALYSIS.md`.

## Objetivo

Mapear o estado atual do projeto Code Ink, identificar a estrutura real da aplicacao Angular, separar funcionalidades implementadas de funcionalidades simuladas e registrar problemas encontrados antes de novas implementacoes.

## Estrutura geral encontrada

Raiz analisada:

```text
C:\Users\fabri\OneDrive\Documentos\pi\CODEINK\ProjetoIntegrador
```

Itens principais:

```text
AGENTS.md
README.md
REFATORACAO.md
angular.json
package.json
package-lock.json
tsconfig.json
tsconfig.app.json
tsconfig.spec.json
docs/
public/
src/
```

Organizacao principal dentro de `src/app`:

```text
src/app/
  app.config.ts
  app.routes.ts
  app.ts
  app.html
  app.css
  core/
    data/
    guards/
    services/
  interceptors/
  models/
  pages/
  shared/
```

## Tecnologias e versoes

O projeto e uma aplicacao Angular standalone.

Versoes encontradas em `package.json`:

| Tecnologia | Versao |
|---|---:|
| Angular common/compiler/core/forms/platform-browser/router | `^21.2.0` |
| Angular CLI | `^21.2.8` |
| Angular build | `^21.2.8` |
| TypeScript | `~5.9.2` |
| RxJS | `~7.8.0` |
| Vitest | `^4.0.8` |
| jsdom | `^28.0.0` |
| Prettier | `^3.8.1` |

O projeto usa:

- `bootstrapApplication` em `src/main.ts`;
- `ApplicationConfig` em `src/app/app.config.ts`;
- `provideRouter(routes)`;
- componentes standalone;
- rotas com `loadComponent`;
- signals do Angular em algumas telas e services.

## Componentes encontrados

### Componente raiz

- `App`
  - Arquivos:
    - `src/app/app.ts`
    - `src/app/app.html`
    - `src/app/app.css`
  - Responsabilidade: renderizar o `router-outlet` principal.

### Layout compartilhado

- `SiteLayoutComponent`
  - Pasta: `src/app/shared/site-layout-component`
  - Responsabilidade: envolver paginas publicas com navbar, conteudo principal e footer.

### Componentes compartilhados

- `NavbarComponent`
  - Pasta: `src/app/shared/navbar-component`
  - Responsabilidade: menu principal, links de navegacao e atalho para login/minha conta.

- `FooterComponent`
  - Pasta: `src/app/shared/footer-component`
  - Responsabilidade: rodape do site.

- `HeaderComponent`
  - Pasta: `src/app/shared/header-component`
  - Responsabilidade: cabecalho reutilizavel de secoes.

- `TattooCardComponent`
  - Pasta: `src/app/shared/tattoo-card-component`
  - Responsabilidade: card de trabalho do portfolio.
  - Usa o model `TrabalhoPortfolio`.

- `ArtistCardComponent`
  - Pasta: `src/app/shared/artist-card-component`
  - Responsabilidade: card de artista/tatuador.
  - Usa o model `ArtistaCatalogo`.

### Paginas

- `HomeComponente`
  - Pasta: `src/app/pages/home-componente`
  - Mostra hero, diferenciais e trabalhos recentes do portfolio.

- `LoginComponente`
  - Pasta: `src/app/pages/login-componente`
  - Formulario reativo para login simulado.

- `CadastroComponente`
  - Pasta: `src/app/pages/cadastro-componente`
  - Formulario reativo para cadastro simulado de cliente.

- `PortfolioComponente`
  - Pasta: `src/app/pages/portfolio-componente`
  - Lista trabalhos do portfolio com filtro por estilo e busca.

- `TattooDetailComponente`
  - Pasta: `src/app/pages/tattoo-detail-componente`
  - Mostra detalhes de um trabalho do portfolio.

- `FlashTattoosComponente`
  - Pasta: `src/app/pages/flash-tattoos-componente`
  - Lista flash tattoos com filtro por tamanho.

- `TatuadoresComponente`
  - Pasta: `src/app/pages/tatuadores-componente`
  - Lista tatuadores/artistas.

- `TatuadorPerfilComponente`
  - Pasta: `src/app/pages/tatuador-perfil-componente`
  - Mostra perfil de tatuador, trabalhos e avaliacoes.

- `AgendamentoComponente`
  - Pasta: `src/app/pages/agendamento-componente`
  - Fluxo em etapas para agendamento demonstrativo.

- `ClientePerfilComponente`
  - Pasta: `src/app/pages/cliente-perfil-componente`
  - Area do cliente autenticado.

- `DashboardComponente`
  - Pasta: `src/app/pages/dashboard-componente`
  - Area administrativa com indicadores e agendamentos recentes.

- `ContatoComponente`
  - Pasta: `src/app/pages/contato-componente`
  - Formulario reativo de contato sem envio real.

- `NotFoundComponente`
  - Pasta: `src/app/pages/not-found-componente`
  - Pagina 404.

## Services encontrados

### `AuthService`

Arquivo:

```text
src/app/core/services/auth-service.ts
```

Responsabilidade atual:

- login simulado;
- cadastro simulado;
- controle do usuario autenticado com `signal`;
- estado derivado com `computed`;
- persistencia no `localStorage`.

Observacao:

- nao chama backend;
- a senha aceita no login simulado e `123456`;
- qualquer email valido com essa senha entra como cliente, exceto `admin@email.com`, que entra como admin.

### `CatalogoService`

Arquivo:

```text
src/app/core/services/catalogo-service.ts
```

Responsabilidade atual:

- listar flash tattoos simuladas;
- listar tamanhos;
- listar trabalhos do portfolio;
- buscar trabalho de portfolio por id;
- listar estilos do portfolio.

Problema:

- o metodo `listar()` existe, mas lanca `Method not implemented.`

### `AgendamentoService`

Arquivo:

```text
src/app/core/services/agendamento-service.ts
```

Responsabilidade atual:

- `listarResumos()` retorna dados simulados de `catalogo.mock.ts`;
- metodos CRUD usam `HttpClient` e apontam para `http://localhost:8080/agendamentos`.

Observacao:

- mistura uso simulado com preparacao para backend real.

### Services HTTP preparados para backend

Arquivos:

```text
src/app/core/services/usuario-service.ts
src/app/core/services/cliente-service.ts
src/app/core/services/tatuador-service.ts
src/app/core/services/tatuagem-service.ts
src/app/core/services/portifolio-service.ts
src/app/core/services/pagamento-service.ts
```

Responsabilidade:

- oferecer CRUD basico com `listar`, `buscarPorId`, `cadastrar`, `atualizar` e `excluir`;
- apontar para endpoints em `http://localhost:8080`.

Observacao importante:

- esses services dependem de `HttpClient`;
- `app.config.ts` ainda nao registra `provideHttpClient()`.

### `AdminService`

Arquivo:

```text
src/app/core/services/admin-service.ts
```

Estado atual:

- service criado, mas vazio.

## Models encontrados

Arquivos em `src/app/models`:

```text
admin.ts
agendamento.ts
catalogo.ts
cliente.ts
pagamento.ts
portifolio.ts
tatuador.ts
tatuagem.ts
usuario.ts
```

### Models de dominio

- `Usuario`
  - Campos: `id`, `nome`, `email`, `senha`, `telefone`, `tipoUsuario`.

- `Cliente`
  - Estende `Usuario`.
  - Campos extras: `endereco`, `dataNascimento`.

- `Tatuador`
  - Estende `Usuario`.
  - Campos extras: `especialidade`, `biografia`, `anosExperiencia`, `fotoPerfil`, `instagram`, `disponivel`.

- `Agendamento`
  - Relaciona `Cliente` e `Tatuador`.
  - Campos: `dataHora`, `descricao`, `status`, `valorEstimado`, `observacoes`.

- `Tatuagem`
  - Relaciona com `Agendamento`.
  - Campos: `nome`, `descricao`, `estilo`, `localCorpo`, `tamanhoCm`, `imagemReferencia`, `dataRealizacao`.

- `Portfolio`
  - Relaciona com `Tatuador` e opcionalmente `Tatuagem`.
  - Campos: `titulo`, `descricao`, `imagemUrl`, `estilo`, `dataPublicacao`, `destaque`.

- `Pagamento`
  - Relaciona com `Agendamento`.
  - Campos: `valor`, `formaPagamento`, `status`, `dataPagamento`.

- `Admin`
  - Classe vazia.

### Models de catalogo/tela

Arquivo:

```text
src/app/models/catalogo.ts
```

Contem:

- `ArtistaCatalogo`;
- `TrabalhoPortfolio`;
- `FlashTattoo`;
- `AgendamentoResumo`;
- `AvaliacaoArtista`;
- `StatusAgendamento`.

Observacao:

- esses models sao usados para dados simulados e componentes de exibicao;
- existe diferenca entre `Tatuador` e `ArtistaCatalogo`, o que hoje causa problemas em algumas telas.

## Guards encontrados

Arquivos:

```text
src/app/core/guards/admin-guard.ts
src/app/core/guards/auth-guard-guard.ts
src/app/core/guards/cliente-guard.ts
src/app/core/guards/tatuador-guard.ts
```

### `adminGuard`

- Permite acesso apenas se o usuario atual tiver perfil `admin`.
- Usado na rota `/dashboard`.

### `clienteGuard`

- Permite acesso para perfil `cliente` ou `admin`.
- Usado na rota `/perfil`.

### `authGuardGuard`

- Verifica se existe usuario autenticado.
- Redireciona para `/login` com query param `redirect`.
- Nao esta usado nas rotas atuais.

### `tatuadorGuard`

- Permite acesso apenas para perfil `tatuador`.
- Nao esta usado nas rotas atuais.

## Interceptor encontrado

Arquivo:

```text
src/app/interceptors/auth-interceptor-interceptor.ts
```

Estado atual:

- interceptor existe, mas apenas encaminha a requisicao sem alterar nada;
- nao adiciona token;
- nao esta registrado em `app.config.ts`.

## Rotas encontradas

Arquivo:

```text
src/app/app.routes.ts
```

Rotas fora do layout principal:

| Rota | Componente | Observacao |
|---|---|---|
| `/login` | `LoginComponente` | Login simulado |
| `/cadastro` | `CadastroComponente` | Cadastro simulado |

Rotas dentro de `SiteLayoutComponent`:

| Rota | Componente | Protecao |
|---|---|---|
| `/` | `HomeComponente` | Publica |
| `/home` | redirect para `/` | Publica |
| `/portfolio` | `PortfolioComponente` | Publica |
| `/portfolio/:id` | `TattooDetailComponente` | Publica |
| `/flash` | `FlashTattoosComponente` | Publica |
| `/tatuadores` | `TatuadoresComponente` | Publica |
| `/tatuadores/:id` | `TatuadorPerfilComponente` | Publica |
| `/agendamento` | `AgendamentoComponente` | Publica |
| `/contato` | `ContatoComponente` | Publica |
| `/perfil` | `ClientePerfilComponente` | `clienteGuard` |
| `/dashboard` | `DashboardComponente` | `adminGuard` |
| `**` | `NotFoundComponente` | Publica |

## Fluxo atual do login

1. Usuario acessa `/login`.
2. O formulario ja vem preenchido com:
   - email: `admin@email.com`;
   - senha: `123456`.
3. O usuario envia o formulario.
4. `LoginComponente` valida os campos usando Reactive Forms.
5. Se o formulario for valido, chama `AuthService.login(email, senha)`.
6. `AuthService` normaliza o email e verifica se a senha e `123456`.
7. Se a senha estiver errada, retorna erro com a mensagem `Email ou senha invalidos.`
8. Se o email for `admin@email.com`, cria usuario com perfil `admin`.
9. Se o email for `cliente@email.com`, cria usuario com perfil `cliente`.
10. Qualquer outro email com a senha correta tambem vira `cliente`.
11. O usuario e salvo no `localStorage` com a chave `codeInk.usuario`.
12. O usuario e redirecionado:
    - admin: `/dashboard`;
    - cliente: `/perfil`;
    - se existir query param `redirect`, ele tem prioridade.

## Funcionalidades reais no frontend

Ja existem no frontend:

- rotas configuradas;
- layout principal com navbar e footer;
- pagina inicial;
- portfolio com busca e filtro por estilo;
- detalhes de tattoo;
- flash tattoos com filtro por tamanho;
- tela de contato com validacao;
- tela de login com validacao;
- tela de cadastro com validacao de senha e confirmacao;
- perfil do cliente protegido por guard;
- dashboard administrativo protegido por guard;
- logout;
- cards reutilizaveis;
- models TypeScript;
- services preparados para chamadas HTTP;
- dados mockados para portfolio, artistas, flash tattoos e agendamentos.

## Funcionalidades simuladas

Estao simuladas:

- autenticacao;
- cadastro de usuario;
- favoritos;
- dados pessoais do cliente;
- agendamentos exibidos no perfil;
- confirmacao de agendamento;
- indicadores do dashboard;
- portfolio;
- flash tattoos;
- artistas;
- avaliacoes.

## Funcionalidades preparadas, mas nao confirmadas como operacionais

As seguintes partes parecem preparadas para integracao com backend, mas nao foram confirmadas como funcionais nesta analise:

- CRUD de usuarios;
- CRUD de clientes;
- CRUD de tatuadores;
- CRUD de tatuagens;
- CRUD de portfolio;
- CRUD de pagamentos;
- CRUD de agendamentos;
- interceptor de autenticacao;
- service administrativo.

Motivo:

- dependem de backend em `localhost:8080`;
- dependem de configuracao de `HttpClient`;
- nao ha evidencia, nesta analise do frontend, de backend ativo no repositorio analisado.

## Problemas encontrados

### 1. `TatuadorPerfilComponente` nao compila

Arquivo:

```text
src/app/pages/tatuador-perfil-componente/tatuador-perfil-componente.ts
```

Problemas confirmados pelo comando `ngc --noEmit`:

```text
Property '0' does not exist on type 'Observable<Tatuador[]>'.
Property 'listarAvaliacoes' does not exist on type 'TatuadorService'.
```

Explicacao didatica:

- `Observable<Tatuador[]>` representa uma lista que chegara de forma assincrona.
- Nao e possivel acessar diretamente `[0]` como se fosse um array comum.
- Alem disso, o service nao possui o metodo `listarAvaliacoes()`.

### 2. Mistura entre `Tatuador` e `ArtistaCatalogo`

Arquivos relacionados:

```text
src/app/models/tatuador.ts
src/app/models/catalogo.ts
src/app/core/services/tatuador-service.ts
src/app/shared/artist-card-component/artist-card-component.ts
src/app/pages/tatuadores-componente/tatuadores-componente.ts
src/app/pages/tattoo-detail-componente/tattoo-detail-componente.ts
src/app/pages/tatuador-perfil-componente/tatuador-perfil-componente.ts
```

O componente `ArtistCardComponent` espera `ArtistaCatalogo`, mas `TatuadorService` retorna `Tatuador`.

`ArtistaCatalogo` possui campos como:

- `fotoUrl`;
- `avaliacao`;
- `cidade`;
- `trabalhos`;
- `totalAvaliacoes`;
- `tatuagensRealizadas`;
- `clientesAtendidos`.

`Tatuador` possui outro formato:

- `fotoPerfil`;
- `instagram`;
- `disponivel`;
- `tipoUsuario`;
- e nao possui varios campos usados pelas telas.

Isso indica que e preciso decidir se as telas publicas de artistas continuarao usando dados de catalogo mockados ou se o backend passara a devolver um DTO especifico para tela.

### 3. Template de `TatuadoresComponente` usa signal sem chamada

Arquivo:

```text
src/app/pages/tatuadores-componente/tatuadores-componente.html
```

Trecho observado:

```html
@for (artista of artistas; track artista.id)
```

Como `artistas` foi criado com `toSignal`, o esperado no template e chamar o signal:

```html
@for (artista of artistas(); track artista.id)
```

### 4. `HttpClient` nao esta registrado na aplicacao

Arquivo:

```text
src/app/app.config.ts
```

O arquivo registra:

```ts
provideRouter(routes)
```

Mas nao registra:

```ts
provideHttpClient()
```

Impacto:

- services que injetam `HttpClient` podem falhar em tempo de execucao com erro de provider ausente.

### 5. Interceptor criado, mas nao usado

Arquivo:

```text
src/app/interceptors/auth-interceptor-interceptor.ts
```

Problemas:

- o interceptor nao altera a requisicao;
- nao adiciona token;
- nao esta registrado em `app.config.ts`;
- o nome `authInterceptorInterceptor` esta repetitivo.

### 6. Guards existentes, mas nem todos usados

Arquivos:

```text
src/app/core/guards/auth-guard-guard.ts
src/app/core/guards/tatuador-guard.ts
```

Estado:

- existem no projeto;
- nao estao aplicados nas rotas atuais.

### 7. `CatalogoService.listar()` nao implementado

Arquivo:

```text
src/app/core/services/catalogo-service.ts
```

O metodo:

```ts
listar() {
  throw new Error('Method not implemented.');
}
```

Impacto:

- se alguma tela chamar esse metodo, a aplicacao quebrara em tempo de execucao.

### 8. Inconsistencia entre `portifolio` e `portfolio`

Arquivos relacionados:

```text
src/app/models/portifolio.ts
src/app/core/services/portifolio-service.ts
src/app/pages/portfolio-componente
```

Observacao:

- nomes de arquivos e service usam `portifolio`;
- nomes de rota, pagina e interface usam `portfolio`.

Recomendacao:

- nao fazer alteracao global automaticamente;
- primeiro decidir padrao com o grupo e avaliar impactos em imports, rotas e backend.

### 9. Dados simulados misturados com services de API

Exemplos:

- `CatalogoService` usa mock local.
- `AgendamentoService` tem mock e tambem CRUD HTTP.
- `TatuadorService` usa HTTP, mas telas parecem esperar dados mockados de catalogo.

Impacto:

- dificulta saber se uma tela deve funcionar sem backend;
- aumenta risco de erro ao iniciar a aplicacao.

## Resultado da verificacao de tipos

Foi executada uma verificacao sem gerar arquivos:

```bash
.\node_modules\.bin\ngc.cmd -p tsconfig.app.json --noEmit
```

Resultado:

- a verificacao falhou;
- os erros confirmados estao em `TatuadorPerfilComponente`.

Erros principais:

```text
Property '0' does not exist on type 'Observable<Tatuador[]>'.
Property 'listarAvaliacoes' does not exist on type 'TatuadorService'.
```

## Arquitetura atual do frontend

Fluxo simplificado:

```text
main.ts
  -> app.config.ts
    -> app.routes.ts
      -> App
        -> router-outlet
          -> paginas publicas ou autenticadas
```

Para paginas publicas com layout:

```text
SiteLayoutComponent
  -> NavbarComponent
  -> router-outlet das paginas
  -> FooterComponent
```

Para dados:

```text
Pages
  -> Services
    -> mocks locais ou HttpClient
      -> backend futuro em localhost:8080
```

Para autenticacao simulada:

```text
LoginComponente
  -> AuthService
    -> signal usuarioAtual
    -> localStorage
    -> guards
```

## Comparacao com o contexto do projeto

O documento `PROJECT_CONTEXT.md` menciona objetivos como:

- apresentacao do estudio;
- portfolio;
- cadastro e autenticacao;
- clientes;
- tatuadores;
- agendamentos;
- pagamentos;
- administracao.

Estado encontrado:

| Objetivo | Estado atual |
|---|---|
| Apresentacao do estudio | Implementada no frontend |
| Portfolio | Implementado com mock |
| Flash tattoos | Implementado com mock |
| Login | Simulado |
| Cadastro | Simulado |
| Cliente/perfil | Implementado visualmente com mock |
| Tatuadores | Parcial, com problemas de model/service |
| Agendamento | Fluxo visual simulado |
| Pagamento | Apenas model e service HTTP preparado |
| Administracao | Dashboard visual com mock |
| Backend | Nao encontrado nesta raiz analisada |
| Banco de dados | Nao encontrado nesta raiz analisada |
| Mobile Flutter | Nao encontrado nesta raiz analisada |

## Plano recomendado de desenvolvimento

### Passo 1: recuperar compilacao

Prioridade:

1. corrigir `TatuadorPerfilComponente`;
2. decidir fonte dos dados dos tatuadores;
3. ajustar uso de signal em `TatuadoresComponente`;
4. registrar `provideHttpClient()` se os services HTTP forem usados.

### Passo 2: separar claramente mock e API

Opcao recomendada para aprendizado:

- manter mocks em `CatalogoService` para telas publicas enquanto o backend nao estiver pronto;
- deixar services HTTP para entidades de backend;
- documentar quais telas usam mock e quais usam API.

### Passo 3: padronizar models de tela e models de backend

Conceito importante:

- model de dominio representa a regra principal do sistema;
- model de tela ou DTO representa os dados no formato mais conveniente para exibicao.

Para artistas, provavelmente sera necessario escolher entre:

- adaptar a tela para usar `Tatuador`;
- criar um DTO de artista para o frontend;
- manter `ArtistaCatalogo` como mock ate o backend fornecer dados equivalentes.

### Passo 4: integrar backend aos poucos

Ordem sugerida:

1. autenticacao real;
2. listagem de tatuadores;
3. portfolio;
4. agendamentos;
5. pagamentos;
6. dashboard administrativo.

### Passo 5: criar testes basicos

Sugestoes:

- teste do `AuthService`;
- teste de guards;
- teste de filtros do portfolio;
- teste de validacao de cadastro;
- teste de fluxo de agendamento.

## Como testar manualmente o estado atual

Depois de corrigir os erros de compilacao, os passos esperados seriam:

```bash
npm install
npm start
```

Acessar:

```text
http://localhost:4200
```

Credenciais demonstrativas:

```text
Admin: admin@email.com / 123456
Cliente: cliente@email.com / 123456
```

Fluxos para observar:

- acessar `/`;
- navegar para `/portfolio`;
- filtrar portfolio;
- abrir `/portfolio/1`;
- acessar `/flash`;
- acessar `/login`;
- entrar como admin e verificar `/dashboard`;
- sair;
- entrar como cliente e verificar `/perfil`;
- testar `/agendamento`;
- testar `/contato`.

## Conceitos importantes para estudar neste projeto

- Componentes standalone: componentes Angular que importam suas dependencias diretamente.
- Rotas: mapeiam URLs para componentes.
- Lazy loading: carrega uma tela apenas quando a rota e acessada.
- Service: classe usada para centralizar regras e acesso a dados.
- Dependency injection: forma como o Angular entrega services para componentes.
- Reactive Forms: formularios controlados pelo TypeScript.
- Observable: fluxo assincrono comum em chamadas HTTP.
- Signal: estado reativo moderno do Angular.
- Guard: funcao que decide se uma rota pode ser acessada.
- Mock: dado simulado usado enquanto a API real nao esta pronta.
- DTO: objeto de transferencia de dados, geralmente usado para adaptar dados entre backend e frontend.

## Exercicio rapido

Abra os arquivos abaixo e responda:

```text
src/app/models/tatuador.ts
src/app/models/catalogo.ts
src/app/shared/artist-card-component/artist-card-component.ts
```

Pergunta:

Por que o `ArtistCardComponent` nao consegue receber diretamente um `Tatuador` sem ajustes?

Dica:

Compare os campos exigidos por `ArtistaCatalogo` com os campos existentes em `Tatuador`.
