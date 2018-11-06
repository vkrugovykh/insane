window.addEventListener('DOMContentLoaded', function() {
    'use strict';

//=== ОБЩИЙ БЛОК ===//
    let currentScreen = 1, // Первоначальный экран
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.close'),
        frame = document.querySelector('#frame'),
        currentSlide = 1; // Первоначальный слайд на 1 экране

    close.addEventListener('click', function() { //Закрыть модальное окно
        frame.setAttribute('src', '');
        modalOff();
    });

    close.addEventListener('click', function() {
        frame.setAttribute('src', '');
        modalOff();
    });


//=== ГЛАВНАЯ СТРАНИЦА ===//
    if (document.title === 'Loan') {

        var page = document.querySelector('.page'),
            pageChildren = page.children,
            showupContentSlider = document.querySelector('.showup__content-slider'),
            showupContentSliderItems = showupContentSlider.getElementsByTagName('a'),
            modulesContentSlider = document.querySelector('.modules__content-slider'),
            modulesContentSliderItems = modulesContentSlider.getElementsByTagName('a'),
            showupVideo = document.querySelector('.showup__video .play'),
            feedSlider = document.querySelector('.feed__slider'), 
            feedItem = feedSlider.getElementsByClassName('feed__item'),
            form = document.querySelectorAll('.form'),
            statusMessage = document.createElement('div'),
            message = {
                loading: 'Loading...',
                success: 'Thank you! We\'ll contact you soon!',
                failure: 'Error...'
            },
            inputEmail = document.querySelectorAll('input[type="email"]'),
            inputDate = document.querySelectorAll('input[type="datetime"]'),
            inputTel = document.querySelectorAll('input[type="tel"]'),
            x = '_', //Заменяемый символ
            mask = `+1 (${x}${x}${x}) ${x}${x}${x} ${x}${x}${x}${x}`, //Маска поля;
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

        showupVideo.addEventListener('click', function() {
            frame.setAttribute('src', this.getAttribute('data-url'));
            modalOn();
        });

        inputTel.forEach(function(event) { // Проверка ввода
            
            event.addEventListener('keypress', (event) => {
                let target = event.target;
                if (target.value.length < 1 || target.selectionStart == 0) {
                    testInput(/\+/);
                } else if (target.value.length > 0) {
                    testInput(/\d/);
                }
            });
    
            event.addEventListener('focus', (event) => {
                let target = event.target;
                if (!target.value) {
                    target.value = mask;//Записываем маску в значение
                }
                target.selectionStart = mask.indexOf(x);//Устанавливаем курсор к первому заменяемогу символу
                target.setAttribute('maxlength', mask.length);//Максимальное количество символов не больше количества символов маски
            });
    
            event.addEventListener('blur', (event) => { //Если поле заполнено не по маске или не до конца - обнуляем
                let target = event.target;
                if (target.value.match(x) || target.value.length < mask.length) {
                    target.value = '';
                }
            });
    
            event.addEventListener('input', (event) => {
                let target = event.target,
                    temp; //временная переменная значения поля ввода
                    temp = target.value.substring(0, target.selectionStart) + //В переменную поместили значение поля ввода до курсора
                        mask.substring(target.selectionStart); //и добавили остаток с маски
                    target.value = temp;
                    target.selectionStart = temp.indexOf(x); //Устанавливаем курсор к первому заменяемогу символу
            });
    
        });

        inputEmail.forEach(function(event) {
            event.addEventListener('keypress', (event) => {
                testInput(/^[a-zA-Z0-9 ,.\-:@"()]*?$/);
            });
        });
    
        inputDate.forEach(function(event) {
            event.addEventListener('keypress', (event) => {
                testInput(/[./\d]/);
            });
        });
    
        form[0].addEventListener('submit', function(event) {
            event.preventDefault();
            ajaxSend(form[0]);
        });

        form[1].addEventListener('submit', function(event) {
            event.preventDefault();
            ajaxSend(form[1]);
        });

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
                    firstSlide(1);
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

    }


//=== СТРАНИЦА МОДУЛЕЙ ===//
    if (document.title === 'Modules') {

        var page = document.querySelector('.moduleapp'),
        pageChildren = page.children,
        accordionElem = document.createElement('div'),
        videoNav = `<div class="play__circle">
                        <svg viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 8L0 16V0L14 8Z" fill="#6D53AF"/>
                        </svg>
                    </div>
                    <div class="play__text">play video</div>`;

        accordionElem.classList.add('module__info-descr_accordion');
        accordionElem.innerText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. \
            Voluptate sunt eaque, illo, magnam praesentium, excepturi possimus mollitia \
            voluptatem eum magni, fugiat ut aperiam.';
        accordionElem.style.height = '0px';
        accordionElem.style.marginTop = '0px';

        //Устанавливаем начальный экран
        if (location.search.substr(location.search.indexOf('=') + 1)) {
            firstSlide(location.search.substr(location.search.indexOf('=') + 1));
        } else {
            firstSlide(currentScreen);
        };

        //Обработчик событий
        page.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            while (target != page) {
            
                if (target.classList.contains('next')) {
                    plusSlides(1);
                    return;
                } else if (target.tagName == 'A' && target.classList == '') {
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
                } else if (target.classList.contains('plus')) {
                    if (target.parentNode.nextSibling.classList && target.parentNode.nextSibling.style.height == '0px') {
                        target.parentNode.nextSibling.style.height = '48px';
                        target.parentNode.nextSibling.style.marginTop = '17px';
                    } else if (target.parentNode.nextSibling.classList && target.parentNode.nextSibling.style.heght != '0px') {
                        target.parentNode.nextSibling.style.height = '0px';
                        target.parentNode.nextSibling.style.marginTop = '0px';
                    } else {
                        target.parentNode.parentNode.insertBefore(accordionElem, target.parentNode.nextSibling);
                        target.parentNode.nextSibling.style.height = '48px';
                        target.parentNode.nextSibling.style.marginTop = '17px';
                    }
                    
                } else if (target.classList.contains('download')) {
                    window.open('files/file.pdf');
                }
                target = target.parentNode;
            };

        });
    }


//=== ФУНКЦИИ ===//
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
        }

    };

    function modalOn() {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function modalOff() {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    };

    function testInput(regExp) {
        if (!regExp.test(event.key)) {//если недопустимый символ отменяем ввод
            event.preventDefault();
        }
    }

    function ajaxSend(item) {
        let ajaxSendForm = item,
            ajaxSendFormInput = ajaxSendForm.getElementsByTagName('input');

        ajaxSendForm.appendChild(statusMessage);
        statusMessage.classList.add('statusMessage');

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        //request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(ajaxSendForm);

        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        //request.send(formData);
        request.send(json);

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        for (let i = 0; i <ajaxSendFormInput.length; i++) {
            ajaxSendFormInput[i].value = '';
        }
    }

    function plusSlides(n) { //Плюс экран
        currentScreen = showScreen(currentScreen += n, pageChildren, currentScreen);
    }

    function firstSlide(n) { //Первый экран
        currentScreen = +n;
        showScreen(n, pageChildren, currentScreen);
    }

    function enableVideo(item) {
        item.innerHTML = videoNav;
        item.parentNode.style.opacity = 1;
        item.parentNode.style.filter = 'none';
        item.parentNode.style.webkitFilter = 'none';
    };

});