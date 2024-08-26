import view from './view.js';

class LoadPlaylistView extends view {
    _parentElement = document.querySelector('.playlist');

    render(data) {
        data.forEach(track => {
            const markup = this._generateMarkup(track);
            this._parentElement.insertAdjacentHTML('beforeend', markup);
        });
    };

    _generateMarkup(data) {
        return `
            <div class="playlist__item" id="${data.id}">
            <img src="${data.cover}" class="playlist__item-cover">
            <div class="playlist__item-info">
                <p class="playlist__item-title">${data.title}</p>
                <p class="playlist__item-artist">${data.artist}</p>
            </div>
            <div class="playlist__item-duration">${data.duration}</div>
        `
    };
};

export default new LoadPlaylistView();