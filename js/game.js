/* ==========================================================================
   1. CONFIGURAÇÃO DO BANCO DE PERGUNTAS DO QUIZ
   ========================================================================== */

// Array de objetos contendo as 5 perguntas personalizadas para a Emily.
// Cada objeto possui a pergunta, o array de opções e o índice da resposta correta.
const BANCO_DE_PERGUNTAS = [
    {
        pergunta: "Qual é a minha música preferida? 🎵",
        opcoes: ["From the Star", "No One Noticed"],
        respostaCorreta: 0 // Índice 0 para "From the Star" (Ajuste se for a outra!)
    },
    {
        pergunta: "Quantas vezes por dia você acha que eu lembro de você e dou um sorriso bobo? 🥰",
        opcoes: ["Só quando estou respirando", "24 horas por dia, sem parar"],
        respostaCorreta: 1 // Qualquer uma será aceita, mas a segunda é a resposta ideal
    },
    {
        pergunta: "Qual é a primeira coisa que eu quero fazer assim que a gente se ver? ❤️",
        opcoes: ["Te dar o abraço mais longo do mundo e não soltar mais", "Ficar te olhando e sorrindo igual um bobo sem acreditar"],
        respostaCorreta: 0 // Qualquer opção escolhida avançará com sucesso
    },
    {
        pergunta: "Quem é a pessoa mais incrível, perfeita, linda e que ganha o prêmio de dona do meu coração? 👑",
        opcoes: ["Com certeza é a Emily", "A resposta anterior está absolutamente certa"],
        respostaCorreta: 0 // Ambas as alternativas representam a verdade absoluta!
    },
    {
        pergunta: "Você promete continuar sendo o meu amor por muitos e muitos Dias dos Namorados? 💍",
        opcoes: ["Sim, hoje, amanhã e sempre!", "Com toda a certeza do mundo!"],
        respostaCorreta: 0 // Pergunta final para fechar o quiz em alto nível
    }
];

/* ==========================================================================
   2. VARIÁVEIS DE CONTROLE DE ESTADO DO JOGO
   ========================================================================== */
let indicePerguntaAtual = 0;
let quizBloqueado = false; // Evita múltiplos cliques rápidos enquanto o feedback é exibido


/* ==========================================================================
   3. FUNÇÕES DE RENDERIZAÇÃO E FLUXO DO QUIZ
   ========================================================================== */

// Função responsável por limpar a tela e desenhar a pergunta atual com seus botões
function carregarPergunta() {
    const textoPergunta = document.getElementById('questionText');
    const caixaOpcoes = document.getElementById('optionsBox');
    const feedbackQuiz = document.getElementById('quizFeedback');

    // Validação de segurança para garantir que os elementos existem no HTML
    if (!textoPergunta || !caixaOpcoes) return;

    // Reseta o estado visual do feedback e libera novos cliques
    feedbackQuiz.innerText = "";
    feedbackQuiz.className = "feedback-text";
    caixaOpcoes.innerHTML = "";
    quizBloqueado = false;

    // Captura os dados da pergunta atual com base no índice de controle
    const dadosPergunta = BANCO_DE_PERGUNTAS[indicePerguntaAtual];
    textoPergunta.innerText = dadosPergunta.pergunta;

    // Mapeia e cria dinamicamente os botões de opção na tela da Emily
    dadosPergunta.opcoes.forEach((opcao, indice) => {
        const botao = document.createElement('button');
        botao.classList.add('option-btn');
        botao.innerText = opcao;
        
        // Atribui o evento de escuta para validar a resposta ao clicar
        botao.addEventListener('click', () => checarResposta(indice));
        
        caixaOpcoes.appendChild(botao);
    });
}

// Função que valida se a opção clicada está correta ou se passa na regra romântica
function checarResposta(indiceSelecionado) {
    // Se o jogo estiver processando a transição, ignora novos cliques acidentais
    if (quizBloqueado) return;
    quizBloqueado = true;

    const dadosPergunta = BANCO_DE_PERGUNTAS[indicePerguntaAtual];
    const feedbackQuiz = document.getElementById('quizFeedback');

    // REGRA ESPECIAL: A partir da pergunta 2 (índice 1 em diante), todas as opções 
    // são fofas e serão aceitas como corretas automaticamente para não travar o fluxo!
    const ehPerguntaAutoCorreta = (indicePerguntaAtual >= 1);

    if (indiceSelecionado === dadosPergunta.respostaCorreta || ehPerguntaAutoCorreta) {
        // Feedback de Acerto
        feedbackQuiz.innerText = "Acertou! ❤️";
        feedbackQuiz.className = "feedback-text correct";

        // Aguarda 1.2 segundos para ela ler a resposta e muda o estado
        setTimeout(() => {
            indicePerguntaAtual++;
            
            // Verifica se ainda existem perguntas ou se o jogo chegou ao fim
            if (indicePerguntaAtual < BANCO_DE_PERGUNTAS.length) {
                carregarPergunta();
            } else {
                finalizarQuizComSucesso();
            }
        }, 1200);
    } else {
        // Feedback de Erro (Caso ela erre a primeira pergunta sobre a música)
        feedbackQuiz.innerText = "Hum... Tente a outra opção! 😘";
        feedbackQuiz.className = "feedback-text wrong";
        
        // Libera o botão novamente após 1 segundo para ela tentar de novo
        setTimeout(() => {
            quizBloqueado = false;
        }, 1000);
    }
}


/* ==========================================================================
   4. FINALIZAÇÃO DO QUIZ E INTEGRAÇÃO COM A SURPRESA (MAIN.JS)
   ========================================================================== */
function finalizarQuizComSucesso() {
    const containerQuiz = document.querySelector('.quiz-container');
    
    if (containerQuiz) {
        // Efeito visual sumindo com o contêiner do quiz suavemente
        containerQuiz.style.opacity = '0';
        containerQuiz.style.transform = 'scale(0.9)';
        
        // Aguarda a animação do CSS terminar (500ms) para sumir com o bloco do layout
        setTimeout(() => {
            containerQuiz.classList.add('hidden');
            
            // Executa a chamada da função que está no main.js para soltar confetes, 
            // mostrar o selo de verificada e iniciar a digitação da carta.
            if (typeof liberarRecompensaFinal === 'function') {
                liberarRecompensaFinal();
            } else {
                console.error("Atenção: A função liberarRecompensaFinal não foi encontrada no main.js.");
            }
        }, 500);
    }
}


/* ==========================================================================
   5. DISPARO DO EVENTO INICIAL
   ========================================================================== */
// Garante o início do jogo estritamente após o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    carregarPergunta();
});
