function indexPage() {

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

}

export default indexPage;