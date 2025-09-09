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

// Alerta para links de código indisponíveis
document.querySelectorAll('.link-projeto a.codigo').forEach(link => {
    link.addEventListener('click', e => {
        // se o href estiver vazio -> mostra alerta em vez de abrir link
        if (!link.getAttribute('href')) {
            e.preventDefault();

            let alerta = document.createElement('div');
            alerta.className = 'alerta-projeto';
            alerta.textContent = '🚧 Código não disponível no momento';

            document.body.appendChild(alerta);

            // animação de entrada
            setTimeout(() => alerta.classList.add('mostrar'), 10);

            // remove após 3s
            setTimeout(() => {
                alerta.classList.remove('mostrar');
                setTimeout(() => alerta.remove(), 400);
            }, 3000);
        }
    });
});
