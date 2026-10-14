(() => {
    
const secao = document.querySelector('.scroll-video');
const video = secao.querySelector('video');
const cards = [...secao.querySelectorAll('.card')];

let alvo = 0;
let atual = 0;

function calcularProgresso() {
    const topo = secao.getBoundingClientRect().top;
    const total = secao.offsetHeight - window.innerHeight;
    alvo = Math.min(1, Math.max(0, -topo / total));
}

function animar() {
    atual += (alvo - atual) * 0.1; // suaviza o movimento

    if (video.duration && Math.abs(video.currentTime - atual * video.duration) > 0.01) {
        video.currentTime = atual * video.duration;
    }

    cards.forEach(card => {
        const inicio = parseFloat(card.dataset.inicio);
        const fim = parseFloat(card.dataset.fim);
        card.classList.toggle('ativo', atual >= inicio && atual < fim);
    });

    requestAnimationFrame(animar);
}

window.addEventListener('scroll', calcularProgresso, { passive: true });
window.addEventListener('resize', calcularProgresso);
video.addEventListener('loadedmetadata', calcularProgresso);
calcularProgresso();
animar();

})();