import image from "url:../../img/completed.svg";
import View from "./View.js";
class EditTodoView extends View {
  _parentElement = document.querySelector(".form-edit-todo");
  _windowForm = document.querySelector(".modal-edit");
  _overlay = document.querySelector(".overlay");
  _containerDetails = document.querySelector(".container-todo-details");
  _data = {};

  constructor() {
    super();
    this._addHandlerShowForm();
    this._addHandlerCloseForm();
  }

  _generateMarkupForm() {
    this._clear(this._parentElement);
    const date = new Date();
    const today = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    let statusMarkup;
    switch (this._data?.status ?? "START") {
      case "START":
        statusMarkup = `
        <select id="form-id-status" name="form-todo-status">
          <option value="start" selected>START</option>
          <option value="in_progress">IN PROGRESS</option>
          <option value="done">DONE</option>
        </select>
        `;
        break;
      case "IN PROGRESS":
        statusMarkup = `
        <select id="form-id-status" name="form-todo-status">
          <option value="start">START</option>
          <option value="in_progress" selected>IN PROGRESS</option>
          <option value="done">DONE</option>
        </select>
        `;
        break;
      case "DONE":
        statusMarkup = `
        <select id="form-id-status" name="form-todo-status">
          <option value="start">START</option>
          <option value="in_progress">IN PROGRESS</option>
          <option value="done" selected>DONE</option>
        </select>
        `;
        break;
      default:
        statusMarkup = `
        <select id="form-id-status" name="form-todo-status">
          <option value="start">START</option>
          <option value="in_progress">IN PROGRESS</option>
          <option value="done">DONE</option>
        </select>
        `;
        break;
    }
    return `
    <h4 class="form-heading">${this?._formTypeAdd ? "Add" : "Edit"} TODO</h4>
    <ul class="form-list-fields">
      <li class="form-field">
        <label for="form-id-title">Title</label>
        <input
          type="text"
          name="form-todo-title"
          id="form-id-title"
          required
          placeholder="Title"
          value="${this._data?.title ?? "TODO Title"}"
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
        >${this._data?.description ?? "TODO Description"}</textarea>
      </li>
      <li class="form-field">
        <label for="form-id-status">Status</label>
        ${statusMarkup}
      </li>
      <li class="form-field">
        <label for="form-id-deadline">Deadline</label>
        <input
          type="date"
          name="form-todo-deadline"
          id="form-id-deadline"
          required
          min=${this._data?.created ?? today}
          max="2024-12-31"
          value=${this._data?.deadline ?? today}
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
      <h3>TODO updated successfully!</h3>
      <img src="${image}" alt="TODO edited" class="image-edited"></img>
    </div>`;
  }

  _addHandlerShowForm() {
    this._containerDetails.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-edit");
      if (!btn) return;
      this._data.title =
        this._containerDetails.querySelector(".todo-title").textContent;
      this._data.status = this._containerDetails
        .querySelector(".todo-status")
        .textContent.trim();
      this._data.description = this._containerDetails
        .querySelector(".todo-description")
        .textContent.trim();
      this._data.created =
        this._containerDetails.querySelector(".todo-created-date").textContent;
      this._data.deadline = this._containerDetails.querySelector(
        ".todo-deadline-date"
      ).textContent;
      this._data.id = window.location.hash.slice(1);
      this._openForm("_parentElement", this._generateMarkupForm());
      this._focusOnVisible(document.getElementById("form-id-title"));
    });
  }

  _addHandlerCloseForm() {
    this._overlay.addEventListener("click", () => {
      this._closeFormManually(true);
    });
    this._windowForm.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-close-modal");
      if (!btn) return;
      this._closeFormManually(true);
    });
  }

  addHandlerEditTodo(handler) {
    let deprecatedTodo = this._data;
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      data.id = deprecatedTodo.id;
      data.created = deprecatedTodo.created;
      handler(data);
    });
  }
}

export default new EditTodoView();
