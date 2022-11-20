import image from "url:../../img/completed.svg";
class EditTodoView {
  _parentElement = document.querySelector(".form-edit-todo");
  _windowForm = document.querySelector(".modal-edit");
  _windowMessage = document.querySelector(".modal-message");
  _overlay = document.querySelector(".overlay");
  _containerDetails = document.querySelector(".container-todo-details");
  _data = {};
  // _updatedData;

  constructor() {
    this._addHandlerShowForm();
    this._addHandlerCloseForm();
  }

  _clear(element) {
    element.innerHTML = "";
  }

  _generateMarkupForm() {
    this._clear(this._parentElement);
    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
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
    <h4>${this?._formTypeAdd ? "Add" : "Edit"} TODO</h4>
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
    // switch (this._data?.status) {
    //   case value:
    //     break;

    //   default:
    //     break;
    // }
    return `
    <div class="added-message">
      <h3>TODO updated successfully!</h3>
      <img src="${image}" alt="TODO edited" class="image-message image-completed"></img>
    </div>`;
  }

  _renderForm() {
    this._parentElement.insertAdjacentHTML(
      "afterbegin",
      this._generateMarkupForm()
    );
  }

  _openForm() {
    this._renderForm();
    this._windowForm.classList.remove("hidden");
    this._overlay.classList.remove("hidden");
  }

  _closeForm() {
    this._windowForm.classList.add("hidden");
    this._parentElement.reset(); // empty fields
  }

  _closeOverlay() {
    this._overlay.classList.add("hidden");
  }

  _closeFormManually() {
    this._closeForm();
    this._closeOverlay();
  }

  _openMessage() {
    this._windowMessage.classList.remove("hidden");
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
      this._openForm();
    });
  }

  _addHandlerCloseForm() {
    this._overlay.addEventListener("click", this._closeFormManually.bind(this));
    this._windowForm.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-close-modal");
      if (!btn) return;
      this._closeFormManually();
    });
  }

  addHandlerEditTodo(handler) {
    let deprecatedTodo = this._data;
    // let updatedData;
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      data.id = deprecatedTodo.id;
      data.created = deprecatedTodo.created;
      // updatedData = { ...data };
      handler(data);
    });
    // this._updatedData = updatedData;
    // console.log(this._updatedData);
  }

  renderMessage() {
    this._closeForm();
    this._openMessage();
    this._windowMessage.insertAdjacentHTML(
      "afterbegin",
      this._generateMarkupMessage()
    );
  }

  closeMessage() {
    this._windowMessage.classList.add("hidden");
    this._closeOverlay();
  }
}

export default new EditTodoView();
