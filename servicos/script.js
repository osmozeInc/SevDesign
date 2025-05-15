function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* BOTÃO DE MENU */
{
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
}


/* ANIMAÇÃO DA LISTA DE SUMARIO */
{
    const summary_item = document.querySelectorAll('.item-list');

    for (let i = 1; i < summary_item.length; i++) {
        summary_item[i].style.animationDelay = i * 0.3 + 's';
    }
}


/* ANIMAÇÃO DO TEXTO DA PÁGINA */
{
    const texts = document.querySelectorAll('.container-tt');

    for (let i = 0; i < texts.length; i++) {
        texts[i].style.animationDelay = i * 0.5 + 's';
    }
}


/* DROPDOWN DOS SERVIÇOS */
{
    const button = document.getElementById('services-dropdown');
    const dropdown = document.querySelector('.dropdown-container');

    button.addEventListener('mouseenter', () => {
        dropdown.classList.add('active');
    });

    button.addEventListener('click', () => {
        dropdown.classList.toggle('active');
    });

    dropdown.addEventListener('mouseleave', () => {
        dropdown.classList.remove('active');
    });
}
