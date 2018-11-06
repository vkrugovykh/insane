window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    let showScreenModule = require('./parts/showScreenModule.js');
    let modal = require('./parts/modal.js');
    let sliders = require('./parts/sliders.js');
    let inputAndSend = require('./parts/inputAndSend.js');
    let cardsAndAccordion = require('./parts/cardsAndAccordion.js');

    showScreenModule();
    modal();
    sliders();
    inputAndSend();
    cardsAndAccordion();
});