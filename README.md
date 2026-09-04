# Floripa Unlocked - FAQ & Chatbot IA

Bem-vindo ao repositório do **Floripa Unlocked**, um projeto que revoluciona a forma como jovens e turistas exploram Florianópolis. Este módulo específico foca na nossa seção de Perguntas Frequentes (FAQ) interativa e no assistente virtual integrado com Inteligência Artificial.

## Sobre o Projeto

O Floripa Unlocked combate a paralisia de escolha ao entregar sugestões hiperpersonalizadas de passeios, bares e restaurantes, fugindo das opções óbvias promovidas nas redes sociais. A plataforma conta com:
- **Motor de Recomendações:** Cruzamento de preferências do usuário com clima e geolocalização.
- **Gamificação:** Sistema de conquistas para explorar novos bairros (100% Floripa).
- **Cashback:** Validação presencial via QR Code em comércios locais.
- **Ecossistema B2B:** Atração de fluxo qualificado para pequenos negócios da ilha.

## Funcionalidades Desta Página
- **FAQ Dinâmico:** Implementado utilizando o sistema de Accordion nativo do Bootstrap 5.
- **Chatbot Integrado:** Uma Inteligência Artificial pronta para responder dúvidas sobre o projeto.
- **Injeção de Contexto (RAG):** A IA lê os dados locais do aplicativo (via `conteudo.json` e `prompt.json`) para responder às dúvidas do usuário com precisão, sem fugir do escopo do projeto.

## Tecnologias Utilizadas
- **HTML5 & CSS3**
- **JavaScript** - Focado em requisições assíncronas (Fetch API).
- **Bootstrap 5** - Para layout responsivo (Grid) e componentes visuais (Accordion, Navbar).
- **Google Gemini API** (Google AI Studio) - Motor da nossa inteligência artificial.
- **Figma** - Para a prototipação e design da interface.

## Como Executar o Projeto Localmente

Para rodar esta aplicação na sua máquina e testar a Inteligência Artificial, siga os passos abaixo:

- **Clone o repositório:** `git clone https://github.com/guisilvs/floripa-unlocked-site`
- **Obtenha a Chave da API:** Acesse o Google AI Studio, faça login e gere a sua API Key gratuita.
- **Configure a Chave da API no projeto:** Na pasta js, crie ou edite o arquivo chamado config.js.
- **Adicione o seguinte código:** `const API_KEY = "COLE_SUA_CHAVE_DO_GOOGLE_AQUI";`
- **Inicie o servidor local:** Como o projeto consome arquivos externos (.json) através do método fetch, é necessário rodar a aplicação em um servidor local.
- **Recomendação:** Recomendamos abrir o projeto no VS Code e utilizar a extensão Live Server.

