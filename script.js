
/* BOTÃO DE MENU */

const menu_button = document.querySelector('.menu-button');
let side_menu_check = false;

menu_button.addEventListener('click', () => {    // chama as funções de menu quando o botão é clicado
    AnimateBar();
    ShowSideMenu();    
});

function AnimateBar(){          // animação das opções na barra de opções
    if (side_menu_check === false) {
        menu_button.style.right = '1vh';
        menu_button.style.top = '3vh';

        for (let i = 1; i <= 3; i++){
            const bar = document.getElementById(`bar-${i}`);
            if (i === 1)
                bar.style.transform = `translateY(1vh) rotate(45deg)`;
            else if (i === 3)
                bar.style.transform = `translateY(-1vh) rotate(-45deg)`;
            else
                bar.style.opacity = 0;
        }
    }
    else {
        menu_button.style.right = '3vh';
        menu_button.style.top = '10vh';

        for (let i = 1; i <= 3; i++){
            const bar = document.getElementById(`bar-${i}`);
            bar.style.opacity = 1;
            bar.style.transform = `translate(0px, 0px) rotate(0deg)`;
        }
    }
}

async function ShowSideMenu(){
    const side_menu_container = document.querySelector('.side-menu-container');
    const side_menu = document.querySelector('.side-menu');
    
    if (side_menu_check === false) {
        side_menu_container.style.display = 'block';
        side_menu.style.transform = 'translateX(0vh)';
        side_menu_check = true;
    }
    else {
        side_menu.style.transform = 'translateX(35vh)';
        await new Promise(resolve => setTimeout(resolve, 500));
        side_menu_container.style.display = 'none';
        side_menu_check = false;
    }
}




/* transição de imagens do hero section */

const imagens = [
    'url("./imagens/fundo-1.png")',
    'url("./imagens/fundo-2.png")',
    'url("./imagens/fundo-3.png")'
];

const hero = document.querySelector('.hero');
const dots = document.querySelectorAll('.dot');

let index = 1;

setInterval(() => {
    hero.style.backgroundImage = imagens[index];        // muda a imagem de fundo

    dots.forEach((dot, i) => {                          // muda a cor dos dots
        dot.classList.toggle('active', i === index);
    });

    index = (index + 1) % imagens.length;               // incrementa o index
}, 4000);




/* TRANSIÇÃO DE ITENS DO PORTFÓLIO */

let port_item = 1;

async function ChangePortItemToLeft(){
    const item_atual = document.getElementById(`item-${port_item}`);
    const prox_item = document.getElementById(`item-${port_item + 1}`)

    item_atual.style.transitionDuration = '.5s'
    prox_item.style.transitionDuration = '.5s'
    item_atual.style.transform = `translateX(-100%)`
    await new Promise(resolve => setTimeout(resolve, 500));
    item_atual.style.display = 'none'
    prox_item.style.display = 'flex'
    await new Promise(resolve => setTimeout(resolve, 50));
    prox_item.style.transform = `translate(0%)`
        
    

}

function ChangePortItemToRight(){
    const item_atual = document.getElementById(`item-${port_item}`);

    item_atual.style.transform = `translateX(100%)`
    item_atual.style.transitionDuration = '1s'

}

const btn_left = document.querySelector('.fa-chevron-left');
const btn_right = document.querySelector('.fa-chevron-right');


btn_left.addEventListener('click', ChangePortItemToLeft)
btn_right.addEventListener('click', ChangePortItemToRight)


