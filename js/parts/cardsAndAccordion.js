function cardsAndAccordion() {


    //=== ГЛАВНАЯ СТРАНИЦА ===//
    if (document.title === 'Loan') {

        var page = document.querySelector('.page'),
            officerNewItem = document.querySelectorAll('.officernew .officer__card-item'),
            currentCard = 0; // количество отображаемых карточек на 2 экране
            

        page.addEventListener('click', (event) => { //Обработка кликов на странице

            let target = event.target;
    
            while (target != page) {
            
                if (target.classList.contains('plus')) {
                    if (target.parentNode.classList.contains('showup__content-explore')) {
                        location.href = 'modules.html?module=1';
                    } else if (target.parentNode.classList.contains('card__click')) {
                        currentCard++;
                        educationSteps(officerNewItem, officerNewItem[3], currentCard);
                    }
                }
                target = target.parentNode;
            };
    
        });
        
    }


    //=== СТРАНИЦА МОДУЛЕЙ ===//
    if (document.title === 'Modules') {
    
        var page = document.querySelector('.moduleapp'),
            accordionElem = document.createElement('div');

        accordionElem.classList.add('module__info-descr_accordion');
        accordionElem.innerText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. \
            Voluptate sunt eaque, illo, magnam praesentium, excepturi possimus mollitia \
            voluptatem eum magni, fugiat ut aperiam.';
        accordionElem.style.height = '0px';
        accordionElem.style.marginTop = '0px';


        //Обработчик событий
        page.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            while (target != page) {
            
                if (target.classList.contains('plus')) {
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
                    
                }
                target = target.parentNode;
            };

        });
        
    }

    //=== ФУНКЦИИ ===//
    function educationSteps(items, btn, pos) { //Отображение карточек на 2 экране и навигации

        if (pos >= items.length) {
            pos = items.length;
        }

        for (let i = 0; i < items.length; i++) {
            
            if ( i < pos) {
                items[i].style.display = 'flex';
                setTimeout(() => {
                    items[i].style.opacity = '1';
                    items[i].style.transition = 'opacity 0.5s linear';
                }, 50);
            } else {
                items[i].style.display = 'none';
            }

        }

        if (pos == items.length - 1) {
            btn.style.opacity = '0';
            btn.style.transition = 'opacity 0.5s linear';
            setTimeout(() => {
                btn.style.display = 'none';
            }, 600);
        } else {
            btn.style.display = 'flex';
        }

    };

}

// export default cards;
module.exports = cardsAndAccordion;