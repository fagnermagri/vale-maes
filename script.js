const video = document.getElementById('lacoVideo');
const videoContainer = document.getElementById('video-container');
const hint = document.getElementById('hint-text');
const voucherCard = document.getElementById('voucher-card');

const whatsappUrl = "https://api.whatsapp.com/send?phone=555189094308&text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20minha%20consulta%20referente%20ao%20voucher%20de%20dia%20das%20mães!%20&fbclid=PAT01DUARY0utleHRuA2FlbQIxMABzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAadMwSDwY-ncKVjrl-MKcXVE_LtCPmjs6mzynWjbUXM_skUyM1qgPAlo7yqzpg_aem_y02LFnoNjpAMjPCSBwHpfQ";

videoContainer.addEventListener('click', () => {
    // Esconde o texto de instrução imediatamente
    if(hint) hint.style.display = 'none';
    
    // Inicia o vídeo
    video.play().catch(error => {
        console.log("O autoplay/play precisa de interação do usuário.");
    });
});

// Função para diminuir o volume gradualmente
function fadeOutAudio(videoElement) {
    const fadePoint = 3; // O som começa a baixar quando faltarem 1.5 segundos para o fim
    
    const interval = setInterval(() => {
        // Calcula quanto tempo falta para o fim
        const timeLeft = videoElement.duration - videoElement.currentTime;

        if (timeLeft <= fadePoint && videoElement.volume > 0) {
            // Reduz o volume em passos de 0.05
            let newVolume = videoElement.volume - 0.05;
            videoElement.volume = Math.max(0, newVolume); // Garante que não fique negativo
        }

        // Quando o volume chegar a zero ou o vídeo acabar, limpa o intervalo
        if (videoElement.volume <= 0 || videoElement.ended) {
            clearInterval(interval);
        }
    }, 100); // Executa a verificação a cada 100 milisegundos
}

// Inicia o monitoramento do volume assim que o vídeo começar a tocar
videoContainer.addEventListener('click', () => {
    if(hint) hint.style.display = 'none';
    video.play();
    fadeOutAudio(video); // Ativa a função de fade out
});

video.onended = function() {
    videoContainer.style.transition = 'opacity 0.6s ease';
    videoContainer.style.opacity = '0';
    
    setTimeout(() => {
        videoContainer.style.display = 'none';
        document.getElementById('whatsapp-link').href = whatsappUrl;
        voucherCard.classList.add('show-voucher');
    }, 600);
}; 

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const nome = urlParams.get('nome');
    if (nome) {
        document.getElementById('guest-name').innerText = decodeURIComponent(nome);
    }
};