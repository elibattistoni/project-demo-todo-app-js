// View that renders the list of todos
import icons from "url:../../img/icons.svg";

class TodosListView {
  _parentElement = document.querySelector(".todos-list");

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

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
    <li class="preview-todo-item ${
      dataTodo.id === id ? "item-active" : ""
    }" data-order='["${dataTodo.counterId}","${dataTodo.deadline}"]'>
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
    this._data = dataAllTodos;
    const markup = this._generateMarkupListTodo();
    this._clear(this._parentElement);
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  updateList(dataAllTodos) {
    this._data = dataAllTodos;
    const newMarkup = this._generateMarkupListTodo();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll("*")
    );
    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];
      if (!curEl) return;
      // update change text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }
      // update changed attribute
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  // sortList(by = "created") {
  //   const elements = this._parentElement.querySelectorAll(".preview-todo-item");
  //   let orderedElements = Array.from(elements);
  //   if (by === "deadline") {
  //     orderedElements.sort((a, b) => {
  //       const dateA = new Date(JSON.parse(a.dataset.order)[1]);
  //       const dateB = new Date(JSON.parse(b.dataset.order)[1]);
  //       return dateB - dateA;
  //     });
  //   }
  //   if (by === "created") {
  //     orderedElements.sort((a, b) => {
  //       const counterA = new Date(JSON.parse(a.dataset.order)[0]);
  //       const counterB = new Date(JSON.parse(b.dataset.order)[0]);
  //       return counterB - counterA;
  //     });
  //   }
  //   // Doesn't work
  //   orderedElements.forEach((e) => {
  //     console.log(e);
  //     this._parentElement.insertAdjacentElement("afterbegin", e);
  //   });
  // }
}

export default new TodosListView();
