window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let moduleapp = document.querySelector('.moduleapp'),
        moduleappChildren = moduleapp.children,
        currentScreen = 1;

        moduleapp.addEventListener('click', (event) => {
        event.preventDefault();

        let target = event.target;

        while (target != moduleapp) {
           
            if (target.classList.contains('next')) {
                plusSlides(1);
                return;
            } else if (target.tagName == 'A' && target.classList == '') {
                firstSlide();
                return;
            } else if (target.classList.contains('prevmodule')) {
                plusSlides(-1);
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
        currentScreen = showScreen(currentScreen +=n, moduleappChildren, currentScreen);
    }

    function firstSlide() {
        currentScreen = 1;
        showScreen(1, moduleappChildren, currentScreen);
    }

});