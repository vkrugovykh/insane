function inputAndSend() {

    //=== ГЛАВНАЯ СТРАНИЦА ===//
    if (document.title === 'Loan') {
        var form = document.querySelectorAll('.form'),
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
            mask = `+1 (${x}${x}${x}) ${x}${x}${x}-${x}${x}${x}${x}`; //Маска поля;

        inputTel.forEach(function(event) { // Проверка ввода
            
            event.addEventListener('keypress', (event) => {
                let target = event.target;
                target.selectionStart = target.value.indexOf(x);
                if (target.value.length >= mask.length && !target.value.match(x)) {
                    event.preventDefault();
                }
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
                //target.setAttribute('maxlength', mask.length);//Максимальное количество символов не больше количества символов маски
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

    }


    //=== ФУНКЦИИ ===//
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

        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(ajaxSendForm);

        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

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
}

module.exports = inputAndSend;