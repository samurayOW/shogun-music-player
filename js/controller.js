import * as model from './model.js';
import loadPlaylistView from './views/loadPlaylistView.js';
import selectTrackView from './views/selectTrackView.js';
import controlsPlayerView from './views/controlsPlayerView.js';

const controlLoadPlaylist = function () {
    try {
        // 1) Get playlist
        const playlist = model.getPlaylist();

        // 2) Render playlist
        loadPlaylistView.render(playlist);

    } catch (err) {
        console.log(err);
    }
};

const controlSelectTrack = async function (data) {
    try {
        await model.loadTrack(data);

        model.state.currentTrack.addEventListener('timeupdate', () => {
            controlsPlayerView.updateProgressStart(model.getTrackCurrentTime());
            controlsPlayerView.progressSliderHandler(model.state.currentTrack);
        });
        model.state.currentTrackIndex = model.findSelectedTrackIndex(data);

        model.play();
        const selectedTrack = model.state.playlist.filter(track => track.id == data)[0];
        selectTrackView.updateCurrentTrackInfo(selectedTrack, model.trackEndedHandler);

        // model.trackEndedHandler(selectTrackView.updateCurrentTrackInfo, controlsPlayerView.progressSliderHandler, controlsPlayerView.updateProgressStart);

    } catch (err) {
        console.log(err);
    }
};

const controlControlsPlayer = function () {
    try {
        controlsPlayerView.playBtnHandler(model.play, model.pause, model.notChoosedTrack);
        controlsPlayerView.prevBtnHandler(model.switchTrack);
        controlsPlayerView.nextBtnHandler(model.switchTrack);
        controlsPlayerView.repeatBtnHandler();
        controlsPlayerView.volumeControlsHandler(model.volumeHandler);

    } catch (err) {
        console.log(err);
    }
};

const init = function () {
    model.trackEndedHandler(selectTrackView.updateCurrentTrackInfo, controlsPlayerView.progressSliderHandler, controlsPlayerView.updateProgressStart);

    loadPlaylistView.addHandler(controlLoadPlaylist);
    selectTrackView.addHandler(controlSelectTrack);
    controlsPlayerView.addHandler(controlControlsPlayer);

    document.querySelector("#date").innerHTML = new Date().getFullYear();
};
init();