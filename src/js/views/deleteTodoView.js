class DeleteTodoView {
  _windowForm = document.querySelector(".modal-reset");
  _btnOpenDeleteAll = document.querySelector(".btn-reset");
  _containerDetails = document.querySelector(".container-todo-details");
  _overlay = document.querySelector(".overlay");
  _clickOnAll;
  // _btnConfirmDelete = document.querySelector(".btn-delete-yes");
  // _btnCancelDelete = document.querySelector(".btn-delete-no");
  // _btnClose = document.querySelector(".btn-close-modal");

  constructor() {
    this._addHandlerShowFormAll();
    this._addHandlerShowFormSingle();
    this._addHandlerCloseForm();
  }

  _clear(element) {
    element.innerHTML = "";
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

  _renderForm() {
    this._windowForm.insertAdjacentHTML(
      "afterbegin",
      this._generateMarkup(this._clickOnAll)
    );
  }

  _openForm() {
    this._renderForm();
    this._windowForm.classList.remove("hidden");
    this._overlay.classList.remove("hidden");
  }

  _closeForm() {
    this._windowForm.classList.add("hidden");
    this._overlay.classList.add("hidden");
  }

  _addHandlerShowFormAll() {
    this._clickOnAll = true;
    this._btnOpenDeleteAll.addEventListener("click", this._openForm.bind(this));
  }

  _addHandlerShowFormSingle() {
    this._containerDetails.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-delete");
      if (!btn) return;
      this._clickOnAll = false;
      console.log(btn);
    });
    // if (!this._windowForm.classList.contains("hidden")) {
    //   this._btnOpenDeleteSingle.addEventListener(
    //     "click",
    //     this._openForm.bind(this)
    //   );
    // }
  }

  _addHandlerCloseForm() {
    /// THIS IS OK!!!!!!!! =) =) =)
    // close on click on overlay
    this._overlay.addEventListener("click", this._closeForm.bind(this));
    this._windowForm.addEventListener("click", (e) => {
      const btn1 = e.target.closest(".btn-close-modal");
      const btn2 = e.target.closest(".btn-delete-no");
      if (!btn1 && !btn2) return;
      this._closeForm();
    });
  }

  addHandlerDelete(handler) {
    this._windowForm.addEventListener("submit", function (e) {
      e.preventDefault();
      this._closeForm();
      handler(this._clickOnAll);
    });
  }
}

export default new DeleteTodoView();
