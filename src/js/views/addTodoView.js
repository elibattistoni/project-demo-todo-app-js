// View that renders the form for adding and updating a todo
import image from "url:../../img/add.svg";

class AddTodoView {
  _parentElement = document.querySelector(".form-add-todo");
  _windowForm = document.querySelector(".modal-add");
  _windowMessage = document.querySelector(".modal-message");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".btn-open");
  _btnClose = document.querySelector(".btn-close-modal");

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
    const today = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    return `
    <h4>Add TODO</h4>
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

  _renderForm() {
    this._parentElement.insertAdjacentHTML(
      "afterbegin",
      this._generateMarkupForm()
    );
  }

  _openForm() {
    document.activeElement.blur();
    this._renderForm();
    this._windowForm.classList.remove("hidden");
    this._overlay.classList.remove("hidden");
  }

  _closeForm() {
    // document.activeElement.blur();
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

  _focusOnVisible(element) {
    new IntersectionObserver((entries, observer) => {
      const [entry] = entries;
      if (entry.isIntersecting && entry.intersectionRatio === 1) {
        // setTimeout(() => entry.target.focus(), 50); // this is necessary if on the modal window you have the transition of 0.5s
        entry.target.focus();
        observer.unobserve(entry.target);
      }
    }).observe(element);
  }

  _addHandlerShowForm() {
    this._btnOpen.addEventListener("click", () => {
      this._openForm();
      this._focusOnVisible(document.getElementById("form-id-title"));
    });
  }

  _addHandlerCloseForm() {
    this._btnClose.addEventListener(
      "click",
      this._closeFormManually.bind(this)
    );
    this._overlay.addEventListener("click", this._closeFormManually.bind(this));
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

export default new AddTodoView();
