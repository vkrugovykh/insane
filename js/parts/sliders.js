function sliders() {

    //=== ОБЩИЙ БЛОК ===//
    let currentSlide = 1; // Первоначальный слайд на 1 экране


    //=== ГЛАВНАЯ СТРАНИЦА ===//
    if (document.title === 'Loan') {
        var page = document.querySelector('.page'),
            showupContentSlider = document.querySelector('.showup__content-slider'),
            showupContentSliderItems = showupContentSlider.getElementsByTagName('a'),
            modulesContentSlider = document.querySelector('.modules__content-slider'),
            modulesContentSliderItems = modulesContentSlider.getElementsByTagName('a'),
            currentSlideThird = 1, // Первоначальный слайд на 3 экране
            currentSlideFifth = 1, // Первоначальный слайд на 5 экране
            feedSlider = document.querySelector('.feed__slider'), 
            feedItem = feedSlider.getElementsByClassName('feed__item'),
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


        // Навигация слайдеров
        showupContentSlider.innerHTML += slidersButton;
        feedSlider.innerHTML += slidersButton;

        horizontalSlide(showupContentSliderItems, currentSlide - 1, 'card-active');//Вызываем слайдер на 1 экране

        let slideInterval = setTimeout(function tick() { //Autoplay для слайдера на 3 экране
            if (document.querySelector('.modules').style.display == 'block') {
                currentSlideThird++;
                horizontalSlide(modulesContentSliderItems, currentSlideThird - 1, 'card-active');//Вызываем слайдер на 3 экране
            }
            slideInterval = setTimeout(tick, 4000);
        }, 4000);

        horizontalSlide(feedItem, currentSlideFifth - 1, 'feed__item-active');//Вызываем слайдер на 5 экране


        //Обработчик событий
        page.addEventListener('click', (event) => { 

            let target = event.target;
    
            while (target != page) {
               
                if (target.classList.contains('slick-next')) {
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
                }
                target = target.parentNode;
            };
    
        });

    }




    //=== ФУНКЦИИ ===//
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

}

module.exports = sliders;