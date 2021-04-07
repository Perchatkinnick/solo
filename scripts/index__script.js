
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
    forward.addEventListener('click', onBackClickHandler);
}

function onBackClickHandler() {
    let activeSlide = document.querySelector('.gallery__slide__active');
    activeSlide.classList.remove('gallery__slide__active');
    let left = +activeSlide.style.left.split('px')[0];
    let nextSlide = activeSlide.nextElementSibling;
    nextSlide.classList.add('gallery__slide__active');
    nextSlide.style.left = left + 220 + 'px';

    loadMask();
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