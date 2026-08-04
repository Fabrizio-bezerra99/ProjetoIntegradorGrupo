# Code Ink

Frontend acadêmico para apresentação e gerenciamento demonstrativo de um estúdio de tatuagem. O repositório contém uma aplicação Angular standalone; não há backend, banco de dados ou aplicativo Flutter nesta raiz.

> Estado atual: a interface funciona com dados mockados e persistência no `localStorage` do navegador. Os services HTTP existentes são scaffolding para uma API futura e não são consumidos pelas páginas atuais.

## Funcionalidades implementadas

- Home, portfólio com busca e filtro, detalhes de trabalho e catálogo de flash tattoos.
- Lista e perfil de tatuadores com dados mockados.
- Login e cadastro simulados com persistência local da sessão.
- Perfil do cliente protegido por guard de rota.
- Fluxo demonstrativo de agendamento em quatro etapas.
- Persistência local dos agendamentos criados e de mudanças de status.
- Dashboard e gestão de agendamentos protegidos para o perfil administrador.
- Formulário de contato validado, com confirmação apenas visual.
- Layout responsivo, componentes reutilizáveis e rotas carregadas sob demanda.

## Limites da demonstração

- Não há autenticação, envio de contato, pagamento ou persistência em servidor.
- Qualquer email sintaticamente válido entra como cliente quando a senha é `123456`; somente `admin@email.com` recebe o perfil administrador.
- Favoritos, inspirações, recuperação de senha, edição de perfil e configurações aparecem na interface, mas não possuem fluxo funcional completo.
- Os links de “gerenciar” portfólio, tatuadores e flash tattoos levam às páginas públicas; não há CRUD administrativo dessas áreas.
- A escolha “portfólio” no agendamento registra apenas o tipo de projeto; não existe seleção de um trabalho específico nem upload de referência.
- As imagens do catálogo são carregadas do Unsplash e dependem de conexão com a internet. A imagem principal do estúdio é local.

## Tecnologias

| Tecnologia   | Declaração no projeto               |
| ------------ | ----------------------------------- |
| Angular      | `^21.2.0`                           |
| TypeScript   | `~5.9.2`                            |
| RxJS         | `~7.8.0`                            |
| Vitest       | `^4.0.8`                            |
| HTML5 e CSS3 | templates e estilos dos componentes |
| npm          | `10.9.2` no campo `packageManager`  |

As versões acima são as faixas declaradas em `package.json`; o `package-lock.json` determina as versões efetivamente instaladas.

## Como executar

### Pré-requisitos

- Node.js e npm instalados.

TODO: definir e registrar uma versão mínima de Node.js. O repositório não possui campo `engines`, `.nvmrc` ou arquivo equivalente que permita confirmá-la.

### Instalação e desenvolvimento

```bash
npm install
npm start
```

Acesse `http://localhost:4200`.

No Windows PowerShell, caso a política de execução bloqueie `npm.ps1`, use os equivalentes `npm.cmd install` e `npm.cmd start`.

### Build e testes

```bash
npm run build
npm test -- --watch=false
```

Validações mais recentes realizadas em 30/07/2026:

- build de produção concluído;
- verificação do compilador Angular com `ngc --noEmit` concluída;
- 5 arquivos de teste e 16 testes aprovados.

Os testes atuais cobrem a criação do componente raiz, a navbar, as regras locais do `AgendamentoService`, os controles de senha e a sincronização do preenchimento automático no cadastro. Ainda não validam os fluxos completos de autenticação, filtros, guards ou a integração entre agendamento, perfil e administração.

## Credenciais de demonstração

| Perfil        | Email               | Senha    |
| ------------- | ------------------- | -------- |
| Administrador | `admin@email.com`   | `123456` |
| Cliente       | `cliente@email.com` | `123456` |

O estado demonstrativo é salvo no navegador com as chaves `codeInk.usuario`, `codeInk.agendamentos` e, por compatibilidade, `codeInk.ultimoAgendamento`.

## Organização

```text
src/app/
  core/
    data/       # mocks do catálogo e agendamentos iniciais
    guards/     # autorização de rotas por perfil
    services/   # estado local e scaffolding HTTP
  models/       # models de domínio e interfaces da camada visual
  pages/        # componentes de página carregados pelas rotas
  shared/       # layout, navegação, rodapé, cabeçalhos e cards
```

Fluxo atual de dados:

```text
Pages/Components -> Services -> mocks e localStorage
                              -> HttpClient -> API futura (não integrada às páginas)
```

## Documentação

- [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md): objetivo e limites confirmados do projeto.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md): arquitetura e fluxos atuais.
- [`docs/CODEBASE_ANALYSIS.md`](docs/CODEBASE_ANALYSIS.md): auditoria técnica e inconsistências.
- [`docs/ROADMAP.md`](docs/ROADMAP.md): próximos passos documentais e técnicos.
- [`docs/LEARNING_LOG.md`](docs/LEARNING_LOG.md): histórico de aprendizado.
- [`REFATORACAO.md`](REFATORACAO.md): registro da migração do protótipo visual.

## API futura

Há services tipados apontando para `http://localhost:8080`, e `provideHttpClient()` está configurado. Entretanto, nenhum backend foi encontrado neste repositório e as páginas atuais não consomem esses endpoints.

TODO: antes de ativar a integração, confirmar o repositório do backend, contratos, autenticação, CORS, tratamento de erros, ambientes e URLs de implantação.
