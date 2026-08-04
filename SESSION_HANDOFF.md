# Code Ink — Handoff MVP

Atualizado em 04/08/2026.

## Estado atual

- Backend Spring Boot + MySQL funcionando.
- `GET /api/agendamentos` funcionando.
- `POST /api/agendamentos` funcionando.
- Angular lista agendamentos pelo backend.
- A tela `/agendamento` envia o cadastro real ao backend.
- O cadastro usa status `Pendente` e envia a data no formato `DD/MM/AAAA`.
- Suíte atual: 21 testes aprovados.
- Build Angular aprovado.

## Branches importantes

Frontend:

- `mvp/angular-agendamentos`

Backend:

- `main` do repositório `code-ink-backend` contém PR #1 e PR #2 mergeados.

## Como rodar o backend

```bat
cd /d "C:\Users\fabri\OneDrive\Documentos\Projeto Integrador\CODEINK\burger"
set "DB_USERNAME=code_ink_app"
set "DB_PASSWORD=SUA_SENHA_LOCAL"
.\mvnw.cmd spring-boot:run
```

## Como rodar o Angular

```bat
cd /d "C:\Users\fabri\OneDrive\Documentos\Projeto Integrador\CODEINK\PI_"
npm install
npm start
```

## Fluxo validado

1. Acessar `http://localhost:4200/agendamento`.
2. Preencher as etapas do formulário.
3. Confirmar o envio.
4. Verificar o `POST http://localhost:8080/api/agendamentos`.
5. Abrir `/dashboard/agendamentos` e confirmar o novo registro.

## Próxima etapa recomendada

Conectar as ações administrativas de confirmar/cancelar agendamento ao backend real.

## Melhorias futuras

- Resolver a diferença de CORS entre `localhost` e `127.0.0.1`.
- Melhorar os estados visuais de loading e erro.
- Remover mocks/localStorage gradualmente.
- Padronizar status entre frontend e backend.
- Atualizar a documentação final ao concluir o MVP.

Não adicionar senhas reais, tokens ou credenciais a este arquivo.
