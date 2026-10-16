// --- FUNÇÕES DO CRUD LOCAL (HISTÓRICO) ---

const CHAVE_STORAGE = "floripaUnlocked_historicoIA";
let idRespostaAtual = null; // Controla qual resposta está visível no campo principal para não duplicar

// READ: Carrega as respostas salvas no localStorage e exibe na tela (exceto a resposta atual)
function carregarHistorico() {
    const historicoContainer = document.getElementById("historicoContainer");
    const listaHistorico = document.getElementById("listaHistorico");
    const historico = JSON.parse(localStorage.getItem(CHAVE_STORAGE)) || [];

    listaHistorico.innerHTML = "";

    // Filtra para exibir apenas as respostas anteriores, ocultando a que já está no campo principal
    const respostasAnteriores = historico.filter((item) => item.id !== idRespostaAtual);

    // O título "Respostas anteriores" só aparece quando há itens anteriores para mostrar
    if (respostasAnteriores.length === 0) {
        historicoContainer.style.display = "none";
        return;
    }

    historicoContainer.style.display = "block";

    respostasAnteriores.forEach((item) => {
        const card = document.createElement("div");
        card.className = "card-historico";
        card.innerHTML = `
            <button type="button" class="btn-deletar-historico" title="Excluir resposta" onclick="deletarDoHistorico(${item.id})">X</button>
            <div>${item.resposta}</div>
        `;
        listaHistorico.appendChild(card);
    });
}

// CREATE: Salva uma nova resposta no localStorage e a define como a resposta atual
function salvarNoHistorico(perguntaTexto, respostaTexto) {
    const historico = JSON.parse(localStorage.getItem(CHAVE_STORAGE)) || [];

    const novoItem = {
        id: Date.now(),
        pergunta: perguntaTexto,
        resposta: respostaTexto
    };

    // Marca a nova resposta como atual para que ela fique apenas no campo principal
    idRespostaAtual = novoItem.id;

    // Adiciona no início do array para a mais recente aparecer primeiro quando for para o histórico
    historico.unshift(novoItem);
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(historico));

    carregarHistorico();
}

// DELETE: Remove uma resposta específica pelo ID e atualiza a visualização
function deletarDoHistorico(id) {
    let historico = JSON.parse(localStorage.getItem(CHAVE_STORAGE)) || [];
    historico = historico.filter((item) => item.id !== id);
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(historico));

    carregarHistorico();
}

// --- FIM DAS FUNÇÕES DO CRUD ---


//Funcionamento da IA

// Adiciona o evento de clique no botão de envio
document.getElementById("btnEnviar").addEventListener("click", async () => {
    const inputElement = document.getElementById("userPrompt");
    const userInput = inputElement.value;
    const outputDiv = document.getElementById("aiOutput");
    const erroDiv = document.getElementById("erroInput");

    // Tratamento de erro: verifica se a entrada possui mais de 10 letras (desconsiderando espaços)
    const totalLetras = userInput.replace(/\s+/g, "").length;
    if (totalLetras <= 10) {
        erroDiv.textContent = "A sua pergunta deve conter mais de 10 letras.";
        return;
    }

    // Limpa mensagem de erro caso a entrada seja válida
    erroDiv.textContent = "";

    // Ao iniciar uma nova interação, libera a resposta anterior para aparecer no histórico abaixo
    if (idRespostaAtual !== null) {
        idRespostaAtual = null;
        carregarHistorico();
    }
    
    // Feedback visual simples enquanto aguarda
    outputDiv.innerHTML = "<span class='text-muted'>Pensando...</span>";

    try {
        // 1. Busca o conteúdo dos dois arquivos JSON
        const fetchPrompt = await fetch("./data/prompt.json");
        const dadosPrompt = await fetchPrompt.json();
        
        const fetchConteudo = await fetch("./data/conteudo.json");
        const dadosConteudo = await fetchConteudo.json();

        // 2. Concatena tudo para formar o System Prompt + Entrada
        // O JSON.stringify converte os objetos de volta para texto para a IA ler
        const promptCompleto = `
            Instruções de sistema: ${JSON.stringify(dadosPrompt)}
            Contexto do FAQ: ${JSON.stringify(dadosConteudo)}
            Dúvida do usuário: ${userInput}
        `;

        // 3. Faz a requisição direta para a API do Google AI Studio
        const resposta = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: promptCompleto }]
                    }
                ]
            })
        });

        const dados = await resposta.json();
        const textoResposta = dados.candidates[0].content.parts[0].text;

        // 4. Imprime o resultado exatamente na div designada
        outputDiv.innerHTML = textoResposta;

        // 5. Salva a resposta no localStorage (CREATE) mantendo apenas as anteriores visíveis no histórico
        salvarNoHistorico(userInput, textoResposta);
        inputElement.value = "";
    } catch (erro) {
        console.error("Erro ao consultar a IA:", erro);
        outputDiv.innerHTML = "<span class='text-danger'>Ocorreu um erro ao buscar a resposta. Tente novamente.</span>";
    }
});

// --- FIM DO BLOCO DA IA ---

// --- BLOCO ACCORDION ---

// Função assíncrona para buscar o JSON e montar o Accordion
async function carregarFAQ() {
    try {
        // 1. Busca o arquivo JSON na pasta data
        const resposta = await fetch('./data/conteudo.json');
        const faqData = await resposta.json();
        
        // 2. Seleciona o contêiner vazio no HTML
        const accordionContainer = document.getElementById('accordionFAQ');
        
        // 3. Percorre cada item do JSON e cria o HTML dinamicamente
        faqData.forEach((item, index) => {
            // Lógica para deixar apenas o PRIMEIRO item aberto por padrão (index 0)
            const isFirst = index === 0;
            const btnClass = isFirst ? 'accordion-button' : 'accordion-button collapsed';
            const collapseClass = isFirst ? 'accordion-collapse collapse show' : 'accordion-collapse collapse';
            const expandedAttr = isFirst ? 'true' : 'false';

            // 4. Injeta a estrutura do Bootstrap com os dados do JSON
            accordionContainer.innerHTML += `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading-${item.id}">
                        <button class="${btnClass}" type="button" data-bs-toggle="collapse" data-bs-target="#faq-${item.id}" aria-expanded="${expandedAttr}" aria-controls="faq-${item.id}">
                            ${item.title}
                        </button>
                    </h2>
                    <div id="faq-${item.id}" class="${collapseClass}" aria-labelledby="heading-${item.id}" data-bs-parent="#accordionFAQ">
                        <div class="accordion-body">
                            ${item.paragraph}
                        </div>
                    </div>
                </div>
            `;
        });
    } catch (erro) {
        console.error("Erro ao carregar os dados do FAQ:", erro);
    }
}

// 5. Executa a função assim que a página terminar de carregar
document.addEventListener('DOMContentLoaded', () => {
    carregarFAQ();
    carregarHistorico();
});