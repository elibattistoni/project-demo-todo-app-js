// View that renders the list of todos
import icons from "url:../../img/icons.svg";

class TodosListView {
  _parentElement;

  _clear(element) {
    element.innerHTML = "";
  }

  _generateMarkupSingleTodo(dataTodo) {
    const id = window.location.hash.slice(1);
    let statusIcon;
    switch (dataTodo.status) {
      case "START":
        statusIcon = "icon-battery-empty";
        break;
      case "IN PROGRESS":
        statusIcon = "icon-battery-progress";
        break;
      case "DONE":
        statusIcon = "icon-trophy";
        break;
      default:
        statusIcon = "";
        break;
    }
    return `
    <li class="preview-todo-item ${dataTodo.id === id ? "item-active" : ""}">
      <a href="#${dataTodo.id}" class="preview-link">
        <h4 class="preview-todo-title">${dataTodo.title}</h4>
        <div class="preview-todo-info">
          <div class="preview-todo-status">
            <svg class="icon-preview">
              <use href="${icons}#${statusIcon}"></use>
            </svg>
            <span>${dataTodo.status}</span>
          </div>
          <div class="preview-todo-deadline">
            <svg class="icon-preview">
              <use href="${icons}#icon-calendar"></use>
            </svg>
            <span>${dataTodo.deadline}</span>
          </div>
        </div>
      </a>
    </li>
    `;
  }

  _generateMarkupListTodo() {
    return this._data
      .map((dataTodo) => this._handlerSingleTodoMarkup(dataTodo))
      .join("");
  }

  _handlerSingleTodoMarkup(dataTodo) {
    return this._generateMarkupSingleTodo(dataTodo);
  }

  renderList(dataAllTodos) {
    this._parentElement = document.querySelector(".todos-list");
    this._data = dataAllTodos;
    const markup = this._generateMarkupListTodo();
    this._clear(this._parentElement);
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new TodosListView();
