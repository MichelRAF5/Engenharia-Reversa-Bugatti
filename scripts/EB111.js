//script responsavel por mover as imagens do EB111 jundo com o mause

(function () {
    const secao = document.getElementById('info');
    const slides = Array.from(document.querySelectorAll('.info_EB111_palco > div'));
    if (!secao || !slides.length) return;

    const N = slides.length;
    const TEXTO = 1;          
    const TRANSICAO = 0.6;    
    const SOBREPOSICAO = 0.6; 
    const TEXTO_ULTIMO_SOBE = true;

    const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
    const O = clamp(SOBREPOSICAO, 0, Math.min(TEXTO, TRANSICAO));

    
    const PASSO = TEXTO - O + TRANSICAO;
    const UNIDADES = (N - 1) * PASSO + TEXTO;

   
    secao.style.height = `${(UNIDADES + 1) * 100}vh`;

    slides.forEach((s, i) => (s.style.zIndex = i + 1));

    function render() {
        const rect = secao.getBoundingClientRect();
        const rolavel = secao.offsetHeight - window.innerHeight;
        const p = clamp(-rect.top / rolavel, 0, 1);
        const t = p * UNIDADES;

        slides.forEach((s, i) => {
            const inicio = i * PASSO; 

        
            if (i > 0) {
                const r = clamp((t - (inicio - TRANSICAO)) / TRANSICAO, 0, 1);
                s.style.clipPath = `inset(${(1 - r) * 100}% 0 0 0)`;
            }

            
            const corpo = s.querySelector('.info_EB111_tabela_corpo');
            if (!corpo) return;

            const ultimo = i === N - 1;
            const tp = (ultimo && !TEXTO_ULTIMO_SOBE)
                ? 0
                : clamp((t - inicio) / TEXTO, 0, 1);

            const offset = (i === 0) ? -35 : 0;
            const y = offset + (-100 - offset) * tp;

            corpo.style.transform = `translateY(${y}vh)`;
        });
    }

    window.addEventListener('scroll', render, { passive: true });
    window.addEventListener('resize', render);
    render();
})();