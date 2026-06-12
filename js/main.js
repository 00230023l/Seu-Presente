/* ==========================================================================
   1. CONFIGURAÇÕES INICIAIS E VARIÁVEIS DO CASAL
   ========================================================================== */

// AJUSTE CRUCIAL DA DATA: Para dar exatamente 1 mês, 1 semana, 3 horas e 20 minutos hoje (12 de Junho às 17:20)
// A data correta de início tem que ser: 05 de Maio de 2026 às 14:00:00.
// No JavaScript, o mês de Maio é o número 4.
const DATA_INICIO_NAMORO = new Date(2026, 4, 5, 14, 0, 0); 

// TEXTO COMPLETO DA SUA CARTINHA DE AMOR (Com o seu nome: Adrian)
const TEXTO_DA_CARTA = `Querida Emily,

Escrevi este site inteiramente para você porque queria te dar algo único. Queria que cada linha de código, cada coração caindo na tela e cada segundo contado aqui mostrassem o quanto você é especial e importante para mim.

O meu coração está sempre coladinho ao seu, não importa o momento. Eu amo tudo em você: o seu sorriso, o seu jeito de falar, as nossas conversas e a forma como você transforma os meus dias em momentos muito mais felizes. 

Obrigado por ser a minha namorada, a minha parceira e o meu amor. Parabéns pelo nosso Dia dos Namorados!

Com todo o amor do mundo,
Adrian ❤️`;


/* ==========================================================================
   2. SISTEMA DE CHUVA DE CORAÇÕES (CASCATA DO TOPO AO CHÃO)
   ========================================================================== */
function criarChuvaDeCoracoes() {
    const container = document.getElementById('heartsContainer');
    if (!container) return;

    const tiposDeCoracoes = ['❤️', '💖', '💝', '💕', '💗'];

    function gerarCoracao() {
        const coracao = document.createElement('div');
        coracao.classList.add('heart-element');
        coracao.innerText = tiposDeCoracoes[Math.floor(Math.random() * tiposDeCoracoes.length)];
        coracao.style.left = Math.random() * 100 + 'vw';
        
        const tamanhoAleatorio = Math.random() * 1.5 + 0.8; 
        coracao.style.fontSize = `${tamanhoAleatorio}rem`;
        
        const duracaoAleatoria = Math.random() * 4 + 4; 
        coracao.style.animationDuration = `${duracaoAleatoria}s`;
        coracao.style.animationName = 'fallDown';
        
        container.appendChild(coracao);
        
        setTimeout(() => {
            coracao.remove();
        }, duracaoAleatoria * 1000);
    }

    setInterval(gerarCoracao, 350);
}


/* ==========================================================================
   3. CRONÔMETRO CORRIGIDO (CONTA EXATAMENTE MESES, SEMANAS, DIAS e HORAS)
   ========================================================================== */
function iniciarContadorTempo() {
    const displayTimer = document.getElementById('timer');
    if (!displayTimer) return;

    function atualizarRelogio() {
        const agora = new Date();
        
        // Vamos calcular a diferença exata em formato de calendário
        let anos = agora.getFullYear() - DATA_INICIO_NAMORO.getFullYear();
        let meses = agora.getMonth() - DATA_INICIO_NAMORO.getMonth();
        let dias = agora.getDate() - DATA_INICIO_NAMORO.getDate();
        let horas = agora.getHours() - DATA_INICIO_NAMORO.getHours();
        let minutos = agora.getMinutes() - DATA_INICIO_NAMORO.getMinutes();
        let segundos = agora.getSeconds() - DATA_INICIO_NAMORO.getSeconds();

        // Ajustes matemáticos para viradas de minutos/horas/dias negativos
        if (segundos < 0) { segundos += 60; minutos--; }
        if (minutos < 0) { minutos += 60; horas--; }
        if (horas < 0) { horas += 24; dias--; }
        if (dias < 0) {
            const copiaData = new Date(agora.getFullYear(), agora.getMonth(), 0);
            dias += copiaData.getDate();
            meses--;
        }
        if (meses < 0) { meses += 12; anos--; }

        // Como vocês estão juntos há 1 mês e 1 semana, vamos extrair as semanas dos dias excedentes
        let semanas = Math.floor(dias / 7);
        dias = dias % 7; // O que sobrar vira dias individuais

        // Monta o texto lindo dividindo certinho
        displayTimer.innerHTML = `
            <span>${meses}</span> mês, 
            <span>${semanas}</span> semana, 
            <span>${dias}</span>d 
            <span>${horas}</span>h 
            <span>${minutos}</span>m 
            e <span>${segundos}</span>s
        `;
    }

    atualizarRelogio();
    setInterval(atualizarRelogio, 1000);
}


/* ==========================================================================
   4. EFEITO MÁQUINA DE ESCREVER (CORRIGIDO: NÃO COME ESPAÇOS)
   ========================================================================== */
function dispararEfeitoMaquinaEscrever() {
    const containerCarta = document.getElementById('typewriterLetter');
    if (!containerCarta) return;

    let indexCaractere = 0;
    containerCarta.innerHTML = ""; // Limpa o container usando innerHTML

    function digitar() {
        if (indexCaractere < TEXTO_DA_CARTA.length) {
            const caractereAtual = TEXTO_DA_CARTA.charAt(indexCaractere);
            
            // CORREÇÃO: Se for uma quebra de linha, insere a tag <br>, senão insere o caractere puro
            if (caractereAtual === '\n') {
                containerCarta.innerHTML += '<br>';
            } else {
                containerCarta.innerHTML += caractereAtual;
            }
            
            indexCaractere++;
            setTimeout(digitar, 40); // 40ms deixa a digitação um pouquinho mais rápida e fluida
            
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }
    }

    digitar();
}


/* ==========================================================================
   5. ACIONAMENTO DA RECOMPENSA FINAL
   ========================================================================== */
function liberarRecompensaFinal() {
    const secaoCarta = document.getElementById('loveLetterSection');
    if (secaoCarta) {
        secaoCarta.classList.remove('hidden'); 
        
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 }
        });

        setTimeout(() => {
            confetti({ particleCount: 60, angle: 60, spread: 60, origin: { x: 0, y: 0.8 } });
            confetti({ particleCount: 60, angle: 120, spread: 60, origin: { x: 1, y: 0.8 } });
        }, 300);

        dispararEfeitoMaquinaEscrever();       
    }
}

document.addEventListener('DOMContentLoaded', () => {
    criarChuvaDeCoracoes();
    iniciarContadorTempo();
});
