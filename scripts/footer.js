const marca = document.querySelector('.marca_gigante');

if (marca) {
    marca.addEventListener('pointermove', (e) => {
        const r = marca.getBoundingClientRect();
        marca.style.setProperty('--x', (e.clientX - r.left) + 'px');
        marca.style.setProperty('--y', (e.clientY - r.top) + 'px');
    });

    marca.addEventListener('pointerleave', () => {
        marca.style.setProperty('--x', '-999px');
        marca.style.setProperty('--y', '-999px');
    });
}