function functions() {

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
    };

    function horizontalSlide(items, n, active) { //Слайдер горизонтальный

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
    };

    function modalOff() {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    };

    function testInput(regExp) {
        if (!regExp.test(event.key)) {//если недопустимый символ отменяем ввод
            event.preventDefault();
        }
    };

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
    };

    function plusSlides(n) { //Плюс экран
        currentScreen = showScreen(currentScreen += n, pageChildren, currentScreen);
    };

    function firstSlide(n) { //Первый экран
        currentScreen = +n;
        showScreen(n, pageChildren, currentScreen);
    };

    function enableVideo(item) {
        item.innerHTML = videoNav;
        item.parentNode.style.opacity = 1;
        item.parentNode.style.filter = 'none';
        item.parentNode.style.webkitFilter = 'none';
    };

}

export default functions;