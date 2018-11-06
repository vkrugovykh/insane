function modulesPage() {

    if (document.title === 'Modules') {

        var page = document.querySelector('.moduleapp'),
        pageChildren = page.children,
        accordionElem = document.createElement('div'),
        videoNav = `<div class="play__circle">
                        <svg viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 8L0 16V0L14 8Z" fill="#6D53AF"/>
                        </svg>
                    </div>
                    <div class="play__text">play video</div>`;

        accordionElem.classList.add('module__info-descr_accordion');
        accordionElem.innerText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. \
            Voluptate sunt eaque, illo, magnam praesentium, excepturi possimus mollitia \
            voluptatem eum magni, fugiat ut aperiam.';
        accordionElem.style.height = '0px';
        accordionElem.style.marginTop = '0px';

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
                } else if (target.classList.contains('play')) {
                    if (!target.children[0].classList.contains('closed')) {
                        frame.setAttribute('src', target.getAttribute('data-url'));
                        if (target.parentNode.parentNode.querySelectorAll('.play')[0] === target) {
                            enableVideo(target.parentNode.parentNode.querySelectorAll('.play')[1]);
                        }
                        modalOn();
                    }
                } else if (target.classList.contains('plus')) {
                    if (target.parentNode.nextSibling.classList && target.parentNode.nextSibling.style.height == '0px') {
                        target.parentNode.nextSibling.style.height = '48px';
                        target.parentNode.nextSibling.style.marginTop = '17px';
                    } else if (target.parentNode.nextSibling.classList && target.parentNode.nextSibling.style.heght != '0px') {
                        target.parentNode.nextSibling.style.height = '0px';
                        target.parentNode.nextSibling.style.marginTop = '0px';
                    } else {
                        target.parentNode.parentNode.insertBefore(accordionElem, target.parentNode.nextSibling);
                        target.parentNode.nextSibling.style.height = '48px';
                        target.parentNode.nextSibling.style.marginTop = '17px';
                    }
                    
                } else if (target.classList.contains('download')) {
                    window.open('files/file.pdf');
                }
                target = target.parentNode;
            };

        });
    }

}

export default modulesPage;