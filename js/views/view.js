export default class View {

    addHandler(handler) {
        handler();
    };

    render() {
        const markup = this._generateMarkup();
        this._parentElement.insertAdjacentHTML('beforeend', markup);
    };
};