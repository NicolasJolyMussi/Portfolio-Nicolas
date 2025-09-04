document.addEventListener('DOMContentLoaded', function () {
    const btn = document.querySelector('.menu-hamburger'); // Botão do menu
    const menu = document.querySelector('.header-menu');   // Menu de navegação

    if (btn && menu) {
        // Alterna a classe 'open' para animar o menu
        btn.addEventListener('click', () => {
            menu.classList.toggle('open');
        });

        // Fecha o menu automaticamente ao redimensionar para desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                menu.classList.remove('open');
            }
        });
    }
});