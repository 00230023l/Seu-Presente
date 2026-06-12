/* ==========================================================================
   CONFIGURAÇÃO DO BANCO DE PERGUNTAS DO QUIZ
   ========================================================================== */

// Array de objetos contendo as 5 perguntas personalizadas para a Emily.
// Cada objeto tem a pergunta, as opções de resposta e o índice da resposta correta.
const BANCO_DE_PERGUNTAS = [
    {
        pergunta: "Qual é a minha música preferida? 🎵",
        opcoes: [
            "From the Star", 
            "No One Noticed"
        ],
        respostaCorreta: 0 // Índice 0 corresponde a "From the Star" (Ajuste se for a outra!)
    },
    {
        pergunta: "Quantas vezes por dia você acha que eu lembro de você e dou um sorriso bobo? 🥰",
        opcoes: [
            "Só quando estou respirando", 
            "24 horas por dia, sem parar"
        ],
        respostaCorreta: 1 // Ambas são fofas, mas a B é a resposta ideal
    },
    {
        pergunta: "Qual é a primeira coisa que eu quero fazer assim que a gente se ver? ❤️",
        opcoes: [
            "Te dar o abraço mais longo do mundo e não soltar mais", 
            "Ficar te olhando e sorrindo igual um bobo sem acreditar"
        ],
        respostaCorreta: 0 // Você pode definir qualquer uma como certa, o amor é o mesmo!
    },
    {
        pergunta: "Quem é a pessoa mais incrível, perfeita, linda e que ganha o prêmio de dona do meu coração? 👑",
        opcoes: [
            "Com certeza é a Emily", 
            "A resposta anterior está absolutamente certa"
        ],
        respostaCorreta: 0 // Na lógica abaixo, vamos fazer as duas aceitarem como correto!
    },
    {
        pergunta: "Você promete continuar sendo o meu amor por muitos e muitos Dias dos Namorados? 💍",
        opcoes: [
            "Sim, hoje, amanhã e sempre!", 
            "Com toda a certeza do mundo!"
        ],
        respostaCorreta: 0 // Pergunta final: as duas opções também serão aceitas como corretas!
    }
];

/* ==========================================================================
   VARIÁVEIS DE CONTROLE DE ESTADO
   ========================================================================== */
let indicePerguntaAtual = 0;
let quizBloqueado = false; // Evita múltiplos cliques rápidos enquanto exibe o feedback

/* ==========================================================================
   FUNÇÕES DE RENDERIZAÇÃO E LÓGICA DO JOGO
   ========================================================================== */

// Função responsável por desenhar a pergunta atual e seus botões na tela
function carregarPergunta() {
    const textoPergunta = document.getElementById('questionText');
    const caixaOpcoes = document.getElementById('optionsBox');
    const feedbackQuiz = document.getElementById('quizFeedback');

    if (!textoPergunta || !caixaOpcoes) return;

    // Limpa feedbacks anteriores e reseta o bloqueio de cliques
    feedbackQuiz.innerText = "";
    feedbackQuiz.className = "feedback-text";
    caixaOpcoes.innerHTML = "";
    quizBloqueado = false;

    // Pega os dados da pergunta atual com base no índice
    const dadosPergunta = BANCO_DE_PERGUNTAS[indicePerguntaAtual];
    textoPergunta.innerText = dadosPergunta.pergunta;

    // Cria os botões para cada opção disponível
    dadosPergunta.opcoes.forEach((opcao, indice) => {
        const botao = document.createElement('button');
        botao.classList.add('option-btn');
        botao.innerText = opcao;
        
        // Associa o evento de clique para validar a resposta passados o botão e o índice clicado
        botao.addEventListener('click', () => checarResposta(indice));
        
        caixaOpcoes.appendChild(botao);
    });
}

// Função que valida se o clique da Emily foi na resposta certa
function checarResposta(indiceSelecionado) {
    // Se o jogo estiver aguardando a próxima pergunta, ignora novos cliques
    if (quizBloqueado) return;
    quizBloqueado = true;

    const dadosPergunta = BANCO_DE_PERGUNTAS[indicePerguntaAtual];
    const feedbackQuiz = document.getElementById('quizFeedback');

    // Regra especial: Nas perguntas 4 e 5 (índices 3 e 4), qualquer resposta é linda e correta!
    const ehPerguntaEspecial = (indicePerguntaAtual === 3 || indicePerguntaAtual === 4);

    if (indiceSelecionado === dadosPergunta.respostaCorreta || ehPerguntaEspecial) {
        // Resposta Correta!
        feedbackQuiz.innerText = "Acertou! Você me conhece tão bem... ❤️";
        feedbackQuiz.className = "feedback-text correct";

        // Aguarda 1.5 segundos para ela ler o feedback e passa para o próximo passo
        setTimeout(() => {
            indicePerguntaAtual++;
            
            // Se ainda houver perguntas, carrega a próxima. Se não, finaliza o quiz.
            if (indicePerguntaAtual < BANCO_DE_PERGUNTAS.length) {
                carregarPergunta();
            } else {
                finalizarQuizComSucesso();
            }
        }, 1500);

    } else {
        // Resposta Errada
        feedbackQuiz.innerText = "Hum... Tente de novo! Eu sei que você consegue. 😘";
        feedbackQuiz.className = "feedback-text wrong";
        
        // Libera o quiz novamente após 1 segundo para ela tentar outra alternativa
        setTimeout(() => {
            quizBloqueado = false;
        }, 1000);
    }
}

// Função executada quando ela passa com sucesso por todo o desafio
function finalizarQuizComSucesso() {
    const containerQuiz = document.querySelector('.quiz-container');
    
    if (containerQuiz) {
        // Efeito visual sumindo com a caixinha do quiz de forma elegante
        containerQuiz.style.opacity = '0';
        containerQuiz.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            containerQuiz.classList.add('hidden'); // Remove do layout
            
            // Chamada da função global declarada no 'main.js' para revelar a carta
            if (typeof liberarRecompensaFinal === 'function') {
                liberarRecompensaFinal();
            }
        }, 500);
    }
}

/* ==========================================================================
   DISPARO DO EVENTO INICIAL
   ========================================================================== */
// Garante que o jogo só comece a rodar após a página HTML estar totalmente carregada
document.addEventListener('DOMContentLoaded', () => {
    carregarPergunta();
});