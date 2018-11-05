window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let page = document.querySelector('.page'),
        pageChildren = page.children,
        showupContentSlider = document.querySelector('.showup__content-slider'),
        showupContentSliderItems = showupContentSlider.getElementsByTagName('a'),
        modulesContentSlider = document.querySelector('.modules__content-slider'),
        modulesContentSliderItems = modulesContentSlider.getElementsByTagName('a'),
        feedSlider = document.querySelector('.feed__slider'), 
        feedItem = feedSlider.getElementsByClassName('feed__item'),
        currentScreen = 1, // Первоначальный экран
        currentSlide = 1, // Первоначальный слайд на 1 экране
        currentSlideThird = 1, // Первоначальный слайд на 3 экране
        currentSlideFifth = 1, // Первоначальный слайд на 5 экране
        officerNewItem = document.querySelectorAll('.officernew .officer__card-item'),
        currentCard = 0, // количество отображаемых карточек на 2 экране
        modulesInfoHanson = document.querySelector('.modules__info .hanson'),
        slidersButton = `
            <button type="button" class="slick-prev">
                <div class="play__content">
                    <svg width="9" height="11" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="1" d="M0 5.5L9 11V0L0 5.5Z" fill="#EAEAEA"/>
                    </svg>
                </div>
            </button>
            <button type="button" class="slick-next">
                <div class="play__content">
                    <svg width="9" height="11" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="1" d="M9 5.5L0 11V0L9 5.5Z" fill="#EAEAEA"/>
                    </svg>
                </div>            
            </button>`;

        modulesInfoHanson.style.display = 'none';

        page.addEventListener('click', (event) => { //Обработка кликов на странице

        let target = event.target;

        while (target != page) {
           
            if (target.classList.contains('next')) {
                event.preventDefault();
                plusSlides(1);
                if (currentScreen == 3) {
                    setTimeout(function() { modulesInfoHanson.style.display = 'block' }, 3000);
                } else if (currentScreen != 3) {
                    modulesInfoHanson.style.display = 'none'
                }
                return;
            } else if (target.tagName == 'A' && target.classList == '') {
                event.preventDefault();
                firstSlide();
                return;
            } else if (target.classList.contains('slick-next')) {
                event.preventDefault();
                if (target.parentNode.classList.contains('showup__content-slider')) {
                    currentSlide++;
                    currentSlide = horizontalSlide(showupContentSliderItems, currentSlide - 1, 'card-active');
                } else if (target.parentNode.classList.contains('modules__info-btns')) {
                    currentSlideThird++;
                    currentSlideThird = horizontalSlide(modulesContentSliderItems, currentSlideThird - 1, 'card-active');
                } else if (target.parentNode.classList.contains('feed__slider')) {
                    currentSlideFifth++;
                    currentSlideFifth = horizontalSlide(feedItem, currentSlideFifth - 1, 'feed__item-active');
                }
                return;
            } else if (target.classList.contains('slick-prev')) {
                event.preventDefault();
                if (target.parentNode.classList.contains('showup__content-slider')) {
                    currentSlide--;
                    currentSlide = horizontalSlide(showupContentSliderItems, currentSlide - 1, 'card-active');
                } else if (target.parentNode.classList.contains('modules__info-btns')) {
                    currentSlideThird--;
                    currentSlideThird = horizontalSlide(modulesContentSliderItems, currentSlideThird - 1, 'card-active');
                } else if (target.parentNode.classList.contains('feed__slider')) {
                    currentSlideFifth--;
                    currentSlideFifth = horizontalSlide(feedItem, currentSlideFifth - 1, 'feed__item-active');
                }
                return;
            } else if (target.classList.contains('plus')) {
                if (target.parentNode.classList.contains('showup__content-explore')) {
                    location.href = 'modules.html?module=1';
                } else if (target.parentNode.classList.contains('card__click')) {
                    currentCard++;
                    educationSteps(officerNewItem, officerNewItem[3], currentCard);
                }
            }
            target = target.parentNode;
        };

    });

    function showScreen(slidePos, slide, n) { //Отображение экранов
        
        if (slidePos > slide.length) {
            n = 1;
        }

        if (slidePos < 1) {
            n = slide.length;
        }

        for (let i = 0; i < slide.length; i++) {
            slide[i].style.display = 'none';
        }

        slide[n - 1].style.display = 'block';
        return n;
    }

    function plusSlides(n) { //Плюс экран
        currentScreen = showScreen(currentScreen += n, pageChildren, currentScreen);
    }

    function firstSlide() { //Первый экран
        currentScreen = 1;
        showScreen(1, pageChildren, currentScreen);
    }

    // Навигация слайдеров
    showupContentSlider.innerHTML += slidersButton;
    feedSlider.innerHTML += slidersButton;


    horizontalSlide(showupContentSliderItems, currentSlide - 1, 'card-active');//Вызываем слайдер на 1 экране

    let slideInterval = setTimeout(function tick() { //Autoplay для слайдера на 3 экране
        if (currentScreen == 3) {
            currentSlideThird++;
            horizontalSlide(modulesContentSliderItems, currentSlideThird - 1, 'card-active');//Вызываем слайдер на 3 экране
        }
        slideInterval = setTimeout(tick, 4000);
    }, 4000);

    horizontalSlide(feedItem, currentSlideFifth - 1, 'feed__item-active');//Вызываем слайдер на 5 экране

    function horizontalSlide(items, n, active) { //Слайдер на 1 экране

        if (n >= items.length) {
            n = 0;
        };
        
        if (n < 0) {
            n = items.length - 1;
        };

        for (let i = 0; i < items.length; i++) {
            if (i < n) {
                items[i].style.order = items.length - n + i;
                if (items[i].tagName == 'A') {
                    items[i].setAttribute('href', `modules.html?module=${i + 1}`);
                }
                items[i].classList.remove(active);
            } else if (i == n) {
                items[i].style.order = i - n;
                if (items[i].tagName == 'A') {
                    items[i].setAttribute('href', `modules.html?module=${i + 1}`);
                }
                items[i].classList.add(active);
            } else if (i > n) {
                items[i].style.order = i - n;
                if (items[i].tagName == 'A') {
                    items[i].setAttribute('href', `modules.html?module=${i + 1}`);
                }
                items[i].classList.remove(active);
            }
        };
        return ++n;
    };

    function educationSteps(items, btn, pos) { //Отображение карточек на 2 экране и навигации

        if (pos >= items.length) {
            pos = items.length;
        }

        for (let i = 0; i < items.length; i++) {
            
            if ( i < pos) {
                items[i].style.display = 'flex';
                setTimeout(() => {
                    items[i].style.opacity = '1';
                    items[i].style.transition = 'opacity 0.5s linear';
                }, 50);
            } else {
                items[i].style.display = 'none';
            }

        }

        if (pos == items.length - 1) {
            btn.style.opacity = '0';
            btn.style.transition = 'opacity 0.5s linear';
            setTimeout(() => {
                btn.style.display = 'none';
            }, 600);
        } else {
            btn.style.display = 'flex';
            //btn.style.transform = `translateY(${pos * 100}px)`;
        }

    };

});