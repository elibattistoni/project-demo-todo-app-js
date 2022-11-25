import icons from "url:../../img/icons.svg";

class SortView {
  _parentElement = document.querySelector(".sort-todos");
  _direction;

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-sort");
      if (!btn) return;
      this._direction = btn.dataset.direction;
      handler();
    });
  }

  _clear(element) {
    element.innerHTML = "";
  }

  _generateMarkup() {
    return `
    <button class="btn btn-sort" data-direction="${this._direction}">
      <span>Sort</span>
      <svg class="icon-page">
        <use href="${icons}#icon-arrow-${this._direction}"></use>
      </svg>
    </button>
    `;
  }

  removeSortButton() {
    this._parentElement.classList.add("removed");
  }

  renderSortButton() {
    this._direction = "up";
    this._parentElement.classList.remove("removed");
    const markup = this._generateMarkup();
    this._clear(this._parentElement);
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  updateSortButton() {
    this._parentElement.classList.remove("removed");
    this._direction = this._direction === "up" ? "down" : "up";
    const markup = this._generateMarkup();
    this._clear(this._parentElement);
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    return this._direction;
  }
}

export default new SortView();
