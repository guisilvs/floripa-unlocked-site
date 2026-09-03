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