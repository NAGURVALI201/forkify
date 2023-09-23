import View from './view.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class bookmarkView extends View {
  _parentEl = document.querySelector('.bookmarks');
  _errorMessage = 'No bookmark yet.!!! :)';
  _message = '';
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new bookmarkView();
