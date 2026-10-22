# Floripa Unlocked - CRUD Local & FAQ Dinâmico (Prova 2)

Bem-vindo ao repositório do **Floripa Unlocked**, um projeto que revoluciona a forma como jovens e turistas exploram Florianópolis. Este módulo foca na nossa seção interativa com a Inteligência Artificial e no nosso FAQ.

## Destaque da Entrega (Prova 2) - CRUD Local

O "carro-chefe" desta entrega é a implementação de um **CRUD Local** para o histórico de conversas com a IA. 
- **Create & Read:** As perguntas feitas pelo usuário e as respostas geradas pela IA do Google são salvas no navegador (utilizando o LocalStorage) e lidas para serem empilhadas no histórico da tela.
- **Delete:** Implementamos um botão específico para apagar e limpar o histórico de conversas salvo localmente.

## Outras Funcionalidades Desta Página

- **FAQ 100% Dinâmico:** O Accordion do Bootstrap agora está conectado diretamente a uma base de dados JSON, gerando as perguntas e respostas de forma dinâmica e facilitando a atualização das informações.

- **Validação de Segurança:** O usuário agora precisa digitar um mínimo de 10 letras para conseguir enviar uma pergunta para a Inteligência Artificial, *evitando entradas vazias ou muito curtas*.
- **Ajustes de UI/UX:** Atualização na barra de navegação (Navbar), alterando a aba de "Nosso projeto" para "Início", tornando a navegação mais intuitiva.
- **Injeção de Contexto (RAG):** A IA lê os dados locais do aplicativo (via JSON) para responder às dúvidas com precisão sobre o Floripa Unlocked, fornecendo respostas mais relevantes ao contexto do projeto.
- **Histórico de Conversas:** Armazenamento local de perguntas e respostas para facilitar a consulta de interações anteriores, utilizando o `localStorage`.
- **Interface Responsiva:** Adaptação dos elementos visuais para diferentes tamanhos de tela, proporcionando uma experiência de navegação mais consistente em computadores e dispositivos móveis. 

## Sobre o Projeto (Contexto Geral)
- **Motor de Recomendações:** Cruzamento de preferências do usuário com clima e geolocalização.
- **Gamificação:** Sistema de conquistas para explorar novos bairros (100% Floripa).
- **Cashback:** Validação presencial via QR Code em comércios locais.
- **Ecossistema B2B:** Atração de fluxo qualificado para pequenos negócios da ilha.

## Tecnologias Utilizadas
- **HTML5 & CSS3**
- **JavaScript (Vanilla / ES6)** - Focado no CRUD com LocalStorage e requisições assíncronas (Fetch API).
- **Bootstrap 5** - Para layout responsivo (Grid) e componentes visuais (Accordion, Navbar).
- **Google Gemini API** (Google AI Studio) - Motor da nossa inteligência artificial.
- **Figma** - Para a prototipação e design da interface.

## Como Executar o Projeto Localmente

Para rodar esta aplicação na sua máquina, siga os passos abaixo:

- **Clone o repositório:** `git clone https://github.com/guisilvs/floripa-unlocked-site.git`
- **Obtenha a Chave da API:** Acesse o Google AI Studio, faça login e gere a sua API Key gratuita.
- **Configure a Chave da API no projeto:** Na pasta js, crie ou edite o arquivo chamado config.js.
- **Adicione o seguinte código:** `const API_KEY = "COLE_SUA_CHAVE_DO_GOOGLE_AQUI";`
- **Inicie o servidor local:** Como o projeto consome arquivos externos (.json) dinamicamente, é obrigatório rodar a aplicação em um servidor local.
- **Recomendação:** Recomendamos abrir o projeto no VS Code e utilizar a extensão Live Server.

## Contexto Acadêmico e Equipe
- **Disciplina:** Front End I
- **Curso:** Análise e Desenvolvimento de Sistemas (ADS)
- **Professor:** Saulo Popov
- **Desenvolvedores:** Guilherme da Silveira Ribeiro, Guilherme Macedo Sales e Marcos Eduardo Dalssasso.