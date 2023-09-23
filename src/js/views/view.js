import icons from 'url:../../img/icons.svg';
export default class View {
  _data;
  /**
   * Render the recieved object to the DOM
   * @param {Object | Object[]} data // The data to be rendered (e.g:- recipe)
   * @param {boolean} [render=true] if false , then returns markup string instead of rendering to the DOM.
   * @returns {undefined | string} if render=false returns the markup string
   * @this {Object} View instance
   * @author nagur
   */

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currElements = Array.from(this._parentEl.querySelectorAll('*'));

    newElements.forEach((newEle, i) => {
      const currEle = currElements[i];
      // console.log(currEle, newEle.isEqualNode(currEle));
      // checks for elements have same content.
      // newEle.firstChild.nodeValue.trim() !== ''
      // if the element has textcontent then only firstchild is present then it has nodevalue
      // for div their will be no firstchild and textcontent
      if (
        !newEle.isEqualNode(currEle) &&
        newEle.firstChild?.nodeValue.trim() !== ''
      ) {
        currEle.textContent = newEle.textContent;
      }
      if (!newEle.isEqualNode(currEle)) {
        // console.log(Array.from(newEle.attributes));
        Array.from(newEle.attributes).forEach(attr => {
          currEle.setAttribute(attr.name, attr.value);
        });
      }
    });
  }
  _clear() {
    this._parentEl.innerHTML = '';
  }
  spinner() {
    const markup = `
        <div class="spinner">
                <svg>
                  <use href="${icons}.svg#icon-loader"></use>
                </svg>
              </div>
        `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
                <div class="error">
                    <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                    </div>
                    <p>${message}</p>
                </div>
        `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  renderSuccess(message = this._message) {
    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
        `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
