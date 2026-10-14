(() => {
    const secao = document.querySelector('.expandir');
    if (!secao) return;

    const QUANDO_ABRIR = 0.5; // 0.5 = abre na metade da rolagem com a imagem parada

    function verificar() {
        const topo = secao.getBoundingClientRect().top;
        const total = secao.offsetHeight - window.innerHeight; // rolagem com a imagem parada
        const rolado = -topo; // 0 quando a imagem começa a ficar parada

        secao.style.setProperty('--p', rolado >= total * QUANDO_ABRIR ? 1 : 0);
    }

    window.addEventListener('scroll', verificar, { passive: true });
    window.addEventListener('resize', verificar);
    verificar();
})();