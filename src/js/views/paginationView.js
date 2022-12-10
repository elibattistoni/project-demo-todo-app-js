// View that renders the pagination
import icons from "url:../../img/icons.svg";
import View from "./View.js";
class PaginationView extends View {
  _data;
  _parentElement = document.querySelector(".pagination");

  constructor() {
    super();
  }

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-pagination");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numTodos = this._data.todos.length;
    const numPages = Math.ceil(numTodos / this._data.resultsPerPage);

    if (numTodos === 0) {
      this._parentElement.classList.add("hidden");
    } else {
      this._parentElement.classList.remove("hidden");
    }

    if (numTodos >= 1 && currentPage === 1 && numPages === 0) {
      return `
      <button class="btn btn-pagination hidden" data-goto="">
        <svg class="icon-page">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span class="hidden"></span>
      </button>
      <span class="current-page">${currentPage}</span>
      <button class="btn btn-pagination hidden">
        <svg class="icon-page hidden">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
        <span class="hidden"></span>
      </button>
      `;
    }

    if (currentPage === 1 && numPages === 1) {
      return `
      <button class="btn btn-pagination hidden" data-goto="${currentPage - 1}">
        <svg class="icon-page">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span class="hidden">Page ${currentPage - 1}</span>
      </button>
      <span class="current-page">${currentPage}</span>
      <button class="btn btn-pagination hidden">
        <svg class="icon-page hidden">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
        <span class="hidden">Page ${currentPage + 1}</span>
      </button>
      `;
    }

    if (currentPage === 1 && numPages > 1) {
      return `
      <button class="btn btn-pagination hidden">
        <svg class="icon-page hidden">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span class="hidden">Page ${currentPage - 1}</span>
      </button>
      <span class="current-page">${currentPage}</span>
      <button class="btn btn-pagination" data-goto="${currentPage + 1}">
        <span>Page ${currentPage + 1}</span>
        <svg class="icon-page">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `;
    }
    if (currentPage === numPages && numPages > 1) {
      return `
      <button class="btn btn-pagination" data-goto="${currentPage - 1}">
        <svg class="icon-page">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
      <span class="current-page">${currentPage}</span>
      <button class="btn btn-pagination hidden">
        <svg class="icon-page hidden">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
        <span class="hidden">Page ${currentPage + 1}</span>
      </button>
      `;
    }
    if (currentPage < numPages) {
      return `
      <button class="btn btn-pagination" data-goto="${currentPage - 1}">
        <svg class="icon-page">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
      <span class="current-page">${currentPage}</span>
      <button class="btn btn-pagination" data-goto="${currentPage + 1}">
        <span>Page ${currentPage + 1}</span>
        <svg class="icon-page">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `;
    }
    return "";
  }

  renderPageButtons(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear(this._parentElement);
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  removeRenderPageButtons() {
    this._clear(this._parentElement);
  }
}

export default new PaginationView();
