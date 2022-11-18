// View that renders the form for adding and updating a todo
import image from "url:../../img/add.svg";

class AddTodoView {
  _parentElement = document.querySelector(".js_form");
  _message = `
  <div class="added-message">
    <h3>TODO added!</h3>
    <img src="${image}" alt="TODO added" class="image-message"></img>
  </div>`;

  _windowForm = document.querySelector(".js_add_todo");
  _windowMessage = document.querySelector(".js_message");
  _overlay = document.querySelector(".js_overlay");
  _btnOpen = document.querySelector(".js_btn_open");
  _btnClose = document.querySelector(".js_btn_close");

  constructor() {
    this._addHandlerShowForm();
    this._addHandlerHideForm();
  }

  _openForm() {
    this._windowForm.classList.remove("hidden");
    this._overlay.classList.remove("hidden");
  }

  _closeForm() {
    this._windowForm.classList.add("hidden");
    this._parentElement.reset();
  }

  _addHandlerShowForm() {
    this._btnOpen.addEventListener("click", this._openForm.bind(this));
  }

  _addHandlerHideForm() {
    this._btnClose.addEventListener("click", this._closeForm.bind(this));
    this._overlay.addEventListener("click", this._closeForm.bind(this));
  }

  addHandlerNewTodo(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  renderMessage() {
    this._closeForm();
    this._windowMessage.classList.remove("hidden");
    this._windowMessage.insertAdjacentHTML("afterbegin", this._message);
  }

  closeMessage() {
    this._windowMessage.classList.add("hidden");
    this._overlay.classList.add("hidden");
  }
}

export default new AddTodoView();
