import View from "./View.js";
class DeleteTodoView extends View {
  _windowForm = document.querySelector(".modal-reset");
  _btnOpenDeleteAll = document.querySelector(".btn-reset");
  _containerDetails = document.querySelector(".container-todo-details");
  _clickOnAll;

  constructor() {
    super();
    this._addHandlerShowFormAll();
    this._addHandlerShowFormSingle();
    this._addHandlerCloseForm();
  }

  _generateMarkup() {
    this._clear(this._windowForm);
    return `
    <button class="btn-close-modal">&times;</button>
    <div class="reset-message">
      <p>Are you sure you want to delete ${
        this._clickOnAll ? "all TODOs" : "this TODO"
      }?</p>
    </div>
    <div class="buttons-deletion">
      <button class="btn btn-delete-no">NO</button>
      <button class="btn btn-delete-yes">YES</button>
    </div>
    `;
  }

  _addHandlerShowFormAll() {
    this._btnOpenDeleteAll.addEventListener("click", (e) => {
      this._clickOnAll = true;
      this._openForm("_windowForm", this._generateMarkup(this._clickOnAll));
    });
  }

  _addHandlerShowFormSingle() {
    this._containerDetails.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-delete");
      if (!btn) return;
      this._clickOnAll = false;
      this._openForm("_windowForm", this._generateMarkup(this._clickOnAll));
    });
  }

  _addHandlerCloseForm() {
    this._overlay.addEventListener("click", () => {
      this._closeForm(false);
      this._closeOverlay();
    });
    this._windowForm.addEventListener("click", (e) => {
      const btn1 = e.target.closest(".btn-close-modal");
      const btn2 = e.target.closest(".btn-delete-no");
      if (!btn1 && !btn2) return;
      this._closeForm(false);
      this._closeOverlay();
    });
  }

  addHandlerDelete(handler) {
    this._windowForm.addEventListener("click", (e) => {
      // e.preventDefault()
      const btn = e.target.closest(".btn-delete-yes");
      if (!btn) return;
      this._closeForm(false);
      this._closeOverlay();
      // remove hash
      window.history.pushState(null, "", "/");
      handler(this._clickOnAll);
    });
  }
}

export default new DeleteTodoView();
