import '@styles/main.css';
import '@styles/color-sheme.css';
import '@styles/index.css';
import '@styles/reset.css';

let data = [
    { name: 'Gray Rock House', },
    { name: 'Sun House', },
    { name: 'Фахверк Solo', },
    { name: 'Завидово', },
]

     galleryLoad();

    let forward = document.querySelector('.gallery__forward');
    forward.addEventListener('click', onForwardClickHandler);

    let back = document.querySelector('.gallery__back');
    back.addEventListener('click', onBackClickHandler);

    let menu = document.querySelector('.menu');
    menu.addEventListener('click', onMenuClickHandler);

    let close = document.querySelector('.close');
    close.addEventListener('click', onSidebarCloseClickHandler);

    let orderButton = document.querySelector('.order-button');
    orderButton.addEventListener('click', onSideBarButtoClickHandler);


function onSideBarButtoClickHandler() {
    let content = document.querySelector('.intro');
    content.style.visibility = 'hidden';

    let orderButton = document.querySelector('.order-button');
    orderButton.style.visibility = 'hidden';

    let orderForm = document.querySelector('.order-form');
    orderForm.style.visibility = 'visible';

    let telInput = document.querySelector('.sidebar__order__phone input');
    telInput.addEventListener('click', onTelInputClickHandler);

    let checkBox = document.querySelector('.sidebar__order__agreement__checkBox');
    checkBox.addEventListener('click', onCheckBoxClickHandler);
}

function onCheckBoxClickHandler(e) {
    e.target.classList.toggle('sidebar__order__agreement__checkBox__checked');
}

function onTelInputClickHandler(e) {
    e.target.value = '+_(___)___-____';
}

function onSidebarCloseClickHandler() {
    let close = document.querySelector('.close');
    close.style.visibility = 'hidden';

    let menuButton = document.querySelector('.menu');
    menuButton.style.visibility = 'visible';

    let content = document.querySelector('.intro');
    content.style.visibility = 'visible';

    let menu = document.querySelector('.gmenu');
    menu.style.visibility = 'hidden';

    let orderButton = document.querySelector('.order-button');
    orderButton.style.visibility = 'visible';
}

function onMenuClickHandler(e) {
    let menu = document.querySelector('.menu');
    menu.style.visibility = 'hidden';

    let content = document.querySelector('.intro');
    content.style.visibility = 'hidden';

    let gmenu = document.querySelector('.gmenu');
    gmenu.style.visibility = 'visible';

    let orderButton = document.querySelector('.order-button');
    orderButton.style.visibility = 'hidden';

    let close = document.querySelector('.close');
    close.style.visibility = 'visible';

    let orderForm = document.querySelector('.order-form');
    orderForm.style.visibility = 'hidden';
}

function onBackClickHandler() {
    let activeSlide = document.querySelector('.gallery__slide__active');
    
    let left = +activeSlide.style.left.split('px')[0];
    let previousSlide = activeSlide.previousElementSibling;
    if (previousSlide.classList.contains('gallery__slide')) {
        activeSlide.classList.remove('gallery__slide__active');
        previousSlide.classList.add('gallery__slide__active');

        //activeSlide.style.left = left + 460 + 'px';
        let start = Date.now();
        let timer = setInterval(function () {
            let timePassed = Date.now() - start;

            if (timePassed >= 500) {
                clearInterval(timer);
                return;
            }
            drawBack(timePassed, activeSlide, left);
        }, 5);

        loadMask();

        let scrollBar = document.querySelector('#sidebar__content__scroll__progress');
        let x2 = scrollBar.getAttribute('x2');
        scrollBar.setAttribute('x2', String(+x2 - 79));
    }
}

function drawBack(timePassed, elem, left) {
    elem.style.left = left + timePassed / 1.075 + 'px';
}

function onForwardClickHandler() {
    let activeSlide = document.querySelector('.gallery__slide__active');
    
    let nextSlide = activeSlide.nextElementSibling;
    let left = +nextSlide.style.left.split('px')[0];

    if (nextSlide.classList.contains('gallery__slide')) {
        nextSlide.classList.add('gallery__slide__active');
        activeSlide.classList.remove('gallery__slide__active');

        let start = Date.now();
        let timer = setInterval(function () {
            let timePassed = Date.now() - start;

            if (timePassed >= 500) {
                clearInterval(timer);
                return;
            }
            drawForward(timePassed, nextSlide, left);
        }, 5);

        loadMask();

        let scrollBar = document.querySelector('#sidebar__content__scroll__progress');
        let x2 = scrollBar.getAttribute('x2');
        scrollBar.setAttribute('x2', String(+x2 + 79));
    }


}

function drawForward(timePassed, elem, left) {
    elem.style.left = left - timePassed / 1.075 + 'px';
}

function galleryLoad() {
    let conteiner = document.querySelector('.gallery');

    let position = 0;

    for (let i = 0; i < 4; i++) {
        let slide = document.createElement('div');

        slide.classList.add('gallery__slide');
        if (i == 0) {
            slide.classList.add('gallery__slide__active');
        }

        let number = i + 1;

        slide.style.background = ' url("media/images/' + number + '.jpg")';

        slide.style.backgroundPosition = "-511px 0";
        if (i > 0) {
            slide.style.left = 631 + 260 * (i - 1) + 'px';
        }

        let mask = document.createElement('div');
        mask.classList.add('gallery__slide__mask');
        slide.appendChild(mask);

        let title = document.createElement('div');
        title.classList.add('gallery__slide__title');
        title.innerHTML = data[i].name;
        if (i > 0) {
            title.style.opacity = '0.5';
        }

        let link = document.createElement('div');
        link.classList.add('gallery__slide__title__link');
        link.innerHTML = 'подробнее&nbsp;';

        let arrow = document.createElement('div');
        arrow.classList.add('gallery__slide__title__link__arrow');
        link.appendChild(arrow);

        title.appendChild(link);

        slide.appendChild(title);

        conteiner.appendChild(slide);
    }

    loadMask();
}

function loadMask() {
    let conteiner = document.querySelector('.gallery');

    let sliders = conteiner.getElementsByClassName('gallery__slide');
    for (let slider of sliders) {
        let mask = slider.querySelector('.gallery__slide__mask');
        if (!slider.classList.contains('gallery__slide__active')) {
            mask.style.opacity = '0.5';
        } else {
            mask.style.opacity = '0';
        }
    }

}