// Script feito para permitir a reutilização do header e footer em todas as paginas

async function carregarComponente(idAlvo, arquivo) {
    const alvo = document.getElementById(idAlvo);
    if (!alvo) return false;

    try {
        const resposta = await fetch(arquivo);
        if (!resposta.ok) throw new Error("Erro ao carregar " + arquivo);

        let html = await resposta.text();

        // O Live Server injeta um <script> de recarregamento no meio do HTML.
        // Removemos para ele não quebrar o componente (só afeta o ambiente de desenvolvimento).
        html = html.replace(/<!-- Code injected by live-server -->[\s\S]*?(<\/script>|$)/g, "");

        alvo.innerHTML = html;
        return true;
    } catch (erro) {
        console.error(erro);
        return false;
    }
}

function carregarScript(src) {
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
}

async function iniciar() {
    const [headerOk, footerOk] = await Promise.all([
        carregarComponente("header-placeholder", "./header.html"),
        carregarComponente("footer-placeholder", "./footer.html"),
    ]);

    // Os scripts só rodam depois que o HTML correspondente já está no DOM
    if (headerOk) carregarScript("./scripts/menu.js");
    if (footerOk) carregarScript("./scripts/footer.js");
}

iniciar();