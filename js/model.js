import { playlist } from "./track.js";

export const state = {
    playlist: playlist,
    currentTrack: document.querySelector('#audio'),
    currentTrackIndex: -1,
};

export const getPlaylist = function () {
    return state.playlist;
};

export const loadTrack = function (data) {
    if (state.currentTrack) pause();
    state.currentTrack.src = `./audio/${data}.mp3`;
    // state.currentTrack = new Audio(`./audio/${data}.mp3`);
};

export const notChoosedTrack = function (updateInfo, updateProgressSlider, updateProgressStart) {
    if (state.currentTrack.classList.contains('undefined')) {
        switchTrack(false, updateInfo, updateProgressSlider, updateProgressStart);
        state.currentTrack.classList = '';
        document.querySelector('.player').classList.toggle('playing');
    }
};

export const findSelectedTrackIndex = function (data) {
    const index = state.playlist.findIndex(el => el.id == data);
    return index;
};

export const getTrackCurrentTime = function () {
    return state.currentTrack.currentTime;
};

export const play = function () {
    const btn = document.querySelector('.player__button--play');
    btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    state.currentTrack.play();
};

export const pause = function () {
    const btn = document.querySelector('.player__button--play');
    btn.innerHTML = '<i class="fa-solid fa-play"></i>';
    state.currentTrack.pause();
};

export const switchTrack = function (back = false, updateInfo, updateProgressSlider, updateProgressStart) {
    back ? state.currentTrackIndex-- : state.currentTrackIndex++;

    if (state.currentTrackIndex < 0) {
        state.currentTrackIndex = state.playlist.length - 1;
    } else if (state.currentTrackIndex > state.playlist.length - 1) {
        state.currentTrackIndex = 0;
    }

    loadTrack(state.playlist[state.currentTrackIndex].id);

    const nowPlaying = document.querySelector(`.now-playing`);
    if (nowPlaying) nowPlaying.classList.remove('now-playing');
    const selectedTrack = document.getElementById(state.playlist[state.currentTrackIndex].id);
    selectedTrack.classList.add('now-playing');

    updateInfo(state.playlist[state.currentTrackIndex]);
    // updateProgress(state.currentTrack);
    state.currentTrack.addEventListener('timeupdate', () => {
        updateProgressSlider(state.currentTrack);
        updateProgressStart(getTrackCurrentTime());
    });

    play();
    trackEndedHandler(updateInfo, updateProgressSlider, updateProgressStart);
};

export const trackEndedHandler = function (updateInfo, updateProgressSlider, updateProgressStart) {
    state.currentTrack.addEventListener('ended', () => {
        const player = document.querySelector('.player');
        if (player.classList.contains('repeating')) {
            state.currentTrack.currentTime = 0;
            play();
        } else {
            switchTrack(false, updateInfo, updateProgressSlider, updateProgressStart);
        }
    });
};

export const volumeHandler = function (data) {
    state.currentTrack.volume = data;
};