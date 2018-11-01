window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let page = document.querySelector('.page'),
        pageChildren = page.children,
        currentScreen = 1;

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
            }
            target = target.parentNode;
        };

    });

    function showScreen(slidePos, slide, n) {
        
        if (slidePos > slide.length) {
            n = 1;
        }

        for (let i = 0; i < slide.length; i++) {
            slide[i].style.display = 'none';
        }

        slide[n - 1].style.display = 'block';
        return n;
    }

    function plusSlides(n) {
        currentScreen = showScreen(currentScreen +=n, pageChildren, currentScreen);
    }

    function firstSlide() {
        currentScreen = 1;
        showScreen(0, pageChildren, currentScreen);
    }

});