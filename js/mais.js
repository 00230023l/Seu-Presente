/* ==========================================================================
   CONFIGURAÇÕES INICIAIS DO CASAL
   ========================================================================== */

// 1. AJUSTE A DATA DO INÍCIO DO NAMORO AQUI!
// Formato: Ano, Mês (Atenção: Janeiro é 0, Fevereiro é 1, Março é 2... Junho é 5)
// Exemplo abaixo configurado para 12 de Junho de 2025. Altere para a vossa data real!
const DATA_INICIO_NAMORO = new Date(2025, 5, 12, 0, 0, 0); 

// 2. TEXTO DA TUA CARTINHA DE AMOR
// Podes escrever o tamanho de texto que quiseres aqui dentro das crases (``).
// Use o \n para quebrar linhas se necessário.
const TEXTO_DA_CARTA = `Querida Emily,

Escrevi este site inteiramente para ti porque queria dar-te algo único neste Dia dos Namorados. Queria que cada linha de código, cada coração a voar e cada segundo contado na tela mostrassem o quanto és importante para mim.

O meu coração está sempre pertinho do teu, não importa onde estejamos. Adoro tudo em ti: o teu sorriso, o teu jeito de falar e a forma como fazes os meus dias muito mais felizes. 

Obrigado por seres a minha namorada, a minha parceira e o meu amor. Parabéns pelo nosso dia!

Com todo o amor do mundo,
[Teu Nome] ❤️`;


/* ==========================================================================
   A. SISTEMA DE CHUVA DE CORAÇÕES DINÂMICA
   ========================================================================== */
function criarChuvaDeCoracoes() {
    const container = document.getElementById('heartsContainer');
    if (!container) return;

    // Lista de emojis de coração para variar o visual
    const tiposDeCoracoes = ['❤️', '💖', '💝', '💕', '💗'];

    // Função interna que gera um único coração
    function gerarCoracao() {
        const coracao = document.createElement('div');
        coracao.classList.add('heart-element');
        
        // Sorteia um tipo de coração da lista
        coracao.innerText = tiposDeCoracoes[Math.floor(Math.random() * tiposDeCoracoes.length)];
        
        // Posição horizontal aleatória (0% a 100% da largura da tela)
        coracao.style.left = Math.random() * 100 + 'vw';
        
        // Tamanho aleatório para dar profundidade
        const tamanhoAleatorio = Math.random() * 1.5 + 0.8; // entre 0.8rem e 2.3rem
        coracao.style.fontSize = `${tamanhoAleatorio}rem`;
        
        // Duração da animação aleatória (para uns subirem mais rápido que outros)
        const duracaoAleatoria = Math.random() * 4 + 4; // entre 4s e 8s
        coracao.style.animationDuration = `${duracaoAleatoria}s`;
        
        // Adiciona ao container na tela
        container.appendChild(coracao);
        
        // Remove o elemento do HTML após a animação acabar para não travar o site
        setTimeout(() => {
            coracao.remove();
        }, duracaoAleatoria * 1000);
    }

    // Cria corações continuamente a cada 400 milissegundos
    setInterval(gerarCoracao, 400);
}


/* ==========================================================================
   B. CONTADOR DE TEMPO JUNTOS (REAL-TIME)
   ========================================================================== */
function iniciarContadorTempo() {
    const displayTimer = document.getElementById('timer');
    if (!displayTimer) return;

    function atualizarRelogio() {
        const agora = new Date();
        const diferencaEmMilissegundos = agora - DATA_INICIO_NAMORO;

        // Se a data inserida for no futuro, evita números negativos
        if (diferencaEmMilissegundos < 0) {
            displayTimer.innerText = "O nosso tempo começa em breve! 🥰";
            return;
        }

        // Cálculos matemáticos para converter milissegundos em tempo legível
        const segundosTotais = Math.floor(diferencaEmMilissegundos / 1000);
        const minutosTotais = Math.floor(segundosTotais / 60);
        const horasTotais = Math.floor(minutosTotais / 60);
        
        // Valores finais formatados
        const dias = Math.floor(horasTotais / 24);
        const horas = horasTotais % 24;
        const minutos = minutosTotais % 60;
        const segundos = segundosTotais % 60;

        // Monta o texto bonito para exibir na tela
        displayTimer.innerHTML = `
            <span style="font-size: 1.6rem; font-weight: bold;">${dias}</span> dias, 
            <span>${horas}</span>h 
            <span>${minutos}</span>m 
            e <span>${segundos}</span>s
        `;
    }

    // Executa imediatamente e depois repete a cada 1 segundo (1000ms)
    atualizarRelogio();
    setInterval(atualizarRelogio, 1000);
}


/* ==========================================================================
   C. EFEITO MÁQUINA DE ESCREVER (CARTINHA)
   ========================================================================== */
function dispararEfeitoMaquinaEscrever() {
    const containerCarta = document.getElementById('typewriterLetter');
    if (!containerCarta) return;

    let indexCaractere = 0;
    containerCarta.innerText = ""; // Garante que começa vazio

    function digitar() {
        if (indexCaractere < TEXTO_DA_CARTA.length) {
            // Adiciona caractere por caractere
            containerCarta.innerText += TEXTO_DA_CARTA.charAt(indexCaractere);
            indexCaractere++;
            
            // Velocidade da digitação em milissegundos (quanto menor, mais rápido)
            // 50ms dá um efeito de leitura confortável e natural
            setTimeout(digitar, 50);
            
            // Faz a página rolar suavemente para baixo enquanto a carta digita sozinha
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }
    }

    // Inicia o processo de digitação
    digitar();
}

// Esta função será chamada externamente pelo arquivo 'game.js' quando a Emily vencer o quiz!
function liberarRecompensaFinal() {
    const secaoCarta = document.getElementById('loveLetterSection');
    if (secaoCarta) {
        secaoCarta.classList.remove('hidden'); // Mostra a seção no HTML
        dispararEfeitoMaquinaEscrever();       // Inicia o efeito do texto
    }
}


/* ==========================================================================
   D. DISPARO INICIAL DO SITE
   ========================================================================== */
// Aguarda todo o HTML carregar na tela para iniciar as funções de fundo
document.addEventListener('DOMContentLoaded', () => {
    criarChuvaDeCoracoes();
    iniciarContadorTempo();
});