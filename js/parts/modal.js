function modal() {

    let overlay = document.querySelector('.overlay'),
        close = document.querySelector('.close'),
        frame = document.querySelector('#frame');


    //Закрыть модальное окно
    close.addEventListener('click', function() {
        frame.setAttribute('src', '');
        modalOff();
    });


//=== ФУНКЦИИ ===//
    function modalOn() {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function modalOff() {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    };

    function enableVideo(item) {
        item.innerHTML = videoNav;
        item.parentNode.style.opacity = 1;
        item.parentNode.style.filter = 'none';
        item.parentNode.style.webkitFilter = 'none';
    };


//=== ГЛАВНАЯ СТРАНИЦА ===//
    if (document.title === 'Loan') {
        var showupVideo = document.querySelector('.showup__video .play'),
            scheduleVideo = document.querySelector('.schedule__info .colored .video .play');

        showupVideo.addEventListener('click', function() {
            frame.setAttribute('src', this.getAttribute('data-url'));
            modalOn();
        });

        scheduleVideo.addEventListener('click', function() {
            frame.setAttribute('src', this.getAttribute('data-url'));
            modalOn();
        });
    }


//=== СТРАНИЦА МОДУЛЕЙ ===//
    if (document.title === 'Modules') {
        var page = document.querySelector('.moduleapp'),
            videoNav = `<div class="play__circle">
                            <svg viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 8L0 16V0L14 8Z" fill="#6D53AF"/>
                            </svg>
                        </div>
                        <div class="play__text">play video</div>`;

        //Обработчик событий
        page.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            while (target != page) {
            
                if (target.classList.contains('play')) {
                    if (!target.children[0].classList.contains('closed')) {
                        frame.setAttribute('src', target.getAttribute('data-url'));
                        if (target.parentNode.parentNode.querySelectorAll('.play')[0] === target) {
                            enableVideo(target.parentNode.parentNode.querySelectorAll('.play')[1]);
                        }
                        modalOn();
                    }

                }
                target = target.parentNode;
            };

        });

    }

}

module.exports = modal;