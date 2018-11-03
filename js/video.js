window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let overlay = document.querySelector('.overlay'),
        close = document.querySelector('.close'),
        showupVideo = document.querySelector('.showup__video .play'),
        frame = document.querySelector('#frame');

    function modalOn() {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function modalOff() {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    };

    showupVideo.addEventListener('click', function() {
        frame.setAttribute('src', this.getAttribute('data-url'));
        modalOn();
    });

    close.addEventListener('click', function() {
        frame.setAttribute('src', 'none');
        modalOff();
    });

});