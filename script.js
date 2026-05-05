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

video.onended = function() {
    videoContainer.style.transition = 'opacity 0.6s ease';
    videoContainer.style.opacity = '0';
    
    setTimeout(() => {
        videoContainer.style.display = 'none';
        document.getElementById('whatsapp-link').href = whatsappUrl;
        voucherCard.classList.add('show-voucher');
    }, 600);
};