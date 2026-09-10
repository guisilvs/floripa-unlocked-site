//Funcionamento da IA

// Adiciona o evento de clique no botão de envio
document.getElementById("btnEnviar").addEventListener("click", async () => {
    const userInput = document.getElementById("userPrompt").value;
    const outputDiv = document.getElementById("aiOutput");
    
    // Feedback visual simples enquanto aguarda
    outputDiv.innerHTML = "<span class='text-muted'>Pensando...</span>";

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
const resposta = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${API_KEY}`, {        method: "POST",
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

    // 4. Imprime o resultado exatamente na div designada
    outputDiv.innerHTML = dados.candidates[0].content.parts[0].text;
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
document.addEventListener('DOMContentLoaded', carregarFAQ);