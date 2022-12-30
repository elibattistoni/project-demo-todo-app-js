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
      console.log("case 1")
      return `
      <button class="btn btn-pagination btn--page-before hidden" data-goto="">
        <svg class="icon-page">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span class="hidden page--text"></span>
        <span class="hidden page--number"></span>
      </button>
      <span class="current-page">${currentPage}</span>
      <button class="btn btn-pagination btn--page-after hidden">
        <svg class="icon-page hidden">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
        <span class="hidden page--text"></span>
        <span class="hidden page--number"></span>
      </button>
      `;
    }

    if (currentPage === 1 && numPages === 1) {
      console.log("case 2 OKKKK")
      return `
      <button class="btn btn-pagination btn--page-before hidden" data-goto="${
        currentPage - 1
      }">
        <svg class="icon-page">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span class="hidden page--text">Page</span>
        <span class="hidden page--number">${currentPage - 1}</span>
      </button>
      <span class="current-page">${currentPage}</span>
      <button class="btn btn-pagination btn--page-after hidden">
        <svg class="icon-page hidden">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
        <span class="hidden page--text">Page</span>
        <span class="hidden page--number">${currentPage + 1}</span>
      </button>
      `;
    }

    if (currentPage === 1 && numPages > 1) {
      console.log("case 3 OKKK")
      return `
      <button class="btn btn-pagination btn--page-before hidden">
        <svg class="icon-page hidden">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span class="hidden page--text">Page</span>
        <span class="hidden page--number">${currentPage - 1}</span>
      </button>
      <span class="current-page">${currentPage}</span>
      <button class="btn btn-pagination btn--page-after" data-goto="${
        currentPage + 1
      }">
        <span class="page--text">Page</span>
        <span class="page--number">${currentPage + 1}</span>
        <svg class="icon-page">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `;
    }
    if (currentPage === numPages && numPages > 1) {
      console.log("case 4 OKKKK")
      return `
      <button class="btn btn-pagination btn--page-before" data-goto="${
        currentPage - 1
      }">
        <svg class="icon-page">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span class="page--text">Page</span>
        <span class="page--number">${currentPage - 1}</span>
      </button>
      <span class="current-page">${currentPage}</span>
      <button class="btn btn-pagination btn--page-after hidden">
        <svg class="icon-page hidden">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
        <span class="hidden page--text">Page</span>
        <span class="hidden page--number">${currentPage + 1}</span>
      </button>
      `;
    }
    if (currentPage < numPages) {
      console.log("case 5 OKKK")
      return `
      <button class="btn btn-pagination btn--page-before" data-goto="${
        currentPage - 1
      }">
        <svg class="icon-page">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span class="page--text">Page</span>
        <span class="page--number">${currentPage - 1}</span>
      </button>
      <span class="current-page">${currentPage}</span>
      <button class="btn btn-pagination btn--page-after" data-goto="${
        currentPage + 1
      }">
        <span class="page--text">Page</span>
        <span class="page--number">${currentPage + 1}</span>
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
