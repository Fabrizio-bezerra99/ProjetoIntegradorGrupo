# Code Ink — Projeto Integrador

Projeto Angular 21 refatorado a partir do protótipo visual gerado pelo Figma.

## Principais melhorias

- Conversão completa do protótipo React/TSX para Angular standalone.
- Rotas lazy-loaded e layouts organizados.
- Componentes reutilizáveis para navegação, rodapé, cabeçalhos, cards de tatuagem e cards de artistas.
- Formulários reativos com validações.
- Services tipados preparados para futura integração com API.
- HTML semântico, responsividade e melhorias de acessibilidade.
- CSS3 organizado com variáveis globais, utilitários e estilos isolados por componente.

## Executar o projeto

```bash
npm install
npm start
```

Acesse `http://localhost:4200`.

### Credenciais de demonstração

- Administrador: `admin@email.com` / `123456`
- Cliente: `cliente@email.com` / `123456`

Os dados de portfólio, artistas e agendamentos são mocks locais em `src/app/core/data/catalogo.mock.ts`. Eles podem ser substituídos por chamadas HTTP quando o backend estiver pronto.
