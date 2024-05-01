import './index.html';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import './index.scss';
import JustValidate from 'just-validate';
import IMask from 'imask';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const images = importAll(require.context('./img/tovar', false, /\.(png|jpe?g|svg|webp)$/));


function SliderTop() {
    const btnNext = document.querySelector('.top-button-next');
    const btnPrev = document.querySelector('.top-button-prev');
    const slide = document.querySelectorAll('.top__slider-slide');
    const slideActive = document.querySelector('.top__slider-slide--active');
    const number = document.querySelector('.top__slider-number');
    const progress = document.querySelector('.top__slider-progress');

    let left = 0;
    let width = 0;
    let gap = parseInt(window.getComputedStyle(slide[0].parentElement).getPropertyValue('gap'));
    slide.forEach(item => {
        if (!item.classList.contains('top__slider-slide--active')) {
            left = parseInt(window.getComputedStyle(item).getPropertyValue('left'));
            width = item.clientWidth;
        }
    })

    let leftAdd = 0;
    slide.forEach((item, index) => {
        if (slideActive.id == item.id) {
            number.innerText = `0${index + 1}`;
            progress.style.setProperty('--width', `${(100 / slide.length) * (index + 1)}%`);

            for (let i = index + 1; i < slide.length; i++) {
                slide[i].style.left = `${left + leftAdd}px`;
                leftAdd += width + gap;
            }
            for (let i = 0; i < index; i++) {
                slide[i].style.left = `${left + leftAdd}px`;
                leftAdd += width + gap;
            }
        }
    })

    btnNext.addEventListener('click', () => {
        UpdateSlider(slide, number, progress, left, width, gap);
    })

    btnPrev.addEventListener('click', () => {
        const slideActive = document.querySelector('.top__slider-slide--active');
        slide.forEach((item, index) => {
            item.style.transition = 'all .6s cubic-bezier(.46,.18,.48,.95)';

            if (index == slide.length - 1 && slide[0].id == slideActive.id) {
                item.style.transition = 'none';
            }

            if (slideActive.id == item.id) {
                number.innerText = `0${index == 0 ? slide.length : index}`;
                progress.style.setProperty('--width', `${(100 / slide.length) * (index == 0 ? slide.length : index)}%`);
                item.style.left = `${left}px`;

                slide[index == 0 ? slide.length - 1 : index - 1].style.transition = 'none';
                slide[index == 0 ? slide.length - 1 : index - 1].classList.add('top__slider-slide--active');

                let leftAdd = width + gap;
                for (let i = index + 1; i < slide.length; i++) {
                    slide[i].style.left = `${left + leftAdd}px`;
                    leftAdd += width + gap;
                }
                for (let i = 0; i < index; i++) {
                    slide[i].style.left = `${left + leftAdd}px`;
                    leftAdd += width + gap;
                }

                item.classList.remove('top__slider-slide--active');
            }

        })

    })

    setInterval(UpdateSlider, 3000, slide, number, progress, left, width, gap);
}
SliderTop();

function UpdateSlider(slide, number, progress, left, width, gap) {
    const slideActive = document.querySelector('.top__slider-slide--active');
    slide.forEach((item, index) => {
        item.style.transition = 'all 0.6s cubic-bezier(.46,.18,.48,.95)';

        if (slideActive.id == item.id) {
            number.innerText = `0${index == slide.length - 1 ? 1 : index + 2}`;
            progress.style.setProperty('--width', `${(100 / slide.length) * (index == slide.length - 1 ? 1 : index + 2)}%`);
            slide[index == slide.length - 1 ? 0 : index + 1].classList.add('top__slider-slide--active');

            let leftAdd = 0;
            for (let i = index + 2; i < slide.length; i++) {
                slide[i].style.left = `${left + leftAdd}px`;
                leftAdd += width + gap;
            }
            for (let i = (index == slide.length - 1 ? 1 : 0); i < index; i++) {
                slide[i].style.left = `${left + leftAdd}px`;
                leftAdd += width + gap;
            }

            item.style.left = `${left + (width + gap) * (slide.length - 2)}px`;
            item.classList.remove('top__slider-slide--active');
            item.style.transition = 'none';
        }
    })
}


function Controls() {
    const control = document.querySelectorAll('.control');
    const header = document.querySelector('.header__list');
    control.forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector('.control--active').classList.remove('control--active');
            item.classList.add('control--active');
            document.querySelector('.active').classList.remove('active');
            document.getElementById(item.dataset.id).classList.add('active');
            document.querySelector('.header__list-item--active').classList.remove('header__list-item--active');
            header.querySelector(`[name="${item.dataset.id}"]`).parentElement.classList.add('header__list-item--active');
        })
    })
    document.querySelector('.theme').addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    })
}
Controls();

function CatalogSlider() {
    const catalog = new Swiper('.catalog__slider', {
        loop: true,
        slidesPerView: 3,
        centeredSlides: true,
        speed: 500,
        initialSlide: 1,
        spaceBetween: 20,

        navigation: {
            nextEl: '.catalog-button-next',
            prevEl: '.catalog-button-prev',
        },
        breakpoints: {
            600: {
                speed: 1000,
            },
            450: {
                spaceBetween: 0
            },
            400: {
                spaceBetween: 10
            }
        }
    })
}
CatalogSlider();

function Blog() {
    const window = document.querySelector('.blog-window');
    const overlay = document.querySelector('.blog-overlay');
    const btnMore = document.querySelectorAll('.blog__list-item');
    const btnClose = document.querySelector('.blog-window-btn');

    const text = document.querySelectorAll('.blog__list-text');
    const windowText = document.querySelector('.blog-window-text');
    const windowTitle = document.querySelector('.blog-window-title');
    const title = document.querySelectorAll('.blog__list-title');
    const windowDate = document.querySelector('.blog-window-date');
    const date = document.querySelectorAll('.blog__list-date');

    let isWindowActive = false;

    btnMore.forEach((item, index) => {
        item.addEventListener('click', () => {
            window.classList.add('blog-window--active');
            overlay.classList.add('blog-overlay--active');

            windowText.innerHTML = text[index].innerHTML;
            windowTitle.innerHTML = title[index].innerHTML;
            windowDate.innerHTML = date[index].innerHTML;

            isWindowActive = true;
        })
    })

    btnClose.addEventListener('click', () => {
        window.classList.remove('blog-window--active');
        overlay.classList.remove('blog-overlay--active');

        isWindowActive = false;
    })

    document.addEventListener('click', (e) => {
        if (!btnMore[0].contains(e.target) && !btnMore[1].contains(e.target) && !btnMore[2].contains(e.target) && !window.contains(e.target)) {
            window.classList.remove('blog-window--active');
            overlay.classList.remove('blog-overlay--active');
            isWindowActive = false;
        }
    })
}
Blog();

function Valid() {
    const valid = new JustValidate('#form', {
        validateBeforeSubmitting: true,
        errorLabelStyle: {
            color: '#ee3022',
            lineHeight: '14px',
        },
        errorFieldCssClass: ['invalid'],
        successFieldCssClass: ['valid'],
    })

    valid
        .addField('#name', [
            {
                rule: 'minLength',
                value: 3,
                errorMessage: 'Должно быть больше 3 символов',
            },
            {
                rule: 'maxLength',
                value: 30,
                errorMessage: 'Доджно быть меньше 15 символов',
            },
            {
                rule: 'required',
                errorMessage: 'Обязательное поле',
            },
        ])
        .addField('#email', [
            {
                rule: 'required',
                errorMessage: 'Обязательное поле',
            },
            {
                rule: 'email',
                errorMessage: 'Email не правильный!',
            },
        ])
        .onSuccess((event) => {
            document.getElementById("form").submit();
        });

    const phone = document.getElementById('phone');
    const maskOptions = {
        mask: '+{7}(000)000-00-00'
    };
    const mask = IMask(phone, maskOptions);
}
Valid();


function Menu() {
    const menuBtn = document.querySelector('.burger');
    const overlay = document.querySelector('.header-overlay');
    const menu = document.querySelector('.header__list');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('burger--active');
        menu.classList.toggle('header__list--active');
        overlay.classList.toggle('header-overlay--active');
    })

    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !menu.contains(e.target)) {
            menuBtn.classList.remove('burger--active');
            menu.classList.remove('header__list--active');
            overlay.classList.remove('header-overlay--active');
        }
    })
}
Menu();


function HeightTop() {
    const info = document.querySelector('.top__info');
    const slide = document.querySelectorAll('.top__slider-slide');
    const bottom = document.querySelector('.top__slider-bottom');
    const top = document.querySelector('.top');
    let height = 0;
    slide.forEach(item => {
        if (!item.classList.contains('top__slider-slide--active')) {
            height = item.clientWidth;
        }
    })
    let heightTop = (info.clientHeight + height + bottom.clientHeight + 20) * 1.7;
    if (window.innerWidth <= 900 && window.innerWidth > 600) {
        top.style.height = heightTop + 'px';
    }
    else if (window.innerWidth <= 600) {
        top.style.height = (heightTop + 100) + 'px';
    }
    else {
        top.style.height = '100vh';
    }
    window.addEventListener('resize', () => {
        let height = 0;
        slide.forEach(item => {
            if (!item.classList.contains('top__slider-slide--active')) {
                height = item.clientWidth;
            }
        })
        let heightTop = (info.clientHeight + height + bottom.clientHeight + 20) * 1.7;
        if (window.innerWidth <= 900 && window.innerWidth > 600) {
            top.style.height = heightTop + 'px';
        }
        else if (window.innerWidth <= 600) {
            top.style.height = heightTop + 100 + 'px';
        }
        else {
            top.style.height = '100vh';
        }
    })
}
HeightTop();

function Btns() {
    const btn = document.querySelectorAll('.link-to');
    const links = document.querySelectorAll('.header__list-link');
    const header = document.querySelector('.header__list');

    const menuBtn = document.querySelector('.burger');
    const overlay = document.querySelector('.header-overlay');
    const menu = document.querySelector('.header__list');

    links.forEach(link => {
        link.addEventListener('click', () => {
            Search(link);

            document.querySelector('.header__list-item--active').classList.remove('header__list-item--active');
            link.parentElement.classList.add('header__list-item--active');

            if (window.innerWidth <= 800) {
                menuBtn.classList.remove('burger--active');
                menu.classList.remove('header__list--active');
                overlay.classList.remove('header-overlay--active');
            }
        })
    })
    btn.forEach(item => {
        item.addEventListener('click', () => {
            Search(item);
            document.querySelector('.header__list-item--active').classList.remove('header__list-item--active');
            header.querySelector(`[name="${item.getAttribute('name')}"]`).parentElement.classList.add('header__list-item--active');
        })
    })
}
Btns();

function Search(item) {
    document.querySelector('.active').classList.remove('active');
    document.getElementById(item.getAttribute('name')).classList.add('active');
    document.querySelector('.control--active').classList.remove('control--active');
    document.querySelector(`[data-id="${item.getAttribute('name')}"]`).classList.add('control--active');
}

function Header() {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > header.clientHeight) {
            header.classList.add('header--active');
        } else {
            header.classList.remove('header--active');
        }
    })
}
Header();

function Products() {
    const item = document.querySelectorAll('.catalog__list-item');
    const windowProduct = document.querySelector('.products');
    const back = document.querySelector('.products__back');
    const close = document.querySelector('.products__close');
    const title = document.querySelector('.products__box-title');
    const choice = document.querySelector('.breadcrumb__list-choice');
    const list = document.querySelector('.products__list');
    const description = document.querySelector('.products__text');
    const catalog = document.querySelectorAll('.breadcrumb__list-link');
    const control = document.querySelectorAll('.control');
    const header = document.querySelector('.header__list');

    item.forEach((node, index) => {
        node.addEventListener('click', () => {
            windowProduct.classList.add('products--active');
            window.scrollTo(0, 0);

            // контент
            title.innerText = node.querySelector('.catalog__list-title').innerText;
            choice.innerText = node.querySelector('.catalog__list-title').innerText;
            description.innerHTML = document.getElementById(`description-${node.id}`).innerHTML;

            // кол-во
            const imageNames = Object.keys(images);
            const filterImgNames = imageNames.filter(name => name.startsWith(node.id));
            const count = filterImgNames.length;

            list.innerHTML = '';
            // заполнение
            for (let i = 1; i <= count; i++) {
                list.insertAdjacentHTML("beforeend",
                    `<li class="products__list-item">
                    <div class="products__list-img-box">
                        <img class="products__list-img" src="${images[`${node.id}-${i}.webp`]}" alt="catalog">
                    </div>
                    <p class="products__list-title">${document.getElementById(`text-${node.id}-${i}`).innerText}</p>
                </li>`
                );
            }
        })
    })

    back.addEventListener('click', (e) => {
        e.preventDefault();
        windowProduct.classList.remove('products--active');
    })

    close.addEventListener('click', (e) => {
        e.preventDefault();
        windowProduct.classList.remove('products--active');
    })

    catalog[1].addEventListener('click', (e) => {
        e.preventDefault();
        windowProduct.classList.remove('products--active');
    })

    catalog[0].addEventListener('click', (e) => {
        e.preventDefault();
        windowProduct.classList.remove('products--active');


        document.querySelector('.control--active').classList.remove('control--active');
        control[0].classList.add('control--active');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(control[0].dataset.id).classList.add('active');
        document.querySelector('.header__list-item--active').classList.remove('header__list-item--active');
        header.querySelector(`[name="${control[0].dataset.id}"]`).parentElement.classList.add('header__list-item--active');

    })
}
Products();