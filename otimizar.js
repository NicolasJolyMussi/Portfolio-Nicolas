const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const pastaOrigem = './img';
const pastaDestino = './img/webp';

if (!fs.existsSync(pastaDestino)) {
    fs.mkdirSync(pastaDestino, { recursive: true });
}

const arquivos = fs.readdirSync(pastaOrigem).filter(f => /\.(png|jpe?g)$/i.test(f));

arquivos.forEach(arquivo => {
    const entrada = path.join(pastaOrigem, arquivo);
    const nomeSaida = arquivo.replace(/\.(png|jpe?g)$/i, '.webp');
    const saida = path.join(pastaDestino, nomeSaida);

    sharp(entrada)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(saida)
        .then(() => {
            const tamanhoAntes = (fs.statSync(entrada).size / 1024).toFixed(0);
            const tamanhoDepois = (fs.statSync(saida).size / 1024).toFixed(0);
            console.log(`${arquivo}: ${tamanhoAntes}KB → ${nomeSaida}: ${tamanhoDepois}KB`);
        })
        .catch(err => console.error(`Erro em ${arquivo}:`, err.message));
});