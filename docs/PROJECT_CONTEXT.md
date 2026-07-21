# Code Ink — Contexto do Projeto

## Visão geral

Code Ink é um projeto integrador acadêmico para gerenciamento e apresentação de um estúdio de tatuagem.

O projeto tem como objetivo reunir os conhecimentos aprendidos no curso Full Stack Java, incluindo:

* frontend web com Angular;
* backend com Java e Spring Boot;
* banco de dados SQL;
* aplicativo mobile com Flutter;
* documentação de requisitos;
* prototipação e wireframes;
* controle de versão com Git e GitHub.

Além de entregar um sistema funcional, o grupo deseja compreender como todas as partes se conectam.

## Objetivos do sistema

O sistema deverá permitir, gradualmente:

* apresentação do estúdio;
* exibição de trabalhos e tatuagens;
* gerenciamento de portfólio;
* cadastro e autenticação de usuários;
* cadastro de clientes;
* cadastro de tatuadores;
* solicitação e gerenciamento de agendamentos;
* acompanhamento de pagamentos;
* comunicação ou contato com o estúdio;
* administração das informações do sistema.

Nem todas essas funcionalidades estão necessariamente implementadas. Antes de criar algo novo, verifique o código atual.

## Tecnologias

### Frontend web

* Angular
* TypeScript
* HTML5
* CSS3

### Backend

* Java
* Spring Boot
* Spring Web
* possibilidade de Spring Data JPA
* possibilidade de Spring Security

### Banco de dados

* SQL
* banco relacional ainda deve ser confirmado no código e na documentação

### Mobile

* Flutter
* Dart

### Ferramentas

* Git
* GitHub
* Visual Studio Code
* Eclipse
* Figma

## Repositório

O projeto utiliza Git e GitHub.

Repositório anteriormente utilizado:

`Fabrizio-bezerra99/PI-code-ink`

Antes de qualquer operação Git, confirme o repositório remoto com:

```bash
git remote -v
```

## Organização da equipe

A divisão inicial da equipe foi:

* Fabrício: documentação e frontend;
* Vitor: backend;
* Luiz: aplicativo mobile;
* Miguel: banco de dados.

Apesar dessa divisão, Fabrício deseja acompanhar e participar de todas as áreas para compreender a integração completa do sistema.

## Perfil de aprendizagem

Fabrício está aprendendo programação e prefere:

* explicações passo a passo;
* exemplos práticos;
* relação entre lógica de programação e código;
* entender o motivo das decisões;
* pequenas atividades após as explicações;
* tentar implementar antes de receber a solução completa;
* revisar erros junto com o mentor;
* aprender o fluxo completo, e não apenas copiar código.

## Frontend Angular

Já foram trabalhados ou mencionados:

* configuração inicial do projeto Angular;
* página inicial;
* tela de login;
* componente de login;
* componente de contato;
* serviço de autenticação;
* login simulado para testes;
* configuração de rotas;
* models/interfaces do domínio;
* integração de layouts criados no Figma;
* revisão da organização dos componentes;
* execução do projeto no localhost;
* utilização do Angular CLI;
* resolução de problemas relacionados ao PowerShell e ao `npm`.

Arquivos e conceitos mencionados anteriormente:

* `app.html`;
* `app.ts`;
* `auth-service.ts`;
* `login-componente.html`;
* `login-componente.ts`;
* models de usuário, cliente, tatuador, tatuagem, portfólio, pagamento e agendamento.

A grafia `portifolio` apareceu anteriormente. Deve ser analisado se será necessário padronizar para `portfolio`, evitando uma alteração global sem antes avaliar impactos.

## Possíveis entidades do domínio

As seguintes entidades foram mencionadas durante o desenvolvimento:

* Usuário;
* Cliente;
* Tatuador;
* Tatuagem;
* Portfólio;
* Agendamento;
* Pagamento.

Antes de criar novas entidades ou propriedades, examine os models existentes no frontend, backend e banco de dados.

## Backend

O backend do Code Ink ainda precisa ser inspecionado para determinar o estágio real de implementação.

A arquitetura pretendida é em camadas:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Banco de dados
```

Responsabilidades esperadas:

* Controller: receber requisições e devolver respostas;
* Service: executar regras de negócio;
* Repository: acessar e persistir dados;
* Entity/Model: representar os dados;
* DTO: representar dados de entrada e saída da API.

Nenhuma classe deve ser criada apenas com base nesta documentação. O código existente é a fonte principal para determinar o estado atual.

## Banco de dados

O banco deverá representar as entidades e seus relacionamentos.

Relacionamentos que precisam ser avaliados:

* usuário e cliente;
* usuário e tatuador;
* tatuador e portfólio;
* tatuador e tatuagem;
* cliente e agendamento;
* tatuador e agendamento;
* agendamento e pagamento.

Esses relacionamentos são hipóteses de arquitetura e precisam ser validados pelo grupo antes da implementação definitiva.

## Aplicativo mobile

O aplicativo Flutter será desenvolvido como parte do sistema.

A integração prevista é:

```text
Aplicativo Flutter
        ↓ HTTP
API Spring Boot
        ↓
Banco de dados
```

O aplicativo não deve acessar o banco diretamente.

## Documentação

O projeto deverá possuir, progressivamente:

* apresentação do projeto;
* problema que será resolvido;
* público-alvo;
* objetivos;
* requisitos funcionais;
* requisitos não funcionais;
* regras de negócio;
* casos de uso;
* diagramas UML;
* modelo do banco de dados;
* documentação das rotas da API;
* instruções de instalação e execução;
* divisão de responsabilidades;
* registro das decisões técnicas.

## Princípios do desenvolvimento

1. Primeiro compreender o problema.
2. Depois analisar a estrutura existente.
3. Implementar uma mudança pequena por vez.
4. Testar a alteração.
5. Explicar como frontend, backend e banco se conectam.
6. Registrar decisões importantes.
7. Fazer commits pequenos e descritivos.
8. Evitar gerar grandes quantidades de código sem revisão.
9. Não substituir o aprendizado pela automação.
10. Manter o sistema executável durante a evolução.

## Estado atual

O projeto possui uma base Angular e já passou por implementações e ajustes relacionados principalmente a:

* estrutura de páginas;
* tela de login;
* autenticação simulada;
* componentes;
* models;
* rotas;
* organização visual;
* Git e GitHub.

O estado exato deve ser levantado diretamente pelo Codex por meio da inspeção dos arquivos.

## Primeira tarefa recomendada para o Codex

Realizar uma análise somente leitura do projeto:

1. mapear todas as pastas;
2. identificar tecnologias e versões;
3. encontrar componentes, services, models e rotas;
4. verificar o que está implementado;
5. localizar código incompleto ou duplicado;
6. identificar erros aparentes;
7. explicar a arquitetura atual;
8. comparar o código encontrado com esta documentação;
9. propor um plano de estudos e desenvolvimento;
10. não modificar arquivos durante essa primeira análise.
