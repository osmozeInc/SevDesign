/* transição de imagens do hero section */

const imagens = [
    'url("../imagens/fundo-1.png")',
    'url("../imagens/fundo-2.png")',
    'url("../imagens/fundo-3.png")'
];

const hero = document.querySelector('.hero.img');

let index = 0;

setInterval(() => {
    document.body.style.backgroundImage = imagens[index];
    index = (index + 1) % imagens.length;
}, 5000);