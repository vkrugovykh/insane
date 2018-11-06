function globalJS() {
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
}

export default globalJS;