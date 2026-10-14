// Script usado para o menu PopUp
(() => {

const overlay = document.getElementById('overlay-menu');
const abrir = document.querySelector('#botao-abrir-menu a');
const fechar = document.getElementById('fechar-menu');

function abrirMenu(e) {
    e.preventDefault();
    overlay.classList.add('ativo');
    document.body.style.overflow = 'hidden'; // trava a rolagem do fundo
}

function fecharMenu() {
    overlay.classList.remove('ativo');
    document.body.style.overflow = '';
}

abrir.addEventListener('click', abrirMenu);
fechar.addEventListener('click', fecharMenu);

// fecha ao clicar fora do painel
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) fecharMenu();
});

// fecha com a tecla Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharMenu();
});


const links = document.querySelectorAll(".abre-submenu");
const paineis = document.querySelectorAll(".opcoes-submenu");
const cards = document.querySelectorAll(".submenu-opcoes-cars");
const botaoMenu = document.getElementById("botao-abrir-menu");

// numera os cards e links de cada painel (0, 1, 2...) para o atraso da animação
paineis.forEach(painel => {
    painel.querySelectorAll(".submenu-opcoes-cars, .link-submenu").forEach((item, i) => {
        item.style.setProperty("--i", i);
    });
});

// pausa todos os vídeos e volta ao início
function pausarVideos() {
    document.querySelectorAll(".video-opcoes").forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
}

// mostra só o painel com o id recebido
function abrirPainel(id) {
    pausarVideos();

    links.forEach(link => {
        link.classList.toggle("ativo", link.dataset.alvo === id);
    });

    paineis.forEach(painel => {
        painel.classList.toggle("ativo", painel.id === id);
    });
}

// reinicia a animação do painel que está aberto
function reiniciarAnimacao() {
    const painelAtivo = document.querySelector(".opcoes-submenu.ativo");
    if (!painelAtivo) return;

    painelAtivo.classList.remove("ativo");
    void painelAtivo.offsetWidth;          // força o navegador a "esquecer" a animação anterior
    painelAtivo.classList.add("ativo");
}

// clique nos links
links.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        abrirPainel(link.dataset.alvo);
    });
});

// toda vez que o menu for aberto, os itens sobem de novo
botaoMenu.addEventListener("click", reiniciarAnimacao);

// vídeo toca só com o mouse em cima do card
cards.forEach(card => {
    const video = card.querySelector("video");
    if (!video) return;                    // cards com imagem não têm vídeo

    card.addEventListener("mouseenter", () => {
        video.play();
    });

    card.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
    });
});

// Current Models começa aberto
abrirPainel("sub-current");

})();