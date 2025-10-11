// Script para o menu mobile
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

// Script para a funcionalidade da IA Gemini
const geminiButton = document.getElementById("gemini-button");
const aiResultContainer = document.getElementById("ai-result");
const aiContentWrapper = document.getElementById("ai-content-wrapper");
const aiContent = document.getElementById("ai-content");
const loadingSpinner = document.getElementById("loading-spinner");

geminiButton.addEventListener("click", async () => {
    // 1. Obter dados do formulário
    const amountInput = document.getElementById("amount");
    const goalInput = document.getElementById("goal");

    const amount = amountInput.value;
    const goal = goalInput.options[goalInput.selectedIndex].text;

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        showCustomAlert("Por favor, insira um valor de saldo do FGTS válido.");
        return;
    }

    // 2. Exibir estado de carregamento e rolar até ele
    aiResultContainer.classList.remove("hidden");
    loadingSpinner.classList.remove("hidden");
    aiContentWrapper.classList.add("hidden");
    aiContent.innerHTML = "";
    aiResultContainer.scrollIntoView({ behavior: "smooth", block: "center" });

    // 3. Construir o prompt
    const systemPrompt =
        "Você é um consultor financeiro amigável e motivacional no Brasil. Sua especialidade é ajudar pessoas a usarem o dinheiro da antecipação do FGTS de forma inteligente. Dê conselhos práticos, positivos e fáceis de entender. Formate sua resposta usando markdown simples (negrito com **texto** e listas com *). Responda sempre em português do Brasil.";
    const userQuery = `Uma pessoa tem R$ ${amount} de saldo no FGTS e está pensando em antecipar esse valor para "${goal}". Crie um pequeno plano com 2 ou 3 dicas práticas e inspiradoras para ela usar bem esse dinheiro. Comece com uma frase de encorajamento.`;

    // 4. Chamar o backend
    try {
        const apiUrl = "http://localhost:3000/api/gemini";

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ systemPrompt, userQuery }),
        });

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.statusText}`);
        }

        const result = await response.json();
        const candidate = result.candidates?.[0];

        if (candidate && candidate.content?.parts?.[0]?.text) {
            let text = candidate.content.parts[0].text;
            // Conversão básica de markdown para HTML
            text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
            text = text.replace(/^\s*\*\s(.*?)$/gm, "<li>$1</li>");
            text = text.replace(/(<li>.*<\/li>)/gs, '<ul class="list-disc list-inside space-y-2">$1</ul>');
            text = text.replace(/\n/g, "<br>");

            aiContent.innerHTML = text;
        } else {
            throw new Error("Resposta da IA inválida ou vazia.");
        }
    } catch (error) {
        console.error("Erro ao chamar a API Gemini:", error);
        aiContent.innerHTML =
            `<p class="text-red-300">Desculpe, não foi possível gerar as dicas no momento. Por favor, tente novamente mais tarde.</p>`;
    } finally {
        // 5. Ocultar carregamento e exibir resultado
        loadingSpinner.classList.add("hidden");
        aiContentWrapper.classList.remove("hidden");
    }
});

// Função para alerta customizado
function showCustomAlert(message) {
    if (document.getElementById("custom-alert")) {
        return;
    }

    const alertBox = document.createElement("div");
    alertBox.id = "custom-alert";
    alertBox.className =
        "fixed top-5 left-1/2 -translate-x-1/2 bg-red-500 text-white py-3 px-6 rounded-lg shadow-lg z-50 transition-opacity duration-300";
    alertBox.innerHTML = `<p>${message}</p>`;

    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.style.opacity = "0";
        setTimeout(() => {
            document.body.removeChild(alertBox);
        }, 300);
    }, 3000);
}
