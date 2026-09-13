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

function mostrarAlerta(texto) {
    let alerta = document.createElement('div');
    alerta.className = 'alerta-projeto';
    alerta.textContent = texto;

    document.body.appendChild(alerta);

    setTimeout(() => alerta.classList.add('mostrar'), 10);

    setTimeout(() => {
        alerta.classList.remove('mostrar');
        setTimeout(() => alerta.remove(), 400);
    }, 3000);
}

const linkEmail = document.querySelector('.contato-link[href^="mailto:"]');

if (linkEmail) {
    linkEmail.addEventListener('click', e => {
        const email = linkEmail.getAttribute('href').replace('mailto:', '');

        if (navigator.clipboard) {
            navigator.clipboard.writeText(email)
                .then(() => mostrarAlerta('📋 E-mail copiado: ' + email))
                .catch(() => mostrarAlerta('✉️ ' + email));
        }
        // Não usamos preventDefault: se o usuário tiver um cliente de
        // e-mail configurado, o mailto ainda tenta abrir normalmente.
    });
}

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

const formulario = document.getElementById('formulario');
if (formulario) {
    formulario.addEventListener('submit', enviarMensagem);
}

const botoesFiltro = document.querySelectorAll('.filtro-botao');
const cardsProjetos = document.querySelectorAll('.projetos-card');

botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
        botoesFiltro.forEach(b => b.classList.remove('ativo'));
        botao.classList.add('ativo');

        const filtro = botao.dataset.filtro;

        cardsProjetos.forEach(card => {
            const categoria = card.dataset.categoria;
            const mostrar = filtro === 'todos' || categoria === filtro;
            card.classList.toggle('escondido', !mostrar);
            if (mostrar) card.classList.add('visivel'); // garante que apareça mesmo se o observer não disparou ainda
        });
    });
});

const elementosReveal = document.querySelectorAll('.reveal');

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada, indice) => {
        if (entrada.isIntersecting) {
            setTimeout(() => {
                entrada.target.classList.add('visivel');
            }, indice * 80);
            observador.unobserve(entrada.target);
        }
    });
}, {
    threshold: 0.15
});

elementosReveal.forEach(elemento => observador.observe(elemento));

const botaoTopo = document.getElementById('botao-topo');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        botaoTopo.classList.add('visivel');
    } else {
        botaoTopo.classList.remove('visivel');
    }
});

botaoTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});