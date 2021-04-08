
//@ts-check

let data = [
    { name: 'Gray Rock House', },
    { name: 'Sun House', },
    { name: 'Фахверк Solo', },
    { name: 'Завидово', },
]

function onLoad() {
    galleryLoad();

    let forward = document.querySelector('.gallery__forward');
    forward.addEventListener('click', onForwardClickHandler);

    let back = document.querySelector('.gallery__back');
    back.addEventListener('click', onBackClickHandler);

    let menuButton = document.querySelector('.sidebar__header__menu__button');
    menuButton.addEventListener('click', onMenuClickHandler);

    let sidebarClose = document.querySelector('.sidebar__close');
    sidebarClose.addEventListener('click', onSidebarCloseClickHandler);
}

function onSidebarCloseClickHandler() {
    let sidebarClose = document.querySelector('.sidebar__close');
    sidebarClose.style.visibility = 'hidden';

    let menuButton = document.querySelector('.sidebar__header__menu__button');
    menuButton.style.visibility = 'visible';

    let content = document.querySelector('#sidebar__content');
    content.style.visibility = 'visible';

    let menu = document.querySelector('#sidebar__menu');
    menu.style.visibility = 'hidden';

    let sidebarButton = document.querySelector('.sidebar__button');
    sidebarButton.style.visibility = 'visible';
}

function onMenuClickHandler(e) {
    let menuButton = document.querySelector('.sidebar__header__menu__button');
    menuButton.style.visibility = 'hidden';

    let content = document.querySelector('#sidebar__content');
    content.style.visibility = 'hidden';

    let menu = document.querySelector('#sidebar__menu');
    menu.style.visibility = 'visible';

    let sidebarButton = document.querySelector('.sidebar__button');
    sidebarButton.style.visibility = 'hidden';

    let sidebarClose = document.querySelector('.sidebar__close');
    sidebarClose.style.visibility = 'visible';
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
        link.innerHTML = 'подробнее';

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