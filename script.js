function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



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




/* TRANSIÇÃO DE IMAGENS DO HERO SECTION */

let index = 1;

async function ChangeText(){
    const text1 = document.querySelector(`.text-1`);
    const text2 = document.querySelector(`.text-2`);
    const text3 = document.querySelector(`.text-3`);

    async function Text_1(){
        text3.style.opacity = 0;
        await sleep(600);
        text3.style.display = 'none';

        text1.style.display = 'block';
    }

    async function Text_2(){
        text1.style.opacity = 0;
        await sleep(600);
        text1.style.display = 'none';
        text2.style.display = 'flex';
    }

    if (index == 0) Text_1();
    else if (index == 1) Text_2();
    else if (index == 2) Bg_1();
}

async function ChangeBackground(){
    const bg = document.getElementById('.background');

    function Bg_1(){
        
    }

    async function Bg_2(){
    }

    function Bg_3(){
    }

    if (index == 0) Bg_1();
    else if (index == 1) Bg_2();
    else if (index == 2) Bg_1();
}

function ChangeDots(){
    const dots = document.querySelectorAll('.dot');

    dots.forEach((dot, i) => {                          // muda a cor dos dots
        dot.classList.toggle('active', i === index);
    });
}

setInterval(() => {
    ChangeText();
    ChangeBackground();                                 // muda a imagem de fundo

    ChangeDots();                                       // muda a cor dos dots

    index = (index + 1) % 3;                            // incrementa o index
}, 5000);




/* TRANSIÇÃO DE ITENS DO PORTFÓLIO */

let num_item_atual = 1;  // numero do item atual
const total_items = 3;  // total de items no carrossel

function ChangeButton(){
    const dots_port = document.querySelectorAll('.dot-port');
    
    dots_port.forEach((dot, i = 0) => {
        const index = Number(dot.dataset.index); 
        dot.classList.toggle('active', index == num_item_atual);
    });
}

async function ChangePortItemToLeft(num_item_seguinte){
    if (num_item_atual == 1) return;

    const item_atual = document.getElementById(`item-${num_item_atual}`);
    const prox_item = document.getElementById(`item-${num_item_seguinte}`)

    prox_item.style.transitionDuration = '.6s'

    item_atual.style.transition = 'transform 0.4s ease-in';
    item_atual.style.transform = 'translateX(100%)';

    await sleep(400);
    item_atual.style.display = 'none'

    prox_item.style.display = 'flex'
    await sleep(50);
    prox_item.style.transition = `transform 0.5s ease-out`;
    prox_item.style.transform = `translate(0%)`

    num_item_atual--;
    ChangeButton();
}

async function ChangePortItemToRight(num_item_seguinte){
    if (num_item_atual == total_items) return;

    const item_atual = document.getElementById(`item-${num_item_atual}`);
    const prox_item = document.getElementById(`item-${num_item_seguinte}`)

    prox_item.style.transitionDuration = '.6s'

    item_atual.style.transition = 'transform 0.4s ease-in';
    item_atual.style.transform = 'translateX(-100%)';

    await sleep(400);
    item_atual.style.display = 'none'

    prox_item.style.display = 'flex'
    await sleep(50);
    prox_item.style.transition = `transform 0.5s ease-out`;
    prox_item.style.transform = `translate(0%)`

    num_item_atual++;
    ChangeButton();
}

const btn_left = document.querySelector('.fa-chevron-left');
const btn_right = document.querySelector('.fa-chevron-right');

const container_item = document.querySelector('.container-item');
const all_dots = document.querySelectorAll('.dot-port');

btn_left.addEventListener('click', () => ChangePortItemToLeft(num_item_atual - 1));
btn_right.addEventListener('click', () => ChangePortItemToRight(num_item_atual + 1));


all_dots.forEach((dot) => {
    dot.addEventListener('click', async () => {
        const index = Number(dot.dataset.index);    

        if (index < num_item_atual) 
            await ChangePortItemToLeft(index);
        else if (index > num_item_atual) 
            await ChangePortItemToRight(index);

        ChangeButton();
    });
});




/* MASCARA DE TELEFONE */

document.getElementById('telefone').addEventListener('input', function(e) {
    let v = e.target.value.replace(/\D/g, '');
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
    v = v.replace(/(\d{5})(\d)/, '$1-$2');
    e.target.value = v;
  });
