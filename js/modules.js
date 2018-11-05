window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let moduleapp = document.querySelector('.moduleapp'),
        moduleappChildren = moduleapp.children,
        currentScreen = 1;

    if (location.search.substr(location.search.indexOf('=') + 1)) {
        firstSlide(location.search.substr(location.search.indexOf('=') + 1));
    } else {
        firstSlide(currentScreen);
    };
        
    moduleapp.addEventListener('click', (event) => {
        event.preventDefault();

        let target = event.target;

        while (target != moduleapp) {
           
            if (target.classList.contains('next')) {
                plusSlides(1);
                return;
            } else if (target.tagName == 'A' && target.classList == '') {
                //firstSlide(1);
                location.href = 'index.html';
                return;
            } else if (target.classList.contains('prevmodule')) {
                plusSlides(-1);
                return;
            } else if (target.classList.contains('play')) {
                if (!target.children[0].classList.contains('closed')) {
                    frame.setAttribute('src', target.getAttribute('data-url'));
                    if (target.parentNode.parentNode.querySelectorAll('.play')[0] === target) {
                        enableVideo(target.parentNode.parentNode.querySelectorAll('.play')[1]);
                    }
                    modalOn();
                }
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

    function firstSlide(n) {
        currentScreen = n;
        showScreen(n, moduleappChildren, currentScreen);
    }




    let overlay = document.querySelector('.overlay'),
        close = document.querySelector('.close'),
        moduleVideo = document.querySelectorAll('.module__video-item .play'),
        videoNav = `<div class="play__circle">
                        <svg viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 8L0 16V0L14 8Z" fill="#6D53AF"/>
                        </svg>
                    </div>
                    <div class="play__text">play video</div>`;

    function modalOn() {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function modalOff() {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    };

    close.addEventListener('click', function() {
        frame.setAttribute('src', '');
        modalOff();
    });

    function enableVideo(item) {
        item.innerHTML = videoNav;
        item.parentNode.style.opacity = 1;
        item.parentNode.style.filter = 'none';
        item.parentNode.style.webkitFilter = 'none';
    };

});