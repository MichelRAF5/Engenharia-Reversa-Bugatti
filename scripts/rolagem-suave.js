/*
Este script mantém todas as páginas com a rolagem suave e não quebra o menu popup
Para chama-lo na pagina colocar a tag: <script type="module" src="./scripts/rolagem-suave.js"></script>
após o <main> e antes do script de componentes (header e footer) 
*/

import Lenis from "https://cdn.jsdelivr.net/npm/lenis@1/+esm";

const reduzirMovimento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (!reduzirMovimento) {
    const lenis = new Lenis({
        lerp: 0.06,
        smoothWheel: true
    });

    // Fica global para o menu.js poder pausar e retomar a rolagem
    window.lenis = lenis;

    const galeria = document.querySelector("#images-grid-primary");
    let pausa;

    lenis.on("scroll", ({ velocity }) => {
        if (!galeria) return;

        // Quanto maior a velocidade, maior o blur (máximo de 1.2px)
        const blur = Math.min(Math.abs(velocity) * 0.06, 1.2);

        galeria.style.setProperty("--scroll-blur", `${blur}px`);

        clearTimeout(pausa);
        pausa = setTimeout(() => {
            galeria.style.setProperty("--scroll-blur", "0px");
        }, 120);
    });

    function animar(tempo) {
        lenis.raf(tempo);
        requestAnimationFrame(animar);
    }

    requestAnimationFrame(animar);
}