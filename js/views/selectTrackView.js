import View from "./view.js";

class SelectTrackView extends View {
    _playlist = document.querySelector('.playlist');
    _playBtn = document.querySelector('.player__button--play');

    addHandler(handler) {
        this._playlist.addEventListener('click', (event) => {
            if (event.target.closest('.playlist__item')) {
                const nowPlaying = document.querySelector(`.now-playing`);
                if (nowPlaying) nowPlaying.classList.remove('now-playing');
                const selectedTrack = event.target.closest('.playlist__item');
                selectedTrack.classList.add('now-playing');
                const selectedTrackID = selectedTrack.id;
                this._playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                handler(selectedTrackID);
            }
        });
    };

    updateCurrentTrackInfo(data) {
        const player = document.querySelector('.player');
        const cover = document.querySelector('.player__cover');
        const title = document.querySelector('.player__track-title');
        const artist = document.querySelector('.player__track-artist');
        const progressEnd = document.querySelector('.player__progress-end');

        cover.src = data.cover;
        title.innerHTML = data.title;
        artist.innerHTML = data.artist;
        progressEnd.innerHTML = data.duration;
        player.classList.add('playing');
    };
};

export default new SelectTrackView();