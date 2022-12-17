// View that renders the form for adding and updating a todo
import image from "url:../../img/add.svg";
import View from "./View.js";

class AddTodoView extends View {
  _parentElement = document.querySelector(".form-add-todo");
  _windowForm = document.querySelector(".modal-add");
  _btnOpen = document.querySelector(".btn-open");
  _btnClose = document.querySelector(".btn-close-modal");

  constructor() {
    super();
    this._addHandlerShowForm();
    this._addHandlerCloseForm();
  }

  _generateMarkupForm() {
    this._clear(this._parentElement);
    const date = new Date();
    const dateDay = `${date.getDate()}`;
    const today = `${date.getFullYear()}-${date.getMonth() + 1}-${
      dateDay.length == 1 ? `0${dateDay}` : dateDay
    }`;
    return `
    <h4 class="form-heading">Add TODO</h4>
    <ul class="form-list-fields">
      <li class="form-field title-parent">
        <label for="form-id-title">Title</label>
        <input
          type="text"
          name="form-todo-title"
          id="form-id-title"
          required
          placeholder="Title"
          tabindex="-1"
          maxlength="26"
        />
      </li>
      <li class="form-field">
        <label for="form-id-descr">Description</label>
        <textarea
          id="form-id-descr"
          name="form-todo-descr"
          placeholder="Description"
          rows="4"
          cols="40"
          maxlength="367"
        ></textarea>
      </li>
      <li class="form-field">
        <label for="form-id-status">Status</label>
        <select id="form-id-status" name="form-todo-status">
          <option value="start">START</option>
          <option value="in_progress">IN PROGRESS</option>
          <option value="done">DONE</option>
        </select>
      </li>
      <li class="form-field">
        <label for="form-id-deadline">Deadline</label>
        <input
          type="date"
          name="form-todo-deadline"
          id="form-id-deadline"
          required
          min=${today}
          max="2024-12-31"
          value=${today}
        />
      </li>
    </ul>
    <button type="Submit" class="btn submit-btn">Submit</button>
    `;
  }

  _generateMarkupMessage() {
    this._clear(this._windowMessage);
    return `
    <div class="added-message">
      <h3>TODO added successfully!</h3>
      <img src="${image}" alt="TODO added" class="image-message"></img>
    </div>`;
  }

  _addHandlerShowForm() {
    this._btnOpen.addEventListener("click", () => {
      this._openForm("_parentElement", this._generateMarkupForm());
      this._focusOnVisible(document.getElementById("form-id-title"));
    });
  }

  _addHandlerCloseForm() {
    this._btnClose.addEventListener(
      "click",
      this._closeFormManually.bind(this, true)
    );
    this._overlay.addEventListener(
      "click",
      this._closeFormManually.bind(this, true)
    );
  }

  addHandlerNewTodo(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new AddTodoView();
