class search {
  _parentEl = document.querySelector('.search');
  getQuery() {
    const result = this._parentEl.querySelector('.search__field').value;
    this._clear();
    return result;
  }
  _clear() {
    this._parentEl.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new search();
