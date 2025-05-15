/* FUNÇÕES AUXILIARES */

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


/* BOTÃO DE MENU */
{
    const menu_button = document.querySelector('.menu-button');
    let side_menu_check = false;

    menu_button.addEventListener('click', () => {   // chama as funções de menu quando o botão é clicado
        AnimateBar();                               // animação das opções na barra de opções
        ShowSideMenu();                             // mostra ou esconde o menu lateral
    });

    function AnimateBar(){
        if (side_menu_check === false) {
            menu_button.style.right = '1vh';
            menu_button.style.top = '3vh';      // move o botão para o canto superior direito 

            for (let i = 1; i <= 3; i++){       // anima as linhas da barra formando um 'X'
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
            menu_button.style.top = '10vh';     // move o botão para a posição inicial

            for (let i = 1; i <= 3; i++){       // anima as linhas da barra para a posição inicial
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
            side_menu.style.transitionDuration = '.5s';
            side_menu.style.pointerEvents = 'auto';
            side_menu_container.style.display = 'block';
            side_menu.style.transform = 'translateX(0vh)';
            side_menu_check = true;
        }
        else {
            side_menu.style.transform = 'translateX(35vh)';
            await new Promise(resolve => setTimeout(resolve, 500));
            side_menu_container.style.display = 'none';
            side_menu.style.pointerEvents = 'none';
            side_menu_check = false;
        }
    }
}


/* DROPDOWN DOS SERVIÇOS */
{
    const button = document.getElementById('services-dropdown');
    const dropdown = document.querySelector('.dropdown-container');

    button.addEventListener('click', () => {
        dropdown.classList.toggle('active');
        console.log('clicou');
    });
}


/* TRANSIÇÃO DE IMAGENS DO HERO SECTION */
{
    let index = 0;
    let in_out = true;

    function ShowText(){
        const texts = document.querySelectorAll('.text-1, .text-2, .text-3');
        texts[(index + 1) % 3].style.display = 'block';
    }

    async function HideText(){
        const texts = document.querySelectorAll('.text-1, .text-2, .text-3');
        
        texts[index].style.opacity = 0;
        await sleep(600);

        texts[index].style.display = 'none';
        texts[index].style.opacity = 1;
    }

    async function ChangeBackground(){
        const bg_1 = document.querySelector('.bg-1');
        const bg_2 = document.querySelector('.bg-2');
        const bg_3 = document.querySelector('.bg-3');

        if (index == 2) {
            HideText();
            await sleep(600);

            bg_3.style.transform = 'translatex(100%)';
            bg_1.style.transform = 'translatex(0%)';
            await sleep(600);

            bg_2.style.transform = 'translateX(0%)';
            bg_3.style.transform = 'translateX(0%)';
            ShowText();
        }
        
        else if (index == 0) {
            HideText();
            await sleep(600);

            bg_1.style.transform = 'translateX(-100%)';
            await sleep(600);
            ShowText();
        }
        
        else if (index == 1) {
            HideText();
            await sleep(600);

            bg_2.style.transform = 'translateX(-100%)';
            await sleep(600);
            ShowText();
        }
        
    }

    function ChangeDots(){
        const dots = document.querySelectorAll('.dot');

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    async function ExecutarCiclo(){
        await ChangeBackground();                           // muda a imagem de fundo
        
        index = (index + 1) % 3;
        ChangeDots();                                       // muda a cor dos dots
    }

    setInterval(ExecutarCiclo, 10000);
}


/* TRANSIÇÃO DE ITENS DO PORTFÓLIO */
{
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
}


/* MASCARA DE TELEFONE */
{
    document.getElementById('telefone').addEventListener('input', function(e) {
        let v = e.target.value.replace(/\D/g, '');
        v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
        v = v.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = v;
    });
}
