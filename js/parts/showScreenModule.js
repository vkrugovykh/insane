function showScreenModule() {

    let currentScreen = 1; // Первоначальный экран

    
//=== ГЛАВНАЯ СТРАНИЦА ===//
    if (document.title === 'Loan') {

        var page = document.querySelector('.page'),
            pageChildren = page.children,
            modulesInfoHanson = document.querySelector('.modules__info .hanson');

            modulesInfoHanson.style.display = 'none';//Скрывваем модуль учителя на і странице

        //Обработчик событий
        page.addEventListener('click', (event) => {

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
                }
                target = target.parentNode;
            };
    
        });

    }
    

//=== СТРАНИЦА МОДУЛЕЙ ===//
    if (document.title === 'Modules') {

        var page = document.querySelector('.moduleapp'),
        pageChildren = page.children;

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
                } else if (target.classList.contains('download')) {
                    downloadFile('files/file.pdf');
                }
                target = target.parentNode;
            };

        });

    }


//=== ФУНКЦИИ ===//
    function downloadFile(fileUrl) {
        let link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download','');
        link.click();
    };

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

    function plusSlides(n) { //Плюс экран
        currentScreen = showScreen(currentScreen += n, pageChildren, currentScreen);
    };

    function firstSlide(n) { //Первый экран
        currentScreen = +n;
        showScreen(n, pageChildren, currentScreen);
    };

}

module.exports = showScreenModule;