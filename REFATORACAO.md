# Refatoração do protótipo do Figma

O arquivo **Prototipar site com imagem** era um projeto React/TSX com Tailwind e componentes de bibliotecas externas. A interface foi reescrita para o padrão do projeto Angular existente, sem copiar dependências React para o `ProjetoIntegrador`.

## Organização aplicada

- `src/app/pages`: páginas completas da aplicação.
- `src/app/shared`: layout, navbar, footer, cabeçalho e cards reutilizáveis.
- `src/app/core/data`: dados mockados centralizados para demonstração.
- `src/app/core/services`: acesso tipado aos dados e autenticação.
- `src/app/core/guards`: proteção das áreas de cliente e administrador.
- `src/app/models/catalogo.ts`: interfaces usadas pela camada visual.
- `public/images`: imagem local exportada do protótipo.

## Páginas convertidas

Home, portfólio, detalhes da tatuagem, flash tattoos, tatuadores, perfil do tatuador, agendamento, contato, login, cadastro, perfil do cliente, dashboard e página 404.

## Decisões técnicas

- Componentes standalone e `ChangeDetectionStrategy.OnPush`.
- Rotas com carregamento sob demanda (`loadComponent`).
- Signals e `computed` para estado local e filtros.
- Reactive Forms para login, cadastro e contato.
- HTML5 semântico e atributos básicos de acessibilidade.
- CSS3 responsivo com variáveis globais, sem Tailwind.
- Nenhuma dependência React/MUI/Radix foi adicionada ao Angular.

## Validação

Executado com sucesso:

```bash
npm run build
npm test -- --watch=false
```
