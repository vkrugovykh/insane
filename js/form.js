window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let form = document.querySelectorAll('.form'),
        statusMessage = document.createElement('div');

    let message = {
        loading: 'Loading...',
        success: 'Thank you! We\'ll contact you soon!',
        failure: 'Error...'
    };

    form[0].addEventListener('submit', function(event) {
        event.preventDefault();
        ajaxSend(form[0]);
    });

    form[1].addEventListener('submit', function(event) {
        event.preventDefault();
        ajaxSend(form[1]);
    });

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

});