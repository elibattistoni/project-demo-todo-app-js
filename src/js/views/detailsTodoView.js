// View that shows the details of a todo that was clicked on
// import View from "./View.js";
import icons from "url:../../img/icons.svg";

class DetailsTodoView {
  _data;

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  _splashWindow = document.querySelector(".details-splash");
  _detailsWindow = document.querySelector(".todo-details");

  _clear(element) {
    element.innerHTML = "";
  }

  _generateMarkup() {
    let status_icon;
    switch (this._data.status) {
      case "START":
        status_icon = "icon-battery-empty";
        break;
      case "IN PROGRESS":
        status_icon = "icon-battery-progress";
        break;
      case "DONE":
        status_icon = "icon-trophy";
        break;
      default:
        status_icon = "";
        break;
    }
    return `
      <header class="todo-header">
        <h3 class="todo-title">${this._data.title}</h3>
        <div class="todo-status">
          <svg class="icon-details">
            <use href="${icons}#${status_icon}"></use>
          </svg>
          <span>${this._data.status}</span>
        </div>
      </header>

      <main>
        <p class="todo-description">
        ${this._data.description}
        </p>
        <div class="todo-dates">
          <div class="todo-created">
            <div class="todo-created-title">
              <svg class="icon-details">
                <use href="${icons}#icon-calendar"></use>
              </svg>
              <span>Added</span>
            </div>
            <span class="todo-created-date">${this._data.created}</span>
          </div>
          <div class="todo-deadline">
            <div class="todo-deadline-title">
              <svg class="icon-details">
                <use href="${icons}#icon-calendar"></use>
              </svg>
              <span>Deadline</span>
            </div>
            <span class="todo-deadline-date">${this._data.deadline}</span>
          </div>
        </div>
      </main>

      <footer class="edit-delete-todo">
        <button class="btn btn-delete">
          <svg class="icon-delete">
            <use href="${icons}#icon-trash"></use>
          </svg>
        </button>
        <button class="btn btn-edit">
          <svg class="icon-edit">
            <use href="${icons}#icon-edit"></use>
          </svg>
        </button>
      </footer>
    `;
  }

  renderSplash() {
    this._detailsWindow.classList.add("removed");
    this._splashWindow.classList.remove("removed");
  }

  renderDetails(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear(this._detailsWindow);
    this._splashWindow.classList.add("removed");
    this._detailsWindow.classList.remove("removed");
    this._detailsWindow.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new DetailsTodoView();
