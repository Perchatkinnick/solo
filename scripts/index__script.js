
//@ts-check

let data = [
    { name: 'Gray Rock House', },
    { name: 'Sun House', },
    { name: 'Фахверк Solo', },
    { name: 'Завидово', },
]

function onLoad() {
    galleryLoad();
}

function galleryLoad() {
    let conteiner = document.querySelector('.gallery');

    let position = 0;

    for (let i = 0; i < 4; i++) {
        let slide = document.createElement('div');

        slide.classList.add('gallery__slide');
        let number = i + 1;

        slide.style.background = ' url("media/images/' + number + '.jpg")';

        if (i > 0) {
            slide.style.background = 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("media/images/' + number + '.jpg")';
        }
        slide.style.backgroundPosition = "-511px 0";
        if (i > 0) {
            slide.style.left = 631 + 260 * (i - 1) + 'px';
        }

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
}