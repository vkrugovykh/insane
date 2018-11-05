window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let overlay = document.querySelector('.overlay'),
        close = document.querySelector('.close'),
        moduleVideo = document.querySelectorAll('.module__video-item .play'),
        video = document.querySelector('.video'),
        originHost = window.location.protocol + '//' + window.location.host,
        videoData = {
            height: '100%',
            width: '100%',
            videoId: '',
            host: 'https://www.youtube.com',
            origin: originHost,
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          };

    function modalOn() {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function modalOff() {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    };

    moduleVideo[0].addEventListener('click', function() {

        let str = this.getAttribute('data-url'),
            dataUrl = str.substring(str.lastIndexOf('/') + 1);

        videoData.videoId = dataUrl;
        onYouTubePlayerAPIReady(videoData);
        modalOn();
    });

    close.addEventListener('click', function() {
        //frame.setAttribute('src', 'none');
        //video.innerHTML = '<div id="player"></div><div class="close">&times;</div>';
        modalOff();
    });

    function enableVideo() {
        console.log();
    };


    //Создаем youtube плейер
    let player;

    function onYouTubePlayerAPIReady(url) {
        player = new YT.Player('player', url);
    }

    // автопроигрывание
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    //Когда видео закончится
    function onPlayerStateChange(event) {        
        if(event.data === 0) {            
            alert('done');
        }
    }

});