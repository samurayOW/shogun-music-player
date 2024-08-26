import View from './view.js'
import selectTrackView from './selectTrackView.js';

class controlsPlayerView extends View {
    _parentElement = document.querySelector('.player');
    _playBtn = document.querySelector('.player__button--play');
    _prevBtn = document.querySelector('.player__button--prev');
    _nextBtn = document.querySelector('.player__button--next');
    _repeatBtn = document.querySelector('.player__button--repeat');
    _volumeBtn = document.querySelector('.player__button--volume');

    addHandler(handler) {
        handler();
    };

    progressSliderHandler(track) {
        const progressSlider = document.querySelector('.player__progress-slider');
        const { duration, currentTime } = track;

        if (!isFinite(duration) || !isFinite(currentTime)) return;

        const progressPercent = (currentTime / duration) * 100;
        progressSlider.value = progressPercent;

        progressSlider.addEventListener('input', () => {
            const progressValue = progressSlider.value;
            track.currentTime = (progressValue / 100) * duration;
        });
    };

    playBtnHandler(play, pause, handler) {
        this._playBtn.addEventListener('click', () => {
            if (this._parentElement.classList.contains('playing')) {
                pause();
            } else {
                handler(selectTrackView.updateCurrentTrackInfo, this.progressSliderHandler, this.updateProgressStart);
                play();
            }
            this._parentElement.classList.toggle('playing');
        });
    };

    prevBtnHandler(handler) {
        this._prevBtn.addEventListener('click', () => {
            handler(true, selectTrackView.updateCurrentTrackInfo, this.progressSliderHandler, this.updateProgressStart);
        });
    };

    nextBtnHandler(handler) {
        this._nextBtn.addEventListener('click', () => {
            handler(false, selectTrackView.updateCurrentTrackInfo, this.progressSliderHandler, this.updateProgressStart);
        });
    };

    repeatBtnHandler() {
        this._repeatBtn.addEventListener('click', () => {
            this._repeatBtn.classList.toggle('active');
            this._parentElement.classList.toggle('repeating');
        });
    };

    volumeControlsHandler(handler) {
        const volumeSlider = document.querySelector('.player__volume--slider');

        volumeSlider.addEventListener('input', () => {
            const selectedLevel = volumeSlider.value;
            if (selectedLevel == 0) {
                this._parentElement.classList.add('mute');
                this._volumeBtn.innerHTML = '<i id="volume-icon" class="fa-solid fa-volume-mute"></i>';
                handler(0);
            } else if (selectedLevel == 1) {
                this._parentElement.classList.remove('mute');
                this._volumeBtn.innerHTML = '<i id="volume-icon" class="fa-solid fa-volume-high"></i>';
                handler(1);
            } else {
                this._parentElement.classList.remove('mute');
                this._volumeBtn.innerHTML = '<i id="volume-icon" class="fa-solid fa-volume-low"></i>';
                handler(selectedLevel);
            }
        });

        this._volumeBtn.addEventListener('click', () => {
            if (!this._parentElement.classList.contains('mute')) {
                this._parentElement.classList.add('mute');
                this._volumeBtn.innerHTML = '<i id="volume-icon" class="fa-solid fa-volume-mute"></i>';
                handler(0);
                volumeSlider.value = 0;
            } else {
                this._parentElement.classList.remove('mute');
                this._volumeBtn.innerHTML = '<i id="volume-icon" class="fa-solid fa-volume-high"></i>';
                handler(1);
                volumeSlider.value = 1;
            }
        });
    };

    updateProgressStart(data) {
        const formatTime = function (timeInSeconds) {
            const minutes = Math.floor(timeInSeconds / 60);
            const seconds = Math.floor(timeInSeconds % 60);
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        };

        const progressStart = document.querySelector('.player__progress-start');
        progressStart.innerHTML = formatTime(data);
    };

};

export default new controlsPlayerView();