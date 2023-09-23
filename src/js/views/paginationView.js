import { mark } from 'regenerator-runtime';
import View from './view.js';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      //   console.log(btn);
      const gotoPageno = +btn.dataset.goto;
      //   console.log(gotoPageno);

      handler(gotoPageno);
    });
  }
  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    // console.log(numPages);
    // page 1 and other pages
    if (currPage === 1 && numPages > 1) {
      return this._generateMarkupButton('first', currPage);
    }
    // last page
    if (currPage === numPages && numPages > 1) {
      return this._generateMarkupButton('last', currPage);
    }
    // other pages
    if (currPage < numPages) {
      return this._generateMarkupButton('middle', currPage);
    }
    // page 1 and no pages
    return '';
  }
  _generateMarkupButton(Page, currPage) {
    const leftButton = `
        <button data-goto="${
          currPage - 1
        }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}</span>
        </button>
         `;
    const rightbutton = `
        <button data-goto="${
          currPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    const markup =
      Page == 'first'
        ? rightbutton
        : Page === 'last'
        ? leftButton
        : rightbutton + leftButton;
    return markup;
  }
}

export default new paginationView();
