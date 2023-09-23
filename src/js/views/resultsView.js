import View from './view.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class resultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage =
    'could not find any recipe for the query , try someother recipe :)';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new resultsView();
