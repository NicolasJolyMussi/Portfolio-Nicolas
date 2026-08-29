function enviarMensagem(event) {

    event.preventDefault()

    const nome = document.getElementById('nome').value;
    const mensagem = document.getElementById('mensagem').value;
    const telefone = '5541999005683'

    const texto = `Olá, me chamo ${nome}, ${mensagem}`

    const msgFormatada = encodeURIComponent(texto)

    const url = `https://wa.me/${telefone}?text=${msgFormatada}`

    console.log(url)

    window.open(url, '_blank')

}

const menu = document.querySelector('.menu');
const toggleBtn = document.querySelector('.menu-toggle');
const overlay = document.querySelector('.menu-overlay');

function fecharMenu() {
    menu.classList.remove('aberto');
    overlay.classList.remove('aberto');
    toggleBtn.setAttribute('aria-expanded', 'false');
}

if (toggleBtn && menu && overlay) {
    toggleBtn.addEventListener('click', () => {
        const aberto = menu.classList.toggle('aberto');
        overlay.classList.toggle('aberto', aberto);
        toggleBtn.setAttribute('aria-expanded', aberto);
    });

    overlay.addEventListener('click', fecharMenu);

    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', fecharMenu);
    });
}

document.querySelectorAll('.link-projeto a.codigo').forEach(link => {
    link.addEventListener('click', e => {
        if (!link.getAttribute('href') || link.getAttribute('href') === '#') {
            e.preventDefault();

            let alerta = document.createElement('div');
            alerta.className = 'alerta-projeto';
            alerta.textContent = '🚧 Código não disponível no momento';

            document.body.appendChild(alerta);

            setTimeout(() => alerta.classList.add('mostrar'), 10);

            setTimeout(() => {
                alerta.classList.remove('mostrar');
                setTimeout(() => alerta.remove(), 400);
            }, 3000);
        }
    });
});

// Esconde o botão do menu ao rolar para baixo, mostra ao rolar para cima
let ultimoScroll = 0;

// Só mostra o botão quando estiver perto do topo da página
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        toggleBtn.classList.add('escondido');
    } else {
        toggleBtn.classList.remove('escondido');
    }

    if (menu.classList.contains('aberto')) {
        fecharMenu();
    }
});