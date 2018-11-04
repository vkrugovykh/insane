window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let inputTel = document.querySelectorAll('input[type="tel"]'),
    x = '_', //Заменяемый символ
    mask = `+1 (${x}${x}${x}) ${x}${x}${x} ${x}${x}${x}${x}`; //Маска поля;

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

    function testInput(regExp) {
        if (!regExp.test(event.key)) {//если недопустимый символ отменяем ввод
            event.preventDefault();
        }
    }

    let inputEmai = document.querySelectorAll('input[type="email"]'),
        inputDate = document.querySelectorAll('input[type="datetime"]');

    inputEmai.forEach(function(event) {
        event.addEventListener('keypress', (event) => {
            testInput(/^[a-zA-Z0-9 ,.\-:@"()]*?$/);
        });
    });

    inputDate.forEach(function(event) {
        event.addEventListener('keypress', (event) => {
            testInput(/[./\d]/);
        });
    });

});