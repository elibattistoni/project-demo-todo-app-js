class EditTodoView {
  ///NB TO DELETEEEEEEEE
  _data = {};
  _parentElement = document.querySelector(".form-add-todo");
  _windowForm = document.querySelector(".modal-add");
  _overlay = document.querySelector(".overlay");
  _btnClose = document.querySelector(".btn-close-modal");
  _containerDetails = document.querySelector(".container-todo-details");

  constructor() {
    this._addHandlerShowForm();
    this._addHandlerCloseForm();
  }

  _clear(element) {
    element.innerHTML = "";
  }

  _generateMarkupForm() {
    this._clear(this._parentElement);
    let statusMarkup;
    switch (this._data.status) {
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
    }
    return `
    <h4>Edit TODO</h4>
    <ul class="form-list-fields">
      <li class="form-field">
        <label for="form-id-title">Title</label>
        <input
          type="text"
          name="form-todo-title"
          id="form-id-title"
          required
          placeholder="Title"
          value="${this._data.title}"
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
        >${this._data.description}</textarea>
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
          min=${this._data.created}
          max="2024-12-31"
          value=${this._data.deadline}
        />
      </li>
    </ul>
    <button type="Submit" class="btn submit-btn">Submit</button>
    `;
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

  _addHandlerShowForm() {
    this._containerDetails.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-edit");
      if (!btn) return;
      console.log(this._containerDetails);
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
      console.log(this._data);
      this._openForm();
    });
  }

  _addHandlerCloseForm() {
    this._btnClose.addEventListener(
      "click",
      this._closeFormManually.bind(this)
    );
    this._overlay.addEventListener("click", this._closeFormManually.bind(this));
  }

  addHandlerEdit(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}
