/* ==========================================================================
   1. CONFIGURAÇÕES INICIAIS E VARIÁVEIS DO CASAL
   ========================================================================== */

// AJUSTE A DATA DO INÍCIO DO NAMORO AQUI!
// Formato: Ano, Mês (Atenção: Janeiro é 0, Fevereiro é 1, Março é 2... Junho é 5)
// Configurei abaixo como exemplo o dia 12 de Junho de 2025. Mude para a data real de vocês!
const DATA_INICIO_NAMORO = new Date(2026, 4, 5, 14, 0, 0); 

// TEXTO COMPLETO DA SUA CARTINHA DE AMOR
// Sinta-se livre para aumentar ou reescrever este texto como quiser dentro das crases (``).
const TEXTO_DA_CARTA = `Querida Emily,

Escrevi este site inteiramente para você porque queria te dar algo único. Queria que cada linha de código, cada coração caindo na tela e cada segundo contado aqui mostrassem o quanto você é especial e importante para mim.

O meu coração está sempre coladinho ao seu, não importa o momento. Eu amo tudo em você: o seu sorriso, o seu jeito de falar, as nossas conversas e a forma como você transforma os meus dias em momentos muito mais felizes. 

Obrigado por ser a minha namorada, a minha parceira e o meu amor. Parabéns pelo nosso Dia dos Namorados!

Com todo o amor do mundo,
Seu Nome ❤️`;


/* ==========================================================================
   2. SISTEMA DE CHUVA DE CORAÇÕES (CASCATA DO TOPO AO CHÃO)
   ========================================================================== */
function criarChuvaDeCoracoes() {
    const container = document.getElementById('heartsContainer');
    if (!container) return;

    // Lista de símbolos de coração para gerar variedade visual na queda
    const tiposDeCoracoes = ['❤️', '💖', '💝', '💕', '💗'];

    // Função interna que fabrica e solta um coração por vez
    function gerarCoracao() {
        const coracao = document.createElement('div');
        coracao.classList.add('heart-element');
        
        // Seleciona um emoji aleatório da lista
        coracao.innerText = tiposDeCoracoes[Math.floor(Math.random() * tiposDeCoracoes.length)];
        
        // Define uma posição horizontal aleatória (entre 0% e 100% da largura da tela)
        coracao.style.left = Math.random() * 100 + 'vw';
        
        // Define um tamanho aleatório para dar sensação de profundidade no visual
        const tamanhoAleatorio = Math.random() * 1.5 + 0.8; // Varia entre 0.8rem e 2.3rem
        coracao.style.fontSize = `${tamanhoAleatorio}rem`;
        
        // Define uma velocidade de queda aleatória (uns caem mais rápido, outros mais devagar)
        const duracaoAleatoria = Math.random() * 4 + 4; // Varia entre 4 e 8 segundos
        coracao.style.animationDuration = `${duracaoAleatoria}s`;
        
        // Vincula explicitamente à animação de queda estruturada no CSS
        coracao.style.animationName = 'fallDown';
        
        // Injeta o coração estruturado dentro do HTML do site
        container.appendChild(coracao);
        
        // Remove o coração do código assim que ele terminar de cair para o site não travar
        setTimeout(() => {
            coracao.remove();
        }, duracaoAleatoria * 1000);
    }

    // Cria um novo coração caindo a cada 350 milissegundos
    setInterval(gerarCoracao, 350);
}


/* ==========================================================================
   3. CRONÔMETRO DO TEMPO JUNTO (ATUALIZAÇÃO SEGUNDO A SEGUNDO)
   ========================================================================== */
function iniciarContadorTempo() {
    const displayTimer = document.getElementById('timer');
    if (!displayTimer) return;

    function atualizarRelogio() {
        const agora = new Date();
        const diferencaEmMilissegundos = agora - DATA_INICIO_NAMORO;

        // Se a data configurada for inválida ou no futuro, evita exibir valores negativos
        if (diferencaEmMilissegundos < 0) {
            displayTimer.innerText = "O nosso tempo está prestes a começar! 🥰";
            return;
        }

        // Conversões matemáticas de milissegundos para períodos de tempo legíveis
        const segundosTotais = Math.floor(diferencaEmMilissegundos / 1000);
        const minutosTotais = Math.floor(segundosTotais / 60);
        const horasTotais = Math.floor(minutosTotais / 60);
        
        // Separação modular dos valores finais do relógio
        const dias = Math.floor(horasTotais / 24);
        const horas = horasTotais % 24;
        const minutos = minutosTotais % 60;
        const segundos = segundosTotais % 60;

        // Injeta o HTML estilizado com tags <span> para os números brilharem via CSS
        displayTimer.innerHTML = `
            <span>${dias}</span> dias, 
            <span>${horas}</span>h 
            <span>${minutos}</span>m 
            e <span>${segundos}</span>s
        `;
    }

    // Aciona o relógio imediatamente ao abrir a página
    atualizarRelogio();
    
    // Repete a atualização a cada 1 segundo (1000ms) de forma perpétua
    setInterval(atualizarRelogio, 1000);
}


/* ==========================================================================
   4. EFEITO MÁQUINA DE ESCREVER (DIGITAÇÃO AUTOMÁTICA DA CARTA)
   ========================================================================== */
function dispararEfeitoMaquinaEscrever() {
    const containerCarta = document.getElementById('typewriterLetter');
    if (!containerCarta) return;

    let indexCaractere = 0;
    containerCarta.innerText = ""; // Limpa qualquer resquício de texto inicial

    function digitar() {
        if (indexCaractere < TEXTO_DA_CARTA.length) {
            // Adiciona a letra atual correspondente ao índice
            containerCarta.innerText += TEXTO_DA_CARTA.charAt(indexCaractere);
            indexCaractere++;
            
            // Velocidade da digitação (50ms por caractere gera um ritmo muito natural)
            setTimeout(digitar, 50);
            
            // Desce a página automaticamente acompanhando as novas linhas da carta
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }
    }

    // Inicia o loop de digitação automática
    digitar();
}


/* ==========================================================================
   5. ACIONAMENTO DA RECOMPENSA FINAL (CHAMADO PELO GAME.JS)
   ========================================================================== */
function liberarRecompensaFinal() {
    const secaoCarta = document.getElementById('loveLetterSection');
    if (secaoCarta) {
        // Torna a seção da cartinha e do selo visíveis removendo a classe utility
        secaoCarta.classList.remove('hidden'); 
        
        // EXPLOSÃO DE CONFETES PRINCIPAL (No meio da tela)
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 }
        });

        // RAJADAS DE CONFETES EXTRAS (Nas laterais esquerda e direita após 300ms)
        setTimeout(() => {
            confetti({
                particleCount: 60,
                angle: 60,
                spread: 60,
                origin: { x: 0, y: 0.8 }
            });
            confetti({
                particleCount: 60,
                angle: 120,
                spread: 60,
                origin: { x: 1, y: 0.8 }
            });
        }, 300);

        // Inicia a exibição dinâmica do texto da carta
        dispararEfeitoMaquinaEscrever();       
    }
}


/* ==========================================================================
   6. INICIALIZAÇÃO AUTOMÁTICA DO SITE
   ========================================================================== */
// Aguarda o navegador ler e renderizar todo o HTML antes de ativar os scripts visuais
document.addEventListener('DOMContentLoaded', () => {
    criarChuvaDeCoracoes();
    iniciarContadorTempo();
});
