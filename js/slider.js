window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let page = document.querySelector('.page'),
        pageChildren = page.children,
        showupContentSlider = document.querySelector('.showup__content-slider'),
        showupContentSliderItems = showupContentSlider.getElementsByTagName('a'),
        currentScreen = 1,
        currentSlide = 1;

        page.addEventListener('click', (event) => {
        event.preventDefault();

        let target = event.target;

        while (target != page) {
           
            if (target.classList.contains('next')) {
                plusSlides(1);
                return;
            } else if (target.tagName == 'A' && target.classList == '') {
                firstSlide();
                return;
            } else if (target.classList.contains('slick-next')) {
                currentSlide++;
                currentSlide = horizontalSlide(showupContentSliderItems, currentSlide - 1);
                console.log(currentSlide);
                return;
            } else if (target.classList.contains('slick-prev')) {
                currentSlide--;
                currentSlide = horizontalSlide(showupContentSliderItems, currentSlide - 1);
                console.log(currentSlide);
                return;
            }
            target = target.parentNode;
        };

    });

    function showScreen(slidePos, slide, n) {
        
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

    function plusSlides(n) {
        currentScreen = showScreen(currentScreen += n, pageChildren, currentScreen);
    }

    function firstSlide() {
        currentScreen = 1;
        showScreen(1, pageChildren, currentScreen);
    }

    showupContentSlider.innerHTML += `
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


    horizontalSlide(showupContentSliderItems, currentSlide - 1);

    function horizontalSlide(items, n) {

        if (n >= items.length) {
            n = 0;
        };
        
        if (n < 0) {
            n = items.length - 1;
        };

        for (let i = 0; i < items.length; i++) {
            if (i < n) {
                items[i].style.order = items.length - n + i;
                items[i].classList.remove('card-active');
            } else if (i == n) {
                items[i].style.order = i - n;
                items[i].classList.add('card-active');
            } else if (i > n) {
                items[i].style.order = i - n;
                items[i].classList.remove('card-active');
            }
        };
        return ++n;
    };

});