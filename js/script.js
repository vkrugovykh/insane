import globalJS from './parts/globalJS.js';
import indexPage from './parts/indexPage.js';
import modulesPage from './parts/modulesPage.js';
import functions from './parts/functions.js';

window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    globalJS();
    indexPage();
    modulesPage();
    functions();
    
});